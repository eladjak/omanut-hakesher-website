import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseFAQ } from "@/components/CourseFAQ";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

export const metadata: Metadata = {
  title: "תכנית הדרך",
  description:
    "תכנית הדרך לזוגיות מיטבית - מסלול מובנה בן 5 שלבים לחיזוק הקשר, שיפור התקשורת ובניית זוגיות בריאה ומספקת",
  alternates: {
    canonical: "/course",
  },
  openGraph: {
    title: "תכנית הדרך | אומנות הקשר",
    description:
      "תכנית הדרך לזוגיות מיטבית - מסלול מובנה בן 5 שלבים לחיזוק הקשר, שיפור התקשורת ובניית זוגיות בריאה ומספקת",
    url: "/course",
    locale: "he_IL",
    type: "website",
  },
};

const overviewCards = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "מה תקבלו",
    description:
      "מסלול מובנה עם כלים מעשיים, תרגילים לבית, ליווי אישי צמוד, ותכנית מותאמת לצרכים הייחודיים שלכם.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "למי מתאים",
    description:
      "לזוגות שרוצים לחזק את הקשר, להתמודד עם אתגרים, או לבנות בסיס חזק לעתיד משותף - בכל שלב של הזוגיות.",
    color: "bg-secondary/10 text-secondary-dark",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "משך התכנית",
    description:
      "התכנית נמשכת בין 3-6 חודשים עם מפגשים שבועיים או דו-שבועיים, בהתאם לקצב שלכם ולצרכים שעולים בתהליך.",
    color: "bg-accent/10 text-accent-dark",
  },
];

const programSteps = [
  {
    step: 1,
    title: "היכרות ואבחון",
    description:
      "בשלב הראשון נכיר אחד את השני, נבין את הצרכים ואת האתגרים שלכם, ונבנה יחד תכנית מותאמת אישית. נזהה דפוסי תקשורת ונקודות חוזק של הזוגיות.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "בניית תקשורת",
    description:
      "נלמד כלים מעשיים לתקשורת פתוחה ואפקטיבית. נתרגל הקשבה אמפתית, ביטוי צרכים, וניהול דיאלוג בונה גם בנושאים רגישים.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "ריפוי דפוסים",
    description:
      "נזהה ונעבד דפוסים שחוזרים על עצמם ופוגעים בקשר. נבין מאיפה הם מגיעים ונבנה דרכים חדשות ובריאות יותר להתמודד.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "חיזוק הקשר",
    description:
      "נעמיק את הקרבה והאינטימיות, נבנה שגרות זוגיות חיוביות, ונחזק את היכולת ליהנות מהקשר ולהעריך אחד את השני.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "עצמאות ותחזוקה",
    description:
      "נסכם את הכלים שרכשתם, נבנה תכנית תחזוקה לעתיד, ונוודא שיש לכם את הביטחון והיכולת להמשיך את הדרך בכוחות עצמכם.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const stats = [
  { end: 200, suffix: "+", label: "זוגות שליוויתי" },
  { end: 98, suffix: "%", label: "שביעות רצון" },
  { end: 8, suffix: "+", label: "שנות ניסיון" },
];

export default function CoursePage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תכנית הדרך" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            מסלול מובנה
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            תכנית הדרך <span className="text-primary">לזוגיות מיטבית</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            מסלול מוכח בן 5 שלבים שיעזור לכם לבנות זוגיות חזקה, בריאה ומספקת -
            עם כלים מעשיים וליווי אישי צמוד
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {overviewCards.map((card, index) => (
              <StaggerItem key={index}>
                <Card className="border-border/50 hover:shadow-md transition-all duration-200 text-center h-full">
                  <CardContent className="p-8">
                    <div className={`inline-flex p-3 rounded-xl mb-5 ${card.color}`}>
                      {card.icon}
                    </div>
                    <h2 className="text-xl font-semibold mb-3">{card.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Program Modules */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                שלבי התכנית
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                המסע <span className="text-primary">שלכם</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                חמישה שלבים מובנים שמובילים לשינוי אמיתי ובר-קיימא
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-6">
            {programSteps.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex gap-6">
                      <div className="shrink-0">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <span className="text-primary">{item.icon}</span>
                        </div>
                        {index < programSteps.length - 1 && (
                          <div className="w-px h-6 bg-border mx-auto mt-2" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border-0 text-xs"
                          >
                            שלב {item.step}
                          </Badge>
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CourseFAQ />

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            מוכנים להתחיל את המסע?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            שיחת היכרות ראשונה ללא עלות וללא התחייבות
          </p>
          <Link
            href="/book"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לקביעת שיחת היכרות
          </Link>
        </div>
      </section>
    </>
  );
}
