import type { Metadata } from "next";
import Link from "next/link";
import companionManifest from "../../../data/book-companion-links.json";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "הליווי הדיגיטלי לספר בהכנה | אומנות הקשר",
  description:
    "הצצה שקופה לשמונה שערי הליווי המתוכננים לספר אומנות הקשר. הספר שלם בפני עצמו, והמדיה והכלים עדיין בהכנה.",
  alternates: { canonical: "/book-companion" },
  robots: { index: true, follow: true },
};

type CompanionLink = (typeof companionManifest.links)[number];

const productionDrafts = new Set(["BC-01", "BC-08"]);

function accessCopy(link: CompanionLink): string {
  if (link.access === "book-reader") {
    return "מיועד לקוראי הספר. עדיין אין קישור או כניסה פעילה.";
  }
  return "מתוכנן להיות פתוח. עדיין אין קישור פעיל.";
}

export default function BookCompanionPage() {
  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "הליווי הדיגיטלי" },
          ]}
        />
      </div>

      <main>
        <section className="py-20 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <Badge variant="outline" className="mb-5 border-accent/40 text-accent-dark">
              בתהליך הפקה
            </Badge>
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-6xl">
              הליווי הדיגיטלי של הספר הולך ונבנה
            </h1>
            <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              אומנות הקשר הוא ספר מעשי על בחירה, תקשורת וקרבה. לאורך הספר מתוכננים שמונה שערים
              שיאפשרו לשמוע את אלעד, לתרגל ולבחור איך להמשיך. הם עדיין בהכנה ואינם זמינים לשימוש.
            </p>
          </div>
        </section>

        <section className="border-y border-border/40 bg-muted/30 py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="rounded-3xl border border-primary/20 bg-background p-7 text-center shadow-sm md:p-9">
              <h2 className="mb-3 text-2xl font-bold">הספר שלם גם בלי האתר</h2>
              <p className="leading-relaxed text-muted-foreground">
                אפשר לקרוא, לתרגל ולסיים את הספר בלי לפתוח שום מסך. הליווי יוסיף קול, תרגול ומקום
                להמשך, אבל הוא אינו תנאי להבנת הספר ואינו מסלול שחייבים להשלים.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                שמונה שערים מתוכננים
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">מה מתוכנן לפגוש את הקוראים</h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                זו מפת עבודה שקופה, לא קטלוג של דברים שכבר קיימים. כל שער נשאר ללא קישור עד שהתוכן,
                החלופה והבדיקות שלו מוכנים באמת.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {companionManifest.links.map((link, index) => (
                <Card key={link.id} className="border-border/60 bg-background">
                  <CardContent className="flex h-full flex-col p-7">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 font-bold text-primary tabular-nums">
                        {index + 1}
                      </span>
                      <div className="flex flex-wrap justify-end gap-2">
                        <Badge variant="outline">מתוכנן</Badge>
                        <Badge variant="secondary">
                          {link.access === "book-reader" ? "לקוראי הספר" : "פתוח"}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{link.purpose}</h3>
                    <p className="mb-5 leading-relaxed text-muted-foreground">{accessCopy(link)}</p>
                    {productionDrafts.has(link.id) && (
                      <p className="mt-auto rounded-2xl border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-muted-foreground">
                        קיימת טיוטת הפקה פנימית. אין עדיין סרטון, הקלטה או תוכן זמין לצפייה.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 text-white">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">בינתיים, אין צורך לחכות</h2>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/85">
              אפשר להכיר את הספר או לבחור מדריך שכבר זמין במרכז המשאבים. כשהליווי יהיה מוכן, העמוד
              הזה יתעדכן רק במה שעובד בפועל.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex min-h-11 items-center rounded-full bg-white px-8 py-3 font-semibold text-secondary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                חזרה לספר
              </Link>
              <Link
                href="/resources"
                className="inline-flex min-h-11 items-center rounded-full border-2 border-white/60 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                למשאבים שכבר זמינים
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

