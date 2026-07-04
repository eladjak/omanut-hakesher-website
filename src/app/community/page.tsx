import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ELAD_WORLD } from "@/lib/elad-world";

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

      {/* העולם של אלעד — הקהילה הפתוחה */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              פתוח לכולם, בחינם
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              &ldquo;העולם של <span className="text-primary">אלעד</span>&rdquo;
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              עוד לפני ליווי או תוכנית — יש מקום פתוח שבו אני משתף, עונה ומעדכן.
              קהילת הוואטסאפ שלי פתוחה לכל מי שרוצה להיות קרוב. בלי עלות, בלי התחייבות.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[ELAD_WORLD.community, ELAD_WORLD.discussion, ELAD_WORLD.channel].map(
              (link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={`${link.label} — נפתח בוואטסאפ`}
                >
                  <Card className="h-full border-border/50 group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-200 motion-safe:group-hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{link.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {link.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                        הצטרפות
                        <span aria-hidden="true">&larr;</span>
                      </span>
                    </CardContent>
                  </Card>
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20">
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
      <section className="py-20 bg-muted/30">
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
