import { NextResponse } from "next/server";

// Lista "Newsletter genérica" en Brevo
const BREVO_LIST_ID = 26;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      console.error("Error Brevo:", res.status, await res.text());
      return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error newsletter:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
