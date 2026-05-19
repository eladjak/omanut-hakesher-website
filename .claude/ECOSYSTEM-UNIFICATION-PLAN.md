# Ecosystem Unification Plan — Omanut HaKesher

> Goal: a customer moving between `omanut-hakesher.co.il` and the course platform feels they are on the **same product**.
> Source of truth: [`BRAND.md`](./BRAND.md). This file lists the concrete edits per repo.

## Inventory

| Property | Deployed | Action |
|---|:-:|---|
| `omanut-hakesher-website` | YES (Vercel) | canonical — minor: add cross-site link + Sumit env |
| `haderech-next` | YES (Vercel, domain TBD) | **major** alignment work — colors + header + footer |
| `omanut-hakesher-book` | NO (docx generator) | no action |
| `omanut-hakesher-course` | NO (content authoring MD) | no action |

---

## Phase 1 — Tokens (`haderech-next`, ~30 min)

**File:** `haderech-next/src/app/globals.css`

Replace the entire `:root` block (lines 3–25) with the canonical token bundle from `BRAND.md §1`. Add the omanut `--radius` token + the gender-class CSS overrides (even if toggle stays off in B, the classes must exist so cross-site links carry visual continuity).

Add to `body`:
```css
body { line-height: 1.7; }
```

Extend `@theme inline` (line 43+) with the full omanut token set:
```css
--color-primary: var(--primary);
--color-primary-foreground: var(--primary-foreground);
--color-secondary: var(--secondary);
--color-accent: var(--accent);
--color-muted: var(--muted);
--color-border: var(--border);
--color-card: var(--card);
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
--radius-2xl: calc(var(--radius) + 8px);
```

**Verification:** run `npm run dev`, visit `/` — primary buttons must turn pink. If any `text-brand-500` still shows blue, swap to `text-primary` or add a legacy alias `--color-brand-500: var(--primary)` for the transition period.

---

## Phase 2 — Header parity (`haderech-next`, ~45 min)

**File:** `haderech-next/src/components/layout/header.tsx`

Replace the component body with the omanut Header structure ([`omanut-hakesher-website/src/components/Header.tsx`](../src/components/Header.tsx)) with these adaptations:

1. **Logo:** use the same `/images/logo.png` (copy from omanut `public/images/logo.png` → haderech `public/images/logo.png`). Keep the small `הדרך` wordmark to the side, in `text-secondary` (not gradient).
2. **Auth slot:** keep Clerk's `SignedIn`/`SignedOut`/`UserButton`. Slot it on the **left** of the CTA pill, not replacing it.
3. **Nav links** — course-specific:
   ```
   [{ href: "/courses", label: "קורסים" },
    { href: "/dashboard", label: "האזור שלי" } /* SignedIn only */,
    { href: "/community", label: "קהילה" },
    { href: "/blog", label: "בלוג" },
    { href: "/pricing", label: "מחירים" },
    { href: "https://omanut-hakesher.co.il", label: "← לאתר הראשי", external: true }]
   ```
4. **Theme toggle:** KEEP. Gender toggle: REMOVE (student platform, mid-session swap is hostile).
5. **CTA pill:** `rounded-full bg-primary text-white shadow-md shadow-primary/20` — label `הירשם לקורס` (SignedOut) / `המשך לימוד` (SignedIn).
6. **NotificationBell + SearchButton:** keep, place left of CTA.

Mobile drawer: identical structure to omanut.

---

## Phase 3 — Footer parity (`haderech-next`, ~30 min)

**File:** `haderech-next/src/components/layout/footer.tsx`

Replace the gradient-light footer with the dark-navy omanut Footer. Adaptations:

1. **Brand block:** `אומנות הקשר · הדרך` wordmark, "תוכנית הדרך — 12 שבועות שישנו את חיי הזוגיות שלך" tagline.
2. **Social icons:** SAME 5 (WhatsApp 972512518025 · Telegram MatimLiZugiut · Facebook group · YouTube · Spotify) — copy SVG paths from omanut Footer.
3. **Nav col:** course-specific
   ```
   קורסים · האזור שלי · קהילה · יומי · בלוג · מחירים · עזרה · צור קשר
   ```
4. **Services col:** cross-site links
   ```
   אתר אומנות הקשר · ליווי אישי · הספר · פודקאסט · מועדון הדרך
   ```
5. **Contact col:** SAME phone `051-251-8025` + email `hello@omanut-hakesher.co.il`.
6. **Newsletter strip at top:** same component, hits the same Rav-Messer list 22958.
7. **Bottom:** copyright + privacy link.

---

## Phase 4 — Cross-site link contract (BOTH repos, ~20 min)

Create `src/lib/links.ts` in BOTH projects:

```ts
// Single source of truth for cross-site URLs.
// Update here ONLY — never inline domain strings in JSX.
export const SITES = {
  main: process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://omanut-hakesher.co.il",
  course: process.env.NEXT_PUBLIC_COURSE_SITE_URL ?? "https://haderech.ohlove.co.il",
} as const;

export const CROSS_LINKS = {
  toCourse: { href: `${SITES.course}/dashboard`, label: "אזור הלמידה" },
  toCourseSignup: { href: `${SITES.course}/courses`, label: "הירשם לקורס" },
  toMain: { href: SITES.main, label: "אתר הראשי" },
  toMainCoaching: { href: `${SITES.main}/coaching`, label: "ליווי אישי" },
  toMainBook: { href: `${SITES.main}/book`, label: "הספר" },
  toMainPodcast: { href: `${SITES.main}/podcast`, label: "פודקאסט" },
} as const;
```

In Vercel env (both projects, production):
```
NEXT_PUBLIC_MAIN_SITE_URL=https://omanut-hakesher.co.il
NEXT_PUBLIC_COURSE_SITE_URL=https://<final-course-domain>
```

---

## Phase 5 — Page archetype port (`haderech-next`, ~30 min)

Apply BRAND.md §7 hero/section/card patterns:

- `src/app/page.tsx:28-48` — hero: full-bleed Image + `bg-foreground/70` + white text. Remove animated-gradient blobs.
- `src/app/page.tsx:97, 118, 589` — buttons: `rounded-full bg-primary` (not gradient `rounded-xl`).
- `src/app/courses/page.tsx:53, 117, 132, 153` — section gradients/pills via tokens.
- `src/app/layout.tsx:97` — add no-flash theme script (port from omanut layout).

---

## Phase 6 — Customer flow ports (BOTH, ~30 min)

1. **Sumit success redirect** — after payment, `/checkout/success` on omanut must offer "המשך לאזור הלמידה" CTA → `SITES.course/dashboard`. Use signed JWT or magic-link if SSO isn't shared.
2. **Haderech onboarding welcome screen** — first-login lands on a page that mirrors omanut's hero archetype (same overlay, same button, same gold accent word) so the visual continuity is unbroken.
3. **omanut Header CTA** — add secondary nav link `אזור הלמידה` for already-purchased users (use Clerk userId presence check or a `hadCourseAccess` cookie).
4. **omanut `/hadrech` page** — confirm the existing chapter exists and links the "התחילו ללמוד" button to `SITES.course/courses/the-way` (not internal route).

---

## Phase 7 — Verification (~30 min)

1. Side-by-side screenshot in agent-browser: omanut `/` and haderech `/`. Header + Footer must look like two pages of one site.
2. Same screenshot: `/coaching/vip` (omanut) and `/courses/the-way` (haderech). Hero pattern parity.
3. Sumit checkout → success → "המשך לאזור הלמידה" → haderech dashboard. Flow without visual break.
4. Lighthouse score on haderech: same Performance + a11y tier as omanut.
5. `bunx tsc --noEmit` (haderech) + `npm run build` (omanut) must pass on both.

---

## Time budget

| Phase | Hours |
|---|---:|
| 1 — Tokens | 0.5 |
| 2 — Header | 0.75 |
| 3 — Footer | 0.5 |
| 4 — Cross-site links | 0.3 |
| 5 — Page archetypes | 0.5 |
| 6 — Flow | 0.5 |
| 7 — Verification | 0.5 |
| **Total** | **≈3.5h** |

---

## Don't-do list

- ❌ Don't port `GenderProvider` to haderech-next. LMS = neutral.
- ❌ Don't strip haderech's `card-hover` / `shimmer-effect` / framer-motion stagger — they're earned on a learning platform.
- ❌ Don't unify the Clerk auth UI with omanut's WelcomeModal. Different jobs.
- ❌ Don't force a shared monorepo. Two repos, two deployments — alignment via tokens + cross-site links is enough.
- ❌ Don't kill haderech's `(auth)` route group's distinct styling. Sign-in pages have their own job.

---

## Decision log

- **2026-05-15** · agreed: rose/navy/gold across BOTH deployed sites. Same Header + Footer pattern (with auth + LMS-specific nav adaptations).
- **2026-05-15** · agreed: book/course content-authoring repos are NOT deployed sites; no design unification needed.
- **2026-05-15** · agreed: no shared npm package; alignment is achieved by token replication + Header/Footer port + cross-site link contract.
