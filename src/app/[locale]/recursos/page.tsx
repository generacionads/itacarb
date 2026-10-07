import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";
import { Link, getPathname } from "@/i18n/navigation";
import { RECURSOS, RECURSOS_COPY, RECURSOS_PATH } from "@/lib/recursos";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: RECURSOS_COPY.metaTitle,
    description: RECURSOS_COPY.metaDescription,
    // Contenido solo en español: ambos idiomas apuntan a la misma URL canónica.
    alternates: { canonical: getPathname({ locale: "es", href: RECURSOS_PATH }) },
  };
}

export default async function RecursosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background">
        <section className="py-24">
          <Container>
            <RevealH2
              as="h1"
              alwaysAnimate
              className="text-foreground text-4xl sm:text-5xl lg:text-[72px] font-medium leading-tight tracking-[-0.04em]"
            >
              {RECURSOS_COPY.heading}
            </RevealH2>
            <p className="mt-8 max-w-[660px] text-foreground text-base sm:text-lg leading-relaxed font-light">
              {RECURSOS_COPY.subtitle}
            </p>

            <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {RECURSOS.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={{ pathname: "/recursos/[slug]", params: { slug: r.slug } }}
                    className="group flex h-full flex-col border border-foreground"
                  >
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      {r.image.src ? (
                        <Image
                          src={r.image.src}
                          alt={r.image.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div aria-hidden="true" className="absolute inset-0 bg-placeholder" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 border-t border-brand-border px-4 py-6">
                      <h2 className="text-foreground text-[22px] font-medium leading-snug tracking-[-0.02em] text-balance transition-colors duration-200 group-hover:text-brand-accent">
                        {r.name}
                      </h2>
                      <p className="text-brand-muted text-[15px] font-light leading-relaxed">{r.cardDescription}</p>
                      <span className="mt-auto flex items-center justify-between border-t border-brand-border pt-3 text-[14px] font-medium tracking-[0.04em] text-foreground">
                        {RECURSOS_COPY.cardCta}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className="shrink-0 text-brand-accent transition-transform duration-200 group-hover:translate-x-1"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
