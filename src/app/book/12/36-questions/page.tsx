import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ThirtySixQuestionsClient } from "@/components/book/ThirtySixQuestionsClient";

export const metadata: Metadata = {
  title: "36 השאלות ליצירת קרבה | פרק 12 - אומנות הקשר",
  description:
    "36 קלפי שאלות דיגיטליים מבוססים על ניסוי ארתור אהרון (1997) — שלושה שלבים של שאלות שיוצרות קרבה אמיתית עם כל מי שתרצה להכיר לעומק.",
  alternates: { canonical: "/book/12/36-questions" },
  openGraph: {
    title: "36 השאלות ליצירת קרבה | פרק 12 - אומנות הקשר",
    description:
      "36 שאלות בשלושה שלבים שיוצרות קרבה אמיתית — מניסוי אהרון 1997, מותאם לעברית.",
    url: "/book/12/36-questions",
    locale: "he_IL",
    type: "website",
  },
};

export default function ThirtySixQuestionsPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 12", href: "/book/12" },
            { label: "36 שאלות" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 border-b border-border/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              פרק 12 • פגיעות ואינטימיות
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              36 השאלות ליצירת קרבה
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              משחק קלפים דיגיטלי מבוסס על ניסוי אהרון
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              ב-1997 גילה הפסיכולוג ארתור אהרון שאפשר ליצור תחושה של קרבה
              עמוקה בין שני זרים — תוך פחות משעה. הסוד? 36 שאלות שנעות
              מהקל אל הכבד, מחשיפה ראשונית לפגיעות אמיתית. כאן המשחק
              המלא, מותאם לעברית.
            </p>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section className="py-10 border-b border-border/30 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl">👥</div>
              <h3 className="font-semibold">שב/י מול מישהו</h3>
              <p className="text-sm text-muted-foreground">
                בן/בת זוג פוטנציאלי/ת, חבר/ה קרוב/ה, או מישהו שתרצה/י להכיר
                לעומק
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🃏</div>
              <h3 className="font-semibold">קראו בתורות</h3>
              <p className="text-sm text-muted-foreground">
                הקלף מוצג על המסך — שניכם קוראים את השאלה ועונים עליה. 36
                קלפים, 3 שלבים
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">👁️</div>
              <h3 className="font-semibold">סיום: 4 דקות עיניים</h3>
              <p className="text-sm text-muted-foreground">
                אחרי השאלה האחרונה — הסתכלו זה לזו/זו לזה בשקט, ללא מילים,
                ארבע דקות שלמות
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Card Game */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <ThirtySixQuestionsClient />
        </div>
      </section>

      {/* Context Note — Arthur Aron */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-muted/30 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-semibold text-foreground/80">
              על הניסוי המקורי
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              בשנת 1997 פרסם הפסיכולוג ארתור אהרון (Arthur Aron) ועמיתיו
              מחקר בשם{" "}
              <em>
                &quot;The Experimental Generation of Interpersonal
                Closeness&quot;
              </em>
              . המחקר הראה שזרים שענו ביחד על 36 שאלות בעוצמה עולה — וסיימו
              בהסתכלות שקטה של 4 דקות עין בעין — חשו קרבה עמוקה זה לזה.
              חלקם הפכו לזוגות.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              הרעיון הפשוט: קרבה נוצרת כשאנחנו חושפים את עצמנו בהדרגה,
              ומישהו רואה אותנו ומרגיש את עצמו נראה בחזרה. זה בדיוק מה שעושות
              השאלות האלה.
            </p>
            <p className="text-xs text-muted-foreground/60">
              המשחק כאן הוא עיבוד חופשי לעברית, בהתאם לרוח הספר &quot;אומנות
              הקשר&quot;.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
