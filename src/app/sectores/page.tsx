"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { AccordionItem } from "@/components/ui/Accordion";

const HEADER_H = 72;

const sectors = [
  { id: "sanitarios", label: "Servicios Sanitarios" },
  { id: "arquitectura", label: "Estudios de Arquitectura" },
  { id: "industrial", label: "Servicios Industriales" },
  { id: "hoteles", label: "Hoteles" },
];

export default function SectoresPage() {
  const [activeId, setActiveId] = useState(sectors[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

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
    const offset = HEADER_H + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">

        <div className="flex flex-1">

          <SidebarNav
            items={sectors}
            activeId={activeId}
            onSelect={scrollToSection}
            top={HEADER_H}
            ariaLabel="Sectores"
          />

          {/* Right column */}
          <div className="flex-1 flex flex-col">

            {/* H1 + imagen placeholder — above the fold */}
            <div
              className="px-4 sm:px-16 pt-16 pb-8 flex flex-col"
              style={{ minHeight: "calc(100vh - 72px)" }}
            >
              <h1
                className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none"
              >
                Profundizamos, dando luz a cada sector.
              </h1>
              <div className="mt-10 flex-1 bg-brand-border w-full" />
            </div>

            {/* ── Servicios Sanitarios ── */}
            <section
              id="sanitarios"
              ref={(el) => { if (el) sectionRefs.current.set("sanitarios", el); }}
              className="px-4 sm:px-16 py-16 flex flex-col gap-12"
            >
              <h2
                className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none"
              >
                Clínicas y negocios relacionados con el mundo de la salud
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="border border-foreground p-8 flex items-end gap-6 flex-1">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      40%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      + Incremento de Pacientes
                    </p>
                  </div>
                  <div className="border border-foreground p-8 flex items-end gap-6 flex-1">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      164%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      En Reducción de Costes
                    </p>
                  </div>
                </div>
                <div className="h-[201px] w-full bg-brand-border" />
              </div>

              <p className="text-foreground text-[18px] font-light leading-relaxed">
                El sector del healthcare, crucial en la crisis del Covid-19, ha evolucionado hacia una integración y madurez digital, abrazando nuevas tecnologías para una atención personalizada y eficiente.
              </p>
            </section>

            {/* Oportunidades */}
            <div className="px-4 sm:px-16 py-16 flex flex-col gap-8">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                ¿Qué oportunidades hemos identificado en el sector de la salud?
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Puedes focalizar en los servicios que te den más rentabilidad, para evitar cargarte de trabajo.",
                  "Para conseguir más pacientes, no solo hay que tener una web, sino que necesitas combinar otras acciones de Marketing.",
                  "Podemos ayudarte a implementar un Sistema de Reservas Automatizado",
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <p className="text-brand-accent text-[18px] font-light shrink-0 w-6 text-center">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-foreground text-[18px] font-light leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="px-4 sm:px-16 py-16 flex flex-col gap-8">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Preguntas Frecuentes que hemos recibido de marcas en el sector de la salud
              </p>
              <div className="flex flex-col">
                <AccordionItem label="Pre-análisis" />
                <AccordionItem label="Benchmarking" />
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
