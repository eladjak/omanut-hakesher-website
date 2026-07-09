import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "ליווי אישי VIP | אומנות הקשר",
  description:
    "ליווי אישי 6-12 חודשים עם התחייבות לתוצאה. מוגבל ל-10 לקוחות פעילים בכל רגע. שיחת היכרות חינם של 30+ דקות.",
  alternates: { canonical: "/coaching/vip" },
  openGraph: {
    title: "ליווי אישי VIP | אומנות הקשר",
    description: "ליווי אישי עד החופה — מוגבל ל-10 לקוחות. שיחת היכרות חינם.",
    url: "/coaching/vip",
    type: "website",
  },
};

const whatVipMeans = [
  {
    title: "ליווי יומיומי שלי באופן אישי",
    desc: "לא צוות. לא מנטור-מתחת. אני אישית עונה לך — בצ׳אט פרטי — על כל שאלה, מצב, התלבטות. בתוך 24 שעות.",
  },
  {
    title: "אחריות לתוצאה תוך 6-12 חודשים",
    desc: "המטרה היא חופה, או בנייה יציבה של זוגיות. לא ׳נראה איך הולך׳. יש מטרה ויש דדליין.",
  },
  {
    title: "אחריות יישומית",
    desc: "אם נתקעת — אנחנו עוצרים, חוזרים אחורה, מתחילים שוב מהשלב הקריטי. בלי תוספת תשלום.",
  },
  {
    title: "ייעוץ אסטרטגי",
    desc: "מעבר לליווי הטכני — חשיבה אסטרטגית על החיים שלך, הקריירה, האנרגיה, איך הזוגיות משתלבת בכל זה.",
  },
];

const whoFits = [
  "אתה מעל גיל 30, ברור לך שזה הזמן, ואין לך אנרגיה לעוד שנה של 'אולי'",
  "ניסית קורסים, אפליקציות, שדכנים, אולי גם פסיכולוג — ועדיין תקוע באותו מקום",
  "יש לך משאבים — כלכליים, רגשיים, זמן — להשקיע ברצינות בתהליך",
  "אתה מוכן/ה לעבוד קשה, לקבל פידבק ישיר, ולא לחפש פינות לקצר את הדרך",
];

const whoDoesntFit = [
  "אתה רוצה ׳טיפ׳ או טריק קצר — לא תהליך עומק של חודשים",
  "אתה לא בטוח אם אתה רוצה זוגיות בכלל",
  "אתה תחת מצוקה כלכלית קשה — קודם נסדר את זה, אחר כך נדבר",
  "אתה מצפה שאני אעשה את העבודה בשבילך",
];

const pricingTiers = [
  {
    label: "Standard",
    range: "₪6,000–9,000",
    desc: "ליווי 6 חודשים, מטרה ברורה, פגישות שבועיות, צ׳אט פתוח.",
  },
  {
    label: "Premium",
    range: "₪12,000–18,000",
    desc: "12 חודשים, ליווי יומיומי, אחריות יישומית מורחבת, כל הבונוסים של תוכנית הדרך כלולים.",
  },
  {
    label: "Concierge",
    range: "₪24,000–50,000",
    desc: "מותאם אישית — אסטרטגיה, חיבורים, מקרים מורכבים. כל מקרה מתומחר לפי הנסיבות.",
  },
];

export default function VipCoachingPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "ליווי", href: "/coaching" }, { label: "VIP" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/coaching-transformation.jpg"
            alt="ליווי אישי VIP — אומנות הקשר"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/72" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              מוגבל ל-10 לקוחות פעילים בכל רגע
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              ליווי אישי <span className="text-accent-light">VIP</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              ליווי שלי באופן אישי — 6 עד 12 חודשים — עם אחריות לתוצאה. לא לכולם. בודקים התאמה בשיחת היכרות.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/coaching/book"
                className="inline-flex px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                שיחת היכרות חינם — 30+ דקות
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What VIP means */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מה זה אומר VIP בפועל
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">לא ניסוח — תהליך אמיתי</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {whatVipMeans.map((item) => (
              <Card key={item.title} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fit check */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">בדיקת התאמה</h2>
            <p className="text-lg text-muted-foreground">
              לפני שאני לוקח לקוח חדש, חשוב לי שנדע שנינו שזה נכון.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-secondary/30 bg-secondary/5">
              <CardContent className="p-7">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-lg font-bold">VIP מתאים לך אם —</h3>
                </div>
                <ul className="space-y-3">
                  {whoFits.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed text-pretty">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-7">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <h3 className="text-lg font-bold">VIP לא מתאים לך אם —</h3>
                </div>
                <ul className="space-y-3">
                  {whoDoesntFit.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed text-pretty">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing tiers — transparent */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/40">
              שקיפות בתמחור
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">3 רמות — מותאם למקרה</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              ההצעה הסופית מתבססת על שיחת היכרות. הטווחים כאן כדי שלא תהיו מופתעים בפגישה.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingTiers.map((tier) => (
              <Card key={tier.label} className="border-border/50">
                <CardContent className="p-7">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{tier.label}</p>
                  <p className="text-2xl font-bold mb-3 tabular-nums" dir="ltr">{tier.range}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{tier.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            הצעד הבא — שיחת היכרות
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed text-pretty">
            30+ דקות. בלי עלות. בלי מחויבות. נחליט שנינו אם זה מתאים.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/coaching/book"
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              לתיאום שיחה — עכשיו
            </Link>
            <Link
              href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%AA%D7%A2%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%9C%D7%99%D7%95%D7%95%D7%99%20VIP%20-%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%9B%D7%A8%D7%95%D7%AA%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-4 border-2 border-white/50 text-white rounded-full font-medium text-base hover:bg-white/10 transition-colors"
            >
              או ישירות בוואטסאפ
            </Link>
          </div>
          <p className="mt-4 text-white/80 text-sm">מענה תוך 24 שעות, ימים א׳-ה׳.</p>
        </div>
      </section>
    </>
  );
}
