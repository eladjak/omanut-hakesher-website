import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OfferJourney } from "@/components/OfferJourney";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "תוכן פתוח ומשאבים | אומנות הקשר",
  description:
    "מאמרים, פודקאסט ומפת התחלה מסודרת לתרגול תקשורת, היכרות ובחירה בקשר — בלי צורך לבחור מיד בתוכנית.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "תוכן פתוח ומשאבים | אומנות הקשר",
    description:
      "לבחור נושא אחד, להכיר את סגנון העבודה ולהחליט בקצב שלך אם ואיך להעמיק.",
    url: "/resources",
    locale: "he_IL",
    type: "website",
  },
};

const topicPaths = [
  {
    title: "להתחיל משיחה",
    description:
      "לזהות דפוסי שיחה, לתרגל סקרנות ולבדוק איך ליצור יותר מקום להדדיות.",
    href: "/blog/communication-basics",
    cta: "למאמר על שיחה ראשונה",
  },
  {
    title: "להתחיל מבחירה",
    description:
      "לברר צרכים, גבולות וציפיות במקום להסתמך רק על ניחושים או על כללים כלליים.",
    href: "/blog/expressing-needs",
    cta: "למאמר על צרכים בקשר",
  },
  {
    title: "להתחיל מתרגול",
    description:
      "להכיר את מבנה הספר ואת התרגילים שבו לפני שבוחרים אם למידה עצמאית מתאימה עכשיו.",
    href: "/book",
    cta: "להכיר את הספר",
  },
] as const;

export default function ResourcesPage() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <div className="border-b border-border/30 bg-muted/50">
        <Breadcrumbs items={[{ label: "תוכן פתוח" }]} />
      </div>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            אפשר להתחיל בקטן
          </Badge>
          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold text-balance md:text-5xl">
            לבחור נושא אחד — ולצאת עם משהו שאפשר לנסות
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            כאן נמצאים התכנים הפתוחים של אומנות הקשר. אפשר לקרוא, להאזין ולבדוק
            מה רלוונטי עכשיו, בלי הרשמה למסלול ובלי צורך להתקדם בסדר קבוע.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#open-content"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              לבחור תוכן
            </a>
            <Link
              href="/programs"
              className="inline-flex min-h-11 items-center rounded-full border border-border px-7 py-3 font-medium transition-colors hover:bg-muted"
            >
              להשוות דרכי העמקה
            </Link>
          </div>
        </div>
      </section>

      <section id="open-content" className="scroll-mt-24 bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-accent/40 text-accent-dark">
              מה מתאים לך היום?
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">
              לקרוא, להאזין או לבחור שאלה מעשית
            </h2>
            <p className="text-muted-foreground text-pretty">
              אין מסלול חובה: אפשר לבחור לפי הזמן שיש לך ולפי השאלה שמעסיקה אותך.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/60">
              <CardContent className="flex h-full flex-col p-7">
                <span className="mb-3 text-sm font-semibold text-primary">קריאה</span>
                <h3 className="mb-3 text-2xl font-bold">מאמרי אומנות הקשר</h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  מאמרים סביב תקשורת, דייטים, צרכים ובחירה. כל מאמר עומד בפני
                  עצמו, כך שאפשר להתחיל מהנושא הקרוב ביותר לחיים שלך עכשיו.
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  בספרייה הנוכחית: {blogPosts.length} מאמרים.
                </p>
                <Link
                  href="/blog"
                  className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                >
                  לכל המאמרים
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="flex h-full flex-col p-7">
                <span className="mb-3 text-sm font-semibold text-primary">האזנה</span>
                <h3 className="mb-3 text-2xl font-bold">הפודקאסט ״מוצאים אהבה״</h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  שיחות על היכרות, תקשורת וקשר בפורמט שאפשר לקחת לדרך. בעמוד
                  הפודקאסט אפשר לבחור את פלטפורמת ההאזנה המתאימה.
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  מתאים כשרוצים להכיר רעיון דרך שיחה ולא דרך טקסט ארוך.
                </p>
                <Link
                  href="/podcast"
                  className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted"
                >
                  לעמוד הפודקאסט
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="flex h-full flex-col p-7">
                <span className="mb-3 text-sm font-semibold text-primary">תרגול</span>
                <h3 className="mb-3 text-2xl font-bold">מדריכים פתוחים</h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  שלושה מדריכי PDF מלאים סביב אומץ מדורג, חזון אישי ושיחה טובה
                  בדייט. אפשר לפתוח אותם ישירות, בלי טופס ובלי הרשמה.
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  מתאים כשרוצים לצאת מהעמוד עם תרגיל כתוב שאפשר לנסות בקצב שלך.
                </p>
                <Link
                  href="/lead"
                  className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  למדריכים הפתוחים
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-balance">
              אם קל יותר לבחור לפי השאלה שמעסיקה אותך
            </h2>
            <p className="text-muted-foreground">
              שלוש נקודות כניסה קצרות, בלי מבחן ובלי הנחה שיש מסלול אחד שמתאים לכולם.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {topicPaths.map((topic) => (
              <Card key={topic.title} className="border-border/60">
                <CardContent className="flex h-full flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold">{topic.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                  <Link
                    href={topic.href}
                    className="mt-auto font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {topic.cta} ←
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {featuredPosts.length === 0 && (
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-muted/30 p-6 text-center">
              <h3 className="mb-2 text-lg font-bold">ספריית המאמרים מתעדכנת</h3>
              <p className="text-sm text-muted-foreground">
                בינתיים אפשר להאזין לפודקאסט או להכיר את מבנה הספר.
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="bg-muted/30">
        <OfferJourney current="resources" compact />
      </div>
    </>
  );
}
