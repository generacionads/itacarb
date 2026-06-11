import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function Intro() {
  return (
    <section className="py-24 bg-[#f9f8f6]">
      <Container>
        {/* H1 */}
        <h1
          className="text-[#36383a] text-4xl sm:text-5xl lg:text-[72px] font-medium leading-tight tracking-[-0.04em]"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Consultora estratégica que conecta marca, creatividad y crecimiento.
        </h1>

        {/* Body + imagen */}
        <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <p
            className="text-[#36383a] text-base sm:text-lg leading-relaxed font-light max-w-[660px]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Impulsamos el crecimiento de empresas consolidadas mediante estrategias alineadas con sus objetivos para mejorar el reconocimiento de marca, atraer nuevas oportunidades y aumentar el volumen de negocio.
            <br /><br />
            Nuestros proyectos abarcan distintos sectores y desafíos empresariales, pero todos comparten un mismo objetivo: generar crecimiento real. Descubre cómo hemos ayudado a empresas a fortalecer su posicionamiento, captar nuevas oportunidades y aumentar su impacto en el mercado.
          </p>

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
