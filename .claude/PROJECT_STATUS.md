# סטטוס פרויקט: אומנות הקשר

> **עדכון אחרון:** 2026-02-15
> **גרסה:** 1.1.0
> **סטטוס:** MVP הושלם + שיפורי נגישות/SEO - מוכן לדיפלוי

---

## מטרת הפרויקט

בניית אתר מקצועי ומרשים לאומנות הקשר - עסק בתחום הזוגיות והתקשורת.

---

## מה הושלם

### שלב 1: אתחול הפרויקט
- [x] יצירת פרויקט Next.js 16+ עם App Router
- [x] הגדרת TypeScript
- [x] הגדרת Tailwind CSS 4
- [x] פורט ייחודי: **3333** (לא מתנגש עם פרויקטים אחרים)

### שלב 2: תשתית בסיסית
- [x] Layout עם RTL מלא לעברית
- [x] פונט Heebo (עברית)
- [x] פלטת צבעים חמים (טרקוטה, ירוק מרווה, זהב)
- [x] Header responsive עם תפריט מובייל
- [x] Footer עם לינקים לרשתות חברתיות

### שלב 3: דפים
- [x] **דף בית** - Hero, Features, Services Preview, Testimonials, CTA
- [x] **אודות** - סיפור, ערכים, גישה
- [x] **שירותים** - ייעוץ זוגי, סדנאות, ליווי אישי, אונליין
- [x] **המלצות** - 8 המלצות + סטטיסטיקות
- [x] **בלוג** - רשימת מאמרים + 6 מאמרים מלאים
- [x] **צור קשר** - טופס + פרטי התקשרות
- [x] **דף 404** - עמוד שגיאה מעוצב עם לינקים לדפים עיקריים

### שלב 4: פונקציונליות
- [x] טופס יצירת קשר עם validation
- [x] API route לשליחת טופס (Resend)
- [x] Google Analytics מובנה
- [x] SEO metadata לכל דף + canonical URLs
- [x] קישורים פנימיים תקינים
- [x] **כפתור WhatsApp צף** - עם אנימציה ולייבל בדסקטופ

### שלב 5: נגישות (WCAG)
- [x] Skip to content link
- [x] aria-label ו-aria-current על לינקים
- [x] aria-expanded ו-aria-controls לתפריט מובייל
- [x] סגירת תפריט ב-Escape
- [x] מניעת גלילה כשתפריט מובייל פתוח
- [x] prefers-reduced-motion support
- [x] Focus visible styles

### שלב 6: SEO
- [x] Metadata template pattern לכותרות
- [x] Canonical URLs לכל הדפים
- [x] OpenGraph metadata
- [x] Schema.org JSON-LD (Organization + Breadcrumb)
- [x] Robots metadata

### שלב 7: Dark Mode
- [x] Inline script למניעת הבהוב (FOUC)
- [x] Selection colors בהתאמה ל-dark mode
- [x] Image brightness adjustment
- [x] Full color system for light + dark

### שלב 8: תוכן
- [x] 6 מאמרי בלוג מלאים בעברית:
  1. 5 עקרונות לתקשורת זוגית אפקטיבית
  2. איך להפוך ויכוח לשיחה בונה
  3. בניית קרבה רגשית בזוגיות
  4. אמנות ההקשבה הפעילה
  5. זמן איכות בעידן הדיגיטלי
  6. איך לבקש את מה שאני צריך/ה

---

## מבנה הפרויקט

```
omanut-hakesher-website/
├── .claude/
│   └── PROJECT_STATUS.md    <- אתה כאן!
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── testimonials/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   └── api/contact/route.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ContactForm.tsx
│   │   ├── GoogleAnalytics.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── WhatsAppButton.tsx
│   │   ├── SkipToContent.tsx
│   │   ├── JsonLd.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── separator.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   └── lib/
│       ├── blog-posts.ts
│       └── utils.ts
├── .env.example
├── .env.local
├── package.json
└── CLAUDE.md
```

---

## פקודות חשובות

```bash
# פיתוח
npm run dev          # http://localhost:3333

# בנייה
npm run build

# בדיקת TypeScript
npx tsc --noEmit

# דיפלוי
npx vercel
```

---

## מה נשאר לעשות (אופציונלי)

### עדיפות גבוהה
- [ ] תמונות אמיתיות (במקום gradient placeholders)
- [ ] לוגו מעוצב
- [ ] הגדרת Resend API key אמיתי
- [ ] הגדרת Google Analytics ID אמיתי
- [ ] דיפלוי ל-Vercel

### עדיפות בינונית
- [ ] Loading states / Skeleton components
- [ ] אנימציות כניסה עדינות (intersection observer)
- [ ] מערכת ניהול תוכן (CMS)
- [ ] Newsletter subscription (Mailchimp/ConvertKit)

### עדיפות נמוכה
- [ ] לוח זמנים לקביעת פגישות (Calendly)
- [ ] צ'אט חי
- [ ] גרסה באנגלית

---

## משתני סביבה להגדרה

קובץ `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=hello@omanut-hakesher.co.il
```

---

## היסטוריית שינויים

### 2026-02-15 - גרסה 1.1.0
- דף 404 מעוצב
- כפתור WhatsApp צף
- מניעת הבהוב dark mode (inline script)
- Skip to content link (WCAG)
- Schema.org JSON-LD (Organization + Breadcrumb)
- שיפור SEO metadata (template, canonical, robots)
- שדרוג דף בלוג (featured post, Shadcn components)
- שדרוג נגישות Header (aria attributes, Escape close, scroll lock)
- Reduced motion support
- שיפורי dark mode (selection, image brightness)

### 2026-02-13 - תיקוני RTL
- תיקון כיווני חצים ב-RTL
- תיקון margins/padding ל-logical properties

### 2026-02-02 - גרסה 1.0.0
- אתחול פרויקט Next.js
- בניית כל הדפים
- יצירת מערכת בלוג עם 6 מאמרים
- חיבור טופס יצירת קשר ל-API
- הוספת Google Analytics
- הגדרת פורט ייחודי 3333

---

## המשך עבודה

כשחוזרים לפרויקט:
1. קרא קובץ זה
2. בדוק `npm run dev` עובד (פורט 3333)
3. המשך מרשימת ה-TODO למעלה
4. עדכן קובץ זה בסיום כל איטרציה
