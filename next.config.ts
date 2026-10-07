import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // PDF de los recursos (fuera de /public): se leen con fs en /api/recursos y hay que incluirlos en el despliegue.
  outputFileTracingIncludes: {
    "/api/recursos": ["./private/recursos/**/*"],
  },
  async redirects() {
    return [
      {
        source: "/servicio",
        destination: "/servicio/consultoria",
        permanent: true,
      },
      {
        source: "/en/service",
        destination: "/en/service/consulting",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Strapi local dev
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      // Strapi Cloud (production)
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
      },
      // WordPress local dev
      {
        protocol: "http",
        hostname: "cmsitacarb.local",
      },
      // WordPress (production)
      {
        protocol: "https",
        hostname: "cms.itacarb.es",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
