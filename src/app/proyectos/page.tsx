"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { RevealH2 } from "@/components/ui/RevealH2";

const HEADER_H = 72;

const sectors = [
  { id: "sanitarios", label: "Clínicas y sector salud" },
  { id: "arquitectura", label: "Arquitectura y Diseño" },
  { id: "industrial", label: "Industrial" },
  { id: "otros", label: "Otros sectores" },
];

interface Project {
  id: string;
  sector: string;
  name: string;
  tagline: string;
  image: string | null;
  objectPosition?: string;
  href: string;
}

const projects: Project[] = [
  {
    id: "morales-raya",
    sector: "sanitarios",
    name: "Clínica Dr. Morales Raya",
    tagline: "Construyendo una clínica dental de referencia con estrategia y presencia digital.",
    image: "/projects/carlos-morales-raya-1654788615.jpg",
    objectPosition: "center center",
    href: "/proyectos/clinica-morales-raya",
  },
  {
    id: "paralelo-estudio",
    sector: "arquitectura",
    name: "Paralelo Estudio",
    tagline: "Posicionando un estudio de arquitectura con identidad propia y alcance nacional.",
    image: "/projects/NEW_FL_destacada-1024x646.jpg",
    objectPosition: "center center",
    href: "/proyectos/paralelo-estudio",
  },
  {
    id: "on-level-quality",
    sector: "industrial",
    name: "On Level Quality",
    tagline: "Abriendo nuevos mercados B2B para una empresa industrial con presencia digital.",
    image: "/projects/on-level-quality.jpg",
    objectPosition: "center center",
    href: "/proyectos/on-level-quality",
  },
  {
    id: "cbc-collection",
    sector: "otros",
    name: "CBC Collection",
    tagline: "De cero a 50k en facturación: joyería con identidad propia en tres meses.",
    image: null,
    href: "/proyectos/cbc-collection",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.href} className="project-card group flex flex-col border border-foreground">
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
          <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-none transition-colors duration-200 group-hover:text-brand-accent">
            {project.name}
          </p>
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
    </a>
  );
}

export default function ProyectosPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const exitTween = useRef<gsap.core.Tween | null>(null);
  const isFirstRender = useRef(true);

  const visibleProjects = activeFilter
    ? projects.filter((p) => p.sector === activeFilter)
    : projects;

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
            ariaLabel="Filtrar por sector"
          />

          <div className="flex-1 px-4 sm:px-16 pt-16 pb-20 flex flex-col gap-12">
            <RevealH2
              as="h1"
              alwaysAnimate
              splitBy="word"
              className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none"
            >
              Nuestros éxitos
            </RevealH2>

            <div ref={listRef} className="flex flex-col gap-12">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* CTA */}
            <div className="pt-32 pb-24 flex flex-col gap-8">
              <p className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight">
                Definamos tu proyecto juntos
              </p>
              <a
                href="/contacto"
                className="group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background w-fit"
              >
                <span className="text-[16px] font-medium tracking-[0.04em]">Contacto</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
                  <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
