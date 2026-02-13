# 📊 סטטוס פרויקט: אומנות הקשר

> **עדכון אחרון:** 2026-02-02
> **גרסה:** 1.0.0
> **סטטוס:** ✅ MVP הושלם - מוכן לדיפלוי

---

## 🎯 מטרת הפרויקט

בניית אתר מקצועי ומרשים לאומנות הקשר - עסק בתחום הזוגיות והתקשורת.

---

## ✅ מה הושלם

### שלב 1: אתחול הפרויקט
- [x] יצירת פרויקט Next.js 14+ עם App Router
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

### שלב 4: פונקציונליות
- [x] טופס יצירת קשר עם validation
- [x] API route לשליחת טופס (Resend)
- [x] Google Analytics מובנה
- [x] SEO metadata לכל דף
- [x] קישורים פנימיים תקינים

### שלב 5: תוכן
- [x] 6 מאמרי בלוג מלאים בעברית:
  1. 5 עקרונות לתקשורת זוגית אפקטיבית
  2. איך להפוך ויכוח לשיחה בונה
  3. בניית קרבה רגשית בזוגיות
  4. אמנות ההקשבה הפעילה
  5. זמן איכות בעידן הדיגיטלי
  6. איך לבקש את מה שאני צריך/ה

---

## 📁 מבנה הפרויקט

```
omanut-hakesher-website/
├── .claude/
│   └── PROJECT_STATUS.md    ← אתה כאן!
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
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
│   │   └── GoogleAnalytics.tsx
│   └── lib/
│       └── blog-posts.ts
├── .env.example
├── .env.local
├── package.json
└── CLAUDE.md
```

---

## 🔧 פקודות חשובות

```bash
# פיתוח
npm run dev          # http://localhost:3333

# בנייה
npm run build

# דיפלוי
npx vercel
```

---

## ⏳ מה נשאר לעשות (אופציונלי)

### עדיפות גבוהה
- [ ] תמונות אמיתיות (במקום gradient placeholders)
- [ ] לוגו מעוצב
- [ ] הגדרת Resend API key אמיתי
- [ ] הגדרת Google Analytics ID אמיתי
- [ ] דיפלוי ל-Vercel

### עדיפות בינונית
- [ ] דף 404 מעוצב
- [ ] Loading states
- [ ] אנימציות כניסה עדינות
- [ ] WhatsApp floating button
- [ ] Schema.org structured data

### עדיפות נמוכה
- [ ] מערכת ניהול תוכן (CMS)
- [ ] Newsletter subscription (Mailchimp/ConvertKit)
- [ ] לוח זמנים לקביעת פגישות (Calendly)
- [ ] צ'אט חי
- [ ] גרסה באנגלית

---

## 🔑 משתני סביבה להגדרה

קובץ `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=hello@omanut-hakesher.co.il
```

---

## 📝 היסטוריית שינויים

### 2026-02-02 - גרסה 1.0.0
- אתחול פרויקט Next.js
- בניית כל הדפים
- יצירת מערכת בלוג עם 6 מאמרים
- חיבור טופס יצירת קשר ל-API
- הוספת Google Analytics
- הגדרת פורט ייחודי 3333

---

## 🛠️ תזכורת: יכולות זמינות

### מתיקיית הבית (~/.claude/)

**כללים (rules/):**
- `agents.md` - אורכסטרציית סוכנים
- `browser-testing.md` - בדיקות דפדפן
- `codebase-exploration.md` - חקירת קוד
- `coding-style.md` - סגנון קוד
- `documentation-mcps.md` - Context7 + Octocode
- `error-handling.md` - better-result
- `git-workflow.md` - עבודה עם Git
- `hooks.md` - מערכת hooks
- `patterns.md` - דפוסי קוד
- `performance.md` - ביצועים
- `security.md` - אבטחה
- `self-check.md` - בדיקות עצמיות
- `testing.md` - בדיקות
- `tool-reference.md` - עזר לכלים

**סוכנים (agents/):**
- planner, architect, tdd-guide
- code-reviewer, security-reviewer
- build-error-resolver, e2e-runner
- refactor-cleaner, doc-updater

**MCPs זמינים:**
- Context7 - תיעוד ספריות
- Octocode - קוד אמיתי מ-GitHub
- DeepWiki - תיעוד repos
- Ultracite - linting rules
- Better Auth - אימות
- ועוד רבים...

**Skills מרכזיים:**
- `/commit` - יצירת commit
- `/pr` - יצירת PR
- `/plan` - תכנון משימה
- `/test` - יצירת בדיקות
- `/review` - סקירת קוד
- `/debug` - דיבוג
- `/tdd` - פיתוח מונחה בדיקות

---

## 🚀 המשך עבודה

כשחוזרים לפרויקט:
1. קרא קובץ זה
2. בדוק `npm run dev` עובד (פורט 3333)
3. המשך מרשימת ה-TODO למעלה
4. עדכן קובץ זה בסיום כל איטרציה
