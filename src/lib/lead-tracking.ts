/** Utilidades de tracking de formularios de captación (solo cliente). */
import { getStoredConsent } from "@/components/ui/CookieConsent";
import { TRACKING_FIELDS, type TrackingField } from "@/lib/pre-auditoria-validation";

export type Tracking = Record<TrackingField, string>;

/** UTM, referrer y URL de la página, leídos de la query string del navegador. */
export function readTracking(): Tracking {
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

/** `generate_lead` con los UTM. Solo si el usuario aceptó cookies en el banner; si no, no se emite nada. */
export function pushGenerateLead(tracking: Tracking, params: Record<string, string>) {
  if (getStoredConsent() !== "accepted") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "generate_lead",
    ...params,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_content: tracking.utm_content,
    utm_term: tracking.utm_term,
  });
}
