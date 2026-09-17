import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultoría Estratégica de Marketing Digital | Ítaca RB",
  description:
    "Consultoría de marketing digital que convierte tu estrategia en resultados reales. Diagnóstico, plan y ejecución a medida de tu negocio. Escríbenos.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
