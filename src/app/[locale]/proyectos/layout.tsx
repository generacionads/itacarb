import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "proyectosPage" });

  return {
    title: {
      template: "%s | Ítacarb",
      default: t("metaTitle"),
    },
    description: t("metaDescription"),
    alternates: {
      canonical: getPathname({ locale, href: "/proyectos" }),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ locale: loc, href: "/proyectos" })])
      ),
    },
  };
}

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
