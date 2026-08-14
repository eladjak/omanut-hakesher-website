import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BOOK_MARKETING_PATHS = new Set(["/book", "/book/"]);

function unavailableResponse(): NextResponse {
  const body = `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow,noarchive">
    <title>אימות הגישה אינו זמין | אומנות הקשר</title>
    <style>
      :root { color-scheme: light; font-family: Arial, sans-serif; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f7f5f2; color: #222; }
      main { width: min(36rem, calc(100% - 2rem)); box-sizing: border-box; padding: 2rem; border: 1px solid #ded8d1; border-radius: 1rem; background: #fff; box-shadow: 0 1rem 3rem rgba(0,0,0,.08); text-align: center; }
      h1 { margin: 0 0 1rem; font-size: clamp(1.5rem, 5vw, 2rem); }
      p { margin: .75rem 0; line-height: 1.7; color: #5f5a55; }
      a { display: inline-block; margin-top: 1rem; color: #7a3f2b; font-weight: 700; text-underline-offset: .2rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>אימות הגישה לתוכן הדיגיטלי אינו זמין כרגע</h1>
      <p>עד לחיבור מנגנון מאומת להזמנה או לחשבון, פרקי הקורא והכלים הדיגיטליים חסומים.</p>
      <p>אם רכשת את הספר, אפשר ליצור קשר כדי לקבל עדכון כשהגישה המאובטחת תהיה זמינה.</p>
      <a href="/book">חזרה לעמוד הספר</a>
    </main>
  </body>
</html>`;

  return new NextResponse(body, {
    status: 503,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      "Retry-After": "3600",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

/**
 * Fail-closed containment for the digital book reader.
 *
 * There is no server-verified order/account entitlement in this repository.
 * Until one exists, only the public marketing page may reach the App Router;
 * every nested reader/tool request is stopped before RSC or page rendering.
 */
export function proxy(request: NextRequest): NextResponse {
  if (BOOK_MARKETING_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return unavailableResponse();
}

export const config = {
  matcher: ["/book/:path*"],
};
