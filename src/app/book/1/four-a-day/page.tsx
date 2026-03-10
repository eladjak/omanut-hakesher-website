import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FourADayClient } from "@/components/book/FourADayClient";

export const metadata: Metadata = {
  title: "4 משפטים ביום | פרק 1 - אומנות הקשר",
  description:
    "כל יום, 4 משפטים שמחליפים את הסיפור הישן בסיפור חדש. אימון יומי לחשיבה חיובית שמשנה את האופן שבו אתה/את רואה את עצמך, את הצד השני ואת הזוגיות.",
  alternates: { canonical: "/book/1/four-a-day" },
  openGraph: {
    title: "4 משפטים ביום | פרק 1 - אומנות הקשר",
    description:
      "4 משפטים ביום שמחדשים את הנרטיב הפנימי שלך לגבי זוגיות ואהבה.",
    url: "/book/1/four-a-day",
    locale: "he_IL",
    type: "website",
  },
};

export default function FourADayPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 1", href: "/book/1" },
            { label: "4 משפטים ביום" },
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
              פרק 1 • הסיפור שאתה מספר לעצמך
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              4 משפטים ביום
            </h1>
            <p className="text-xl text-muted-foreground mb-4 font-medium">
              לשכתב את הסיפור מבפנים.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              המוח שלנו מאמין למה שאנחנו חוזרים ואומרים לעצמנו. כל יום, 4
              משפטים קצרים — על עצמך, על הצד השני, על זוגיות — שמתחילים לבנות
              נרטיב חדש. לא ביום אחד, אבל יום אחרי יום, המשפטים האלה הופכים
              להיות הקול הפנימי שלך.
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <FourADayClient />
        </div>
      </section>

      {/* Context Note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center" dir="rtl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">על הכלי:</span> מבוסס על פרק 1 של
            &ldquo;אומנות הקשר&rdquo; — הסיפורים שאנחנו מספרים לעצמנו. כל
            הנתונים נשמרים רק במכשיר שלך ולא משותפים ברשת.
          </p>
        </div>
      </section>
    </>
  );
}
