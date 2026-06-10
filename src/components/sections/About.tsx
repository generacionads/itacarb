import { Container } from "@/components/ui/Container";

export function About() {
  return (
    <section id="nosotros" className="bg-[var(--color-brand-primary)] py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)]">
            Sobre nosotros
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Una consultora construida desde la estrategia real
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            En Ítacarb llevamos años ayudando a empresas a encontrar su camino en mercados cada
            vez más complejos. Combinamos rigor estratégico con un profundo conocimiento del
            comportamiento del consumidor para generar impacto medible.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            No creemos en soluciones genéricas. Cada proyecto empieza por entender a fondo
            la empresa, su contexto y sus objetivos. A partir de ahí, construimos juntos.
          </p>
        </div>
      </Container>
    </section>
  );
}
