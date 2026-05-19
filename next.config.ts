import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization with WebP/AVIF
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Host-based rewrites: route content.eladjak.com → /content sub-app.
  // Existing omanut-hakesher-website.vercel.app/content URL still works,
  // and content.eladjak.com/<slug> still resolves to /content/<slug>.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/content",
          has: [{ type: "host", value: "content.eladjak.com" }],
        },
        {
          source: "/:path((?!content|api|_next|favicon\\.ico|content-sw\\.js).*)",
          destination: "/content/:path",
          has: [{ type: "host", value: "content.eladjak.com" }],
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  // Caching headers for static assets and pages
  async headers() {
    return [
      {
        // Static assets - long cache
        source: "/:path*.(ico|jpg|jpeg|png|gif|svg|webp|avif|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Next.js static chunks
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // All pages - security headers + moderate cache
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
