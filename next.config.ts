// next.config.ts
import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  experimental: {
    // Clerk / middleware ke liye (safe)
    middlewareClientMaxBodySize: 1024 * 1024 * 1024, // 1GB
  },

  turbopack: {},

  webpack: (config: WebpackConfig) => {
    config.watchOptions = {
      ignored: [
        "**/smartflex-*",
        "**/temp",
        "**/tmp",
        "**/AppData/Local/Temp/**",
      ],
    };
    return config;
  },
};

export default nextConfig;
