import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Sectors } from "@/components/sections/Sectors";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: getPathname({ locale, href: "/" }),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ locale: loc, href: "/" })])
      ),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Intro />
        <Sectors />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
