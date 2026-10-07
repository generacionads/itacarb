import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { PreAuditoriaModal } from "@/components/sections/PreAuditoriaModal";
import { Container } from "@/components/ui/Container";
import { Link, getPathname } from "@/i18n/navigation";
import { LANDING_COPY, LANDING_PATH } from "@/lib/pre-auditoria";

// Quitar `robots` (noindex) cuando la landing esté aprobada para publicarse.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: LANDING_COPY.metaTitle,
    description: LANDING_COPY.metaDescription,
    robots: { index: false, follow: false },
    alternates: { canonical: getPathname({ locale: "es", href: LANDING_PATH }) },
  };
}

export default async function PreAuditoriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { image } = LANDING_COPY;

  return (
    <>
      <LandingHeader />
      <main className="flex-1 pb-24 pt-8 sm:pt-16">
        <Container>
          <h1 className="text-foreground text-4xl sm:text-5xl lg:text-[72px] font-medium leading-tight tracking-[-0.04em]">
            {LANDING_COPY.heading}
          </h1>

          {/* Mismo layout que el bloque del h1 en la home: texto + CTA a la izquierda, imagen al 45% a la derecha */}
          <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-8">
              <p className="max-w-[660px] text-foreground text-base sm:text-lg leading-relaxed font-light">
                {LANDING_COPY.subtitle}
              </p>
              <PreAuditoriaModal />
            </div>

            <div className="w-full shrink-0 self-end sm:w-[45%]">
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="w-full object-cover"
                />
              ) : (
                <div aria-hidden="true" className="aspect-square w-full bg-placeholder" />
              )}
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t border-brand-border py-6">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-light text-brand-muted">
          <Link href="/politica-de-privacidad" className="hover:text-foreground">
            {LANDING_COPY.footer.privacy}
          </Link>
          <Link href="/aviso-legal" className="hover:text-foreground">
            {LANDING_COPY.footer.legal}
          </Link>
          <Link href="/politica-de-cookies" className="hover:text-foreground">
            {LANDING_COPY.footer.cookies}
          </Link>
        </Container>
      </footer>
    </>
  );
}
