"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { RevealH2 } from "@/components/ui/RevealH2";

type FormStatus = "idle" | "pending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(data)),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="contacto" className="py-24 bg-background">
        <Container>
          <p className="text-[48px] md:text-[64px] font-medium tracking-[-0.04em] text-foreground leading-tight">
            Gracias. Nos ponemos<br />en contacto contigo pronto.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-24 bg-background">
      <Container>
        <RevealH2
          className="text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
        >
          Todo viaje comienza con una conversación. Escríbenos.
        </RevealH2>

        <form className="mt-12 flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="border-b-2 border-brand-muted pb-8 px-1">
            <input
              type="text"
              name="nombre"
              autoComplete="name"
              placeholder="Nombre"
              required
              aria-label="Nombre"
              className="w-full bg-transparent text-[28px] md:text-[48px] font-medium tracking-[-0.04em] text-foreground placeholder:text-brand-muted outline-none"
            />
          </div>

          {/* Mail */}
          <div className="border-b-2 border-brand-muted pb-8 px-1">
            <input
              type="email"
              name="mail"
              autoComplete="email"
              placeholder="Mail"
              required
              aria-label="Correo electrónico"
              className="w-full bg-transparent text-[28px] md:text-[48px] font-medium tracking-[-0.04em] text-foreground placeholder:text-brand-muted outline-none"
            />
          </div>

          {/* Teléfono */}
          <div className="border-b-2 border-brand-muted pb-8 px-1">
            <input
              type="tel"
              name="telefono"
              autoComplete="tel"
              placeholder="Teléfono"
              aria-label="Teléfono"
              className="w-full bg-transparent text-[28px] md:text-[48px] font-medium tracking-[-0.04em] text-foreground placeholder:text-brand-muted outline-none"
            />
          </div>

          {/* Empresa */}
          <div className="border-b-2 border-brand-muted pb-8 px-1">
            <input
              type="text"
              name="empresa"
              autoComplete="organization"
              placeholder="Empresa"
              aria-label="Empresa"
              className="w-full bg-transparent text-[28px] md:text-[48px] font-medium tracking-[-0.04em] text-foreground placeholder:text-brand-muted outline-none"
            />
          </div>

          {/* Mensaje */}
          <div className="border-b-2 border-brand-muted pb-24 px-1">
            <textarea
              name="mensaje"
              placeholder="Escribe aquí tu mensaje"
              rows={3}
              required
              aria-label="Mensaje"
              className="w-full bg-transparent text-[18px] md:text-[24px] font-medium tracking-[-0.04em] text-foreground placeholder:text-brand-muted outline-none resize-none"
            />
          </div>

          {status === "error" && (
            <p role="alert" className="text-brand-accent text-[16px] font-medium px-3">
              Algo ha salido mal. Por favor, inténtalo de nuevo.
            </p>
          )}

          {/* Enviar */}
          <div className="flex items-center justify-end gap-6 pt-12 px-3 pb-3">
            <button
              type="submit"
              disabled={status === "pending"}
              className="flex items-center gap-6 text-foreground transition-colors hover:text-brand-accent-dark group disabled:opacity-50"
            >
              <span className="text-[48px] md:text-[64px] font-medium tracking-[-0.04em] leading-none">
                {status === "pending" ? "Enviando…" : "Enviar"}
              </span>
              {status !== "pending" && (
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}
