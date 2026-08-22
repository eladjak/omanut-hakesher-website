import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PRODUCT_FACTS } from "@/lib/product-facts";

type JourneyStepId = "resources" | "book" | "program" | "guidance";

type OfferJourneyProps = {
  current?: JourneyStepId;
  compact?: boolean;
  heading?: string;
  intro?: string;
};

const journeySteps = [
  {
    id: "resources" as const,
    number: "01",
    level: "היכרות חופשית",
    title: "תוכן פתוח",
    description:
      "לבחור שאלה אחת, לקרוא או להאזין, ולבדוק אם השפה והתרגול של אומנות הקשר מועילים לך.",
    availability: "זמין עכשיו — בלי הרשמה",
    details: ["מאמרים מעשיים", "פרקי פודקאסט", "ללא מסלול מחייב"],
    decision: "מתאים כשרוצים להתחיל בקטן או לברר נושא נקודתי.",
    href: "/resources",
    cta: "לבחירת תוכן פתוח",
  },
  {
    id: "book" as const,
    number: "02",
    level: "למידה עצמאית",
    title: "הספר ״אומנות הקשר״",
    description:
      "מסלול קריאה רציף שמחבר בין רעיונות, שאלות ותרגול עצמי — בקצב שנוח לך.",
    availability: "עמוד היכרות — הרכישה אינה פתוחה באתר",
    details: [
      `${PRODUCT_FACTS.book.parts} חלקים`,
      `${PRODUCT_FACTS.book.chapters} פרקים`,
      `${PRODUCT_FACTS.book.numberedExercises} תרגילים ממוספרים`,
    ],
    decision: "מתאים כשרוצים עומק ומבנה, ועדיין מעדיפים לעבוד לבד.",
    href: "/book",
    cta: "להכיר את הספר",
  },
  {
    id: "program" as const,
    number: "03",
    level: "תהליך מובנה",
    title: "תוכנית הדרך",
    description:
      "רצף לימודי שמחבר תוכן, תרגול ורפלקציה לאורך מסגרת זמן מוגדרת.",
    availability: "עמוד מידע — ההצטרפות אינה פתוחה באתר",
    details: [
      `${PRODUCT_FACTS.course.weeks} שבועות`,
      `${PRODUCT_FACTS.course.phases} שלבי למידה`,
      `${PRODUCT_FACTS.course.lmsMappedLessons} שיעורים מסודרים`,
      `${PRODUCT_FACTS.course.practicePdfs} דפי תרגול`,
    ],
    decision: "מתאים כשרוצים רצף, קצב ויישום מצטבר — ולא רק תוכן נקודתי.",
    href: "/programs/the-way",
    cta: "למבנה התוכנית",
  },
  {
    id: "guidance" as const,
    number: "04",
    level: "מענה אישי",
    title: "ליווי ובדיקת התאמה",
    description:
      "בירור של המטרה, סוג התמיכה והמסגרת האפשרית לפני שמחליטים אם להתקדם.",
    availability: "בירור בלבד — פנייה אינה הרשמה או חיוב",
    details: [
      "מתחילים בבדיקת התאמה",
      "היקף וזמינות מוצגים לפני התחייבות",
      "אפשר להחליט שלא להמשיך",
    ],
    decision: "מתאים כשרוצים משוב אישי ולא רק מסלול למידה עצמאי.",
    href: "/services",
    cta: "להכיר את אפשרויות הליווי",
  },
] as const;

export function OfferJourney({
  current,
  compact = false,
  heading = "ארבע דרכים להתחיל — לפי רמת המחויבות שמתאימה עכשיו",
  intro =
    "לא חייבים לקפוץ ישר למסלול הגדול ביותר. אפשר להתחיל מתוכן פתוח, להעמיק עצמאית בספר, לעבור לתוכנית מובנית או לבדוק ליווי אישי.",
}: OfferJourneyProps) {
  return (
    <section aria-labelledby="offer-journey-heading" className={compact ? "py-14" : "py-20 md:py-24"}>
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            מפת התחלה
          </Badge>
          <h2
            id="offer-journey-heading"
            className="mb-4 text-3xl font-bold text-balance md:text-4xl"
          >
            {heading}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            {intro}
          </p>
        </div>

        <ol className={`mx-auto grid max-w-7xl gap-5 ${compact ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4"}`}>
          {journeySteps.map((step) => {
            const isCurrent = current === step.id;
            return (
              <li key={step.id} data-journey-step={step.id}>
                <Card
                  className={`h-full border-border/60 ${
                    isCurrent ? "ring-2 ring-primary shadow-lg shadow-primary/10" : ""
                  }`}
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="text-3xl font-bold tabular-nums text-primary/35">
                        {step.number}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {isCurrent ? "כאן עכשיו" : step.level}
                      </Badge>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-balance">{step.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {step.description}
                    </p>
                    <p
                      className={`mb-5 rounded-xl border px-3 py-2 text-xs font-medium leading-relaxed ${
                        step.id === "resources"
                          ? "border-secondary/30 bg-secondary/10 text-secondary-dark"
                          : "border-accent/40 bg-accent/10 text-foreground/80"
                      }`}
                    >
                      {step.availability}
                    </p>
                    <ul className="mb-5 space-y-2 text-sm" aria-label={`מה כולל שלב ${step.title}`}>
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-0.5 text-primary">
                            •
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-6 border-t border-border/50 pt-4 text-xs leading-relaxed text-muted-foreground">
                      {step.decision}
                    </p>
                    <Link
                      href={step.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`mt-auto inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors ${
                        isCurrent
                          ? "bg-primary text-primary-foreground hover:bg-primary-dark"
                          : "bg-muted text-foreground hover:bg-muted/70"
                      }`}
                    >
                      {isCurrent ? "להמשיך מכאן" : step.cta}
                    </Link>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
