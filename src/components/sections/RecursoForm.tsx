"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { pushGenerateLead, readTracking } from "@/lib/lead-tracking";
import {
  RECURSO_FORM_COPY,
  RECURSO_FORM_ID,
  RECURSO_FORM_NAME,
} from "@/lib/recursos";
import { validateRecursoLead, type RecursoErrors } from "@/lib/recursos-validation";

type Status = "idle" | "pending" | "error" | "done";

const copy = RECURSO_FORM_COPY;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent";
const errorClass = "mt-3 text-[14px] font-medium text-brand-accent-dark";

/** Campo de email sobre el botón de descarga. El recurso se envía por email, la web no muestra ningún enlace. */
export function RecursoForm({ slug, cta }: { slug: string; cta: string }) {
  const mountedAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<RecursoErrors>({});

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "pending") return;

    const form = e.currentTarget;
    const tracking = readTracking();
    const raw: Record<string, unknown> = {
      ...Object.fromEntries(new FormData(form)),
      ...tracking,
      slug,
      consent: (form.elements.namedItem("consent") as HTMLInputElement).checked,
    };

    const check = validateRecursoLead(raw);
    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      document.getElementById(check.errors.email ? "recurso-email" : "recurso-consent")?.focus();
      return;
    }

    setErrors({});
    setStatus("pending");
    try {
      const res = await fetch("/api/recursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, fill_ms: Date.now() - mountedAt.current }),
      });

      if (res.status === 400) {
        const data = await res.json().catch(() => null);
        if (data?.fields) {
          setErrors(data.fields as RecursoErrors);
          setStatus("idle");
          return;
        }
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }

      const data = await res.json().catch(() => null);
      // `recorded` solo viene en envíos reales: el falso éxito para bots no cuenta.
      if (data?.recorded) {
        pushGenerateLead(tracking, {
          form_name: RECURSO_FORM_NAME,
          form_id: RECURSO_FORM_ID,
          resource_slug: slug,
        });
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="flex max-w-[560px] flex-col gap-3">
        <p className="text-foreground text-[32px] md:text-[40px] font-medium leading-tight tracking-[-0.04em]">
          {copy.success.heading}
        </p>
        <p className="text-foreground text-base sm:text-lg leading-relaxed font-light">{copy.success.body}</p>
      </div>
    );
  }

  const pending = status === "pending";

  return (
    <form
      id={RECURSO_FORM_ID}
      data-form-name={RECURSO_FORM_NAME}
      noValidate
      onSubmit={handleSubmit}
      aria-label={cta}
      className="flex w-full max-w-[560px] flex-col gap-6"
    >
      {/* Honeypot: fuera de pantalla y fuera del orden de tabulación */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No rellenar
          <input type="text" name="contacto_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <div className="border-b-2 border-brand-muted px-1 pb-4 focus-within:border-brand-accent has-[[aria-invalid=true]]:border-brand-accent-dark">
          <input
            id="recurso-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder={copy.emailLabel}
            aria-label={copy.emailLabel}
            required
            onChange={() => errors.email && setErrors((p) => ({ ...p, email: undefined }))}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "recurso-email-error" : undefined}
            className="w-full rounded-none bg-transparent text-[24px] md:text-[32px] font-medium tracking-[-0.04em] text-foreground placeholder:text-brand-muted outline-none"
          />
        </div>
        {errors.email && (
          <p id="recurso-email-error" className={errorClass}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Consentimiento RGPD */}
      <div className="px-1">
        <div className="flex items-start gap-3">
          <span className="relative mt-[2px] inline-flex h-5 w-5 shrink-0">
            <input
              id="recurso-consent"
              name="consent"
              type="checkbox"
              required
              onChange={() => errors.consent && setErrors((p) => ({ ...p, consent: undefined }))}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "recurso-consent-error" : undefined}
              className={`peer h-5 w-5 appearance-none rounded-none border border-foreground bg-transparent checked:border-brand-accent checked:bg-brand-accent aria-[invalid=true]:border-brand-accent-dark ${focusRing}`}
            />
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden text-background peer-checked:block"
            >
              <path d="M5 10.5l3.2 3.2L15 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
            </svg>
          </span>
          <label htmlFor="recurso-consent" className="text-[14px] font-light leading-relaxed text-foreground">
            {copy.consentBefore}
            <Link href="/politica-de-privacidad" target="_blank" className="underline underline-offset-2 hover:text-brand-accent-dark">
              {copy.consentLink}
            </Link>
            {copy.consentAfter}
          </label>
        </div>
        {errors.consent && (
          <p id="recurso-consent-error" className={errorClass}>
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-brand-accent-dark text-[16px] font-medium">
          {copy.errorGeneric}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`group flex self-start items-center gap-3 bg-brand-accent px-4 py-3 text-background transition-colors duration-200 hover:bg-brand-accent-dark disabled:opacity-60 ${focusRing}`}
      >
        <span className="text-[18px] font-medium tracking-[-0.04em] whitespace-nowrap">
          {pending ? copy.submitting : cta}
        </span>
        {!pending && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
            <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </form>
  );
}
