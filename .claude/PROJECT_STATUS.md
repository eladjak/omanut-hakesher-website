# סטטוס פרויקט: אומנות הקשר

> **עדכון אחרון:** 2026-03-10
> **גרסה:** 4.0.0
> **סטטוס:** 82 דפים, 22 כלים אינטראקטיביים, נכסי מותג, build עובר
> **URL פרודקשן:** https://omanut-hakesher-website.vercel.app

---

## מה הושלם (v4.0 - מרץ 2026)

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
- Access code authentication (קוד גישה בתוך הספר)
- Layout wrapper לכל סקשן /book/

### נכסי מותג ✅ (v4.0)
- `public/assets/brand/` (2.2MB) — 16 קבצים: לוגו, אייקונים חברתיים, כיסוי פודקאסט
- `public/assets/media/` (1.7MB) — 19 קבצים: תמונות פודקאסט (12 פרקים), YouTube (7)
- `public/assets/products/` (5.6MB) — 9 קבצים: קורסים, שירותים, תוכנית נשים
- `public/assets/MANIFEST.md` — תיעוד מלא של הנכסים
- `public/assets/elad-photos/` (187MB) — מקומי בלבד (.gitignore), לא ב-git

### עיצוב מותאם-מגדר ✅
- [x] GenderProvider.tsx — Context + localStorage + CSS class
- [x] WelcomeModal.tsx — מודל בביקור ראשון
- [x] GenderedText.tsx — טקסטים מותאמי-מגדר
- [x] gendered-content.ts — 30+ מפתחות עברית
- [x] Flash-prevention script

### תמונות Gemini — 22 תמונות ✅
- כל 11 דפים עם hero images
- Pattern: `<Image fill>` + overlay `bg-foreground/65-70` + טקסט לבן

### תוכן אותנטי ✅
- [x] הסרת כל ה-emojis (SVG icons)
- [x] טלפון: 051-251-8025
- [x] פודקאסט Spotify + SoundCloud
- [x] 461 זוגות (נתון אמיתי)

### Footer + WhatsApp עדויות ✅

### פריסת Vercel ✅
- `.vercelignore` מוגדר (מוציא תמונות גדולות)
- Build עובר (82 דפים, 0 שגיאות)

---

## Git History (30 commits)

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
- `3f86f57` — feat: add who-am-i quiz
- `25793aa` — feat: add readiness retest quiz

### v3.0 (03.03.2026)
- Gender-adaptive design, 22 Gemini images, WhatsApp testimonials

---

## TODO — מה נשאר

### כלים comingSoon (15 כלים — בעיקר תוכן אודיו/וידאו)
- פרק 1: morning-audio (אודיו בוקר)
- פרק 2: beliefs-audio (מדיטציה אמונות)
- פרק 3: boundaries-quiz, self-worth-letter, values-exercise (3 כלים)
- פרק 4: communication-audio, nvc-practice (2 כלים)
- פרק 6: feelings-inventory (PDF)
- פרק 7: readiness-checklist (PDF), first-message-templates (PDF)
- פרק 9: photo-tips (וידאו)
- פרק 10: intimacy-conversation (אודיו), love-languages-quiz
- פרק 13: the-choice (וידאו), future-meditation (אודיו)

### ממתין לקלט מאלעד (חסום)
- [ ] **RavMeser תוכן** — ייצוא ידני מהאדמין
- [ ] **Google Analytics** — Measurement ID (G-XXXXXXXXXX)
- [ ] **דומיין**: ohlove.co.il → Vercel
- [ ] **תמונות Canva**: תמונות עם שגיא
- [ ] **בחירת כריכה**: 15 עיצובים ב-omanut-hakesher-book/cover/

### עבודה עצמאית (ניתן לביצוע)
- [ ] **עדכון 6 מאמרי הבלוג** — עדיין תוכן ישן (זוגות, לא רווקים)
- [ ] **דף פרטיות** (`/privacy`) — כבר קיים, לשפר
- [ ] **ניקוי דפים ישנים** — services, gallery, resources, course (עדיין ב-sitemap)
- [ ] **Lead magnets** — דפי נחיתה להורדות חינם

### אינטגרציות עתידיות
- [ ] YouCanBookMe — ווידג'ט הזמנות
- [ ] Responder API — email marketing
- [ ] שילוב נכסי מותג אמיתיים (brand/, media/, products/) בדפים

---

## סנכרון 3 פרויקטים

| פרויקט | סטטוס | כריכות | QR/Tools |
|--------|--------|--------|----------|
| **ספר** (book) | v7.0, ציון 9.18/10 | 15 כריכות | 29 QR codes |
| **קורס** (course) | 98%, 73 תסריטים | — | — |
| **אתר** (website) | v4.0, 82 דפים | כריכה בלנדינג | 22 כלים פעילים |

**Design language מיושר**: #E85D75, #1E3A5F, #D4A853, Heebo, radius 0.75rem

---

## טכנולוגיות
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- npm (לא bun — בעיות Windows)
- Vercel לדיפלוי
- פורט פיתוח: 3333

## קבצי מפתח

| קובץ | תיאור |
|------|-------|
| `.claude/PROJECT_STATUS.md` | אתה כאן |
| `.claude/MANUAL_STEPS_GUIDE.html` | מדריך RavMeser + GA4 |
| `src/data/book/chapters.ts` | מודל נתונים — 15 פרקים, 29+ כלים |
| `src/components/book/` | כל קומפוננטות הספר |
| `src/components/GenderProvider.tsx` | Context מגדר |
| `public/images/generated/` | 22 תמונות Gemini |
| `public/assets/` | נכסי מותג (brand, media, products) |
| `.vercelignore` | מוציא תמונות גדולות מדיפלוי |
