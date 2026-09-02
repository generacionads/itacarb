"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { RevealH2 } from "@/components/ui/RevealH2";

const HEADER_H = 72;

const HERO_IMAGES = [
  "/fotos - nosotros/Fotos_GeneraciónAds (2 de 51).jpg",
  "/fotos - nosotros/Fotos_GeneraciónAds (5 de 51).jpg",
  "/fotos - nosotros/Fotos_GeneraciónAds (9 de 51).jpg",
  "/fotos - nosotros/Fotos_GeneraciónAds (12 de 51).jpg",
  "/fotos - nosotros/Fotos_GeneraciónAds (18 de 51).jpg",
  "/fotos - nosotros/Fotos_GeneraciónAds (20 de 51).jpg",
  "/fotos - nosotros/Fotos_GeneraciónAds (22 de 51).jpg",
];

function HeroTimelapse() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-10 flex-1 relative rounded-[4px] overflow-hidden min-h-[200px]">
      {HERO_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === index ? 1 : 0,
            transition: "opacity 600ms ease",
            zIndex: i === index ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

const valores = ["Fresca", "Resolutiva", "Transparente", "Exclusiva", "Estratega"];

const sections = [
  { id: "itaca", label: "Ítaca" },
  { id: "equipo", label: "Equipo" },
  { id: "valores", label: "Valores" },
  { id: "newsletter", label: "Newsletter" },
];

function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("pending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
        Apuntado. Nos vemos pronto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[600px]">
      <div className="border-b-2 border-brand-muted pb-6 px-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full bg-transparent text-[28px] md:text-[40px] font-medium tracking-[-0.04em] text-foreground placeholder:text-brand-muted outline-none"
        />
      </div>
      {status === "error" && (
        <p role="alert" className="text-brand-accent text-[16px] font-medium px-1">
          Algo ha salido mal. Inténtalo de nuevo.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "pending"}
        className="self-start flex items-center gap-4 text-foreground group disabled:opacity-50"
      >
        <span className="text-[32px] md:text-[40px] font-medium tracking-[-0.04em] leading-none">
          {status === "pending" ? "Enviando…" : "Suscribirme"}
        </span>
        {status !== "pending" && (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
            <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </form>
  );
}

function TeamPhoto({ height, video }: { height: string; video?: string }) {
  const playRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    const v = playRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.style.transition = "opacity 250ms ease";
    v.style.opacity = "1";
    v.play();
  }

  function handleLeave() {
    const v = playRef.current;
    if (!v) return;
    v.pause();
    v.style.transition = "opacity 280ms ease";
    v.style.opacity = "0";
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      if (v) v.currentTime = 0;
    }, 280);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const videoClass = "absolute inset-0 w-full h-full object-cover";

  return (
    <div
      className={`relative ${height} w-full bg-placeholder rounded-[4px] overflow-hidden`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {video && (
        <>
          <video
            src={video}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className={videoClass}
            onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = 0; }}
          />
          <video
            ref={playRef}
            src={video}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className={videoClass}
            style={{ opacity: 0 }}
            onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = 0; }}
            onEnded={handleLeave}
          />
        </>
      )}
    </div>
  );
}

export default function NosotrosPage() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const valoresTrackRef = useRef<HTMLDivElement>(null);
  const valoresItemsRef = useRef<HTMLParagraphElement[]>([]);

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
      if (!track) return;
      const section = sectionRefs.current.get("valores");
      if (!section || !track) return;
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

  // Reveal each valor word with a clip-path wipe when the section enters view
  useEffect(() => {
    const items = valoresItemsRef.current;
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(items, { clipPath: "inset(0px 0px 110% 0px)", y: 10 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.to(items, {
            clipPath: "inset(0px 0px -25% 0px)",
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const section = sectionRefs.current.get("valores");
    if (section) observer.observe(section);
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

              <HeroTimelapse />
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
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-[47px]">
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[228px]" video="/Vídeos - nosotros/Presentación_Patri.mp4" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Patricia Orgaz</p>
                      <p className="text-brand-muted text-[16px]">Estratega de cuentas y medios</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[228px]" video="/Vídeos - nosotros/Presentación Isa.mp4" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Isabel Villoria</p>
                      <p className="text-brand-muted text-[16px]">Ingeniería y presencia web</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[228px]" video="/Vídeos - nosotros/Presentación_Mario.mp4" />
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
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-[47px]">
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[344px]" video="/Vídeos - nosotros/Presentación_Antonio.mp4" />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground text-[20px]">Antonio González</p>
                      <p className="text-brand-muted text-[16px]">Fundador y Director de Estrategia</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <TeamPhoto height="h-[344px]" video="/Vídeos - nosotros/Presentación_Javi.mp4" />
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
              style={{ height: "200vh" }}
            >
              <div
                className="sticky flex flex-col overflow-x-clip"
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
                  {valores.map((v, i) => (
                    <p
                      key={v}
                      ref={(el) => { if (el) valoresItemsRef.current[i] = el; }}
                      className="text-foreground text-[120px] font-light leading-none whitespace-nowrap shrink-0"
                    >
                      {v}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Newsletter ── */}
            <section
              id="newsletter"
              ref={(el) => { if (el) sectionRefs.current.set("newsletter", el); }}
              className="px-4 sm:px-16 pt-24 pb-48 flex flex-col gap-12"
            >
              <div className="flex flex-col gap-6">
                <h2 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none">
                  La newsletter de Ítaca
                </h2>
                <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[55ch]">
                  Estrategia de marketing, tendencias de mercado y casos reales. Sin ruido, una vez al mes.
                </p>
              </div>
              <NewsletterForm />
            </section>

          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
