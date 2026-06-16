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
    strategyImage: "/projects/clinica-morales-raya/estrategia.jpg",
    strategyText:
      "Establecimos una medición precisa del ecosistema digital, garantizando la trazabilidad de cada acción para optimizar las campañas. Sobre esta sólida base analítica, impulsamos la generación de alcance para aumentar exponencialmente la visibilidad de los servicios. Finalmente, todo este esfuerzo de difusión se canalizó hacia una captación cualificada, logrando atraer usuarios con una intención real de iniciar terapia y asegurando pacientes.",
    solutionImage: "/projects/clinica-morales-raya/solucion.jpg",
    solutionText:
      "Partiendo de un escenario inicial marcado por procesos ineficientes y un nulo posicionamiento digital, reestructuramos por completo su ecosistema. Nuestro enfoque permitió proyectar el verdadero valor de su marca directamente hacia el público adecuado. Como resultado, logramos convertir una infraestructura operativa estancada en un motor de captación optimizado, impulsando un crecimiento comercial sostenido y consolidando su autoridad en el sector de la salud mental.",
    reviewImage: "/projects/clinica-morales-raya/resena.jpg",
    reviewAvatar: "/projects/clinica-morales-raya/avatar.jpg",
    reviewAuthor: "Carlos Novion",
    reviewRole: "CEO",
    reviewQuote:
      "Quiero destacar el excelente servicio que recibí de Generación Ads durante todo un año. Su equipo no solo brindó un soporte impecable para mi sitio web, sino que también manejaron mis redes sociales de manera profesional y estratégica. Siempre estuvieron disponibles para resolver dudas, proponer mejoras y adaptar estrategias a las necesidades de mi negocio.",
  },
  {
    slug: "paralelo-estudio",
    name: "Paralelo Estudio",
    tagline: "Construyendo una identidad de marca sólida para un estudio de arquitectura emergente",
    description:
      "Paralelo Estudio es un estudio de arquitectura enfocado en proyectos residenciales y comerciales de alta exigencia. Contaban con un portfolio de obra excepcional pero carecían de una identidad de marca y presencia digital que reflejara su nivel de trabajo.",
    stat: { value: "2.4×", label: "más solicitudes de proyecto en los primeros 6 meses" },
    heroImage: "/projects/paralelo-estudio.jpg",
    strategyImage: "/projects/paralelo-estudio/estrategia.jpg",
    strategyText:
      "Desarrollamos una identidad visual coherente con la filosofía del estudio y la aplicamos a todos los puntos de contacto digitales. Construimos una presencia online que comunicaba con claridad su propuesta de valor, atrayendo clientes que buscaban exactamente el tipo de proyecto que Paralelo Estudio sabe ejecutar.",
    solutionImage: "/projects/paralelo-estudio/solucion.jpg",
    solutionText:
      "Partiendo de una identidad difusa y sin diferenciación clara, construimos una narrativa de marca sólida que reflejaba la precisión y el rigor de su trabajo. Cada pieza de comunicación se diseñó para conectar con el perfil de cliente que el estudio quería atraer, logrando posicionarlos como referente en su nicho y generando un flujo constante de proyectos de mayor envergadura.",
    reviewImage: "/projects/paralelo-estudio/resena.jpg",
    reviewAvatar: "/projects/paralelo-estudio/avatar.jpg",
    reviewAuthor: "Nombre del cliente",
    reviewRole: "Cargo",
    reviewQuote: "Reseña del cliente de Paralelo Estudio.",
  },
  {
    slug: "on-level-quality",
    name: "On Level Quality",
    tagline: "Posicionando una empresa industrial como referente de calidad en su sector",
    description:
      "On Level Quality es una empresa especializada en control de calidad y metrología industrial. A pesar de su alta capacidad técnica, su comunicación no transmitía la solidez y precisión que caracteriza a sus servicios, dificultando la captación de grandes cuentas.",
    stat: { value: "40%", label: "de incremento en solicitudes de presupuesto cualificadas" },
    heroImage: "/projects/on-level-quality.jpg",
    strategyImage: "/projects/on-level-quality/estrategia.jpg",
    strategyText:
      "Redefinimos el posicionamiento de marca para reflejar la excelencia técnica de sus servicios y construimos una comunicación que generaba confianza en perfiles de compra B2B. La estrategia de contenidos y la presencia digital reforzada permitieron llegar a decisores de compra en grandes empresas industriales.",
    solutionImage: "/projects/on-level-quality/solucion.jpg",
    solutionText:
      "Partiendo de una comunicación técnica pero poco persuasiva, transformamos su presencia digital en un activo comercial. Alineamos el mensaje de marca con las necesidades reales de sus clientes objetivo y desarrollamos canales de captación que conectaban directamente con decisores industriales, consolidando su reputación como proveedor de referencia en el sector.",
    reviewImage: "/projects/on-level-quality/resena.jpg",
    reviewAvatar: "/projects/on-level-quality/avatar.jpg",
    reviewAuthor: "Nombre del cliente",
    reviewRole: "Cargo",
    reviewQuote: "Reseña del cliente de On Level Quality.",
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
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">

        {/* Header: tagline izq · nombre proyecto h1 der */}
        <div className="px-4 sm:px-16 pt-16 pb-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-0 md:justify-between">
          <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight md:max-w-[420px] shrink-0">
            {project.tagline}
          </p>
          <h1 className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-none">
            {project.name}
          </h1>
        </div>

        {/* Imagen cuadrada (col izq) + descripción y métrica (col der) */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-square overflow-hidden bg-placeholder">
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-8 max-w-[560px] mx-auto w-full">
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {project.description}
              </p>
              <div className="border border-foreground p-8 flex flex-col gap-6">
                <p className="text-foreground text-[64px] font-medium leading-[50px] tracking-[-0.04em]">
                  {project.stat.value}
                </p>
                <p className="text-brand-accent text-[32px] font-medium tracking-[-0.04em] leading-tight">
                  {project.stat.label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estrategia */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-[4/3] overflow-hidden bg-placeholder">
            {project.strategyImage && (
              <Image
                src={project.strategyImage}
                alt={`${project.name} — estrategia`}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-6 max-w-[560px] mx-auto w-full">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Estrategia
              </p>
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {project.strategyText}
              </p>
            </div>
          </div>
        </div>

        {/* Solución */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-[4/3] overflow-hidden bg-placeholder">
            {project.solutionImage && (
              <Image
                src={project.solutionImage}
                alt={`${project.name} — solución`}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-6 max-w-[560px] mx-auto w-full">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Solución
              </p>
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {project.solutionText}
              </p>
            </div>
          </div>
        </div>

        {/* Reseña */}
        <div className="px-4 sm:px-16 py-16">
          <div className="flex flex-col gap-16 max-w-[560px] w-full">
            <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
              Reseña
            </p>

            <div className="flex items-center gap-3">
              <div className="relative size-[80px] shrink-0 overflow-hidden bg-placeholder">
                {project.reviewAvatar && (
                  <Image
                    src={project.reviewAvatar}
                    alt={project.reviewAuthor}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 py-3 px-3">
                <p className="text-foreground text-[16px] font-medium">
                  {project.reviewAuthor}
                </p>
                <p className="text-foreground text-[16px] font-light">
                  {project.reviewRole}
                </p>
              </div>
            </div>

            <p className="text-foreground text-[16px] font-light leading-relaxed">
              "{project.reviewQuote}"
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
