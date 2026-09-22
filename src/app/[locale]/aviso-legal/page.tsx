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
  const t = await getTranslations({ locale, namespace: "avisoLegalPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getPathname({ locale, href: "/aviso-legal" }),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ locale: loc, href: "/aviso-legal" })])
      ),
    },
  };
}

const h2 = "text-foreground text-[28px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight mt-12";
const p = "text-foreground text-[16px] font-light leading-relaxed";

export default async function AvisoLegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "avisoLegalPage" });

  return (
    <>
      <Header />
      <main className="pt-[120px] pb-24 bg-background">
        <Container className="max-w-[760px] flex flex-col gap-6">
          <h1 className="text-foreground text-[40px] md:text-[56px] font-medium tracking-[-0.04em] leading-none">
            {t("h1")}
          </h1>
          <p className={p}>
            {t.rich("intro", {
              site: (chunks) => <strong>{chunks}</strong>,
              brand: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>

          <h2 className={h2}>{t("identification.heading")}</h2>
          <p className={p}>
            {t("identification.denominacion")}: Ítacarb
            <br />
            {t("identification.sitioWeb")}: https://itacarb.es
            <br />
            {t("identification.email")}: hola@itacarb.es
            <br />
            {t("identification.telefono")}: +34 611 68 15 39
            <br />
            {t("identification.direccion")}: Calle la Diligencia, 9, Oficina 7
          </p>

          <h2 className={h2}>{t("object.heading")}</h2>
          <p className={p}>{t("object.body")}</p>

          <h2 className={h2}>{t("accessConditions.heading")}</h2>
          <p className={p}>{t("accessConditions.body")}</p>

          <h2 className={h2}>{t("ip.heading")}</h2>
          <p className={p}>{t("ip.body")}</p>

          <h2 className={h2}>{t("liability.heading")}</h2>
          <p className={p}>{t("liability.body")}</p>

          <h2 className={h2}>{t("thirdPartyLinks.heading")}</h2>
          <p className={p}>{t("thirdPartyLinks.body")}</p>

          <h2 className={h2}>{t("law.heading")}</h2>
          <p className={p}>{t("law.body")}</p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
