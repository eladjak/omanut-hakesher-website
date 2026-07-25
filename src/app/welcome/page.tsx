import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { NewsletterForm } from "@/components/NewsletterForm";
import { WebPageJsonLd } from "@/components/JsonLd";
import { ELAD_WORLD } from "@/lib/elad-world";

export const metadata: Metadata = {
  title: "ברוכים הבאים | אומנות הקשר",
  description:
    "הגעתם מהפוסט של אלעד? כאן מתחילים: קהילת ״העולם של אלעד״ בוואטסאפ, הספר שבדרך, תוכנית ״הדרך״ וליווי אישי.",
  alternates: {
    canonical: "/welcome",
  },
  openGraph: {
    title: "ברוכים הבאים | אומנות הקשר",
    description:
      "כאן מתחילים: קהילת ״העולם של אלעד״, הספר שבדרך, תוכנית ״הדרך״ וליווי אישי.",
    url: "/welcome",
    locale: "he_IL",
    type: "website",
  },
};

const nextSteps = [
  {
    title: "הספר ״אומנות הקשר״",
    description:
      "13 פרקים, כל מה שלמדתי מ-15 שנות ליווי. הספר בשלבי סיום, וכבר עכשיו יש באתר פרק-פרק עם כלים אינטראקטיביים.",
    cta: "לעמוד הספר",
    href: "/book",
  },
  {
    title: "תוכנית ״הדרך״",
    description:
      "התוכנית המלאה שלי: 90 יום, צעד אחר צעד, מהסיפור שמעכב אתכם ועד קשר אמיתי.",
    cta: "לפרטים על התוכנית",
    href: "/programs/the-way",
  },
  {
    title: "ליווי אישי",
    description:
      "עבודה אחד-על-אחד איתי. למי שרוצה מישהו לצידו לאורך כל הדרך.",
    cta: "לשיחת היכרות חינם",
    href: "/coaching",
  },
];

export default function WelcomePage() {
  return (
    <>
      <WebPageJsonLd
        name="ברוכים הבאים | אומנות הקשר"
        description="נקודת הכניסה למי שהגיע מהפוסט של אלעד: קהילת ״העולם של אלעד״, הספר, תוכנית ״הדרך״ וליווי אישי."
        url="https://omanut-hakesher.co.il/welcome"
        datePublished="2026-07-05"
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/about-journey.jpg"
            alt="דרך מתפתלת באור זהוב — המסע חוזר להתחיל"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-scrim pointer-events-none" aria-hidden="true" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30">
              הגעתם מהפוסט? זה המקום
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight">
              ברוכים הבאים <span className="text-accent-on-dark">הביתה</span>
            </h1>
            <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              אני אלעד. 15 שנה ליוויתי רווקים ורווקות בדרך לזוגיות, ואז נעלמתי
              לתקופה. עכשיו אני חוזר, לאט ובשקט, ורציתי שיהיה לכם מקום אחד פשוט
              להתחיל בו.
            </p>
          </div>
        </div>
      </section>

      {/* העולם של אלעד */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              הצעד הראשון — בחינם
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              &ldquo;העולם של <span className="text-primary">אלעד</span>&rdquo;
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              קהילת הוואטסאפ שלי. שם אני משתף מה קורה, עונה לשאלות, ושומר על קשר
              רציף. שלוש דלתות, כולן פתוחות:
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

      {/* מה קורה כאן עכשיו */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מה קורה באומנות הקשר <span className="text-primary">עכשיו</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              לא הכל חזר בבת אחת, וזה בסדר. אלה שלושת הדברים שחיים כאן היום:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {nextSteps.map((step) => (
              <Card
                key={step.href}
                className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200 motion-safe:hover:-translate-y-1"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {step.description}
                  </p>
                  <Link
                    href={step.href}
                    className="mt-4 inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
                  >
                    {step.cta}
                    <span aria-hidden="true">&larr;</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            רוצים שאשלח לכם כשיש חדש?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            בלי ספאם. כשהספר יוצא, כשיש תוכן חדש, כשקורה משהו ששווה לדעת עליו.
          </p>
          <div className="flex justify-center">
            <NewsletterForm
              theme="light"
              layout="row"
              placeholder="האימייל שלכם"
              ariaLabel="הרשמה לעדכונים"
            />
          </div>
        </div>
      </section>

      {/* Soft close */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            תודה שאתם כאן
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto leading-relaxed">
            אני לא מבטיח שום דבר גדול. יש לי הרגשה שאני בכיוון, וזה מספיק להיום.
            נמשיך מכאן ביחד.
          </p>
          <a
            href={ELAD_WORLD.community.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            להצטרפות לעולם של אלעד
          </a>
        </div>
      </section>
    </>
  );
}
