import { Container } from "@/components/ui/Container";

export function Contact() {
  return (
    <section id="contacto" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-accent)]">
            Contacto
          </p>
          <h2 className="font-display text-3xl font-bold text-[var(--color-brand-primary)] sm:text-4xl">
            Cuéntanos tu proyecto
          </h2>
          <p className="mt-4 text-[var(--color-brand-muted)]">
            Escríbenos y te responderemos en menos de 24 horas.
          </p>
        </div>

        <form className="mx-auto mt-12 max-w-xl space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--color-brand-primary)]">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-[var(--color-brand-primary)]/20 bg-[var(--color-brand-light)] px-4 py-3 text-sm text-[var(--color-brand-primary)] placeholder:text-[var(--color-brand-muted)]/60 focus:border-[var(--color-brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-accent)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--color-brand-primary)]">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@empresa.com"
                className="w-full rounded-lg border border-[var(--color-brand-primary)]/20 bg-[var(--color-brand-light)] px-4 py-3 text-sm text-[var(--color-brand-primary)] placeholder:text-[var(--color-brand-muted)]/60 focus:border-[var(--color-brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-accent)]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-[var(--color-brand-primary)]">
              Empresa
            </label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder="Nombre de tu empresa"
              className="w-full rounded-lg border border-[var(--color-brand-primary)]/20 bg-[var(--color-brand-light)] px-4 py-3 text-sm text-[var(--color-brand-primary)] placeholder:text-[var(--color-brand-muted)]/60 focus:border-[var(--color-brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-accent)]"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--color-brand-primary)]">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Cuéntanos en qué podemos ayudarte..."
              className="w-full rounded-lg border border-[var(--color-brand-primary)]/20 bg-[var(--color-brand-light)] px-4 py-3 text-sm text-[var(--color-brand-primary)] placeholder:text-[var(--color-brand-muted)]/60 focus:border-[var(--color-brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-accent)]"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--color-brand-accent)] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[var(--color-brand-accent)]/90"
          >
            Enviar mensaje
          </button>
        </form>
      </Container>
    </section>
  );
}
