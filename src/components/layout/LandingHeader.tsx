import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { LOGO_ARIA } from "@/lib/pre-auditoria";

/** Cabecera de landings de captación: solo logo (enlaza a la home), sin menú. */
export function LandingHeader() {
  return (
    <header className="w-full">
      <Container>
        <div className="flex h-16 items-center sm:h-[72px]">
          <Link
            href="/"
            aria-label={LOGO_ARIA}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            <Image src="/logo.svg" alt="Ítacarb" width={140} height={37} priority />
          </Link>
        </div>
      </Container>
    </header>
  );
}
