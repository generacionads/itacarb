"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const HEADER_H = 72;

// TODO: completar con los 3 valores restantes
const valores = ["Frescos", "Resolutivos", "Valor 3", "Valor 4", "Valor 5"];

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

  // Scroll-driven horizontal motion — sincronizado con Lenis via gsap.ticker
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
      <main className="pt-[72px] bg-[#f9f8f6] min-h-screen flex flex-col">

        <div className="flex flex-1">

          {/* Sticky sidebar */}
          <aside
            className="hidden md:flex flex-col sticky self-start w-[33%] shrink-0 px-4 sm:px-16 py-16"
            style={{ top: HEADER_H }}
          >
            <nav className="flex flex-col gap-8" aria-label="Nosotros">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={cn(
                    "text-left text-[20px] font-medium tracking-[-0.04em] capitalize transition-colors duration-200",
                    activeId === s.id
                      ? "text-[#a3422e]"
                      : "text-[#7a7c7e] hover:text-[#36383a]"
                  )}
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right column */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* Hero — ocupa el above the fold */}
            <section
              id="itaca"
              ref={(el) => { if (el) sectionRefs.current.set("itaca", el); }}
              className="px-4 sm:px-16 pt-16 pb-8 flex flex-col"
              style={{ minHeight: "calc(100vh - 72px)" }}
            >
              <h1
                className="text-[#36383a] text-[48px] font-medium tracking-[-0.04em] leading-none"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                Nuestro trabajo nos define. Nos gusta la seriedad
              </h1>

              <div className="flex flex-col gap-2 mt-8">
                <p
                  className="text-[#36383a] text-[18px] font-light leading-relaxed"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  Diseñamos y damos forma a cómo los players más importantes de diferentes sectores dejan una huella positiva más allá de los tendencias y cánones establecidos.
                </p>
                <p
                  className="text-[#36383a] text-[18px] font-light leading-relaxed"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  Combinamos creatividad, diseño, tecnología y datos para convertir las palabras en acciones y las ideas en resultados tangibles.
                </p>
              </div>

              {/* Imagen equipo — placeholder */}
              <div className="mt-10 flex-1 bg-[#eae8e3] w-full rounded-[4px]" />
            </section>

            {/* ── Equipo ── */}
            <section
              id="equipo"
              ref={(el) => { if (el) sectionRefs.current.set("equipo", el); }}
              className="px-4 sm:px-16 py-16 flex flex-col gap-12"
            >
              {/* H2 + descripción */}
              <div className="flex flex-col gap-6">
                <h2
                  className="text-[#36383a] text-[48px] font-medium tracking-[-0.04em] leading-none"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  El equipo detrás de horas de análisis, trabajo y patata
                </h2>
                <div className="flex flex-col gap-2">
                  <p className="text-[#36383a] text-[18px] font-light leading-relaxed" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    Diseñamos y damos forma a cómo los players más importantes de diferentes sectores dejan una huella positiva más allá de los tendencias y cánones establecidos.
                  </p>
                  <p className="text-[#36383a] text-[18px] font-light leading-relaxed" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    Combinamos creatividad, diseño, tecnología y datos para convertir las palabras en acciones y las ideas en resultados tangibles.
                  </p>
                </div>
              </div>

              {/* R&B — fundadores */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-[#36383a] text-[26px]" style={{ fontFamily: "Satoshi, sans-serif" }}>R&B</p>
                  <p className="text-[#36383a] text-[16px] font-light leading-relaxed" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    RB no son dos letras, son dos personas de carne y hueso: Javier Revuelta y Antonio González. Sin ellos no sabríamos poner rumbo a Ítaca.
                  </p>
                </div>
                <div className="flex gap-[47px]">
                  {/* Antonio González */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[344px] w-full bg-[#eae8e3] rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#36383a] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Antonio González</p>
                      <p className="text-[#7a7c7e] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Fundador y Director de Estrategia</p>
                    </div>
                  </div>
                  {/* Javier Revuelta */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[344px] w-full bg-[#eae8e3] rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#36383a] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Javier Revuelta</p>
                      <p className="text-[#7a7c7e] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Fundador y CEO</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ÍTACA — equipo */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-[#36383a] text-[26px]" style={{ fontFamily: "Satoshi, sans-serif" }}>ÍTACA</p>
                  <p className="text-[#36383a] text-[16px] font-light leading-relaxed" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    RB no son dos letras, son dos personas de carne y hueso: Javier Revuelta y Antonio González. Sin ellos no sabríamos poner rumbo a Ítaca.
                  </p>
                </div>
                <div className="flex gap-[47px]">
                  {/* Patricia Orgaz */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[228px] w-full bg-[#eae8e3] rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#36383a] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Patricia Orgaz</p>
                      <p className="text-[#7a7c7e] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Gestión de cuentas y PPC</p>
                    </div>
                  </div>
                  {/* Isabel Villoria */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[228px] w-full bg-[#eae8e3] rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#36383a] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Isabel Villoria</p>
                      <p className="text-[#7a7c7e] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Desarrollo Web y Posicionamiento</p>
                    </div>
                  </div>
                  {/* Mario Zornoza */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="h-[228px] w-full bg-[#eae8e3] rounded-[4px]" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#36383a] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Mario Zornoza</p>
                      <p className="text-[#7a7c7e] text-[20px]" style={{ fontFamily: "Satoshi, sans-serif" }}>Diseño UI/UX</p>
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
              <h2
                className="text-[#36383a] text-[48px] font-medium tracking-[-0.04em] leading-none"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                Nuestra metodología: Impact-Driven Growth™
              </h2>
              <div className="flex flex-col gap-2">
                <p className="text-[#36383a] text-[18px] font-light leading-relaxed" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  No trabajamos con listas de tareas. Trabajamos con arquitecturas de impacto. Impact-Driven Growth™ es el framework propio que conecta cada decisión con el impacto que tu organización necesita generar — desde la métrica estratégica hasta los experimentos que lo validan.
                </p>
                <p className="text-[#36383a] text-[18px] font-light leading-relaxed" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  Seis capas de disciplina metodológica: CPVM → Métricas de impacto → Outcomes → Iniciativas → Hipótesis → Experimentos.
                </p>
                <p className="text-[#36383a] text-[18px] font-light leading-relaxed" style={{ fontFamily: "Satoshi, sans-serif" }}>
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
                <h2
                  className="px-4 sm:px-16 pt-16 pb-4 text-[#36383a] text-[48px] font-medium tracking-[-0.04em] leading-none shrink-0"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  Ítaca son sus Valores
                </h2>

                {/* Track horizontal — se desliza con el scroll */}
                  <div
                    ref={valoresTrackRef}
                    className="flex items-center gap-16 pl-4 sm:pl-16 shrink-0 mt-4"
                    style={{ width: "max-content", willChange: "transform" }}
                  >
                    {valores.map((v) => (
                      <div key={v} className="flex items-center gap-8 shrink-0">
                        <p
                          className="text-[#36383a] text-[120px] font-light leading-none whitespace-nowrap"
                          style={{ fontFamily: "Satoshi, sans-serif" }}
                        >
                          {v}
                        </p>
                        <div className="bg-[#d9d9d9] h-[162px] w-[276px] shrink-0 rounded-[4px]" />
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
