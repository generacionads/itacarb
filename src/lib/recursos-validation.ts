/** Validación del formulario de descarga de recursos (cliente y servidor). */
import { RECURSO_FORM_COPY } from "@/lib/recursos";
import {
  EMAIL_RE,
  TRACKING_FIELDS,
  clean,
  type TrackingField,
} from "@/lib/pre-auditoria-validation";

export type RecursoFieldName = "email" | "consent";
export type RecursoErrors = Partial<Record<RecursoFieldName, string>>;
export type RecursoLead = { email: string } & Record<TrackingField, string>;

export function validateRecursoLead(
  raw: Record<string, unknown>
): { ok: true; data: RecursoLead } | { ok: false; errors: RecursoErrors } {
  const errors: RecursoErrors = {};
  const e = RECURSO_FORM_COPY.errors;

  const email = clean(raw.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) errors.email = e.email;

  if (raw.consent !== true && raw.consent !== "on" && raw.consent !== "true") {
    errors.consent = e.consent;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const tracking = {} as Record<TrackingField, string>;
  for (const field of TRACKING_FIELDS) tracking[field] = clean(raw[field], 300);
  return { ok: true, data: { email, ...tracking } };
}
