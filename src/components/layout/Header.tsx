"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Sobre nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-brand-primary)]/10 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-[var(--color-brand-primary)] sm:text-2xl"
          >
            Ítacarb
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--color-brand-muted)] transition-colors hover:text-[var(--color-brand-primary)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="rounded-lg bg-[var(--color-brand-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-accent)]/90"
            >
              Hablemos
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-brand-primary)] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menú</span>
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[var(--color-brand-primary)]/10 bg-white md:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-[var(--color-brand-muted)] transition-colors hover:bg-[var(--color-brand-light)] hover:text-[var(--color-brand-primary)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-[var(--color-brand-accent)] px-4 py-3 text-center text-base font-medium text-white"
              >
                Hablemos
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
