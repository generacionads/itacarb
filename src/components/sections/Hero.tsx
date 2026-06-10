import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-brand-light)] py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)]">
            Consultoría Estratégica de Marketing
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-[var(--color-brand-primary)] sm:text-5xl lg:text-6xl">
            Estrategia que transforma marcas en resultados
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-brand-muted)] sm:text-xl">
            Ayudamos a empresas a crecer con estrategia de marketing clara, datos que orientan
            y creatividad que conecta con las personas.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#contacto"
              className="w-full rounded-xl bg-[var(--color-brand-accent)] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[var(--color-brand-accent)]/90 sm:w-auto"
            >
              Hablemos de tu proyecto
            </a>
            <a
              href="#servicios"
              className="w-full rounded-xl border border-[var(--color-brand-primary)]/20 px-8 py-4 text-base font-semibold text-[var(--color-brand-primary)] transition-colors hover:border-[var(--color-brand-primary)] sm:w-auto"
            >
              Conoce nuestros servicios
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
