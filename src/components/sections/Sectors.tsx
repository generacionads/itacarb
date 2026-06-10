"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import gsap from "gsap";

const sectors = [
  {
    id: "arquitectura",
    name: "Estudios de Arquitectura",
    image: "/sectors/arquitectura.jpg",
    stat: "17%",
    statLabel: "+ DE CAPTACIÓN DIGITAL",
  },
  {
    id: "sanitario",
    name: "Servicios Sanitarios",
    image: null,
    stat: "3×",
    statLabel: "PACIENTES RECURRENTES",
  },
  {
    id: "industrial",
    name: "Industrial",
    image: null,
    stat: "40%",
    statLabel: "+ EFICIENCIA OPERATIVA",
  },
];

function SectorCard({ sector }: { sector: (typeof sectors)[0] }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="relative h-[201px] w-full overflow-hidden bg-[#e0ded9]">
          {sector.image && (
            <Image src={sector.image} alt={sector.name} fill className="object-cover" />
          )}
        </div>
        <p
          className="text-[#c8553d] text-[20px] font-medium tracking-[0.04em]"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {sector.name}
        </p>
      </div>
      <div className="border border-[#36383a] bg-[#f9f8f6] p-8 flex items-end gap-6 w-fit whitespace-nowrap">
        <p
          className="text-[#36383a] text-[64px] font-medium leading-[50px] tracking-[-0.04em]"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {sector.stat}
        </p>
        <p
          className="text-[#36383a] text-[16px] font-light tracking-[0.04em] uppercase"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {sector.statLabel}
        </p>
      </div>
    </div>
  );
}

export function Sectors() {
  const [current, setCurrent] = useState(0);
  const maxIndex = 1;
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
    <section className="py-24 bg-[#f9f8f6] overflow-hidden">
      {/* H2 + subtítulo */}
      <Container>
        <div className="flex flex-col gap-6 mb-16">
          <h2
            className="text-[#36383a] text-4xl md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Sectores que conocemos bien
          </h2>
          <p
            className="text-[#36383a] text-[18px] font-light tracking-[0.04em] max-w-3xl"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Diseñamos y damos forma a cómo los players más importantes de diferentes sectores dejan una huella positiva más allá de los tendencias y cánones establecidos.
          </p>
        </div>
      </Container>

      {/* Carrusel — empieza en el margen del Container, sangra hasta el borde derecho */}
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
        </div>
      </div>

      {/* Navegación */}
      <Container>
        <div className="flex items-center justify-end gap-4 mt-10">
          <button
            onClick={() => navigate(-1)}
            disabled={current === 0}
            aria-label="Anterior"
            className="flex items-center justify-center w-12 h-12 border border-[#36383a] text-[#36383a] transition-colors disabled:opacity-30 hover:text-[#a3422e] hover:border-[#a3422e]"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={current === maxIndex}
            aria-label="Siguiente"
            className="flex items-center justify-center w-12 h-12 border border-[#36383a] text-[#36383a] transition-colors disabled:opacity-30 hover:text-[#a3422e] hover:border-[#a3422e]"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}
