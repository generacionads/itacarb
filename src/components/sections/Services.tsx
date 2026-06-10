import { Container } from "@/components/ui/Container";

const services = [
  {
    title: "Estrategia de marca",
    description:
      "Definimos el posicionamiento, propuesta de valor y arquitectura de marca para que tu empresa ocupe un lugar relevante en la mente de tus clientes.",
    icon: "◆",
  },
  {
    title: "Marketing digital",
    description:
      "Diseñamos y ejecutamos planes de marketing digital orientados a resultados, integrando SEO, paid media, contenidos y conversión.",
    icon: "◈",
  },
  {
    title: "Analítica y datos",
    description:
      "Convertimos datos en decisiones. Implementamos métricas clave, dashboards y modelos de atribución para que cada euro invertido tenga sentido.",
    icon: "◉",
  },
  {
    title: "Consultoría estratégica",
    description:
      "Acompañamos a los equipos directivos en la definición de estrategias de crecimiento, expansión de mercados y transformación comercial.",
    icon: "◇",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)]">
            Qué hacemos
          </p>
          <h2 className="font-display text-3xl font-bold text-[var(--color-brand-primary)] sm:text-4xl">
            Servicios diseñados para hacer crecer tu negocio
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-[var(--color-brand-primary)]/10 bg-[var(--color-brand-light)] p-8 transition-shadow hover:shadow-lg"
            >
              <span className="text-3xl text-[var(--color-brand-accent)]">{service.icon}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-brand-primary)]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-brand-muted)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
