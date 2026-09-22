"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { MetricBox } from "@/components/ui/MetricBox";
import { AccordionItem } from "@/components/ui/Accordion";
import { ContactPpc } from "@/components/sections/ContactPpc";

const HEADER_H = 72;

const platforms = [
  { name: "Google Ads", desc: "Search, Shopping, Performance Max, Display" },
  { name: "Meta Ads", desc: "Facebook e Instagram, full-funnel" },
  { name: "TikTok Ads", desc: "Spark Ads, conversión y campañas de app" },
  { name: "LinkedIn Ads", desc: "Lead gen B2B y campañas ABM" },
];

const steps = [
  {
    n: "01",
    title: "Nos traes al cliente",
    body: "Envíanos el brief, presupuesto y objetivos. No hace falta que nos cedas toda tu cartera, solo las cuentas que quieras quitarte de encima.",
  },
  {
    n: "02",
    title: "Montamos todo bajo tu marca",
    body: "Cada cuenta, dashboard e informe se configura con el nombre y los colores de tu agencia. Tu cliente nunca ve los nuestros.",
  },
  {
    n: "03",
    title: "Gestionamos y optimizamos",
    body: "Un estratega dedicado gestiona las campañas a diario en Google, Meta, TikTok y LinkedIn — con la misma cadencia que un perfil in-house.",
  },
  {
    n: "04",
    title: "Tú sigues siendo el punto de contacto",
    body: "Te enviamos el reporting y los argumentos clave. Tú entregas la actualización. Nosotros permanecemos invisibles.",
  },
];

const features = [
  {
    title: "Tu foco, en tu negocio",
    body: "Delegas la ejecución de medios en un partner que ya domina el terreno, para que tu equipo dedique su tiempo a hacer crecer la agencia y tú tengas la tranquilidad de que esta parte está resuelta.",
  },
  {
    title: "Marca blanca, siempre",
    body: "Dashboards, informes y emails llevan el nombre y la marca de tu agencia, no la nuestra.",
  },
  {
    title: "Un estratega dedicado",
    body: "Tus cuentas tienen un estratega con nombre y apellido, no un pod rotativo compartido entre decenas de agencias.",
  },
  {
    title: "Precios de partner transparentes",
    body: "Una tarifa plana por cuenta gestionada. Sin revenue share ni líneas sorpresa en la factura.",
  },
  {
    title: "Operativo en menos de dos semanas",
    body: "Un onboarding estructurado pone en marcha la mayoría de cuentas en 5–10 días laborables.",
  },
  {
    title: "Confidencialidad por defecto",
    body: "NDA en cada colaboración. Tu cartera de clientes y nuestro acuerdo quedan entre nosotros.",
  },
];

const stats = [
  {
    value: "+164%",
    label: "incremento en leads cualificados",
    meta: "Cliente e-commerce · Google Ads · 90 días",
  },
  {
    value: "3.8x",
    label: "retorno sobre la inversión publicitaria",
    meta: "Marca DTC de belleza · Meta Ads · 60 días",
  },
  {
    value: "11 días",
    label: "hasta el primer lead cualificado",
    meta: "Cliente B2B SaaS · LinkedIn Ads · Desde el lanzamiento",
  },
];

const pricingPlans = [
  {
    title: "Gestión mensual sin comunicación ni reporting",
    tiers: [
      { range: "Inversión inferior a 1.000€", price: "150€/mes" },
      { range: "Inversión entre 1.000€ y 3.000€", price: "250€/mes" },
    ],
  },
  {
    title: "Gestión mensual con comunicación y reporting",
    tiers: [
      { range: "Inversión inferior a 1.000€", price: "200€/mes" },
      { range: "Inversión entre 1.000€ y 3.000€", price: "300€/mes" },
    ],
  },
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

const faqs = [
  {
    q: "¿Mi cliente llegará a saber que estáis implicados?",
    a: "No. Cada cuenta publicitaria, dashboard, informe y email se configura con el nombre de tu agencia. No contactamos directamente a tu cliente y nada de lo que enviamos lleva nuestra marca.",
  },
  {
    q: "¿Cómo funcionan los precios?",
    a: "Tú mantienes tu precio y margen de cara al cliente. Nosotros cobramos una tarifa plana de partner por cuenta gestionada, según el tramo de inversión publicitaria — sin revenue share ni líneas sorpresa.",
  },
  {
    q: "¿Qué plataformas gestionáis?",
    a: "Google Ads (Search, Shopping, Performance Max, Display), Meta Ads (Facebook e Instagram), TikTok Ads y LinkedIn Ads. Si un cliente necesita varias, un único estratega las coordina todas.",
  },
  {
    q: "¿Cuál es el compromiso mínimo?",
    a: "Sin permanencia a largo plazo. Pedimos un mínimo de 60 días por cuenta para que las campañas salgan de la fase de aprendizaje antes de evaluar resultados.",
  },
  {
    q: "¿Con qué rapidez podéis dar de alta una nueva cuenta?",
    a: "La mayoría de cuentas se lanzan en 5–10 días laborables desde que recibimos accesos, activos de marca y un brief. Hay onboarding urgente disponible para lanzamientos sensibles al tiempo.",
  },
  {
    q: "¿De quién son las cuentas publicitarias y los datos?",
    a: "Tuyos y de tu cliente. Las cuentas se crean bajo el negocio de tu cliente, nosotros nos añadimos como usuario partner, y vosotros conserváis siempre el acceso completo y los derechos de exportación.",
  },
];

const data = [
  {
    h2: "Tu cliente solo te ve a ti",
    subsections: [
      {
        id: "como-funciona",
        label: "Cómo funciona",
        verb: "Nos integramos",
        body: "como el equipo de media buying detrás del telón — cuatro pasos desde el brief hasta el lanzamiento.",
        kind: "steps" as const,
      },
      {
        id: "que-gestionamos",
        label: "Qué gestionamos",
        verb: "Coordinamos",
        body: "un solo estratega para todas las plataformas relevantes — cédenos un canal o todo el mix de medios.",
        kind: "platforms" as const,
      },
    ],
  },
  {
    h2: "Construido para quedarnos detrás del telón",
    subsections: [
      {
        id: "por-que",
        label: "Por qué colaborar",
        verb: "Diseñamos",
        body: "la colaboración para que la relación con tu cliente se quede exactamente donde está: contigo.",
        kind: "features" as const,
      },
      {
        id: "precios",
        label: "Precios",
        verb: "Facturamos",
        body: "una tarifa mensual fija por cuenta gestionada, según el nivel de inversión y si necesitas comunicación y reporting directo.",
        kind: "pricing" as const,
      },
      {
        id: "resultados",
        label: "Resultados",
        verb: "Medimos",
        body: "cada colaboración con cifras reales de cuentas partner.",
        kind: "stats" as const,
      },
    ],
  },
  {
    h2: "Empieza a escalar sin arriesgar la relación con tu cliente",
    subsections: [
      {
        id: "partners",
        label: "Agencias partner",
        verb: "Ya confían",
        body: "en nosotros estas agencias, que gestionan PPC de marca blanca con nuestro equipo.",
        kind: "partners" as const,
      },
      {
        id: "faq",
        label: "FAQ",
        verb: "Resolvemos",
        body: "las preguntas que las agencias realmente hacen antes de empezar.",
        kind: "faq" as const,
      },
    ],
  },
];

const allSubsections = data.flatMap((cat) =>
  cat.subsections.map((s) => ({ ...s, h2: cat.h2 }))
);

function SubsectionContent({ kind }: { kind: (typeof allSubsections)[number]["kind"] }) {
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
  const [activeId, setActiveId] = useState(allSubsections[0].id);
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
              Escala la publicidad de pago de tu agencia sin contratar un media buyer
            </RevealH2>
            <p className="mt-8 text-brand-muted text-[16px] md:text-[18px] font-light leading-relaxed max-w-2xl">
              Planificamos, lanzamos y optimizamos campañas de Google, Meta, TikTok y LinkedIn Ads para los clientes de tu agencia — bajo tu marca, en tus dashboards, en informes que nunca mencionan nuestro nombre.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ArrowCta href="#contacto">Conviértete en agencia partner</ArrowCta>
              <a
                href="#como-funciona"
                className="inline-flex items-center px-6 py-3 border border-foreground text-foreground text-[16px] font-medium tracking-[0.04em] hover:bg-foreground hover:text-background transition-colors duration-200"
              >
                Cómo funciona
              </a>
            </div>

            <div className="mt-16 flex flex-col gap-4">
              <p className="text-brand-muted text-[14px] font-light tracking-[0.04em] uppercase">
                Las campañas corren sobre
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
            ariaLabel="Servicio PPC"
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

                      <SubsectionContent kind={s.kind} />
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
