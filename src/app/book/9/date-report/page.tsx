import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DateReportClient } from "@/components/book/quizzes/DateReportClient";

export const metadata: Metadata = {
  title: "דו\"ח דייט | פרק 9 - אומנות הקשר",
  description:
    "12 שאלות לעיבוד כל דייט — כדי להבין מה קרה, מה הרגשת, ומה ללמוד ממנו. עקוב אחרי דפוסים ותצמח מכל מפגש.",
  alternates: { canonical: "/book/9/date-report" },
  openGraph: {
    title: "דו\"ח דייט | פרק 9 - אומנות הקשר",
    description:
      "מלא/י אחרי כל דייט — עקוב/י אחרי דפוסים, תזהה/י מה עובד ומה לא, ותתקדם/י.",
    url: "/book/9/date-report",
    locale: "he_IL",
    type: "website",
  },
};

export default function DateReportPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 9", href: "/book/9" },
            { label: "דו\"ח דייט" },
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
              פרק 9 • היכרויות דיגיטליות
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              דו&quot;ח דייט
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              ניתוח קצר אחרי כל מפגש
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              מלא/י את השאלון מיד אחרי הדייט, כשהזיכרון עוד טרי. 12 שאלות
              שיעזרו לך להבין מה קרה, מה הרגשת, ומה ללמוד ממנו — כדי שהדייט
              הבא יהיה טוב יותר.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                🎯
              </span>
              <p className="text-sm font-medium">4 צירים</p>
              <p className="text-xs text-muted-foreground mt-1">
                אותנטיות, חיבור, צמיחה, עניין
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                📈
              </span>
              <p className="text-sm font-medium">מעקב דפוסים</p>
              <p className="text-xs text-muted-foreground mt-1">
                כל דוח נשמר — ראה את ההתקדמות שלך
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                ⏱
              </span>
              <p className="text-sm font-medium">3 דקות בלבד</p>
              <p className="text-xs text-muted-foreground mt-1">
                12 שאלות קצרות, תובנות עמוקות
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <DateReportClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">זכור/י:</span> כל דייט — גם הכי פחות
            מוצלח — הוא מידע יקר ערך. אין כישלונות, יש רק לקחים.
          </p>
        </div>
      </section>
    </>
  );
}
