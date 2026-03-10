import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FearMapClient } from "@/components/book/quizzes/FearMapClient";

export const metadata: Metadata = {
  title: "מפת הפחדים שלך | פרק 2 - אומנות הקשר",
  description:
    "מפה את 14 הפחדים הנפוצים ביותר בדרך לזוגיות — ותגלה אילו מהם שולטים בך. הצעד הראשון לשחרור הוא ידיעת הפחד.",
  alternates: { canonical: "/book/2/fear-map" },
  openGraph: {
    title: "מפת הפחדים שלך | פרק 2 - אומנות הקשר",
    description:
      "14 שאלות שממפות את הפחדים שלך בזוגיות — גלה אילו מהם דומיננטיים ומה לעשות איתם.",
    url: "/book/2/fear-map",
    locale: "he_IL",
    type: "website",
  },
};

export default function FearMapPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 2", href: "/book/2" },
            { label: "מיפוי הפחדים" },
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
              פרק 2 • מיפוי פחדים
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              מפת הפחדים שלך
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              14 הפחדים שעוצרים אותנו בדרך לזוגיות
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              לכולנו יש פחדים שמשפיעים על הדרך שלנו לזוגיות — רובנו פשוט לא
              יודעים לזהות אותם. השאלון הזה ממפה את 14 הפחדים הנפוצים ביותר
              ומגלה אילו מהם דומיננטיים אצלך. ידיעת הפחד היא הצעד הראשון
              לשחרור ממנו.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <FearMapClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">חשוב לדעת:</span> הפחדים שזיהית
            אינם חולשות — הם מנגנוני הגנה שנוצרו מסיבה. הצעד הראשון הוא
            לראות אותם בעיניים פקוחות, בלי שיפוטיות.
          </p>
        </div>
      </section>
    </>
  );
}
