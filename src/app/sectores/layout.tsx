import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sectores",
  description:
    "Conocemos tu sector. Ítacarb diseña estrategias de marketing especializadas para clínicas y salud, arquitectura y diseño, industria y otros sectores.",
};

export default function SectoresLayout({ children }: { children: React.ReactNode }) {
  return children;
}
