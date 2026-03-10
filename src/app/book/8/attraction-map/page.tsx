import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AttractionMapClient } from "@/components/book/quizzes/AttractionMapClient";
import { attractionMapConfig } from "@/data/book/quizzes/attraction-map";

export const metadata: Metadata = {
  title: "מפת המשיכה | פרק 8 - אומנות הקשר",
  description:
    "מה באמת מושך אותך? 12 שאלות בשלוש שכבות — שטח, עומק וליבה — שיגלו את דפוס המשיכה האישי שלך.",
  alternates: { canonical: "/book/8/attraction-map" },
  openGraph: {
    title: "מפת המשיכה | פרק 8 - אומנות הקשר",
    description:
      "רוב האנשים חושבים שהם יודעים מה מושך אותם. גלה את שלוש השכבות שמרכיבות את פירמידת המשיכה שלך.",
    url: "/book/8/attraction-map",
    locale: "he_IL",
    type: "website",
  },
};

export default function AttractionMapPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 8", href: "/book/8" },
            { label: "מפת המשיכה" },
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
              פרק 8 • אומץ ומשיכה
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              מפת המשיכה שלך
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              מה באמת מושך אותך — בשלוש שכבות
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              רוב האנשים חושבים שהם יודעים מה מושך אותם. אבל המשיכה עובדת
              בשלוש שכבות — שטח, עומק וליבה — ורוב הזמן אנחנו לא מודעים לאיזו
              שכבה שולטת בנו. 12 שאלות שיגלו לך את הפירמידה האישית שלך.
            </p>
          </div>
        </div>
      </section>

      {/* Three levels overview */}
      <section className="py-10 border-b border-border/30 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6 text-center">
            שלוש שכבות המשיכה
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {attractionMapConfig.axes.map((axis) => (
              <div key={axis.id} className="text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl mx-auto mb-2"
                  style={{ backgroundColor: `${axis.color}20`, border: `2px solid ${axis.color}40` }}
                >
                  {axis.id === "surface" ? "✨" : axis.id === "depth" ? "🧠" : "❤️"}
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: axis.color }}>
                  {axis.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {axis.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <AttractionMapClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">חשוב:</span> אין תשובות נכונות או
            שגויות — כל דפוס משיכה הוא לגיטימי. המטרה היא מודעות, לא שינוי
            כפוי. ככל שתדע מה מושך אותך, כך תוכל לבחור בצורה ברורה יותר.
          </p>
        </div>
      </section>
    </>
  );
}
