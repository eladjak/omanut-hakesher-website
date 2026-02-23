import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookFAQ } from "@/components/BookFAQ";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "קביעת שיחה",
  description:
    "קבעו שיחת היכרות חינמית וללא התחייבות - הצעד הראשון לזוגיות טובה יותר עם אומנות הקשר",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "קביעת שיחה | אומנות הקשר",
    description:
      "קבעו שיחת היכרות חינמית וללא התחייבות - הצעד הראשון לזוגיות טובה יותר עם אומנות הקשר",
    url: "/book",
    locale: "he_IL",
    type: "website",
  },
};

const steps = [
  {
    step: 1,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "קובעים שיחה",
    description: "בוחרים זמן שנוח לכם ופונים אלינו דרך וואטסאפ, טלפון, או טופס יצירת קשר.",
  },
  {
    step: 2,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "נפגשים ומשוחחים",
    description: "שיחת היכרות של כ-20 דקות - נכיר אחד את השני, נבין את הצרכים שלכם, ונראה אם יש התאמה.",
  },
  {
    step: 3,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "מתחילים את הדרך",
    description: "אם מחליטים להמשיך, נבנה יחד תכנית מותאמת אישית ונתחיל את התהליך.",
  },
];

const expectations = [
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "שיחה של כ-20 דקות בטלפון או בזום",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "ללא עלות וללא התחייבות",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    text: "הכרות ראשונית ושיחה על הצרכים שלכם",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    text: "הסבר על דרך העבודה ואפשרויות הליווי",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    text: "סביבה בטוחה ולא שיפוטית",
  },
];

const testimonials = [
  {
    quote: "שיחת ההיכרות הייתה כל כך נעימה שהבנו מיד שמצאנו את המקום הנכון. תוך שבועות הרגשנו שינוי.",
    name: "מ. ור.",
    context: "זוג נשוי 5 שנים",
  },
  {
    quote: "פחדנו מהצעד הראשון, אבל השיחה הייתה קלה ומכילה. היום אנחנו במקום אחר לגמרי.",
    name: "ד. וא.",
    context: "לפני נישואין",
  },
  {
    quote: "אחרי שנים שדחינו, שיחה אחת שינתה את הכיוון. הלוואי שהתחלנו קודם.",
    name: "ש. ול.",
    context: "זוג נשוי 12 שנים",
  },
];

export default function BookPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "קביעת שיחה" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            ללא התחייבות
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            קבעו שיחת היכרות <span className="text-primary">חינמית</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            הצעד הראשון הוא תמיד הקשה ביותר, אבל גם הכי חשוב.
            בואו נדבר ונראה איך אפשר לעזור.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                איך זה עובד
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                שלושה צעדים <span className="text-primary">פשוטים</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary">
                    {item.icon}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-0 text-xs mb-3"
                  >
                    שלב {item.step}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <ScrollReveal direction="right">
              <div>
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                  מה מחכה לכם
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  מה קורה בשיחת <span className="text-primary">ההיכרות?</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  שיחת ההיכרות היא הזדמנות להכיר אחד את השני בסביבה נעימה
                  וללא לחץ. נשוחח על מה שהביא אתכם, נבין מה חשוב לכם,
                  ואסביר על הדרך שבה אני עובדת. בסוף השיחה תוכלו להחליט
                  בשקט ובנחת אם ואיך תרצו להמשיך.
                </p>
                <ul className="space-y-4">
                  {expectations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Booking Options */}
            <ScrollReveal direction="left">
              <Card className="border-border/50 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    דרכי התקשרות
                  </h3>

                  <div className="space-y-4">
                    {/* WhatsApp - Primary */}
                    <Button
                      asChild
                      className="w-full rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white py-6 text-base"
                    >
                      <a
                        href="https://wa.me/972501234567?text=שלום, אשמח לקבוע שיחת היכרות"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        שלחו הודעה בוואטסאפ
                      </a>
                    </Button>

                    {/* Phone */}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-xl py-6 text-base border-border/50"
                    >
                      <a href="tel:+972501234567">
                        <svg
                          className="w-5 h-5 ml-2 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        050-123-4567
                      </a>
                    </Button>

                    {/* Contact Form */}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-xl py-6 text-base border-border/50"
                    >
                      <Link href="/contact">
                        <svg
                          className="w-5 h-5 ml-2 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        טופס יצירת קשר
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-6">
                    זמני מענה: ימים א&apos;-ה&apos; 9:00-20:00
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Mini */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                מה אומרים עלינו
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                גם הם <span className="text-primary">התחילו משיחה</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((item, index) => (
              <StaggerItem key={index}>
                <Card className="border-border/50 h-full">
                  <CardContent className="p-6">
                    <svg
                      className="w-8 h-8 text-primary/20 mb-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                    </svg>
                    <p className="text-sm leading-relaxed mb-4">{item.quote}</p>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.context}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <BookFAQ />

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            אל תחכו, השיחה הראשונה עלינו
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            20 דקות שיכולות לשנות את הזוגיות שלכם
          </p>
          <a
            href="https://wa.me/972501234567?text=שלום, אשמח לקבוע שיחת היכרות"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            שלחו הודעה בוואטסאפ
          </a>
        </div>
      </section>
    </>
  );
}
