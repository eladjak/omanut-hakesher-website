/**
 * Single source of truth for the site's base URLs.
 *
 * THE PROBLEM THIS SOLVES (found in fleet-sweep audit 2026-07-10):
 * `omanut-hakesher.co.il` is NXDOMAIN — it was never registered. The real
 * public domain will be `www.ohlove.co.il` (currently still on Wix; see
 * docs/DNS-CUTOVER-RUNBOOK.md). Until the cutover, the ONLY domain that
 * serves this app is `omanut-hakesher-website.vercel.app`.
 *
 * Two distinct needs:
 * 1. CANONICAL_SITE_URL — SEO-facing (canonical/JSON-LD/sitemap). Kept as the
 *    historical placeholder until Elad executes the DNS cutover, then flip it
 *    (one line here + set the Vercel env var).
 * 2. FUNCTIONAL_BASE_URL — links that must WORK TODAY: welcome-email download
 *    links, WhatsApp share texts, Sumit post-payment redirects. These must
 *    never point at a dead domain.
 *
 * AT DNS CUTOVER (Elad, per runbook): set `NEXT_PUBLIC_SITE_URL=https://www.ohlove.co.il`
 * in Vercel production env → everything below flips automatically on redeploy.
 */

/** SEO placeholder domain. Flip to https://www.ohlove.co.il at DNS cutover. */
export const CANONICAL_SITE_URL = "https://omanut-hakesher.co.il";

/** The domain that was never registered — never emit it in functional links. */
const DEAD_DOMAIN = "omanut-hakesher.co.il";

/** Always-live Vercel production alias for this project. */
const VERCEL_PROD_URL = "https://omanut-hakesher-website.vercel.app";

function resolveFunctionalBase(): string {
  const env = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    ""
  )
    .trim()
    .replace(/\/+$/, "");
  // Guard: even if someone sets the env var to the dead domain, refuse it.
  if (env && !env.includes(DEAD_DOMAIN)) return env;
  return VERCEL_PROD_URL;
}

/**
 * Base URL guaranteed to serve THIS app right now.
 * Use for: emails, share links, payment success/failure redirects.
 * (NEXT_PUBLIC_* is inlined at build time, so this is consistent on
 * both server and client bundles.)
 */
export const FUNCTIONAL_BASE_URL = resolveFunctionalBase();

/** Prefix a site-relative path with the functional base. Absolute URLs pass through. */
export function absoluteFunctionalUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${FUNCTIONAL_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
