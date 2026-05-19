/**
 * /content layout — Content Review PWA.
 *
 * This sub-route is a Progressive Web App for reviewing pipeline drafts on
 * mobile or desktop. It is intentionally NOT integrated with the main site's
 * Header/Footer to keep the UI tight and app-like.
 *
 * Auth: a `?key=<CONTENT_REVIEW_KEY>` query param (read by both client and
 *       API). The PWA client persists the key into localStorage on first
 *       visit so subsequent loads (including "Add to Home Screen") work
 *       without the URL parameter.
 */
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "סקירת תכנים | אלעד יעקובוביץ׳",
  description:
    "סקור, אשר וערוך טיוטות תוכן בדרכים. PWA נייד עם תמיכה מלאה ב-RTL ועבודה אופליין.",
  manifest: "/content/manifest.webmanifest",
  // Critical: do NOT index this route — it is private.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a0f0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function ContentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      dir="rtl"
      className="min-h-dvh bg-[#0f0a08] text-[#f5e6d3] selection:bg-rose-900/40"
      style={{
        // Safe-area for iOS notch / Android status bar when installed as PWA
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {children}
      {/* Service-worker registration — non-blocking, never throws */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function () {
                navigator.serviceWorker.register('/content-sw.js', { scope: '/content' }).catch(function(){});
              });
            }
          `,
        }}
      />
    </div>
  );
}
