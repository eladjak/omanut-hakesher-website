import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של אומנות הקשר - כיצד אנו מטפלים במידע שלכם",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "מדיניות פרטיות" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/privacy-hero.jpg"
            alt="מדיניות פרטיות - אומנות הקשר"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            מדיניות <span className="text-accent-light">פרטיות</span>
          </h1>
          <p className="text-white/70 text-lg">
            עודכן לאחרונה: מרץ 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
              <p className="text-foreground leading-relaxed m-0">
                <strong>תמצית:</strong> אנחנו אוספים מידע מינימלי, לא מוכרים אותו לאף גורם שלישי, ומשתמשים בו רק כדי לספק לכם שירות טוב יותר. אם יש לכם שאלות, דברו איתנו ישירות.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">1. מי אנחנו</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              אומנות הקשר הוא עסק של אלעד יעקובוביץ&apos;, מאמן זוגיות ותקשורת. כתובת העסק: ישראל. דוא&quot;ל ליצירת קשר: <a href="mailto:hello@omanut-hakesher.co.il" className="text-primary hover:underline" dir="ltr">hello@omanut-hakesher.co.il</a>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">2. מה אנחנו אוספים</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              אנחנו אוספים מידע רק כשאתם בוחרים לשתף אותו איתנו:
            </p>
            <ul className="list-disc mb-6 text-muted-foreground">
              <li className="ms-6 mb-2"><strong>פרטי קשר:</strong> שם ואימייל כשנרשמים לניוזלטר או יוצרים קשר</li>
              <li className="ms-6 mb-2"><strong>הודעות:</strong> תוכן ההודעות שאתם שולחים דרך טפסי יצירת הקשר</li>
              <li className="ms-6 mb-2"><strong>נתוני שימוש:</strong> אנליטיקס אנונימי על איך משתמשים באתר (דרך Google Analytics)</li>
              <li className="ms-6 mb-2"><strong>העדפות:</strong> בחירת מגדר לצורך התאמת תוכן (נשמרת מקומית בדפדפן שלכם, לא אצלנו)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">3. איך אנחנו משתמשים במידע</h2>
            <ul className="list-disc mb-6 text-muted-foreground">
              <li className="ms-6 mb-2">לשלוח ניוזלטר ותוכן שביקשתם לקבל</li>
              <li className="ms-6 mb-2">לחזור אליכם בנוגע לפניות שילחתם</li>
              <li className="ms-6 mb-2">לשפר את תוכן האתר על בסיס נתוני שימוש</li>
            </ul>
            <p className="mb-4 text-muted-foreground">
              <strong>לא</strong> נמכור, נשכיר, או נשתף את המידע שלכם עם גורמים שלישיים לצורכי פרסום.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">4. Cookies ואנליטיקס</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              האתר משתמש ב-Google Analytics לצורך הבנת תנועת המשתמשים. המידע הנאסף הוא אנונימי ומצטבר. ניתן לבטל מעקב זה דרך הגדרות הדפדפן שלכם או דרך <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" dir="ltr">Google Analytics Opt-out</a>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">5. אחסון ואבטחה</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              האתר מתאחסן על שרתי Vercel (ארה&quot;ב). כתובות אימייל שנאספות לניוזלטר מאוחסנות בשירות Responder (ישראל). אנחנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלכם, אך שום שיטה אינה מאובטחת ב-100%.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">6. הזכויות שלכם</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              בהתאם לחוק הגנת הפרטיות הישראלי ו-GDPR (אם רלוונטי), יש לכם זכות:
            </p>
            <ul className="list-disc mb-6 text-muted-foreground">
              <li className="ms-6 mb-2">לדעת אילו נתונים יש לנו עליכם</li>
              <li className="ms-6 mb-2">לבקש תיקון של מידע שגוי</li>
              <li className="ms-6 mb-2">לבקש מחיקה של המידע שלכם</li>
              <li className="ms-6 mb-2">לבטל הרשמה לניוזלטר בכל עת (לחיצה על "הסר" בכל מייל)</li>
            </ul>
            <p className="mb-4 text-muted-foreground">
              לממש זכויות אלו, שלחו הודעה ל: <a href="mailto:hello@omanut-hakesher.co.il" className="text-primary hover:underline" dir="ltr">hello@omanut-hakesher.co.il</a>
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">7. קישורים לאתרים חיצוניים</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              האתר מכיל קישורים לרשתות חברתיות ופלטפורמות חיצוניות (YouTube, Spotify, Facebook, WhatsApp, Telegram). מדיניות הפרטיות של אותם שירותים חלה על הנתונים שאוספים הם - לא עלינו.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">8. שינויים במדיניות</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              נעדכן מדיניות זו מעת לעת. עדכונים מהותיים יפורסמו באתר. המשך השימוש באתר לאחר עדכון מהווה הסכמה למדיניות המעודכנת.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">9. יצירת קשר</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              לשאלות בנוגע למדיניות הפרטיות:
            </p>
            <ul className="list-none mb-6 text-muted-foreground">
              <li className="mb-2">
                <strong>אימייל:</strong>{" "}
                <a href="mailto:hello@omanut-hakesher.co.il" className="text-primary hover:underline" dir="ltr">
                  hello@omanut-hakesher.co.il
                </a>
              </li>
              <li className="mb-2">
                <strong>טלפון:</strong>{" "}
                <a href="tel:+972512518025" className="text-primary hover:underline" dir="ltr">
                  051-251-8025
                </a>
              </li>
            </ul>

          </div>
        </div>
      </section>
    </>
  );
}
