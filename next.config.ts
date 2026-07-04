import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "image-cdn-ak.spotifycdn.com",
      },
    ],
  },
  // Ensure Turbopack uses this folder as the workspace root
  turbopack: {
    // Use an absolute path so Turbopack stops warning about inferred roots
    root: process.cwd(),
  },
};

export default nextConfig;
