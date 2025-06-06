import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "craftscene.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "craftscenev2.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  }
  };

export default nextConfig;
