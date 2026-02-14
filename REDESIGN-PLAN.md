# תכנית עיצוב מחדש - אתר אומנות הקשר

## חזון
לבנות אתר חדש ומושלם המשלב את הטוב מ:
1. **האתר המקורי** (ohlove.co.il) - מבנה עמודים, תוכן שירותים
2. **האפיון מ-2022** (PPTX) - עיצוב ומבנה ויזואלי
3. **האפיון העשיר** (MD) - מערכת קורסים מלאה עם AI
4. **Haderech Next** - תשתית Convex + Clerk מוכנה

## סטאק טכנולוגי
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Convex (real-time backend)
- Clerk (authentication)
- Shadcn UI components
- Heebo font (Hebrew optimized)

## מבנה עמודים

### עמודים ציבוריים
1. **/** - דף בית מרהיב
   - Hero section עם CTA
   - "מי אני" - קטע קצר
   - שירותים (4 כרטיסים)
   - קורסים מומלצים (Convex)
   - עדויות (carousel)
   - בלוג אחרון
   - ספר (teaser)
   - Newsletter signup
   - CTA סופי

2. **/about** - אודות
   - הסיפור שלי
   - ערכים ומתודולוגיה
   - הגישה (4 שלבים)
   - תעודות/הכשרות

3. **/services** - שירותים
   - ייעוץ זוגי
   - סדנאות קבוצתיות
   - אימון אישי
   - מפגשים אונליין
   - כל שירות: תיאור, למי מתאים, מחיר, FAQ, הזמנה

4. **/courses** - קטלוג קורסים (Convex)
   - רשימת קורסים עם filtering
   - כרטיס לכל קורס (תמונה, כותרת, תיאור, מחיר)
   - "התחל חינם" / "הירשם"

5. **/courses/[id]** - עמוד קורס
   - תיאור מלא
   - רשימת שיעורים
   - Progress bar (למשתמשים רשומים)
   - כפתור הרשמה

6. **/courses/[id]/learn** - עמוד למידה (Protected)
   - Video player
   - Sidebar עם שיעורים
   - Progress tracking
   - AI Chatbot (floating)

7. **/blog** - בלוג
   - רשימת מאמרים עם tags
   - חיפוש ופילטור
   - קישורים לקורסים קשורים

8. **/blog/[slug]** - מאמר בודד
   - תוכן מלא
   - CTA לקורס קשור
   - שיתוף חברתי

9. **/simulator** - סימולטור דייטינג AI
   - בחירת תרחיש
   - ממשק צ'אט עם AI
   - ניקוד ומשוב
   - היסטוריית תרגולים

10. **/community** - קהילה (Phase 2)
    - פורום בנושאים
    - Tags ו-Badges
    - Gamification

11. **/contact** - צור קשר
    - טופס מפורט
    - מפה
    - פרטי קשר
    - הזמנת פגישה

12. **/resources** - משאבים חינמיים
    - תרגילים להורדה
    - מדריכים קצרים
    - Newsletter

### עמודים מוגנים (Clerk Auth)
13. **/dashboard** - לוח בקרה אישי
    - קורסים רשומים + התקדמות
    - הישגים ותגים
    - היסטוריית סימולטור
    - המלצות מותאמות

14. **/admin** - ממשק ניהול (Admin only)
    - ניהול קורסים ושיעורים
    - ניהול משתמשים
    - Analytics

## עיצוב
- **צבעים**: Warm terracotta (#C4704E), Muted green (#7A9E7E), Gold (#D4A843), Dark (#1a1a2e)
- **Dark/Light mode**
- **RTL מלא**
- **אנימציות**: transform/opacity only, max 200ms
- **Shadcn UI**: Cards, Tabs, Modals, Tooltips, Accordions
- **Mobile-first**: Hamburger menu, touch-friendly

## Phase 1 (2 שבועות) - MVP
- [ ] Setup: Convex + Clerk + Shadcn
- [ ] דף בית חדש
- [ ] About, Services, Contact
- [ ] Blog (migrate 6 posts)
- [ ] Auth (sign-in/sign-up)
- [ ] Courses catalog + detail page
- [ ] Basic dashboard

## Phase 2 (2 שבועות) - Learning
- [ ] Video player integration
- [ ] Progress tracking
- [ ] Course enrollment flow
- [ ] AI Chatbot (basic)
- [ ] Admin panel (basic)

## Phase 3 (2 שבועות) - Advanced
- [ ] Dating Simulator
- [ ] Community/Forum
- [ ] Gamification (badges)
- [ ] Certificates
- [ ] Newsletter integration
- [ ] Payment system
