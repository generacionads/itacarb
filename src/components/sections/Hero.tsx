"use client";

import { useState } from "react";
import { LogoAnimated } from "@/components/ui/LogoAnimated";

export function Hero() {
  const [ended, setEnded] = useState(false);

  const handleEnded = () => {
    setTimeout(() => setEnded(true), 600);
  };

  return (
    <section className="relative w-full bg-[#f9f8f6] max-h-screen overflow-hidden">
      {/* Desktop */}
      <video
        className="hidden w-full md:block"
        src="/hero-itaca.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
      />
      {/* Mobile */}
      <video
        className="block w-full md:hidden"
        src="/hero-itaca-responsive.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
      />

      {ended && (
        <div className="absolute inset-0 flex items-end justify-start p-8 sm:p-12">
          <LogoAnimated />
        </div>
      )}
    </section>
  );
}
