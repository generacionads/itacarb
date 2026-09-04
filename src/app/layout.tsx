import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Ítacarb — Consultoría Estratégica de Marketing",
    template: "%s | Ítacarb",
  },
  description:
    "Consultoría estratégica de marketing. Ayudamos a las marcas a crecer con estrategia, creatividad y datos.",
  metadataBase: new URL("https://itacarb.es"),
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
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QTF3F8J24T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QTF3F8J24T');
          `}
        </Script>
      </body>
    </html>
  );
}
