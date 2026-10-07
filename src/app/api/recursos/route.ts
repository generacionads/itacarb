import { readFile } from "node:fs/promises";
import path from "node:path";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  RECURSO_EMAIL_COPY,
  getRecurso,
  type Recurso,
} from "@/lib/recursos";
import { RECURSOS_PRIVATE_DIR, RECURSO_FILES } from "@/lib/recursos-files";
import { validateRecursoLead, type RecursoLead } from "@/lib/recursos-validation";

const NOTIFY_TO = process.env.PRE_AUDITORIA_NOTIFY_EMAIL || "hola@itacarb.es";
const NOTIFY_FROM = "Formulario Ítacarb <formulario@itacarb.es>";
const CONFIRM_FROM = "Ítacarb <hola@itacarb.es>";

// Anti-spam: con autocompletado un humano tarda más que esto desde que carga la página.
const MIN_FILL_MS = 2500;

// Límite por IP en memoria ("best effort" en serverless: cada instancia tiene su contador).
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

function internalHtml(d: RecursoLead, recurso: Recurso, receivedAt: string): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#36383a">
      <h2 style="margin:0 0 16px">Nueva descarga de recurso</h2>
      <table style="border-collapse:collapse">
        ${row("Recurso", recurso.name)}
        ${row("Email", d.email)}
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
      <p style="margin-top:24px;color:#6b6b7b">Consentimiento de privacidad aceptado el ${escapeHtml(receivedAt)}.</p>
    </div>`;
}

function confirmationHtml(recurso: Recurso): string {
  const c = RECURSO_EMAIL_COPY;
  return `
    <div style="background:#f9f8f6;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#36383a">
      <div style="max-width:560px;margin:0 auto">
        <h1 style="font-size:24px;font-weight:500;margin:0 0 16px">${escapeHtml(c.heading(recurso.name))}</h1>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px">${escapeHtml(c.body)}</p>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px">${escapeHtml(c.reply)}</p>
        <p style="font-size:16px;margin:0">${escapeHtml(c.signature)}</p>
      </div>
    </div>`;
}

async function sendEmails(
  d: RecursoLead,
  recurso: Recurso,
  pdf: { filename: string; content: string },
  receivedAt: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const c = RECURSO_EMAIL_COPY;

  const [internal, confirmation] = await Promise.all([
    resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      replyTo: d.email,
      subject: `[Recurso] ${recurso.name} — ${d.email}`,
      html: internalHtml(d, recurso, receivedAt),
    }),
    resend.emails.send({
      from: CONFIRM_FROM,
      to: d.email,
      replyTo: "hola@itacarb.es",
      subject: c.subject(recurso.name),
      html: confirmationHtml(recurso),
      text: [c.body, c.reply, c.signature].join("\n\n"),
      attachments: [pdf],
    }),
  ]);

  if (internal.error) console.error("[recursos] email interno:", internal.error);
  if (confirmation.error) console.error("[recursos] email al lead:", confirmation.error);

  return { internalOk: !internal.error, confirmationOk: !confirmation.error };
}

async function saveToBrevo(d: RecursoLead, recurso: Recurso): Promise<boolean> {
  const listId = Number(process.env.BREVO_LEADMAGNETS_LIST_ID);
  if (!process.env.BREVO_API_KEY || !Number.isInteger(listId) || listId <= 0) {
    console.warn("[recursos] Brevo no configurado (BREVO_API_KEY / BREVO_LEADMAGNETS_LIST_ID).");
    return false;
  }

  const origen = [d.utm_source, d.utm_medium, d.utm_campaign].filter(Boolean).join(" / ");
  // Atributos propios: hay que crearlos antes en Brevo (ver .env.example).
  const attributes = { LM_RECURSO: recurso.name, LM_ORIGEN: origen };

  async function post(attrs: Record<string, string>) {
    return fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY! },
      body: JSON.stringify({ email: d.email, attributes: attrs, listIds: [listId], updateEnabled: true }),
    });
  }

  let res = await post(attributes);
  if (res.status === 400) {
    // Casi seguro: algún atributo LM_* todavía no existe en Brevo. Guardamos al menos el contacto.
    console.warn("[recursos] Brevo rechazó los atributos, reintento sin ellos:", await res.text());
    res = await post({});
  }
  if (!res.ok) {
    console.error("[recursos] Brevo:", res.status, await res.text());
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

  const slug = typeof body.slug === "string" ? body.slug : "";
  const recurso = getRecurso(slug);
  const fileInfo = RECURSO_FILES[slug];
  if (!recurso || !fileInfo) {
    return NextResponse.json({ error: "Recurso no encontrado" }, { status: 404 });
  }

  const result = validateRecursoLead(body);
  if (!result.ok) {
    return NextResponse.json({ error: "validation", fields: result.errors }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Demasiados intentos" }, { status: 429 });
  }

  // Se lee antes de enviar nada: sin PDF no hay recurso que entregar.
  let pdf: { filename: string; content: string };
  try {
    pdf = {
      filename: fileInfo.attachmentName,
      // base64: así el SDK de Resend lo envía tal cual (un Buffer se serializaría como objeto JSON).
      content: (await readFile(path.join(RECURSOS_PRIVATE_DIR, fileInfo.file))).toString("base64"),
    };
  } catch (err) {
    console.error("[recursos] No se pudo leer el PDF:", fileInfo.file, err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }

  const receivedAt = new Date().toISOString();
  const [emails, brevoOk] = await Promise.all([
    sendEmails(result.data, recurso, pdf, receivedAt).catch((err) => {
      console.error("[recursos] Resend:", err);
      return { internalOk: false, confirmationOk: false };
    }),
    saveToBrevo(result.data, recurso).catch((err) => {
      console.error("[recursos] Brevo:", err);
      return false;
    }),
  ]);

  // Si el lead no recibe el recurso, no hay éxito: se le pide que lo reintente.
  if (!emails.confirmationOk) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
  // El email llegó al lead; si ni el aviso interno ni Brevo guardaron el contacto, queda en el log.
  if (!emails.internalOk && !brevoOk) {
    console.error("[recursos] Lead entregado pero sin registrar:", result.data.email, recurso.slug);
  }

  return NextResponse.json({ ok: true, recorded: true });
}
