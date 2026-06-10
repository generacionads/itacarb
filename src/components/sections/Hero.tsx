"use client";

import { useState } from "react";
import { LogoAnimated } from "@/components/ui/LogoAnimated";

export function Hero() {
  const [fading, setFading] = useState(false);
  const [ended, setEnded] = useState(false);

  const handleEnded = () => {
    setTimeout(() => {
      setFading(true);
      setTimeout(() => setEnded(true), 800);
    }, 600);
  };

  return (
    <section className="relative w-full bg-[#f9f8f6]">
      {/* Desktop */}
      <video
        className="hidden w-full md:block"
        src="/hero-itaca.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        style={{ opacity: fading ? 0 : 1, transition: "opacity 0.8s ease" }}
      />
      {/* Mobile */}
      <video
        className="block w-full md:hidden"
        src="/hero-itaca-responsive.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        style={{ opacity: fading ? 0 : 1, transition: "opacity 0.8s ease" }}
      />

      {ended && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LogoAnimated />
        </div>
      )}
    </section>
  );
}
