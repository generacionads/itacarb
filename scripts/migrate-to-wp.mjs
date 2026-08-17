#!/usr/bin/env node
// Migra artículos de Strapi (local) a WordPress (local, vía REST API).
// Uso: node --env-file=.env.local scripts/migrate-to-wp.mjs

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? "";
const WORDPRESS_URL = process.env.WORDPRESS_URL;
const WP_USER = process.env.WORDPRESS_APP_USER;
const WP_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

if (!WORDPRESS_URL || !WP_USER || !WP_APP_PASSWORD) {
  console.error(
    "Faltan WORDPRESS_URL, WORDPRESS_APP_USER o WORDPRESS_APP_PASSWORD. Defínelos en .env.local."
  );
  process.exit(1);
}

const WP_AUTH = "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64");

// ── Strapi ───────────────────────────────────────────────────────────────

function strapiImageUrl(url) {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

async function getAllStrapiArticles() {
  const articles = [];
  let page = 1;
  for (;;) {
    const url = new URL("/api/articles", STRAPI_URL);
    url.searchParams.set("populate[cover][fields][0]", "url");
    url.searchParams.set("populate[cover][fields][1]", "alternativeText");
    url.searchParams.set("pagination[page]", String(page));
    url.searchParams.set("pagination[pageSize]", "25");

    const res = await fetch(url, { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } });
    if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status} ${url}`);
    const json = await res.json();

    articles.push(...json.data);
    if (page >= json.meta.pagination.pageCount) break;
    page++;
  }
  return articles;
}

// ── Conversión Strapi Blocks → HTML ─────────────────────────────────────

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(node) {
  if (node.type === "link") {
    const inner = (node.children ?? []).map(renderInline).join("");
    const target = node.url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${node.url}"${target}>${inner}</a>`;
  }
  let text = escapeHtml(node.text ?? "");
  if (node.code) text = `<code>${text}</code>`;
  if (node.bold) text = `<strong>${text}</strong>`;
  if (node.italic) text = `<em>${text}</em>`;
  if (node.underline) text = `<u>${text}</u>`;
  if (node.strikethrough) text = `<s>${text}</s>`;
  return text;
}

async function blockToHtml(node, uploadImage) {
  const children = node.children ?? [];

  switch (node.type) {
    case "paragraph": {
      const inner = children.map(renderInline).join("");
      return inner.trim() ? `<p>${inner}</p>` : "";
    }
    case "heading": {
      const level = node.level ?? 2;
      const inner = children.map(renderInline).join("");
      return `<h${level}>${inner}</h${level}>`;
    }
    case "list": {
      const tag = node.format === "ordered" ? "ol" : "ul";
      const items = (node.children ?? [])
        .map((item) => `<li>${(item.children ?? []).map(renderInline).join("")}</li>`)
        .join("");
      return `<${tag}>${items}</${tag}>`;
    }
    case "quote": {
      const inner = children.map(renderInline).join("");
      return `<blockquote><p>${inner}</p></blockquote>`;
    }
    case "code": {
      const text = children.map((c) => c.text ?? "").join("");
      return `<pre><code>${escapeHtml(text)}</code></pre>`;
    }
    case "image": {
      if (!node.image) return "";
      const media = await uploadImage(
        strapiImageUrl(node.image.url),
        node.image.alternativeText ?? ""
      );
      if (!media) return "";
      return `<figure class="wp-block-image"><img src="${media.sourceUrl}" alt="${escapeHtml(
        node.image.alternativeText ?? ""
      )}" /></figure>`;
    }
    default:
      return "";
  }
}

async function blocksToHtml(blocks, uploadImage) {
  const parts = [];
  for (const block of blocks) {
    parts.push(await blockToHtml(block, uploadImage));
  }
  return parts.filter(Boolean).join("\n");
}

// ── WordPress ────────────────────────────────────────────────────────────

async function wpFetch(path, options = {}) {
  const res = await fetch(new URL(path, WORDPRESS_URL), {
    ...options,
    headers: { Authorization: WP_AUTH, ...(options.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`WP ${options.method ?? "GET"} ${path} → ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

async function getCategoryMap() {
  const cats = await wpFetch("/wp-json/wp/v2/categories?per_page=100");
  return new Map(cats.map((c) => [c.slug, c.id]));
}

const mediaCache = new Map();

async function uploadImageToWp(url, altText) {
  if (mediaCache.has(url)) return mediaCache.get(url);

  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    console.warn(`  ⚠  No se pudo descargar la imagen: ${url}`);
    return null;
  }
  const buffer = Buffer.from(await imgRes.arrayBuffer());
  const filename = url.split("/").pop() || "image.jpg";
  const contentType = imgRes.headers.get("content-type") ?? "image/jpeg";

  const uploadRes = await fetch(new URL("/wp-json/wp/v2/media", WORDPRESS_URL), {
    method: "POST",
    headers: {
      Authorization: WP_AUTH,
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
    body: buffer,
  });
  if (!uploadRes.ok) {
    console.warn(`  ⚠  No se pudo subir la imagen a WP: ${url} (${uploadRes.status})`);
    return null;
  }
  const media = await uploadRes.json();

  if (altText) {
    await wpFetch(`/wp-json/wp/v2/media/${media.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt_text: altText }),
    }).catch(() => {});
  }

  const result = { id: media.id, sourceUrl: media.source_url };
  mediaCache.set(url, result);
  return result;
}

// ── Main ─────────────────────────────────────────────────────────────────

const categoryMap = await getCategoryMap();
const articles = await getAllStrapiArticles();
console.log(`\n📦 ${articles.length} artículos encontrados en Strapi.\n`);

let ok = 0;
let fail = 0;

for (const article of articles) {
  try {
    let content = article.contentHtml;
    if (!content && article.content?.length) {
      content = await blocksToHtml(article.content, uploadImageToWp);
    }
    content ??= "";

    let featuredMedia;
    if (article.cover) {
      const media = await uploadImageToWp(
        strapiImageUrl(article.cover.url),
        article.cover.alternativeText ?? article.title
      );
      featuredMedia = media?.id;
    }

    const categoryId = article.category ? categoryMap.get(article.category) : undefined;
    if (article.category && !categoryId) {
      console.warn(
        `  ⚠  Categoría "${article.category}" no existe en WP — se omite para "${article.title}"`
      );
    }

    await wpFetch("/wp-json/wp/v2/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content,
        status: "publish",
        date: article.publishedAt ?? article.createdAt,
        ...(categoryId ? { categories: [categoryId] } : {}),
        ...(featuredMedia ? { featured_media: featuredMedia } : {}),
      }),
    });

    console.log(`  ✓  ${article.title}`);
    ok++;
  } catch (err) {
    console.error(`  ✗  ${article.title}\n     ${err.message}`);
    fail++;
  }
}

console.log(`\n──────────────────────────────────────`);
console.log(`  ✓ Migrados:  ${ok}`);
if (fail) console.log(`  ✗ Fallidos:  ${fail}`);
console.log(`──────────────────────────────────────\n`);
