import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealH2 } from "@/components/ui/RevealH2";
import { AnimatedStatBox } from "@/components/ui/AnimatedStatBox";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

interface ProjectMeta {
  slug: string;
  name: string;
  statValue?: string;
  stat2Value?: string;
  heroImage: string | null;
  strategyImage: string | null;
  solutionImage: string | null;
  reviewImage: string | null;
  reviewAvatar: string | null;
  reviewAuthor: string;
}

const projectsMeta: ProjectMeta[] = [
  // ── Clínicas y sector salud ─────────────────────────────────────────────
  {
    slug: "clinica-morales-raya",
    name: "Clínica Dr. Morales Raya",
    statValue: "103%",
    heroImage: "/projects/morales-raya.webp",
    strategyImage: "/projects/clinicas y sector salud/clinica-morales-raya/dr-carlos-morales-raya.webp",
    solutionImage: "/projects/clinicas y sector salud/clinica-morales-raya/hero.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "Higinio B.A",
  },
  {
    slug: "cm-cosmetica",
    name: "CM Cosmética Dermatológica",
    statValue: "x12",
    heroImage: "/projects/otros sectores/cm-cosmetica/hero.webp",
    strategyImage: "/projects/otros sectores/cm-cosmetica/serum.webp",
    solutionImage: "/projects/otros sectores/cm-cosmetica/banner.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
  {
    slug: "expresa-salud",
    name: "Expresa Salud Emocional",
    statValue: "103%",
    heroImage: "/projects/clinicas y sector salud/expresa-salud/hero.webp",
    strategyImage: "/projects/clinicas y sector salud/expresa-salud/terapias.webp",
    solutionImage: "/projects/clinicas y sector salud/expresa-salud/evaluaciones.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },

  // ── Arquitectura y diseño ───────────────────────────────────────────────
  {
    slug: "paralelo-estudio",
    name: "Paralelo Estudio",
    statValue: "+1.170",
    stat2Value: "49,84€",
    heroImage: "/projects/paralelo-estudio.webp",
    strategyImage: "/projects/arquitectura y diseño/paralelo-estudio/equipo.webp",
    solutionImage: "/projects/arquitectura y diseño/paralelo-estudio/oficinas.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "Laura Andreu",
  },
  {
    slug: "af-iberia",
    name: "AF Iberia",
    statValue: "1ª",
    heroImage: "/projects/arquitectura y diseño/af-iberia/hero.webp",
    strategyImage: "/projects/arquitectura y diseño/af-iberia/oficina.webp",
    solutionImage: "/projects/arquitectura y diseño/af-iberia/pano.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
  {
    slug: "artquitrabe",
    name: "Artquitrabe",
    statValue: "+100",
    stat2Value: "+50K",
    heroImage: "/projects/arquitectura y diseño/artquitrabe/hero.webp",
    strategyImage: "/projects/arquitectura y diseño/artquitrabe/cocina1.webp",
    solutionImage: "/projects/arquitectura y diseño/artquitrabe/cocina2.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
  {
    slug: "milton-home",
    name: "Milton Home",
    statValue: "+109",
    stat2Value: "~3€",
    heroImage: "/projects/arquitectura y diseño/milton-homes/MiltonHomes-Promotora-Cantabria-26-2-scaled.jpg",
    strategyImage: "/projects/arquitectura y diseño/milton-homes/Somo-Plata-Residencial.jpg",
    solutionImage: "/projects/arquitectura y diseño/milton-homes/Somo01.jpeg",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },

  // ── Industrial ──────────────────────────────────────────────────────────
  {
    slug: "on-level-quality",
    name: "On Level Quality",
    statValue: "40%",
    heroImage: "/projects/on-level-quality.webp",
    strategyImage: "/projects/industrial/on-level-quality/cabina-espejo.webp",
    solutionImage: "/projects/industrial/on-level-quality/cabina-negro.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
  {
    slug: "haromatics",
    name: "Haromatics",
    statValue: "29%",
    stat2Value: "81,82%",
    heroImage: "/projects/industrial/haromatics/hero.webp",
    strategyImage: "/projects/industrial/haromatics/aceites.webp",
    solutionImage: "/projects/industrial/haromatics/equipo.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
  {
    slug: "tecnivalles",
    name: "Tecnivalles",
    statValue: "25€",
    heroImage: null,
    strategyImage: null,
    solutionImage: null,
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
  {
    slug: "telstar",
    name: "Telstar",
    statValue: "56%",
    heroImage: "/projects/industrial/telstar/hero.webp",
    strategyImage: "/projects/industrial/telstar/lab.webp",
    solutionImage: "/projects/industrial/telstar/autoclave.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },

  // ── Otros sectores ──────────────────────────────────────────────────────
  {
    slug: "cbc-collection",
    name: "CBC Collection",
    statValue: "50K",
    heroImage: "/projects/otros sectores/carmen ballesta collection/cbc_2.webp",
    strategyImage: "/projects/otros sectores/carmen ballesta collection/cbc_1.webp",
    solutionImage: "/projects/otros sectores/carmen ballesta collection/cbc_3.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "Carmen Ballesta",
  },
  {
    slug: "polspa",
    name: "Polspa",
    statValue: "+2",
    heroImage: "/projects/otros sectores/polspa/hero.webp",
    strategyImage: "/projects/otros sectores/polspa/accion.webp",
    solutionImage: "/projects/otros sectores/polspa/campo.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
  {
    slug: "prominsol",
    name: "Prominsol",
    heroImage: "/projects/otros sectores/prominsol/hero.webp",
    strategyImage: "/projects/otros sectores/prominsol/clima1.webp",
    solutionImage: "/projects/otros sectores/prominsol/clima2.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
  {
    slug: "solvify",
    name: "Solvify",
    heroImage: "/projects/otros sectores/solvify/hero.webp",
    strategyImage: "/projects/otros sectores/solvify/equipo1.webp",
    solutionImage: "/projects/otros sectores/solvify/equipo2.webp",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
  },
];

export function generateStaticParams() {
  return projectsMeta.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = projectsMeta.find((p) => p.slug === slug);
  const t = await getTranslations({ locale, namespace: "proyectoDetailPage" });
  if (!project) return { title: t("notFoundTitle") };

  const tagline = t(`projects.${slug}.tagline`);

  return {
    title: project.name,
    description: `${project.name} — ${tagline}`,
    alternates: {
      canonical: getPathname({ locale, href: `/proyectos/${slug}` }),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ locale: loc, href: `/proyectos/${slug}` })])
      ),
    },
  };
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const meta = projectsMeta.find((p) => p.slug === slug);
  if (!meta) notFound();

  const t = await getTranslations({ locale, namespace: "proyectoDetailPage" });
  const tp = (key: string) => t(`projects.${slug}.${key}`);

  const stat2Label = tp("stat2Label");
  const stats = [
    ...(meta.statValue ? [{ value: meta.statValue, label: tp("statLabel") }] : []),
    ...(meta.stat2Value && stat2Label ? [{ value: meta.stat2Value, label: stat2Label }] : []),
  ];

  const reviewQuote = tp("reviewQuote");
  const reviewRole = tp("reviewRole");

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">

        {/* Header: tagline izq · nombre proyecto h1 der */}
        <div className="px-4 sm:px-16 pt-16 pb-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-0 md:justify-between">
          <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight md:max-w-[420px] shrink-0">
            {tp("tagline")}
          </p>
          <RevealH2
            as="h1"
            alwaysAnimate
            splitBy="word"
            className="text-[#c8553d] md:text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-none"
          >
            {meta.name}
          </RevealH2>
        </div>

        {/* Imagen cuadrada (col izq) + descripción y métrica (col der) */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-square overflow-hidden bg-placeholder">
            {meta.heroImage && (
              <Image
                src={meta.heroImage}
                alt={meta.name}
                fill
                priority
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover"
              />
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-8 max-w-[560px] mx-auto w-full">
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {tp("description")}
              </p>
              {stats.length > 0 && (
                <AnimatedStatBox stats={stats} />
              )}
            </div>
          </div>
        </div>

        {/* Estrategia */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-[4/3] overflow-hidden bg-placeholder">
            {meta.strategyImage && (
              <Image
                src={meta.strategyImage}
                alt={`${meta.name} — ${t("strategyImageAltSuffix")}`}
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-6 max-w-[560px] mx-auto w-full">
              <h2 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                {t("strategyHeading")}
              </h2>
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {tp("strategyText")}
              </p>
            </div>
          </div>
        </div>

        {/* Solución */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-[4/3] overflow-hidden bg-placeholder">
            {meta.solutionImage && (
              <Image
                src={meta.solutionImage}
                alt={`${meta.name} — ${t("solutionImageAltSuffix")}`}
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-6 max-w-[560px] mx-auto w-full">
              <h2 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                {t("solutionHeading")}
              </h2>
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {tp("solutionText")}
              </p>
            </div>
          </div>
        </div>

        {/* Reseña */}
        {reviewQuote && (
          <div className="px-4 sm:px-16 py-16">
            <div className="flex flex-col gap-16 max-w-[560px] w-full">
              <h2 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                {t("reviewHeading")}
              </h2>

              <div className="flex items-center gap-3">
                <div className="relative size-[80px] shrink-0 overflow-hidden bg-placeholder">
                  {meta.reviewAvatar ? (
                    <Image
                      src={meta.reviewAvatar}
                      alt={meta.reviewAuthor}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-[var(--color-brand-primary)]">
                      <span className="text-background text-[32px] font-medium leading-none">
                        {meta.reviewAuthor.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 py-3 px-3">
                  <p className="text-foreground text-[16px] font-medium">
                    {meta.reviewAuthor}
                  </p>
                  <p className="text-foreground text-[16px] font-light">
                    {reviewRole}
                  </p>
                </div>
              </div>

              <p className="text-foreground text-[16px] font-light leading-relaxed">
                &quot;{reviewQuote}&quot;
              </p>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}
