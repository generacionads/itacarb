"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const data = [
  {
    h2: "Comprendemos tu marca y sus desafíos",
    subsections: [
      {
        id: "descubrir",
        label: "Descubrir",
        verb: "Descubrimos",
        body: "problemas y formas de hacer las cosas que pueden estar lastrando el crecimiento.",
        items: ["Pre-análisis", "Benchmarking"],
      },
      {
        id: "explorar",
        label: "Explorar",
        verb: "Exploramos",
        body: "el mercado, la competencia y las oportunidades que pueden impulsar tu negocio.",
        items: ["Análisis de mercado", "Mapa de oportunidades"],
      },
    ],
  },
  {
    h2: "Proyectamos tu estrategia de marca",
    subsections: [
      {
        id: "proyectar",
        label: "Proyectar",
        verb: "Proyectamos",
        body: "una estrategia coherente con tus objetivos que define con claridad qué hacer, cómo hacerlo y en qué orden.",
        items: ["Estrategia de marca", "Plan de acción"],
      },
    ],
  },
  {
    h2: "Materializamos tu estrategia",
    subsections: [
      {
        id: "construir",
        label: "Construir",
        verb: "Construimos",
        body: "las piezas y activos de comunicación que hacen crecer tu negocio de forma coherente.",
        items: ["Identidad visual", "Contenidos y campañas"],
      },
      {
        id: "evolucionar",
        label: "Evolucionar",
        verb: "Evolucionamos",
        body: "continuamente el posicionamiento para mantener la relevancia y garantizar el crecimiento real.",
        items: ["Seguimiento y optimización", "Consultoría continua"],
      },
    ],
  },
];

const allSubsections = data.flatMap((cat) =>
  cat.subsections.map((s) => ({ ...s, h2: cat.h2 }))
);

function AccordionItem({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#eae8e3]">
      <button
        className="flex w-full items-center justify-between py-4 px-1 text-left"
        onClick={() => setOpen(!open)}
      >
        <span
          className="text-[18px] font-light text-[#36383a]"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {label}
        </span>
        <span className="flex items-center justify-center p-3 shrink-0 text-[#c8553d]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d={open ? "M5 12H19" : "M12 5V19M5 12H19"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-6 px-1">
          <p
            className="text-[#7a7c7e] text-[16px] font-light leading-relaxed"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Contenido de {label}.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ServicioPage() {
  const [activeId, setActiveId] = useState(allSubsections[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const activeSection = allSubsections.find((s) => s.id === activeId) ?? allSubsections[0];

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
    // 72px header + ~150px sticky H2
    const top = el.getBoundingClientRect().top + window.scrollY - 220;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-[#f9f8f6] min-h-screen flex flex-col">
        <div className="flex flex-1">
          {/* Left sticky nav */}
          <aside className="hidden md:flex flex-col sticky top-[72px] self-start h-[calc(100vh-72px)] w-[33%] shrink-0 px-4 sm:px-16 py-16">
            <nav className="flex flex-col gap-12" aria-label="Servicios">
              {allSubsections.map((s) => (
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
          <div className="flex-1">
            {/* Sticky H2 */}
            <div className="sticky top-[72px] z-10 bg-[#f9f8f6] px-4 sm:px-16 py-12">
              <h2
                className="text-[#36383a] text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-none"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                {activeSection.h2}
              </h2>
            </div>

            {/* Sections */}
            {allSubsections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(s.id, el);
                }}
                className="px-4 sm:px-16 py-16 border-b border-[#eae8e3]"
              >
                <p
                  className="text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                  <span className="text-[#c8553d]">{s.verb}</span>{" "}
                  <span className="text-[#36383a]">{s.body}</span>
                </p>

                <div className="mt-10 max-w-[300px]">
                  {s.items.map((item) => (
                    <AccordionItem key={item} label={item} />
                  ))}
                </div>

                <div className="mt-10 bg-[#eae8e3] h-60 w-full" />
              </section>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
