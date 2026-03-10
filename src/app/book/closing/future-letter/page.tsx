import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FutureLetterClient } from "@/components/book/FutureLetterClient";

export const metadata: Metadata = {
  title: "מכתב לעצמי בעוד שנה | הספר - אומנות הקשר",
  description:
    "כתוב מכתב לעצמך של עוד שנה. 5 שאלות מנחות, 10 דקות, וזיכרון לכל החיים. בדיוק בעוד שנה תקבל תזכורת לפתוח אותו.",
  alternates: { canonical: "/book/closing/future-letter" },
  openGraph: {
    title: "מכתב לעצמי בעוד שנה | הספר - אומנות הקשר",
    description:
      "כתוב מכתב לעצמך של עוד שנה. 5 שאלות מנחות, 10 דקות, וזיכרון לכל החיים.",
    url: "/book/closing/future-letter",
    locale: "he_IL",
    type: "website",
  },
};

export default function FutureLetterPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "סיכום", href: "/book/closing" },
            { label: "מכתב לעתיד" },
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
              סיכום
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              מכתב לעצמי בעוד שנה
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              התרגיל האחרון שלנו יחד
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              &quot;עכשיו קפלו את הדף, שימו במעטפה, תכתבו עליה
              &apos;לפתוח בעוד שנה בדיוק&apos;.
              שימו תזכורת ביומן. זה חוזה. בינך לבינך.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Letter Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <FutureLetterClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">מאלעד:</span>{" "}
            כל פעם שמישהו כותב את המכתב הזה, אני יודע שהדרך עשתה את שלה.
            בהצלחה.
          </p>
        </div>
      </section>
    </>
  );
}
