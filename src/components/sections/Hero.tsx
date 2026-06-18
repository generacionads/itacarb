"use client";

import { useState, useEffect, useRef } from "react";
import { LogoAnimated } from "@/components/ui/LogoAnimated";

export function Hero() {
  const [ended, setEnded] = useState(false);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);

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
        <div className="absolute inset-0 flex items-end justify-start p-8 sm:p-12">
          <LogoAnimated />
        </div>
      )}
    </section>
  );
}
