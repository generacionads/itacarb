import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPC de Marca Blanca para Agencias | Ítacarb",
  description:
    "Planificamos, lanzamos y optimizamos Google, Meta, TikTok y LinkedIn Ads para los clientes de tu agencia — bajo tu marca, sin contratar un media buyer.",
  alternates: { canonical: "/servicio/ppc" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
