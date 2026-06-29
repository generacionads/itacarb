"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { LogoAnimated } from "@/components/ui/LogoAnimated";
import type Lenis from "lenis";

export function Hero() {
  const [ended, setEnded] = useState(false);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Reduced-motion: skip video, show logo immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoDesktopRef.current?.pause();
      videoMobileRef.current?.pause();
      setEnded(true);
    }
  }, []);

  const handleEnded = () => {
    setTimeout(() => setEnded(true), 600);
  };

  useEffect(() => {
    if (!buttonRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(buttonRef.current, { opacity: 1 });
      return;
    }
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.6 }
    );
  }, []);

  function handleScrollDown() {
    const target = document.getElementById("intro");
    if (!target) return;
    const lenis = (window as unknown as Record<string, Lenis>).__lenis as Lenis | undefined;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="relative w-full bg-background min-h-screen max-h-screen overflow-hidden">
      {/* Desktop */}
      <video
        ref={videoDesktopRef}
        className="hidden w-full md:block"
        src="/hero-itaca.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        aria-label="Vídeo introductorio de Ítacarb"
      />
      {/* Mobile */}
      <video
        ref={videoMobileRef}
        className="block w-full md:hidden"
        src="/hero-itaca-responsive.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        aria-label="Vídeo introductorio de Ítacarb"
      />

      {ended && (
        <div className="absolute inset-0 flex items-end justify-start pl-4 pb-8 sm:pl-16 sm:pb-12">
          <LogoAnimated />
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={handleScrollDown}
        aria-label="Ir al contenido"
        className="absolute bottom-8 right-4 sm:right-16 w-12 h-12 border border-foreground flex items-center justify-center opacity-0 hover:bg-foreground hover:text-background transition-colors duration-200"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
          <path d="M7 10l5 5 5-5z" fill="currentColor" />
        </svg>
      </button>
    </section>
  );
}
