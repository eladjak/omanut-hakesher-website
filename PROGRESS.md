# אתר אומנות הקשר - התקדמות

## סטטוס: deployed · lead-magnet LIVE · newsletter forms LIVE · Sumit checkout READY (blocked-on-credentials)
## עדכון אחרון: 2026-06-13

## 2026-06-13 — חיווט 3 טפסי ניוזלטר מתים (Shabbat deep-iteration)
- **הבעיה:** טפסי הניוזלטר בדף הבית, בבלוג וב-footer היו ויזואליים בלבד — דף הבית/בלוג בלי `onSubmit` בכלל, ה-footer עם `setSubscribed(true)` מזויף ללא קריאת רשת. כפתורים מתים = איבוד לידים.
- **התיקון:** קומפוננטה משותפת חדשה `src/components/NewsletterForm.tsx` (client) שמתחברת לצינור הקיים `/api/lead/subscribe` עם מצבי loading/success/error אמיתיים, ולידציית אימייל בצד לקוח, ונגישות מלאה (aria-invalid, role=alert/status, useId, theme light/dark, layout row/stack).
- מגנט חדש `newsletter` ב-`lead-magnets.ts` (רשימת Rav-Messer 22958, תגית `newsletter`+`source:website`). ה-API מאפשר הרשמת ניוזלטר ללא שם; מגנטים גייטד עדיין דורשים שם (נבדק regression). מייל ברוכים-הבאים בגרסת newsletter (בלי שפת "מדריך להורדה").
- **חוברו:** `src/app/page.tsx` (hero newsletter), `src/app/blog/page.tsx`, `src/components/Footer.tsx`.
- **שערים:** `tsc --noEmit` ✓0 · `npm run build` ✓ (63 routes) · smoke מקומי: newsletter בלי שם→200 · אימייל לא תקין→400 · slug לא ידוע→400 · מגנט גייטד בלי שם→400, עם שם→200 · 3 הטפסים נרנדרו בדפים.
- **commit** `e72b495` בענף `feat/newsletter-forms-live` (נדחף ל-origin → Vercel preview). לא מוזג ל-master (safe-live-refactor: הפרויקט הזה מגיש את ohlove.co.il החי).
- **ממצא:** כל 22 הכלים מסוג comingSoon הם audio/video/pdf בלבד (דורשים הקלטה/צילום/אישור-תוכן מאלעד) — אין כלי quiz/interactive שניתן להשלים בלי המצאת תוכן שלא קיים בספר. GEO/AEO כבר במצב טוב (JSON-LD כ-plain script, FAQ schema, llms.txt, robots, sitemap). הדומיין omanut-hakesher.co.il עדיין NXDOMAIN; החי = ohlove.co.il + vercel app (שניהם 200).

## 2026-06-09 — eladjak.com overhaul: links + SEO + brand upgrade

## 2026-06-09 — eladjak.com overhaul: links + SEO + brand upgrade
- חיווט CTA-ים לספר / קורס / ליווי (book/course/coaching) + FAQ schema + קופי תואם-מותג (commit `94ca294`).
- מיזוג שדרוג links+SEO+brand (commit `ba0bf9e`).
- חלק מ-mandate ה-eladjak.com overhaul. האתר החלופי הזה משודרג עד שדומיין אומנות-הקשר (NXDOMAIN) יהוגר; בינתיים hub מפנה ל-https://www.ohlove.co.il/.
- live: omanut-hakesher Vercel project. (הערה: מקור-אמת סטטוס מפורט = `.claude/PROJECT_STATUS.md`.)

## 2026-05-14: scrape Rav-Messer + Sumit migration

### מה בוצע
**1. Stripe — אין בקוד הפועל.** `grep stripe/Stripe/STRIPE` ב-`src/` + `.env.local` + `package.json` החזיר 0 תוצאות. ההתייחסויות היחידות הן ב-`.claude/extracted-content/*.md` (תיעוד היסטורי בלבד). לא היה מה להחליף.

**2. תשתית Sumit מלאה — מוכנה לפרודקשן ברגע שיגיעו credentials:**
- `src/lib/sumit-products.ts` — קטלוג 4 מוצרים (hadrech-full ₪2,997 · discovery-call ₪197 · book-preorder ₪89 · coaching-3pack ₪1,497). מקור-אמת יחיד למחירים + SKUs + תגיות Rav-Messer.
- `src/lib/sumit-client-inline.ts` — TypeScript port של `@elad/sumit-client` (הוטמע פנימה כי Turbopack לא פותר symlinks ל-file: deps).
- `src/lib/sumit.ts` — wrapper דק: `createCheckout()` + `verifyWebhookSignature()` (HMAC-SHA256).
- `src/app/api/sumit/checkout/route.ts` — POST → יוצר תשלום hosted ב-Sumit, מחזיר URL להפניה. ולידציה מלאה (email/name/product). 503 אם אין credentials → UI עובר ל-fallback של `/contact`.
- `src/app/api/sumit/webhook/route.ts` — מקבל events מ-Sumit, מאמת חתימה, מתייג קונה ב-Rav-Messer עם `customer` + `product:<slug>` + מתעד `sumit_payment_id`. Idempotent (in-memory Set).
- `src/components/SumitCheckoutButton.tsx` — קומפוננטה אינטראקטיבית עם Radix Dialog: שם+מייל+טלפון → POST → redirect ל-Sumit hosted page. מציגה מחיר. fallback אוטומטי ל-`/contact` אם 503.
- `src/app/thanks/purchase/page.tsx` — דף תודה (`robots: noindex`), מקבל `?product=<slug>` ומציג שם המוצר בעברית.

**3. כפתורי תשלום מחוברים לעמודים:**
- `/hadrech` — 2 CTAs (hero + final) הוחלפו מ-`Link href="/contact"` ל-`SumitCheckoutButton productSlug="hadrech-full" ₪2,997`.
- `/book` — CTA הראשי הוחלף ל-`book-preorder ₪89`.

**4. Verification:**
- ✅ `npx tsc --noEmit` — 0 שגיאות
- ✅ `npm run build` — עובר. 64 routes (כולל 3 חדשים: `/api/sumit/checkout`, `/api/sumit/webhook`, `/thanks/purchase`).
- ✅ `.env.example` עודכן עם `SUMIT_COMPANY_ID` + `SUMIT_API_KEY` + `SUMIT_WEBHOOK_SECRET` + `NEXT_PUBLIC_SITE_URL`.
- ✅ Backups: `*.pre-sumit-rebuild-bak` של hadrech/book/package.json/.env.example.

**5. Rav-Messer scrape — חלקי:**
- Delegator endpoint `:3900/email/*` לא נגיש מהמכונה המקומית (connection timeout דרך IP ישיר; Cloudflare hub עובד אבל לא חושף את ה-email endpoints).
- מבנה הקמפיינים נלמד מ-`.claude/extracted-content/course-platform.md` (כבר נסרק קודם): brand identity (Dark Blue #1E3A5F + Warm Pink #E85D75 + Gold #D4A853), טון מכירתי ("מבקשי זוגיות שמרגישים תקיעות"), 3 הבטחות (אמת/כלים/כבוד), 12-שבועות בחלוקה ל-4 שלבים.
- ה-website כבר משקף את התוכן הזה. לא נדרש rebuild של עיצוב/copy — דווקא ההיעדר שתשלום שיהיה בעמוד.

### מצב Sumit
**BLOCKED-ON-CREDENTIALS.** הקוד מוכן. ברגע ש-`SUMIT_COMPANY_ID` + `SUMIT_API_KEY` + `SUMIT_WEBHOOK_SECRET` נכנסים ל-Vercel env, התשלומים עובדים מיד.
- צריך גם להגדיר webhook URL ב-dashboard של Sumit ל-`https://omanut-hakesher.co.il/api/sumit/webhook`.
- Wiring ב-Rav-Messer: list 22958, tags `customer` + `product:hadrech-full` (וכו') — מוכן בקוד, יעבוד אוטומטית כשהווהבק יקבל אירועים.

### מה נשאר פתוח
1. **Sumit credentials** (חיצוני — אלעד צריך לקבל מ-Sumit dashboard לפי `SUMIT_INTEGRATION.md` ב-pdf-empire-il).
2. **Webhook secret** — להגדיר ב-dashboard של Sumit ולהעתיק ל-Vercel env.
3. **persistent billing_events** — כרגע idempotency דרך in-memory Set; אחרי 10 רכישות ראשונות לעבור ל-Supabase table.
4. **Recurring billing** — `coaching-3pack` בנוי כתשלום חד-פעמי. אם נרצה הוראת קבע, להוסיף `recurring:true` בקטלוג + endpoint נפרד.
5. **GEO/AEO scan** — לא רץ בסשן הזה (לא היו שינויי SEO/Schema).
6. **דף `/coaching` + `/discovery-call`** — לא חוברו לכפתורי Sumit, רק `/hadrech` + `/book`. אלעד יחליט אם להוסיף.

---

### Session 2026-05-05 (3) — Production wiring + smoke tests passed
הצינור באוויר. `RAV_MESSER_*` + `RESEND_API_KEY` + `CONTACT_EMAIL` נוספו ל-Vercel env (production), אומנות הקשר עברה deploy חדש, ונבדקה.

- ✅ תיקון שם משתנים: `RAVMESSER_*` → `RAV_MESSER_*` (התאמה ל-content-studio לשימוש חוזר)
- ✅ הועלו ל-Vercel production (5 משתנים): RAV_MESSER_CLIENT_ID/SECRET/USER_TOKEN, RESEND_API_KEY, CONTACT_EMAIL
- ✅ Deploy חדש: https://omanut-hakesher-website.vercel.app
- ✅ **Production smoke tests (5/5 עוברים, אף אחד לא נוגע ב-Rav-Messer):**
  - invalid-email → HTTP 400 ✓
  - invalid-name → HTTP 400 ✓
  - unknown-magnet → HTTP 400 ✓
  - invalid-json → HTTP 400 ✓
  - GET method → HTTP 405 ✓
- ✅ **Dev smoke test (email-only fallback):** HTTP 200, `mode: 'email-only'`, log מאשר "Rav-Messer not configured, skipping list subscription". בדיקת success-path בלי לזהם רשימה אמיתית.

**מצב הצינור:** מלא. טופס → fetch → API → Rav-Messer subscribe + tag → Resend welcome email → success state. דבר אחד נשאר לפני שיש לידים אמיתיים: לבדוק ערוץ אחד מקצה לקצה עם אימייל בדיקה אמיתי + לוודא ב-Rav-Messer שהמנוי נוסף + לנקות אותו. עוצרים פה לפי הוראתך — "רק בודקים, לא שולחים לאף ליד אמיתי".

### Session 2026-05-05 (2) — Lead-magnet forms wired live
שלוש הטפסים תחת `/lead/*` היו ויזואליים בלבד (`setTimeout(800)` ואז success מזויף). חוברו לחיבור אמיתי:

- ✅ `src/lib/ravmesser.ts` — לקוח Rav-Messer V2 OAuth מצומצם (subscribe + token cache)
- ✅ `src/lib/lead-magnets.ts` — מיפוי slug → list/tags/asset לכל 3 המגנטים. כולם עוברים לרשימת master 22958 עם תיוג `lead:23-reasons` / `lead:7-principles` / `lead:36-questions` לסגמנטציה
- ✅ `POST /api/lead/subscribe` — ולידציה, Rav-Messer subscribe, Resend welcome email. אם Rav-Messer לא מוגדר (dev/preview) — נשלח רק אימייל, המשתמש לא חווה כשל
- ✅ 3 הטפסים (`/lead/23-reasons`, `/lead/7-principles`, `/lead/36-questions`) מקריאים את ה-API, מציגים שגיאות שליחה, ומחזירים success state מחודד (קול אלעד: "תודה — המדריך בדרך")
- ✅ `.env.example` עודכן עם `RAV_MESSER_CLIENT_ID/SECRET/USER_TOKEN`
- ✅ TypeScript: 0 שגיאות. Build: עובר (47 routes כולל `/api/lead/subscribe`)

### Session 2026-05-05 (1) — OAuth refresh + Rav-Messer integration noted
- ✅ `omanuthakesher@gmail.com` Gmail OAuth token refreshed via Google OAuth Playground (granted 13:30 UTC). שייך לאתר אומנות הקשר.
- ℹ️ Rav-Messer Pro account 1001688 (2153 subs, 120K/mo) integrated via delegator :3900 — see `~/.claude/projects/C--Users-eladj/memory/reference_rav_messer_integration_may_04.md`.

---

### Original status: deployed
### Original update: 2026-02-24

## מצב נוכחי
האתר בנוי ועובד. MVP+ הושלם כולל כל הדפים, אופטימיזציות ביצועים, ופיצ'רים אינטראקטיביים. נוספו: Course Preview אינטראקטיבי עם כפתורי "למידע נוסף", אקורדיון FAQ בדף אודות (8 שאלות), breadcrumbs בכל הדפים הפנימיים, כפתור scroll-to-top, ובאנר CTA לסדנה חינמית עם countdown timer. Build עובר ללא שגיאות. TypeScript נקי.

## מה בוצע
- [x] MVP מלא: 7 דפים + בלוג עם 6 מאמרים + טופס צור קשר
- [x] RTL מלא עם פונט Heebo
- [x] Tailwind CSS 4 עם פלטת צבעים חמים
- [x] Header responsive עם תפריט מובייל
- [x] Footer עם לינקים לרשתות חברתיות
- [x] SEO metadata לכל דף
- [x] Google Analytics מובנה
- [x] API route לטופס צור קשר (Resend)

### סשן 2026-02-13 - סקר RTL ותיקוני build
- [x] אימות TypeScript - אפס שגיאות
- [x] אימות build - עובר בהצלחה (Next.js 16.1.6 Turbopack)
- [x] תיקון כיווני חצים ב-RTL (דף הבית: "לכל ההמלצות" השתמש בחץ ימינה במקום שמאלה)
- [x] תיקון margin לרשימות בבלוג: mr-6 -> ms-6 (margin-inline-start לתמיכת RTL נכונה)
- [x] תיקון padding בדף צור קשר: lg:pr-8 -> lg:ps-8 (padding-inline-start)
- [x] סקירת כל הקבצים לבעיות RTL נוספות
- [x] אימות שאין שימוש ב-text-left/text-right/pl-/pr-/ml-/mr- בעייתי (רק אלמנט דקורטיבי עם left-0)

### סשן 2026-02-15 - שיפורי נגישות, SEO, dark mode ו-UX
- [x] **דף 404 מעוצב** - עם לינקים לדפים עיקריים ועיצוב מותאם למותג
- [x] **כפתור WhatsApp צף** - מופיע אחרי גלילה ראשונה, עם אנימציה עדינה ולייבל בדסקטופ
- [x] **מניעת הבהוב dark mode** - סקריפט inline ב-head שרץ לפני React hydration
- [x] **Skip to content** - לינק נגישות לדילוג לתוכן הראשי (WCAG 2.1)
- [x] **Schema.org JSON-LD** - structured data לעסק (ProfessionalService) ולנתיבי פירורי לחם
- [x] **שיפור SEO metadata** - תבנית כותרות, canonical URLs, metadataBase, robots
- [x] **שדרוג דף בלוג** - פוסט מוביל גדול, כרטיסי Shadcn, עיצוב אחיד עם שאר האתר
- [x] **שדרוג דף מאמר בלוג** - נתיב פירורי לחם סמנטי, Badge, Card לפוסטים קשורים
- [x] **שיפור נגישות Header** - aria-current, aria-label, aria-controls, סגירה ב-Escape
- [x] **מניעת גלילה כשתפריט מובייל פתוח** - body overflow hidden
- [x] **Reduced motion support** - כיבוד prefers-reduced-motion ב-CSS
- [x] **שיפור dark mode** - selection colors, image brightness, contrast
- [x] **TypeScript** - אפס שגיאות
- [x] **Build** - עובר בהצלחה

### סשן 2026-02-17 - גלריה, שדרוג המלצות, ולידציית טופס, SEO
- [x] **דף גלריה חדש** (app/gallery/page.tsx) - גריד 3 עמודות דסקטופ, 2 טאבלט, 1 מובייל. 12 placeholder images עם gradients ו-overlay text. Lightbox/modal עם Radix Dialog. פילטר קטגוריות: סדנאות, אירועים, זוגיות, הכל
- [x] **שדרוג דף המלצות** - 8 כרטיסי המלצה עם שם, תפקיד, טקסט, דירוג כוכבים (1-5). לייאאוט מתחלף (שמאל/ימין) בדסקטופ. תוכן RTL עברי
- [x] **שדרוג טופס צור קשר** - ולידציית Zod לכל השדות. הודעות שגיאה inline בעברית. אנימציית הצלחה (animate-in fade-in zoom-in). מצב שגיאה עם כפתור "נסו שוב". סימון שדות חובה (*). spinner בזמן שליחה
- [x] **קבצי SEO** - public/sitemap.xml עם כל הדפים. public/robots.txt. Open Graph meta tags עם תמונה, locale, Twitter card בlayout.tsx
- [x] **לינק גלריה ב-Header** - נוסף לניווט הראשי ולתפריט מובייל
- [x] **TypeScript** - אפס שגיאות
- [x] **Build** - עובר בהצלחה (17 routes)

### סשן 2026-02-18 - אופטימיזציות ביצועים, נגישות, הכנה לדיפלוי
- [x] **OptimizedImage component** (src/components/OptimizedImage.tsx) - wrapper סביב next/image עם blur placeholder (shimmer SVG), lazy loading, sizes מתאימים, תמיכת WebP/AVIF
- [x] **Placeholder SVGs** (public/images/placeholders/) - 3 SVGs: workshop.svg, couple.svg, event.svg עם gradients מותאמים למותג
- [x] **Dynamic imports** - next/dynamic לטעינת HomeTestimonials בדף הבית (below-fold), הפחתת initial bundle
- [x] **Preconnect links** - dns-prefetch ו-preconnect ל-Google Fonts ו-Google Tag Manager ב-layout.tsx
- [x] **Caching headers** (next.config.ts) - static assets: immutable 1yr cache, _next/static: immutable cache
- [x] **Security headers** (next.config.ts) - X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, Content-Security-Policy
- [x] **Image optimization config** (next.config.ts) - AVIF+WebP formats, device sizes, image sizes
- [x] **Vercel deploy config** (vercel.json) - framework, region, clean URLs
- [x] **Accessibility: Newsletter forms** - כל טופסי הניוזלטר (דף בית, בלוג, footer) קיבלו label (sr-only), id, aria-label, autoComplete, required
- [x] **Accessibility: Gallery filter** - role="group" + aria-label + aria-pressed לכפתורי סינון
- [x] **Accessibility: Gallery items** - aria-label מתאר בעברית לכל פריט בגלריה
- [x] **Accessibility: Contact form** - focus-visible ring על select element
- [x] **Accessibility: Footer social links** - focus-visible ring על כפתורי רשתות חברתיות
- [x] **Accessibility: Gallery CTA** - שימוש ב-Link במקום <a> לניווט פנימי
- [x] **.env.example** - עדכון עם תיעוד מלא של כל משתני הסביבה
- [x] **TypeScript** - אפס שגיאות
- [x] **Build** - עובר בהצלחה (17 routes, no warnings)

### סשן 2026-02-18 (3) - Dynamic Sitemap, Robots, OG Tags per Page
- [x] **Dynamic sitemap.ts** (app/sitemap.ts) - החלפת static sitemap.xml בדינמי עם Next.js MetadataRoute.Sitemap. כולל את כל 7 הדפים הסטטיים + 6 מאמרי בלוג (13 URLs סה"כ)
- [x] **Dynamic robots.ts** (app/robots.ts) - החלפת static robots.txt בדינמי עם Next.js MetadataRoute.Robots
- [x] **הסרת קבצים סטטיים** - public/sitemap.xml ו-public/robots.txt הוסרו (הוחלפו בגרסאות דינמיות)
- [x] **OG tags - דף אודות** - openGraph עם title, description, url, locale, type
- [x] **OG tags - דף שירותים** - openGraph עם title, description, url, locale, type
- [x] **OG tags - דף המלצות** - openGraph עם title, description, url, locale, type
- [x] **OG tags - דף גלריה** - openGraph עם title, description, url, locale, type
- [x] **OG tags - דף צור קשר** - openGraph עם title, description, url, locale, type
- [x] **OG tags - דף בלוג** - openGraph עם title, description, url, locale, type + הוספת canonical URL חסר
- [x] **TypeScript** - אפס שגיאות
- [x] **Build** - עובר בהצלחה (19 routes כולל sitemap.xml ו-robots.txt דינמיים)

### סשן 2026-02-24 - דיפלוי, OG image דינמי, עדכון sitemap
- [x] **OG image דינמי** (app/opengraph-image.tsx) - Next.js edge runtime, עיצוב ממותג עם צבעי הלוגו, גרדיאנטים, וטקסט עברי RTL
- [x] **עדכון sitemap** - הוספת 3 דפים חדשים: course, book, resources (סה"כ 16 URLs)
- [x] **עדכון layout.tsx** - הפניית OG image לנתיב הדינמי /opengraph-image
- [x] **דיפלוי ל-Vercel** - Production: https://omanut-hakesher-website.vercel.app
- [x] **Build** - עובר בהצלחה (23 routes כולל opengraph-image)

## צעדים הבאים
1. תמונות אמיתיות (במקום gradient placeholders) - להשתמש ב-OptimizedImage component
2. לוגו מעוצב
3. הגדרת Resend API key אמיתי
4. הגדרת Google Analytics ID אמיתי
5. Loading states / Skeleton components
6. אנימציות כניסה עדינות (intersection observer)
7. בדיקת Lighthouse בפרודקשן (יעד: Performance > 90)
8. עדכון תאריך ופרטי סדנה חינמית בקומפוננט FreeWorkshopBanner
9. חיבור דומיין omanut-hakesher.co.il ל-Vercel

## החלטות שהתקבלו
- שימוש ב-npm (לא bun) בגלל בעיות ב-Windows
- Next.js 16 עם App Router
- Tailwind CSS 4 עם @theme inline
- פורט 3333 לפיתוח
- Heebo כפונט עברי ראשי
- חצים שמאלה (<-) לכיוון "קדימה" ב-RTL
- שימוש ב-logical properties (ms/me/ps/pe) במקום physical (ml/mr/pl/pr) לתמיכת RTL נכונה
- inline script ב-head למניעת הבהוב dark mode (לפני React hydration)
- metadata template pattern עבור כותרות דפים
- Zod לולידציית טפסים בצד לקוח עם הודעות שגיאה בעברית
- Radix Dialog ל-lightbox בגלריה (כבר מותקן כ-shadcn component)
- Security headers via next.config.ts headers() (לא middleware - deprecated ב-Next.js 16)
- OptimizedImage component עם blur shimmer placeholder ותמיכת AVIF/WebP
- Dynamic imports לקומפוננטות below-fold (HomeTestimonials, FreeWorkshopBanner)
- Vercel region: cdg1 (Paris, קרוב לישראל)
- Breadcrumbs component עם Schema.org BreadcrumbList structured data
- ScrollToTop ב-bottom-24 left-6 (מעל WhatsApp button)
- FreeWorkshopBanner עם countdown שמחשב אוטומטית את שבת ראשונה של חודש הבא
- FAQ accordion עם Radix Accordion (shadcn) בדף אודות

### סשן 2026-02-18 (2) - פיצ'רים אינטראקטיביים ושיפורי ניווט
- [x] **Course Preview אינטראקטיבי** (app/page.tsx) - שדרוג סקשן הקורסים עם כפתורי "למידע נוסף" (Button + Link), אייקוני שיעורים ומשך, hover effects עם border-primary/30, flex layout לכרטיסים
- [x] **FAQ אקורדיון** (components/AboutFAQ.tsx) - 8 שאלות ותשובות על המתודולוגיה. שימוש ב-Radix Accordion (קיים כ-shadcn component). נושאים: גישה טיפולית, משך תהליך, פגישת היכרות, טיפול יחיד, ייעוץ vs סדנה, אונליין, סודיות, מתי לפנות
- [x] **Breadcrumbs** (components/Breadcrumbs.tsx) - קומפוננטה אוניברסלית עם Schema.org structured data. נוספה לכל הדפים הפנימיים: אודות, שירותים, גלריה, המלצות, בלוג, מאמר בלוג (2 רמות), צור קשר
- [x] **Scroll-to-top** (components/ScrollToTop.tsx) - כפתור צף שמופיע אחרי גלילה של 300px. אנימציית opacity+translate, smooth scroll, נגיש עם aria-label
- [x] **Free Workshop CTA** (components/FreeWorkshopBanner.tsx) - באנר CTA עם countdown timer חי לסדנה הבאה. מחשב אוטומטית את השבת הקרובה של החודש הבא. mounted state למניעת hydration mismatch
- [x] **TypeScript** - אפס שגיאות
- [x] **Build** - עובר בהצלחה (17 routes)

## קבצים ששונו (סשן 2026-02-18, סבב 2)
- src/components/Breadcrumbs.tsx - חדש, קומפוננטת breadcrumbs עם Schema.org
- src/components/ScrollToTop.tsx - חדש, כפתור scroll-to-top
- src/components/FreeWorkshopBanner.tsx - חדש, באנר סדנה חינמית עם countdown
- src/components/AboutFAQ.tsx - חדש, אקורדיון שאלות נפוצות
- src/app/layout.tsx - הוספת ScrollToTop
- src/app/page.tsx - שדרוג Course Preview, הוספת FreeWorkshopBanner
- src/app/about/page.tsx - הוספת Breadcrumbs, AboutFAQ
- src/app/services/page.tsx - הוספת Breadcrumbs
- src/app/gallery/page.tsx - הוספת Breadcrumbs
- src/app/testimonials/page.tsx - הוספת Breadcrumbs
- src/app/blog/page.tsx - הוספת Breadcrumbs
- src/app/blog/[slug]/page.tsx - החלפת breadcrumb ידני ב-Breadcrumbs component
- src/app/contact/page.tsx - הוספת Breadcrumbs

## הערות לסשן הבא
- קרא CLAUDE.md ו-PROGRESS.md לפני התחלה
- בדוק npm run dev עובד (פורט 3333)
- דיפלוי ל-Vercel: `npx vercel` (vercel.json מוכן)
- לאחר דיפלוי: בדוק Lighthouse score (Performance > 90 target)
- כשתמונות אמיתיות מתקבלות: החלף gradients ב-OptimizedImage עם blur placeholders
- צור og-image.png (1200x630) לפני דיפלוי
- עדכן תאריך/פרטי סדנה חינמית ב-FreeWorkshopBanner כשפרטים אמיתיים מוכנים

## 2026-05-19 — content.eladjak.com subdomain LIVE + daily-rhythm staging
- next.config.ts: host-based rewrite content.eladjak.com → /content (excludes api|_next|favicon|content-sw)
- public/content-sw.js: PWA service worker; manifest start_url+scope changed `/content`→`"."` (works on apex + legacy path)
- .deploy-rhythm/: 6 files staged for Sprint 7.29 (broadcaster/closure-rollup/Box+Kaylee+Solis rhythm sections + inject-kami-rhythm.py)
- 26 modified files total (uncommitted) · backups: vercel.json + next.config.ts .pre-content-subdomain-20260519-183124.bak
- All 4 URLs verified 200 (`/`, `/ai-agents-4-hours`, `/manifest.webmanifest`, `/api/content?key=…`)
- CONTENT_REVIEW_KEY unchanged · zero commits pushed today (working tree dirty)

### 11.6.2026 — מעבר שיפורים רוחבי (Fable-5 sweep)
- tsc ✓0 · branch `chore/next-16.2.9-security` — next 16.1.6→16.2.9, build ירוק, ממתין ל-merge אחרי preview · חוב lint: 42 שגיאות (בעיקר <a>→<Link> בדפי book + setState-in-effect ב-7 קומפוננטות) — שינוי התנהגותי, לא בוצע באתר חי.
