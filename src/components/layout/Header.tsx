"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type Lenis from "lenis";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLElement>(null);
  const linksAnim = useRef<gsap.core.Tween | null>(null);
  const t = useTranslations("nav");

  const navLinks = [
    { label: t("nosotros"), href: "/nosotros" as const },
    { label: t("sectores"), href: "/sectores" as const },
    { label: t("proyectos"), href: "/proyectos" as const },
    { label: t("servicio"), href: "/servicio" as const },
    { label: t("blog"), href: "/blog" as const },
  ];

  const allMobileLinks = [
    ...navLinks,
    { label: t("contacto"), href: "/contacto" as const },
  ];

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      e.preventDefault();
      const lenis = (window as unknown as Record<string, Lenis>).__lenis;
      lenis?.scrollTo(0, { duration: 1.2 });
    }
  }

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll lock — stops Lenis + body overflow
  useEffect(() => {
    const lenis = (window as unknown as Record<string, unknown>).__lenis as Lenis | undefined;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [menuOpen]);

  // Link reveal — staggered fromTo on every open
  useEffect(() => {
    if (!menuOpen) return;
    const links = panelRef.current?.querySelectorAll<HTMLElement>("[data-menu-link]");
    if (!links?.length) return;
    linksAnim.current?.kill();
    linksAnim.current = gsap.fromTo(
      Array.from(links),
      { clipPath: "inset(0px 0px 110% 0px)", y: 10 },
      { clipPath: "inset(0px 0px -5% 0px)", y: 0, duration: 0.55, stagger: 0.09, ease: "power3.out", delay: 0.15 }
    );
    return () => { linksAnim.current?.kill(); };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-background/60">
        <Container>
          <div className="flex h-16 items-center justify-between sm:h-[72px]">
            <Link href="/" onClick={handleLogoClick} aria-label={t("homeAria")}>
              <Image
                src="/logo.svg"
                alt="Ítacarb"
                width={140}
                height={37}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium tracking-[0.04em] transition-colors hover:text-brand-accent-dark ${
                      pathname === link.href ? "text-brand-accent-dark" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <LanguageSwitcher className="text-foreground" />
              <Link
                href="/contacto"
                className="px-6 py-3 text-base font-medium tracking-[0.04em] text-background bg-brand-accent"
              >
                {t("contacto")}
              </Link>
            </nav>

            {/* Mobile toggle — "Menú" label, opens panel */}
            <button
              className="inline-flex min-h-[44px] items-center justify-center md:hidden text-base font-medium tracking-[0.04em] text-foreground"
              onClick={() => setMenuOpen(true)}
              aria-label={t("openMenuAria")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {t("menuLabel")}
            </button>
          </div>
        </Container>
      </header>

      {/* Full-screen side panel — z-[60] covers the header */}
      <nav
        ref={panelRef}
        id="mobile-menu"
        aria-label={t("mobileNavAria")}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[60] bg-brand-accent transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button — same corner position as the open button in the header */}
        <div className="absolute top-0 right-0 h-16 flex items-center pr-4 sm:h-[72px]">
          <button
            className="inline-flex min-w-[44px] min-h-[44px] items-center justify-center"
            onClick={() => setMenuOpen(false)}
            aria-label={t("closeMenuAria")}
          >
            <span className="relative block w-4 h-4">
              <span className="absolute inset-0 bg-brand-accent transition-all duration-200 origin-center scale-0 opacity-0" />
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="absolute inset-0 w-full h-full text-background transition-all duration-200 origin-center"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 3 L13 13 M13 3 L3 13" />
              </svg>
            </span>
          </button>
        </div>
        <div className="flex flex-col px-8 pt-24">
          {allMobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-menu-link=""
              className={`block w-full py-3 text-[36px] font-medium tracking-[-0.03em] leading-none text-right transition-opacity hover:opacity-60 ${
                pathname === link.href ? "opacity-40 text-background" : "text-background"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex justify-end pt-6">
            <LanguageSwitcher className="text-background" />
          </div>
        </div>

        {/* Logo — bottom-left, links to home */}
        <Link href="/" className="absolute bottom-8 left-8 opacity-25 hover:opacity-50 transition-opacity duration-200 brightness-0 invert">
          <Image
            src="/logo.svg"
            alt={t("homeAria")}
            width={120}
            height={32}
          />
        </Link>
      </nav>
    </>
  );
}
