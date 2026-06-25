"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { AccordionItem } from "@/components/ui/Accordion";
import { MetricBox } from "@/components/ui/MetricBox";
import { RevealH2 } from "@/components/ui/RevealH2";

gsap.registerPlugin(ScrollTrigger);

const HEADER_H = 72;

const sectors = [
  { id: "sanitarios", label: "Clínicas y sector salud" },
  { id: "arquitectura", label: "Arquitectura y Diseño" },
  { id: "industrial", label: "Industrial" },
  { id: "otros", label: "Otros sectores" },
];

export default function SectoresPage() {
  const [activeId, setActiveId] = useState(sectors[0].id);
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
            ariaLabel="Sectores"
          />

          {/* Right column */}
          <div className="flex-1 flex flex-col">

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
                Conocemos tu sector. Eso lo cambia todo.
              </RevealH2>
              <div className="relative mt-10 flex-1 w-full overflow-hidden bg-brand-border">
                <Image
                  src="/projects/sectores/hero.jpg"
                  alt="Sectores"
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
                Clínicas y negocios relacionados con el mundo de la salud
              </RevealH2>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <MetricBox className="p-8 flex items-end gap-6 flex-1">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      40%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      + Incremento de Pacientes
                    </p>
                  </MetricBox>
                  <MetricBox className="p-8 flex items-end gap-6 flex-1">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      164%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      En Reducción de Costes
                    </p>
                  </MetricBox>
                </div>
                <div className="relative h-[201px] w-full overflow-hidden bg-brand-border">
                  <div ref={saniParallaxRef} className="absolute inset-x-0 -top-10 -bottom-10 will-change-transform">
                    <Image
                      src="/projects/sectores/sanitarios.jpg"
                      alt="Clínicas y sector salud"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
                El sector sanitario privado vive un momento de fuerte expansión y, con él, una competencia creciente. Clínicas, centros especializados y operadores de salud necesitan diferenciarse sin perder la confianza que los pacientes depositan en ellos.
              </p>

              {/* Oportunidades — salud */}
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  ¿Qué oportunidades hemos identificado en el sector de la salud?
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    "Más volumen no es siempre mejor negocio. Te ayudamos a atraer el tipo de paciente y a los servicios que realmente te interesan.",
                    "Automatizar sistemas de gestión de clientes para ahorrar en costes y agilizar procesos.",
                    "No se trata de hacer más cosas. Es cuestión de que cada pieza tenga un propósito y encaje con las demás.",
                  ].map((item, i) => (
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
                  Preguntas Frecuentes que hemos recibido de marcas en el sector de la salud
                </h3>
                <div className="flex flex-col border-t border-brand-border">
                  <AccordionItem label="¿Cómo diferencias tu clínica si ofreces los mismos servicios que la competencia?" />
                  <AccordionItem label="¿Qué canales funcionan realmente en salud?" />
                  <AccordionItem label="¿Cómo atraemos pacientes nuevos sin depender solo del boca a boca?" />
                  <AccordionItem label="¿Trabajáis solo con grandes grupos o también con clínicas independientes?" />
                  <AccordionItem label="¿Cómo trasladamos la confianza que generamos en consulta a nuestra presencia digital?" />
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
                Estudios de arquitectura y diseño de interiores
              </RevealH2>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <MetricBox className="p-8 flex items-end gap-6 flex-1">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      15%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      + Volumen de Negocio
                    </p>
                  </MetricBox>
                  <MetricBox className="p-8 flex items-end gap-6 flex-1">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      73%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      En Reducción de Costes
                    </p>
                  </MetricBox>
                </div>
                <div className="relative h-[201px] w-full overflow-hidden bg-brand-border">
                  <div ref={arquiParallaxRef} className="absolute inset-x-0 -top-10 -bottom-10 will-change-transform">
                    <Image
                      src="/projects/sectores/arquitectura.jpg"
                      alt="Arquitectura y Diseño"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
                La arquitectura y el diseño son disciplinas donde la calidad del trabajo es condición necesaria, pero no suficiente. Crecer exige visibilidad, posicionamiento y una narrativa de marca que llegue más allá del círculo habitual de contactos.
              </p>

              {/* Oportunidades — arquitectura */}
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  ¿Qué oportunidades hemos identificado en el sector de la construcción?
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    "No aceptar cualquier proyecto. Elegir con qué tipologías trabajar, en qué ubicaciones operar y con qué presupuestos mínimos. La estrategia convierte la dependencia en criterio.",
                    "Cuando un estudio es reconocido por lo que hace y por cómo lo hace, el precio deja de ser el argumento central. La reputación desplaza a la tarifa como criterio de decisión.",
                    "Una estrategia de marca bien ejecutada permite trascender el ámbito local y atraer proyectos de otras ciudades o mercados sin necesidad de abrir oficina.",
                  ].map((item, i) => (
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
                  Preguntas Frecuentes que hemos recibido de marcas en el sector de la construcción
                </h3>
                <div className="flex flex-col border-t border-brand-border">
                  <AccordionItem label="¿Cómo llegamos a promotores o clientes privados de mayor perfil?" />
                  <AccordionItem label="¿Cómo filtramos desde el principio a los clientes que no encajan con nosotros?" />
                  <AccordionItem label="¿Tiene sentido abrir nuevas líneas de servicio o focalizarnos en lo que mejor hacemos?" />
                  <AccordionItem label="¿Cómo gestionamos la marca cuando el estudio depende demasiado de la figura del socio fundador?" />
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
                Empresas industriales y del sector B2B
              </RevealH2>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <MetricBox className="p-8 flex items-end gap-6 flex-1">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      40%
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      Crecimiento Medio
                    </p>
                  </MetricBox>
                  <MetricBox className="p-8 flex items-end gap-6 flex-1">
                    <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em] whitespace-nowrap">
                      26€
                    </p>
                    <p className="text-brand-accent text-[16px] font-light tracking-[0.04em] uppercase">
                      Retorno por € Invertido
                    </p>
                  </MetricBox>
                </div>
                <div className="relative h-[201px] w-full overflow-hidden bg-brand-border">
                  <div ref={induParallaxRef} className="absolute inset-x-0 -top-10 -bottom-10 will-change-transform">
                    <Image
                      src="/projects/sectores/industrial.jpg"
                      alt="Industrial"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
                En el mundo industrial y B2B, la propuesta de valor existe pero rara vez se comunica bien. Empresas sólidas, con años de recorrido, que siguen dependiendo de los mismos canales de siempre para conseguir negocio nuevo.
              </p>

              {/* Oportunidades — industrial */}
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight text-balance">
                  ¿Qué oportunidades hemos identificado en el sector industrial?
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    "Nuevas oportunidades de negocio y expansión geográfica gracias a acciones digitales con un coste más bajo.",
                    "No depender de los referidos.",
                    "Sistemas de automatización para gestionar los contactos.",
                  ].map((item, i) => (
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
                  Preguntas Frecuentes que hemos recibido de marcas en el sector industrial
                </h3>
                <div className="flex flex-col border-t border-brand-border">
                  <AccordionItem label="¿Tiene sentido invertir en marca cuando nuestros clientes nos eligen por precio o por relación?" />
                  <AccordionItem label="¿Cómo comunicamos propuestas técnicas complejas de forma clara y atractiva?" />
                  <AccordionItem label="¿Cómo abrimos nuevos mercados sin depender de la red de contactos que ya tenemos?" />
                  <AccordionItem label="¿Cómo llegamos a decisores dentro de empresas grandes sin conocer a nadie dentro?" />
                  <AccordionItem label="¿Para qué sirve tener presencia digital si nuestros clientes no nos buscan por internet?" />
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
                Otros sectores
              </RevealH2>

              <p className="text-foreground text-[18px] font-light leading-relaxed max-w-[65ch] text-pretty">
                ¿Tu sector no aparece aquí? Trabajamos con empresas de ámbitos muy distintos. Lo que nos importa no es la categoría, sino la ambición de crecer con estrategia. Si tienes un reto de marca o negocio, hay muchas probabilidades de que podamos ayudarte.
              </p>

              <div>
                <Link
                  href="/contacto"
                  className="inline-flex items-center px-8 py-4 text-base font-medium tracking-[0.04em] text-background bg-brand-accent hover:bg-brand-accent/90 transition-colors duration-200"
                >
                  Hablemos de tu proyecto
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
