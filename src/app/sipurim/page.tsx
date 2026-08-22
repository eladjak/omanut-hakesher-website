import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TestimonialCard } from "@/components/TestimonialCard";
import { getPublishedTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "איך להעריך סיפור ותהליך | אומנות הקשר",
  description:
    "כלי מעשי לקריאה ביקורתית של סיפורי הצלחה, לבדיקת התאמה של תהליך ולבחירה בלי לחץ.",
  alternates: { canonical: "/sipurim" },
  openGraph: {
    title: "איך להעריך סיפור ותהליך | אומנות הקשר",
    description:
      "חמש שאלות שעוזרות להפריד בין סיפור אישי, הבטחת תוצאה והתאמה אמיתית לצורך שלך.",
    url: "/sipurim",
    locale: "he_IL",
    type: "website",
  },
};

const publishedStories = getPublishedTestimonials("stories-index");

const readingLenses = [
  {
    number: "01",
    title: "מה השתנה בפועל?",
    description:
      "חפשו פעולה, מיומנות או החלטה שאפשר לתאר. ״הכול השתנה״ מספר מעט; ״למדתי לבקש זמן לחשוב לפני תשובה״ מספר הרבה יותר.",
  },
  {
    number: "02",
    title: "מה היה ההקשר?",
    description:
      "סיפור בלי נקודת התחלה, משך, מגבלות וחלקו של האדם בתהליך עלול להישמע חד־משמעי יותר ממה שהיה.",
  },
  {
    number: "03",
    title: "מה לא ניתן להסיק?",
    description:
      "חוויה אישית יכולה ללמד על אפשרות, לא להבטיח תוצאה. הצלחה של אדם אחד אינה תחזית לקצב, לזוגיות או לתוצאה שלך.",
  },
  {
    number: "04",
    title: "האם הדרך מתאימה לי?",
    description:
      "בדקו את צורת העבודה, הזמן, המחיר, רמת החשיפה, הגבולות והחלופות — גם אם הסיפור עצמו מרגש ומשכנע.",
  },
];

const fitQuestions = [
  "איזו בעיה מוגדרת אני רוצה לקדם בחודש הקרוב?",
  "מה אעשה בין מפגש למפגש, וכמה זמן זה באמת דורש?",
  "איך נבחין בין התקדמות, תקיעות וחוסר התאמה?",
  "מה קורה אם תרגיל לא מתאים לי או אם ארצה לעצור?",
  "איזו חלופה זולה, קצרה או מקצועית יותר כדאי לבדוק קודם?",
];

const publicationChecks = [
  {
    title: "מקור",
    text: "הסיפור, הציטוט או המדיה משויכים למקור שניתן לאמת.",
  },
  {
    title: "הסכמה עדכנית",
    text: "יש אישור ברור לפרסום הנוסח והמדיה במשטח הספציפי שבו הם מופיעים.",
  },
  {
    title: "נוסח והקשר",
    text: "העריכה אינה משנה את משמעות הדברים, וההקשר הנחוץ להבנתם נשמר.",
  },
  {
    title: "טענות",
    text: "הסיפור אינו מוצג כהבטחה, כראיה מדעית או כתוצאה טיפוסית ללא בסיס מתאים.",
  },
];

export default function SipurimPage() {
  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs items={[{ label: "סיפורים ובדיקת התאמה" }]} />
      </div>

      <section className="relative overflow-hidden bg-secondary py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/30 via-secondary to-secondary-dark" />
        <div className="absolute right-1/4 top-1/4 size-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-6 border-0 bg-accent px-4 py-1.5 text-sm text-accent-foreground">
            לבחור בעיניים פקוחות
          </Badge>
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-6xl">
            סיפור אישי יכול לפתוח אפשרות.
            <br />
            <span className="text-accent-light">הוא לא צריך להחליט במקומך.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/85 md:text-xl">
            במקום לבקש ממך להתרשם מתוצאה של מישהו אחר, ריכזנו כאן דרך פשוטה לבדוק
            סיפור, תהליך והתאמה — ולהגיע לשיחה עם שאלות טובות משלך.
          </p>
        </div>
      </section>

      {publishedStories.length > 0 ? (
        <section className="bg-background py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
                עברו אימות לפרסום
              </Badge>
              <h2 className="text-balance text-3xl font-bold md:text-4xl">סיפורים עם מקור והסכמה מתועדים</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                כל סיפור הוא חוויה אישית, לא הבטחת תוצאה. אפשר לקרוא אותו לצד ארבע עדשות הבדיקה שבהמשך.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publishedStories.map((story, index) => (
                <TestimonialCard key={story.slug} item={story} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-b border-border/40 bg-background py-10">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center md:p-8">
              <h2 className="mb-2 text-xl font-bold">מאגר הסיפורים עובר אימות פריט־פריט</h2>
              <p className="leading-relaxed text-muted-foreground">
                עד שנשלים בדיקת מקור, הסכמה ונוסח לכל פריט, לא נציג כאן שמות, תמונות,
                הודעות או סרטונים. כלי הבחירה שבעמוד זמין כבר עכשיו ואינו דורש ממך להאמין להבטחה כלשהי.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <Badge variant="outline" className="mb-4 border-accent/40 text-accent-dark">
              ארבע עדשות קריאה
            </Badge>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">כך קוראים סיפור הצלחה בלי ללכת לאיבוד בתוכו</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {readingLenses.map((lens) => (
              <Card key={lens.number} className="border-border/60">
                <CardContent className="p-7">
                  <div className="mb-4 text-4xl font-bold text-primary/25 tabular-nums">{lens.number}</div>
                  <h3 className="mb-3 text-xl font-bold">{lens.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{lens.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7 md:p-9">
            <Badge variant="outline" className="mb-5 border-primary/30 text-primary">
              תרגיל של עשר דקות
            </Badge>
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">בדיקת התאמה לפני שיחה או רכישה</h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              כתבו תשובה קצרה לכל שאלה. אם אין כרגע תשובה — זו שאלה מצוינת להביא לשיחת היכרות, ולא סיבה למהר להחליט.
            </p>
            <ol className="space-y-4">
              {fitQuestions.map((question, index) => (
                <li key={question} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{question}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-2 md:p-5">
            <Badge variant="outline" className="mb-5 border-accent/40 text-accent-dark">
              הסטנדרט שלנו לפרסום
            </Badge>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">ארבע בדיקות לפני שסיפור חוזר לאתר</h2>
            <div className="space-y-5">
              {publicationChecks.map((check) => (
                <div key={check.title} className="flex gap-4">
                  <span aria-hidden className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent-dark">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-bold">{check.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{check.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
        <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">אפשר להתחיל מערך, לא מהבטחה</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed opacity-90">
            נסו קודם מדריך או תרגיל פתוח. אם אחר כך תרצו התאמה אישית, הגיעו לשיחה עם חמש השאלות שמילאתם כאן.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/resources"
              className="rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              למשאבים הפתוחים
            </Link>
            <Link
              href="/coaching"
              className="rounded-full border-2 border-white/60 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              איך עובד ליווי אישי
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
