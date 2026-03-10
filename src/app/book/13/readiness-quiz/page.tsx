import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommitmentReadinessClient } from "@/components/book/quizzes/CommitmentReadinessClient";

export const metadata: Metadata = {
  title: "מוכנות למחויבות | פרק 13 - אומנות הקשר",
  description:
    "האם אתה מוכן להתחייב — או רק מפחד להיות לבד? 12 שאלות שיעזרו לך להבחין בין מוכנות אמיתית לפחד. שאלון שונה לחלוטין מזה שבהקדמה.",
  alternates: { canonical: "/book/13/readiness-quiz" },
  openGraph: {
    title: "מוכנות למחויבות | פרק 13 - אומנות הקשר",
    description:
      "12 שאלות על מוכנות רגשית, מעשית וזוגית להתחייבות. לא כולם מוכנים באותו הרגע — גלה איפה אתה עומד.",
    url: "/book/13/readiness-quiz",
    locale: "he_IL",
    type: "website",
  },
};

export default function CommitmentReadinessPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 13", href: "/book/13" },
            { label: "מוכנות למחויבות" },
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
              פרק 13 • מוכנות למחויבות
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              שאלון מוכנות למחויבות
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              האם אתה מוכן להתחייב — או רק מפחד להיות לבד?
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              לא כולם מוכנים למחויבות באותו הרגע. הבעיה מתחילה כשאתה לא
              מוכן, אבל מספר לעצמך שכן. 12 שאלות על מוכנות רגשית, מעשית
              וזוגית יעזרו לך להבחין בין מוכנות אמיתית לבריחה מבדידות.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <CommitmentReadinessClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">חשוב לדעת:</span> מחויבות היא לא
            רגש שמגיע יום אחד — היא החלטה. לא מחליטים בוודאות מוחלטת, אלא
            מתוך ידיעה שהנכונות קיימת. אם קראת עד לכאן, כבר עשית עבודה
            שרוב האנשים לא עושים.
          </p>
        </div>
      </section>
    </>
  );
}
