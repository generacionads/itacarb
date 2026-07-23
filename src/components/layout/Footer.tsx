import { Container } from "@/components/ui/Container";

const legalLinks = ["Aviso Legal", "Política de Privacidad", "Política de Cookies", "Código De Conducta"];
const socialLinks = ["Youtube", "LinkedIn", "Instagram"];

export function Footer() {
  return (
    <footer className="bg-brand-accent pt-40 pb-10 min-h-screen flex flex-col">
      <Container className="flex flex-col flex-1">

        {/* Main content: newsletter izq · contacto + dirección dcha */}
        <div className="flex flex-col md:flex-row md:justify-between gap-16 md:gap-0">

          {/* Izquierda: newsletter */}
          <div className="flex flex-col gap-6 md:max-w-[480px]">
            <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-none">
              Suscríbete a nuestra newsletter
            </p>
            <div className="flex items-end gap-0 max-w-[320px] w-full">
              <input
                type="email"
                placeholder="email"
                className="flex-1 bg-transparent border-b border-foreground/40 text-foreground placeholder:text-foreground/50 text-[16px] font-medium tracking-[0.04em] pb-2 outline-none focus:border-foreground transition-colors duration-200"
              />
              <button
                type="submit"
                aria-label="Suscribirse"
                className="group bg-foreground text-background p-3 shrink-0 hover:opacity-80 transition-opacity"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg">
                  <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Derecha: consultas + dirección */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-none">
                Consultas generales
              </p>
              <a
                href="mailto:hola@itacarb.com"
                className="text-background text-[16px] font-medium tracking-[0.04em] hover:opacity-70 transition-opacity"
              >
                hola@itacarb.com
              </a>
              <a
                href="tel:+34611681539"
                className="text-background text-[16px] font-medium tracking-[0.04em] hover:opacity-70 transition-opacity"
              >
                +34 611 68 15 39
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-none">
                Dónde estamos
              </p>
              <address className="text-background text-[16px] font-medium tracking-[0.04em] not-italic leading-relaxed">
                Calle la diligencia, 9<br />
                oficina 7 28809
              </address>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom bar: legales izq · redes dcha */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0 mt-16 md:mt-0">
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-foreground text-[14px] font-medium tracking-[0.035em]">
            {legalLinks.map((link) => (
              <a key={link} href="#" className="hover:opacity-70 transition-opacity whitespace-nowrap">
                {link}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap gap-3 sm:gap-8">
            {socialLinks.map((social) => (
              <a
                key={social}
                href="#"
                className="bg-foreground text-background text-[16px] font-medium tracking-[0.04em] px-6 py-3 hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

      </Container>
    </footer>
  );
}
