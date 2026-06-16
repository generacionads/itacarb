"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const HEADER_H = 72;

const sectors = [
  { id: "sanitarios", label: "Servicios Sanitarios" },
  { id: "arquitectura", label: "Estudios de Arquitectura" },
  { id: "industrial", label: "Servicios Industriales" },
  { id: "hoteles", label: "Hoteles" },
];

function FaqItem({ label }: { label: string }) {
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
      <main className="pt-[72px] bg-[#f9f8f6] min-h-screen flex flex-col">

        <div className="flex flex-1">

          {/* Sticky sidebar */}
          <aside
            className="hidden md:flex flex-col sticky self-start w-[33%] shrink-0 px-4 sm:px-16 py-16"
            style={{ top: HEADER_H }}
          >
            <nav className="flex flex-col gap-8" aria-label="Sectores">
              {sectors.map((s) => (
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
          <div className="flex-1 flex flex-col">

            {/* H1 + imagen placeholder — ocupa el above the fold */}
            <div
              className="px-4 sm:px-16 pt-16 pb-8 flex flex-col"
              style={{ minHeight: "calc(100vh - 72px)" }}
            >
              <h1
                className="text-[#36383a] text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                Profundizamos, dando luz a cada sector.
              </h1>
              <div className="mt-10 flex-1 bg-[#eae8e3] w-full" />
            </div>

            {/* ── Servicios Sanitarios ── */}

            {/* Bloque 1: H2 + métricas + imagen + descripción */}
            <section
              id="sanitarios"
              ref={(el) => { if (el) sectionRefs.current.set("sanitarios", el); }}
              className="px-4 sm:px-16 py-16 flex flex-col gap-12"
            >
              <h2
                className="text-[#36383a] text-[48px] font-medium tracking-[-0.04em] leading-none"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                Clínicas y negocios relacionados con el mundo de la salud
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="border border-[#36383a] p-8 flex items-end gap-6 flex-1">
                    <p
                      className="text-[#36383a] text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      40%
                    </p>
                    <p
                      className="text-[#c8553d] text-[16px] font-light tracking-[0.04em] uppercase"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      + Incremento de Pacientes
                    </p>
                  </div>
                  <div className="border border-[#36383a] p-8 flex items-end gap-6 flex-1">
                    <p
                      className="text-[#36383a] text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      164%
                    </p>
                    <p
                      className="text-[#c8553d] text-[16px] font-light tracking-[0.04em] uppercase"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      En Reducción de Costes
                    </p>
                  </div>
                </div>
                <div className="h-[201px] w-full bg-[#eae8e3]" />
              </div>

              <p
                className="text-[#36383a] text-[18px] font-light leading-relaxed"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                El sector del healthcare, crucial en la crisis del Covid-19, ha evolucionado hacia una integración y madurez digital, abrazando nuevas tecnologías para una atención personalizada y eficiente.
              </p>
            </section>

            {/* Bloque 2: Oportunidades numeradas */}
            <div className="px-4 sm:px-16 py-16 flex flex-col gap-8">
              <p
                className="text-[#36383a] text-[32px] font-medium tracking-[-0.04em] leading-tight"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                ¿Qué oportunidades hemos identificado en el sector de la salud?
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Puedes focalizar en los servicios que te den más rentabilidad, para evitar cargarte de trabajo.",
                  "Para conseguir más pacientes, no solo hay que tener una web, sino que necesitas combinar otras acciones de Marketing.",
                  "Podemos ayudarte a implementar un Sistema de Reservas Automatizado",
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <p
                      className="text-[#c8553d] text-[18px] font-light shrink-0 w-6 text-center"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p
                      className="text-[#36383a] text-[18px] font-light leading-relaxed"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloque 3: FAQ acordeón */}
            <div className="px-4 sm:px-16 py-16 flex flex-col gap-8">
              <p
                className="text-[#36383a] text-[32px] font-medium tracking-[-0.04em] leading-tight"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                Preguntas Frecuentes que hemos recibido de marcas en el sector de la salud
              </p>
              <div className="flex flex-col">
                <FaqItem label="Pre-análisis" />
                <FaqItem label="Benchmarking" />
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
