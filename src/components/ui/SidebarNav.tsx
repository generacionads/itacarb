"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  top?: number;
  ariaLabel?: string;
}

export function SidebarNav({ items, activeId, onSelect, top = 72, ariaLabel }: SidebarNavProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
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
              clipPath: hidden ? "inset(0 0 110% 0)" : "inset(0 0 -0.2em 0)",
              // Stagger from last to first: reverse of the reveal cascade
              transition: `clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(items.length - 1 - i) * 0.07}s, color 200ms ease`,
              pointerEvents: hidden ? "none" : "auto",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
