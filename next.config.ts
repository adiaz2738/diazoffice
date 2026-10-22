import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Needed because the English and Spanish sections have separate root layouts.
    globalNotFound: true,
  },
};

export default nextConfig;
