import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Link, getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getPathname({ locale, href: "/politica-de-privacidad" }),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ locale: loc, href: "/politica-de-privacidad" })])
      ),
    },
  };
}

const h2 = "text-foreground text-[28px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight mt-12";
const p = "text-foreground text-[16px] font-light leading-relaxed";

export default async function PoliticaDePrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  return (
    <>
      <Header />
      <main className="pt-[120px] pb-24 bg-background">
        <Container className="max-w-[760px] flex flex-col gap-6">
          <h1 className="text-foreground text-[40px] md:text-[56px] font-medium tracking-[-0.04em] leading-none">
            {t("h1")}
          </h1>
          <p className={p}>{t("intro")}</p>

          <h2 className={h2}>{t("controller.heading")}</h2>
          <p className={p}>
            Ítacarb
            <br />
            {t("controller.emailLabel")}: hola@itacarb.es
            <br />
            {t("controller.telefonoLabel")}: +34 611 68 15 39
            <br />
            {t("controller.direccionLabel")}: Calle la Diligencia, 9, Oficina 7
          </p>

          <h2 className={h2}>{t("contactForm.heading")}</h2>
          <p className={p}>{t("contactForm.body")}</p>

          <h2 className={h2}>{t("newsletter.heading")}</h2>
          <p className={p}>{t("newsletter.body")}</p>

          <h2 className={h2}>{t("cookies.heading")}</h2>
          <p className={p}>
            {t.rich("cookies.body", {
              link: (chunks) => (
                <Link href="/politica-de-cookies" className="underline hover:opacity-70 transition-opacity">
                  {chunks}
                </Link>
              ),
            })}
          </p>

          <h2 className={h2}>{t("embedded.heading")}</h2>
          <p className={p}>{t("embedded.body")}</p>

          <h2 className={h2}>{t("sharing.heading")}</h2>
          <p className={p}>{t("sharing.body")}</p>

          <h2 className={h2}>{t("retention.heading")}</h2>
          <p className={p}>{t("retention.body")}</p>

          <h2 className={h2}>{t("rights.heading")}</h2>
          <p className={p}>{t("rights.body")}</p>

          <h2 className={h2}>{t("contact.heading")}</h2>
          <p className={p}>{t("contact.body")}</p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
