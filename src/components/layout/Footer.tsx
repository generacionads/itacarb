import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-[var(--color-brand-primary)] py-12 text-white">
      <Container>
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold tracking-tight">Ítacarb</p>
            <p className="mt-1 text-sm text-white/60">Consultoría Estratégica de Marketing</p>
          </div>
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Ítacarb. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
