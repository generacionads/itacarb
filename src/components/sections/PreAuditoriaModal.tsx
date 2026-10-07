"use client";

import { useEffect, useId, useRef, useState } from "react";
import type Lenis from "lenis";
import { Link, useRouter } from "@/i18n/navigation";
import { getStoredConsent } from "@/components/ui/CookieConsent";
import {
  FORM_ID,
  FORM_NAME,
  INVERSION_OPTIONS,
  LANDING_COPY,
  LEADS_OPTIONS,
  THANKS_PATH,
  TICKET_OPTIONS,
  VISITAS_OPTIONS,
  type Option,
} from "@/lib/pre-auditoria";
import {
  validateLead,
  TRACKING_FIELDS,
  type FieldErrors,
  type FieldName,
  type TrackingField,
} from "@/lib/pre-auditoria-validation";

type Status = "idle" | "pending" | "error";
type Step = 1 | 2;
type Tracking = Record<TrackingField, string>;

const STEP_1_FIELDS: FieldName[] = ["url", "visitas", "leads", "inversion", "ticket"];
const STEP_2_FIELDS: FieldName[] = ["nombre", "email", "telefono", "consent"];
const FIELD_ORDER = [...STEP_1_FIELDS, ...STEP_2_FIELDS];
const TOTAL_STEPS = 2;

const copy = LANDING_COPY.form;

// Mismo estilo que Contact / ContactPpc (campo grande, borde inferior de 2px),
// un punto más pequeño para que quepa bien dentro del modal.
const rowClass =
  "border-b-2 border-brand-muted pb-6 px-1 focus-within:border-brand-accent has-[[aria-invalid=true]]:border-brand-accent-dark has-[[data-invalid=true]]:border-brand-accent-dark";
const bigInput =
  "w-full rounded-none bg-transparent text-[28px] md:text-[40px] font-medium tracking-[-0.04em] text-foreground placeholder:text-brand-muted outline-none";
const errorClass = "mt-3 text-[14px] font-medium text-brand-accent-dark";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent";

function readTracking(): Tracking {
  const params = new URLSearchParams(window.location.search);
  const tracking = {} as Tracking;
  for (const f of TRACKING_FIELDS) tracking[f] = "";
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    tracking[key] = params.get(key) ?? "";
  }
  tracking.referrer = document.referrer;
  tracking.page_url = window.location.href;
  return tracking;
}

/** Solo si el usuario aceptó cookies en el banner; si no, no se emite nada. */
function pushGenerateLead(tracking: Tracking) {
  if (getStoredConsent() !== "accepted") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "generate_lead",
    form_name: FORM_NAME,
    form_id: FORM_ID,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_content: tracking.utm_content,
    utm_term: tracking.utm_term,
  });
}

// Con el modal abierto se para el scroll de la página (Lenis + body), igual que el menú móvil del Header.
const getLenis = () => (window as unknown as { __lenis?: Lenis }).__lenis;
function lockScroll() {
  document.body.style.overflow = "hidden";
  getLenis()?.stop();
}
function unlockScroll() {
  document.body.style.overflow = "";
  getLenis()?.start();
}

function TextRow({
  name,
  label,
  type = "text",
  autoComplete,
  inputMode,
  required = true,
  error,
  onChange,
}: {
  name: FieldName;
  label: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "url" | "tel";
  required?: boolean;
  error?: string;
  onChange: () => void;
}) {
  return (
    <div>
      <div className={rowClass}>
        <input
          id={`pa-${name}`}
          type={type}
          name={name}
          autoComplete={autoComplete}
          inputMode={inputMode}
          autoCapitalize={inputMode === "url" ? "none" : undefined}
          spellCheck={inputMode === "url" ? false : undefined}
          placeholder={label}
          aria-label={label}
          required={required}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `pa-${name}-error` : undefined}
          className={bigInput}
        />
      </div>
      {error && (
        <p id={`pa-${name}-error`} className={errorClass}>
          {error}
        </p>
      )}
    </div>
  );
}

// Desplegable con el mismo diseño que el de modalidad de precio de ContactPpc:
// lista terracota con la opción elegida invertida. La lista va en el flujo
// (empuja el contenido) para que nunca quede cortada.
function SelectRow({
  name,
  label,
  options,
  error,
  onChange,
}: {
  name: FieldName;
  label: string;
  options: Option[];
  error?: string;
  onChange: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      onKeyDown={(e) => {
        // Escape cierra solo la lista, no el modal entero.
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          e.preventDefault();
          setOpen(false);
        }
      }}
    >
      <div className={rowClass}>
        <input type="hidden" name={name} value={value} />
        <button
          id={`pa-${name}`}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={selected ? `${label}: ${selected.label}` : label}
          data-invalid={error ? true : undefined}
          aria-describedby={error ? `pa-${name}-error` : undefined}
          className="flex w-full items-center justify-between gap-4 text-left outline-none"
        >
          <span
            className={`text-[22px] md:text-[24px] font-medium tracking-[-0.04em] ${
              selected ? "text-foreground" : "text-brand-muted"
            }`}
          >
            {selected ? selected.label : label}
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 text-brand-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {open && (
        <ul id={listId} role="listbox" aria-label={label} className="mt-2 bg-brand-accent">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                onClick={() => {
                  setValue(opt.value);
                  setOpen(false);
                  onChange();
                }}
                className={`w-full px-6 py-4 text-left text-[18px] md:text-[20px] font-medium tracking-[-0.02em] transition-colors ${
                  value === opt.value ? "bg-background text-brand-accent" : "text-background"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p id={`pa-${name}-error`} className={errorClass}>
          {error}
        </p>
      )}
    </div>
  );
}

function ArrowIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg shrink-0">
      <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PreAuditoriaModal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const openedAt = useRef(0);
  const titleId = useId();
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  // Si se navega (p. ej. a la página de gracias) con el modal abierto, se libera el scroll.
  useEffect(() => unlockScroll, []);

  // La query string solo existe en el navegador: los campos ocultos se rellenan
  // en el DOM al abrir y otra vez al enviar (React puede reescribirlos en medio).
  function fillTracking(form: HTMLFormElement): Tracking {
    const tracking = readTracking();
    for (const f of TRACKING_FIELDS) {
      const input = form.elements.namedItem(f) as HTMLInputElement | null;
      if (input) input.value = tracking[f];
    }
    return tracking;
  }

  function openModal() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    lockScroll();
    openedAt.current = Date.now();
    if (formRef.current) fillTracking(formRef.current);
    focusField(step === 1 ? "url" : "nombre");
  }

  function focusField(name: FieldName) {
    requestAnimationFrame(() => document.getElementById(`pa-${name}`)?.focus());
  }

  function clearError(field: FieldName) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function collect(form: HTMLFormElement): Record<string, unknown> {
    const raw: Record<string, unknown> = Object.fromEntries(new FormData(form));
    raw.consent = (form.elements.namedItem("consent") as HTMLInputElement).checked;
    return raw;
  }

  /** Muestra los errores, vuelve al paso del primer campo con error y le da el foco. */
  function showErrors(next: FieldErrors) {
    setErrors(next);
    setStatus("idle");
    const first = FIELD_ORDER.find((f) => next[f]);
    if (!first) return;
    setStep(STEP_1_FIELDS.includes(first) ? 1 : 2);
    focusField(first);
  }

  function goNext() {
    const form = formRef.current;
    if (!form) return;
    const check = validateLead(collect(form));
    // En el paso 1 solo cuentan los errores de sus campos (nombre, email... aún no se han pedido).
    const stepErrors: FieldErrors = {};
    if (!check.ok) {
      for (const f of STEP_1_FIELDS) if (check.errors[f]) stepErrors[f] = check.errors[f];
    }
    if (Object.keys(stepErrors).length > 0) {
      showErrors(stepErrors);
      return;
    }
    setErrors({});
    setStatus("idle");
    setStep(2);
    focusField("nombre");
  }

  function goBack() {
    setErrors({});
    setStatus("idle");
    setStep(1);
    focusField("url");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "pending") return;
    // Enter en el paso 1 avanza, no envía.
    if (step === 1) {
      goNext();
      return;
    }

    const form = e.currentTarget;
    const tracking = fillTracking(form);
    const raw = collect(form);

    const check = validateLead(raw);
    if (!check.ok) {
      showErrors(check.errors);
      return;
    }

    setErrors({});
    setStatus("pending");
    try {
      const res = await fetch("/api/pre-auditoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, fill_ms: Date.now() - openedAt.current }),
      });

      if (res.status === 400) {
        const data = await res.json().catch(() => null);
        if (data?.fields) {
          showErrors(data.fields as FieldErrors);
          return;
        }
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }

      const data = await res.json().catch(() => null);
      // `recorded` solo viene en envíos reales: el falso éxito para bots no cuenta.
      if (data?.recorded) pushGenerateLead(tracking);
      router.push(THANKS_PATH);
    } catch {
      setStatus("error");
    }
  }

  const pending = status === "pending";
  const hasErrors = Object.keys(errors).length > 0;
  const fieldProps = (name: FieldName) => ({ name, error: errors[name], onChange: () => clearError(name) });

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-haspopup="dialog"
        className={`group flex self-start items-center gap-3 bg-brand-accent px-4 py-3 text-background ${focusRing}`}
      >
        <span className="text-[18px] font-medium tracking-[-0.04em] whitespace-nowrap">{LANDING_COPY.cta}</span>
        <ArrowIcon size={24} />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={unlockScroll}
        onClick={(e) => {
          // Clic en el fondo oscuro (el propio <dialog>) cierra el modal.
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="fixed inset-0 m-auto h-[100dvh] max-h-none w-full max-w-none overflow-hidden border-0 bg-background p-0 text-foreground backdrop:bg-foreground/60 sm:h-auto sm:max-h-[92vh] sm:max-w-[900px]"
      >
        <div data-lenis-prevent className="h-full overflow-y-auto px-4 py-6 sm:max-h-[92vh] sm:px-12 sm:py-10">
          {/* Cabecera: paso actual + cerrar */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-[14px] font-medium tracking-[0.04em] text-brand-muted" aria-live="polite">
              {copy.stepLabel(step, TOTAL_STEPS)}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className={`flex items-center gap-2 text-[16px] font-medium tracking-[0.04em] text-foreground hover:text-brand-accent-dark ${focusRing}`}
            >
              {copy.close}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex gap-2" aria-hidden="true">
            {[1, 2].map((n) => (
              <span key={n} className={`h-[2px] flex-1 ${n <= step ? "bg-foreground" : "bg-brand-border"}`} />
            ))}
          </div>

          <form
            id={FORM_ID}
            data-form-name={FORM_NAME}
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6"
          >
            {/* Campos ocultos: UTM, referrer y URL, rellenados desde la query string */}
            {TRACKING_FIELDS.map((f) => (
              <input key={f} type="hidden" name={f} defaultValue="" />
            ))}

            {/* Honeypot: fuera de pantalla y fuera del orden de tabulación */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                No rellenar
                <input type="text" name="contacto_web" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {/* Paso 1: URL + rangos. Se oculta (no se desmonta) para conservar lo elegido. */}
            <div hidden={step !== 1} className="flex flex-col gap-6">
              <div>
                <h2 id={titleId} className="text-[32px] md:text-[40px] font-medium leading-tight tracking-[-0.04em] text-foreground">
                  {copy.step1Title}
                </h2>
                <p className="mt-3 max-w-[660px] text-[16px] font-light leading-relaxed text-brand-muted">{copy.step1Intro}</p>
              </div>

              <TextRow {...fieldProps("url")} label={copy.url.label} inputMode="url" autoComplete="url" />
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-x-12">
                <SelectRow {...fieldProps("visitas")} label={copy.visitas} options={VISITAS_OPTIONS} />
                <SelectRow {...fieldProps("leads")} label={copy.leads} options={LEADS_OPTIONS} />
                <SelectRow {...fieldProps("inversion")} label={copy.inversion} options={INVERSION_OPTIONS} />
                <SelectRow {...fieldProps("ticket")} label={copy.ticket} options={TICKET_OPTIONS} />
              </div>
            </div>

            {/* Paso 2: contacto */}
            <div hidden={step !== 2} className="flex flex-col gap-6">
              <div>
                <h2 className="text-[32px] md:text-[40px] font-medium leading-tight tracking-[-0.04em] text-foreground">
                  {copy.step2Title}
                </h2>
                <p className="mt-3 max-w-[660px] text-[16px] font-light leading-relaxed text-brand-muted">{copy.step2Intro}</p>
              </div>

              <TextRow {...fieldProps("nombre")} label={copy.nombre.label} autoComplete="name" />
              <TextRow {...fieldProps("email")} label={copy.email.label} type="email" autoComplete="email" />
              <TextRow {...fieldProps("telefono")} label={copy.telefono.label} type="tel" inputMode="tel" autoComplete="tel" required={false} />

              {/* Consentimiento RGPD */}
              <div className="px-1">
                <div className="flex items-start gap-3">
                  <span className="relative mt-[2px] inline-flex h-5 w-5 shrink-0">
                    <input
                      id="pa-consent"
                      name="consent"
                      type="checkbox"
                      required
                      onChange={() => clearError("consent")}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "pa-consent-error" : undefined}
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
                  <label htmlFor="pa-consent" className="text-[14px] font-light leading-relaxed text-foreground">
                    {copy.consentBefore}
                    <Link href="/politica-de-privacidad" target="_blank" className="underline underline-offset-2 hover:text-brand-accent-dark">
                      {copy.consentLink}
                    </Link>
                    {copy.consentAfter}
                  </label>
                </div>
                {errors.consent && (
                  <p id="pa-consent-error" className={errorClass}>
                    {errors.consent}
                  </p>
                )}
              </div>
            </div>

            <div aria-live="polite">
              {hasErrors && (
                <p role="alert" className="text-brand-accent-dark text-[16px] font-medium">
                  {copy.errorSummary}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-brand-accent-dark text-[16px] font-medium">
                  {copy.errorGeneric}
                </p>
              )}
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              {step === 2 && (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={pending}
                  className={`inline-flex items-center border border-foreground px-6 py-3 text-[16px] font-medium tracking-[0.04em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background disabled:opacity-50 ${focusRing}`}
                >
                  {copy.back}
                </button>
              )}
              {step === 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className={`group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background transition-colors duration-200 hover:bg-brand-accent-dark ${focusRing}`}
                >
                  <span className="text-[16px] font-medium tracking-[0.04em]">{copy.next}</span>
                  <ArrowIcon size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={pending}
                  className={`group inline-flex items-center gap-3 bg-brand-accent px-6 py-3 text-background transition-colors duration-200 hover:bg-brand-accent-dark disabled:opacity-60 ${focusRing}`}
                >
                  <span className="text-[16px] font-medium tracking-[0.04em]">{pending ? copy.submitting : copy.submit}</span>
                  {!pending && <ArrowIcon size={20} />}
                </button>
              )}
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
