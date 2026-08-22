import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OfferJourney } from "@/components/OfferJourney";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PRODUCT_FACTS } from "@/lib/product-facts";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "שירותים וליווי | אומנות הקשר",
  description:
    "מפת בחירה בין תוצר ממוקד, תוכנית לימודית וליווי אישי — עם שאלות שיעזרו לבדוק מה מתאים לפני התחייבות.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "שירותים וליווי | אומנות הקשר",
    description: "לבחור תמיכה לפי המטרה: תוצר נקודתי, תהליך מובנה או מענה אישי.",
    url: "/services",
    locale: "he_IL",
    type: "website",
  },
};

const datingCard = getProduct("dating-card")!;

const servicePaths = [
  {
    signal: "יש צורך בתוצר אחד מוגדר",
    title: datingCard.nameHe,
    description:
      "שירות ממוקד לניסוח פרופיל היכרויות על בסיס שאלון אישי. זהו תוצר נקודתי, לא תהליך ליווי מתמשך.",
    questions: [
      "האם המטרה כרגע היא לשפר את האופן שבו הפרופיל מציג אותך?",
      "האם ברור אילו חומרי גלם ותשובות נדרשים?",
      "האם זמינות ותהליך המסירה מתאימים לך?",
    ],
    href: datingCard.path,
    cta: "לפרטי שירות הפרופיל",
  },
  {
    signal: "יש צורך ברצף לימודי ותרגול",
    title: "תוכנית הדרך",
    description: `${PRODUCT_FACTS.course.weeks} שבועות ו־${PRODUCT_FACTS.course.phases} שלבים של תוכן, תרגול ורפלקציה.`,
    questions: [
      "האם רצף שבועי יעזור להתמיד יותר מקריאה עצמאית?",
      "האם מבנה התוכנית עונה על הנושאים שרוצים לתרגל?",
      "האם תנאי ההצטרפות והמסגרת הנוכחית מתאימים?",
    ],
    href: "/programs/the-way",
    cta: "למבנה התוכנית",
  },
  {
    signal: "יש צורך במשוב ובהתאמה אישית",
    title: "ליווי אישי",
    description:
      "מסגרת אישית מתחילה בבירור המטרה, אופן העבודה וההתאמה ההדדית. פרטי ההיקף והזמינות צריכים להיות ברורים לפני התחייבות.",
    questions: [
      "איזה סוג משוב חסר כרגע?",
      "מה אמור להיות שונה בסיום מסגרת הליווי?",
      "מה כלול, מה לא כלול ומהם גבולות הזמינות?",
    ],
    href: "/coaching",
    cta: "להכיר את מסגרת הליווי",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs items={[{ label: "שירותים וליווי" }]} />
      </div>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            מתחילים מהמטרה, לא מהחבילה
          </Badge>
          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold text-balance md:text-5xl">
            איזה סוג תמיכה יכול לשרת אותך עכשיו?
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            לפעמים צריך תוצר נקודתי, לפעמים רצף לימודי, ולפעמים משוב אישי.
            ההבדל חשוב — והוא מאפשר לבחור מסגרת מדויקת יותר וגם להחליט שלא צריך שירות כרגע.
          </p>
        </div>
      </section>

      <section className="bg-muted/30 py-20" aria-labelledby="service-paths-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 id="service-paths-heading" className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              שלוש מטרות — שלושה סוגי מענה
            </h2>
            <p className="text-muted-foreground">
              השאלות בכל כרטיס הן כלי החלטה. הן אינן מבחן, ואין תשובה שמחייבת לבחור בשירות.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {servicePaths.map((service) => (
              <Card key={service.title} className="border-border/60">
                <CardContent className="flex h-full flex-col p-7">
                  <span className="mb-3 text-sm font-semibold text-primary">{service.signal}</span>
                  <h3 className="mb-3 text-2xl font-bold text-balance">{service.title}</h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
                    {service.description}
                  </p>
                  <h4 className="mb-3 text-sm font-bold">כדאי לברר לפני שממשיכים</h4>
                  <ul className="mb-7 space-y-3 text-sm text-muted-foreground">
                    {service.questions.map((question) => (
                      <li key={question} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-0.5 text-primary">?</span>
                        <span className="leading-relaxed">{question}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                  >
                    {service.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-background p-7 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <Badge variant="secondary" className="mb-4">לפני פנייה</Badge>
                <h2 className="mb-3 text-2xl font-bold text-balance md:text-3xl">
                  שלושה דברים שכדאי להביא לשיחת בירור
                </h2>
                <ol className="space-y-3 text-muted-foreground">
                  <li><strong className="text-foreground">1. מטרה:</strong> מה רוצים להבין, לתרגל או לקבל כתוצר.</li>
                  <li><strong className="text-foreground">2. מסגרת:</strong> כמה זמן ואנרגיה אפשר להקדיש כרגע.</li>
                  <li><strong className="text-foreground">3. גבולות:</strong> מה חשוב לדעת על פרטיות, זמינות ואופן התקשורת.</li>
                </ol>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-border px-7 py-3 font-semibold transition-colors hover:bg-muted"
              >
                לשאלה כללית
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-muted/30">
        <OfferJourney current="guidance" compact />
      </div>
    </>
  );
}
