import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiesPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getPathname({ locale, href: "/politica-de-cookies" }),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ locale: loc, href: "/politica-de-cookies" })])
      ),
    },
  };
}

const h2 = "text-foreground text-[28px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight mt-12";
const p = "text-foreground text-[16px] font-light leading-relaxed";

export default async function PoliticaDeCookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cookiesPage" });
  const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

  return (
    <>
      <Header />
      <main className="pt-[120px] pb-24 bg-background">
        <Container className="max-w-[760px] flex flex-col gap-6">
          <h1 className="text-foreground text-[40px] md:text-[56px] font-medium tracking-[-0.04em] leading-none">
            {t("h1")}
          </h1>
          <p className={p}>{t("intro")}</p>

          <h2 className={h2}>{t("own.heading")}</h2>
          <p className={p}>{t.rich("own.body", { strong })}</p>

          <h2 className={h2}>{t("thirdParty.heading")}</h2>
          <p className={p}>{t("thirdParty.intro")}</p>
          <p className={p}>{t.rich("thirdParty.gtm", { strong })}</p>

          <h2 className={h2}>{t("disabling.heading")}</h2>
          <p className={p}>{t("disabling.body")}</p>

          <h2 className={h2}>{t("notes.heading")}</h2>
          <p className={p}>{t("notes.body")}</p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
