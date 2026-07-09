# Salvage 2026-07-09 — hardcore-hoover-5e3797 page variants (NOT routed)

On the night of 2026-05-14, TWO parallel Claude worktrees built the same 9-sales-pages
project with different route schemes (classic multi-agent-without-contract collision):

- `bold-leavitt-80e5cc` — followed the canonical routes from `INVENTORY.md`
  (/programs/the-way, /programs/the-way-plus, /club, /products/dating-card,
  /coaching/vip, /events/love-event), catalog-driven (`src/lib/products.ts`) with a
  real Sumit checkout API. **These were adopted as the live routes on the salvage branch.**
- `hardcore-hoover-5e3797` — built the same products at different routes
  (/programs/club-90d, /programs/dating-card, /programs/hadrech-jim, /programs/vip,
  /event/love) using an older green-invoice-iframe "Summit" approach.

The hoover copies of the OVERLAPPING pages are preserved here (`.tsx.txt` so they don't
compile/route) because their Hebrew marketing copy is richer in places — feature lists,
audience descriptions, agenda, WhatsApp CTAs. Merge the best copy into the live pages,
then delete this folder.

| File | Product | Adopted live counterpart |
|---|---|---|
| `programs-index.tsx.txt` | Programs index (richer cards: features/audience/price details, but missing the flagship the-way card) | `src/app/programs/page.tsx` (catalog-driven, complete) |
| `club-90d.tsx.txt` | מועדון 90D ₪30/חודש | `src/app/club/page.tsx` |
| `dating-card.tsx.txt` | כרטיס היכרויות ₪97 | `src/app/products/dating-card/page.tsx` |
| `hadrech-jim.tsx.txt` | הדרך + חדר כושר | `src/app/programs/the-way-plus/page.tsx` |
| `vip.tsx.txt` | ליווי VIP | `src/app/coaching/vip/page.tsx` |
| `event-love.tsx.txt` | אירוע אהבה (RSVP via /api/lead/subscribe, slug `love-event`) | `src/app/events/love-event/page.tsx` (slug `love-event-rsvp` + confirmed page) |

Hoover's unique items were adopted live directly: 3 lead magnets
(/lead/courage, /lead/vision, /lead/dating-talks) + `LeadMagnetTemplate`,
the blog→eladjak.com cross-link banner, and the lead-magnets.ts entries.

DROPPED (superseded, per the 2026-07-09 worktrees decision table):
- hoover `src/lib/summit.ts` + `src/components/summit/SummitCheckout.tsx` — old
  green-invoice iframe approach; master's real Sumit stack (CreditGuy gateway,
  2026-07-05) is strictly better.
- bold `src/lib/sumit.ts` (old beginredirect rail — fails on live accounts) and
  bold `src/app/api/sumit/webhook/route.ts` — master holds newer versions of both.
- bold `.env.example` changes — master's SUMIT_* documentation is newer.
