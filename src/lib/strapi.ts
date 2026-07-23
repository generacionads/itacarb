const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? "";

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: StrapiBlock[] | null;
  cover: StrapiMedia | null;
  category: "marketing" | "estrategia" | "casos-de-exito" | "tendencias" | "herramientas" | null;
  readTime: number | null;
  contentHtml: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
}

interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

// Strapi Blocks rich text node (simplified)
export type StrapiBlock = {
  type: string;
  children: Array<{ type: string; text?: string; [key: string]: unknown }>;
  [key: string]: unknown;
};

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

interface StrapiSingleResponse<T> {
  data: T;
}

async function strapiGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status} ${url}`);
  return res.json() as Promise<T>;
}

export async function getArticles(params?: Record<string, string>) {
  const data = await strapiGet<StrapiListResponse<StrapiArticle>>("/articles", {
    "populate[cover][fields][0]": "url",
    "populate[cover][fields][1]": "alternativeText",
    "populate[cover][fields][2]": "width",
    "populate[cover][fields][3]": "height",
    "sort[0]": "publishedAt:desc",
    ...params,
  });
  return data.data;
}

export async function getArticleBySlug(slug: string) {
  const data = await strapiGet<StrapiListResponse<StrapiArticle>>("/articles", {
    "filters[slug][$eq]": slug,
    "populate[cover][fields][0]": "url",
    "populate[cover][fields][1]": "alternativeText",
    "populate[cover][fields][2]": "width",
    "populate[cover][fields][3]": "height",
  });
  return data.data[0] ?? null;
}

export function getStrapiImageUrl(url: string) {
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
