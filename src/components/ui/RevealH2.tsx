"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealH2Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3";
  splitBy?: "word" | "pair" | "block";
  /** Animate on mount even when the element is already in the viewport. */
  alwaysAnimate?: boolean;
}

export function RevealH2({
  children,
  className,
  style,
  as: Tag = "h2",
  splitBy = "word",
  alwaysAnimate = false,
}: RevealH2Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  // ready: JS has confirmed element is below fold and motion is OK → apply clip
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  // Above-fold variant: clip before first paint, then animate in after mount.
  // useLayoutEffect fires synchronously after DOM mutations and before the browser
  // paints, so `ready=true` (which applies clip-path) is committed before the user
  // ever sees the element — no flash.
  useLayoutEffect(() => {
    if (!alwaysAnimate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, [alwaysAnimate]);

  useEffect(() => {
    if (alwaysAnimate) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // 50ms gap so the clip-path render is committed before we lift the clip,
      // giving the CSS transition something to animate from.
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    }

    const el = ref.current;
    if (!el) return;

    // Reduced motion: leave content always visible
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already in viewport on load: skip animation to prevent visible-→-clipped flash
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    // Below fold: safe to hide and reveal on scroll
    setReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [alwaysAnimate]);

  if (splitBy === "block" || typeof children !== "string") {
    return (
      <Tag
        ref={ref}
        className={cn(className)}
        style={{
          ...style,
          ...(ready && {
            clipPath: visible ? "inset(0 0 -0.2em 0)" : "inset(0 0 100% 0)",
            transition: "clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
          }),
        }}
      >
        {children}
      </Tag>
    );
  }

  const words = (children as string).split(" ");

  const units =
    splitBy === "pair"
      ? words.reduce<string[]>((acc, w, i) => {
          if (i % 2 === 0) return [...acc, w];
          return [...acc.slice(0, -1), acc[acc.length - 1] + " " + w];
        }, [])
      : words;

  return (
    <Tag ref={ref} className={cn(className)} style={style}>
      {units.map((unit, i) => (
        // Space is a sibling text node outside the inline-block span —
        // trailing whitespace inside inline-block collapses and loses the gap
        <Fragment key={i}>
          <span
            style={{
              display: "inline-block",
              ...(ready && {
                clipPath: visible ? "inset(0 0 -0.2em 0)" : "inset(0 0 110% 0)",
                transition: `clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
              }),
            }}
          >
            {unit}
          </span>
          {i < units.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
