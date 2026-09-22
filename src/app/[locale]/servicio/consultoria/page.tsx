"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealH2 } from "@/components/ui/RevealH2";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { AccordionItem } from "@/components/ui/Accordion";
import { WallCollisionBox, ZigZagPathBox, ShadowBox, PyramidBox, EllipsisBox } from "@/components/sections/ServiceAnimations";
import { Link } from "@/i18n/navigation";

const HEADER_H = 72;

type Item = { label: string; body: string };

export default function ServicioPage() {
  const t = useTranslations("servicioConsultoriaPage");

  const data = [
    {
      h2: t("categories.listen"),
      subsections: [
        {
          id: "descubrir",
          label: t("subsections.descubrir.label"),
          verb: t("subsections.descubrir.verb"),
          body: t("subsections.descubrir.body"),
          items: t.raw("subsections.descubrir.items") as Item[],
        },
        {
          id: "explorar",
          label: t("subsections.explorar.label"),
          verb: t("subsections.explorar.verb"),
          body: t("subsections.explorar.body"),
          items: t.raw("subsections.explorar.items") as Item[],
        },
      ],
    },
    {
      h2: t("categories.plan"),
      subsections: [
        {
          id: "proyectar",
          label: t("subsections.proyectar.label"),
          verb: t("subsections.proyectar.verb"),
          body: t("subsections.proyectar.body"),
          items: t.raw("subsections.proyectar.items") as Item[],
        },
      ],
    },
    {
      h2: t("categories.build"),
      subsections: [
        {
          id: "construir",
          label: t("subsections.construir.label"),
          verb: t("subsections.construir.verb"),
          body: t("subsections.construir.body"),
          items: t.raw("subsections.construir.items") as Item[],
        },
        {
          id: "evolucionar",
          label: t("subsections.evolucionar.label"),
          verb: t("subsections.evolucionar.verb"),
          body: t("subsections.evolucionar.body"),
          items: t.raw("subsections.evolucionar.items") as Item[],
        },
      ],
    },
  ];

  const allSubsections = data.flatMap((cat) =>
    cat.subsections.map((s) => ({ ...s, h2: cat.h2 }))
  );

  const [activeId, setActiveId] = useState<string>(allSubsections[0].id);
  const [h2Height, setH2Height] = useState(0);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const h2Ref = useRef<HTMLDivElement>(null);

  const activeSection = allSubsections.find((s) => s.id === activeId) ?? allSubsections[0];
  const activeH2 = activeSection.h2;

  useEffect(() => {
    const el = h2Ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH2Height(el.offsetHeight));
    ro.observe(el);
    setH2Height(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const map = sectionRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    map.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current.get(id);
    if (!el) return;
    const offset = HEADER_H + (h2Ref.current?.offsetHeight ?? 0) + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const sidebarTop = HEADER_H + h2Height;

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-[72px] bg-background min-h-screen flex flex-col">

        <div className="flex flex-col flex-1">

          {/* Sticky zone — h2 un-sticks naturally when this wrapper's bottom is reached */}
          <div className="relative">

            {/* Sticky H2 — full width */}
            <div
              ref={h2Ref}
              className="sticky top-16 sm:top-[72px] z-20 bg-brand-accent px-4 sm:px-16 py-12"
            >
              <RevealH2
                key={activeH2}
                alwaysAnimate
                splitBy="word"
                className="text-background text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-none"
              >
                {activeH2}
              </RevealH2>
            </div>

            <div className="flex">
              <SidebarNav
                items={allSubsections}
                activeId={activeId}
                onSelect={scrollToSection}
                top={sidebarTop}
                ariaLabel={t("sidebarAria")}
              />

              {/* Content sections */}
              <div className="flex-1">
                {allSubsections.map((s) => (
                  <section
                    key={s.id}
                    id={s.id}
                    ref={(el) => {
                      if (el) sectionRefs.current.set(s.id, el);
                    }}
                    className="px-4 sm:px-16 py-16 border-b border-brand-border"
                  >
                    <p className="text-[24px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight">
                      <span className="text-brand-accent">{s.verb}</span>{" "}
                      <span className="text-foreground">{s.body}</span>
                    </p>

                    <div className="mt-10 max-w-[560px]">
                      {s.items.map((item) => (
                        <AccordionItem key={item.label} label={item.label}>
                          <p className="text-brand-muted text-[16px] font-light leading-relaxed">{item.body}</p>
                        </AccordionItem>
                      ))}
                    </div>

                    <div className="mt-10 h-60 w-full">
                      {s.id === "descubrir" && <WallCollisionBox />}
                      {s.id === "explorar" && <ZigZagPathBox />}
                      {s.id === "proyectar" && <ShadowBox />}
                      {s.id === "construir" && <PyramidBox />}
                      {s.id === "evolucionar" && <EllipsisBox />}
                    </div>
                  </section>
                ))}
              </div>
            </div>

          </div>

          {/* CTA — outside sticky zone, with extra top space */}
          <div className="px-4 sm:px-16 pt-32 pb-24 flex flex-col gap-8">
            <p className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight">
              {t("ctaHeading")}
            </p>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background w-fit"
            >
              <span className="text-[16px] font-medium tracking-[0.04em]">{t("ctaLink")}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
                <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </div>

        </div>

        <Footer />
      </main>
    </>
  );
}
