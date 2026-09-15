"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const COOKIE_CONSENT_KEY = "itacarb_cookie_consent";
export const COOKIE_CONSENT_EVENT = "itacarb-cookie-consent";

export type ConsentValue = "accepted" | "rejected";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

function setStoredConsent(value: ConsentValue) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  function handleChoice(value: ConsentValue) {
    setStoredConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[70] bg-[var(--color-brand-primary)] px-4 py-6 sm:px-16"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="text-background text-[14px] font-light leading-relaxed">
          Usamos cookies propias y de terceros para analizar el uso de la web y mejorar tu experiencia. Puedes
          aceptarlas, rechazarlas o consultar más información en nuestra{" "}
          <Link href="/politica-de-cookies" className="underline hover:opacity-70 transition-opacity">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="border border-background text-background text-[14px] font-medium tracking-[0.04em] px-5 py-3 hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="bg-brand-accent text-background text-[14px] font-medium tracking-[0.04em] px-5 py-3 hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
