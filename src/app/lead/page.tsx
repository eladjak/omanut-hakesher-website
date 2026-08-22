import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getLeadMagnet } from "@/lib/lead-magnets";

export const metadata: Metadata = {
  title: "מדריכים חינמיים לתרגול קשר | אומנות הקשר",
  description:
    "שלושה מדריכים מעשיים שאפשר לפתוח מיד, בלי טופס ובלי הרשמה: אומץ, חזון אישי ושיחה טובה בדייט.",
  alternates: { canonical: "/lead" },
  openGraph: {
    title: "מדריכים חינמיים לתרגול קשר | אומנות הקשר",
    description: "לבחור כלי אחד, לפתוח אותו מיד ולצאת עם תרגול קטן לשבוע הקרוב.",
    url: "/lead",
    locale: "he_IL",
    type: "website",
  },
};

const availableGuides = [
  {
    slug: "courage",
    eyebrow: "להתחיל מצעד קטן",
    description:
      "שמונה דרכים לתרגל פעולה מדורגת בלי להפוך אומץ ללחץ, מבחן או הופעה.",
    use: "מתאים כשרוצים לבחור פעולה אחת שאפשר לנסות וללמוד ממנה.",
  },
  {
    slug: "vision",
    eyebrow: "להתחיל מבהירות",
    description:
      "דרך מעשית לברר ערכים, העדפות וגבולות ולנסח חזון שנשאר פתוח לעדכון.",
    use: "מתאים כשרוצים מצפן לשיחה ולהחלטה, לא רשימת תנאים קשיחה.",
  },
  {
    slug: "dating-talks",
    eyebrow: "להתחיל משיחה",
    description:
      "עשרה עקרונות להקשבה, סקרנות ושיתוף הדדי בדייט — עם קצב, הסכמה ומקום לשתיקה.",
    use: "מתאים כשרוצים לתרגל שיחה טובה בלי לשנן טקסט או לנסות להרשים.",
  },
] as const;

export default function LeadGuidesPage() {
  const guides = availableGuides.map((guide) => {
    const config = getLeadMagnet(guide.slug);
    if (!config?.deliverable) {
      throw new Error(`Public guide is not deliverable: ${guide.slug}`);
    }
    return { ...guide, ...config };
  });

  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs items={[{ label: "מדריכים חינמיים" }]} />
      </div>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            פתוח עכשיו
          </Badge>
          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold text-balance md:text-5xl">
            לבחור כלי אחד — ולפתוח אותו מיד
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            שלושת המדריכים בעמוד הזה זמינים לקריאה ישירה. אין צורך להשאיר
            אימייל, להצטרף לרשימה או לחכות להודעה כדי לקבל את מה שהובטח.
          </p>
        </div>
      </section>

      <section className="bg-muted/30 py-20" aria-labelledby="available-guides-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 id="available-guides-heading" className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              מה מתאים לשאלה שמעסיקה אותך עכשיו?
            </h2>
            <p className="text-muted-foreground">
              אפשר לקרוא על כל מדריך לפני הפתיחה, או לגשת ישירות ל־PDF.
            </p>
          </div>

          <ul className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Card className="h-full border-border/60">
                  <CardContent className="flex h-full flex-col p-7">
                    <span className="mb-3 text-sm font-semibold text-primary">{guide.eyebrow}</span>
                    <h3 className="mb-3 text-2xl font-bold text-balance">{guide.titleHe}</h3>
                    <p className="mb-5 leading-relaxed text-muted-foreground">{guide.description}</p>
                    <p className="mb-7 border-t border-border/50 pt-4 text-sm leading-relaxed text-muted-foreground">
                      {guide.use}
                    </p>
                    <div className="mt-auto flex flex-col gap-3">
                      <Link
                        href={`/lead/${guide.slug}`}
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                      >
                        להכיר ולתרגל
                      </Link>
                      <a
                        href={guide.assetUrl}
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-center font-semibold transition-colors hover:bg-muted"
                      >
                        לפתיחת ה־PDF
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold">מעדיפים להתחיל מקריאה קצרה?</h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            ספריית התוכן הפתוח מאפשרת לבחור מאמר או פרק פודקאסט בלי מסלול קבוע.
          </p>
          <Link
            href="/resources"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 px-7 py-3 font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            לתוכן הפתוח
          </Link>
        </div>
      </section>
    </>
  );
}
