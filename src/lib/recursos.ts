/**
 * Recursos descargables (/recursos) — copy y configuración.
 *
 * Para añadir un recurso: nueva entrada en RECURSOS + su enlace de descarga en
 * src/lib/recursos-downloads.ts (el enlace NO está aquí a propósito: este
 * archivo llega al navegador y el enlace solo debe verse tras dejar el email).
 * Solo español (como el blog, ambos idiomas comparten ruta).
 */

export const RECURSOS_PATH = "/recursos" as const;

/** Identificadores propios del formulario de descarga, para medirlo por separado. */
export const RECURSO_FORM_NAME = "recurso_descarga";
export const RECURSO_FORM_ID = "recurso-form";

export type Recurso = {
  slug: string;
  /** Nombre corto: tarjeta del listado y emails. */
  name: string;
  /** Título de la entrada (h1). */
  heading: string;
  subtitle: string;
  /** Texto de la tarjeta en /recursos. */
  cardDescription: string;
  metaTitle: string;
  metaDescription: string;
  /** Texto del botón de la entrada. */
  cta: string;
  image: {
    /** Ruta en /public (p. ej. "/recursos/checklist.webp"). Vacía = placeholder gris. */
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const RECURSOS: Recurso[] = [
  {
    slug: "checklist-web-industrial-b2b",
    name: "Checklist Web Industrial B2B",
    heading: "¿Tu web industrial genera oportunidades de negocio o solo es un mal catálogo online?",
    subtitle:
      "30 puntos para auditar tu web B2B antes de invertir un euro más en marketing. Déjanos tu email y te enviamos el checklist.",
    cardDescription:
      "30 puntos para comprobar si tu web industrial B2B está pensada para generar oportunidades de negocio.",
    metaTitle: "Checklist Web Industrial B2B: 30 puntos para auditar tu web",
    metaDescription:
      "Descarga gratis el checklist de 30 puntos para auditar tu web industrial B2B antes de invertir más en marketing.",
    cta: "Descargar checklist",
    image: { src: "", alt: "", width: 660, height: 660 },
  },
];

export function getRecurso(slug: string): Recurso | undefined {
  return RECURSOS.find((r) => r.slug === slug);
}

// ─── Página /recursos ──────────────────────────────────────────────────────

export const RECURSOS_COPY = {
  metaTitle: "Recursos",
  metaDescription:
    "Checklists, plantillas y guías de Ítacarb para mejorar el marketing de tu empresa. Gratis y directamente en tu email.",
  heading: "Recursos",
  subtitle:
    "Checklists, plantillas y guías de nuestro equipo para mejorar el marketing de tu empresa. Gratis y directamente en tu email.",
  cardCta: "Descargar",
} as const;

// ─── Formulario de descarga ────────────────────────────────────────────────

export const RECURSO_FORM_COPY = {
  emailLabel: "Tu email",
  consentBefore: "He leído y acepto la ",
  consentLink: "política de privacidad",
  consentAfter: ". Autorizo a Ítacarb a tratar mi email para enviarme este recurso.",
  submitting: "Enviando…",

  errors: {
    email: "Introduce un email válido.",
    consent: "Debes aceptar la política de privacidad para continuar.",
  },
  errorGeneric:
    "No hemos podido enviar tu solicitud. Inténtalo de nuevo en unos minutos o escríbenos a hola@itacarb.es.",

  // El recurso se entrega solo por email: la web no muestra ningún enlace de descarga.
  success: {
    heading: "¡Listo!",
    body: "Te hemos enviado el recurso a tu email. Si no lo ves en unos minutos, revisa la carpeta de spam.",
  },
} as const;

// ─── Emails ────────────────────────────────────────────────────────────────

export const RECURSO_EMAIL_COPY = {
  subject: (name: string) => `Tu descarga: ${name}`,
  heading: (name: string) => name,
  body: "Gracias por tu interés. Aquí tienes tu recurso:",
  button: "Descargar",
  reply: "Si tienes cualquier duda, responde directamente a este email.",
  signature: "El equipo de Ítacarb",
} as const;
