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
          Estrategia digital global íntegra, dónde analizamos estratégicamente necesidades, y en consecuencia recomendamos una serie de soluciones digitales.
        </h1>

        {/* Body + imagen */}
        <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <p
            className="text-[#36383a] text-base sm:text-lg leading-relaxed font-light max-w-[660px]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            ítaca es una consultora de estrategia digital global.
            <br /><br />
            Nos relacionamos genuinamente con organizaciones valientes para hacer crecer otro tipo de negocio: más humano, más trascendente.
            <br /><br />
            Combinamos creatividad, diseño, tecnología y datos para crear productos, marcas, servicios y empresas que se relacionan con las personas, diseñando historias para el día de mañana.
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
