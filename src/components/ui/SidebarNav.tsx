"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  top?: number;
  ariaLabel?: string;
  /** Selector for the element whose approach should hide the nav. Defaults to the page footer. */
  hideBeforeSelector?: string;
}

export function SidebarNav({ items, activeId, onSelect, top = 72, ariaLabel, hideBeforeSelector = "footer" }: SidebarNavProps) {
  const [hidden, setHidden] = useState(false);
  // Starts false when the nav sits below a hero (e.g. it doesn't open the
  // page), so it reveals in on scroll instead of just snapping into place.
  const [revealed, setRevealed] = useState(false);
  const asideRef = useRef<HTMLElement>(null);

  // Reveal-on-scroll: mirrors the hide-near-contact animation, but for the
  // nav's entrance — and, symmetrically, it hides again if the user scrolls
  // back up past it (e.g. back to the hero). Tracked continuously (not a
  // one-time flag): revealed whenever the nav has scrolled into the
  // viewport, hidden again once it hasn't. Computed synchronously before
  // the first paint, so a page where it already opens in view (e.g.
  // consultoria) never animates — the state is already true on frame one.
  useLayoutEffect(() => {
    const el = asideRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    // A margin means the top padding merely peeking into frame doesn't
    // count — the links themselves need to be meaningfully on screen.
    const REVEAL_MARGIN = 300;
    const update = () => setRevealed(el.getBoundingClientRect().top < window.innerHeight - REVEAL_MARGIN);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = document.querySelector(hideBeforeSelector);
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only hide on genuine scroll-to-bottom. Skip if the target is
        // visible simply because the content is short (e.g. after filtering).
        if (entry.isIntersecting && window.scrollY < 100) return;
        setHidden(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hideBeforeSelector]);

  const visible = revealed && !hidden;

  return (
    <aside
      ref={asideRef}
      className="hidden md:flex flex-col sticky self-start w-[33%] shrink-0 px-4 sm:px-16 py-16"
      style={{ top }}
    >
      <nav className="flex flex-col gap-8" aria-label={ariaLabel}>
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "text-left text-[20px] font-medium tracking-[-0.04em] capitalize",
              activeId === item.id
                ? "text-brand-accent-dark"
                : "text-brand-muted hover:text-foreground"
            )}
            style={{
              clipPath: visible ? "inset(0 0 -0.2em 0)" : "inset(0 0 110% 0)",
              // Hiding collapses bottom-to-top; revealing cascades top-to-bottom.
              transition: `clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
                hidden ? (items.length - 1 - i) * 0.07 : i * 0.07
              }s, color 200ms ease`,
              pointerEvents: visible ? "auto" : "none",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
