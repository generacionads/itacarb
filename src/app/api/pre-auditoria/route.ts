import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  EMAIL_COPY,
  SUBMITTED_COOKIE,
  SUBMITTED_COOKIE_MAX_AGE,
} from "@/lib/pre-auditoria";
import {
  RANGE_FIELDS,
  optionLabel,
  validateLead,
  type LeadData,
} from "@/lib/pre-auditoria-validation";

const NOTIFY_TO = process.env.PRE_AUDITORIA_NOTIFY_EMAIL || "hola@itacarb.es";
const NOTIFY_FROM = "Formulario Ítacarb <formulario@itacarb.es>";
const CONFIRM_FROM = "Ítacarb <hola@itacarb.es>";

// Anti-spam: un humano tarda más que esto en rellenar 5 campos.
const MIN_FILL_MS = 3000;

// Límite por IP en memoria. En serverless es "best effort" (cada instancia
// tiene su propio contador), pero frena ráfagas sencillas.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr><td style="padding:4px 16px 4px 0;color:#6b6b7b;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;
}

function internalHtml(d: LeadData, receivedAt: string): string {
  const ranges = RANGE_FIELDS.map((f) => [f, optionLabel(f, d[f])] as const);
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#36383a">
      <h2 style="margin:0 0 16px">Nueva solicitud de pre-auditoría</h2>
      <table style="border-collapse:collapse">
        ${row("URL", d.url)}
        ${row("Nombre", d.nombre)}
        ${row("Email", d.email)}
        ${row("Teléfono", d.telefono)}
      </table>
      <h3 style="margin:24px 0 8px">Datos para el cálculo de conversión y coste por lead</h3>
      <table style="border-collapse:collapse">
        ${row("Visitas mensuales", ranges[0][1])}
        ${row("Leads al mes", ranges[1][1])}
        ${row("Inversión mensual en marketing", ranges[2][1])}
        ${row("Ticket medio", ranges[3][1])}
      </table>
      <h3 style="margin:24px 0 8px">Origen</h3>
      <table style="border-collapse:collapse">
        ${row("utm_source", d.utm_source)}
        ${row("utm_medium", d.utm_medium)}
        ${row("utm_campaign", d.utm_campaign)}
        ${row("utm_content", d.utm_content)}
        ${row("utm_term", d.utm_term)}
        ${row("Referrer", d.referrer)}
        ${row("Página", d.page_url)}
      </table>
      <p style="margin-top:24px;color:#6b6b7b">Consentimiento de privacidad aceptado el ${escapeHtml(receivedAt)}. Plazo de entrega: 48 horas laborables.</p>
    </div>`;
}

function confirmationHtml(d: LeadData): string {
  return `
    <div style="background:#f9f8f6;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#36383a">
      <div style="max-width:560px;margin:0 auto">
        <h1 style="font-size:24px;font-weight:500;margin:0 0 16px">${escapeHtml(EMAIL_COPY.confirmationHeading)}</h1>
        <p style="font-size:16px;line-height:1.6;margin:0 0 16px">${escapeHtml(EMAIL_COPY.confirmationBody(d.nombre, d.url))}</p>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px">${escapeHtml(EMAIL_COPY.confirmationReply)}</p>
        <p style="font-size:16px;margin:0">${escapeHtml(EMAIL_COPY.signature)}</p>
      </div>
    </div>`;
}

function confirmationText(d: LeadData): string {
  return [
    EMAIL_COPY.confirmationBody(d.nombre, d.url),
    EMAIL_COPY.confirmationReply,
    EMAIL_COPY.signature,
  ].join("\n\n");
}

async function sendEmails(d: LeadData, receivedAt: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const host = (() => {
    try {
      return new URL(d.url).hostname;
    } catch {
      return d.url;
    }
  })();

  const [internal, confirmation] = await Promise.all([
    resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      replyTo: d.email,
      subject: `[Pre-auditoría] ${d.nombre} — ${host}`,
      html: internalHtml(d, receivedAt),
    }),
    resend.emails.send({
      from: CONFIRM_FROM,
      to: d.email,
      replyTo: "hola@itacarb.es",
      subject: EMAIL_COPY.confirmationSubject,
      html: confirmationHtml(d),
      text: confirmationText(d),
    }),
  ]);

  if (internal.error) console.error("[pre-auditoria] email interno:", internal.error);
  if (confirmation.error) console.error("[pre-auditoria] email confirmación:", confirmation.error);

  return { internalOk: !internal.error, confirmationOk: !confirmation.error };
}

async function saveToBrevo(d: LeadData): Promise<boolean> {
  const listId = Number(process.env.BREVO_LEADMAGNETS_LIST_ID);
  if (!process.env.BREVO_API_KEY || !Number.isInteger(listId) || listId <= 0) {
    console.warn("[pre-auditoria] Brevo no configurado (BREVO_API_KEY / BREVO_LEADMAGNETS_LIST_ID).");
    return false;
  }

  const origen = [d.utm_source, d.utm_medium, d.utm_campaign].filter(Boolean).join(" / ");
  const core = {
    NOMBRE: d.nombre,
    WEBSITE: d.url,
  };
  // Atributos propios: hay que crearlos antes en Brevo (ver .env.example).
  const extra = {
    PA_VISITAS: optionLabel("visitas", d.visitas),
    PA_LEADS: optionLabel("leads", d.leads),
    PA_INVERSION: optionLabel("inversion", d.inversion),
    PA_TICKET: optionLabel("ticket", d.ticket),
    PA_TELEFONO: d.telefono,
    PA_ORIGEN: origen,
  };

  async function post(attributes: Record<string, string>) {
    return fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY! },
      body: JSON.stringify({ email: d.email, attributes, listIds: [listId], updateEnabled: true }),
    });
  }

  let res = await post({ ...core, ...extra });
  if (res.status === 400) {
    // Casi seguro: algún atributo PA_* todavía no existe en Brevo. Guardamos al
    // menos el contacto con los atributos estándar.
    console.warn("[pre-auditoria] Brevo rechazó los atributos, reintento con los básicos:", await res.text());
    res = await post(core);
  }
  if (!res.ok) {
    console.error("[pre-auditoria] Brevo:", res.status, await res.text());
    return false;
  }
  return true;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });
  }

  // Bots: honeypot relleno o envío demasiado rápido → falso éxito, sin enviar nada.
  const fillMs = Number(body.fill_ms);
  if (body.contacto_web || !Number.isFinite(fillMs) || fillMs < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ error: "validation", fields: result.errors }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Demasiados intentos" }, { status: 429 });
  }

  const receivedAt = new Date().toISOString();
  const [emails, brevoOk] = await Promise.all([
    sendEmails(result.data, receivedAt).catch((err) => {
      console.error("[pre-auditoria] Resend:", err);
      return { internalOk: false, confirmationOk: false };
    }),
    saveToBrevo(result.data).catch((err) => {
      console.error("[pre-auditoria] Brevo:", err);
      return false;
    }),
  ]);

  // El lead cuenta como recibido si nos ha llegado por al menos un canal.
  if (!emails.internalOk && !brevoOk) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true, recorded: true });
  response.cookies.set(SUBMITTED_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SUBMITTED_COOKIE_MAX_AGE,
  });
  return response;
}
