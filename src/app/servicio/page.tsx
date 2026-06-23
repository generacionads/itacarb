"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealH2 } from "@/components/ui/RevealH2";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { AccordionItem } from "@/components/ui/Accordion";

const HEADER_H = 72;

const data = [
  {
    h2: "Antes de actuar escuchamos y analizamos",
    subsections: [
      {
        id: "descubrir",
        label: "Descubrir",
        verb: "Descubrimos",
        body: "los puntos de fricción, oportunidades ocultas y todo lo que está limitando el potencial real de tu marca.",
        items: ["Pre-análisis", "Estudio de audiencia"],
      },
      {
        id: "explorar",
        label: "Explorar",
        verb: "Exploramos",
        body: "tu entorno competitivo para identificar los espacios donde tu marca puede ganar",
        items: ["Análisis", "Benchmarking"],
      },
    ],
  },
  {
    h2: "Transformamos el análisis en una hoja de ruta clara",
    subsections: [
      {
        id: "proyectar",
        label: "Proyectar",
        verb: "Proyectamos",
        body: "una estrategia coherente con tus objetivos que define qué hacer, cómo hacerlo y en qué orden",
        items: ["Identidad y estrategia de marca", "Plan de acción por fases", "Planificación de canales"],
      },
    ],
  },
  {
    h2: "La estrategia cobra vida en las acciones",
    subsections: [
      {
        id: "construir",
        label: "Construir",
        verb: "Construimos",
        body: "la estrategia pieza a pieza, garantizando que cada decisión tenga impacto real en tu negocio",
        items: ["Ejecución de canales", "Implementación y producción"],
      },
      {
        id: "evolucionar",
        label: "Evolucionar",
        verb: "Evolucionamos",
        body: "con datos reales, construyendo una base escalable que crece con tu negocio",
        items: ["Análitica y medición", "Seguimiento y control"],
      },
    ],
  },
];

const allSubsections = data.flatMap((cat) =>
  cat.subsections.map((s) => ({ ...s, h2: cat.h2 }))
);

export default function ServicioPage() {
  const [activeId, setActiveId] = useState(allSubsections[0].id);
  const [h2Height, setH2Height] = useState(0);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const h2Ref = useRef<HTMLDivElement>(null);

  const activeSection = allSubsections.find((s) => s.id === activeId) ?? allSubsections[0];
  const activeH2 = activeSection.h2;

  useEffect(() => {
    const el = h2Ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH2Height(el.offsetHeight));
    ro.observe(el);
    setH2Height(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const map = sectionRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    map.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current.get(id);
    if (!el) return;
    const offset = HEADER_H + (h2Ref.current?.offsetHeight ?? 0) + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const sidebarTop = HEADER_H + h2Height;

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">

        {/* Wrapper: sticky h2 + content. Footer is a sibling outside this div
            so the sticky element's containing block ends before the footer. */}
        <div className="flex flex-col flex-1">

          {/* Sticky H2 — full width */}
          <div
            ref={h2Ref}
            className="sticky z-20 bg-brand-accent px-4 sm:px-16 py-12"
            style={{ top: HEADER_H }}
          >
            <RevealH2
              key={activeH2}
              alwaysAnimate
              splitBy="word"
              className="text-background text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-none"
            >
              {activeH2}
            </RevealH2>
          </div>

          <div className="flex flex-1">

            <SidebarNav
              items={allSubsections}
              activeId={activeId}
              onSelect={scrollToSection}
              top={sidebarTop}
              ariaLabel="Servicios"
            />

            {/* Content sections */}
            <div className="flex-1">
              {allSubsections.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  ref={(el) => {
                    if (el) sectionRefs.current.set(s.id, el);
                  }}
                  className="px-4 sm:px-16 py-16 border-b border-brand-border"
                >
                  <p className="text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
                    <span className="text-brand-accent">{s.verb}</span>{" "}
                    <span className="text-foreground">{s.body}</span>
                  </p>

                  <div className="mt-10 max-w-[300px]">
                    {s.items.map((item) => (
                      <AccordionItem key={item} label={item} />
                    ))}
                  </div>

                  <div className="mt-10 bg-brand-border h-60 w-full" />
                </section>
              ))}
            </div>
          </div>

        </div>

        <Footer />
      </main>
    </>
  );
}
