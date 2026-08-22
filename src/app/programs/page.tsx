import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OfferJourney } from "@/components/OfferJourney";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PRODUCT_FACTS } from "@/lib/product-facts";

export const metadata: Metadata = {
  title: "תוכניות ומסלולי למידה | אומנות הקשר",
  description:
    "השוואה בין תוכן פתוח, הספר, תוכנית הדרך וליווי — כולל מבנה התוכנית והשאלות שכדאי לברר לפני שבוחרים.",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "תוכניות ומסלולי למידה | אומנות הקשר",
    description: "מפת בחירה לפי עומק, קצב ורמת התמיכה הרצויה.",
    url: "/programs",
    locale: "he_IL",
    type: "website",
  },
};

const canonicalPhases = [
  { number: "01", title: "גישה", focus: "מיפוי נקודת הפתיחה, סיפורים, אמונות ופחדים." },
  { number: "02", title: "תקשורת", focus: "צרכים, רגשות, גבולות ושיחה הדדית." },
  { number: "03", title: "משיכה ותנועה", focus: "מעבר הדרגתי מהתבוננות לפעולה בעולם ההיכרויות." },
  { number: "04", title: "חיבור", focus: "הקשבה, סקרנות והבחנה בין חיבור, משיכה והתאמה." },
  { number: "05", title: "אינטימיות", focus: "קרבה הדרגתית עם פרטיות, הסכמה ואפשרות לעצור." },
  { number: "06", title: "מחויבות", focus: "שיחות והחלטות על הקשר מתוך בהירות והדדיות." },
] as const;

const decisionCards = [
  {
    title: "עדיף להתחיל מתוכן פתוח כש...",
    items: [
      "יש שאלה אחת שמעסיקה אותך עכשיו.",
      "עוד לא ברור אם סגנון העבודה מתאים.",
      "אין כרגע זמן לרצף שבועי.",
    ],
    href: "/resources",
    cta: "לתוכן הפתוח",
  },
  {
    title: "הספר יכול להתאים כש...",
    items: [
      "רוצים תמונה רחבה ולא רק מאמר נקודתי.",
      "נוח יותר לקרוא ולתרגל בקצב אישי.",
      "לא צריך כרגע משוב או מסגרת שבועית.",
    ],
    href: "/book",
    cta: "להכיר את הספר",
  },
  {
    title: "התוכנית יכולה להתאים כש...",
    items: [
      "רוצים רצף מובנה לאורך זמן.",
      "תרגול מצטבר יעזור יותר מצריכת תוכן מזדמנת.",
      "אפשר לפנות מקום למסגרת של 12 שבועות.",
    ],
    href: "/programs/the-way",
    cta: "למבנה המלא",
  },
] as const;

export default function ProgramsIndexPage() {
  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs items={[{ label: "תוכניות" }]} />
      </div>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            לבחור לפי הצורך הנוכחי
          </Badge>
          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold text-balance md:text-5xl">
            מסלול טוב מתחיל בהחלטה מה באמת צריך
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            אפשר להכיר רעיון אחד, לעבוד עצמאית עם הספר, להצטרף לתהליך מובנה או
            לבדוק ליווי. רמת מחויבות גבוהה יותר אינה בהכרח בחירה טובה יותר — היא פשוט מסגרת אחרת.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#decision-guide"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              לעזרת הבחירה
            </a>
            <Link
              href="/programs/the-way"
              className="inline-flex min-h-11 items-center rounded-full border border-border px-7 py-3 font-semibold transition-colors hover:bg-muted"
            >
              ישר למבנה התוכנית
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-muted/30">
        <OfferJourney current="program" />
      </div>

      <section id="decision-guide" className="scroll-mt-24 py-20" aria-labelledby="decision-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-accent/40 text-accent-dark">
              עזרת החלטה
            </Badge>
            <h2 id="decision-heading" className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              שלוש שאלות פשוטות במקום לנחש
            </h2>
            <p className="text-muted-foreground">
              כדאי לבחור לפי סוג התמיכה שאפשר להשתמש בה בפועל — לא רק לפי כמות התוכן.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {decisionCards.map((card) => (
              <Card key={card.title} className="border-border/60">
                <CardContent className="flex h-full flex-col p-7">
                  <h3 className="mb-5 text-xl font-bold text-balance">{card.title}</h3>
                  <ul className="mb-7 space-y-3 text-sm text-muted-foreground">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-0.5 text-primary">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={card.href}
                    className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 py-3 text-center font-semibold transition-colors hover:bg-muted"
                  >
                    {card.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20" aria-labelledby="program-at-a-glance-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              תוכנית הדרך במבט אחד
            </Badge>
            <h2 id="program-at-a-glance-heading" className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              {PRODUCT_FACTS.course.weeks} שבועות, {PRODUCT_FACTS.course.phases} שלבי למידה ורצף אחד
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              התוכנית הפעילה ממפה {PRODUCT_FACTS.course.lmsMappedLessons} שיעורים ומצרפת {PRODUCT_FACTS.course.practicePdfs} דפי תרגול.
              כל שלב מוסיף שפה ותרגול לשלב שקדם לו.
            </p>
          </div>

          <ol className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {canonicalPhases.map((phase) => (
              <li key={phase.number}>
                <Card className="h-full border-border/60">
                  <CardContent className="p-6">
                    <span className="mb-3 block text-3xl font-bold tabular-nums text-primary/35">
                      {phase.number}
                    </span>
                    <h3 className="mb-2 text-xl font-bold">{phase.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{phase.focus}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/programs/the-way"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              לראות איך נראה שבוע בתוכנית
            </Link>
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center rounded-full border border-border px-8 py-3 font-semibold transition-colors hover:bg-background"
            >
              להשוואה מול מוצרים אחרים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
