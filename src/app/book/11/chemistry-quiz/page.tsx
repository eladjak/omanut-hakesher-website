import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChemistryQuizClient } from "@/components/book/quizzes/ChemistryQuizClient";

export const metadata: Metadata = {
  title: "שאלון כימיה | פרק 11 - אומנות הקשר",
  description:
    "15 שאלות לזיהוי סוג הכימיה שלך — פיזית, רגשית או שכלית. גלה איזה ציר מוביל אצלך ומה צריך כדי לבנות חיבור אמיתי.",
  alternates: { canonical: "/book/11/chemistry-quiz" },
  openGraph: {
    title: "שאלון כימיה | פרק 11 - אומנות הקשר",
    description:
      "15 שאלות שיעזרו לך להבין את סוג הכימיה שאתה חווה — ומה זה אומר על הפוטנציאל של הקשר.",
    url: "/book/11/chemistry-quiz",
    locale: "he_IL",
    type: "website",
  },
};

export default function ChemistryQuizPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 11", href: "/book/11" },
            { label: "שאלון כימיה" },
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
              פרק 11 • כימיה
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              שאלון כימיה
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              איזה סוג כימיה אתה/את חווה?
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              כימיה היא לא דבר אחד — היא שלושה דברים שונים שיכולים להופיע יחד
              או בנפרד. שאלון זה יעזור לך לזהות איזה ציר מוביל אצלך, ומה חסר
              לחיבור שלם.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                🔥
              </span>
              <p className="text-sm font-medium">כימיה פיזית</p>
              <p className="text-xs text-muted-foreground mt-1">
                משיכה, פרפרים, נוכחות
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                💛
              </span>
              <p className="text-sm font-medium">כימיה רגשית</p>
              <p className="text-xs text-muted-foreground mt-1">
                הבנה, בטיחות, ראייה
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                🧠
              </span>
              <p className="text-sm font-medium">כימיה שכלית</p>
              <p className="text-xs text-muted-foreground mt-1">
                גירוי, סקרנות, עניין
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <ChemistryQuizClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">לזכור:</span> כימיה פיזית היא הראשונה
            לצוץ ולרוב גם הראשונה להתיישן. כימיה רגשית ושכלית — אלה מה שמחזיק
            את הזוגיות לשנים. שלושתן ביחד? זה הקומבינציה שאתה מחפש.
          </p>
        </div>
      </section>
    </>
  );
}
