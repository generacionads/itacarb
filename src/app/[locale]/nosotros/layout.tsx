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
  const t = await getTranslations({ locale, namespace: "nosotrosPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getPathname({ locale, href: "/nosotros" }),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ locale: loc, href: "/nosotros" })])
      ),
    },
  };
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
