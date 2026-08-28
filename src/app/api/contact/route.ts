import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, mail, telefono, empresa, mensaje } = await req.json();

    if (!nombre || !mail || !mensaje) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Formulario Ítacarb <formulario@itacarb.es>",
      to: "hola@itacarb.es",
      cc: "mzornoza@itacarb.es",
      replyTo: mail,
      subject: `Nuevo contacto de ${nombre}`,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${mail}</p>
        ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ""}
        ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
