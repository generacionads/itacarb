import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/nosotros": { es: "/nosotros", en: "/about" },
    "/sectores": { es: "/sectores", en: "/sectors" },
    "/servicio": { es: "/servicio", en: "/service" },
    "/servicio/consultoria": { es: "/servicio/consultoria", en: "/service/consulting" },
    "/servicio/ppc": { es: "/servicio/ppc", en: "/service/ppc" },
    "/proyectos": { es: "/proyectos", en: "/projects" },
    "/proyectos/[slug]": { es: "/proyectos/[slug]", en: "/projects/[slug]" },
    "/contacto": { es: "/contacto", en: "/contact" },
    "/aviso-legal": { es: "/aviso-legal", en: "/legal-notice" },
    "/politica-de-privacidad": { es: "/politica-de-privacidad", en: "/privacy-policy" },
    "/politica-de-cookies": { es: "/politica-de-cookies", en: "/cookie-policy" },
    // Blog content isn't translated yet (the CMS has no locale support),
    // so both locales share the same path.
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});
