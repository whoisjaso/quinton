import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560, 3200, 3840],
  },
};

export default nextConfig;
