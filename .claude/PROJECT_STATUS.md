# סטטוס פרויקט: אומנות הקשר

> **עדכון אחרון:** 2026-03-03
> **גרסה:** 3.0.0
> **סטטוס:** שכתוב מלא v3 - תמונות, מגדר, פריסה ב-Vercel
> **URL פרודקשן:** https://omanut-hakesher-website.vercel.app

---

## מה הושלם (v3.0 - מרץ 2026)

### עיצוב מותאם-מגדר ✅
- [x] `GenderProvider.tsx` - Context + localStorage + CSS class על `<html>`
- [x] `WelcomeModal.tsx` - מודל בקרה ראשונה (גבר/אישה/דלג)
- [x] `GenderedText.tsx` - Component לטקסטים מותאמים-מגדר
- [x] `src/lib/gendered-content.ts` - 30+ מפתחות עברית (ניטרלי/גבר/אישה)
- [x] `globals.css` - משתני CSS לגבר (כחול `#1E3A5F`) ואישה (טרקוטה ברירת מחדל)
- [x] Flash-prevention script ב-`<head>` ב-layout.tsx

### תמונות Gemini - 22 תמונות ✅
נמצאות ב-`public/images/generated/`:
- hero-homepage.jpg, homepage-about-section.jpg, homepage-couples.jpg
- about-hero.jpg, about-elad-speaking.jpg
- coaching-hero.jpg, coaching-transformation.jpg, coaching-results.jpg
- hadrech-hero.jpg, hadrech-curriculum.jpg, hadrech-community.jpg
- book-hero.jpg, book-reading.jpg
- testimonials-hero.jpg, testimonials-wedding.jpg
- podcast-hero.jpg, podcast-microphone.jpg
- community-hero.jpg, contact-hero.jpg, thanks-hero.jpg, blog-hero.jpg
- section-divider-warm.jpg

### כל 11 דפים קיבלו hero images ✅
Pattern: Next.js `<Image fill>` + overlay `bg-foreground/65-70` + טקסט לבן

### תוכן אותנטי ✅
- [x] הסרת כל ה-emojis (הוחלפו ב-SVG ובטקסט)
- [x] פריסת טלפון אמיתי: 051-251-8025
- [x] פודקאסט עם Spotify אמיתי: https://open.spotify.com/show/2mXzv3AS0rZw7eTCVjEbyZ
- [x] SoundCloud: https://soundcloud.com/ohlovelive
- [x] 461 זוגות (נתון אמיתי)

### Footer ✅
- [x] 5 רשתות חברתיות אמיתיות: WhatsApp, Telegram, Facebook, YouTube, Spotify
- [x] לינקי ניווט כוללים `/thanks` ו-`/community`
- [x] לינקי שירותים כוללים `/community`

### עדויות WhatsApp ✅
- 5 צילומי מסך אמיתיים ב-`public/assets/testimonials/`
- מוצגים בדף `/testimonials`

### פריסת Vercel ✅
- [x] `.vercelignore` נוצר (מוציא 187MB של תמונות conference + photoshoot-2025)
- [x] פרוס בהצלחה: https://omanut-hakesher-website.vercel.app

### מדריך צעדים ידניים ✅
- [x] `.claude/MANUAL_STEPS_GUIDE.html` - הסברים מפורטים ל:
  - צעד 1: ייצוא תוכן מ-RavMeser (Cloudflare חוסם גישה אוטומטית)
  - צעד 4: הגדרת Google Analytics 4 (קבל Measurement ID G-XXXXXXXXXX)

### Git commits (v3.0)
- `4e3c353` - feat: major update - gender-adaptive design, 22 Gemini images
- `e46dccf` - feat: integrate Gemini images + WhatsApp testimonials
- `e3a8044` - feat: all pages get Gemini hero images

---

## TODO - מה נשאר

### ממתין לקלט מאלעד (חסום)
- [ ] **RavMeser תוכן** - אלעד צריך לייצא ידנית מהאדמין (מדריך: MANUAL_STEPS_GUIDE.html - שלב 1)
  - 9 דפי עדויות: https://ohalove.ravpage.co.il/תמלול-*
  - 5 דפי מוצרים: coaching, hadrech, book, podcast, community
  - לשלוח: טקסטים + תמונות + שמות מלאים
- [ ] **Google Analytics** - אלעד צריך לקבל Measurement ID (מדריך: MANUAL_STEPS_GUIDE.html - שלב 4)
  - לאחר קבלת ID (G-XXXXXXXXXX) → Claude מטמיע ב-layout.tsx

### קלט שצריך מאלעד
- [ ] **תחבורת דומיין**: ohlove.co.il → Vercel (הוסף CNAME ב-DNS)
- [ ] **תמונות Canva**: אלעד ציין שיש תמונות עם שגיא בקאנבה

### עבודה עצמאית (ניתן לביצוע מיידי)
- [ ] **עדכון 6 מאמרי הבלוג** - עדיין עם תוכן ישן (מיועד לזוגות, לא לרווקים)
- [ ] **דף פרטיות** (`/privacy`) - אלעד ביקש עזרה עם דף משפטי
- [ ] **ניקוי דפים ישנים** - services, gallery, resources, course (עדיין ב-sitemap)
- [ ] **Lead magnets** - דפי נחיתה להורדות חינם:
  - "23 הסיבות למה עדיין לבד"
  - "7 עקרונות לזוגיות"
  - "36 השאלות שמקרבות"

### אינטגרציות עתידיות
- [ ] **YouCanBookMe** - שילוב ווידג'ט הזמנות בדפי coaching/contact
- [ ] **Responder API** - חיבור email marketing לניוזלטר בפוטר
- [ ] **הקדשות אישיות** - דף לכל אחד מ-6 אנשי התודות

---

## טכנולוגיות
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- npm (לא bun - בעיות ב-Windows)
- Vercel לדיפלוי
- פורט פיתוח: 3333

## קבצי מפתח

| קובץ | תיאור |
|------|-------|
| `.claude/MANUAL_STEPS_GUIDE.html` | מדריך לצעדים 1 (RavMeser) ו-4 (GA4) |
| `src/components/GenderProvider.tsx` | Context + localStorage לבחירת מגדר |
| `src/components/WelcomeModal.tsx` | מודל קבלת פנים בביקור ראשון |
| `src/lib/gendered-content.ts` | 30+ מפתחות טקסט מותאמי-מגדר |
| `public/images/generated/` | 22 תמונות שנוצרו עם Gemini |
| `public/assets/testimonials/` | 5 צילומי מסך WhatsApp אמיתיים |
| `.vercelignore` | מוציא תמונות גדולות מהדיפלוי |
| `.env.local` | משתני סביבה (GA, Resend) |
| `src/lib/blog-posts.ts` | תוכן מאמרי הבלוג |
