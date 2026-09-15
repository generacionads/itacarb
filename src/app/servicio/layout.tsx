import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicio",
  description:
    "Nuestra metodología: escuchamos y analizamos, definimos una hoja de ruta clara y la ejecutamos con datos reales, en un proceso que evoluciona con tu negocio.",
  alternates: { canonical: "/servicio" },
};

export default function ServicioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
