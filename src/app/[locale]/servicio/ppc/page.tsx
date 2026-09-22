"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { MetricBox } from "@/components/ui/MetricBox";
import { AccordionItem } from "@/components/ui/Accordion";
import { ContactPpc } from "@/components/sections/ContactPpc";

const HEADER_H = 72;

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
type PricingPlan = { title: string; tiers: PricingTier[] };
type Faq = { q: string; a: string };

type Subsection = {
  id: string;
  label: string;
  verb: string;
  body: string;
  kind: "steps" | "platforms" | "features" | "pricing" | "stats" | "partners" | "faq";
};

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
    return (
      <div className="mt-10 flex flex-col gap-8">
        {steps.map((step) => (
          <div key={step.n} className="flex flex-col gap-2">
            <p className="text-brand-accent text-[16px] font-medium tracking-[0.04em]">{step.n}</p>
            <h4 className="text-foreground text-[20px] font-medium tracking-[-0.03em] leading-tight">
              {step.title}
            </h4>
            <p className="text-brand-muted text-[16px] font-light leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "platforms") {
    return (
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        {features.map((f) => (
          <AccordionItem key={f.title} label={f.title}>
            <p className="text-brand-muted text-[16px] font-light leading-relaxed">{f.body}</p>
          </AccordionItem>
        ))}
      </div>
    );
  }

  if (kind === "pricing") {
    return (
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pricingPlans.map((plan) => (
          <div key={plan.title} className="border border-brand-border p-8 flex flex-col gap-6">
            <h4 className="text-foreground text-[20px] font-medium tracking-[-0.02em] leading-tight">
              {plan.title}
            </h4>
            <div className="flex flex-col">
              {plan.tiers.map((tier, i) => (
                <div
                  key={tier.range}
                  className={`flex items-baseline justify-between gap-4 py-4 ${i > 0 ? "border-t border-brand-border" : ""}`}
                >
                  <p className="text-brand-muted text-[15px] font-light leading-snug">{tier.range}</p>
                  <p className="text-foreground text-[20px] font-medium tracking-[-0.02em] shrink-0">{tier.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
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
    const el = sectionRefs.current.get(id);
    if (!el) return;
    const offset = HEADER_H + 24;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-[72px] bg-background min-h-screen flex flex-col">

        {/* Hero */}
        <section className="pt-16 pb-16">
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
              <a
                href="#como-funciona"
                className="inline-flex items-center px-6 py-3 border border-foreground text-foreground text-[16px] font-medium tracking-[0.04em] hover:bg-foreground hover:text-background transition-colors duration-200"
              >
                {t("hero.ctaHow")}
              </a>
            </div>

            <div className="mt-16 flex flex-col gap-4">
              <p className="text-brand-muted text-[14px] font-light tracking-[0.04em] uppercase">
                {t("hero.platformsRunLabel")}
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {platforms.map((p) => (
                  <span key={p.name} className="text-foreground text-[18px] font-medium tracking-[-0.02em]">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Two-column zone — the sidebar hides itself (clip-path) as the
            contact form approaches, instead of waiting for the footer. */}
        <div className="flex">
          <SidebarNav
            items={allSubsections}
            activeId={activeId}
            onSelect={scrollToSection}
            top={HEADER_H + 32}
            ariaLabel={t("sidebarAria")}
            hideBeforeSelector="#contacto"
          />

          <div className="flex-1 min-w-0">
            {/* Content sections */}
            <div className="px-4 sm:px-16 py-16 flex flex-col gap-24">
              {data.map((category) => (
                <div key={category.h2} className="flex flex-col gap-16">
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
        </div>

        <ContactPpc />
      </main>
      <Footer />
    </>
  );
}
