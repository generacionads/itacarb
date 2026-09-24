"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type Lenis from "lenis";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { MetricBox } from "@/components/ui/MetricBox";
import { AccordionItem } from "@/components/ui/Accordion";
import { ContactPpc } from "@/components/sections/ContactPpc";

const HEADER_H = 72;

// One icon per "Por qué colaborar" feature, matched by array index (order
// mirrors the reference landing's feature icons: target, layers, person,
// bar chart, clock, shield).
const FEATURE_ICONS = [
  <svg key="target" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="layers" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3 L21 8 L12 13 L3 8 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M3 12 L12 17 L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 16 L12 21 L21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="person" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="chart" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 20V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 20V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 20V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="clock" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="shield" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>,
];

const partnerAgencies = [
  "Digital Mastery Group",
  "Maktiva",
  "Dos Setenta Marketing y Desarrollo",
  "Metacom",
  "Noergia",
  "iOB",
  "RPG Digital",
  "Kanlli",
  "Everest MKT",
  "Iberactiv",
];

type Platform = { name: string; desc: string };
type Step = { n: string; title: string; body: string };
type Feature = { title: string; body: string };
type Stat = { value: string; label: string; meta: string };
type PricingTier = { range: string; price: string };
type PricingPlan = { title: string; toggleLabel: string; tiers: PricingTier[] };
type Faq = { q: string; a: string };

type Subsection = {
  id: string;
  label: string;
  verb: string;
  body: string;
  kind: "steps" | "platforms" | "features" | "pricing" | "stats" | "partners" | "faq";
};

// Clip-path reveal, same mechanic RevealH2 uses for non-string (block) content —
// replays on every mount, so keying it by the active plan re-triggers it on toggle.
function RevealBlock({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span";
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <Tag
      className={className}
      style={{
        display: Tag === "span" ? "inline-block" : undefined,
        clipPath: visible ? "inset(0 0 -0.2em 0)" : "inset(0 0 100% 0)",
        transition: "clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </Tag>
  );
}

function PricingCard({ plans }: { plans: PricingPlan[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const plan = plans[activeIndex];
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });

  const measure = useCallback(() => {
    const btn = buttonRefs.current[activeIndex];
    if (btn) setThumb({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [activeIndex]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <div className="mt-10 flex flex-col gap-6">
      {/* Toggle — the orange thumb slides between buttons instead of popping on/off */}
      <div className="relative inline-flex self-center border border-brand-border p-1 max-w-full overflow-x-auto">
        <div
          aria-hidden
          className="absolute top-1 bottom-1 bg-brand-accent transition-[left,width] duration-300 ease-out"
          style={{ left: thumb.left, width: thumb.width }}
        />
        {plans.map((p, i) => (
          <button
            key={p.title}
            ref={(el) => {
              buttonRefs.current[i] = el;
            }}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-pressed={activeIndex === i}
            className={`relative z-10 px-4 py-2 text-[14px] font-medium tracking-[0.02em] whitespace-nowrap transition-colors duration-100 ${
              activeIndex === i ? "text-background" : "text-brand-muted hover:text-foreground"
            }`}
          >
            {p.toggleLabel}
          </button>
        ))}
      </div>

      <div className="border border-brand-border p-8 flex flex-col gap-6">
        <h4 className="text-foreground text-[20px] font-medium tracking-[-0.02em] leading-tight">
          <RevealBlock key={activeIndex} as="span">
            {plan.title}
          </RevealBlock>
        </h4>
        <div className="flex flex-col">
          {plan.tiers.map((tier, i) => (
            <div
              key={tier.range}
              className={`flex items-baseline justify-between gap-4 py-4 ${i > 0 ? "border-t border-brand-border" : ""}`}
            >
              <p className="text-brand-muted text-[15px] font-light leading-snug">{tier.range}</p>
              <p className="text-foreground text-[20px] font-medium tracking-[-0.02em] shrink-0">
                <RevealBlock key={activeIndex} as="span">
                  {tier.price}
                </RevealBlock>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepsGrid({ steps }: { steps: Step[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {steps.map((step, i) => (
        <div
          key={step.n}
          className={`border p-6 flex flex-col gap-4 transition-colors duration-700 ${
            i === activeIndex ? "border-brand-accent" : "border-brand-border"
          }`}
        >
          <div className="w-9 h-9 flex items-center justify-center bg-brand-accent">
            <span className="text-background text-[14px] font-medium tracking-[0.04em]">{step.n}</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-foreground text-[20px] font-medium tracking-[-0.03em] leading-tight">
              {step.title}
            </h4>
            <p className="text-brand-muted text-[16px] font-light leading-relaxed">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SubsectionContent({
  kind,
  platforms,
  steps,
  features,
  pricingPlans,
  stats,
  faqs,
}: {
  kind: Subsection["kind"];
  platforms: Platform[];
  steps: Step[];
  features: Feature[];
  pricingPlans: PricingPlan[];
  stats: Stat[];
  faqs: Faq[];
}) {
  if (kind === "steps") {
    return <StepsGrid steps={steps} />;
  }

  if (kind === "platforms") {
    return (
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((p) => (
          <div key={p.name} className="border border-brand-border p-6 flex flex-col gap-3">
            <h4 className="text-foreground text-[20px] font-medium tracking-[-0.02em]">{p.name}</h4>
            <p className="text-brand-muted text-[15px] font-light leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "features") {
    return (
      <div className="mt-10">
        {features.map((f, i) => (
          <AccordionItem key={f.title} label={f.title} icon={FEATURE_ICONS[i]}>
            <p className="text-brand-muted text-[16px] font-light leading-relaxed">{f.body}</p>
          </AccordionItem>
        ))}
      </div>
    );
  }

  if (kind === "pricing") {
    return <PricingCard plans={pricingPlans} />;
  }

  if (kind === "stats") {
    return (
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s) => (
          <MetricBox key={s.label} className="p-8 flex flex-col gap-4">
            <p className="text-foreground text-[48px] font-medium leading-[42px] tracking-[-0.04em]">
              {s.value}
            </p>
            <p className="text-foreground text-[16px] font-medium tracking-[-0.01em] leading-snug">
              {s.label}
            </p>
            <p className="text-brand-muted text-[13px] font-light tracking-[0.04em] uppercase">
              {s.meta}
            </p>
          </MetricBox>
        ))}
      </div>
    );
  }

  if (kind === "partners") {
    return (
      <div className="mt-10 overflow-hidden">
        <div className="logo-strip flex w-max" style={{ animation: "marquee 30s linear infinite" }}>
          {[...partnerAgencies, ...partnerAgencies].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center px-6 shrink-0 text-foreground text-[16px] font-medium tracking-[-0.02em] whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      {faqs.map((item) => (
        <AccordionItem key={item.q} label={item.q}>
          <p className="text-brand-muted text-[16px] font-light leading-relaxed">{item.a}</p>
        </AccordionItem>
      ))}
    </div>
  );
}

function ArrowCta({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background w-fit"
    >
      <span className="text-[16px] font-medium tracking-[0.04em]">{children}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
        <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </a>
  );
}

export default function PpcPage() {
  const t = useTranslations("servicioPpcPage");

  const platforms = t.raw("platforms") as Platform[];
  const steps = t.raw("steps") as Step[];
  const features = t.raw("features") as Feature[];
  const stats = t.raw("stats") as Stat[];
  const pricingPlans = t.raw("pricingPlans") as PricingPlan[];
  const faqs = t.raw("faqs") as Faq[];

  const data: { h2: string; subsections: Subsection[] }[] = [
    {
      h2: t("categories.clientSeesYou"),
      subsections: [
        { id: "como-funciona", label: t("subsections.comoFunciona.label"), verb: t("subsections.comoFunciona.verb"), body: t("subsections.comoFunciona.body"), kind: "steps" },
        { id: "que-gestionamos", label: t("subsections.queGestionamos.label"), verb: t("subsections.queGestionamos.verb"), body: t("subsections.queGestionamos.body"), kind: "platforms" },
      ],
    },
    {
      h2: t("categories.builtToStayBehind"),
      subsections: [
        { id: "por-que", label: t("subsections.porQue.label"), verb: t("subsections.porQue.verb"), body: t("subsections.porQue.body"), kind: "features" },
        { id: "precios", label: t("subsections.precios.label"), verb: t("subsections.precios.verb"), body: t("subsections.precios.body"), kind: "pricing" },
        { id: "resultados", label: t("subsections.resultados.label"), verb: t("subsections.resultados.verb"), body: t("subsections.resultados.body"), kind: "stats" },
      ],
    },
    {
      h2: t("categories.startScaling"),
      subsections: [
        { id: "partners", label: t("subsections.partners.label"), verb: t("subsections.partners.verb"), body: t("subsections.partners.body"), kind: "partners" },
        { id: "faq", label: t("subsections.faq.label"), verb: t("subsections.faq.verb"), body: t("subsections.faq.body"), kind: "faq" },
      ],
    },
  ];

  const allSubsections = data.flatMap((cat) =>
    cat.subsections.map((s) => ({ ...s, h2: cat.h2 }))
  );
  // "Qué gestionamos" stays on the page but is dropped from the sidebar nav.
  const sidebarItems = allSubsections.filter((s) => s.id !== "que-gestionamos");

  const [activeId, setActiveId] = useState<string>(allSubsections[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

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
    const el = sectionRefs.current.get(id) ?? document.getElementById(id);
    if (!el) return;
    const offset = HEADER_H + 24;
    // Lenis owns scrolling site-wide; a plain window.scrollTo gets overridden
    // and jumps instead of animating, so route the scroll through it too.
    const lenis = (window as unknown as Record<string, Lenis>).__lenis as Lenis | undefined;
    if (lenis) {
      lenis.scrollTo(el, { offset: -offset, duration: 1.2 });
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-[72px] bg-background min-h-screen flex flex-col">

        {/* Hero */}
        <section className="pt-16 pb-32" style={{ minHeight: "min(calc(100vh - 72px), 880px)" }}>
          <Container>
            <RevealH2
              as="h1"
              alwaysAnimate
              splitBy="word"
              className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none max-w-4xl"
            >
              {t("hero.heading")}
            </RevealH2>
            <p className="mt-8 text-brand-muted text-[16px] md:text-[18px] font-light leading-relaxed max-w-2xl">
              {t("hero.body")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ArrowCta href="#contacto">{t("hero.ctaPartner")}</ArrowCta>
              <button
                type="button"
                onClick={() => scrollToSection("primera-seccion")}
                className="inline-flex items-center px-6 py-3 border border-foreground text-foreground text-[16px] font-medium tracking-[0.04em] hover:bg-foreground hover:text-background transition-colors duration-200"
              >
                {t("hero.ctaHow")}
              </button>
            </div>
          </Container>
        </section>

        {/* Two-column zone — the sidebar hides itself (clip-path) as the
            contact form approaches, instead of waiting for the footer. */}
        <div className="flex">
          <SidebarNav
            items={sidebarItems}
            activeId={activeId}
            onSelect={scrollToSection}
            top={HEADER_H + 32}
            ariaLabel={t("sidebarAria")}
            hideBeforeSelector="#contacto"
          />

          <div className="flex-1 min-w-0 flex flex-col">
            {/* Content sections */}
            {data.map((category, i) => (
              <div
                key={category.h2}
                id={i === 0 ? "primera-seccion" : undefined}
                className="px-4 sm:px-16 pt-20 pb-20 flex flex-col gap-16"
              >
                <RevealH2 className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight">
                  {category.h2}
                </RevealH2>

                {category.subsections.map((s) => (
                  <section
                    key={s.id}
                    id={s.id}
                    ref={(el) => {
                      if (el) sectionRefs.current.set(s.id, el);
                    }}
                  >
                    <RevealH2
                      as="h3"
                      className="text-[22px] md:text-[28px] font-medium tracking-[-0.04em] leading-tight"
                    >
                      <span className="text-brand-accent">{s.verb}</span>{" "}
                      <span className="text-foreground">{s.body}</span>
                    </RevealH2>

                    <SubsectionContent
                      kind={s.kind}
                      platforms={platforms}
                      steps={steps}
                      features={features}
                      pricingPlans={pricingPlans}
                      stats={stats}
                      faqs={faqs}
                    />
                  </section>
                ))}
              </div>
            ))}
          </div>
        </div>

        <ContactPpc />
      </main>
      <Footer />
    </>
  );
}
