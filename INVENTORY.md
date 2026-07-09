# INVENTORY — Landing Pages Rebuild (Sumit + Booking)

> Master roadmap. RavMesser pages are **inaccessible** (Cloudflare 403, no Wayback archive). Source-of-truth content is `.claude/LANDING_PAGES_ANALYSIS.md` + `.claude/scraped-content/*.md` (already captured by prior sessions).
> Updated: 2026-05-14
> Salvaged 2026-07-09 from worktree `bold-leavitt-80e5cc` (never committed). NOTE: the Sumit
> integration described below (beginredirect + custom webhook) was superseded — master migrated
> to the CreditGuy gateway on 2026-07-05 (`src/lib/sumit.ts`); `/api/checkout` was adapted to it.

## Scraping status
| Method | Result |
|---|---|
| `curl` to ohalove.ravpage.co.il | 403 Cloudflare |
| `WebFetch` to RavMesser | 403 |
| Wayback availability API | `archived_snapshots: {}` (none) |
| RavMesser admin API (V2 OAuth) | subscribers only — no page-content endpoint |

**Action required from Elad:** PDF/screenshot export of each landing page from RavMesser admin → email to `omanuthakesher@gmail.com`. Until then, we rebuild from the existing analysis (which is comprehensive).

## 9 landing pages to rebuild

| # | Product | RavMesser slug | New route | Status | Price | Type |
|---|---|---|---|---|---|---|
| 1 | **The Way** (תוכנית הדרך) | TheNewWay | `/programs/the-way` | TODO | ₪1,850 | Sumit checkout |
| 2 | **The Way + Gym** (הדרך + חדר כושר) | TheWay_Jim4Dates | `/programs/the-way-plus` | TODO | ₪2,970 | Sumit checkout |
| 3 | **VIP Consultation** | PrivateVIPConsult4Love | `/coaching/vip` | partial (`/coaching` exists) | ₪6K–50K | Booking → quote |
| 4 | **The Way Club 90D** | TheWayClub90D | `/club` | TODO | ₪4 / ₪30 mo | Sumit recurring |
| 5 | **Dating Card** (כרטיס היכרויות) | WayToDateOnline-3 | `/products/dating-card` | TODO | ₪97 | Sumit checkout |
| 6 | **Love Event** (אירוע אהבה) | LoveEvent | `/events/love-event` | TODO | Free | RSVP form (Rav-Messer) |
| 7 | **23 Reasons** (lead magnet) | (no RavMesser equiv) | `/lead/23-reasons` | DONE | Free | Rav-Messer ✓ |
| 8 | **7 Principles** (lead magnet) | (no RavMesser equiv) | `/lead/7-principles` | DONE | Free | Rav-Messer ✓ |
| 9 | **36 Questions** (lead magnet) | (no RavMesser equiv) | `/lead/36-questions` | DONE | Free | Rav-Messer ✓ |

Lead magnets 23/7/36 replace the older RavMesser bundle (8Ways2Courage, 10Rules4DateTalks, JustDoItGuide, GuideToLove, GameOfLife, HowToWrightYourVision, 20Quastions) — content is updated for both genders, already deployed.

## Payment integration — Sumit (NOT Stripe)

**Why Sumit:** Israeli tax compliance built-in. Generates חשבונית מס/קבלה automatically. Supports Israeli credit cards + פייבוקס/ביט.

**Credentials:** `~/.claude/secrets/keyvault/sumit.env`
- `SUMIT_COMPANY_ID=1874985196`
- `SUMIT_API_TOKEN=` (sandbox token — in keyvault, never in this repo)
- `SUMIT_MODE=sandbox`
- `SUMIT_WEBHOOK_SECRET=` (TODO: configure in Sumit admin after first end-to-end test)

**Production flip:** before going live, request prod API key from Sumit, set `SUMIT_MODE=production`, swap `SUMIT_API_TOKEN`.

**Integration model:** Hosted checkout via `POST https://api.sumit.co.il/billing/payments/beginredirect/`.
- We POST: Credentials + Customer + Items + RedirectURL + CancelRedirectURL + ExternalIdentifier (our order ID).
- Sumit returns: `{ RedirectURL: "https://..." }`.
- We redirect the buyer there. After payment, Sumit redirects to `RedirectURL?OG-CustomerID=...&OG-PaymentID=...&OG-ExternalIdentifier=our-order-id`.
- Webhook: configure in Sumit admin → POST to `/api/sumit/webhook` with payment payload + HMAC signature (header `X-Sumit-Signature`).

**Files:**
- `src/lib/sumit.ts` — typed client (BeginRedirect, parse response)
- `src/lib/products.ts` — single source of truth for product catalog
- `src/app/api/checkout/route.ts` — POST → creates Sumit session, returns RedirectURL
- `src/app/api/sumit/webhook/route.ts` — receives Sumit notifications, verifies HMAC, logs to console (later → DB)
- `src/app/thanks/page.tsx` — already exists, will read `OG-PaymentID` to confirm

## Booking — YouCanBookMe

Elad already has a YouCanBookMe account. Plan: embed widget at `/coaching/book` (iframe) + link from product pages where Sumit isn't the right path (VIP). NO custom booking — over-engineering. If/when YouCanBookMe breaks, revisit.

Booking URL placeholder: `https://YOUR-USERNAME.youcanbook.me` — needs final URL from Elad.

## Articles platform

User direction: personal articles on **eladjak.com** (Elad's personal site), NOT on omanut-hakesher. The omanut-hakesher blog (6 posts at `/blog/*`) stays as it is — couples-focused content. Future personal pieces (broader topics: business, parenting, mental health) → eladjak.com.

**Cross-link strategy:** Footer of omanut-hakesher posts → "עוד מאמרים אישיים של אלעד: eladjak.com". Footer of eladjak.com → "מחפש זוגיות? omanut-hakesher.co.il".

No code change in this repo for articles. Coordinate with `eladjak-hub` repo separately.

## Gender coverage

Site already has `GenderProvider` + `WelcomeModal` (first-visit gender selection, persists in localStorage). All 6 new commerce landing pages MUST:
1. Use `gendered-content.ts` keys for all copy (אתה/את, רווק/ה, etc.)
2. Hero image variants: male path + female path (Gemini-generated, both already in `/public/images/generated/`)
3. Social proof: testimonial cards mix male+female stories

The Way / Gym programs are gender-neutral in framing but show role-model imagery matching the visitor's selection.

## Council of sages — pre-deploy gate

Before pushing any new commerce page to production:
- **Architecture sage:** check API security (Sumit token never exposed client-side), webhook verification, idempotency on duplicate POST
- **Israeli-payments sage:** verify Cardcom/Tranzila weren't a better fit (decision: Sumit chosen for built-in invoicing — re-confirm)
- **UX sage:** mobile-first checkout flow, error states, abandoned-cart recovery via email
- **Halakha sage:** Saturday/Yom Kippur no-charge window in webhook (refund auto-issued payments that hit during Shabbat)

## Phased delivery

**Phase 1 (this session): Foundation**
- ✅ INVENTORY.md (this file)
- 🔧 Sumit client + checkout API + webhook stub
- 🔧 Product catalog (`src/lib/products.ts`)
- 🔧 `.env.example` updated with `SUMIT_*` vars
- 🔧 `/programs/the-way` — first commerce landing as template

**Phase 2 (next session): Replicate template**
- `/programs/the-way-plus`, `/products/dating-card`, `/club`
- `/coaching/vip` enhanced + booking embed at `/coaching/book`
- `/events/love-event` (RSVP via Rav-Messer)

**Phase 3 (after live tests): Polish**
- Webhook → Supabase orders table
- Abandoned-cart Resend sequence (3 emails, 24h/72h/7d)
- Production Sumit token + go-live
- Council-of-sages review

## Open questions for Elad
1. YouCanBookMe URL — what's the live booking page?
2. Confirm Sumit production company is `1874985196` or different
3. VIP price model — fixed tiers (₪6K/₪12K/₪24K) or quote-on-call?
4. Club ₪4 first-month — Sumit recurring needs payment method tokenization on entry, confirm consent flow
5. RavMesser admin PDF export of 6 pages we don't have content for (8Ways2Courage etc) — needed for tone fidelity in eventual lead-magnet expansion
