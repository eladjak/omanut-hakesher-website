# Brand System — Omanut HaKesher Ecosystem

> **Source of truth.** Both deployed websites must conform.
> Owner: Elad Yakobovich · Updated: 2026-05-15

## Properties in scope

| Property | Repo | Surface | Status |
|---|---|---|---|
| Marketing + commerce + book companion | `omanut-hakesher-website` | `omanut-hakesher.co.il` (pending DNS) → `omanut-hakesher-website.vercel.app` | **canonical** |
| Course / LMS | `haderech-next` | TBD (assumed `haderech.ohlove.co.il` or `course.omanut-hakesher.co.il`) | **must align** |
| Book authoring | `omanut-hakesher-book` | not deployed (docx generator) | n/a |
| Course content auth | `omanut-hakesher-course` | not deployed (audit/scripts MD) | n/a |

The book companion (`/book/`) and lead magnets (`/lead/`) live INSIDE the main marketing site. No separate book-site exists.

---

## 1. Colors

Canonical tokens (must appear identically in both `globals.css`):

```css
:root{
  --primary:        #E85D75;  /* warm pink-red, hearts in the logo */
  --primary-light:  #F08C9E;
  --primary-dark:   #C94A62;
  --primary-foreground: #ffffff;

  --secondary:        #1E3A5F;  /* deep navy, the logo heart */
  --secondary-light:  #2C5280;
  --secondary-dark:   #152B47;
  --secondary-foreground: #ffffff;

  --accent:        #D4A853;  /* warm gold */
  --accent-light:  #E8C97D;
  --accent-dark:   #B08A3A;
  --accent-foreground: #1a1a2e;

  --background: #FFFAF7;  /* warm cream */
  --foreground: #1a1a2e;
  --muted:      #F5EDE8;
  --border:     #E8DDD5;

  --radius: 0.75rem;       /* 12px base */
  --destructive: #e74c3c;
}
```

**Forbidden** on both sites:
- Royal blue `#2563EB` ramp (was haderech's primary — replace)
- Teal `#14B8A6` ramp (was haderech's accent — replace)
- Cool blue-gray bg `#F7F9FC` (was haderech's bg — replace with cream)

Dark mode tokens: see `omanut-hakesher-website/src/app/globals.css:63-107`.

---

## 2. Typography

- **Font family:** Heebo, system-ui fallback. Loaded via `next/font` in both root layouts.
- **Body line-height:** `1.7` (set globally on `body`).
- **Numbers:** `font-variant-numeric: tabular-nums` for any ₪, count, percentage, date.
- **Heading scale (consistent across both sites):**
  - H1: `text-4xl md:text-5xl lg:text-6xl/7xl font-bold leading-tight`
  - H2: `text-3xl md:text-4xl/5xl font-bold`
  - H3: `text-lg/xl font-semibold`
  - Body: `text-base/lg leading-relaxed`
- **Hebrew rules:**
  - `dir="rtl"` on `<html>`
  - No `font-style: italic` on Hebrew serif (clips edges; see rules/hebrew-rtl-web-gotchas)
  - Arrows in RTL flow: `transform: scaleX(-1)`

---

## 3. Radius scale

Derived from `--radius`:
```
--radius-sm: calc(var(--radius) - 4px);   /* 8px  */
--radius-md: calc(var(--radius) - 2px);   /* 10px */
--radius-lg: var(--radius);               /* 12px */
--radius-xl: calc(var(--radius) + 4px);   /* 16px */
--radius-2xl: calc(var(--radius) + 8px);  /* 20px */
```

**Button shape:** `rounded-full` (pill). Square-ish `rounded-xl` buttons are off-brand.

---

## 4. Components — must reuse, must look identical

| Component | Canonical location | haderech-next action |
|---|---|---|
| Header | `omanut-hakesher-website/src/components/Header.tsx` | replace `src/components/layout/header.tsx` content; keep Clerk auth wiring |
| Footer | `omanut-hakesher-website/src/components/Footer.tsx` | replace `src/components/layout/footer.tsx` content; map nav links to course routes |
| Button | `src/components/ui/button.tsx` (shadcn) | identical via tokens |
| Card | `src/components/ui/card.tsx` (shadcn) | identical via tokens |
| Breadcrumbs | `src/components/Breadcrumbs.tsx` | port verbatim |
| OptimizedImage | `src/components/OptimizedImage.tsx` | port verbatim |
| WhatsAppButton | `src/components/WhatsAppButton.tsx` | port verbatim (same number 051-251-8025) |

---

## 5. Header — canonical structure

```
[sticky, z-50, glass-on-scroll, container/px-4/py-2]
[Logo image 140×50 → href="/"]                  [Nav links (9)]                  [Theme toggle] [Gender toggle] [CTA pill: שיחת היכרות חינם]
[mobile: hamburger, full-screen drawer with same links + CTA]
```

**Cross-site links (NEW — must add to both):**
- On `omanut-hakesher-website` Header: add nav link `אזור הלמידה` → `https://<haderech-domain>/dashboard` (visible always; on click jumps to course platform)
- On `haderech-next` Header: add nav link `← לאתר הראשי` → `https://omanut-hakesher.co.il` (left-most for prominence)
- Logo: BOTH sites use `/images/logo.png` (omanut master logo). Haderech may keep small "הדרך" wordmark next to it.

**Gender toggle on haderech-next:** DISABLED. Students of all genders share the platform; switching mid-session is hostile. Theme toggle: KEPT.

---

## 6. Footer — canonical structure

```
[bg-foreground (dark navy) · text-background/90]

[Newsletter strip — h3 + email input + submit pill]
─────────────────────────────────────
[4-column grid]
  col 1-2: brand wordmark + tagline + 5 social icons (WhatsApp / Telegram / Facebook / YouTube / Spotify)
  col 3:   ניווט (9 nav links)
  col 4:   שירותים + צרו קשר (phone + email)
─────────────────────────────────────
[© year · אומנות הקשר · | · privacy link · | · "נבנה באהבה לקשרים טובים יותר"]
```

Phone: `051-251-8025` · Email: `hello@omanut-hakesher.co.il`. Both sites identical.

**Cross-site links in footer:**
- omanut footer "שירותים" col includes `קורס "הדרך"` → haderech-domain
- haderech footer "שירותים" col includes `אתר אומנות הקשר` → omanut.co.il + `הספר` + `ליווי אישי` + `פודקאסט`

---

## 7. Page archetypes

### Hero
```tsx
<section className="relative py-24 md:py-32 overflow-hidden">
  <div className="absolute inset-0">
    <Image src="..." alt="..." fill className="object-cover" priority />
    <div className="absolute inset-0 bg-foreground/70" />  {/* CANONICAL — not /65 /68 /72 */}
  </div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <Badge variant="outline" className="mb-5 text-white border-white/30">...</Badge>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance">
        ... <span className="text-accent-light">accent word</span>
      </h1>
      <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">...</p>
      <a className="mt-10 inline-flex px-10 py-4 bg-primary text-white rounded-full font-semibold shadow-lg shadow-primary/20">
        CTA
      </a>
    </div>
  </div>
</section>
```

### Section rhythm
- `py-20` (default) · `py-24` (hero-adjacent) · `py-16` (compact)
- `container mx-auto px-4` + section-level `max-w-3xl/5xl/6xl`
- Alternating contrast: `bg-muted/50` / `bg-muted/30` / full-bleed `bg-primary` outros

### Card grid
- `border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200`
- `CardContent p-6/p-8`
- 5-col / 4-col / 3-col / 2-col responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)

---

## 8. Motion / animations

**Stack:** `motion/react` (formerly framer-motion) + `tw-animate-css` for micro.

**Rules:**
- Animate **only** `transform` + `opacity`. Never width/height/top/left/margin.
- Max **200ms** for feedback animations.
- Respect `prefers-reduced-motion: reduce` (already wired globally).
- `ease-out` on entrance, `ease-in` on exit.

**Primitives — must be used (currently 0/13 new pages import these):**
```
src/components/animations/ScrollReveal.tsx
src/components/animations/StaggerContainer.tsx
src/components/animations/AnimatedCounter.tsx
```

**Where to apply:**
- Hero: stagger badge → H1 → subhead → CTA (60ms delays)
- Card grids: ScrollReveal with `y: 20 → 0`, threshold 0.1
- Number anchors: AnimatedCounter on `461 זוגות`, `₪5,940 → ₪1,850`
- Form success: scale-in tick `0.95 → 1` over 200ms

---

## 9. Voice & tone

- **Hebrew, natural, no AI-tells.** Avoid: "תוכלו לגלות", "במאמר זה", "להלן", "ניצול מירבי", "סינרגיה".
- **Direct, warm, owner-led.** Elad speaks in first person. Examples:
  - ✅ "אני אלעד. 12 שנה אני עוזר לרווקים ורווקות למצוא זוגיות."
  - ❌ "אומנות הקשר היא חברה מובילה בתחום ההכוונה הזוגית."
- **Gender-aware copy** in body content (`/ה`, `<GenderedText>` when appropriate). HEADER/FOOTER stay neutral so they don't fight the gender toggle.
- **Numbers:** stick to ONE source-of-truth count. `461 זוגות` is canonical. Update podcast bio (`310+`) to match.

---

## 10. Cross-site flow

Customer journey (must be invisible-handoff between domains):

```
omanut.co.il (browse) ──► /lead/{magnet} ──► Rav-Messer ──► email funnel
  │
  ├──► /coaching/vip ─► /coaching/book ─► YCBM ─► VIP onboarding
  │
  ├──► /programs/the-way ─► /api/checkout ─► Sumit ─► /checkout/success
  │         │
  │         └─[after purchase]──► haderech/dashboard (auto SSO via shared Clerk org)
  │
  └──► /club ─► Sumit ─► haderech/dashboard
```

**Must verify on haderech-next side:**
- Clerk org/tenant is shared OR there's a magic-link bridge for buyers
- First-login redirects send the buyer to a welcome page in HADERECH that uses omanut's hero pattern (so it doesn't feel like a different product)

---

## 11. Forbidden patterns (both sites)

- ❌ Royal blue `#2563EB` or teal `#14B8A6` (LMS legacy)
- ❌ Cool blue-gray backgrounds (`#F7F9FC`, `slate-50`, `zinc-50`)
- ❌ `rounded-xl` buttons (pill only)
- ❌ Gradient text/buttons unless explicitly approved
- ❌ Glassmorphism on hero (use solid `bg-foreground/70` overlay, not blur)
- ❌ `font-style: italic` on Hebrew serif
- ❌ Hardcoded hex outside `globals.css` — always via tokens
- ❌ Placeholder images / `placeholder.com` URLs — generate with nano-banana-poster
- ❌ Cross-site link uses domain string literal in the JSX — must import from `lib/links.ts` (to be created)

---

## 12. Files to align (haderech-next, in order)

1. `src/app/globals.css:7-25` — replace palette (see HADERECH_ALIGNMENT.md row 1)
2. `src/app/globals.css:60-64` — body line-height 1.7
3. `src/app/globals.css:43-46` — extend `@theme inline` with full token bundle
4. `src/app/globals.css:67-71` — focus-ring uses `var(--primary)` not hex
5. `src/components/layout/header.tsx` — replace with port of `omanut/.../Header.tsx`, retain Clerk wiring
6. `src/components/layout/footer.tsx` — replace with port of `omanut/.../Footer.tsx`, dark-navy theme
7. `src/app/page.tsx:97, 118, 589` — buttons → `rounded-full bg-primary`
8. `src/app/page.tsx:28-48` — hero → full-bleed image + `bg-foreground/70` overlay
9. `src/app/courses/page.tsx:53, 117, 132, 153` — section gradients + filter pills via tokens
10. `src/app/layout.tsx:97` — add no-flash theme + (omitted) gender script

Estimated: ~2 hours. Verify with side-by-side screenshot.

---

## 13. References

- `omanut-hakesher-website/.claude/scrape/HADERECH_ALIGNMENT.md` — 8 concrete swaps
- `omanut-hakesher-website/.claude/scrape/DESIGN_AUDIT.md` — 13-page audit
- `omanut-hakesher-website/.claude/REVIEW-2026-05-15-COUNCIL.html` — council-of-sages review
- `~/.claude/rules/web-design-stack.md` — global Elad design rules
- `~/.claude/rules/hebrew-rtl-web-gotchas.md` — 10 RTL pitfalls
