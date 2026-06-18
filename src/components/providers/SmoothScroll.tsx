"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenisRef.current = lenis;
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as Record<string, unknown>).__lenis;
      gsap.ticker.remove(tick);
    };
  }, []);

  // On route change: reset scroll to 0, or scroll to hash anchor if present.
  // rAF ensures the new page has rendered before we reposition, avoiding a
  // visible flash of the previous page scrolling to 0.
  useEffect(() => {
    requestAnimationFrame(() => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          lenisRef.current?.scrollTo(el, { offset: -(72 + 16), duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
          ScrollTrigger.refresh();
          return;
        }
      }
      lenisRef.current?.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return <>{children}</>;
}
