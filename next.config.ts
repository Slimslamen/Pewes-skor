import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

// Static Next.js pages need inline bootstrap scripts. Block inline event
// handlers separately; eval is allowed only for the development toolchain.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://lh3.googleusercontent.com https://images.unsplash.com",
  "font-src 'self' data:",
  `connect-src 'self' https://*.sanity.io wss://*.sanity.io${isDevelopment ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
  "frame-src 'self' https://maps.google.com https://www.google.com https://*.sanity.io",
  "frame-ancestors 'self'",
  "worker-src 'self' blob:",
  "media-src 'self' blob: https://cdn.sanity.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://*.sanity.io",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(!isDevelopment
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
            : []),
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
