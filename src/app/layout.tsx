import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ítacarb — Consultoría Estratégica de Marketing",
    template: "%s | Ítacarb",
  },
  description:
    "Consultoría estratégica de marketing. Ayudamos a las marcas a crecer con estrategia, creatividad y datos.",
  metadataBase: new URL("https://itacarb.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
