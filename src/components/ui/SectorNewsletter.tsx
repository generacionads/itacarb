"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  description: string;
  listId: number;
}

export function SectorNewsletter({ description, listId }: Props) {
  const t = useTranslations("sectorDetailPage.newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, listId }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-foreground px-4 sm:px-16 py-20 flex flex-col gap-8">
      <div className="flex flex-col gap-4 max-w-[560px]">
        <h2 className="text-background text-[32px] md:text-[40px] font-medium tracking-[-0.04em] leading-tight">
          {t("heading")}
        </h2>
        <p className="text-background/70 text-[16px] font-light leading-relaxed">
          {description}
        </p>
      </div>

      {status === "ok" ? (
        <p className="text-brand-accent text-[16px] font-light">{t("success")}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[480px]">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent border border-background/30 text-background placeholder:text-background/40 px-4 py-3 text-[15px] outline-none focus:border-brand-accent transition-colors duration-200"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-brand-accent text-background px-6 py-3 text-[15px] font-medium tracking-[0.04em] hover:bg-brand-accent/90 transition-colors duration-200 disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "…" : t("cta")}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-[14px] font-light">{t("error")}</p>
      )}
    </section>
  );
}
