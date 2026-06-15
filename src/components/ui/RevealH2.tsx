"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealH2Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3";
  splitBy?: "word" | "pair" | "block";
}

export function RevealH2({
  children,
  className,
  style,
  as: Tag = "h2",
  splitBy = "word",
}: RevealH2Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

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
  }, []);

  // Block fallback — o children no es string
  if (splitBy === "block" || typeof children !== "string") {
    return (
      <Tag
        ref={ref}
        className={cn(className)}
        style={{
          ...style,
          clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
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
          return [...acc.slice(0, -1), acc[acc.length - 1] + " " + w];
        }, [])
      : words;

  return (
    <Tag ref={ref} className={cn(className)} style={style}>
      {units.map((unit, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 110% 0)",
            transition: `clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
          }}
        >
          {unit}
          {i < units.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
