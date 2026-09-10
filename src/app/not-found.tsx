import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">
        <div className="flex-1 px-4 sm:px-16 pt-16 pb-24 flex flex-col justify-center gap-8">
          <p className="text-brand-accent text-[12px] font-medium uppercase tracking-[0.1em]">
            Error 404
          </p>

          <h1 className="text-foreground text-[64px] md:text-[96px] font-medium tracking-[-0.04em] leading-none">
            Página no<br />encontrada.
          </h1>

          <p className="text-brand-muted text-[18px] font-light leading-relaxed max-w-[50ch]">
            La URL que buscas no existe o ha cambiado de dirección.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/"
              className="group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background w-fit"
            >
              <span className="text-[16px] font-medium tracking-[0.04em]">Volver al inicio</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
                <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 text-foreground border border-foreground text-[16px] font-medium tracking-[0.04em] hover:bg-foreground hover:text-background transition-colors duration-200 w-fit"
            >
              Contacto
            </a>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
