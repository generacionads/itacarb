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

// Routes translated into English get both a bare (es) and /en URL; the blog
// stays Spanish-only until the CMS itself supports locales.
const TRANSLATED_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.7, changeFrequency: "yearly" },
  { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sectores", priority: 0.8, changeFrequency: "monthly" },
  { path: "/servicio/consultoria", priority: 0.8, changeFrequency: "monthly" },
  { path: "/servicio/ppc", priority: 0.8, changeFrequency: "monthly" },
  { path: "/proyectos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/aviso-legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/politica-de-privacidad", priority: 0.3, changeFrequency: "yearly" },
  { path: "/politica-de-cookies", priority: 0.3, changeFrequency: "yearly" },
  ...PROJECT_SLUGS.map((slug) => ({
    path: `/proyectos/${slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  })),
];

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  ...TRANSLATED_ROUTES.flatMap(({ path, priority, changeFrequency }) => [
    { url: `${BASE_URL}${path}`, priority, changeFrequency },
    { url: `${BASE_URL}/en${path}`, priority, changeFrequency },
  ]),
  // Blog: Spanish only, no /en variant
  { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "weekly" },
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
