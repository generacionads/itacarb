import Image from "next/image";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { RevealH2 } from "@/components/ui/RevealH2";
import { RevealWrap } from "@/components/ui/RevealWrap";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Habla con Ítacarb. Cuéntanos tu proyecto y te ayudamos a diseñar una estrategia de marketing con datos, creatividad y resultados medibles.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background">

        {/* H1 + imagen */}
        <div
          className="px-4 sm:px-16 pt-16 pb-0 flex flex-col"
          style={{ minHeight: "calc(100vh - 72px)" }}
        >
          <RevealH2
            as="h1"
            alwaysAnimate
            className="text-foreground text-[48px] md:text-[72px] font-medium tracking-[-0.04em] leading-none"
          >
            Hablemos.
          </RevealH2>
          <RevealWrap className="mt-10 flex-1 w-full relative overflow-hidden">
            <Image
              src="/foto grupal.jpg"
              alt="Equipo Ítacarb"
              fill
              className="object-cover object-top"
              priority
            />
          </RevealWrap>
        </div>

        <Contact />

      </main>
      <Footer />
    </>
  );
}
