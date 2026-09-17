"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealH2 } from "@/components/ui/RevealH2";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { AccordionItem } from "@/components/ui/Accordion";
import { WallCollisionBox, ZigZagPathBox, ShadowBox, PyramidBox, EllipsisBox } from "@/components/sections/ServiceAnimations";

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
        items: [
          { label: "Pre-análisis", body: "Antes de proponer nada, necesitamos entender dónde estás. Para ello, revisamos lo que has probado y los resultados que has obtenido, para partir de datos fiables. Aquí conseguiremos la foto de salida sobre la que construir todo." },
          { label: "Estudio de audiencia", body: "Tu marca no va dirigida a todo el mundo, busca alguien concreto. Por eso definimos quién es tu cliente ideal, qué necesita, cómo decide y dónde busca. Cuanto más nítida es la persona, el mensaje va a ser mucho más preciso." },
        ],
      },
      {
        id: "explorar",
        label: "Explorar",
        verb: "Exploramos",
        body: "tu entorno competitivo para identificar los espacios donde tu marca puede ganar.",
        items: [
          { label: "Análisis", body: "Aquí vemos el terreno de juego: cuál es tu mercado, tus competidores directos, dinámicas del sector, etc. Con ello, detectamos lo que hacen los demás y los posibles errores o espacios libres para que tu marca ocupe ese lugar." },
          { label: "Benchmarking", body: "En este punto comparamos tu presencia y la de los referentes de tu sector a nivel visibilidad, mensaje, experiencia y conversión. El resultado es un mapa con las fortalezas reales de tu marca y posibles brechas que podamos convertir en ventajas competitivas." },
        ],
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
        body: "una estrategia coherente con tus objetivos que define qué hacer, cómo hacerlo y en qué orden.",
        items: [
          { label: "Identidad y estrategia de marca", body: "Definimos lo que representa tu marca, lo que la hace distinta y la razón por la que deberían elegirte a ti en vez de a otros. Ese posicionamiento hay que traducirlo en un mensaje coherente, reconocible y que sostiene todas las decisiones de comunicación, separándonos del ruido de la competencia." },
          { label: "Plan de acción por fases", body: "Convertimos la estrategia en una hoja de ruta. Priorizamos lo más importante, vemos las acciones que pueden esperar y el impacto esperado de cada movimiento, para avanzar con foco y sin dispersar recursos." },
          { label: "Planificación de canales", body: "Vamos a los canales que le interesan a tu negocio. Elegimos dónde tiene sentido estar (Google, Meta, SEO, tu web...) y definimos el papel de cada canal en el recorrido del cliente, asignando objetivos y presupuesto." },
        ],
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
        body: "la estrategia pieza a pieza, garantizando que cada decisión tenga impacto real en tu negocio.",
        items: [
          { label: "Ejecución de canales", body: "La estrategia se pone a funcionar. Configuramos tus campañas y trabajamos en las acciones en cada canal en base a un criterio de rendimiento, cuidando que todo trabaje en la misma dirección: los objetivos de tu negocio, no métricas de vanidad." },
          { label: "Implementación y producción", body: "Se crea todo lo que necesitamos para que la estrategia arranque: piezas creativas, landing pages y desarrollo web. Con producción propia de diseño y vídeo, garantizamos calidad, coherencia y tiempos sin depender de terceros." },
        ],
      },
      {
        id: "evolucionar",
        label: "Evolucionar",
        verb: "Evolucionamos",
        body: "con datos reales, construyendo una base escalable que crece con tu negocio.",
        items: [
          { label: "Analítica y medición", body: "Sin medir, no se puede mejorar. Instalamos y configuramos la medición de tu negocio para convertir la actividad en conocimiento. Definimos los indicadores que de verdad importan y montamos el seguimiento para saber qué funciona, qué no y por qué." },
          { label: "Seguimiento y control", body: "De forma continua, vamos ajustando y mejorando la estrategia. Potenciamos lo que rinde mejor y corregimos lo que no, tomando cada decisión con datos reales, buscando un crecimiento sostenible mes a mes." },
        ],
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
      <main className="pt-16 sm:pt-[72px] bg-background min-h-screen flex flex-col">

        <div className="flex flex-col flex-1">

          {/* Sticky zone — h2 un-sticks naturally when this wrapper's bottom is reached */}
          <div className="relative">

            {/* Sticky H2 — full width */}
            <div
              ref={h2Ref}
              className="sticky top-16 sm:top-[72px] z-20 bg-brand-accent px-4 sm:px-16 py-12"
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

            <div className="flex">
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
                        <AccordionItem key={item.label} label={item.label}>
                          <p className="text-brand-muted text-[16px] font-light leading-relaxed">{item.body}</p>
                        </AccordionItem>
                      ))}
                    </div>

                    <div className="mt-10 h-60 w-full">
                      {s.id === "descubrir" && <WallCollisionBox />}
                      {s.id === "explorar" && <ZigZagPathBox />}
                      {s.id === "proyectar" && <ShadowBox />}
                      {s.id === "construir" && <PyramidBox />}
                      {s.id === "evolucionar" && <EllipsisBox />}
                    </div>
                  </section>
                ))}
              </div>
            </div>

          </div>

          {/* CTA — outside sticky zone, with extra top space */}
          <div className="px-4 sm:px-16 pt-32 pb-24 flex flex-col gap-8">
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

        <Footer />
      </main>
    </>
  );
}
