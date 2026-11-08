# אתר אומנות הקשר - התקדמות

## סטטוס: deployed · Sumit checkout + 6 commerce/event pages · nav rewired · webhook→RavMesser tagging · Phase 1+2+3a הושלמו (preview)
## עדכון אחרון: 2026-05-15

### Session 2026-05-15 — Autonomous Phase-3a (nav + index + webhook tagging)
מטרה: כל מה שאפשר להשלים לבד בלי לחכות לאלעד. בוצע:

- ✅ **Header nav** (`src/components/Header.tsx`): נוסחה מחדש. הוחלף `/hadrech` ל-`/programs/the-way`, `/coaching` ל-`/coaching/vip`, נוסף `/club`. ה-CTA "שיחת היכרות חינם" עובר ל-`/coaching/book` (במקום `/coaching`)
- ✅ **`/coaching/page.tsx`**: `BOOKING_URL` עודכן מ-`/contact` ל-`/coaching/book` (4 כפתורים בעמוד)
- ✅ **`/programs/page.tsx`** — דף קטלוג: 5 כרטיסי מוצרים, פילטר אוטומטי מ-`listProducts()`, CTA ל-`/coaching/book`
- ✅ **`/products/page.tsx`** + **`/events/page.tsx`** — redirect לפריט היחיד (מונע 404 בכניסה ישירה לרמת-האב)
- ✅ **Sumit webhook** הורחב (`src/app/api/sumit/webhook/route.ts`):
  - Idempotency in-memory (Map, last 1000, מנקה הכי-ישן ברכישת ה-1001)
  - חילוץ `slug` מ-`ExternalIdentifier` (תבנית `${slug}-${ts}-${rand}`)
  - על Status=Success/Paid/Completed/Approved → קריאה ל-`subscribeToList` עם `product.ravMesserTag` + `source:purchase` + customFields (product/payment_id/amount_ils/purchased_at). שירות master 22958
  - Fire-and-forget tagging — לא חוסם את התגובה ל-Sumit (חייב <3s)
- ✅ **TypeScript: 0 שגיאות. Build: עובר** — 97 דפים סטטיים (היה 94)

**מצב פרודקשן עכשיו:**
- Nav מצביע על דפי commerce חדשים בכל הדסקטופ והמובייל
- מבקרים שמגיעים ל-`/programs`, `/products`, `/events` מקבלים דף תקין
- כל חיוב ב-Sumit אוטומטית מתייג את הקונה ב-Rav-Messer עם תיוג מוצר ייעודי לסגמנטציה
- Sumit recurring (`/club` חידוש חודשי), Supabase orders, ו-abandoned-cart נשארו ל-Phase 3b (דורש החלטה על schema + production tokens)

**עדיין חסום על אלעד:**
1. `NEXT_PUBLIC_YCBM_URL` — `/coaching/book` נראה fallback וואטסאפ עד שמוגדר
2. Sumit production API token + webhook secret ל-Vercel
3. אישור scope + URL ב-Sumit admin

### Session 2026-05-14 — Sumit checkout scaffold + INVENTORY + The Way template
מטרת הסשן: סקרייפינג 9 דפי רב-מסר + בניה מחדש + חיבור Sumit. הסקרייפינג חסום (Cloudflare 403, אין ארכיב Wayback), אבל הניתוח הקיים ב-`.claude/LANDING_PAGES_ANALYSIS.md` משמש מקור אמת. נבנתה תשתית מלאה לתשלומים + דף מוצר ראשון.

- ✅ `INVENTORY.md` — מפת דרכים שלמה: 9 דפים, 6 ל-rebuild + 3 lead-magnets קיימים, מצב סקרייפינג, החלטות (Sumit לא Stripe, YouCanBookMe לא booking מותאם, כתבות ב-eladjak.com לא דומיין חדש)
- ✅ `src/lib/sumit.ts` — לקוח Sumit מצומצם: `createCheckout()` עוטף `POST /billing/payments/beginredirect/` (תוכנית hosted-checkout); `verifyWebhookSignature()` HMAC-SHA256 דרך Web Crypto
- ✅ `src/lib/products.ts` — קטלוג מוצרים: 5 מוצרי-עזר (the-way, the-way-plus, dating-card, club-90d, vip-coaching) + `formatILS()` עזר
- ✅ `src/app/api/checkout/route.ts` — POST: ולידציה (שם/אימייל/טלפון), קריאת Sumit, החזרת `redirectUrl`. Dev-fallback ל-`/thanks?dev=1` כשהקרדים חסרים
- ✅ `src/app/api/sumit/webhook/route.ts` — POST: ולידציית חתימה (חובה בפרודקשן), לוג. TODO ב-Phase 3: Supabase orders table + tag ב-Rav-Messer
- ✅ `src/components/CheckoutForm.tsx` — טופס client component: שם+אימייל+טלפון, ולידציה, redirect ל-Sumit
- ✅ `src/app/programs/the-way/page.tsx` — דף מוצר ראשון: Hero, 6 שלבי השיטה, מה כלול, טופס תשלום inline, התנגדויות, CTA סופי. תבנית להעתקה ל-4 דפים נוספים
- ✅ `.env.example` — `SUMIT_COMPANY_ID/API_TOKEN/MODE/WEBHOOK_SECRET`
- ✅ `sitemap.ts` — `/programs/the-way` בעדיפות 0.95
- ✅ **TypeScript: 0 שגיאות. Build: עובר** (47+1 routes כולל `/api/checkout`, `/api/sumit/webhook`, `/programs/the-way`)

**Sumit credentials:** קיימים ב-`~/.claude/secrets/keyvault/sumit.env` (sandbox). Company ID 1874985196. בפרודקשן צריך:
1. להעלות `SUMIT_COMPANY_ID`, `SUMIT_API_TOKEN`, `SUMIT_MODE=production` ל-Vercel
2. להחליף ל-API token של פרודקשן (לא sandbox)
3. להגדיר webhook URL ב-Sumit admin: `https://omanut-hakesher.co.il/api/sumit/webhook` + לקבל webhook secret + להעלות אותו

**בלוקרים פתוחים:**
- 6 דפי RavMesser שלא נסרקו — תוכן הקופי בנוי לפי `LANDING_PAGES_ANALYSIS.md` (סיכום קיים, לא הקופי המדויק). לפיקסל-פרפקט: אלעד צריך לייצא PDF/screenshot מהאדמין של RavMesser
- YouCanBookMe URL — לא הוגדר עדיין
- Production Sumit API token (כרגע sandbox)

**Phase 2 (זה הסשן, ״רוץ על הכל״):**
- ✅ `/programs/the-way-plus` (₪2,970) — value-stack מלא: 6 רכיבים + 8 בונוסים, anchor ₪12,420 → ₪2,970
- ✅ `/products/dating-card` (₪97) — 4 צעדים + 5 רכיבים בכרטיס + 3 בונוסים
- ✅ `/club` — מועדון 90D: ₪4 חודש ראשון דרך Sumit, חידוש חודשי ידני (Phase 3 — recurring API)
- ✅ `/coaching/vip` — ליווי VIP: 4 ערכי מפתח, fit/no-fit, 3 tiers שקופים (₪6K-50K), CTA ל-/coaching/book
- ✅ `/coaching/book` — דף תיאום שיחה: iframe של YouCanBookMe (env `NEXT_PUBLIC_YCBM_URL`), fallback וואטסאפ
- ✅ `/events/love-event` — RSVP חינמי דרך `/api/lead/subscribe` עם slug `love-event-rsvp`
- ✅ `/events/love-event/confirmed` — דף אישור אחרי הרשמה
- ✅ `/checkout/success` — דף אישור post-payment (לא לערבב עם `/thanks` שהוא דף "תודות לאנשים")
- ✅ `lead-magnets.ts` הורחב עם `love-event-rsvp`
- ✅ sitemap עודכן עם כל 7 הדפים החדשים
- ✅ **TypeScript: 0 שגיאות. Build עובר: 94 דפים סטטיים, כולל 4 API routes**

**מבנה Sumit checkout (ניזכר):**
1. משתמש מקליק ״המשך לתשלום״ → `POST /api/checkout` עם slug+name+email+phone
2. השרת קורא ל-Sumit `POST /billing/payments/beginredirect/` → מקבל hosted-checkout URL
3. הלקוח מועבר ל-Sumit, משלם בכרטיס/ביט, מקבל חשבונית מס/קבלה אוטומטית
4. Sumit מפנה חזרה ל-`/checkout/success?product=X&OG-PaymentID=...&OG-ExternalIdentifier=order-id`
5. במקביל Sumit שולח webhook ל-`/api/sumit/webhook` עם HMAC חתום
6. (Phase 3) Webhook → Supabase orders + Rav-Messer tag + abandoned-cart sequence

**מצב המוצרים בפרודקשן (Vercel):**
| מוצר | Route | מצב Sumit | חוסם |
|---|---|---|---|
| The Way | `/programs/the-way` | מוכן לבדיקה sandbox | ⏳ Sumit API token לפרודקשן |
| The Way + Gym | `/programs/the-way-plus` | מוכן | ⏳ |
| Dating Card | `/products/dating-card` | מוכן | ⏳ |
| Club 90D | `/club` | חיוב חד-פעמי ראשון בלבד | ⏳ recurring API + Sumit prod |
| VIP Coaching | `/coaching/vip` | booking-only (לא Sumit) | ⏳ YouCanBookMe URL |
| Love Event | `/events/love-event` | Rav-Messer בלבד | ✅ (תוכן זמין) |

**Phase 3 (סשן הבא):**
- העלאת `SUMIT_*` ל-Vercel production (API token חדש, לא sandbox)
- הגדרת Sumit webhook ב-admin → קבלת `SUMIT_WEBHOOK_SECRET`
- בדיקת end-to-end עם כרטיס בדיקה — קניית `the-way` ב-sandbox
- חיבור webhook ל-Supabase orders table
- Sumit recurring API ל-/club (אחרי החיוב הראשון)
- `NEXT_PUBLIC_YCBM_URL` ל-Vercel — לאחר שאלעד שולח את הקישור
- Navigation header: לינקים ל-`/programs/the-way`, `/club`, `/coaching/vip`
- כתבות אישיות: cross-link מ-`/blog/*` ל-eladjak.com (משימה נפרדת ב-eladjak-hub repo)

**שאלות חוזרות לאלעד:**
1. YouCanBookMe URL הסופי?
2. Sumit production API token (מתחלף מ-sandbox)
3. אישור Sumit Company ID לפרודקשן זהה ל-1874985196
4. אישור scopes ל-Sumit webhook + URL ב-admin
5. PDF/screenshots מ-RavMesser לדפי המקור (לפיקסל-פרפקט) — אופציונלי, הקופי הנוכחי מבוסס על LANDING_PAGES_ANALYSIS.md

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
