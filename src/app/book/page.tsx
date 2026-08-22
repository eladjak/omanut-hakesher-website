import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OfferJourney } from "@/components/OfferJourney";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { chapters as chapterData } from "@/data/book/chapters";
import { PRODUCT_FACTS } from "@/lib/product-facts";

export const metadata: Metadata = {
  title: "הספר ״אומנות הקשר״ | קריאה ותרגול בקצב אישי",
  description: `היכרות עם מבנה הספר ״אומנות הקשר״: ${PRODUCT_FACTS.book.parts} חלקים, ${PRODUCT_FACTS.book.chapters} פרקים ו־${PRODUCT_FACTS.book.numberedExercises} תרגילים ממוספרים לקריאה ולעבודה עצמאית.`,
  alternates: { canonical: "/book" },
  openGraph: {
    title: "הספר ״אומנות הקשר״ | קריאה ותרגול בקצב אישי",
    description: `מסלול קריאה בן ${PRODUCT_FACTS.book.parts} חלקים ו־${PRODUCT_FACTS.book.chapters} פרקים, עם שאלות ותרגול עצמי.`,
    url: "/book",
    locale: "he_IL",
    type: "website",
  },
};

const bookStats = [
  { number: PRODUCT_FACTS.book.parts, label: "חלקים" },
  { number: PRODUCT_FACTS.book.chapters, label: "פרקים" },
  { number: PRODUCT_FACTS.book.numberedExercises, label: "תרגילים ממוספרים" },
  { number: PRODUCT_FACTS.book.coreExercises, label: "תרגילי ליבה" },
] as const;

const readingModes = [
  {
    title: "קריאה רציפה",
    description:
      "להתקדם לפי הסדר כדי לבנות שפה משותפת בין התבוננות אישית, תקשורת, היכרות וקשר.",
  },
  {
    title: "עבודה לפי נושא",
    description:
      "לבחור פרק שנוגע בשאלה נוכחית, לקרוא אותו ולסמן תרגיל אחד ששווה לנסות.",
  },
  {
    title: "קריאה חוזרת",
    description:
      "לחזור לאותו פרק אחרי התנסות ולבדוק מה נראה אחרת כשהוא פוגש אירוע אמיתי.",
  },
] as const;

const readerUses = [
  {
    title: "למפות",
    description:
      "לתת שמות לדפוסים, לצרכים ולבחירות — בלי להפוך אותם לאבחנה או לתווית קבועה.",
  },
  {
    title: "לתרגל",
    description:
      "להפוך רעיון לפעולה קטנה: כתיבה, שאלה, שיחה או החלטה שאפשר לבדוק במציאות.",
  },
  {
    title: "לבחור",
    description:
      "לבדוק מה מתאים עכשיו, על מה לדלג ולאיזה נושא כדאי לחזור בהמשך.",
  },
] as const;

export default function BookPage() {
  const numberedChapters = chapterData.filter((chapter) => chapter.number !== null);

  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs items={[{ label: "הספר" }]} />
      </div>

      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/book-hero.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_360px]">
            <div>
              <Badge variant="outline" className="mb-4 border-white/35 text-white">
                למידה עצמאית ותרגול
              </Badge>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-white text-balance md:text-6xl">
                אומנות הקשר
              </h1>
              <p className="mb-6 max-w-2xl text-2xl font-medium text-accent-light text-pretty">
                ספר עבודה שמחבר קריאה, שאלות וצעדים מעשיים
              </p>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/85 text-pretty">
                הספר בנוי כמסלול שאפשר לקרוא מתחילתו ועד סופו, או לפתוח לפי נושא.
                המטרה היא לא לספק נוסחה לזוגיות, אלא לעזור להתבונן, לתרגל ולקבל החלטות בבהירות רבה יותר.
              </p>

              <div className="mb-8 flex flex-wrap gap-2" aria-label="נתונים על מבנה הספר">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm text-white">
                  {PRODUCT_FACTS.book.parts} חלקים
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm text-white">
                  {PRODUCT_FACTS.book.chapters} פרקים
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm text-white">
                  {PRODUCT_FACTS.book.numberedExercises} תרגילים ממוספרים
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#book-contents"
                  className="inline-flex min-h-11 items-center rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                >
                  לראות מה יש בספר
                </a>
                <Link
                  href="/resources"
                  className="inline-flex min-h-11 items-center rounded-full border border-white/45 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  להתחיל מתוכן פתוח
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative h-[430px] w-72 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/assets/book/cover.jpg"
                  alt="כריכת הספר אומנות הקשר"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {!PRODUCT_FACTS.commerce.onlineCheckoutAvailable && (
        <section className="border-b border-border/40 bg-accent/10" aria-label="מצב זמינות הספר">
          <div className="container mx-auto px-4 py-5 text-center">
            <p className="text-sm leading-relaxed text-foreground/85">
              <strong>הרכישה המקוונת אינה זמינה כרגע.</strong>{" "}
              העמוד מאפשר להכיר את המבנה ואת דרך העבודה; מחיר, מסירה ותנאים יוצגו רק כשערוץ רכישה מאומת יהיה זמין.
            </p>
          </div>
        </section>
      )}

      <section className="border-b border-border/30 py-14" aria-label="מבנה הספר במספרים">
        <div className="container mx-auto px-4">
          <dl className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            {bookStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="mb-1 text-4xl font-bold tabular-nums text-primary">{stat.number}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20" aria-labelledby="reader-use-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              מה עושים עם הספר
            </Badge>
            <h2 id="reader-use-heading" className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              לא רק לקרוא — למפות, לתרגל ולבחור
            </h2>
            <p className="text-muted-foreground text-pretty">
              התרגילים הם הצעות לעבודה עצמאית. אפשר להתאים אותם, לדלג עליהם או לעצור כשמשהו אינו מתאים.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {readerUses.map((item, index) => (
              <Card key={item.title} className="border-border/60">
                <CardContent className="p-7">
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold tabular-nums text-primary">
                    {index + 1}
                  </span>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="book-contents" className="scroll-mt-24 bg-muted/40 py-20" aria-labelledby="contents-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-accent/40 text-accent-dark">
              תוכן העניינים
            </Badge>
            <h2 id="contents-heading" className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              {PRODUCT_FACTS.book.chapters} פרקים בתוך מסלול קריאה אחד
            </h2>
            <p className="text-muted-foreground text-pretty">
              הרשימה מציגה את המבנה ואת מוקד כל פרק. הגישה לתוכן המלא נמסרת רק דרך ערוץ גישה מאושר.
            </p>
          </div>

          <ol className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            {numberedChapters.map((chapter) => (
              <li key={chapter.slug}>
                <Card className="h-full border-border/60">
                  <CardContent className="flex h-full items-start gap-4 p-6">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold tabular-nums text-primary">
                      {chapter.number}
                    </span>
                    <div>
                      <h3 className="mb-1 text-lg font-bold">{chapter.title}</h3>
                      <p className="mb-2 text-sm font-medium text-foreground/75">{chapter.subtitle}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{chapter.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20" aria-labelledby="reading-mode-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 id="reading-mode-heading" className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              שלוש דרכים להשתמש בספר
            </h2>
            <p className="text-muted-foreground">
              אין קצב חובה. הבחירה תלויה בזמן, בשאלה ובמידת העומק שמתאימה עכשיו.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {readingModes.map((mode) => (
              <Card key={mode.title} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{mode.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{mode.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-muted/30">
        <OfferJourney current="book" compact />
      </div>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold text-balance md:text-4xl">
            רוצים להכיר את הגישה לפני שבוחרים מסלול?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-primary-foreground/85">
            אפשר להתחיל ממאמר או מפודקאסט. אם כבר ברור שנחוצה מסגרת שבועית, אפשר להכיר את מבנה תוכנית הדרך.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/resources"
              className="inline-flex min-h-11 items-center rounded-full bg-background px-8 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
            >
              לתוכן הפתוח
            </Link>
            <Link
              href="/programs/the-way"
              className="inline-flex min-h-11 items-center rounded-full border border-primary-foreground/45 px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              למבנה התוכנית
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
