import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "הקהילה | אומנות הקשר",
  description:
    "הצטרפו לקהילת אומנות הקשר - סביבה תומכת של אנשים בדרך לזוגיות מאושרת. תוכן בלעדי, אירועים ותמיכה הדדית.",
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "הקהילה | אומנות הקשר",
    description:
      "קהילה תומכת של אנשים בדרך לזוגיות מאושרת. תוכן בלעדי, אירועים ותמיכה הדדית.",
    url: "/community",
    locale: "he_IL",
    type: "website",
  },
};

const communityBenefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "תוכן בלעדי",
    description:
      "שיעורי וידאו, תרגילים ותובנות שלא תמצאו בשום מקום אחר. תוכן חדש כל שבוע.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "קהילה תומכת",
    description:
      "אנשים שמבינים את המסע שלך. סביבה בטוחה לשתף, לשאול, ולקבל תמיכה מאנשים שעוברים את אותו הדבר.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "אירועים ומפגשים",
    description:
      "מפגשים חיים עם אלעד, אירועי הכרויות, וורקשופים מעשיים. לא רק תיאוריה - חיבור אמיתי.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "אלעד זמין",
    description:
      "שאלות ותשובות ישירות עם אלעד. שאל מה שאתה רוצה - ותקבל תשובה אמיתית.",
  },
];

export default function CommunityPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "הקהילה" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/community-hero.jpg"
            alt="קהילת אומנות הקשר"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-4 text-white border-white/30">
            הקהילה
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            לא לבד <span className="text-accent-light">בדרך</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            קהילת אומנות הקשר היא הבית של מי שבדרך לזוגיות מאושרת.
            סביבה תומכת, תוכן בלעדי, ואנשים שמבינים את המסע.
          </p>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
            הקהילה פתוחה <strong className="text-white">בחינם</strong> לכל מי שרכש את
            תוכנית הדרך או עובר ליווי אישי.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מה תמצאו <span className="text-primary">בקהילה</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {communityBenefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              איך מצטרפים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              שלושה <span className="text-primary">מסלולים</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                number: "1",
                title: "ליווי אישי",
                description:
                  "מצטרפים אוטומטית לקהילה עם תחילת הליווי. מקבלים גישה לכל התוכן + קהילת הוואטסאפ.",
                cta: "לפרטים על ליווי אישי",
                href: "/coaching",
                highlight: true,
              },
              {
                number: "2",
                title: "תוכנית הדרך",
                description:
                  "רכישת תוכנית הדרך כוללת גישה לקהילה. 12 שבועות של תוכנית + קהילה תומכת.",
                cta: "לפרטים על תוכנית הדרך",
                href: "/hadrech",
                highlight: false,
              },
              {
                number: "3",
                title: "מנוי קהילה",
                description:
                  "לאחר סיום הליווי או התוכנית, אפשר להמשיך כחבר קהילה במנוי חודשי. כדי להישאר מחוברים ולהמשיך לצמוח.",
                cta: "שאל על מנוי",
                href: "/contact",
                highlight: false,
              },
            ].map((path) => (
              <Card
                key={path.number}
                className={`border-border/50 ${path.highlight ? "border-primary/30 bg-gradient-to-r from-primary/5 to-transparent" : ""}`}
              >
                <CardContent className="p-6 flex items-start gap-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      path.highlight ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <span className="font-bold text-lg">{path.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{path.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {path.description}
                    </p>
                    <Link
                      href={path.href}
                      className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
                    >
                      {path.cta}
                      <span>&larr;</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8 md:p-10 text-center">
              <div className="text-5xl text-primary/20 font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="text-lg leading-relaxed mb-6">
                הקהילה הייתה ההבדל בשבילי. לדעת שיש אנשים אחרים שעוברים את אותו דבר,
                לשמוע את הסיפורים שלהם, לקבל עידוד - זה נתן לי כוח להמשיך גם כשהיה קשה.
              </blockquote>
              <cite className="not-italic font-semibold block">
                גיל, 33, מתכנת
              </cite>
              <span className="text-sm text-muted-foreground">חבר קהילה, מצא זוגיות</span>
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
            הדרך לזוגיות לא חייבת להיות לבד
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto leading-relaxed">
            בוא נדבר ונמצא את הדרך הנכונה בשבילך
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
