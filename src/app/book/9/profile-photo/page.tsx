import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProfilePhotoGuideClient } from "@/components/book/ProfilePhotoGuideClient";

export const metadata: Metadata = {
  title: "מדריך תמונת פרופיל | פרק 9 - אומנות הקשר",
  description:
    "מדריך אינטראקטיבי לבחירת תמונות פרופיל שעובדות באפליקציות היכרויות. 6 קטגוריות, רשימת תיוג מלאה, וציון מוכנות אישי.",
  alternates: { canonical: "/book/9/profile-photo" },
  openGraph: {
    title: "מדריך תמונת פרופיל | פרק 9 - אומנות הקשר",
    description:
      "מה לשים, מה לא לשים, ואיך לבדוק שהפרופיל שלך עושה את העבודה.",
    url: "/book/9/profile-photo",
    locale: "he_IL",
    type: "website",
  },
};

export default function ProfilePhotoPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 9", href: "/book/9" },
            { label: "מדריך תמונת פרופיל" },
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
              פרק 9 • היכרויות אונליין
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              מדריך תמונת פרופיל
            </h1>
            <p className="text-xl text-muted-foreground mb-4 font-medium">
              מה לשים, מה לא לשים, ואיך לדעת שהפרופיל עובד.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              90% מההחלטות באפליקציות היכרויות מתבצעות על סמך התמונות בלבד.
              הכלי הזה עוזר לוודא שהתמונות שלך מייצגות אותך אמיתי — ומושכות
              בדיוק את מי שמתאים לך.
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <ProfilePhotoGuideClient />
        </div>
      </section>

      {/* Context Note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center" dir="rtl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">על הכלי:</span> מבוסס על פרק 9 של
            &ldquo;אומנות הקשר&rdquo; — היכרויות אונליין. כל הנתונים נשמרים
            רק במכשיר שלך ולא משותפים ברשת.
          </p>
        </div>
      </section>
    </>
  );
}
