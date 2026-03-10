import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ConnectionScoreClient } from "@/components/book/quizzes/ConnectionScoreClient";

export const metadata: Metadata = {
  title: "ציון חיבור | פרק 11 - אומנות הקשר",
  description:
    "שאלון 4 צירים למדידת עומק החיבור — אינטלקטואלי, רגשי, פיזי וערכי. מלא אחרי כמה מפגשים וגלה אם יש כאן משהו אמיתי.",
  alternates: { canonical: "/book/11/connection-score" },
  openGraph: {
    title: "ציון חיבור | פרק 11 - אומנות הקשר",
    description:
      "12 שאלות שמודדות את עומק החיבור על 4 צירים — כדי לדעת אם מה שאתה מרגיש הוא כימיה אמיתית.",
    url: "/book/11/connection-score",
    locale: "he_IL",
    type: "website",
  },
};

export default function ConnectionScorePage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 11", href: "/book/11" },
            { label: "ציון חיבור" },
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
              ציון חיבור
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              מדידת עומק החיבור על 4 צירים
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              כימיה היא לא רק בטן — היא גם ראש, לב וערכים. 12 שאלות שיעזרו לך
              להבין אם מה שאתה מרגיש הוא ניצוץ אמיתי שכדאי לטפח, או תחושה
              שנשמעת טוב אבל לא עומדת בבחינה.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">🧠</span>
              <p className="text-sm font-medium">אינטלקטואלי</p>
              <p className="text-xs text-muted-foreground mt-1">
                עומק שיחה וגירוי
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">❤️</span>
              <p className="text-sm font-medium">רגשי</p>
              <p className="text-xs text-muted-foreground mt-1">
                בטיחות וראייה הדדית
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">✋</span>
              <p className="text-sm font-medium">פיזי</p>
              <p className="text-xs text-muted-foreground mt-1">
                משיכה ונוחות גופנית
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-2xl mb-2 block" aria-hidden="true">🧭</span>
              <p className="text-sm font-medium">ערכי</p>
              <p className="text-xs text-muted-foreground mt-1">
                יישור קו וחזון עתידי
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <ConnectionScoreClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">טיפ:</span> עדיף למלא את השאלון אחרי
            לפחות 2-3 מפגשים. בפגישה ראשונה קשה להבין את עומק החיבור — לפעמים
            הכי טובים לוקחים זמן להתגלות.
          </p>
        </div>
      </section>
    </>
  );
}
