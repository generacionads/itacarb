const WORDPRESS_URL = process.env.WORDPRESS_URL ?? "http://localhost:8080";

export interface WpMedia {
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
}

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
}

interface WpTerm {
  taxonomy: string;
  slug: string;
}

interface WpFeaturedMedia {
  source_url: string;
  alt_text: string;
  media_details?: { width: number; height: number };
}

interface WpPostRaw {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[];
    "wp:term"?: WpTerm[][];
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function calcReadTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function mapPost(post: WpPostRaw): WpArticle {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const categoryTerm = post._embedded?.["wp:term"]
    ?.flat()
    .find((term) => term.taxonomy === "category");

  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(stripHtml(post.title.rendered)),
    excerpt: decodeEntities(stripHtml(post.excerpt.rendered)),
    contentHtml: post.content.rendered,
    cover: media
      ? {
          url: media.source_url,
          alternativeText: media.alt_text || null,
          width: media.media_details?.width ?? null,
          height: media.media_details?.height ?? null,
        }
      : null,
    category: categoryTerm?.slug ?? null,
    readTime: calcReadTime(post.content.rendered),
    publishedAt: post.date,
  };
}

async function wpGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`/wp-json/wp/v2${path}`, WORDPRESS_URL);
  url.searchParams.set("_embed", "true");
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WordPress fetch failed: ${res.status} ${url}`);
  return res.json() as Promise<T>;
}

export async function getArticles(): Promise<WpArticle[]> {
  const posts = await wpGet<WpPostRaw[]>("/posts", {
    per_page: "100",
    orderby: "date",
    order: "desc",
  });
  return posts.map(mapPost);
}

export async function getArticleBySlug(slug: string): Promise<WpArticle | null> {
  const posts = await wpGet<WpPostRaw[]>("/posts", { slug });
  return posts[0] ? mapPost(posts[0]) : null;
}
