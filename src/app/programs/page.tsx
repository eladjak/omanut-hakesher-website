import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getProduct, formatILS } from "@/lib/products";

export const metadata: Metadata = {
  title: "תוכניות אומנות הקשר — בחר/י את המסלול שלך",
  description:
    "6 דרכים להתחיל את הדרך לזוגיות: אירוע אהבה חינמי, מועדון 90D, כרטיס היכרויות מנצח, תוכנית הדרך, המסלול המלא וליווי VIP. בכל רמת השקעה יש נקודת התחלה.",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "תוכניות אומנות הקשר | כל המסלולים",
    description: "מהמפגש החינמי הראשון ועד ליווי VIP — בחר/י את הנקודה הנכונה בשבילך.",
    url: "/programs",
    locale: "he_IL",
    type: "website",
  },
};

const theWay = getProduct("the-way")!;
const theWayPlus = getProduct("the-way-plus")!;
const club = getProduct("club-90d")!;
const datingCard = getProduct("dating-card")!;

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
    href: "/events/love-event",
    badge: "חינם · נקודת התחלה",
    badgeTone: "accent",
    title: "אירוע אהבה",
    tagline: "מפגש זום שבועי — הדרכה, קהילה ותמיכה",
    price: "₪0",
    priceDetail: "יום ה׳, 20:30 — בזום",
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
    slug: club.slug,
    href: club.path,
    badge: `חודש ראשון ${formatILS(club.price.amount)}`,
    badgeTone: "secondary",
    title: club.nameHe,
    tagline: "תמיכה שוטפת + קהילה + מפגשים שבועיים",
    price: formatILS(club.price.amount),
    priceDetail: `חודש ראשון · אחר כך ${formatILS(club.price.anchorAmount ?? 30)}/חודש · ביטול חופשי`,
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
    slug: datingCard.slug,
    href: datingCard.path,
    badge: `${formatILS(datingCard.price.amount)} · חד-פעמי`,
    badgeTone: "accent",
    title: datingCard.nameHe,
    tagline: "אלעד והצוות כותבים לך פרופיל מקצועי",
    price: formatILS(datingCard.price.amount),
    priceDetail: "תשלום חד-פעמי · מסירה תוך 5-7 ימי עסקים",
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
    slug: theWay.slug,
    href: theWay.path,
    badge: "תוכנית 90 יום",
    badgeTone: "primary",
    title: theWay.nameHe,
    tagline: "90 ימים למציאת זוגיות מאושרת — בליווי ובהתחייבות",
    price: formatILS(theWay.price.amount),
    priceDetail: `או עד ${theWay.maxPayments} תשלומים ללא ריבית`,
    features: [
      "90 ימי תוכן (סרטון יומי קצר)",
      "6 שלבי השיטה — צעד אחר צעד",
      "ליווי יומי ממנטור בצ׳אט",
      "קהילה תומכת",
    ],
    audience: "למי שרוצה תהליך מובנה עם ליווי",
    cta: "לפרטים מלאים",
  },
  {
    slug: theWayPlus.slug,
    href: theWayPlus.path,
    badge: "המסלול המלא · המומלץ",
    badgeTone: "primary",
    title: theWayPlus.nameHe,
    tagline: "תוכנית הדרך + 12 מפגשי תרגול מעשי אונליין",
    price: formatILS(theWayPlus.price.amount),
    priceDetail: `או עד ${theWayPlus.maxPayments} תשלומים ללא ריבית`,
    features: [
      "כל מה שבתוכנית הדרך",
      "12 מפגשי תרגול מעשי",
      "ליווי VIP יומי",
      `8 בונוסים בשווי ${formatILS(4980)}`,
    ],
    audience: "למי שרוצה את החבילה המלאה בלי VIP",
    cta: "למסלול המלא",
    highlight: true,
  },
  {
    slug: "vip-coaching",
    href: "/coaching/vip",
    badge: "VIP · 10 לקוחות בלבד",
    badgeTone: "primary",
    title: "ליווי אישי VIP",
    tagline: "1-על-1 איתי. עד החופה. עם התחייבות.",
    price: "מותאם",
    priceDetail: "המחיר נחשף בשיחת ההתאמה",
    features: [
      "צ׳אט פרטי איתי באופן אישי",
      "מענה תוך 24 שעות",
      "6-12 חודשים · אחריות יישומית",
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

export default function ProgramsIndexPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תוכניות" }]} />
      </div>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              כל המסלולים
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              לבחור את הדרך שמתאימה לך
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              מהמפגש החינמי הראשון ועד ליווי VIP — כל מסלול הוא נקודת התחלה אמיתית,
              בכל רמת השקעה.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {programs.map((p) => (
              <Card
                key={p.slug}
                className={`border-border/50 flex flex-col ${
                  p.highlight ? "ring-2 ring-primary shadow-xl shadow-primary/10" : ""
                }`}
              >
                <CardContent className="p-7 flex flex-col flex-1">
                  <div className="mb-5">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${tones[p.badgeTone]}`}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-balance">{p.title}</h2>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed text-pretty">
                    {p.tagline}
                  </p>

                  <div className="mb-5 pb-5 border-b border-border/50">
                    <div className="text-3xl font-bold tabular-nums">{p.price}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.priceDetail}</div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm items-start">
                        <span className="shrink-0 mt-0.5 text-primary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-xs text-muted-foreground mb-5 leading-relaxed">
                    {p.audience}
                  </div>

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

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            לא בטוח/ה?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            שיחת התאמה חינמית
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            30 דקות בזום או טלפון. אבחן את המצב שלך ואמליץ על המסלול הנכון — גם אם
            זה אומר שאין מסלול בשלב הזה.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/coaching/book"
              className="inline-flex px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg"
            >
              לתיאום שיחת היכרות
            </Link>
            <Link
              href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%AA%D7%9C%D7%91%D7%98%2F%D7%AA%20%D7%91%D7%99%D7%9F%20%D7%94%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%95%D7%AA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-4 border border-border rounded-full font-medium text-foreground hover:bg-muted transition-colors"
            >
              או בוואטסאפ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
