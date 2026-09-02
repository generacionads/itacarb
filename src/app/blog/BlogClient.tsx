"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { RevealH2 } from "@/components/ui/RevealH2";
import type { WpArticle } from "@/lib/wordpress";

const HEADER_H = 72;

const CATEGORIES = [
  { id: "marketing", label: "Marketing" },
  { id: "estrategia", label: "Estrategia" },
  { id: "tendencias", label: "Tendencias" },
  { id: "herramientas", label: "Herramientas" },
];

const CATEGORY_LABELS: Record<string, string> = {
  "marketing": "Marketing",
  "estrategia": "Estrategia",
  "tendencias": "Tendencias",
  "herramientas": "Herramientas",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleCard({ article }: { article: WpArticle }) {
  const date = article.publishedAt ?? article.createdAt;
  const categoryLabel = article.category ? CATEGORY_LABELS[article.category] : null;

  return (
    <a
      href={`/blog/${article.slug}`}
      className="article-card group flex flex-col border border-foreground"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        {article.cover ? (
          <Image
            src={article.cover.url}
            alt={article.cover.alternativeText ?? article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-placeholder" />
        )}
      </div>

      <div className="flex flex-col gap-3 px-4 py-6 border-t border-brand-border flex-1">
        {(categoryLabel || article.readTime) && (
          <div className="flex items-center gap-3">
            {categoryLabel && (
              <span className="text-brand-accent text-[11px] font-medium uppercase tracking-[0.1em]">
                {categoryLabel}
              </span>
            )}
            {categoryLabel && article.readTime && (
              <span className="text-brand-border text-[11px]">·</span>
            )}
            {article.readTime && (
              <span className="text-brand-muted text-[11px]">{article.readTime} min</span>
            )}
          </div>
        )}

        <p className="text-foreground text-[22px] font-medium tracking-[-0.02em] leading-snug group-hover:text-brand-accent transition-colors duration-200 text-balance">
          {article.title}
        </p>

        <p className="text-brand-muted text-[15px] font-light leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-border">
          <time className="text-brand-muted text-[12px]">{formatDate(date)}</time>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-brand-accent shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 6 L19 12 L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export function BlogClient({ articles }: { articles: WpArticle[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const exitTween = useRef<gsap.core.Tween | null>(null);
  const isFirstRender = useRef(true);

  const visible = activeFilter
    ? articles.filter((a) => a.category === activeFilter)
    : articles;

  function handleFilter(id: string) {
    const next = activeFilter === id ? null : id;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !listRef.current) {
      setActiveFilter(next);
      return;
    }

    exitTween.current?.kill();

    const cards = listRef.current.querySelectorAll<HTMLElement>(".article-card");
    if (cards.length > 0) {
      exitTween.current = gsap.to(cards, {
        opacity: 0,
        y: -8,
        duration: 0.18,
        stagger: { each: 0.03, from: "end" },
        ease: "power2.in",
        onComplete: () => setActiveFilter(next),
      });
    } else {
      setActiveFilter(next);
    }
  }

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!listRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cards = listRef.current.querySelectorAll<HTMLElement>(".article-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.44,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "transform,opacity",
      }
    );
  }, [activeFilter]);

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">
        <div className="flex flex-1">
          <SidebarNav
            items={CATEGORIES}
            activeId={activeFilter ?? ""}
            onSelect={handleFilter}
            top={HEADER_H}
            ariaLabel="Filtrar por categoría"
          />

          <div className="flex-1 px-4 sm:px-16 pt-16 pb-20 flex flex-col gap-12">
            <RevealH2
              as="h1"
              alwaysAnimate
              splitBy="word"
              className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none"
            >
              Blog
            </RevealH2>

            <div ref={listRef}>
              {visible.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {visible.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="py-24 flex flex-col gap-4">
                  <p className="text-foreground text-[24px] font-medium tracking-[-0.02em]">
                    {activeFilter ? "Sin artículos en esta categoría" : "Próximamente"}
                  </p>
                  <p className="text-brand-muted text-[16px] font-light leading-relaxed max-w-[50ch]">
                    {activeFilter
                      ? "Prueba con otra categoría o vuelve pronto."
                      : "Estamos preparando contenido estratégico sobre marketing y crecimiento de negocio."}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-32 pb-24 flex flex-col gap-8">
              <p className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight">
                ¿Hablamos de tu proyecto?
              </p>
              <a
                href="/contacto"
                className="group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background w-fit"
              >
                <span className="text-[16px] font-medium tracking-[0.04em]">Contacto</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
                  <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
