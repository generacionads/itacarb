"use client";

import { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";
import { CrackBox, FallBox, AssembleBox } from "@/components/sections/ServiceAnimations";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskBgRef = useRef<SVGRectElement>(null);
  const maskStartRef = useRef<SVGRectElement>(null);
  const maskEndRef = useRef<SVGRectElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Title color scrub — runs on all screen sizes
    const titleTweens: gsap.core.Tween[] = [];
    if (!prefersReducedMotion) {
      [row1Ref, row2Ref, row3Ref].forEach((rowRef) => {
        const row = rowRef.current;
        if (!row) return;
        const title = row.querySelector<HTMLElement>("h3");
        if (!title) return;
        const tw = gsap.fromTo(
          title,
          { color: "#36383A" },
          {
            color: "#C8553D",
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 70%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
        titleTweens.push(tw);
      });
    }

    if (window.innerWidth < 768) {
      return () => titleTweens.forEach((tw) => tw.scrollTrigger?.kill());
    }

    const section = sectionRef.current;
    const rows = rowsRef.current;
    const path = pathRef.current;
    const maskBg = maskBgRef.current;
    const maskStart = maskStartRef.current;
    const maskEnd = maskEndRef.current;
    const img1 = img1Ref.current;
    const img2 = img2Ref.current;
    const img3 = img3Ref.current;
    if (!section || !rows || !path || !maskBg || !maskStart || !maskEnd || !img1 || !img2 || !img3) return;

    // Entrance animations — only for below-fold rows, skipped entirely for reduced-motion
    if (!prefersReducedMotion) {
      [row1Ref.current, row2Ref.current, row3Ref.current].forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Only hide if genuinely below the fold — avoids visible-then-clipped flash
        if (rect.top >= window.innerHeight) {
          gsap.set(el, { opacity: 0, filter: "blur(16px)" });
        }
        gsap.to(el, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }

    // SVG path scroll animation — skip for reduced-motion (decorative only)
    if (prefersReducedMotion) return;

    const build = () => {
      tlRef.current?.kill();
      stRef.current?.kill();

      const relOffset = (el: HTMLDivElement) => {
        let left = 0, top = 0;
        let node: HTMLElement | null = el;
        while (node && node !== rows) {
          left += node.offsetLeft;
          top += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return { l: left, r: left + el.offsetWidth, t: top, b: top + el.offsetHeight };
      };
      const rel = relOffset;

      const i1 = rel(img1);
      const i2 = rel(img2);
      const i3 = rel(img3);

      const edge = i1.r * 0.18;
      const pad = 6;

      const d = [
        `M ${i1.r - edge} ${i1.t}`,
        `L ${i1.r} ${i1.t}`,
        `L ${i1.r} ${i2.t}`,
        `L ${i2.l} ${i2.t}`,
        `L ${i2.l} ${i3.t}`,
        `L ${i3.r} ${i3.t}`,
        `L ${i3.r} ${i3.b}`,
        `L ${i3.r - edge} ${i3.b}`,
      ].join(" ");

      path.setAttribute("d", d);

      maskBg.setAttribute("x", "-10");
      maskBg.setAttribute("y", String(i1.t - pad));
      maskBg.setAttribute("width", String(rows.offsetWidth + 20));
      maskBg.setAttribute("height", String(i3.b - i1.t + pad * 2));

      maskStart.setAttribute("x", String(i1.r - edge));
      maskStart.setAttribute("y", String(i1.t - pad));
      maskStart.setAttribute("width", String(edge));
      maskStart.setAttribute("height", String(pad * 2));

      maskEnd.setAttribute("x", String(i3.r - edge));
      maskEnd.setAttribute("y", String(i3.b - pad));
      maskEnd.setAttribute("width", String(edge));
      maskEnd.setAttribute("height", String(pad * 2));

      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({ paused: true });
      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
      tlRef.current = tl;

      stRef.current = ScrollTrigger.create({
        trigger: rows,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 2,
        animation: tl,
      });
    };

    const raf = requestAnimationFrame(build);
    const ro = new ResizeObserver(build);
    ro.observe(rows);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      tlRef.current?.kill();
      stRef.current?.kill();
      titleTweens.forEach((tw) => tw.scrollTrigger?.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="servicio" className="py-24 bg-background">
      <Container>
        <RevealH2
          className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
        >
          Cada marca tiene su Ítaca. Nosotros navegamos contigo.
        </RevealH2>

        <div ref={rowsRef} className="relative mt-16 flex flex-col gap-64">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block overflow-visible z-10"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="svc-fade" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </linearGradient>
              <mask id="svc-mask" maskUnits="userSpaceOnUse">
                <rect ref={maskBgRef} fill="white" />
                <rect ref={maskStartRef} fill="url(#svc-fade)" />
                <rect ref={maskEndRef} fill="url(#svc-fade)" />
              </mask>
            </defs>
            <g mask="url(#svc-mask)">
              <path
                ref={pathRef}
                stroke="var(--color-brand-accent)"
                strokeWidth="1"
                strokeLinecap="square"
                fill="none"
              />
            </g>
          </svg>

          {/* Row 1: Imagen izquierda · Texto derecha */}
          <div ref={row1Ref} className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-0">
            <div ref={img1Ref} className="relative w-full md:w-[67%] aspect-[912/467] shrink-0 overflow-hidden bg-background">
              <CrackBox triggerRef={row1Ref} />
            </div>
            <div className="flex flex-col gap-3 md:w-[30%]">
              <h3 className="text-foreground text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Comprendemos
              </h3>
              <p className="text-foreground text-[16px] font-light tracking-[0.04em]">
                Cada empresa es un punto de partida distinto. Nos adentramos en tu negocio, tu sector y tu entorno competitivo para entender con precisión qué puede impulsar tu crecimiento.
              </p>
            </div>
          </div>

          {/* Row 2: Texto izquierda · Imagen derecha */}
          <div ref={row2Ref} className="flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
            <div className="flex flex-col gap-3 md:w-[30%]">
              <h3 className="text-foreground text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Proyectamos
              </h3>
              <p className="text-foreground text-[16px] font-light tracking-[0.04em]">
                Transformamos el análisis en decisiones. Desarrollamos una estrategia coherente con tus objetivos, que define con claridad qué hacer, cómo hacerlo y en qué orden.
              </p>
            </div>
            <div ref={img2Ref} className="relative w-full md:w-[67%] aspect-[914/467] shrink-0 overflow-hidden bg-background">
              <FallBox triggerRef={row2Ref} />
            </div>
          </div>

          {/* Row 3: Imagen izquierda · Texto derecha */}
          <div ref={row3Ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
            <div ref={img3Ref} className="relative w-full md:w-[67%] aspect-[912/467] shrink-0 overflow-hidden bg-background">
              <AssembleBox triggerRef={row3Ref} />
            </div>
            <div className="flex flex-col gap-3 md:w-[30%]">
              <h3 className="text-foreground text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Materializamos
              </h3>
              <p className="text-foreground text-[16px] font-light tracking-[0.04em]">
                La estrategia cobra vida. Implementamos, medimos y evolucionamos para garantizar que cada acción contribuye al crecimiento real de tu empresa.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
