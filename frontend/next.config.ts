import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["c786-103-47-74-66.ngrok-free.app"],
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
