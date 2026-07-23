#!/usr/bin/env node
// Migra posts de WordPress (generacionads.com) a Strapi.
// Uso: node scripts/migrate-wp.mjs

const WP_BASE = "https://generacionads.com/wp-json/wp/v2";
const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN =
  "c331fff0cd304eff631252dd5047fc15da809e248673b194f0d86b607d7a0b90c2ff2374eb3acac154989fc015fb6a7568368aaa17c14dbb613ece9c71514296d84499812b6d7f3b9b6924d198dd0169105c296da05208d057b15481146e6a6f28601c500ef83a1fd7178ea50e1182f9624d80d1504d5a078c23ebeff8e00491";

// Mapeo categorías WP → enum de Strapi
const WP_CATEGORY_MAP = {
  7: "marketing",     // Marketing Digital
  10: "herramientas", // Google Ads
  12: "herramientas", // Facebook Ads
  9: "herramientas",  // Diccionario SEM
  11: "herramientas", // Analitica Web
  8: "estrategia",    // CRO
  6: null,            // Sin categorizar
  1: null,            // Uncategorized
};

// Sobreescrituras por slug para afinar la categoría
const SLUG_CATEGORY_OVERRIDE = {
  "estrategia-seo-b2b":          "estrategia",
  "captar-clientes-b2b":         "estrategia",
  "buyer-persona-b2b":           "estrategia",
  "buyer-persona":               "estrategia",
  "customer-journey":            "estrategia",
  "lead-scoring":                "estrategia",
  "lead-nurturing":              "estrategia",
  "unique-selling-proposition":  "estrategia",
  "benchmarking":                "estrategia",
  "que-es-inbound-marketing":    "marketing",
  "4ps-marketing":               "marketing",
  "elegir-redes-sociales":       "marketing",
};

// ── Helpers ────────────────────────────────────────────────────────────────

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanWpHtml(html) {
  return html
    .replace(/\s+class="[^"]*"/g, "")
    .replace(/\s+id="[^"]*"/g, "")
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, "") // remove WP image blocks (no images in Strapi yet)
    .trim();
}

function parseExcerpt(html) {
  return stripHtml(html)
    .replace(/\[…\]|\[&#8230;\]/g, "")
    .replace(/…$/, "")
    .trim()
    .slice(0, 295);
}

function calcReadTime(html) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ── Strapi API ─────────────────────────────────────────────────────────────

async function strapiPost(path, data) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? `HTTP ${res.status}`);
  return json;
}

async function strapiPublish(documentId) {
  const res = await fetch(
    `${STRAPI_URL}/api/articles/${documentId}?status=published`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: {} }),
    }
  );
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error?.message ?? `Publish HTTP ${res.status}`);
  }
}

// Slugs seleccionados para migrar (análisis previo)
const SELECTED_SLUGS = new Set([
  "estrategia-seo-b2b",
  "captar-clientes-b2b",
  "buyer-persona-b2b",
  "buyer-persona",
  "customer-journey",
  "lead-scoring",
  "lead-nurturing",
  "unique-selling-proposition",
  "4ps-marketing",
  "que-es-inbound-marketing",
  "benchmarking",
  "elegir-redes-sociales",
]);

// ── Main ───────────────────────────────────────────────────────────────────

const wpRes = await fetch(
  `${WP_BASE}/posts?per_page=100&_fields=id,slug,title,excerpt,content,date,categories`
);
const allPosts = await wpRes.json();
const posts = allPosts.filter((p) => SELECTED_SLUGS.has(p.slug));
console.log(`\n📦 ${posts.length} posts seleccionados de ${allPosts.length} totales.\n`);

let ok = 0;
let skip = 0;
let fail = 0;

for (const post of posts) {
  const title = stripHtml(post.title.rendered);
  const slug = post.slug;
  const excerpt = parseExcerpt(post.excerpt.rendered);
  const contentHtml = cleanWpHtml(post.content.rendered);
  const readTime = calcReadTime(post.content.rendered);
  const wpCatId = post.categories?.[0];
  const category = SLUG_CATEGORY_OVERRIDE[slug] ?? WP_CATEGORY_MAP[wpCatId] ?? null;

  if (!excerpt) {
    console.log(`  ⚠  Saltando "${title}" — sin excerpt`);
    skip++;
    continue;
  }

  try {
    const created = await strapiPost("/articles", {
      title,
      slug,
      excerpt,
      contentHtml,
      readTime,
      ...(category ? { category } : {}),
    });

    const documentId = created.data?.documentId;
    if (!documentId) throw new Error("No documentId en la respuesta");

    await strapiPublish(documentId);
    console.log(`  ✓  ${title}`);
    ok++;
  } catch (err) {
    console.error(`  ✗  ${title}\n     ${err.message}`);
    fail++;
  }
}

console.log(`\n──────────────────────────────────────`);
console.log(`  ✓ Migrados:  ${ok}`);
if (skip) console.log(`  ⚠ Saltados:  ${skip}`);
if (fail) console.log(`  ✗ Fallidos:  ${fail}`);
console.log(`──────────────────────────────────────\n`);
