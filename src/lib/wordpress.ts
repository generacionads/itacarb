const WORDPRESS_URL = process.env.WORDPRESS_URL ?? "https://cms.itacarb.es";

export interface WpArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  cover: WpMedia | null;
  category: string | null;
  readTime: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface WpMedia {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface WpRenderedField {
  rendered: string;
}

// Most media items have a plain string `source_url`, but some sites store
// featured images via an "external image" plugin that returns a tuple
// [url, width, height, position] instead (e.g. images pulled from Unsplash).
type WpMediaUrl = string | [string, number, number, unknown];

interface WpEmbeddedMedia {
  source_url: WpMediaUrl;
  alt_text: string;
  media_details?: { width?: number; height?: number };
}

function resolveMediaUrl(source: WpMediaUrl): string | null {
  if (typeof source === "string") return source || null;
  if (Array.isArray(source) && typeof source[0] === "string") return source[0] || null;
  return null;
}

function resolveMediaDimensions(media: WpEmbeddedMedia): { width: number; height: number } {
  if (Array.isArray(media.source_url)) {
    return { width: media.source_url[1] ?? 1200, height: media.source_url[2] ?? 800 };
  }
  return {
    width: media.media_details?.width ?? 1200,
    height: media.media_details?.height ?? 800,
  };
}

interface WpEmbeddedTerm {
  taxonomy: string;
  slug: string;
}

interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: WpRenderedField;
  excerpt: WpRenderedField;
  content: WpRenderedField;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: WpEmbeddedMedia[];
    "wp:term"?: WpEmbeddedTerm[][];
  };
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity[0] === "#") {
      const code = entity[1] === "x" || entity[1] === "X"
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    return NAMED_ENTITIES[entity] ?? match;
  });
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function cleanText(html: string): string {
  return decodeHtmlEntities(stripTags(html)).replace(/\s+/g, " ").trim();
}

function estimateReadTime(contentHtml: string): number {
  const words = stripTags(contentHtml).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function mapPost(post: WpPost): WpArticle {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const mediaUrl = media ? resolveMediaUrl(media.source_url) : null;
  const cover: WpMedia | null = media && mediaUrl
    ? {
        url: mediaUrl,
        alternativeText: media.alt_text || null,
        ...resolveMediaDimensions(media),
      }
    : null;

  const category = post._embedded?.["wp:term"]
    ?.flat()
    .find((term) => term.taxonomy === "category")?.slug ?? null;

  return {
    id: post.id,
    slug: post.slug,
    title: cleanText(post.title.rendered),
    excerpt: cleanText(post.excerpt.rendered),
    contentHtml: post.content.rendered,
    cover,
    category,
    readTime: estimateReadTime(post.content.rendered),
    publishedAt: post.date,
    createdAt: post.date,
    updatedAt: post.modified,
  };
}

async function wpFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`/wp-json/wp/v2${path}`, WORDPRESS_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WordPress fetch failed: ${res.status} ${url}`);
  return res.json() as Promise<T>;
}

export async function getArticles(): Promise<WpArticle[]> {
  const posts = await wpFetch<WpPost[]>("/posts", {
    per_page: "100",
    orderby: "date",
    order: "desc",
    _embed: "true",
  });
  return posts.map(mapPost);
}

export async function getArticleBySlug(slug: string): Promise<WpArticle | null> {
  const posts = await wpFetch<WpPost[]>("/posts", { slug, _embed: "true" });
  return posts[0] ? mapPost(posts[0]) : null;
}
