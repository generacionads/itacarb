import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a Ítacarb: una consultora estratégica de marketing donde el equipo, la experiencia real en cada sector y la implicación con el negocio del cliente marcan la diferencia.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
