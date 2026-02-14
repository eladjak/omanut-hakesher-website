import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";


export const metadata: Metadata = {
  title: "אודות | אומנות הקשר",
  description:
    "הכירו את הגישה והפילוסופיה של אומנות הקשר - ליווי זוגות ויחידים לתקשורת עמוקה ומשמעותית",
};

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "כבוד",
    description: "יחס מכבד לכל אדם ולכל סיפור חיים. כל מי שמגיע ראוי לתשומת לב מלאה ולהקשבה עמוקה.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "אותנטיות",
    description: "עידוד לחיבור אמיתי עם עצמך ועם האחר. ללא מסכות, ללא משחקים - רק אתם כפי שאתם.",
    color: "bg-accent/10 text-accent-dark",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "מקצועיות",
    description: "ידע מבוסס מחקר וניסיון מעשי עשיר. שילוב של התיאוריה המתקדמת ביותר עם כלים מעשיים.",
    color: "bg-secondary/10 text-secondary-dark",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "צמיחה",
    description: "אמונה ביכולת של כל אחד להשתנות ולהתפתח. כל צעד קטן חשוב ומקרב אתכם למטרה.",
    color: "bg-primary-light/20 text-primary-dark",
  },
];

const methodology = [
  {
    step: 1,
    title: "הקשבה עמוקה",
    description: "כל תהליך מתחיל בהקשבה אמיתית לצרכים, לרצונות ולאתגרים הייחודיים שלכם. בפגישת ההיכרות נלמד מי אתם ומה חשוב לכם.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "כלים מעשיים",
    description: "דגש על טכניקות ואסטרטגיות שניתן ליישם מיד בחיי היום-יום. לא רק תיאוריה - כלים שעובדים.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "סביבה בטוחה",
    description: "יצירת מרחב תומך ולא שיפוטי שמאפשר פתיחות וחקירה. מקום שבו אפשר להיות פגיעים ולצמוח.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "התקדמות הדרגתית",
    description: "בניית שינוי יציב ובר-קיימא דרך צעדים קטנים ומדידים. שינוי אמיתי לוקח זמן, ואנחנו מלווים אתכם לכל אורך הדרך.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const credentials = [
  { year: "2012", title: "תואר ראשון בפסיכולוגיה", description: "לימודי פסיכולוגיה וייעוץ חינוכי" },
  { year: "2015", title: "תואר שני בטיפול זוגי", description: "התמחות בטיפול זוגי ומשפחתי" },
  { year: "2016", title: "הסמכה כמטפלת זוגית", description: "תעודה מוכרת מאת המועצה לטיפול נפשי" },
  { year: "2018", title: "הקמת אומנות הקשר", description: "הקמת הקליניקה והתחלת עבודה עצמאית" },
  { year: "2020", title: "הרחבה לסדנאות קבוצתיות", description: "פיתוח תוכנית סדנאות ייחודית" },
  { year: "2024", title: "פיתוח קורסים דיגיטליים", description: "הרחבת הפעילות לעולם הדיגיטלי" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            הכירו אותנו
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            אודות <span className="text-primary">אומנות הקשר</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            הדרך לקשרים בריאים ומספקים עוברת דרך תקשורת אמיתית ופתוחה
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground/50">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm">תמונה</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full -z-10" />
            </div>

            {/* Story */}
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                הסיפור שלי
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                מאמינה שכולם יכולים <span className="text-primary">ליצור קשר עמוק</span>
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  אומנות הקשר נולדה מתוך האמונה העמוקה שכל אדם וכל זוג יכולים
                  ליצור קשרים עמוקים ומשמעותיים. לאורך שנים של עבודה עם זוגות
                  ויחידים, ראיתי כיצד שינויים קטנים בתקשורת יכולים להביא לשינוי
                  עצום באיכות החיים ובשביעות הרצון מהזוגיות.
                </p>
                <p>
                  הגישה שלי משלבת ידע מקצועי מתחומי הפסיכולוגיה והתקשורת עם כלים
                  מעשיים שניתן ליישם בחיי היום-יום. אני מאמינה שלמידה והתפתחות
                  צריכות להיות נגישות, מכבדות ומותאמות אישית לכל זוג ולכל אדם.
                </p>
                <p>
                  המטרה שלי היא להעניק לכם את הכלים והביטחון לבנות את הקשרים
                  שאתם רוצים - קשרים מבוססים על הבנה, כבוד ואהבה.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מה מנחה אותנו
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              הערכים <span className="text-primary">שלנו</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              העקרונות שמנחים אותנו בכל מפגש ובכל תהליך
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-200 text-center">
                <CardContent className="p-8">
                  <div className={`inline-flex p-3 rounded-xl mb-5 ${value.color}`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              איך אנחנו עובדים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              הגישה <span className="text-primary">שלנו</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              תהליך מובנה ומוכח בארבעה שלבים
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {methodology.map((item, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <CardContent className="p-6 md:p-8">
                  <div className="flex gap-6">
                    <div className="shrink-0">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <span className="text-primary">{item.icon}</span>
                      </div>
                      {index < methodology.length - 1 && (
                        <div className="w-px h-6 bg-border mx-auto mt-2" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                          שלב {item.step}
                        </Badge>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Timeline */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              הניסיון שלי
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              הדרך <span className="text-primary">המקצועית</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              תעודות, הכשרות וניסיון שנצבר לאורך השנים
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {credentials.map((item, index) => (
              <div key={index} className="flex gap-6 pb-8 last:pb-0">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{item.year}</span>
                  </div>
                  {index < credentials.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">רוצים להתחיל?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            פגישת היכרות ראשונה תעזור לנו להכיר ולהבין איך נוכל לעזור לכם
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            צרו קשר
          </Link>
        </div>
      </section>
    </>
  );
}
