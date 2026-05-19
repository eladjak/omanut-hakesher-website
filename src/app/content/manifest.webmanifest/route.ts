/**
 * Web App Manifest for the /content PWA.
 *
 * Served at /content/manifest.webmanifest. Allows mobile devices to "Add
 * to Home Screen" with a proper standalone display, RTL Hebrew name,
 * and rose-pink theme color matching the app shell.
 *
 * Note: when accessed via the dedicated `content.eladjak.com` host, the
 * host-based rewrite in next.config.ts maps root → /content, so the
 * manifest's start_url and scope below behave correctly both on the
 * apex subdomain and on the legacy `omanut-hakesher-website.vercel.app/content`
 * path. Browsers resolve start_url/scope relative to the manifest URL.
 */
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      name: "סקירת תכנים",
      short_name: "תכנים",
      description: "סקור, אשר, וערוך טיוטות תוכן בדרכים",
      start_url: ".",
      scope: ".",
      display: "standalone",
      orientation: "portrait",
      background_color: "#0f0a08",
      theme_color: "#1a0f0a",
      lang: "he",
      dir: "rtl",
      categories: ["productivity", "business"],
      icons: [
        // Re-use favicon as a 192/512 placeholder. A purpose-made
        // monochrome icon can be added later.
        { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      ],
    },
    {
      headers: {
        "Content-Type": "application/manifest+json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
