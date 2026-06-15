import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";

const projects = [
  {
    id: "morales-raya",
    name: "Clínica Dr. Morales Raya",
    image: "/projects/morales-raya.jpeg",
    objectPosition: "center center",
    href: "/proyectos/clinica-morales-raya",
  },
  {
    id: "paralelo-estudio",
    name: "Paralelo Estudio",
    image: "/projects/paralelo-estudio.jpg",
    objectPosition: "center center",
    href: "/proyectos/paralelo-estudio",
  },
  {
    id: "on-level-quality",
    name: "On Level Quality",
    image: "/projects/on-level-quality.jpg",
    objectPosition: "center center",
    href: "/proyectos/on-level-quality",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <a
      href={project.href}
      className="group relative block h-72 w-full overflow-hidden transition-[height] duration-500 ease-out hover:h-[360px] sm:h-[420px] sm:hover:h-[560px]"
    >
      {/* Imagen */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          style={{ objectPosition: project.objectPosition ?? "center center" }}
        />
      ) : (
        <div className="absolute inset-0 bg-[#c0bdb8]" />
      )}

      {/* Overlay rojo — desaparece en hover */}
      <div
        className="absolute inset-0 opacity-[0.65] transition-opacity duration-500 group-hover:opacity-0"
        style={{ backgroundColor: "#c8553d", mixBlendMode: "multiply" }}
      />

      {/* Label izquierda */}
      <div className="absolute bottom-8 left-8">
        <span
          className="text-[32px] font-medium leading-8 tracking-[-0.04em] text-[#f9f8f6] whitespace-nowrap"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {project.name}
        </span>
      </div>
    </a>
  );
}

export function Projects() {
  return (
    <section className="py-24 bg-[#f9f8f6]">
      <Container>
        {/* H2 + subtítulo */}
        <div className="mb-16">
          <RevealH2
            className="text-[#36383a] text-4xl md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Proyectos que dejan huella
          </RevealH2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-end gap-12">
          <p
            className="text-[#36383a] text-[16px] font-light tracking-[0.04em] text-right max-w-2xl"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Cada empresa tiene sus propios retos y objetivos. Si buscas un proyecto con el que identificarte, explora otros casos de éxito y descubre cómo hemos ayudado a empresas de diferentes sectores a impulsar su crecimiento.
          </p>
          <a
            href="/proyectos"
            className="flex items-center gap-3 bg-[#c8553d] px-3 py-3 transition-opacity hover:opacity-90"
          >
            <span
              className="text-[#eae8e3] text-[24px] font-medium tracking-[-0.04em] whitespace-nowrap"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              Explora más Proyectos
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="#eae8e3" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
