import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.iconarchive.com",
      },
    ],
  },
};

export default nextConfig; 