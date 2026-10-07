/**
 * Validación de la pre-auditoría. Se usa igual en cliente (feedback inmediato)
 * y en servidor (la que realmente cuenta). Sin imports de Node.
 */
import {
  INVERSION_OPTIONS,
  LANDING_COPY,
  LEADS_OPTIONS,
  TICKET_OPTIONS,
  VISITAS_OPTIONS,
  type Option,
} from "@/lib/pre-auditoria";

export const REQUIRED_FIELDS = ["url", "nombre", "email"] as const;
// Rangos del paso 1: obligatorios ("No lo sé" / "Prefiero no decirlo" son respuestas válidas).
export const RANGE_FIELDS = ["visitas", "leads", "inversion", "ticket"] as const;
export const TRACKING_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referrer",
  "page_url",
] as const;

export type RequiredField = (typeof REQUIRED_FIELDS)[number];
export type RangeField = (typeof RANGE_FIELDS)[number];
export type TrackingField = (typeof TRACKING_FIELDS)[number];
export type FieldName = RequiredField | RangeField | "telefono" | "consent";
export type FieldErrors = Partial<Record<FieldName, string>>;

export type LeadData = Record<RequiredField, string> &
  Record<RangeField, string> &
  Record<TrackingField, string> & { telefono: string };

export const OPTIONS_BY_FIELD: Record<RangeField, Option[]> = {
  visitas: VISITAS_OPTIONS,
  leads: LEADS_OPTIONS,
  inversion: INVERSION_OPTIONS,
  ticket: TICKET_OPTIONS,
};

const MAX_TEXT = 120;
const MAX_TRACKING = 300;

const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * Normaliza y valida una URL escrita a mano. Acepta "tuempresa.com",
 * "www.tuempresa.com" o con http(s)://. Devuelve la URL normalizada o null.
 */
export function normalizeUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw || raw.length > 300 || /\s/.test(raw)) return null;

  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (url.username || url.password) return null;

  const host = url.hostname.toLowerCase();
  // Dominio con punto y TLD alfabético; descarta localhost, IPs y "algo."
  if (!/^(?:[a-z0-9¡-￿](?:[a-z0-9¡-￿-]{0,61}[a-z0-9¡-￿])?\.)+[a-z¡-￿]{2,}$/.test(host)) {
    return null;
  }

  return url.toString();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(
  raw: Record<string, unknown>
): { ok: true; data: LeadData } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const e = LANDING_COPY.errors;

  const url = normalizeUrl(clean(raw.url, 300));
  if (!url) errors.url = e.url;

  const nombre = clean(raw.nombre, MAX_TEXT);
  if (nombre.length < 2) errors.nombre = e.nombre;

  const email = clean(raw.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) errors.email = e.email;

  const ranges = {} as Record<RangeField, string>;
  for (const field of RANGE_FIELDS) {
    const value = clean(raw[field], 40);
    if (!OPTIONS_BY_FIELD[field].some((o) => o.value === value)) errors[field] = e.option;
    ranges[field] = value;
  }

  // Teléfono opcional: si lo informan, 6-15 dígitos con prefijo + opcional.
  const telefono = clean(raw.telefono, 30);
  if (telefono && !/^\+?\d{6,15}$/.test(telefono.replace(/[\s.()-]/g, ""))) {
    errors.telefono = e.telefono;
  }

  if (raw.consent !== true && raw.consent !== "on" && raw.consent !== "true") {
    errors.consent = e.consent;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const tracking = {} as Record<TrackingField, string>;
  for (const field of TRACKING_FIELDS) tracking[field] = clean(raw[field], MAX_TRACKING);

  return {
    ok: true,
    data: { url: url!, nombre, email, telefono, ...ranges, ...tracking },
  };
}

export function optionLabel(field: RangeField, value: string): string {
  return OPTIONS_BY_FIELD[field].find((o) => o.value === value)?.label ?? "";
}
