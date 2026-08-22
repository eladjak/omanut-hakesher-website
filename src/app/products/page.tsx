import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OfferJourney } from "@/components/OfferJourney";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PRODUCT_FACTS } from "@/lib/product-facts";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "מוצרים וכלי למידה | אומנות הקשר",
  description:
    "השוואה ברורה בין הספר, שירות ניסוח פרופיל ותוכנית הדרך — לפי אופן העבודה, רמת המבנה והצעד הרצוי.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "מוצרים וכלי למידה | אומנות הקשר",
    description: "לבחור בין למידה עצמאית, תוצר ממוקד ותהליך לימודי מובנה.",
    url: "/products",
    locale: "he_IL",
    type: "website",
  },
};

const datingCard = getProduct("dating-card")!;

const productChoices = [
  {
    label: "למידה עצמאית",
    title: "הספר ״אומנות הקשר״",
    value: `רצף קריאה בן ${PRODUCT_FACTS.book.parts} חלקים ו־${PRODUCT_FACTS.book.chapters} פרקים, עם ${PRODUCT_FACTS.book.numberedExercises} תרגילים ממוספרים.`,
    workingStyle: "קוראים ומתרגלים בקצב אישי.",
    usefulWhen: "כשרוצים להעמיק במכלול הנושאים בלי מסגרת שבועית.",
    checkFirst: "להכיר את תוכן העניינים ואת אופן העבודה לפני החלטת רכישה.",
    href: "/book",
    cta: "להכיר את הספר",
  },
  {
    label: "תוצר ממוקד",
    title: datingCard.nameHe,
    value:
      "שירות ממוקד לניסוח פרופיל היכרויות על בסיס שאלון אישי, ולא מסלול לימודי מלא.",
    workingStyle: "מגדירים מידע וחומרי גלם ומקבלים תוצר כתוב לפי פרטי השירות.",
    usefulWhen: "כשרוצים לטפל בנקודת הכניסה לאפליקציות ולא בתהליך רחב.",
    checkFirst: "זמינות, תהליך המסירה והתנאים העדכניים מוצגים בעמוד השירות.",
    href: datingCard.path,
    cta: "לפרטי שירות הפרופיל",
  },
  {
    label: "תהליך מובנה",
    title: "תוכנית הדרך",
    value: `${PRODUCT_FACTS.course.weeks} שבועות, ${PRODUCT_FACTS.course.phases} שלבי למידה, ${PRODUCT_FACTS.course.lmsMappedLessons} שיעורים ו־${PRODUCT_FACTS.course.practicePdfs} דפי תרגול.`,
    workingStyle: "מתקדמים ברצף של תוכן, תרגול ורפלקציה.",
    usefulWhen: "כשרוצים מסגרת רחבה והתקדמות מצטברת לאורך זמן.",
    checkFirst: "לראות את מבנה התוכנית ואת תנאי ההצטרפות העדכניים.",
    href: "/programs/the-way",
    cta: "למבנה תוכנית הדרך",
  },
] as const;

export default function ProductsIndex() {
  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs items={[{ label: "מוצרים וכלים" }]} />
      </div>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            לא כל צורך דורש אותו מוצר
          </Badge>
          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold text-balance md:text-5xl">
            לבחור לפי סוג העבודה שרוצים לעשות
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            הספר מיועד ללמידה עצמאית, שירות הפרופיל מטפל בתוצר נקודתי, ותוכנית
            הדרך מציעה רצף לימודי. ההשוואה כאן נועדה לעזור לבחור — לא לדחוף למסלול הגדול ביותר.
          </p>
        </div>
      </section>

      <section className="bg-muted/30 py-20" aria-labelledby="product-comparison-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 id="product-comparison-heading" className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              השוואה מעשית
            </h2>
            <p className="text-muted-foreground">
              המחיר, הזמינות ותנאי המסירה עשויים להשתנות; יש לאשר אותם בעמוד הפרטים לפני התחייבות.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {productChoices.map((product) => (
              <Card key={product.title} className="border-border/60">
                <CardContent className="flex h-full flex-col p-7">
                  <Badge variant="secondary" className="mb-4 w-fit">
                    {product.label}
                  </Badge>
                  <h3 className="mb-3 text-2xl font-bold text-balance">{product.title}</h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
                    {product.value}
                  </p>
                  <dl className="mb-7 space-y-4 border-t border-border/60 pt-5 text-sm">
                    <div>
                      <dt className="mb-1 font-semibold">איך עובדים</dt>
                      <dd className="leading-relaxed text-muted-foreground">{product.workingStyle}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 font-semibold">מתי זה שימושי</dt>
                      <dd className="leading-relaxed text-muted-foreground">{product.usefulWhen}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 font-semibold">מה לבדוק קודם</dt>
                      <dd className="leading-relaxed text-muted-foreground">{product.checkFirst}</dd>
                    </div>
                  </dl>
                  <Link
                    href={product.href}
                    className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                  >
                    {product.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background p-6 text-center sm:flex-row sm:text-right">
            <div>
              <h3 className="mb-1 text-lg font-bold">עוד לא ברור מה מתאים?</h3>
              <p className="text-sm text-muted-foreground">
                אפשר להתחיל מתוכן פתוח, או לעבור לעמוד השירותים כדי לבדוק צורך בתמיכה אישית.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-2">
              <Link href="/resources" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">
                תוכן פתוח
              </Link>
              <Link href="/services" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">
                שירותים וליווי
              </Link>
            </div>
          </div>
        </div>
      </section>

      <OfferJourney compact />
    </>
  );
}
