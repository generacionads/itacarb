import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { RevealH2 } from "@/components/ui/RevealH2";
import { RevealWrap } from "@/components/ui/RevealWrap";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactoPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: getPathname({ locale, href: "/contacto" }),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ locale: loc, href: "/contacto" })])
      ),
    },
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactoPage" });

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
            {t("heading")}
          </RevealH2>
          <RevealWrap className="mt-10 flex-1 w-full relative overflow-hidden">
            <Image
              src="/foto grupal.jpg"
              alt={t("imageAlt")}
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
