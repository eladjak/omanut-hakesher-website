# אתר אומנות הקשר - התקדמות

## סטטוס: in_progress
## עדכון אחרון: 2026-02-15

## מצב נוכחי
האתר בנוי ועובד. MVP הושלם כולל כל הדפים (בית, אודות, שירותים, המלצות, בלוג, צור קשר). בוצע סקר RTL/Hebrew ותיקונים. Build עובר ללא שגיאות. TypeScript נקי. נוספו שיפורי נגישות, SEO, dark mode, דף 404, וכפתור WhatsApp צף.

## מה בוצע
- [x] MVP מלא: 6 דפים + בלוג עם 6 מאמרים + טופס צור קשר
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

## צעדים הבאים
1. תמונות אמיתיות (במקום gradient placeholders)
2. לוגו מעוצב
3. הגדרת Resend API key אמיתי
4. הגדרת Google Analytics ID אמיתי
5. דיפלוי ל-Vercel
6. Loading states / Skeleton components
7. אנימציות כניסה עדינות (intersection observer)

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

## קבצים ששונו (סשן 2026-02-15)
- src/app/layout.tsx - הוספת WhatsApp, SkipToContent, JsonLd, dark mode script, SEO metadata
- src/app/not-found.tsx - דף 404 חדש
- src/app/blog/page.tsx - שדרוג עיצוב עם Shadcn components ופוסט מוביל
- src/app/blog/[slug]/page.tsx - breadcrumb JSON-LD, נגישות, Shadcn components
- src/app/about/page.tsx - metadata template, canonical URL
- src/app/services/page.tsx - metadata template, canonical URL
- src/app/testimonials/page.tsx - metadata template, canonical URL
- src/app/contact/page.tsx - metadata template, canonical URL
- src/app/globals.css - reduced motion, dark mode selection, image brightness
- src/components/Header.tsx - נגישות, Escape close, body scroll lock, aria attributes
- src/components/WhatsAppButton.tsx - קומפוננטה חדשה
- src/components/SkipToContent.tsx - קומפוננטה חדשה
- src/components/JsonLd.tsx - קומפוננטה חדשה (Organization + Breadcrumb)

## הערות לסשן הבא
- קרא CLAUDE.md ו-PROJECT_STATUS.md לפני התחלה
- בדוק npm run dev עובד (פורט 3333)
- התמקד בהחלפת placeholder gradients בתמונות אמיתיות
- שקול הוספת אנימציות כניסה עם intersection observer
- שקול הוספת loading skeletons לשיפור CLS
