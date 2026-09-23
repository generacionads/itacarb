"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { RevealH2 } from "@/components/ui/RevealH2";
import { RevealWrap } from "@/components/ui/RevealWrap";
import { Link } from "@/i18n/navigation";

const HEADER_H = 72;

const sectorIds = ["sanitarios", "arquitectura", "industrial", "otros"] as const;

interface ProjectMeta {
  id: string;
  slug: string;
  sector: string;
  name: string;
  image: string | null;
  objectPosition?: string;
  featured?: boolean;
}

const projectsMeta: ProjectMeta[] = [
  {
    id: "morales-raya",
    slug: "clinica-morales-raya",
    sector: "sanitarios",
    name: "Clínica Dr. Morales Raya",
    image: "/projects/clinicas y sector salud/clinica-morales-raya/clinica-morales-raya.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "paralelo-estudio",
    slug: "paralelo-estudio",
    sector: "arquitectura",
    name: "Paralelo Estudio",
    image: "/projects/arquitectura y diseño/paralelo-estudio/Img_01_Grupo-PARALELO.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "on-level-quality",
    slug: "on-level-quality",
    sector: "industrial",
    name: "On Level Quality",
    image: "/projects/industrial/on-level-quality/toma_3_1_1-copia-1.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "expresa-salud",
    slug: "expresa-salud",
    sector: "sanitarios",
    name: "Expresa Salud Emocional",
    image: "/projects/clinicas y sector salud/expresa-salud/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "cm-cosmetica",
    slug: "cm-cosmetica",
    sector: "sanitarios",
    name: "CM Cosmética Dermatológica",
    image: "/projects/otros sectores/cm-cosmetica/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "af-iberia",
    slug: "af-iberia",
    sector: "arquitectura",
    name: "AF Iberia",
    image: "/projects/arquitectura y diseño/af-iberia/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "artquitrabe",
    slug: "artquitrabe",
    sector: "arquitectura",
    name: "Artquitrabe",
    image: "/projects/arquitectura y diseño/artquitrabe/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "haromatics",
    slug: "haromatics",
    sector: "industrial",
    name: "Haromatics",
    image: "/projects/industrial/haromatics/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "telstar",
    slug: "telstar",
    sector: "industrial",
    name: "Telstar",
    image: "/projects/industrial/telstar/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "cbc-collection",
    slug: "cbc-collection",
    sector: "otros",
    name: "CBC Collection",
    image: "/projects/otros sectores/carmen ballesta collection/cbc_2.webp",
    featured: true,
  },
  {
    id: "polspa",
    slug: "polspa",
    sector: "otros",
    name: "Polspa",
    image: "/projects/otros sectores/polspa/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "prominsol",
    slug: "prominsol",
    sector: "otros",
    name: "Prominsol",
    image: "/projects/otros sectores/prominsol/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "solvify",
    slug: "solvify",
    sector: "otros",
    name: "Solvify",
    image: "/projects/otros sectores/solvify/hero.webp",
    objectPosition: "center center",
    featured: true,
  },
  {
    id: "milton-home",
    slug: "milton-home",
    sector: "arquitectura",
    name: "Milton Home",
    image: "/projects/arquitectura y diseño/milton-homes/MiltonHomes-Promotora-Cantabria-26-2-scaled.jpg",
    featured: true,
  },
];

type Project = ProjectMeta & { tagline: string };

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={{ pathname: "/proyectos/[slug]", params: { slug: project.slug } }}
      className="project-card group flex flex-col border border-foreground"
    >
      <div className="relative h-[323px] w-full overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            style={{ objectPosition: project.objectPosition ?? "center center" }}
          />
        ) : (
          <div className="absolute inset-0 bg-placeholder" />
        )}
      </div>

      <div className="flex flex-col gap-4 px-4 py-6 border-t border-brand-border">
        <div className="flex items-center gap-4">
          <h2 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-none transition-colors duration-200 group-hover:text-brand-accent">
            {project.name}
          </h2>
          <div className="bg-brand-accent p-3 shrink-0 text-background">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="btn-morph-svg"
            >
              <path
                d="M12 5 L12 12 L12 19"
                className="morph-stroke"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <p className="text-foreground text-[24px] font-light tracking-[0.02em] leading-tight">
          {project.tagline}
        </p>
      </div>
    </Link>
  );
}

export default function ProyectosPage() {
  const t = useTranslations("proyectosPage");
  const sectors = sectorIds.map((id) => ({ id, label: t(`sectorsNav.${id}`) }));
  const projects: Project[] = projectsMeta.map((p) => ({
    ...p,
    tagline: t(`taglines.${p.id}`),
  }));

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const exitTween = useRef<gsap.core.Tween | null>(null);
  const isFirstRender = useRef(true);

  const visibleProjects = activeFilter
    ? projects.filter((p) => p.sector === activeFilter)
    : projects.filter((p) => p.featured);

  function handleFilter(id: string) {
    const next = activeFilter === id ? null : id;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !listRef.current) {
      setActiveFilter(next);
      return;
    }

    // Kill any in-progress exit before starting a new one
    exitTween.current?.kill();

    const cards = listRef.current.querySelectorAll<HTMLElement>(".project-card");
    if (cards.length > 0) {
      exitTween.current = gsap.to(cards, {
        opacity: 0,
        y: -8,
        duration: 0.18,
        stagger: { each: 0.03, from: "end" },
        ease: "power2.in",
        onComplete: () => setActiveFilter(next),
      });
    } else {
      setActiveFilter(next);
    }
  }

  // Animate cards in after each filter change (skip first mount)
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!listRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cards = listRef.current.querySelectorAll<HTMLElement>(".project-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.44,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "transform,opacity",
      }
    );
  }, [activeFilter]);

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">
        <div className="flex flex-1">
          <SidebarNav
            items={sectors}
            activeId={activeFilter ?? ""}
            onSelect={handleFilter}
            top={HEADER_H}
            ariaLabel={t("filterAria")}
          />

          <div className="flex-1 px-4 sm:px-16 pt-16 pb-20 flex flex-col gap-12">
            <RevealH2
              as="h1"
              alwaysAnimate
              splitBy="word"
              className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none"
            >
              {t("heading")}
            </RevealH2>

            <div ref={listRef} className="flex flex-col gap-12">
              {visibleProjects.map((project, i) => (
                <RevealWrap key={project.id} delay={i * 0.07}>
                  <ProjectCard project={project} />
                </RevealWrap>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-32 pb-24 flex flex-col gap-8">
              <p className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight">
                {t("ctaHeading")}
              </p>
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background w-fit"
              >
                <span className="text-[16px] font-medium tracking-[0.04em]">{t("ctaLink")}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
                  <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
