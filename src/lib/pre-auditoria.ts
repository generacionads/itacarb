/**
 * Pre-auditoría digital (lead magnet) — copy y configuración.
 *
 * Todo el texto de /pre-auditoria y /gracias-pre-auditoria vive aquí para que
 * sea fácil de revisar y editar sin tocar componentes. Solo español (la
 * landing no tiene versión en inglés).
 */

/** Identificadores propios de este formulario (distintos de contacto y PPC) para medirlo por separado. */
export const FORM_NAME = "pre_auditoria";
export const FORM_ID = "pre-auditoria-form";

/** Ruta (sin idioma) de cada página. Deben existir en src/i18n/routing.ts. */
export const LANDING_PATH = "/pre-auditoria" as const;
export const THANKS_PATH = "/gracias-pre-auditoria" as const;

/** Cookie técnica que el endpoint fija al guardar bien el envío (1 h). */
export const SUBMITTED_COOKIE = "pa_submitted";
export const SUBMITTED_COOKIE_MAX_AGE = 60 * 60;

/** URL para reservar llamada. Vacía = el hueco no se muestra en la página de gracias. */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

export const PLAZO = "48 horas laborables";

/** Etiqueta accesible del logo (enlace a la home) en las páginas de este lead magnet. */
export const LOGO_ARIA = "Ítacarb, ir a la página de inicio";

export type Option = { value: string; label: string };

// ─── Desplegables del bloque opcional ──────────────────────────────────────
// `value` es lo que se envía y se guarda; `label` lo que ve el usuario.

export const VISITAS_OPTIONS: Option[] = [
  { value: "lt-1000", label: "Menos de 1.000" },
  { value: "1000-5000", label: "Entre 1.000 y 5.000" },
  { value: "5000-20000", label: "Entre 5.000 y 20.000" },
  { value: "20000-50000", label: "Entre 20.000 y 50.000" },
  { value: "gt-50000", label: "Más de 50.000" },
  { value: "no-lo-se", label: "No lo sé" },
];

export const LEADS_OPTIONS: Option[] = [
  { value: "0-10", label: "Entre 0 y 10" },
  { value: "11-30", label: "Entre 11 y 30" },
  { value: "31-100", label: "Entre 31 y 100" },
  { value: "101-300", label: "Entre 101 y 300" },
  { value: "gt-300", label: "Más de 300" },
  { value: "no-lo-se", label: "No lo sé" },
];

export const INVERSION_OPTIONS: Option[] = [
  { value: "0", label: "No invierto en marketing" },
  { value: "lt-500", label: "Menos de 500 €" },
  { value: "500-2000", label: "Entre 500 y 2.000 €" },
  { value: "2000-5000", label: "Entre 2.000 y 5.000 €" },
  { value: "5000-15000", label: "Entre 5.000 y 15.000 €" },
  { value: "gt-15000", label: "Más de 15.000 €" },
  { value: "prefiero-no-decirlo", label: "Prefiero no decirlo" },
];

export const TICKET_OPTIONS: Option[] = [
  { value: "lt-100", label: "Menos de 100 €" },
  { value: "100-500", label: "Entre 100 y 500 €" },
  { value: "500-2000", label: "Entre 500 y 2.000 €" },
  { value: "2000-10000", label: "Entre 2.000 y 10.000 €" },
  { value: "gt-10000", label: "Más de 10.000 €" },
  { value: "prefiero-no-decirlo", label: "Prefiero no decirlo" },
];

// ─── Landing /pre-auditoria ────────────────────────────────────────────────

export const LANDING_COPY = {
  metaTitle: "Pre-auditoría digital gratuita de tu web",
  metaDescription:
    "Una persona de nuestro equipo revisa tu web y te envía un mini informe en PDF con lo que frena tus resultados. Gratis, en un máximo de 48 horas laborables.",

  heading: "¿Tu empresa invierte en marketing pero no consigue los clientes que debería?",
  subtitle: `Una persona de nuestro equipo analiza el marketing digital de tu empresa, empezando por tu web, y te envía por email, en un máximo de ${PLAZO}, un mini informe en PDF con lo que está frenando tus resultados. Gratis y sin compromiso.`,

  image: {
    /** Ruta de la imagen en /public (p. ej. "/pre-auditoria.jpg"). Vacía = se muestra el placeholder. */
    src: "",
    alt: "",
    width: 660,
    height: 660,
  },

  cta: "Solicitar pre-auditoría",

  // Formulario en dos pasos dentro de un modal.
  form: {
    title: "Solicita tu pre-auditoría gratuita",
    close: "Cerrar",
    stepLabel: (n: number, total: number) => `Paso ${n} de ${total}`,

    step1Title: "Cuéntanos sobre tu empresa",
    step1Intro:
      "Con estos datos calculamos tu tasa de conversión y tu coste por lead. Son rangos aproximados: no hace falta que sean exactos.",
    url: { label: "URL de tu web" },
    visitas: "Visitas mensuales a la web",
    leads: "Leads o contactos al mes",
    inversion: "Inversión mensual en marketing",
    ticket: "Ticket medio aproximado",

    step2Title: "¿A quién enviamos el informe?",
    step2Intro: "Lo recibirás por email en un máximo de " + PLAZO + ".",
    nombre: { label: "Nombre" },
    email: { label: "Email" },
    telefono: { label: "Teléfono (opcional)" },

    consentBefore: "He leído y acepto la ",
    consentLink: "política de privacidad",
    consentAfter:
      ". Autorizo a Ítacarb a tratar mis datos para preparar y enviarme la pre-auditoría.",

    next: "Continuar",
    back: "Atrás",
    submit: "Solicitar pre-auditoría",
    submitting: "Enviando…",

    errorSummary: "Revisa los campos marcados antes de continuar.",
    errorGeneric:
      "No hemos podido enviar tu solicitud. Inténtalo de nuevo en unos minutos o escríbenos a hola@itacarb.es.",
  },

  errors: {
    url: "Introduce una URL válida, por ejemplo www.tuempresa.com.",
    nombre: "Indica tu nombre.",
    email: "Introduce un email válido.",
    consent: "Debes aceptar la política de privacidad para continuar.",
    option: "Selecciona una opción de la lista.",
    telefono: "Introduce un teléfono válido o déjalo en blanco.",
  },

  footer: {
    privacy: "Política de privacidad",
    legal: "Aviso legal",
    cookies: "Cookies",
  },
} as const;

// ─── Página de gracias /gracias-pre-auditoria ──────────────────────────────

export const THANKS_COPY = {
  metaTitle: "Solicitud recibida",
  metaDescription: "Hemos recibido tu solicitud de pre-auditoría.",

  heading: "Solicitud recibida",
  deadline: `Recibirás tu pre-auditoría en un máximo de ${PLAZO}`,
  body: "Te hemos enviado un email de confirmación. Si no lo ves en tu bandeja de entrada, revisa la carpeta de spam. Una persona de nuestro equipo revisará tu web y te enviará el informe en PDF a ese mismo correo.",

  booking: {
    heading: "¿Prefieres comentarlo ya?",
    body: "Si quieres, reserva una llamada y revisamos tu caso juntos.",
    cta: "Reservar una llamada",
  },

  backHome: "Volver a la web",
} as const;

// ─── Emails ────────────────────────────────────────────────────────────────

export const EMAIL_COPY = {
  confirmationSubject: "Hemos recibido tu solicitud de pre-auditoría",
  confirmationHeading: "Solicitud recibida",
  confirmationBody: (nombre: string, url: string) =>
    `Hola ${nombre}, hemos recibido tu solicitud de pre-auditoría para ${url}. ` +
    `Una persona de nuestro equipo revisará tu web y te enviará el informe en PDF a este correo en un máximo de ${PLAZO}.`,
  confirmationReply:
    "Si quieres añadir algo o tienes alguna duda, responde directamente a este email.",
  signature: "El equipo de Ítacarb",
} as const;
