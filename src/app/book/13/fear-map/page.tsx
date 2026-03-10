import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommitmentFearsClient } from "@/components/book/quizzes/CommitmentFearsClient";

export const metadata: Metadata = {
  title: "מפת פחדי מחויבות | פרק 13 - אומנות הקשר",
  description:
    "5 הפחדים הגדולים שמעכבים אותנו מהתחייבות — ממפה אותם ומגלה איזה מהם הדומיננטי אצלך. הצעד הראשון להתגבר על פחד הוא לזהות אותו.",
  alternates: { canonical: "/book/13/fear-map" },
  openGraph: {
    title: "מפת פחדי מחויבות | פרק 13 - אומנות הקשר",
    description:
      "10 שאלות שממפות את 5 פחדי המחויבות — פחד מאובדן חופש, בחירה לא נכונה, כישלון, פגיעה וזהות. גלה מה עוצר אותך.",
    url: "/book/13/fear-map",
    locale: "he_IL",
    type: "website",
  },
};

export default function CommitmentFearMapPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 13", href: "/book/13" },
            { label: "מפת פחדי מחויבות" },
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
              פרק 13 • פחדי מחויבות
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              מפת פחדי מחויבות
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              5 הפחדים הגדולים שעוצרים אותנו מלהתחייב
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              כשמבינים ממה בדיוק אנחנו מפחדים, הפחד מאבד מכוחו — הוא הופך
              ממפלצת ענקית מתחת למיטה למשהו שאפשר להסתכל לו בעיניים. 10
              שאלות יממפו את פחדי המחויבות שלך ויגלו איזה מהם הדומיננטי,
              ומה לעשות איתו.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <CommitmentFearsClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">חשוב לדעת:</span> פחד ממחויבות הוא
            לא חולשה — הוא עדות שאתה לוקח את הבחירה ברצינות. ההבדל בין
            פחד בריא לפחד משתק הוא שהפחד הבריא שואל שאלות, ואילו הפחד
            המשתק מונע ממך לשאול אותן בכלל.
          </p>
        </div>
      </section>
    </>
  );
}
