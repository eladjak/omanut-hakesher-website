import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmotionWheelClient } from "@/components/book/EmotionWheelClient";

export const metadata: Metadata = {
  title: "גלגל הרגשות | פרק 6 - אומנות הקשר",
  description:
    "כלי אינטראקטיבי לזיהוי ומיפוי רגשות בזוגיות. מבוסס על גלגל הרגשות של פלוצ'יק — עם 8 רגשות בסיס ו-3 רמות עוצמה לכל אחד.",
  alternates: { canonical: "/book/6/emotion-wheel" },
  openGraph: {
    title: "גלגל הרגשות | פרק 6 - אומנות הקשר",
    description:
      "זהה/י מה אתה/את מרגיש/ה עכשיו, והבן/י מה זה אומר על הקשר שלך.",
    url: "/book/6/emotion-wheel",
    locale: "he_IL",
    type: "website",
  },
};

export default function EmotionWheelPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 6", href: "/book/6" },
            { label: "גלגל הרגשות" },
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
              פרק 6 • תקשורת
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" dir="rtl">
              גלגל הרגשות
            </h1>
            <p className="text-lg text-muted-foreground mb-4" dir="rtl">
              לזהות מה אתה/את מרגיש/ה — הצעד הראשון לתקשורת אמיתית
            </p>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              dir="rtl"
            >
              לפני שאפשר לתקשר טוב — צריך לדעת מה מרגישים. הכלי הזה עוזר
              לזהות את הרגש המדויק, להבין מה הוא אומר בהקשר של קשר, ולמצוא
              את הצעד הבא.
            </p>
          </div>
        </div>
      </section>

      {/* Emotion Wheel Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <EmotionWheelClient />
        </div>
      </section>

      {/* Context Note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center" dir="rtl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">על הכלי:</span> מבוסס על גלגל
            הרגשות של הפסיכולוג רוברט פלוצ'יק, המציג 8 רגשות בסיסיים עם 3
            רמות עוצמה לכל אחד. הנתונים נשמרים רק במכשיר שלך — אין שיתוף
            ברשת.
          </p>
        </div>
      </section>
    </>
  );
}
