// next.config.ts
import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // XSS Protection
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Referrer Policy
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HSTS - force HTTPS (1 year)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Permissions Policy - disable unnecessary browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    proxyClientMaxBodySize: 1024 * 1024 * 1024, // 1GB
  },

  turbopack: {},

  // ✅ Security Headers on all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

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
