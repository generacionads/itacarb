import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
