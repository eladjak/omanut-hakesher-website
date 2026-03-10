# סטטוס פרויקט: אומנות הקשר

> **עדכון אחרון:** 2026-03-10
> **גרסה:** 4.1.0
> **סטטוס:** 85+ דפים, 22 כלים אינטראקטיביים, 3 Lead Magnets, נכסי מותג משולבים, build עובר
> **URL פרודקשן:** https://omanut-hakesher-website.vercel.app

---

## מה הושלם (v4.1 - מרץ 2026)

### Lead Magnets — /lead/ (חדש!) ✅
3 דפי נחיתה מעוצבים עם טפסי הרשמה:
- `/lead/23-reasons` — "23 הסיבות האמיתיות שאתה עדיין רווק/ה"
- `/lead/7-principles` — "7 עקרונות הזהב למציאת זוגיות"
- `/lead/36-questions` — "36 השאלות שיכולות ליצור אהבה"
- כל דף: hero image, 3 benefits, טופס הרשמה, WhatsApp חלופי, תצוגה מקדימה
- ⚠️ טפסים ויזואליים בלבד — ממתין לחיבור Responder

### ניקוי דפים ישנים ✅
- `/services` → redirect ל-`/coaching`
- `/gallery` → redirect ל-`/testimonials`
- `/resources` → redirect ל-`/blog`
- `/course` → redirect ל-`/hadrech`
- תוקנו הפניות ב-`not-found.tsx` ו-`FreeWorkshopBanner.tsx`

### שילוב נכסי מותג אמיתיים בדפים ✅
- פודקאסט: כריכה אמיתית מ-Apple + תמונות פרקים ep1-ep6
- אודות: תמונות אלעד אמיתיות (ohlove-photo-1, ohlove-photo-3)
- ליווי אישי: תמונות שירותים אמיתיות + תמונת אלעד
- דף בית: תמונות YouTube testimonials אמיתיות

### דף פרטיות עודכן ✅
- הוספת סעיף Supabase (כלים אינטראקטיביים)
- הוספת סעיף תוצאות כלים (ללא זיהוי אישי)

### Supabase אינטגרציה ✅
- `src/lib/supabase.ts` — client setup
- כריכת ספר אמיתית (v2-path, מנצחת קבוצת מיקוד)

### סקשן הספר — /book/ (Sprint 1-4) ✅
22 כלים אינטראקטיביים פועלים, מחולקים לפי פרקים:

| פרק | כלים פעילים | סוג |
|-----|------------|-----|
| הקדמה | readiness-quiz | שאלון |
| 1 - מסע פנימי | story-quiz, four-a-day | שאלון, אינטראקטיבי |
| 2 - אמונות | fear-map | שאלון |
| 5 - הכרת עצמי | attachment-quiz, who-am-i | שאלון, אינטראקטיבי |
| 6 - רגשות | emotion-wheel | אינטראקטיבי |
| 8 - דייטים | attraction-map, courage-tracker | שאלון, אינטראקטיבי |
| 9 - היכרויות | date-report, profile-photo | אינטראקטיבי |
| 11 - כימיה | connection-score, chemistry-quiz, chance-calculator | שאלון, אינטראקטיבי |
| 12 - אינטימיות | 36-questions, vulnerability-stage | אינטראקטיבי |
| 13 - מחויבות | fear-map, readiness-quiz | שאלון |
| סיום | future-letter, readiness-retest | אינטראקטיבי, שאלון |

### מערכת הזדהות לספר ✅
### עיצוב מותאם-מגדר ✅
### תמונות Gemini — 22 תמונות ✅
### תוכן אותנטי ✅
### Footer + WhatsApp עדויות ✅
### פריסת Vercel ✅

---

## Git History

### v4.1 (10.03.2026)
- `ba7983c` — feat: add Supabase integration + real book cover from focus group winner
- (pending commit) — feat: lead magnets, old page redirects, brand assets integration

### v4.0 (10.03.2026)
- `bce3a16` — feat: add brand assets, media thumbnails, product images + fix build deps

### v3.5 (10.03.2026)
- `4285a86` — feat: add 6 more interactive tools (chemistry, commitment, daily practice)
- `0eb159b` — feat: add connection-score, vulnerability-stage, attraction-map quizzes
- `875bc1e` — feat: add 36-questions, date-report, courage-tracker tools
- `05f4317` — feat: add story-quiz, fear-map, emotion-wheel interactive tools
- `a7a2c79` — feat: add future-letter page + real book cover on landing
- `5fcd81a` — fix: add 8 missing tools to chapters.ts (sync with book QR codes)
- `c922a81` — feat: add access code authentication system for book section

### v3.0 (03.03.2026)
- Gender-adaptive design, 22 Gemini images, WhatsApp testimonials

---

## TODO — מה נשאר

### ממתין לקלט מאלעד (חסום)
- [ ] **Google Analytics** — Measurement ID (G-XXXXXXXXXX)
- [ ] **דומיין**: ohlove.co.il → Vercel
- [ ] **Responder** — API key + רשימות לחיבור Lead Magnets
- [ ] **RavMeser תוכן** — ייצוא ידני מהאדמין
- [ ] **תמונות Canva**: תמונות עם שגיא
- [ ] **YouCanBookMe** — ווידג'ט הזמנות (חשבון + Booking URL)

### כלים comingSoon (15 כלים)
**5 אינטראקטיביים (ניתן לביצוע עצמאי):**
- פרק 3: boundaries-quiz, self-worth-letter, values-exercise
- פרק 4: nvc-practice
- פרק 10: love-languages-quiz

**5 אודיו (צריך הקלטה מאלעד):**
- פרק 1: morning-audio
- פרק 2: beliefs-audio
- פרק 4: communication-audio
- פרק 10: intimacy-conversation
- פרק 13: future-meditation

**3 PDF (צריך אישור על תוכן):**
- פרק 6: feelings-inventory
- פרק 7: readiness-checklist, first-message-templates

**2 וידאו (צריך צילום):**
- פרק 9: photo-tips
- פרק 13: the-choice

### מסמך סקירה
- `.claude/REVIEW-FOR-ELAD.html` — מסמך מעוצב עם כל המשימות החסומות + צעדים מפורטים

---

## סנכרון 3 פרויקטים

| פרויקט | סטטוס | כריכות | QR/Tools |
|--------|--------|--------|----------|
| **ספר** (book) | v7.0, ציון 9.18/10 | 15 כריכות | 29 QR codes |
| **קורס** (course) | 98%, 73 תסריטים | — | — |
| **אתר** (website) | v4.1, 85+ דפים | כריכה v2-path | 22 כלים + 3 Lead Magnets |

**Design language מיושר**: #E85D75, #1E3A5F, #D4A853, Heebo, radius 0.75rem

---

## טכנולוגיות
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase (כלים אינטראקטיביים)
- npm (לא bun — בעיות Windows)
- Vercel לדיפלוי
- פורט פיתוח: 3333

## קבצי מפתח

| קובץ | תיאור |
|------|-------|
| `.claude/PROJECT_STATUS.md` | אתה כאן |
| `.claude/REVIEW-FOR-ELAD.html` | מסמך סקירה מעוצב |
| `.claude/MANUAL_STEPS_GUIDE.html` | מדריך RavMeser + GA4 |
| `src/data/book/chapters.ts` | מודל נתונים — 15 פרקים, 29+ כלים |
| `src/app/lead/` | 3 דפי Lead Magnets |
| `src/components/book/` | כל קומפוננטות הספר |
| `src/components/GenderProvider.tsx` | Context מגדר |
| `src/lib/supabase.ts` | Supabase client |
| `public/images/generated/` | 22 תמונות Gemini |
| `public/assets/` | נכסי מותג (brand, media, products) |
| `.vercelignore` | מוציא תמונות גדולות מדיפלוי |
