import type { Metadata } from "next";
import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { Container } from "@/components/ui/Container";
import { Link, getPathname, redirect } from "@/i18n/navigation";
import {
  BOOKING_URL,
  LANDING_PATH,
  SUBMITTED_COOKIE,
  THANKS_COPY,
  THANKS_PATH,
} from "@/lib/pre-auditoria";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: THANKS_COPY.metaTitle,
    description: THANKS_COPY.metaDescription,
    // Esta página se queda en noindex siempre: es solo para quien ha enviado el formulario.
    robots: { index: false, follow: false },
    alternates: { canonical: getPathname({ locale: "es", href: THANKS_PATH }) },
  };
}

export default async function GraciasPreAuditoriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Solo accesible tras un envío correcto (cookie técnica que fija /api/pre-auditoria).
  // Las visitas directas vuelven a la landing y así no inflan la conversión en GA4.
  const submitted = (await cookies()).has(SUBMITTED_COOKIE);
  if (!submitted) redirect({ href: LANDING_PATH, locale });

  return (
    <>
      <LandingHeader />
      <main className="flex-1 pb-24 pt-12 sm:pt-20">
        <Container className="max-w-[760px]">
          <h1 className="text-foreground text-[40px] md:text-[56px] font-medium tracking-[-0.04em] leading-none">
            {THANKS_COPY.heading}
          </h1>
          <p className="mt-8 text-foreground text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
            {THANKS_COPY.deadline}
          </p>
          <p className="mt-6 max-w-xl text-foreground text-[16px] md:text-[18px] font-light leading-relaxed">
            {THANKS_COPY.body}
          </p>

          {/* Hueco para CTA secundario: solo se muestra si hay URL configurada */}
          {BOOKING_URL && (
            <section className="mt-14 border-t border-brand-border pt-8" aria-labelledby="booking-heading">
              <h2 id="booking-heading" className="text-foreground text-[20px] font-medium tracking-[-0.02em]">
                {THANKS_COPY.booking.heading}
              </h2>
              <p className="mt-2 text-brand-muted text-[16px] font-light leading-relaxed">
                {THANKS_COPY.booking.body}
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center border border-foreground px-6 py-3 text-foreground text-[16px] font-medium tracking-[0.04em] transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
              >
                {THANKS_COPY.booking.cta}
              </a>
            </section>
          )}

          <p className="mt-14">
            <Link href="/" className="text-brand-muted text-[14px] font-light underline underline-offset-2 hover:text-foreground">
              {THANKS_COPY.backHome}
            </Link>
          </p>
        </Container>
      </main>
    </>
  );
}
