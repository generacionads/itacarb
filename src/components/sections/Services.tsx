"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const grayPathRef = useRef<SVGPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskBgRef = useRef<SVGRectElement>(null);
  const maskStartRef = useRef<SVGRectElement>(null);
  const maskEndRef = useRef<SVGRectElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const rows = rowsRef.current;
    const grayPath = grayPathRef.current;
    const path = pathRef.current;
    const maskBg = maskBgRef.current;
    const maskStart = maskStartRef.current;
    const maskEnd = maskEndRef.current;
    const img1 = img1Ref.current;
    const img2 = img2Ref.current;
    const img3 = img3Ref.current;
    if (!section || !rows || !grayPath || !path || !maskBg || !maskStart || !maskEnd || !img1 || !img2 || !img3) return;

    const build = () => {
      tlRef.current?.kill();
      stRef.current?.kill();

      const rB = rows.getBoundingClientRect();
      const rel = (el: HTMLDivElement) => {
        const b = el.getBoundingClientRect();
        return {
          l: b.left - rB.left,
          r: b.right - rB.left,
          t: b.top - rB.top,
          b: b.bottom - rB.top,
        };
      };

      const i1 = rel(img1);
      const i2 = rel(img2);
      const i3 = rel(img3);

      const edge = i1.r * 0.18; // length of fade-in/out extension segments
      const pad = 6;             // half-height of mask rects (covers stroke width)

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

      grayPath.setAttribute("d", d);
      path.setAttribute("d", d);

      // Mask background: covers the full path area
      maskBg.setAttribute("x", "-10");
      maskBg.setAttribute("y", String(i1.t - pad));
      maskBg.setAttribute("width", String(rB.width + 20));
      maskBg.setAttribute("height", String(i3.b - i1.t + pad * 2));

      // Fade-in rect at path start (horizontal segment on img1's top border)
      // gradient goes transparent(left=path tip) → opaque(right=corner)
      maskStart.setAttribute("x", String(i1.r - edge));
      maskStart.setAttribute("y", String(i1.t - pad));
      maskStart.setAttribute("width", String(edge));
      maskStart.setAttribute("height", String(pad * 2));

      // Fade-out rect at path end (horizontal segment on img3's bottom border)
      // same gradient: transparent at left (path tip) → opaque at right (corner)
      maskEnd.setAttribute("x", String(i3.r - edge));
      maskEnd.setAttribute("y", String(i3.b - pad));
      maskEnd.setAttribute("width", String(edge));
      maskEnd.setAttribute("height", String(pad * 2));

      const len = path.getTotalLength();
      gsap.set([grayPath, path], { strokeDasharray: len, strokeDashoffset: len });

      // Gray traces slightly ahead of orange
      const tl = gsap.timeline({ paused: true });
      tl.to(grayPath, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
      tl.to(path,     { strokeDashoffset: 0, ease: "none", duration: 1 }, 0.1);
      tlRef.current = tl;

      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1.2,
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
    };
  }, []);

  return (
    <section ref={sectionRef} id="servicio" className="py-24 bg-[#f9f8f6]">
      <Container>
        <h2
          className="text-[#36383a] text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Cada marca tiene su Ítaca. Nosotros navegamos contigo.
        </h2>

        <div ref={rowsRef} className="relative mt-16 flex flex-col gap-12">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block overflow-visible z-10"
            aria-hidden="true"
          >
            <defs>
              {/* Transparent (left) → opaque (right) — applied to both fade rects */}
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
                ref={grayPathRef}
                stroke="#7a7c7e"
                strokeWidth="2.5"
                strokeLinecap="square"
                fill="none"
              />
              <path
                ref={pathRef}
                stroke="#c8553d"
                strokeWidth="2.5"
                strokeLinecap="square"
                fill="none"
              />
            </g>
          </svg>

          {/* Row 1: Imagen izquierda · Texto derecha */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-0">
            <div
              ref={img1Ref}
              className="relative w-full md:w-[67%] aspect-[912/467] shrink-0 overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80&auto=format&fit=crop"
                alt="Vista aérea del océano"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 67vw"
              />
            </div>
            <div
              className="flex flex-col gap-3 md:w-[30%]"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              <h3 className="text-[#36383a] text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Comprendemos
              </h3>
              <p className="text-[#36383a] text-[16px] font-light tracking-[0.04em]">
                Cada empresa es un punto de partida distinto. Nos adentramos en tu negocio, tu sector y tu entorno competitivo para entender con precisión qué puede impulsar tu crecimiento.
              </p>
            </div>
          </div>

          {/* Row 2: Texto izquierda · Imagen derecha */}
          <div className="flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
            <div
              className="flex flex-col gap-3 md:w-[30%]"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              <h3 className="text-[#36383a] text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Proyectamos
              </h3>
              <p className="text-[#36383a] text-[16px] font-light tracking-[0.04em]">
                Transformamos el análisis en decisiones. Desarrollamos una estrategia coherente con tus objetivos, que define con claridad qué hacer, cómo hacerlo y en qué orden.
              </p>
            </div>
            <div
              ref={img2Ref}
              className="relative w-full md:w-[67%] aspect-[914/467] shrink-0 overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&q=80&auto=format&fit=crop"
                alt="Horizonte marino al atardecer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 67vw"
              />
            </div>
          </div>

          {/* Row 3: Imagen izquierda · Texto derecha */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
            <div
              ref={img3Ref}
              className="relative w-full md:w-[67%] aspect-[912/467] shrink-0 overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop"
                alt="Costa y orilla del mar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 67vw"
              />
            </div>
            <div
              className="flex flex-col gap-3 md:w-[30%]"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              <h3 className="text-[#36383a] text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Materializamos
              </h3>
              <p className="text-[#36383a] text-[16px] font-light tracking-[0.04em]">
                La estrategia cobra vida. Implementamos, medimos y evolucionamos para garantizar que cada acción contribuye al crecimiento real de tu empresa.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
