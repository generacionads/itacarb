import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RecursoForm } from "@/components/sections/RecursoForm";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";
import { RevealWrap } from "@/components/ui/RevealWrap";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { RECURSOS, getRecurso } from "@/lib/recursos";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => RECURSOS.map((r) => ({ locale, slug: r.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recurso = getRecurso(slug);
  if (!recurso) return {};

  return {
    title: recurso.metaTitle,
    description: recurso.metaDescription,
    // Contenido solo en español: ambos idiomas apuntan a la misma URL canónica.
    alternates: {
      canonical: getPathname({ locale: "es", href: { pathname: "/recursos/[slug]", params: { slug } } }),
    },
  };
}

export default async function RecursoPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const recurso = getRecurso(slug);
  if (!recurso) notFound();
  const { image } = recurso;

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background">
        {/* Mismo bloque que el h1 de la home: título, subtítulo e imagen; aquí el email va sobre el botón */}
        <section className="py-24">
          <Container>
            <RevealH2
              as="h1"
              alwaysAnimate
              className="text-foreground text-4xl sm:text-5xl lg:text-[72px] font-medium leading-tight tracking-[-0.04em]"
            >
              {recurso.heading}
            </RevealH2>

            <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-col gap-8 sm:flex-1">
                <p className="max-w-[660px] text-foreground text-base sm:text-lg leading-relaxed font-light">
                  {recurso.subtitle}
                </p>
                <RecursoForm slug={recurso.slug} cta={recurso.cta} />
              </div>

              <RevealWrap className="w-full shrink-0 self-end sm:w-[45%]" delay={0.1}>
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
              </RevealWrap>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
