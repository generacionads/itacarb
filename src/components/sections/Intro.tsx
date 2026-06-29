import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";

export function Intro() {
  return (
    <section id="intro" className="py-24 bg-background">
      <Container>
        <RevealH2
          as="h1"
          className="text-foreground text-4xl sm:text-5xl lg:text-[72px] font-medium leading-tight tracking-[-0.04em]"
        >
          Consultora estratégica que conecta marca, creatividad y crecimiento.
        </RevealH2>

        <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-8">
            <p className="text-foreground text-base sm:text-lg leading-relaxed font-light max-w-[660px]">
              Impulsamos el crecimiento de empresas consolidadas mediante estrategias alineadas con sus objetivos para mejorar el reconocimiento de marca, atraer nuevas oportunidades y aumentar el volumen de negocio.
              <br /><br />
              Nuestros proyectos abarcan distintos sectores y desafíos empresariales, pero todos comparten un mismo objetivo: generar crecimiento real. Descubre cómo hemos ayudado a empresas a fortalecer su posicionamiento, captar nuevas oportunidades y aumentar su impacto en el mercado.
            </p>

            <a
              href="/contacto"
              className="group self-start flex items-center gap-3 bg-brand-accent px-4 py-3 text-background"
            >
              <span className="text-[18px] font-medium tracking-[-0.04em] whitespace-nowrap">
                Contacta con nosotros
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
                <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>

          <div className="shrink-0 self-end sm:w-[45%]">
            <Image
              src="/about-team.jpg"
              alt="Equipo Ítacarb"
              width={660}
              height={660}
              className="w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
