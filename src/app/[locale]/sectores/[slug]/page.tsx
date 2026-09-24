import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealH2 } from "@/components/ui/RevealH2";
import { AccordionItem } from "@/components/ui/Accordion";
import { SectorNewsletter } from "@/components/ui/SectorNewsletter";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SLUG_TO_SECTOR, SECTORS } from "@/lib/sectores";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.values(SECTORS).map(({ slug }) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const sectorKey = SLUG_TO_SECTOR[slug];
  if (!sectorKey) return {};
  const t = await getTranslations({ locale, namespace: "sectoresPage" });
  return {
    title: t(`${sectorKey}.heading`),
    description: t(`${sectorKey}.paragraph`),
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const sectorKey = SLUG_TO_SECTOR[slug];
  if (!sectorKey) notFound();

  const t = await getTranslations({ locale, namespace: "sectoresPage" });
  const td = await getTranslations({ locale, namespace: "sectorDetailPage" });

  const opportunities = t.raw(`${sectorKey}.opportunities`) as string[];
  const faqs = t.raw(`${sectorKey}.faqs`) as string[];

  const brevoListId = Number(process.env[SECTORS[sectorKey].brevoListEnvKey]) || 26;

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">

        {/* Hero */}
        <div className="px-4 sm:px-16 pt-16 pb-12 flex flex-col gap-6">
          <Link
            href="/sectores"
            className="group inline-flex items-center gap-2 text-brand-muted text-[13px] hover:text-foreground transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-1">
              <path d="M19 12 L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 6 L5 12 L11 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {td("back")}
          </Link>

          <RevealH2
            as="h1"
            alwaysAnimate
            splitBy="word"
            className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none text-balance max-w-[900px]"
          >
            {t(`${sectorKey}.heading`)}
          </RevealH2>

          <p className="text-brand-muted text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
            {t(`${sectorKey}.paragraph`)}
          </p>
        </div>

        {/* Oportunidades */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-10 border-t border-brand-border">
          <h2 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
            {t(`${sectorKey}.opportunitiesHeading`)}
          </h2>
          <div className="flex flex-col gap-6 max-w-[720px]">
            {opportunities.map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-brand-accent text-[18px] font-light shrink-0 w-6 text-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground text-[18px] font-light leading-relaxed text-pretty">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <SectorNewsletter
          description={td(`${sectorKey}.newsletterDesc`)}
          listId={brevoListId}
        />

        {/* FAQ */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8">
          <h2 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
            {t(`${sectorKey}.faqHeading`)}
          </h2>
          <div className="flex flex-col border-t border-brand-border max-w-[720px]">
            {faqs.map((q) => (
              <AccordionItem key={q} label={q} />
            ))}
          </div>
        </div>

        {/* CTA contacto */}
        <div className="px-4 sm:px-16 pt-8 pb-24 flex flex-col gap-6 border-t border-brand-border">
          <p className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight">
            {td("ctaHeading")}
          </p>
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background w-fit"
          >
            <span className="text-[16px] font-medium tracking-[0.04em]">{td("ctaLabel")}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
              <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
        </div>

        <Footer />
      </main>
    </>
  );
}
