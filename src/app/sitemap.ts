import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/wordpress";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

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

// Routes translated into English get both a bare (es) and localized /en URL;
// the blog stays Spanish-only until the CMS itself supports locales.
const TRANSLATED_ROUTES = [
  { href: "/", priority: 1, changeFrequency: "monthly" },
  { href: "/contacto", priority: 0.7, changeFrequency: "yearly" },
  { href: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
  { href: "/sectores", priority: 0.8, changeFrequency: "monthly" },
  { href: "/servicio/consultoria", priority: 0.8, changeFrequency: "monthly" },
  { href: "/servicio/ppc", priority: 0.8, changeFrequency: "monthly" },
  { href: "/proyectos", priority: 0.8, changeFrequency: "monthly" },
  { href: "/aviso-legal", priority: 0.3, changeFrequency: "yearly" },
  { href: "/politica-de-privacidad", priority: 0.3, changeFrequency: "yearly" },
  { href: "/politica-de-cookies", priority: 0.3, changeFrequency: "yearly" },
] as const;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  ...TRANSLATED_ROUTES.flatMap(({ href, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}${getPathname({ locale, href })}`,
      priority,
      changeFrequency,
    }))
  ),
  ...PROJECT_SLUGS.flatMap((slug) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}${getPathname({ locale, href: { pathname: "/proyectos/[slug]", params: { slug } } })}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    }))
  ),
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
