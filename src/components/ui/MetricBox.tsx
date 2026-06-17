"use client";

import { cn } from "@/lib/utils";

const BASE_BORDER = "1px solid var(--color-foreground)";
const SPREAD = 70;

interface MetricBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function MetricBox({ children, className }: MetricBoxProps) {
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    el.style.border = "1px solid transparent";
    el.style.background = [
      `linear-gradient(var(--color-background),var(--color-background)) padding-box`,
      `conic-gradient(from calc(${angle}deg - ${SPREAD}deg),` +
        `var(--color-foreground) 0deg,var(--color-brand-accent) ${SPREAD}deg,` +
        `var(--color-foreground) ${SPREAD * 2}deg ${360 - SPREAD * 2}deg,` +
        `var(--color-foreground) ${360 - SPREAD * 2}deg) border-box`,
    ].join(",");
  }

  function onLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.border = BASE_BORDER;
    e.currentTarget.style.background = "";
  }

  return (
    <div
      className={cn("bg-background cursor-default", className)}
      style={{ border: BASE_BORDER }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
