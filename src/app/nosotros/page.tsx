"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { RevealH2 } from "@/components/ui/RevealH2";

const HEADER_H = 72;

const valores = ["Fresca", "Resolutiva", "Transparente", "Exclusiva", "Estratega"];

const sections = [
  { id: "itaca", label: "Ítaca" },
  { id: "equipo", label: "Equipo" },
  { id: "valores", label: "Valores" },
];

function TeamPhoto({ height, video, grayscale }: { height: string; video?: string; grayscale?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    const v = videoRef.current;
    if (!v) return;
    v.style.transition = "opacity 200ms ease";
    v.style.opacity = "1";
    v.play();
  }

  function handleLeave() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.style.transition = "opacity 120ms ease";
    v.style.opacity = "0";
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      v.currentTime = 0;
      v.style.transition = "opacity 100ms ease";
      v.style.opacity = "1";
    }, 120);
  }

  return (
    <div
      className={`relative ${height} w-full bg-placeholder rounded-[4px] overflow-hidden`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover${grayscale ? " grayscale" : ""}`}
          onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = 0; }}
          onEnded={handleLeave}
        />
      )}
    </div>
  );
}

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
      // Full track width so the last card also exits left instead of staying pinned
      const maxX = track.offsetWidth;
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
              <RevealH2
                as="h1"
                alwaysAnimate
                splitBy="word"
                className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none text-balance"
              >
                Una consultora estratégica dónde el equipo es la diferencia.
              </RevealH2>

              <div className="flex flex-col gap-2 mt-8">
                <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch]">
                  Un equipo, con experiencia real en los sectores en los que trabajamos y con una forma de hacer las cosas en la que nos implicamos como si el negocio fuera nuestro.
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
                <h2 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none text-balance">
                  El equipo
                </h2>
                <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch]">
                  Ítaca somos las personas que hay detrás. Un equipo sin intermediarios, con experiencia en los sectores que trabajamos y con la convicción de que acompañar bien a un cliente empieza por conocerlo de verdad.
                </p>
              </div>

              {/* ÍTACA — equipo */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-foreground text-[26px]">ÍTACA</p>
                  <p className="text-foreground text-[16px] font-light leading-relaxed">
                    Detrás de cada entrega hay personas que se dejan la piel. El equipo que convierte las ideas en resultados y que mantiene el rumbo cuando el mar se complica.
                  </p>
                </div>
                <div className="flex gap-[47px]">
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[228px]" video="/prueba-equipo.mp4" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Patricia Orgaz</p>
                      <p className="text-brand-muted text-[16px]">Estratega de cuentas y medios</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[228px]" video="/prueba-equipo.mp4" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Isabel Villoria</p>
                      <p className="text-brand-muted text-[16px]">Ingeniería y presencia web</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[228px]" video="/IMG_1940.MOV" grayscale />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Mario Zornoza</p>
                      <p className="text-brand-muted text-[16px]">Diseño creativo e innovación</p>
                    </div>
                  </div>
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
                    <TeamPhoto height="h-[344px]" video="/prueba-equipo.mp4" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Antonio González</p>
                      <p className="text-brand-muted text-[16px]">Fundador y Director de Estrategia</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[344px]" video="/prueba-equipo.mp4" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Javier Revuelta</p>
                      <p className="text-brand-muted text-[16px]">Fundador y CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Valores — scroll-driven horizontal ── */}
            <div
              id="valores"
              ref={(el) => { if (el) sectionRefs.current.set("valores", el); }}
              style={{ height: "300vh" }}
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
