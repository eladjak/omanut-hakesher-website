# 🔀 Runbook: הסטת ohlove.co.il מ-Wix ל-Vercel (פעולת-אלעד, ~10 דקות)

> **למה:** היום `ohlove.co.il` מגיש את אתר ה-Wix הישן (GEO 53). האתר החדש (GEO ~100, מגנטי-לידים, ספר, קורס) חי רק ב-`omanut-hakesher-website.vercel.app`. ההסטה הופכת אותו לפָנים הציבוריות של אומנות הקשר.
> **מצב DNS נוכחי (נבדק 5.7.2026):** הדומיין על שרתי-השמות של Wix — `ns6.wixdns.net` + `ns7.wixdns.net`. Apex → 185.230.63.x (Wix), www → CNAME cdn1.wixdns.net.
> **אף סוכן לא מבצע את זה — רק אלעד.** (שינוי DNS = פרודקשן.)

---

## שלב 0 — לפני (2 דקות)
1. ודא שענף `feat/comeback-launch-2026-07-05` מוזג ל-master ופרוס (הוא כולל את ה-redirects מדפי-ה-Wix הישנים + עמוד /welcome + לינקי הקהילה).
2. פתח את [Vercel Dashboard](https://vercel.com) → פרויקט **omanut-hakesher-website**.

## שלב 1 — הוספת הדומיין ב-Vercel (2 דקות)
1. בפרויקט: **Settings → Domains → Add**.
2. הוסף `ohlove.co.il` וגם `www.ohlove.co.il`.
3. בחר: `www.ohlove.co.il` = primary, apex מפנה ל-www (או להפך — העיקר עקביות; הקוד משתמש ב-canonical אחיד).
4. Vercel יציג את הרשומות הנדרשות (בד"כ): **A** לapex → `76.76.21.21` · **CNAME** ל-www → `cname.vercel-dns.com`. השאר את המסך פתוח.

## שלב 2 — שינוי הרשומות (3 דקות) — שני מסלולים

### מסלול א' (מהיר, מומלץ): עריכת רשומות בתוך Wix
Wix מאפשר לערוך DNS גם כשהדומיין על שרתי-השמות שלהם:
1. היכנס ל-Wix → **Domains** (my.wix.com/domains) → `ohlove.co.il` → **Advanced / Manage DNS Records**.
2. **A record** של האפקס (`@`): מחק את רשומות ה-185.230.63.x → הוסף `A @ 76.76.21.21`.
3. **CNAME** של `www`: שנה מ-`cdn1.wixdns.net` → `cname.vercel-dns.com`.
4. אל תיגע ברשומות MX/TXT (מייל!) אם קיימות.

### מסלול ב' (אם Wix חוסם עריכה): החלפת nameservers
אצל רשם הדומיין (איפה ש-ohlove.co.il רשום — כנראה Wix עצמו או רשם ישראלי): החלף את `ns6/ns7.wixdns.net` ב-nameservers של Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`), ואז נהל את כל הרשומות ב-Vercel. ⚠️ במסלול הזה חובה לשחזר ידנית רשומות MX/TXT קיימות.

## שלב 3 — אימות (3 דקות, אחרי עד ~שעה של propagation)
```bash
nslookup ohlove.co.il          # מצפים ל-76.76.21.21
curl -sI https://www.ohlove.co.il/            # 200, בלי parastorage
curl -sI https://www.ohlove.co.il/welcome     # 200 — עמוד הקאמבק
curl -sI https://www.ohlove.co.il/amlatsot    # 308 → /testimonials (redirect ישן-חדש)
curl -sI "https://www.ohlove.co.il/post/2018/01/10/xyz"  # 308 → /blog
```
ב-Vercel Domains שני הדומיינים צריכים להיות ✓ Valid Configuration.

## שלב 4 — אחרי ההסטה (בשבוע שאחרי; קלוד יכול לעשות הכל חוץ מ-GSC)
- [ ] סריקת GEO על `www.ohlove.co.il` (יעד ≥95; היום 53 על ה-Wix).
- [ ] Google Search Console: לאמת בעלות (אם לא קיים) → Submit sitemap `https://www.ohlove.co.il/sitemap.xml`.
- [ ] לעדכן `NEXT_PUBLIC_SITE_URL=https://www.ohlove.co.il` ב-Vercel env (production) → Redeploy. **מאז 10.7.2026** כל הקישורים הפונקציונליים (מיילי-מגנטים, שיתופי-וואטסאפ, redirect אחרי תשלום) עוברים דרך `src/lib/site-url.ts` — בלי env הם נופלים ל-vercel.app (עובד), ועם ה-env הם עוברים לדומיין הממותג אוטומטית.
- [ ] לעדכן קנוניקל-SEO: ב-`src/lib/site-url.ts` להחליף את `CANONICAL_SITE_URL` ל-`https://www.ohlove.co.il`, ואז find-replace של `https://omanut-hakesher.co.il` בכל `src/` (layout metadataBase, JsonLd.tsx, sitemap.ts, robots.ts, בלוג) — כיום הם מצביעים בכוונה על דומיין שלא קיים (NXDOMAIN) עד ההסטה.
- [ ] אתר-הספר: לעדכן `CROSS_LINKS.buyBook` ב-`omanut-hakesher-book/site/src/data.ts` מ-vercel.app → הדומיין האמיתי.
- [ ] לשקול ביטול מנוי ה-Wix (אחרי שבועיים של יציבות — לא לפני; ביטול מוקדם עלול לשחרר את ניהול ה-DNS אם משתמשים במסלול א').

## נספח — מיפוי ה-redirects שכבר בקוד (next.config.ts)
| ישן (Wix) | חדש | הערה |
|---|---|---|
| `/amlatsot` | `/testimonials` | המלצות |
| `/workshops` | `/services` | |
| `/support` | `/contact` | |
| `/members` | `/community` | |
| `/women`, `/men`, `/m`, `/blank*` | `/` | דפי-נחיתה ישנים |
| `/post/YYYY/MM/DD/<slug>` | `/blog` | פוסטים 2015-2018 — אין מקבילה 1:1 |
| `/services`, `/blog` | — | קיימים באותו נתיב, אין צורך |

*נכתב 5.7.2026 · חלק מ-MASTERPIECE-PLAN.md אופק א' (A3).*
