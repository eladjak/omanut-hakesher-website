import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "תודות | האנשים שעשו את זה אפשרי",
  description:
    "תודה לאנשים המיוחדים שעזרו לאומנות הקשר להגיע לאן שהגיעה. מנטורים, יועצים ואנשי מקצוע שהאמינו בדרך.",
  alternates: {
    canonical: "/thanks",
  },
};

interface Acknowledgment {
  name: string;
  role: string;
  description: string;
  website?: string;
  dedication?: string;
}

const acknowledgments: Acknowledgment[] = [
  {
    name: "אלי שביט",
    role: "מנטור עסקי ויועץ אסטרטגי",
    description:
      "יזם ומנטור שליווה מעל 8,000 יזמים ובעלי עסקים. בנה יחד איתי את הפאנל לליווי אישי - ייעוץ שהחזיר את עצמו פי מיליון. הגישה העסקית שלו שינתה את הדרך שבה אני מסתכל על כל מה שאני עושה.",
    website: "https://ishavit.com",
  },
  {
    name: "אליהו ארנד",
    role: "יועץ עסקי ואסטרטג",
    description:
      "מומחה לפיתוח עסקי עם שיטת 5X20 לצמיחה מואצת. עזר לי לראות את התמונה הגדולה ולבנות את אומנות הקשר כעסק אמיתי ובר-קיימא, לא רק כתשוקה.",
    website: "https://arend.co.il",
  },
  {
    name: "אלי תמיר קרניאל",
    role: "מטפל, סופר ומנחה",
    description:
      'מטפל רגשי ומנחה קבוצות עם התמחות בזוגיות ומשפחה. מחבר הספר "ואהבת". לימד אותי שהדרך לקשר עמוק מתחילה מהקשר עם עצמך.',
  },
  {
    name: "דודו נחום",
    role: "קופירייטר ואיש שיווק דיגיטלי",
    description:
      "האיש שעזר לי למצוא את המילים הנכונות. קופירייטר ומומחה שיווק דיגיטלי שיודע איך להפוך תוכן טוב לתוכן שמגיע לאנשים הנכונים.",
    website: "https://alpha-omega.co.il",
  },
  {
    name: "דפנה לשם",
    role: "מנטורית ומלווה",
    description:
      "אנשים מסוימים פשוט רואים אותך. דפנה היא כזו. תמכה, האמינה, ודחפה אותי קדימה בדיוק ברגעים שהייתי צריך את זה הכי הרבה.",
  },
  {
    name: "אראל הנדלר",
    role: "יועץ זוגי ומטפל",
    description:
      "מטפל זוגי ומשפחתי עם התמחות ב-NLP ו-CBT. מומחה בליווי זוגות לתקשורת עמוקה ויחסים בריאים. שותף לדרך ולשיח המקצועי.",
    website: "https://erelim.net",
  },
];

export default function ThanksPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תודות" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/thanks-hero.jpg"
            alt="תודות - האנשים שעשו את זה אפשרי"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-4 text-white border-white/30">
            הכרת תודה
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            אומנות הקשר היא <span className="text-accent-light">לא רק שלי</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            יש אנשים שבלעדיהם אומנות הקשר לא הייתה מגיעה לאן שהגיעה.
            אנשים שהאמינו, שלימדו, שדחפו, ושנתנו לי את הכלים להעביר הלאה.
          </p>
          <p className="text-lg text-accent-light font-medium mt-6">
            אלו אנשים שאני חייב להם אישית פשוט המון.
          </p>
        </div>
      </section>

      {/* Acknowledgments */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {acknowledgments.map((person, index) => (
              <Card
                key={index}
                className="border-border/50 hover:border-primary/20 hover:shadow-md transition-all"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-2xl">
                        {person.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{person.name}</h3>
                      <p className="text-sm text-primary font-medium mb-3">{person.role}</p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {person.description}
                      </p>
                      {person.dedication && (
                        <blockquote className="border-r-4 border-primary/30 pr-4 text-muted-foreground italic text-sm">
                          {person.dedication}
                        </blockquote>
                      )}
                      {person.website && (
                        <a
                          href={person.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {person.website.replace("https://", "")}
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Note */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-6">
                <Badge variant="outline" className="text-primary border-primary/30">
                  מכתב אישי
                </Badge>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  כשהתחלתי את הדרך של אומנות הקשר, לא ידעתי שהיא תיקח אותי כל כך רחוק.
                  הייתי בחור שרצה לעזור לאחרים למצוא את מה שהוא מצא.
                </p>
                <p>
                  בדרך, פגשתי אנשים מדהימים שלימדו אותי, אתגרו אותי, ונתנו לי את הכלים
                  להפוך את החלום הזה למציאות. בלעדיהם - פשוט לא הייתי כאן.
                </p>
                <p>
                  האנשים ברשימה הזו הם חלק בלתי נפרד מהסיפור של אומנות הקשר.
                  כל אחד מהם תרם משהו ייחודי - ידע, ביטחון, אמונה, או פשוט את המילה
                  הנכונה ברגע הנכון.
                </p>
                <p className="font-medium text-foreground">
                  תודה. באמת תודה.
                </p>
              </div>
              <Separator className="my-6 bg-primary/10" />
              <p className="text-left text-sm font-medium text-foreground">
                - אלעד יעקובוביץ׳
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            הסיפור ממשיך - ואתה יכול להיות חלק ממנו
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto leading-relaxed">
            שיחת היכרות חינם - הצעד הראשון בדרך שלך
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
