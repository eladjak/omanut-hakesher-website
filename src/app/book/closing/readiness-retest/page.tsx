import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReadinessRetestClient } from "@/components/book/quizzes/ReadinessRetestClient";

export const metadata: Metadata = {
  title: "שאלון מוכנות — מבחן חוזר | הספר - אומנות הקשר",
  description:
    "אותן 10 שאלות מההתחלה — הפעם אחרי שקראת את הספר. גלה כמה התקדמת.",
  alternates: { canonical: "/book/closing/readiness-retest" },
  openGraph: {
    title: "שאלון מוכנות — מבחן חוזר | הספר - אומנות הקשר",
    description:
      "אותן 10 שאלות מההתחלה — הפעם אחרי שקראת את הספר. גלה כמה התקדמת.",
    url: "/book/closing/readiness-retest",
    locale: "he_IL",
    type: "website",
  },
};

export default function ReadinessRetestPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "סיכום", href: "/book/closing" },
            { label: "מבחן חוזר" },
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
              סיכום • מבחן חוזר
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              שאלון מוכנות — מבחן חוזר
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              לבדוק כמה התקדמת
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              אותן 10 שאלות מההתחלה — הפעם אחרי שקראת את הספר.
              ענה בכנות ותראה עד כמה השתנית. אם עשית את השאלון
              בהקדמה, תקבל גם השוואה לפני ואחרי.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <ReadinessRetestClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">רגע של הוקרה:</span> המסע שעברת
            לאורך הספר הוא לא דבר של מה בכך. כל תרגיל, כל שאלה, כל
            רגע של כנות עם עצמך — זה מה שמשנה.
          </p>
        </div>
      </section>
    </>
  );
}
