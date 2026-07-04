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

  // Legacy Wix URL redirects — the old ohlove.co.il (Wix) URL structure,
  // mapped so links/SEO survive the DNS cutover to this site.
  // Source: www.ohlove.co.il/pages-sitemap.xml + blog-posts-sitemap.xml
  // (scanned 2026-07-05). Inert until DNS points here — safe to ship early.
  // See docs/DNS-CUTOVER-RUNBOOK.md.
  async redirects() {
    return [
      { source: "/amlatsot", destination: "/testimonials", permanent: true },
      // NOTE: /services and /blog exist on the new site with the same paths — no redirect needed.
      { source: "/workshops", destination: "/services", permanent: true },
      { source: "/support", destination: "/contact", permanent: true },
      { source: "/members", destination: "/community", permanent: true },
      { source: "/women", destination: "/", permanent: true },
      { source: "/men", destination: "/", permanent: true },
      { source: "/m", destination: "/", permanent: true },
      { source: "/blank", destination: "/", permanent: true },
      { source: "/blank-:rest", destination: "/", permanent: true },
      // Old Wix blog posts (2015-2018): /post/YYYY/MM/DD/<slug> → blog index.
      // Individual mapping isn't possible (old posts don't exist on the new
      // site) — the blog index is the honest landing.
      { source: "/post/:year/:month/:day/:slug", destination: "/blog", permanent: true },
      { source: "/post/:slug*", destination: "/blog", permanent: true },
    ];
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
