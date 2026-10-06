import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.themealdb.com", "themealdb.com"], // Autoriza ambos formatos de forma global
  },
};

export default nextConfig;
