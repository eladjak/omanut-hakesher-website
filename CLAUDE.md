# 🌐 פרויקט: אתר אומנות הקשר

## התפקיד שלך
אתה מפתח Full-Stack ומעצב אתרים מקצועי.

## המשימה
לבנות אתר מרשים ומקצועי לאומנות הקשר - עסק בתחום הזוגיות והתקשורת.

---

## 🔴 חובה בכל סשן:

### בהתחלה:
1. **קרא `.claude/PROJECT_STATUS.md`** - סטטוס מפורט + TODO
2. בדוק `npm run dev` עובד (פורט **3333**)
3. הצג סיכום קצר למשתמש

### במהלך העבודה:
- עקוב אחרי רשימת ה-TODO בקובץ הסטטוס
- שמור שינויים ב-git לפני שינויים גדולים

### בסיום כל איטרציה:
- **עדכן `.claude/PROJECT_STATUS.md`** עם:
  - מה הושלם
  - מה נשאר
  - שינויים בהיסטוריה

---

## 📂 קבצים חשובים

| קובץ | תיאור |
|------|-------|
| `.claude/PROJECT_STATUS.md` | **סטטוס מפורט** - קרא תמיד! |
| `.env.local` | משתני סביבה (GA, Resend) |
| `src/lib/blog-posts.ts` | תוכן מאמרי הבלוג |

---

## 🚀 פקודות מהירות

```bash
npm run dev      # פיתוח - http://localhost:3333
npm run build    # בנייה
npx vercel       # דיפלוי
```

---

## טכנולוגיות:
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- npm (לא bun - בעיות ב-Windows)
- Vercel לדיפלוי

## דפים (הושלמו ✅):
- ✅ דף בית מרשים
- ✅ אודות
- ✅ שירותים
- ✅ המלצות
- ✅ בלוג (6 מאמרים)
- ✅ צור קשר

## עקרונות עיצוב:
- נקי ומודרני
- צבעים חמים ומזמינים (טרקוטה, ירוק מרווה, זהב)
- RTL מלא לעברית
- מובייל-first
- נגיש

---

## 🛠️ יכולות מתיקיית הבית

**זכור:** יש לך גישה ל:
- `~/.claude/rules/` - כללי עבודה
- `~/.claude/agents/` - סוכנים מתמחים
- MCPs: Context7, Octocode, Ultracite, ועוד
- Skills: /commit, /pr, /plan, /test, /review

**לפרטים מלאים ראה `.claude/PROJECT_STATUS.md`**

---

## UI/Design Tools (MANDATORY - Feb 2026)

### Google Stitch MCP (USE FOR ALL UI WORK)
Before designing ANY UI component, page, or layout:
1. Use Stitch MCP tools: `build_site`, `get_screen_code`, `get_screen_image`
2. Generate designs in stitch.withgoogle.com first, then pull code via MCP
3. Use `/enhance-prompt` skill to optimize prompts for Stitch
4. Use `/design-md` skill to document design decisions
5. Use `/react-components` skill to convert Stitch designs to React

### Available Design Skills
- `/stitch-loop` - Generate multi-page sites from a single prompt
- `/enhance-prompt` - Refine UI ideas into Stitch-optimized prompts
- `/design-md` - Create design documentation from Stitch projects
- `/react-components` - Convert Stitch screens to React components
- `/shadcn-ui` - shadcn/ui component integration guidance
- `/remotion` - Create walkthrough videos from designs
- `/omc-frontend-ui-ux` - Designer-developer UI/UX agent

### Rule: NEVER design UI from scratch with Claude tokens. Always use Stitch MCP or v0.dev first!
