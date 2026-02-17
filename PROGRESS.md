# אתר אומנות הקשר - התקדמות

## סטטוס: in_progress
## עדכון אחרון: 2026-02-18

## מצב נוכחי
האתר בנוי ועובד. MVP הושלם כולל כל הדפים (בית, אודות, שירותים, גלריה, המלצות, בלוג, צור קשר). בוצע סקר RTL/Hebrew ותיקונים. Build עובר ללא שגיאות. TypeScript נקי. נוספו שיפורי נגישות, SEO, dark mode, דף 404, וכפתור WhatsApp צף. נוסף דף גלריה עם lightbox ופילטר קטגוריות, שודרג דף המלצות עם דירוג כוכבים ולייאאוט מתחלף, שודרג טופס צור קשר עם ולידציית Zod והודעות שגיאה בעברית, ונוספו קבצי SEO (sitemap.xml, robots.txt, OG meta). בוצעו אופטימיזציות ביצועים, שיפורי נגישות, והכנה לדיפלוי.

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

## צעדים הבאים
1. תמונות אמיתיות (במקום gradient placeholders) - להשתמש ב-OptimizedImage component
2. לוגו מעוצב
3. הגדרת Resend API key אמיתי
4. הגדרת Google Analytics ID אמיתי
5. דיפלוי ל-Vercel (vercel.json מוכן)
6. Loading states / Skeleton components
7. אנימציות כניסה עדינות (intersection observer)
8. יצירת og-image.png (1200x630) לשיתוף ברשתות חברתיות
9. בדיקת Lighthouse בפרודקשן (יעד: Performance > 90)

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
- Dynamic imports לקומפוננטות below-fold (HomeTestimonials)
- Vercel region: cdg1 (Paris, קרוב לישראל)

## קבצים ששונו (סשן 2026-02-18)
- src/components/OptimizedImage.tsx - קומפוננטה חדשה לתמונות אופטימליות
- src/components/HomeTestimonials.tsx - קומפוננטת המלצות לדף הבית (נפרדה ל-dynamic import)
- src/app/page.tsx - dynamic import ל-HomeTestimonials, הסרת data מקומי, שיפור נגישות ניוזלטר
- src/app/layout.tsx - preconnect links ל-Google Fonts/GTM
- src/app/blog/page.tsx - שיפור נגישות טופס ניוזלטר
- src/app/gallery/page.tsx - שיפורי נגישות: aria-pressed, aria-label, Link
- src/components/Footer.tsx - שיפור נגישות: labels לניוזלטר, focus-visible לכפתורים חברתיים
- src/components/ContactForm.tsx - שיפור focus-visible ל-select
- next.config.ts - image optimization, caching headers, security headers
- vercel.json - חדש, הגדרות Vercel deploy
- .env.example - עדכון עם תיעוד מלא
- public/images/placeholders/workshop.svg - placeholder SVG לגלריה
- public/images/placeholders/couple.svg - placeholder SVG לגלריה
- public/images/placeholders/event.svg - placeholder SVG לגלריה

## הערות לסשן הבא
- קרא CLAUDE.md ו-PROGRESS.md לפני התחלה
- בדוק npm run dev עובד (פורט 3333)
- דיפלוי ל-Vercel: `npx vercel` (vercel.json מוכן)
- לאחר דיפלוי: בדוק Lighthouse score (Performance > 90 target)
- כשתמונות אמיתיות מתקבלות: החלף gradients ב-OptimizedImage עם blur placeholders
- צור og-image.png (1200x630) לפני דיפלוי
