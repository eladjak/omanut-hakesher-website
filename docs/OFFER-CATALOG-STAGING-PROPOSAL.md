# הצעת קטלוג staging — חלופה B

`data/offer-catalog-staging-proposal.json` הוא חוזה הצעה קנוני **לבדיקות staging בלבד**. הוא אינו קטלוג ציבורי, אינו מיובא לעמודי האתר ואינו מחובר ל־checkout, לספק תשלום או ל־fulfillment writer.

## מה הוחלט ברמת ההצעה

המסע נשאר פשוט: ערך פתוח → ספר → “הדרך” → ליווי. כרטיס ההיכרות הוא שירות צד עצמאי. הקטלוג מכיל בדיוק ארבעה SKU מוצעים:

| SKU | הצעה | מחיר מוצע ולא מאושר | מסירה מרכזית |
|---|---|---:|---|
| `OH-BOOK-PRINT-01` | הספר | ₪129 | ספר מודפס + Book Companion תואם מהדורה |
| `OH-DATING-CARD-SVC-01` | כרטיס היכרות אישי | ₪349 | intake פרטי, טיוטה, תיקון אחד וקובץ סופי |
| `OH-WAY-COURSE-01` | “הדרך” | ₪1,490 | קורס ל־12 חודשים, סימולטור תחום עלות וקהילה ל־6 חודשים |
| `OH-GUIDANCE-3-01` | ליווי אישי | ₪1,650 | שלוש פגישות של 60 דקות בחלון 90 יום |

כל סכום הוא hypothesis לאישור אלעד. `humanApproval` הוא `null` ברמת החוזה ובכל SKU. אסור להציג את המחירים האלה לציבור או להסיק מהם מחיר השוואה, הנחה, guarantee או זמינות.

## מה אינו SKU

- **Book Companion** כלול בספר. חלק ציבורי יכול להישאר פתוח; תוכן קורא מוגן דורש `book-purchase` מהזמנה מהימנה.
- **הסימולטור** נותן חמש תגובות שהושלמו בניסיון החינמי. כשל ספק אינו צורך ניסיון. לאחר מכן הגישה נגזרת מ־entitlement מוצרי של הקורס, לא מ־`any_active_course` כללי. אין מכירת “ללא הגבלה”.
- **הקהילה** אינה נמכרת כמנוי בגל הראשון. הקורס נותן grant של שישה חודשים; ליווי נותן גישה בזמן הליווי ועוד שלושה חודשים; רכישת ספר אינה מעניקה קהילה אוטומטית, אלא יכולה לשמש בסיס לפיילוט מוזמן ותחום בזמן.

## גבולות מסירה וזכאות

- כל זכאות מתחילה רק מ־order עמיד ותשלום מאומת, לא מ־login, טופס או redirect.
- ספר נקשר למהדורה; QR מודפס אינו סוד ואינו buyer token.
- כרטיס ההיכרות הוא שירות פרטי ואינו יוצר LMS entitlement. תשובות intake אינן מועברות אוטומטית ל־AI, לקהילה או לשיווק.
- הקורס יוצר `course-access` ל־12 חודשים, `simulator-access` נגזר ו־`community-access` לשישה חודשים.
- ליווי דורש capacity reservation ו־attendance ledger; אין זמינות חירום, messaging בלתי מוגבל או הבטחת תוצאה.
- refund/revoke כפופים למדיניות שטרם אושרה. ביטול גישה עתידית ומחיקת תוכן/נתונים הם תהליכים נפרדים.

## למה הכול חסום

כל שדות activation הם `false`, כל offer הוא `blocked`, וכל launch gate הוא `false`. לפני שינוי מצב נדרשים לפחות:

1. אישור אנושי של אלעד למחיר, תכולה, duration, ביטול ו־no-show.
2. מודל עלות אמיתי לספר, simulator, community ושירות אנושי.
3. בדיקות sandbox של order, decline, replay, receipt, refund ו־revoke.
4. buyer isolation ו־SKU-to-entitlement isolation.
5. fulfillment מקצה לקצה לכל אחד מארבעת המוצרים.
6. שערי התפעול הנפרדים של הקהילה וראיות עלות לסימולטור.

## בדיקות מקומיות

```powershell
node --experimental-strip-types scripts/validate-offer-catalog-staging-proposal.mjs
node --experimental-strip-types scripts/test-offer-catalog-staging-proposal.mjs
```

ה־validator דורש בדיוק את ארבעת ה־SKU והמחירים של חלופה B, בודק שכל ההפעלות חסומות ושאין אישור אנושי מומצא, מחייב את גבולות entitlement/fulfillment/refund, ומונע יצירת SKU עצמאי לקהילה או לסימולטור. בדיקות ה־negative controls מוכיחות שהשער נכשל כאשר מנסים לפתוח מחיר/checkout, להמציא approval, לשנות מחיר, להוסיף provider ID, לעקוף זכאות או לפרסם הבטחת refund.
