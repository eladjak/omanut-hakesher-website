# Runbook מבוקר: מעבר `ohlove.co.il` מ־Wix לאתר Next ב־Vercel

> **סטטוס:** תכנית הפעלה בלבד. המסמך אינו הרשאה לבצע שינוי DNS, deploy או שינוי ספק.
> **בעל ביצוע:** אלעד או אדם שקיבל ממנו הרשאה מפורשת ל־production.
> **צילום מצב שנמדד ב־14.8.2026:** `www.ohlove.co.il` עדיין מוגש מ־Wix; האתר החדש זמין ב־`omanut-hakesher-website.vercel.app`; `omanut-hakesher.co.il` ו־`haderech.ohlove.co.il` הם NXDOMAIN.
> **עיקרון:** קודם מקפיאים גרסה ובודקים אותה, אחר כך מחברים דומיין ב־Vercel, ורק בסוף משנים את הרשומות ש־Vercel מציג בפועל. לא מנחשים IP, לא מחליפים nameservers בלי inventory ו־rollback, ולא נוגעים ברשומות דואר כחלק משינוי אתר.

## תנאי פתיחה — כולם חייבים להיות ירוקים

- [ ] נבחר snapshot מדויק של ארבעת המוצרים, עם commit או digest שאפשר לשחזר.
- [ ] הגרסה שנבחרה נפרסה ל־preview מבודד ועברה `lint`, `typecheck`, `build` ו־browser smoke על desktop ומובייל.
- [ ] אין ב־preview מסלול רכישה שמציג הצלחה או גישה בלי הזמנה מאומתת. אם commerce עדיין חסום, הוא נשאר חסום גם אחרי ה־cutover.
- [ ] עמודי privacy, terms, accessibility ו־contact קיימים ונבדקו; כתובת התמיכה אושרה בידי הבעלים.
- [ ] נשמר export מלא של ה־DNS zone הנוכחי: `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `CAA`, אימותי ספקים וכל subdomain פעיל.
- [ ] נבדקו בפועל mailbox, `MX`, `SPF`, `DKIM` ו־`DMARC`; שינוי האתר לא כולל שינוי דואר.
- [ ] נאספו URLים חיים מה־Wix: sitemap, דפי נחיתה, פוסטים וקישורים חיצוניים חשובים. לכל URL יש יעד 1:1 או disposition מפורש — לא הפניה גורפת לדף הבית.
- [ ] קיימת תכנית rollback עם הערכים המדויקים של הרשומות הישנות, owner זמין וחלון תצפית של 24–48 שעות.

אם אחד התנאים חסר — לא משנים DNS. אפשר להמשיך להכין את ה־preview ואת טבלת ההפניות בלי לפגוע באתר החי.

## שלב 1 — rehearsal על כתובת שאינה הדומיין הראשי

1. פרסו את ה־snapshot הנבחר ל־Vercel preview או alias זמני שאינו משמש לקוחות.
2. הגדירו בסביבת ה־preview את אותו canonical host שמתוכנן ל־production, אך אל תשלחו ממנו מיילים ואל תפעילו תשלום.
3. הריצו לפחות את המסלולים הבאים:
   - `/`, `/about`, `/resources`, `/book`, `/programs/the-way`, `/coaching`, `/contact`.
   - כל שלושת קובצי ה־lead הפעילים וה־subscribe flow במצב ספק מדומה/מבודד.
   - protected book routes, purchase success routes ו־checkout endpoints במצב fail-closed.
   - sitemap, robots, metadata, canonical, Open Graph, `llms.txt` ו־redirects ישנים.
4. בדקו raw HTML/RSC ו־browser, לא רק צילום מסך: status, redirect chain, console, keyboard, focus, mobile overflow ו־noindex במשטחים שאינם ציבוריים.
5. שמרו report הקשור ל־snapshot. “ה־preview נפתח” אינו מספיק.

## שלב 2 — הוספת הדומיין ב־Vercel בלי שינוי תעבורה

1. ב־Vercel פתחו את הפרויקט הנכון ובחרו **Settings → Domains**.
2. הוסיפו `www.ohlove.co.il` ו־`ohlove.co.il`.
3. בחרו `www.ohlove.co.il` כ־primary ואת apex כ־redirect קבוע אליו, אלא אם התקבלה החלטה אחרת ותועדה ב־brand contract.
4. העתיקו למסמך השינוי את הרשומות ש־Vercel מציג **באותו רגע**. אין להשתמש בערכים היסטוריים מן runbook.
5. ודאו שהפרויקט שאליו הדומיין נוסף הוא אותו project/snapshot שעבר rehearsal.

בשלב הזה האתר החי עדיין ב־Wix.

## שלב 3 — הכנת חלון שינוי

לפחות 24 שעות לפני החלון, אם ספק ה־DNS מאפשר זאת:

- הורידו TTL רק לרשומות האתר (`@` ו־`www`) לערך סביר כגון 300 שניות.
- אל תשנו TTL של `MX`/`TXT` כחלק מהפעולה.
- תעדו timestamp, actor, הרשומה הישנה, הרשומה החדשה ופקודת rollback.
- קבעו חלון שבו owner, בודק נוסף וגישה ל־Wix/Vercel/registrar זמינים יחד.
- הקפיאו deploys אחרים עד סוף התצפית הראשונית.

## שלב 4 — cutover מצומצם

### מסלול מועדף: שינוי `@` ו־`www` בלבד אצל מנהל ה־DNS הנוכחי

1. שנו רק את רשומות האתר לערכים העדכניים שהוצגו ב־Vercel.
2. אל תמחקו או תשנו `MX`, `TXT`, `CAA` או subdomains אחרים.
3. שמרו צילום/export מיד אחרי השינוי.

### החלפת nameservers — רק כפרויקט נפרד

אל תחליפו nameservers כחלק מ־cutover של אתר אלא אם מנהל ה־DNS הנוכחי אינו מאפשר את הרשומות הנדרשות ונעשה מראש כל הבא:

- zone מלאה הועתקה ונבדקה אצל הספק החדש;
- `MX`, `SPF`, `DKIM`, `DMARC`, אימותי Google/Meta/Resend וכל subdomain הושוו שורה־בשורה;
- lowered TTL, rollback ו־mailbox probes מוכנים;
- אדם נוסף בדק את ה־zone לפני delegation.

החלפת nameservers אינה “מסלול מהיר”; היא migration של כל ה־DNS.

## שלב 5 — אימות מיידי

החליפו `<EXPECTED_VALUE>` בערך שהציג Vercel בזמן השינוי:

```powershell
Resolve-DnsName ohlove.co.il
Resolve-DnsName www.ohlove.co.il
curl.exe -sS -I https://www.ohlove.co.il/
curl.exe -sS -I https://www.ohlove.co.il/resources
curl.exe -sS -I https://www.ohlove.co.il/book
curl.exe -sS -I https://www.ohlove.co.il/sitemap.xml
curl.exe -sS -I https://www.ohlove.co.il/robots.txt
```

בדקו משתי רשתות או resolvers שונים:

- `www` מחזיר 200 מן Vercel ולא `Pepyaka`/`parastorage`.
- apex מפנה פעם אחת ל־`www`; אין loop ואין שרשרת מיותרת.
- TLS תקין לשני hosts.
- canonical, sitemap, robots, OG ו־structured data משתמשים ב־host שנבחר.
- routes ישנים מקבלים יעד מדויק; אין redirect mass-to-home.
- טפסים אינם מציגים false success; commerce והספר המוגן נשארים במצב שאושר מראש.
- mailbox יכול לשלוח ולקבל, ו־SPF/DKIM/DMARC לא השתנו.

## תנאי rollback

מחזירים מיד את `@` ו־`www` לערכים המתועדים של Wix אם מתקיים אחד מאלה:

- TLS או DNS לא יציבים מעבר לחלון שנקבע;
- דף הבית/משאבים/יצירת קשר אינם זמינים;
- canonical או redirects יוצרים loop/404 רחב;
- נוצר false success בתשלום, lead delivery או גישה לתוכן;
- מייל עסקי נפגע;
- אין owner זמין להכריע בממצא חמור.

Rollback הוא פעולה תקינה, לא כישלון. אחרי rollback שומרים evidence, מתקנים ב־preview וקובעים חלון חדש.

## תצפית אחרי המעבר

### שעה ראשונה

- בדיקת HTTP כל 5–10 דקות למסלולי הליבה.
- בדיקת error logs ב־Vercel ללא רישום PII.
- בדיקת contact/lead אחת עם fixture מורשה, לא עם לקוח אמיתי.
- בדיקת זמינות mailbox.

### 24–48 שעות

- 4xx/5xx, redirect loops, Core Web Vitals, שגיאות hydration ו־CSP.
- Search Console ownership ו־submission של sitemap רק אחרי שה־canonical יציב.
- בדיקת קישורים נכנסים מרכזיים והפניות Wix.
- שמירת Wix וה־DNS הישן זמינים ל־rollback; אין לבטל מנוי בשלב הזה.

### אחרי 14 יום יציבים

- החזרת TTL לערך תפעולי רגיל.
- הכרעה אם וכיצד לשמר/לארכב את Wix.
- עדכון brand/domain contract, קישורי הספר, ה־LMS, PDFs ומיילים מן source-of-truth אחד.
- רק לאחר אישור מפורש: ביטול שירותים ישנים שאין להם עוד תלות ב־DNS, media או redirects.

## מטריצת redirects לפני release

הטבלה הבאה היא נקודת פתיחה בלבד. יש להשוות אותה מחדש ל־sitemap החי של Wix ול־routes הקיימים ב־snapshot:

| מקור Wix | יעד מוצע | שער קבלה |
|---|---|---|
| `/amlatsot` | `/sipurim` | היעד הציבורי קיים ואינו חושף עדות שלא אושרה. |
| `/workshops` | `/services` או עמוד מדויק יותר | owner מאשר שהתוכן שקול. |
| `/support` | `/coaching` או `/contact` | ה־CTA והזמינות נכונים. |
| `/members` | `/community` | אין הבטחת קהילה/גישה שלא קיימת. |
| `/women`, `/men`, `/m`, `/blank*` | mapping פרטני | אין הפניה גורפת לדף הבית בלי בדיקת intent. |
| `/post/YYYY/MM/DD/<slug>` | פוסט מקביל או `/blog` כ־fallback מתועד | כל URL מרכזי נבדק; לא מאבדים תוכן בעל תנועה. |

## חתימת שינוי

לפני ביצוע ממלאים:

- Snapshot/commit: `PENDING`
- Vercel deployment URL: `PENDING`
- DNS provider ו־zone export path: `PENDING`
- Owner: `PENDING`
- Reviewer: `PENDING`
- Change window: `PENDING`
- Rollback deadline: `PENDING`
- Result: `NOT RUN`

כל עוד אחד מהשדות נשאר `PENDING`, המסמך הוא תכנית ולא הוראת ביצוע.
