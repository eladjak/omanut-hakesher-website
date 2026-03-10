import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReadinessQuizClient } from "@/components/book/quizzes/ReadinessQuizClient";
import { readinessQuizConfig } from "@/data/book/quizzes/readiness-quiz";

export const metadata: Metadata = {
  title: "שאלון מוכנות | הספר - אומנות הקשר",
  description:
    "10 שאלות שיעזרו לך להבין איפה אתה עומד לפני שמתחילים את המסע לזוגיות",
  alternates: { canonical: "/book/intro/readiness-quiz" },
  openGraph: {
    title: "שאלון מוכנות | הספר - אומנות הקשר",
    description:
      "10 שאלות שיעזרו לך להבין איפה אתה עומד לפני שמתחילים את המסע לזוגיות",
    url: "/book/intro/readiness-quiz",
    locale: "he_IL",
    type: "website",
  },
};

export default function ReadinessQuizPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "הקדמה", href: "/book/intro" },
            { label: "שאלון מוכנות" },
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
              פתח דבר • כלי ראשון
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              שאלון מוכנות
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              איפה אתה עומד לפני שמתחילים
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              לפני שנצא יחד לדרך, כדאי לדעת מאיפה מתחילים. השאלון הזה מודד
              5 צירים של מוכנות לזוגיות — ובסוף הספר תחזור לאותן שאלות
              ותראה עד כמה התקדמת.
            </p>
          </div>
        </div>
      </section>

      {/* Axes overview */}
      <section className="py-10 border-b border-border/30 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6 text-center">
            5 צירי המדידה
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {readinessQuizConfig.axes.map((axis) => (
              <div key={axis.id} className="text-center">
                <p className="font-semibold text-sm mb-1">{axis.label}</p>
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
          <ReadinessQuizClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">טיפ:</span> ענה בכנות — אין תשובות
            נכונות. ככל שתהיה כן עם עצמך, כך הספר יוכל לשמש אותך טוב יותר.
            תוכל לחזור לשאלון הזה בסיום הקריאה{" "}
            <a
              href="/book/closing/readiness-retest"
              className="text-primary hover:underline"
            >
              בפרק הסיום
            </a>{" "}
            ולהשוות את ההתקדמות שלך.
          </p>
        </div>
      </section>
    </>
  );
}
