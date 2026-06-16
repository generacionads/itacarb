"use client";

import { useState } from "react";

interface AccordionItemProps {
  label: string;
  children?: React.ReactNode;
}

export function AccordionItem({ label, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-border">
      <button
        className="flex w-full items-center justify-between py-4 px-1 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-[18px] font-light text-foreground">{label}</span>
        <span className="flex items-center justify-center p-3 shrink-0 text-brand-accent" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d={open ? "M5 12H19" : "M12 5V19M5 12H19"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-6 px-1">
          {children ?? (
            <p className="text-brand-muted text-[16px] font-light leading-relaxed">
              Contenido de {label}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
