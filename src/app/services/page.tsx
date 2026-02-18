import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "שירותים",
  description:
    "ייעוץ זוגי, סדנאות, ליווי אישי ופגישות אונליין - מגוון אפשרויות לחיזוק הקשר והתקשורת",
  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    id: "couples",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "ייעוץ זוגי",
    description:
      "מפגשים אישיים לזוגות המעוניינים לחזק את הקשר, לשפר את התקשורת ולהתמודד עם אתגרים יחד. כל מפגש מותאם לצרכים הייחודיים של הזוג.",
    whoIsItFor: "זוגות בכל שלב - לפני נישואין, בזמן משבר, או לחיזוק קשר קיים",
    features: [
      "מפגשים פרטיים ואינטימיים",
      "התאמה אישית לצרכי הזוג",
      "כלים מעשיים לתקשורת יומיומית",
      "תמיכה בזמני משבר ושינוי",
      "חיזוק הקרבה והאינטימיות",
    ],
    duration: "60-90 דקות למפגש",
    format: "פרונטלי / אונליין",
    pricing: "תעריף מותאם אישית",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "workshops",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "סדנאות קבוצתיות",
    description:
      "סדנאות מעשיות בקבוצות קטנות לפיתוח מיומנויות תקשורת ויצירת קשרים משמעותיים. למידה מחוויה משותפת בסביבה תומכת.",
    whoIsItFor: "זוגות ויחידים שרוצים ללמוד בקבוצה ולהתחבר לאחרים",
    features: [
      "למידה מניסיון של אחרים",
      "תרגול מעשי בסביבה בטוחה",
      "קבוצות קטנות ואינטימיות",
      "נושאים מגוונים ורלוונטיים",
      "חומרים ללמידה עצמאית",
    ],
    duration: "3-4 שעות לסדנה",
    format: "פרונטלי",
    pricing: "מחיר מוזל למשתתף",
    color: "bg-secondary/10 text-secondary-dark",
  },
  {
    id: "individual",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "ליווי אישי",
    description:
      "מפגשים פרטניים להתפתחות אישית, בניית ביטחון עצמי ופיתוח יכולות לקשרים בריאים. מיקוד בצרכים האישיים שלך.",
    whoIsItFor: "יחידים שרוצים לעבוד על דפוסי קשר, הכנה לזוגיות, או התמודדות עם פרידה",
    features: [
      "מיקוד בצרכים האישיים שלך",
      "עבודה על דפוסים ואמונות",
      "פיתוח מודעות עצמית",
      "הכנה לקשר זוגי",
      "התמודדות עם פרידה או אובדן",
    ],
    duration: "50-60 דקות למפגש",
    format: "פרונטלי / אונליין",
    pricing: "תעריף מותאם אישית",
    color: "bg-accent/10 text-accent-dark",
  },
  {
    id: "online",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "פגישות אונליין",
    description:
      "גמישות מלאה עם אפשרות למפגשים מקוונים מכל מקום - אותה איכות, נגישות מקסימלית. מתאים גם לזוגות במרחק גיאוגרפי.",
    whoIsItFor: "כל מי שמעדיף נוחות מהבית, גר רחוק, או שלוח זמנים עמוס",
    features: [
      "נוחות ונגישות מהבית",
      "חיסכון בזמן נסיעות",
      "מתאים לזוגות במרחק",
      "פלטפורמה מאובטחת ופרטית",
      "גמישות בקביעת מועדים",
    ],
    duration: "כמו מפגש פרונטלי",
    format: "זום / Google Meet",
    pricing: "זהה למפגש פרונטלי",
    color: "bg-primary-light/20 text-primary-dark",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "שירותים" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            מה אנחנו מציעים
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            השירותים <span className="text-primary">שלנו</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            מגוון אפשרויות לליווי וצמיחה בתחום הזוגיות והתקשורת.
            כל שירות מותאם אישית לצרכים שלכם.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service) => (
              <Card
                key={service.id}
                id={service.id}
                className="scroll-mt-24 overflow-hidden border-border/50 hover:shadow-lg transition-all duration-200"
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Main Content */}
                    <div className="lg:col-span-2 p-8 md:p-10">
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`inline-flex p-3 rounded-xl shrink-0 ${service.color}`}>
                          {service.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold mb-2">{service.title}</h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Who it's for */}
                      <div className="mb-6 p-4 bg-muted/50 rounded-xl">
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">למי מתאים?</h3>
                        <p className="text-foreground">{service.whoIsItFor}</p>
                      </div>

                      {/* Features */}
                      <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-muted/30 p-8 md:p-10 flex flex-col justify-between">
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">משך</h4>
                          <p className="font-medium">{service.duration}</p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">פורמט</h4>
                          <p className="font-medium">{service.format}</p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">תעריף</h4>
                          <p className="font-medium">{service.pricing}</p>
                        </div>
                      </div>

                      <Button asChild className="mt-8 rounded-full bg-primary hover:bg-primary-dark text-white w-full">
                        <Link href="/contact">
                          קביעת פגישת היכרות
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-border/50 text-center">
            <CardContent className="p-8">
              <svg className="w-10 h-10 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold mb-3">לגבי מחירים</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                המחירים משתנים בהתאם לסוג השירות ולמשך התהליך. בפגישת ההיכרות נדבר
                על הצרכים שלכם ונמצא את ההתאמה הטובה ביותר.
              </p>
              <Button asChild className="rounded-full bg-primary hover:bg-primary-dark text-white">
                <Link href="/contact">צרו קשר לפרטים</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            פגישת היכרות ראשונה ללא התחייבות
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לקביעת פגישה
          </Link>
        </div>
      </section>
    </>
  );
}
