import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "הפודקאסט של אומנות הקשר",
  description:
    "פודקאסט אומנות הקשר עם אלעד יעקובוביץ׳ - שיחות על זוגיות, דייטינג, תקשורת וכל מה שלא לימדו אותך על קשרים.",
  alternates: {
    canonical: "/podcast",
  },
  openGraph: {
    title: "הפודקאסט | אומנות הקשר",
    description:
      "שיחות על זוגיות, דייטינג, תקשורת וכל מה שלא לימדו אותך על קשרים.",
    url: "/podcast",
    locale: "he_IL",
    type: "website",
  },
};

const upcomingTopics = [
  {
    title: "למה אתה עדיין רווק (התשובה האמיתית)",
    description: "נפרק את 5 הסיבות הכי נפוצות - ולא, ׳לא מצאתי את האחת׳ זו לא אחת מהן.",
  },
  {
    title: "דייטינג באפליקציות - מה שבאמת עובד ב-2026",
    description: "מעבר לטיפים על תמונות - אסטרטגיה שלמה לדייטינג דיגיטלי.",
  },
  {
    title: "השיחה הראשונה - איך לא לפחד מקרבה",
    description: "למה רוב האנשים בורחים מקרבה, ואיך להפוך את הפחד לכוח.",
  },
  {
    title: "״היא לא הטיפוס שלי״ - הטעות שעולה לך בזוגיות",
    description: "למה ׳טיפוס׳ זה בעצם דפוס, ואיך לשבור אותו.",
  },
  {
    title: "מה נשים באמת רוצות (שאלנו אותן)",
    description: "שיחה כנה עם נשים על מה באמת חשוב להן - מעבר לגובה וחשבון בנק.",
  },
  {
    title: "אחרי הגירושין - איך חוזרים למשחק",
    description: "דייטינג בגיל 35+ אחרי פרידה - אתגרים ייחודיים ופתרונות מעשיים.",
  },
];

export default function PodcastPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "פודקאסט" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              בקרוב
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              הפודקאסט של
              <br />
              <span className="text-primary">אומנות הקשר</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              שיחות אמיתיות על זוגיות, דייטינג, תקשורת וכל מה שלא לימדו אותך
              בבית ספר. בלי קלישאות, בלי בולשיט - רק אמת.
            </p>

            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-3xl flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM8 12a4 4 0 0 0 8 0h2a6 6 0 0 1-5 5.91V21h-2v-3.09A6 6 0 0 1 6 12h2z" />
                </svg>
              </div>
            </div>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent max-w-lg mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-3">רוצה לשמוע ראשון?</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  השאר פרטים ותקבל הודעה ברגע שהפרק הראשון עולה לאוויר
                </p>
                <Link
                  href="/contact"
                  className="inline-flex px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
                >
                  עדכנו אותי!
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מה תמצאו <span className="text-primary">בפודקאסט</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "שיחות כנות",
                description:
                  "שיחות עומק על מה שבאמת קורה בעולם הדייטינג. בלי פילטרים, בלי קלישאות.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "כלים מעשיים",
                description:
                  "כל פרק כולל משהו שאפשר ליישם מיד. טיפ, תרגיל, או שינוי בגישה שאפשר להתחיל איתו היום.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "אורחים אמיתיים",
                description:
                  "מומחים, אנשים שעברו את הדרך, ושיחות שמאירות פרספקטיבות חדשות על זוגיות.",
              },
            ].map((item, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Topics */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              נושאים מתוכננים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              על מה <span className="text-primary">נדבר</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {upcomingTopics.map((topic, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            עד שהפודקאסט עולה לאוויר
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto leading-relaxed">
            אפשר כבר להתחיל את הדרך לזוגיות - בשיחת היכרות חינם
          </p>
          <Link
            href="/coaching"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לשיחת היכרות חינם
          </Link>
        </div>
      </section>
    </>
  );
}
