"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

export function AnimatedStatBox({ stats }: { stats: Stat[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  // undefined = first paint, let browser size naturally; after that, explicit px
  const [height, setHeight] = useState<number | undefined>(undefined);

  // ResizeObserver fires asynchronously (after layout, before next paint).
  // This guarantees two separate frames: one where content changes size,
  // and one where the container animates to the new measured height.
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setHeight(el.offsetHeight);
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (stats.length < 2) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % stats.length);
        setVisible(true);
      }, 380);
    }, 3500);
    return () => clearInterval(id);
  }, [stats.length]);

  const stat = stats[index];
  // p-8 = 32px top + 32px bottom (Tailwind default 16px root)
  const PADDING_V = 64;

  return (
    <div
      className="border border-foreground overflow-hidden"
      style={{
        padding: "2rem",
        ...(height !== undefined && { height: height + PADDING_V }),
        transition: "height 420ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        ref={contentRef}
        className="flex flex-col gap-6"
        style={{
          transition: "opacity 380ms cubic-bezier(0.16,1,0.3,1), transform 380ms cubic-bezier(0.16,1,0.3,1)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em]">
          {stat.value}
        </p>
        <p className="text-brand-accent text-[32px] font-medium tracking-[-0.04em] leading-tight">
          {stat.label}
        </p>
      </div>
    </div>
  );
}
