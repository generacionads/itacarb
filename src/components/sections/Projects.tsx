import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";

const projects = [
  {
    id: "morales-raya",
    name: "Clínica Dr. Morales Raya",
    image: "/projects/carlos-morales-raya-1654788615.jpg",
    objectPosition: "center center",
    href: "/proyectos/clinica-morales-raya",
  },
  {
    id: "paralelo-estudio",
    name: "Paralelo Estudio",
    image: "/projects/NEW_FL_destacada-1024x646.jpg",
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
    // grid-template-rows scopes the reflow to this grid context instead of
    // triggering a full-document layout pass on every frame (transition-[height] did)
    <div className="group grid w-full overflow-hidden transition-[grid-template-rows] duration-500 ease-out [grid-template-rows:288px] hover:[grid-template-rows:360px] sm:[grid-template-rows:420px] sm:hover:[grid-template-rows:560px]">
      <a href={project.href} className="relative overflow-hidden min-h-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            style={{ objectPosition: project.objectPosition ?? "center center" }}
          />
        ) : (
          <div className="absolute inset-0 bg-placeholder" />
        )}

        {/* Overlay terracota: hover devices → 65% → 0%; touch devices → 25% (image visible without hover) */}
        <div
          className="absolute inset-0 opacity-[0.65] [@media(hover:none)]:opacity-[0.25] transition-opacity duration-500 group-hover:opacity-0 bg-brand-accent"
          style={{ mixBlendMode: "multiply" }}
        />

        <div className="absolute bottom-5 left-5">
          <span
            className="project-name-text inline-block text-[32px] font-medium leading-8 tracking-[-0.04em] sm:whitespace-nowrap
              text-background px-3 py-3
              bg-transparent group-hover:bg-brand-accent
              group-hover:-translate-y-1.5"
          >
            {project.name}
          </span>
        </div>
      </a>
    </div>
  );
}

export function Projects() {
  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="mb-16">
          <RevealH2
            className="text-foreground text-4xl md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
          >
            Proyectos que dejan huella
          </RevealH2>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-end gap-12">
          <p className="text-foreground text-[16px] font-light tracking-[0.04em] text-right max-w-2xl">
            Cada empresa tiene sus propios retos y objetivos. Si buscas un proyecto con el que identificarte, explora otros casos de éxito y descubre cómo hemos ayudado a empresas de diferentes sectores a impulsar su crecimiento.
          </p>
          <a
            href="/proyectos"
            className="group flex items-center gap-3 bg-brand-accent px-3 py-3 text-background"
          >
            <span className="text-[24px] font-medium tracking-[-0.04em] whitespace-nowrap">
              Explora más Proyectos
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 btn-morph-svg">
              <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
