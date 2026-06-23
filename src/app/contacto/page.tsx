import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { RevealH2 } from "@/components/ui/RevealH2";

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
          <div className="mt-10 flex-1 w-full relative overflow-hidden">
            <Image
              src="/about-team.jpg"
              alt="Equipo Ítacarb"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <Contact />

      </main>
      <Footer />
    </>
  );
}
