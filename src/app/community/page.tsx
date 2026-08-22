import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "קהילה תומכת: איך בודקים התאמה ובטיחות | אומנות הקשר",
  description:
    "עקרונות וכלי בדיקה לבחירת קהילה תומכת: פרטיות, הסכמה, גבולות, הנחיה ודרך יציאה ברורה.",
  alternates: { canonical: "/community" },
  openGraph: {
    title: "איך בוחרים קהילה תומכת | אומנות הקשר",
    description:
      "שאלות מעשיות שעוזרות לבדוק פרטיות, הסכמה, הנחיה והתאמה לפני שמצטרפים לקהילה.",
    url: "/community",
    locale: "he_IL",
    type: "website",
  },
};

const communityPrinciples = [
  {
    number: "01",
    title: "פרטיות לפני שיתוף",
    description:
      "ברור מי רואה הודעות, מה נשמר, האם מותר לצלם מסך, ואיך מבקשים מחיקה או תיקון. ברירת המחדל היא לשתף מעט ורק מרצון.",
  },
  {
    number: "02",
    title: "הסכמה בלי מבחן שייכות",
    description:
      "מותר לקרוא בלי להגיב, לדלג על תרגיל, להימנע מחשיפה אישית או לצאת. השתתפות אינה נמדדת בכמות השיתוף.",
  },
  {
    number: "03",
    title: "הנחיה וגבולות ברורים",
    description:
      "יש כללי התנהגות, כתובת לדיווח, תגובה להטרדה והבחנה בין תמיכת עמיתים לבין טיפול, ייעוץ חירום או סמכות מקצועית.",
  },
  {
    number: "04",
    title: "ערך שאפשר לתרגל",
    description:
      "הקהילה עוזרת לבחור פעולה קטנה, לנסות אותה ולבדוק מה למדת — בלי להפוך זוגיות, דייט או חשיפה לתנאי להצלחה.",
  },
];

const questionsBeforeJoining = [
  "מי יכול לראות את הפרופיל, ההודעות והקבצים שאעלה?",
  "מה אסור להעביר מחוץ לקהילה, ומה קורה כשכלל מופר?",
  "למי פונים במקרה של הטרדה, פנייה פרטית לא רצויה או מצוקה?",
  "האם אפשר להשתתף בשקט, לדלג, לעזוב ולבקש למחוק תוכן?",
  "מה כלול בפועל, באיזו תדירות, מי מנחה ומה אינו כלול?",
];

const smallPractice = [
  {
    step: "לבחור",
    text: "בחרו צורך אחד לשבוע הקרוב: מידע, תרגול, עידוד או שיחה קצרה.",
  },
  {
    step: "לבקש",
    text: "נסחו בקשה קטנה ומוגדרת, למשל: ״אשמח לשתי הצעות לפתיחת שיחה, בלי ניתוח של האדם האחר״.",
  },
  {
    step: "לבדוק",
    text: "אחרי ההתנסות שאלו: מה עזר, מה העמיס, ומה הגבול שאשמור בפעם הבאה?",
  },
];

export default function CommunityPage() {
  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs items={[{ label: "קהילה ובדיקת התאמה" }]} />
      </div>

      <section className="relative overflow-hidden bg-secondary py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/25 via-secondary to-secondary-dark" />
        <div className="absolute left-1/4 top-1/3 size-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-6 border-0 bg-accent px-4 py-1.5 text-accent-foreground">
            שייכות עם גבולות
          </Badge>
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-6xl">
            קהילה טובה לא דורשת ממך
            <br />
            <span className="text-accent-light">להיחשף כדי להשתייך.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/85 md:text-xl">
            חיבור בין אנשים יכול להקל על תרגול ולמידה. כדי שזה יקרה, צריך לדעת מראש
            מה הגבולות, מי מנחה, מה נשמר ואיך אפשר לעצור.
          </p>
        </div>
      </section>

      <section className="border-b border-border/40 bg-background py-10">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center md:p-8">
            <h2 className="mb-2 text-xl font-bold">ההרשמה לקהילת המוצר אינה פתוחה כרגע מתוך האתר</h2>
            <p className="leading-relaxed text-muted-foreground">
              תנאי הגישה, ההנחיה, המחיר והכללים עדיין דורשים אישור אחד ועקבי. לכן העמוד אינו מבטיח חברות
              אוטומטית ואינו מפנה לקבוצות חיצוניות. בינתיים אפשר להשתמש בכלי הבדיקה שבעמוד לכל קהילה ששוקלים להצטרף אליה.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              ארבעה עקרונות
            </Badge>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">מה נרצה לראות בקהילה של אומנות הקשר</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {communityPrinciples.map((principle) => (
              <Card key={principle.number} className="border-border/60 bg-background">
                <CardContent className="p-7">
                  <div className="mb-4 text-4xl font-bold text-primary/25 tabular-nums">{principle.number}</div>
                  <h3 className="mb-3 text-xl font-bold">{principle.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{principle.description}</p>
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
              לפני שמצטרפים
            </Badge>
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">חמש שאלות שלא כדאי לדלג עליהן</h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              תשובה מעורפלת אינה בהכרח סימן לעצור, אבל היא כן סימן לברר לפני שמשתפים מידע אישי.
            </p>
            <ol className="space-y-4">
              {questionsBeforeJoining.map((question, index) => (
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
              לולאת תרגול קטנה
            </Badge>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">להשתמש בקהילה בלי ללכת לאיבוד בה</h2>
            <div className="space-y-5">
              {smallPractice.map((practice, index) => (
                <div key={practice.step} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 font-bold text-accent-dark">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{practice.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{practice.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-border/60 bg-muted/30 p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                אם קהילה מגבירה לחץ, השוואה, פניות לא רצויות או תחושת חובה — אפשר להתרחק, להשתיק או לצאת.
                שייכות בריאה אינה דורשת לוותר על פרטיות או על קצב אישי.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
        <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">עד שהמסגרת תאושר, אפשר להתקדם גם לבד</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed opacity-90">
            מרכז המשאבים כולל מדריכים ותרגילים שאפשר לנסות בפרטיות. בעמוד התוכניות אפשר להכיר את מסלולי הלמידה בלי להתחייב.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/resources"
              className="rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              למשאבים הפתוחים
            </Link>
            <Link
              href="/programs"
              className="rounded-full border-2 border-white/60 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              להשוואת מסלולים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
