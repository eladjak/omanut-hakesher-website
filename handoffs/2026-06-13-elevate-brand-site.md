# Handoff — אומנות הקשר brand-site elevation (2026-06-13)

Branch: `feat/elevate-brand-site-jun13` · LIVE site (Vercel) → safe-live-refactor (branch→preview→verify→merge).

## What was elevated (before → after)

### GEO/AEO (the headline win)
- **Baseline (Vercel deploy): 78/100.** Three gaps closed:
  1. **JSON-LD 5-schema bundle.** Was 2 @types (ProfessionalService, FAQPage = 9/18). Added `WebSiteJsonLd` + `PersonJsonLd` sitewide in `layout.tsx`, and `WebPageJsonLd` on the homepage. Rendered HTML now carries WebSite + Organization/ProfessionalService + Person + WebPage + FAQPage as **plain `<script>` JSON-LD** (geo-aeo-protocol — NOT next/script). → 18/18.
  2. **Heading pyramid.** Was 0 `<h4>`. The new research section uses 5 real `<h4>`s. → 5/5.
  3. **External citation links in `<main>`.** Was 1. New "על מה זה מבוסס / לא אינטואיציה. מחקר." section embeds **5 real research sources** (Arthur Aron 36-questions, Rosenberg NVC/cnvc.org, Sue Johnson EFT/iceeft.org, Gottman Institute, attachment theory) — credibility + AI-citation signal. → 8/8.
- **Expected post-merge score: ~100/100** (verify with geo-scan on the Vercel preview, then prod).

### Visual / UX
- **Warm hero scrim** (`.hero-scrim` in globals.css): replaced the flat `bg-foreground/65` overlay with a brand-tinted directional gradient (secondary-dark → foreground → primary-dark) via `color-mix`. Intimate/warm feel, white hero text stays legible. Verified in screenshots.
- **Typographic rhythm** (globals.css): `text-wrap: balance` on h1/h2/h3, `text-wrap: pretty` on p, `line-height:1.2` on headings (>=1.15 per hebrew-rtl-gotchas), `tabular-nums` utility for stats, font-smoothing/optimizeLegibility.
- **Micro-interactions:** subtle `-translate-y-1` hover lift on pain-point / method / product / research cards — **transform-only, `motion-safe:` gated** (respects prefers-reduced-motion), <=200ms.
- **Section rhythm:** products section alternated to `bg-muted/50` so the new research section (white) doesn't clash.

## Funnel / cross-links touched (CONTRACT)
- **Fixed circular book CTA.** Homepage book card + Footer "services" list both linked **externally to `https://ohlove.co.il`** to "buy the book" — but per SITES-CONTRACT, ohlove.co.il IS this brand site (self-referential loop), and the book has **no dedicated site yet** (OPEN-QUESTION #1). Repointed both to the internal **`/book`** route (the real book surface w/ 17 interactive tools). CTA copy: "לרכישת הספר" → "לסקשן הספר".
- Course funnel unchanged (intentional): brand `/hadrech` → Sumit checkout → haderech-next LMS post-purchase. Did NOT fabricate a bypass link to haderech-next.vercel.app.

## OPEN-QUESTIONS hit (logged, not fabricated)
- **#1 Book site/domain** — kept book on internal `/book`; did not invent a book domain. If Elad wants a standalone book site or `sefer.ohlove.co.il`, the cross-links are now clean to repoint.
- **#2 Book price/buy flow** — NOT touched; Sumit catalog (`sumit-products.ts`) already has `book-preorder ₪89` but is BLOCKED-ON-CREDENTIALS. No fabricated price added.
- **DNS finding (NEW, important):** `www.ohlove.co.il` currently serves an **OLD Wix site** (`static.parastorage.com`), NOT the Vercel Next.js app. geo-scan of www.ohlove.co.il = 53/100 (Wix). The elevated site only lives at `omanut-hakesher-website.vercel.app` until DNS is pointed. **Elad must point ohlove.co.il (apex + www) at Vercel** for any of this to be public. Logged for decision.

## Gates
- `tsc --noEmit` ✓ 0 · `next build` ✓ (63 routes, only pre-existing Cache-Control warning) · eslint on changed files ✓ 0 (also removed a pre-existing dead `Button` import in page.tsx).
- Local prod-server DOM verify: 5 @types JSON-LD, 5 `<h4>` in main, 5 external citation links in main, book CTA href=`/book`, hero-scrim applied.
- agent-browser screenshots (desktop+mobile+hero) in `docs/screenshots/`.

## Files changed (mine only — did NOT sweep unrelated untracked public/cv-*, public/logo*, og-image.png)
- `src/app/layout.tsx` — wire WebSite+Person JSON-LD sitewide
- `src/components/JsonLd.tsx` — add WebSiteJsonLd, PersonJsonLd, WebPageJsonLd
- `src/app/page.tsx` — WebPage schema, research section (h4s + citations), hero scrim, tabular-nums, hover micro-interactions, book CTA → /book, drop dead import
- `src/components/Footer.tsx` — remove circular ohlove "buy book" link
- `src/app/globals.css` — hero-scrim, typographic rhythm, font smoothing

## Next (post-merge)
1. Verify Vercel preview Ready → geo-scan the preview URL (expect ~100).
2. Merge → prod, re-scan prod.
3. **DNS:** point ohlove.co.il → Vercel (else the public domain stays the old Wix site).
