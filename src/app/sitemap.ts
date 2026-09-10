import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/wordpress";

const BASE_URL = "https://itacarb.es";

const PROJECT_SLUGS = [
  "clinica-morales-raya",
  "cm-cosmetica",
  "expresa-salud",
  "paralelo-estudio",
  "af-iberia",
  "artquitrabe",
  "milton-home",
  "on-level-quality",
  "haromatics",
  "tecnivalles",
  "telstar",
  "cbc-collection",
  "polspa",
  "prominsol",
  "solvify",
];

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1, changeFrequency: "monthly" },
  { url: `${BASE_URL}/nosotros`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/sectores`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/servicio`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/proyectos`, priority: 0.8, changeFrequency: "monthly" },
  ...PROJECT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/proyectos/${slug}`,
    priority: 0.7 as const,
    changeFrequency: "yearly" as const,
  })),
  { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE_URL}/contacto`, priority: 0.7, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const articles = await getArticles();
    blogRoutes = articles.map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // Si el CMS no responde, el sitemap sigue funcionando con las rutas estáticas
  }

  return [...STATIC_ROUTES, ...blogRoutes];
}
