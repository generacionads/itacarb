"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";
import { MetricBox } from "@/components/ui/MetricBox";
import gsap from "gsap";

const sectors = [
  {
    id: "arquitectura",
    name: "Arquitectura y Diseño",
    image: "/sectors/arquitectura.jpg",
    stat: "17%",
    statLabel: "+ DE CAPTACIÓN DIGITAL",
  },
  {
    id: "sanitario",
    name: "Clínicas y sector salud",
    image: null,
    stat: "15x",
    statLabel: "PACIENTES RECURRENTES",
  },
  {
    id: "industrial",
    name: "Industrial",
    image: null,
    stat: "40%",
    statLabel: "CRECIMIENTO MEDIO",
  },
];

function MetricsBorder({ stat, statLabel }: { stat: string; statLabel: string }) {
  return (
    <MetricBox className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 w-full sm:w-fit">
      <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em]">
        {stat}
      </p>
      <p className="text-foreground text-[16px] font-light tracking-[0.04em] uppercase">
        {statLabel}
      </p>
    </MetricBox>
  );
}

function SectorCard({ sector }: { sector: (typeof sectors)[0] }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-foreground text-[20px] font-medium tracking-[0.04em]">
          {sector.name}
        </p>
        <div className="relative h-[201px] w-full overflow-hidden bg-placeholder">
          {sector.image && (
            <Image src={sector.image} alt={sector.name} fill className="object-cover" />
          )}
        </div>
      </div>
      <MetricsBorder stat={sector.stat} statLabel={sector.statLabel} />
    </div>
  );
}

export function Sectors() {
  const [current, setCurrent] = useState(0);
  const maxIndex = 2;
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (cardRefs.current[2]) {
      gsap.set(cardRefs.current[2], { rotateY: -18 });
    }
  }, []);

  const navigate = (dir: 1 | -1) => {
    const next = Math.max(0, Math.min(maxIndex, current + dir));
    if (next === current) return;

    const card = cardRefs.current[0];
    if (!card || !trackRef.current) return;

    const cardWidth = card.offsetWidth;
    const gap = 24;

    gsap.to(trackRef.current, {
      x: -(next * (cardWidth + gap)),
      duration: 0.6,
      ease: "power2.inOut",
    });

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const peekIndex = next + 2;
      gsap.to(el, {
        rotateY: i === peekIndex ? -18 : 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
    });

    setCurrent(next);
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <Container>
        <div className="mb-16">
          <RevealH2
            className="text-foreground text-4xl md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
          >
            Sectores que conocemos bien
          </RevealH2>
        </div>
      </Container>

      <div className="pl-4 sm:pl-16" style={{ perspective: "1200px" }}>
        <div ref={trackRef} className="flex gap-6" style={{ willChange: "transform" }}>
          {sectors.map((sector, i) => (
            <div
              key={sector.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="flex-none w-[80vw] md:w-[45vw]"
              style={{ transformOrigin: "left center", willChange: "transform" }}
            >
              <SectorCard sector={sector} />
            </div>
          ))}
          {/* CTA card */}
          <div
            ref={(el) => { cardRefs.current[3] = el; }}
            className="flex-none w-[80vw] md:w-[45vw]"
            style={{ transformOrigin: "left center", willChange: "transform" }}
          >
            <a href="/sectores" className="flex flex-col gap-8 group">
              <div className="flex flex-col gap-4">
                <p className="text-[20px] font-medium tracking-[0.04em] invisible" aria-hidden="true">
                  &nbsp;
                </p>
                <div className="h-[201px] w-full bg-brand-accent flex items-end p-6 transition-opacity group-hover:opacity-90">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12H19M13 6l6 6-6 6" stroke="var(--color-background)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="bg-brand-accent p-8 flex items-center w-fit transition-opacity group-hover:opacity-90">
                <p className="text-background text-[32px] font-medium leading-tight tracking-[-0.04em] whitespace-nowrap">
                  Explorar sectores →
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Container>
        <div className="flex items-center justify-end gap-4 mt-10">
          <button
            onClick={() => navigate(-1)}
            disabled={current === 0}
            aria-label="Anterior"
            className="flex items-center justify-center w-12 h-12 border border-foreground text-foreground transition-colors disabled:opacity-30 hover:text-brand-accent-dark hover:border-brand-accent-dark"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={current === maxIndex}
            aria-label="Siguiente"
            className="flex items-center justify-center w-12 h-12 border border-foreground text-foreground transition-colors disabled:opacity-30 hover:text-brand-accent-dark hover:border-brand-accent-dark"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}
