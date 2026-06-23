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
  // Double rAF: first frame commits React's new DOM, second ensures the browser
  // has laid out and measured the new page height. Only then do we call
  // lenis.resize() (re-reads scrollHeight) and ScrollTrigger.refresh(), so
  // Lenis's internal limit reflects the new page — not the previous one.
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lenis = lenisRef.current;
        const hash = window.location.hash.slice(1);
        if (hash) {
          const el = document.getElementById(hash);
          if (el) {
            lenis?.resize();
            ScrollTrigger.refresh();
            lenis?.scrollTo(el, { offset: -(72 + 16), duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
            return;
          }
        }
        lenis?.scrollTo(0, { immediate: true });
        lenis?.resize();
        ScrollTrigger.refresh();
      });
    });
  }, [pathname]);

  return <>{children}</>;
}
