import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const projects = [
  {
    slug: "clinica-morales-raya",
    name: "Clínica Dr. Morales Raya",
    tagline: "De la invisibilidad digital a escalar la captación cualificada de pacientes",
    description:
      "Clínica Dr. Morales Raya es un centro médico especializado en medicina estética y tratamientos avanzados. Su principal desafío radicaba en que su excelencia clínica no se reflejaba en su presencia digital, lo que limitaba severamente su capacidad para llegar a nuevos pacientes.",
    stat: { value: "103%", label: "de aumento en visibilidad cualificada tras 4 meses" },
    heroImage: "/projects/morales-raya.jpeg",
  },
  {
    slug: "paralelo-estudio",
    name: "Paralelo Estudio",
    tagline: "Construyendo una identidad de marca sólida para un estudio de arquitectura emergente",
    description:
      "Paralelo Estudio es un estudio de arquitectura enfocado en proyectos residenciales y comerciales de alta exigencia. Contaban con un portfolio de obra excepcional pero carecían de una identidad de marca y presencia digital que reflejara su nivel de trabajo.",
    stat: { value: "2.4×", label: "más solicitudes de proyecto en los primeros 6 meses" },
    heroImage: "/projects/paralelo-estudio.jpg",
  },
  {
    slug: "on-level-quality",
    name: "On Level Quality",
    tagline: "Posicionando una empresa industrial como referente de calidad en su sector",
    description:
      "On Level Quality es una empresa especializada en control de calidad y metrología industrial. A pesar de su alta capacidad técnica, su comunicación no transmitía la solidez y precisión que caracteriza a sus servicios, dificultando la captación de grandes cuentas.",
    stat: { value: "40%", label: "de incremento en solicitudes de presupuesto cualificadas" },
    heroImage: "/projects/on-level-quality.jpg",
  },
];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-[#f9f8f6] min-h-screen flex flex-col">

        {/* Header: tagline (izquierda) + nombre proyecto (derecha) */}
        <div className="px-4 sm:px-16 pt-16 pb-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-0 md:justify-between">
          <p
            className="text-[#36383a] text-[32px] font-medium tracking-[-0.04em] leading-tight md:max-w-[420px] shrink-0"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            {project.tagline}
          </p>
          <p
            className="text-[#36383a] text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-none"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            {project.name}
          </p>
        </div>

        {/* Imagen cuadrada (col izq) + descripción y métrica (col der) */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
          {/* Imagen cuadrada — misma anchura que la columna izquierda del header */}
          <div className="relative w-full md:w-[420px] shrink-0 aspect-square overflow-hidden bg-[#d9d9d9]">
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Columna derecha: descripción + métrica apiladas */}
          <div className="flex flex-col gap-8 flex-1">
            <p
              className="text-[#36383a] text-[18px] font-light leading-relaxed"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              {project.description}
            </p>
            <div className="border border-[#36383a] p-8 flex flex-col gap-6">
              <p
                className="text-[#36383a] text-[64px] font-medium leading-[50px] tracking-[-0.04em]"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                {project.stat.value}
              </p>
              <p
                className="text-[#c8553d] text-[32px] font-medium tracking-[-0.04em] leading-tight"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                {project.stat.label}
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
