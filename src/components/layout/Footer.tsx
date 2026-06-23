import { Container } from "@/components/ui/Container";

const navLinks = ["Nosotros", "Sectores", "Proyectos", "Servicio", "Blog", "Contacto"];
const legalLinks = ["Aviso Legal", "Política de Privacidad", "Política de Cookies", "Código De Conducta"];
const socialLinks = ["Youtube", "LinkedIn", "Instagram"];

export function Footer() {
  return (
    <footer className="bg-brand-accent pt-24 pb-10 min-h-screen flex flex-col">
      <Container className="flex flex-col flex-1">
        {/* Top row: hablemos + contacto izq · nav + ES dcha */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          {/* Izquierda */}
          <div className="flex flex-col gap-6">
            <p className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none">
              Hablemos
            </p>
            <div className="flex gap-8 text-foreground text-[16px] font-medium tracking-[0.04em]">
              <a href="mailto:hola@itacarb.com" className="hover:opacity-70 transition-opacity">
                hola@itacarb.com
              </a>
              <a href="tel:+34611681539" className="hover:opacity-70 transition-opacity">
                +34 611 68 15 39
              </a>
            </div>
          </div>

          {/* Derecha: nav + ES */}
          <div className="flex items-start gap-8 flex-wrap md:flex-nowrap">
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-foreground text-[16px] font-medium tracking-[0.04em]">
              {navLinks.map((link) => (
                <a key={link} href="#" className="hover:opacity-70 transition-opacity whitespace-nowrap">
                  {link}
                </a>
              ))}
            </nav>
            <button
              className="bg-foreground text-background text-[16px] font-medium tracking-[0.04em] px-6 py-3 shrink-0 hover:opacity-80 transition-opacity"
            >
              ES
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom row: legales izq · redes dcha */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0 mt-16 md:mt-0">
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-foreground text-[14px] font-medium tracking-[0.035em]">
            {legalLinks.map((link) => (
              <a key={link} href="#" className="hover:opacity-70 transition-opacity whitespace-nowrap">
                {link}
              </a>
            ))}
          </nav>
          <div className="flex gap-8">
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
