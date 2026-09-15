import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Ítacarb",
    default: "Proyectos",
  },
  description:
    "Descubre los casos de éxito de Ítacarb: estrategias de marketing que han impulsado la captación, la facturación y el crecimiento de nuestros clientes.",
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
