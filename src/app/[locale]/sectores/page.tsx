"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { AccordionItem } from "@/components/ui/Accordion";
import { MetricBox } from "@/components/ui/MetricBox";
import { RevealH2 } from "@/components/ui/RevealH2";
import { Link } from "@/i18n/navigation";

gsap.registerPlugin(ScrollTrigger);

const HEADER_H = 72;

const sectorIds = ["sanitarios", "arquitectura", "industrial", "otros"] as const;

export default function SectoresPage() {
  const t = useTranslations("sectoresPage");
  const sectors = sectorIds.map((id) => ({ id, label: t(`nav.${id}`) }));
  const saniOpportunities = t.raw("sanitarios.opportunities") as string[];
  const saniFaqs = t.raw("sanitarios.faqs") as string[];
  const arquiOpportunities = t.raw("arquitectura.opportunities") as string[];
  const arquiFaqs = t.raw("arquitectura.faqs") as string[];
  const induOpportunities = t.raw("industrial.opportunities") as string[];
  const induFaqs = t.raw("industrial.faqs") as string[];

  const [activeId, setActiveId] = useState<string>(sectors[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const saniParallaxRef = useRef<HTMLDivElement>(null);
  const arquiParallaxRef = useRef<HTMLDivElement>(null);
  const induParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parallaxItems = [saniParallaxRef, arquiParallaxRef, induParallaxRef];
    const tweens = parallaxItems.map((ref) => {
      const inner = ref.current;
      if (!inner) return null;
      return gsap.fromTo(
        inner,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: inner.parentElement!,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      tweens.forEach((t) => t?.scrollTrigger?.kill());
    };
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
    const offset = HEADER_H + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);


  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">

        <div className="flex flex-1">

          <SidebarNav
            items={sectors}
            activeId={activeId}
            onSelect={scrollToSection}
            top={HEADER_H}
            ariaLabel={t("sidebarAria")}
          />

          {/* Right column */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* H1 + imagen placeholder — above the fold */}
            <div
              className="px-4 sm:px-16 pt-16 pb-8 flex flex-col"
              style={{ minHeight: "calc(100vh - 72px)" }}
            >
              <RevealH2
                as="h1"
                alwaysAnimate
                splitBy="word"
                className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none text-balance"
              >
                {t("hero.heading")}
              </RevealH2>
              <div className="relative mt-10 flex-1 w-full overflow-hidden bg-brand-border">
                <Image
                  src="/projects/sectores/hero.jpg"
                  alt={t("hero.imageAlt")}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* ── Clínicas y sector salud ── */}
            <section
              id="sanitarios"
              ref={(el) => { if (el) sectionRefs.current.set("sanitarios", el); }}
              className="px-4 sm:px-16 pt-20 pb-20 flex flex-col gap-12"
            >
              <RevealH2 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none text-balance">
                {t("sanitarios.heading")}
              </RevealH2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                  <MetricBox className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 flex-1 min-w-[180px]">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      40%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      {t("sanitarios.metric1Label")}
                    </p>
                  </MetricBox>
                  <MetricBox className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 flex-1 min-w-[180px]">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      164%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      {t("sanitarios.metric2Label")}
                    </p>
                  </MetricBox>
                </div>
                <div className="relative h-[201px] w-full overflow-hidden bg-brand-border">
                  <div ref={saniParallaxRef} className="absolute inset-x-0 -top-10 -bottom-10 will-change-transform">
                    <Image
                      src="/projects/sectores/sanitarios.jpg"
                      alt={t("sanitarios.imageAlt")}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
                {t("sanitarios.paragraph")}
              </p>

              {/* Oportunidades — salud */}
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  {t("sanitarios.opportunitiesHeading")}
                </h3>
                <div className="flex flex-col gap-4">
                  {saniOpportunities.map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <p className="text-brand-accent text-[18px] font-light shrink-0 w-6 text-center">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="text-foreground text-[18px] font-light leading-relaxed text-pretty">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ — salud */}
              <div className="flex flex-col gap-6">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  {t("sanitarios.faqHeading")}
                </h3>
                <div className="flex flex-col border-t border-brand-border">
                  {saniFaqs.map((q) => (
                    <AccordionItem key={q} label={q} />
                  ))}
                </div>
              </div>
            </section>

            {/* ── Arquitectura y Diseño ── */}
            <section
              id="arquitectura"
              ref={(el) => { if (el) sectionRefs.current.set("arquitectura", el); }}
              className="px-4 sm:px-16 pt-20 pb-20 flex flex-col gap-12"
            >
              <RevealH2 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none text-balance">
                {t("arquitectura.heading")}
              </RevealH2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                  <MetricBox className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 flex-1 min-w-[180px]">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      15%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      {t("arquitectura.metric1Label")}
                    </p>
                  </MetricBox>
                  <MetricBox className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 flex-1 min-w-[180px]">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      73%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      {t("arquitectura.metric2Label")}
                    </p>
                  </MetricBox>
                </div>
                <div className="relative h-[201px] w-full overflow-hidden bg-brand-border">
                  <div ref={arquiParallaxRef} className="absolute inset-x-0 -top-10 -bottom-10 will-change-transform">
                    <Image
                      src="/projects/sectores/arquitectura.jpg"
                      alt={t("arquitectura.imageAlt")}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
                {t("arquitectura.paragraph")}
              </p>

              {/* Oportunidades — arquitectura */}
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  {t("arquitectura.opportunitiesHeading")}
                </h3>
                <div className="flex flex-col gap-4">
                  {arquiOpportunities.map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <p className="text-brand-accent text-[18px] font-light shrink-0 w-6 text-center">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="text-foreground text-[18px] font-light leading-relaxed text-pretty">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ — arquitectura */}
              <div className="flex flex-col gap-6">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  {t("arquitectura.faqHeading")}
                </h3>
                <div className="flex flex-col border-t border-brand-border">
                  {arquiFaqs.map((q) => (
                    <AccordionItem key={q} label={q} />
                  ))}
                </div>
              </div>
            </section>

            {/* ── Industrial ── */}
            <section
              id="industrial"
              ref={(el) => { if (el) sectionRefs.current.set("industrial", el); }}
              className="px-4 sm:px-16 pt-20 pb-20 flex flex-col gap-12"
            >
              <RevealH2 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none text-balance">
                {t("industrial.heading")}
              </RevealH2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                  <MetricBox className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 flex-1 min-w-[180px]">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      40%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      {t("industrial.metric1Label")}
                    </p>
                  </MetricBox>
                  <MetricBox className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6 flex-1 min-w-[180px]">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      26€
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      {t("industrial.metric2Label")}
                    </p>
                  </MetricBox>
                </div>
                <div className="relative h-[201px] w-full overflow-hidden bg-brand-border">
                  <div ref={induParallaxRef} className="absolute inset-x-0 -top-10 -bottom-10 will-change-transform">
                    <Image
                      src="/projects/sectores/industrial.jpg"
                      alt={t("industrial.imageAlt")}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
                {t("industrial.paragraph")}
              </p>

              {/* Oportunidades — industrial */}
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  {t("industrial.opportunitiesHeading")}
                </h3>
                <div className="flex flex-col gap-4">
                  {induOpportunities.map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <p className="text-brand-accent text-[18px] font-light shrink-0 w-6 text-center">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="text-foreground text-[18px] font-light leading-relaxed text-pretty">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ — industrial */}
              <div className="flex flex-col gap-6">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  {t("industrial.faqHeading")}
                </h3>
                <div className="flex flex-col border-t border-brand-border">
                  {induFaqs.map((q) => (
                    <AccordionItem key={q} label={q} />
                  ))}
                </div>
              </div>
            </section>

            {/* ── Otros sectores ── */}
            <section
              id="otros"
              ref={(el) => { if (el) sectionRefs.current.set("otros", el); }}
              className="px-4 sm:px-16 pt-20 pb-20 flex flex-col gap-12"
            >
              <RevealH2 className="text-foreground text-[48px] font-medium tracking-[-0.04em] leading-none text-balance">
                {t("otros.heading")}
              </RevealH2>

              <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
                {t("otros.paragraph")}
              </p>

              <div>
                <Link
                  href="/contacto"
                  className="inline-flex items-center px-8 py-4 text-base font-medium tracking-[0.04em] text-background bg-brand-accent hover:bg-brand-accent/90 transition-colors duration-200"
                >
                  {t("otros.cta")}
                </Link>
              </div>
            </section>

          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
