"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");

  return (
    <div
      aria-label={t("label")}
      className={`flex items-center gap-2 text-base font-medium tracking-[0.04em] ${className}`}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="opacity-30">/</span>}
          <Link
            href={pathname}
            locale={loc}
            className={`transition-opacity hover:opacity-100 ${loc === locale ? "opacity-100" : "opacity-50"}`}
            aria-current={loc === locale ? "true" : undefined}
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
