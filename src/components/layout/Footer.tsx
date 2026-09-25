"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

const socialLinks = [
  { label: "Youtube", href: "https://www.youtube.com/@itacarb" },
  { label: "LinkedIn", href: "https://es.linkedin.com/company/itacarb" },
  { label: "Instagram", href: "https://www.instagram.com/itaca.rb/" },
];

function FooterNewsletterForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const t = useTranslations("footer");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("pending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        window.dataLayer?.push({ event: "newsletter_subscribe", newsletter_type: "general" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-foreground text-[16px] font-medium tracking-[0.04em]">
        {t("newsletterSuccess")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-[320px] w-full">
      <div className="flex items-end gap-0 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          required
          className="flex-1 bg-transparent border-b border-foreground/40 text-foreground placeholder:text-foreground/50 text-[16px] font-medium tracking-[0.04em] pb-2 outline-none focus:border-foreground transition-colors duration-200 disabled:opacity-50"
          disabled={status === "pending"}
        />
        <button
          type="submit"
          aria-label={t("subscribeAria")}
          disabled={status === "pending"}
          className="group bg-foreground text-background p-3 shrink-0 hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="btn-morph-svg">
            <path d="M12 5 L12 12 L12 19" className="morph-stroke" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 12 L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-background text-[14px] font-medium">
          {t("newsletterError")}
        </p>
      )}
    </form>
  );
}

export function Footer() {
  const t = useTranslations("footer");

  const legalLinks = [
    { label: t("legal.avisoLegal"), href: "/aviso-legal" as const },
    { label: t("legal.privacidad"), href: "/politica-de-privacidad" as const },
    { label: t("legal.cookies"), href: "/politica-de-cookies" as const },
  ];

  return (
    <footer className="bg-brand-accent pt-40 pb-10 min-h-screen flex flex-col">
      <Container className="flex flex-col flex-1">

        {/* Main content: newsletter izq · contacto + dirección dcha */}
        <div className="flex flex-col md:flex-row md:justify-between gap-16 md:gap-0">

          {/* Izquierda: newsletter */}
          <div className="flex flex-col gap-6 md:max-w-[480px]">
            <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-none">
              {t("newsletterHeading")}
            </p>
            <FooterNewsletterForm />
          </div>

          {/* Derecha: consultas + dirección */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-none">
                {t("generalInquiries")}
              </p>
              <a
                href="mailto:hola@itacarb.es"
                className="text-background text-[16px] font-medium tracking-[0.04em] hover:opacity-70 transition-opacity"
              >
                hola@itacarb.es
              </a>
              <a
                href="tel:+34611681539"
                className="text-background text-[16px] font-medium tracking-[0.04em] hover:opacity-70 transition-opacity"
              >
                +34 611 68 15 39
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-none">
                {t("whereWeAre")}
              </p>
              <address className="text-background text-[16px] font-medium tracking-[0.04em] not-italic leading-relaxed">
                Calle la diligencia, 9<br />
                oficina 7 28809
              </address>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom bar: legales izq · redes dcha */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0 mt-16 md:mt-0">
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-foreground text-[14px] font-medium tracking-[0.035em]">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-70 transition-opacity whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-3 sm:gap-8">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background text-[16px] font-medium tracking-[0.04em] px-6 py-3 hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

      </Container>
    </footer>
  );
}
