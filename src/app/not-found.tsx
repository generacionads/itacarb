import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body>
        <div style={{ padding: "4rem 1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <p>404 — Página no encontrada.</p>
          <Link href="/">Volver al inicio</Link>
        </div>
      </body>
    </html>
  );
}
