import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourageTrackerClient } from "@/components/book/CourageTrackerClient";

export const metadata: Metadata = {
  title: "יומן אומץ | פרק 8 - אומנות הקשר",
  description:
    "מעשה אומץ אחד ביום. כלי מעקב יומי לתיעוד מעשי אומץ קטנים שבונים משיכה ואמון עצמי.",
  alternates: { canonical: "/book/8/courage-tracker" },
  openGraph: {
    title: "יומן אומץ | פרק 8 - אומנות הקשר",
    description:
      "עקוב/י אחרי מעשי האומץ היומיים שלך וראה/י איך כל צעד קטן בונה אותך.",
    url: "/book/8/courage-tracker",
    locale: "he_IL",
    type: "website",
  },
};

export default function CourageTrackerPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 8", href: "/book/8" },
            { label: "יומן אומץ" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 border-b border-border/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center" dir="rtl">
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              פרק 8 • אומץ ומשיכה
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              יומן אומץ יומי
            </h1>
            <p className="text-xl text-muted-foreground mb-4 font-medium">
              מעשה אומץ אחד ביום. זה כל מה שצריך.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              אומץ הוא שריר. כל פעם שאתה/את עושה משהו קטן שמפחיד — אתה/את
              מחזק/ת אותו. לא צריך לנקוט צעדי ענק. צריך לנקוט צעד אחד, כל יום.
              המעקב הזה עוזר לראות איך מצטבר האומץ לאורך הזמן.
            </p>
          </div>
        </div>
      </section>

      {/* Tracker Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <CourageTrackerClient />
        </div>
      </section>

      {/* Context Note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center" dir="rtl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">על הכלי:</span> מבוסס על פרק 8 של
            &ldquo;אומנות הקשר&rdquo; — אומץ ומשיכה. כל הנתונים נשמרים רק
            במכשיר שלך ולא משותפים ברשת.
          </p>
        </div>
      </section>
    </>
  );
}
