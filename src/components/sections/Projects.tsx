import Image from "next/image";
import { Container } from "@/components/ui/Container";

const projects = [
  {
    id: "morales-raya",
    name: "Clínica Dr. Morales Raya",
    image: "/projects/morales-raya.jpg",
    href: "/proyectos/clinica-morales-raya",
  },
  {
    id: "arias-arquitectos",
    name: "Estudio Arias Arquitectos",
    image: null,
    href: "/proyectos/arias-arquitectos",
  },
  {
    id: "ferral",
    name: "Industrias Ferral S.L.",
    image: null,
    href: "/proyectos/ferral",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <a href={project.href} className="group relative block h-72 w-full overflow-hidden sm:h-[420px]">
      {/* Imagen */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[#c0bdb8]" />
      )}

      {/* Overlay rojo */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#c8553d", mixBlendMode: "multiply", opacity: 0.65 }}
      />

      {/* Label centrado */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center border border-[#36383a] bg-[#f9f8f6]">
        <span
          className="bg-[#f9f8f6] px-8 py-8 text-[32px] font-medium leading-8 tracking-[-0.04em] text-[#36383a] whitespace-nowrap"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {project.name}
        </span>
        <span className="flex items-center justify-center bg-[#c8553d] p-3 shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
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
        <div className="flex flex-col gap-6 mb-16">
          <h2
            className="text-[#36383a] text-4xl md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Proyectos que dejan huella
          </h2>
          <p
            className="text-[#36383a] text-[18px] font-light max-w-3xl"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            Diseñamos y damos forma a cómo los players más importantes de diferentes sectores dejan una huella positiva más allá de los tendencias y cánones establecidos.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
