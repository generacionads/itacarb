"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";

const HEADER_H = 72;

const valores = ["Fresca", "Resolutiva", "Transparente", "Exclusiva", "Estratega"];

const sections = [
  { id: "itaca", label: "Ítaca" },
  { id: "equipo", label: "Equipo" },
  { id: "metodo", label: "Método" },
  { id: "valores", label: "Valores" },
];

export default function NosotrosPage() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const valoresTrackRef = useRef<HTMLDivElement>(null);

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

  // Scroll-driven horizontal motion — synced with Lenis via gsap.ticker
  useEffect(() => {
    const track = valoresTrackRef.current;
    if (!track) return;

    function update() {
      const section = sectionRefs.current.get("valores");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionH - viewH)));
      const maxX = Math.max(0, track.offsetWidth - (track.parentElement?.offsetWidth ?? 0));
      track.style.transform = `translateX(${-progress * maxX}px)`;
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
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
            items={sections}
            activeId={activeId}
            onSelect={scrollToSection}
            top={HEADER_H}
            ariaLabel="Nosotros"
          />

          {/* Right column */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* Hero — above the fold */}
            <section
              id="itaca"
              ref={(el) => { if (el) sectionRefs.current.set("itaca", el); }}
              className="px-4 sm:px-16 pt-16 pb-8 flex flex-col"
              style={{ minHeight: "calc(100vh - 72px)" }}
            >
              <h1 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none">
                Nuestro trabajo nos define. Nos gusta la seriedad
              </h1>

              <div className="flex flex-col gap-2 mt-8">
                <p className="text-foreground text-[18px] font-light leading-relaxed">
                  Diseñamos y damos forma a cómo los players más importantes de diferentes sectores dejan una huella positiva más allá de los tendencias y cánones establecidos.
                </p>
                <p className="text-foreground text-[18px] font-light leading-relaxed">
                  Combinamos creatividad, diseño, tecnología y datos para convertir las palabras en acciones y las ideas en resultados tangibles.
                </p>
              </div>

              <div className="mt-10 flex-1 bg-brand-border w-full rounded-[4px]" />
            </section>

            {/* ── Equipo ── */}
            <section
              id="equipo"
              ref={(el) => { if (el) sectionRefs.current.set("equipo", el); }}
              className="px-4 sm:px-16 py-16 flex flex-col gap-12"
            >
              <div className="flex flex-col gap-6">
                <h2 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none">
                  El equipo detrás de horas de análisis, trabajo y patata
                </h2>
                <div className="flex flex-col gap-2">
                  <p className="text-foreground text-[18px] font-light leading-relaxed">
                    Diseñamos y damos forma a cómo los players más importantes de diferentes sectores dejan una huella positiva más allá de los tendencias y cánones establecidos.
                  </p>
                  <p className="text-foreground text-[18px] font-light leading-relaxed">
                    Combinamos creatividad, diseño, tecnología y datos para convertir las palabras en acciones y las ideas en resultados tangibles.
                  </p>
                </div>
              </div>

              {/* R&B — fundadores */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-foreground text-[26px]">R&B</p>
                  <p className="text-foreground text-[16px] font-light leading-relaxed">
                    RB no son dos letras, son dos personas de carne y hueso: Javier Revuelta y Antonio González. Sin ellos no sabríamos poner rumbo a Ítaca.
                  </p>
                </div>
                <div className="flex gap-[47px]">
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[344px] w-full bg-placeholder rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Antonio González</p>
                      <p className="text-brand-muted text-[20px]">Fundador y Director de Estrategia</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[344px] w-full bg-placeholder rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Javier Revuelta</p>
                      <p className="text-brand-muted text-[20px]">Fundador y CEO</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ÍTACA — equipo */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-foreground text-[26px]">ÍTACA</p>
                  <p className="text-foreground text-[16px] font-light leading-relaxed">
                    RB no son dos letras, son dos personas de carne y hueso: Javier Revuelta y Antonio González. Sin ellos no sabríamos poner rumbo a Ítaca.
                  </p>
                </div>
                <div className="flex gap-[47px]">
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[228px] w-full bg-placeholder rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Patricia Orgaz</p>
                      <p className="text-brand-muted text-[20px]">Gestión de cuentas y PPC</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[228px] w-full bg-placeholder rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Isabel Villoria</p>
                      <p className="text-brand-muted text-[20px]">Desarrollo Web y Posicionamiento</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[228px] w-full bg-placeholder rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Mario Zornoza</p>
                      <p className="text-brand-muted text-[20px]">Diseño UI/UX</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Método ── */}
            <section
              id="metodo"
              ref={(el) => { if (el) sectionRefs.current.set("metodo", el); }}
              className="px-4 sm:px-16 py-16 flex flex-col gap-6"
            >
              <h2 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none">
                Nuestra metodología: Impact-Driven Growth™
              </h2>
              <div className="flex flex-col gap-2">
                <p className="text-foreground text-[18px] font-light leading-relaxed">
                  No trabajamos con listas de tareas. Trabajamos con arquitecturas de impacto. Impact-Driven Growth™ es el framework propio que conecta cada decisión con el impacto que tu organización necesita generar — desde la métrica estratégica hasta los experimentos que lo validan.
                </p>
                <p className="text-foreground text-[18px] font-light leading-relaxed">
                  Seis capas de disciplina metodológica: CPVM → Métricas de impacto → Outcomes → Iniciativas → Hipótesis → Experimentos.
                </p>
                <p className="text-foreground text-[18px] font-light leading-relaxed">
                  Está documentado en un libro, enseñado en una formación específica y operado con una herramienta de IA propia.
                </p>
              </div>
            </section>

            {/* ── Valores — scroll-driven horizontal ── */}
            <div
              id="valores"
              ref={(el) => { if (el) sectionRefs.current.set("valores", el); }}
              style={{ height: "200vh" }}
            >
              <div
                className="sticky flex flex-col overflow-hidden"
                style={{ top: HEADER_H }}
              >
                <h2 className="px-4 sm:px-16 pt-16 pb-4 text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none shrink-0">
                  Ítaca son sus Valores
                </h2>

                <div
                  ref={valoresTrackRef}
                  className="flex items-center gap-16 pl-4 sm:pl-16 shrink-0 mt-4"
                  style={{ width: "max-content", willChange: "transform" }}
                >
                  {valores.map((v) => (
                    <div key={v} className="flex items-center gap-8 shrink-0">
                      <p className="text-foreground text-[120px] font-light leading-none whitespace-nowrap">
                        {v}
                      </p>
                      <div className="bg-placeholder h-[162px] w-[276px] shrink-0 rounded-[4px]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
