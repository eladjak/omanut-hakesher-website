import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "תוכניות אומנות הקשר — בחר/י את המסלול שלך",
  description:
    "5 תוכניות למציאת זוגיות מאושרת: ליווי VIP, הדרך + חדר כושר, מועדון 90D, כרטיס היכרויות מנצח, ואירוע אהבה חינמי. בחר/י את הנקודה הנכונה בשבילך.",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "תוכניות אומנות הקשר | כל המסלולים",
    description: "5 דרכים להתחיל את הדרך לזוגיות — מ-4 ₪ ועד ליווי VIP פרטי.",
    url: "/programs",
    locale: "he_IL",
    type: "website",
  },
};

interface ProgramCard {
  slug: string;
  href: string;
  badge: string;
  badgeTone: "primary" | "accent" | "secondary";
  title: string;
  tagline: string;
  price: string;
  priceDetail: string;
  features: string[];
  audience: string;
  cta: string;
  highlight?: boolean;
}

const programs: ProgramCard[] = [
  {
    slug: "love-event",
    href: "/event/love",
    badge: "חינם · נקודת התחלה",
    badgeTone: "accent",
    title: "אירוע אהבה",
    tagline: "מפגש זום שבועי — הדרכה, קהילה ותמיכה",
    price: "₪0",
    priceDetail: "יום ה׳, 20:30 — שעתיים בזום",
    features: [
      "הדרכה חיה ממני",
      "קהילה של מתאימים לזוגיות",
      "שאלות ותשובות בלייב",
      "ללא הקלטה — רק חי",
    ],
    audience: "למי שמכיר אותנו פעם ראשונה",
    cta: "להרשמה חינמית",
  },
  {
    slug: "club-90d",
    href: "/programs/club-90d",
    badge: "30 ₪ לחודש",
    badgeTone: "secondary",
    title: "מועדון הדרך 90D",
    tagline: "תמיכה שוטפת + קהילה + מפגשים שבועיים",
    price: "₪30",
    priceDetail: "לחודש · ללא Daily · ביטול חופשי",
    features: [
      "מפגש שבועי בזום",
      "ליווי יומי בצ׳אט",
      "פורום + פייסבוק + וואטסאפ",
      "כניסה חינמית לאירועים",
    ],
    audience: "למי שרוצה תמיכה שוטפת בלי להתחייב",
    cta: "להצטרפות למועדון",
  },
  {
    slug: "dating-card",
    href: "/programs/dating-card",
    badge: "97 ₪ · חד-פעמי",
    badgeTone: "accent",
    title: "כרטיס היכרויות מנצח",
    tagline: "אלעד והצוות כותבים לך פרופיל מקצועי",
    price: "₪97",
    priceDetail: "תשלום חד-פעמי · מסירה תוך 3 ימים",
    features: [
      "שאלון אישי + ניסוח מקצועי",
      "מדריך לצילום פרופיל",
      "מדריך סטיילינג אישי",
      "חודשיים חינם במועדון",
    ],
    audience: "למי שכבר באפליקציות ולא מקבל פניות",
    cta: "להזמנת הכרטיס",
  },
  {
    slug: "hadrech-jim",
    href: "/programs/hadrech-jim",
    badge: "2,970 ₪ · 12 תשלומים",
    badgeTone: "primary",
    title: "הדרך + חדר כושר לדייטים",
    tagline: "התוכנית הדגל — 90 ימים למציאת זוגיות",
    price: "₪2,970",
    priceDetail: "או 247 ₪ × 12 חודשים · ללא ריבית",
    features: [
      "90 ימי תוכן (סרטון יומי)",
      "ליווי אישי יומי בצ׳אט",
      "12 מפגשי תרגול מעשי",
      "קהילה + 8 בונוסים שווי 5,950 ₪",
    ],
    audience: "למי שרוצה תוכנית מלאה מבלי VIP",
    cta: "לפרטים מלאים",
    highlight: true,
  },
  {
    slug: "vip",
    href: "/programs/vip",
    badge: "VIP · 10 לקוחות בלבד",
    badgeTone: "primary",
    title: "ליווי VIP פרטי",
    tagline: "1-על-1 איתי. עד החופה. עם התחייבות.",
    price: "מותאם",
    priceDetail: "המחיר נחשף בשיחת ההתאמה",
    features: [
      "צ׳אט פרטי איתי באופן אישי",
      "מענה תוך 24 שעות",
      "6-12 חודשים · אחריות מלאה",
      "תוכנית מותאמת אישית",
    ],
    audience: "למי שמוכן/ה להשקיע ברצינות בעצמו",
    cta: "לשיחת התאמה חינם",
  },
];

const tones = {
  primary: "bg-primary/10 text-primary border-primary/30",
  accent: "bg-accent/10 text-accent-dark border-accent/30",
  secondary: "bg-secondary/10 text-secondary-dark border-secondary/30",
};

export default function ProgramsPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תוכניות" }]} />
      </div>

      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/generated/blog-hero.jpg" alt="תוכניות אומנות הקשר" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              5 תוכניות · 4 רמות השקעה
            </Badge>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              בחר/י את ה<span className="text-accent-light">מסלול</span> שלך
            </h1>
            <p className="text-pretty text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              מהמפגש החינמי הראשון ועד ליווי VIP. כל מסלול הוא נקודת התחלה אמיתית.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {programs.map((p) => (
              <Card
                key={p.slug}
                className={`border-border/50 flex flex-col ${p.highlight ? "ring-2 ring-primary shadow-xl shadow-primary/10" : ""}`}
              >
                <CardContent className="p-7 flex flex-col flex-1">
                  <div className="mb-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${tones[p.badgeTone]}`}>
                      {p.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{p.title}</h2>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{p.tagline}</p>

                  <div className="mb-5 pb-5 border-b border-border/50">
                    <div className="text-3xl font-bold tabular-nums">{p.price}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.priceDetail}</div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex gap-2.5 text-sm items-start">
                        <span className="shrink-0 mt-0.5 text-primary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-xs text-muted-foreground mb-5 italic leading-relaxed">{p.audience}</div>

                  <Link
                    href={p.href}
                    className={`block w-full text-center rounded-full py-3 font-semibold transition-colors ${
                      p.highlight
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-foreground/5 hover:bg-foreground/10 text-foreground"
                    }`}
                  >
                    {p.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">לא בטוח/ה?</Badge>
          <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">שיחת התאמה חינמית</h2>
          <p className="text-pretty text-lg text-muted-foreground mb-8">
            30 דקות בזום או טלפון. אבחן את המצב שלך ואמליץ על המסלול הנכון — גם אם זה אומר שאין מסלול בשלב הזה.
          </p>
          <Link
            href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%AA%D7%9C%D7%91%D7%98%2F%D7%AA%20%D7%91%D7%99%D7%9F%20%D7%94%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%95%D7%AA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg"
          >
            לשיחה חינמית בוואטסאפ
          </Link>
        </div>
      </section>
    </>
  );
}
