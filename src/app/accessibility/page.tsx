import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "הצהרת נגישות ומצב הבדיקה",
  description: "מצב הנגישות ודרך לדווח על חסם באתר אומנות הקשר",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "נגישות" }]} />
      </div>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
          <h1>הצהרת נגישות ומצב הבדיקה</h1>
          <p className="text-muted-foreground">עודכן לאחרונה: 13 באוגוסט 2026</p>

          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6">
            האתר נמצא בתהליך audit ותיקון נגישות. טרם הושלמה בדיקת התאמה מלאה
            ולכן איננו מצהירים בשלב זה על עמידה מלאה בתקן או על פטור.
          </div>

          <h2>מה כבר קיים</h2>
          <ul>
            <li>מבנה עברי מימין לשמאל והגדרת שפה במסמך.</li>
            <li>קישור דילוג לתוכן הראשי וכותרות סמנטיות ברוב עמודי הליבה.</li>
            <li>מצבי focus, labels לשדות וטקסט חלופי בחלק מהתמונות.</li>
            <li>התחשבות בהעדפת reduced motion בחלק מרכיבי התנועה.</li>
          </ul>

          <h2>מה עדיין בבדיקה</h2>
          <p>
            ניווט מלא במקלדת, סדר focus, ניגודיות, הודעות שגיאה, חלופות למדיה,
            זום ורספונסיביות, כלי הספר האינטראקטיביים והתאמה לקוראי מסך. ממצאים
            נוספים יתוקנו ויתועדו לפני הכרזה על רמת התאמה.
          </p>

          <h2>דיווח על חסם או בקשת התאמה</h2>
          <p>
            אם נתקלת ברכיב שאינו נגיש, כתוב/י מה ניסית לבצע, כתובת העמוד, סוג
            המכשיר וטכנולוגיית העזר אם נוח לך לציין. אפשר לפנות בדוא״ל {" "}
            <a href="mailto:omanut-hakesher@eladjak.com" dir="ltr">
              omanut-hakesher@eladjak.com
            </a>
            , בטלפון <a href="tel:+972512518025" dir="ltr">051-251-8025</a> או
            דרך <Link href="/contact">עמוד יצירת הקשר</Link>. ננסה לספק חלופה
            נגישה ולהשיב בהקדם האפשרי, בלי להבטיח SLA שטרם אושר.
          </p>

          <h2>היקף ההצהרה</h2>
          <p>
            ההצהרה מתייחסת לאתר הזה. מסמכים, נגני מדיה ושירותים חיצוניים עשויים
            להיות כפופים למגבלות או להצהרות נפרדות. אם תוכן חיצוני אינו נגיש,
            אפשר לבקש חלופה דרך פרטי הקשר למעלה.
          </p>
        </div>
      </section>
    </>
  );
}
