"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Sectores", href: "/sectores" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicio", href: "/servicio" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-[72px]">
          <Link href="/" aria-label="Ítacarb — Inicio">
            <Image
              src="/logo.svg"
              alt="Ítacarb"
              width={140}
              height={37}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-12 md:flex">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium tracking-[0.04em] text-foreground transition-colors hover:text-brand-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contacto"
              className="px-6 py-3 text-base font-medium tracking-[0.04em] text-background bg-brand-accent"
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-md text-foreground md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menú</span>
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-black/10 backdrop-blur-md md:hidden bg-background/85">
          <Container>
            <nav className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium tracking-[0.04em] text-foreground transition-colors hover:text-brand-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-3 text-base font-medium tracking-[0.04em] text-background bg-brand-accent text-center"
              >
                Contacto
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
