import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }
    await resend.emails.send({
      from: "Formulario Ítacarb <formulario@itacarb.es>",
      to: "hola@itacarb.es",
      subject: "Nueva suscripción a la newsletter",
      html: `<p>Nuevo suscriptor a la newsletter: <strong>${email}</strong></p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error newsletter:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
