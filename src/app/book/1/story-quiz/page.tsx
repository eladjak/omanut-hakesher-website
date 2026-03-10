import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StoryQuizClient } from "@/components/book/quizzes/StoryQuizClient";

export const metadata: Metadata = {
  title: "שאלון הסיפורים — מה הנרטיב שמשפיע עליך? | פרק 1 - אומנות הקשר",
  description:
    "10 שאלות לזיהוי הסיפור הדומיננטי שאתה נושא על עצמך, על הצד השני, ועל זוגיות בכלל — ואיך לשכתב אותו.",
  alternates: { canonical: "/book/1/story-quiz" },
  openGraph: {
    title: "שאלון הסיפורים | פרק 1 - אומנות הקשר",
    description:
      "גלה איזה סיפור דוחק את הזוגיות שלך לאחור — ואיך להתחיל לשכתב אותו.",
    url: "/book/1/story-quiz",
    locale: "he_IL",
    type: "website",
  },
};

export default function StoryQuizPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 1", href: "/book/1" },
            { label: "שאלון הסיפורים" },
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
              פרק 1 • שאלון הסיפורים
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              מה הסיפור שלך?
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              הנרטיב שמעצב את הדרך שלך לזוגיות
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              כולנו נושאים סיפורים — על עצמנו, על הצד השני, ועל זוגיות בכלל.
              חלק מהסיפורים האלה עוזרים לנו, וחלק מחזיקים אותנו במקום.
              10 שאלות יעזרו לך לזהות איזה סיפור הכי משפיע עליך.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <StoryQuizClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">חשוב לדעת:</span> הסיפורים שאנחנו מספרים לעצמנו
            אינם עובדה — הם פרשנות. הצעד הראשון לשינוי הוא פשוט לזהות אותם.
          </p>
        </div>
      </section>
    </>
  );
}
