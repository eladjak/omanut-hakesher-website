import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SummitCheckout } from "@/components/summit/SummitCheckout";

export const metadata: Metadata = {
  title: 'כרטיס היכרויות מנצח — אלעד והצוות כותבים לך',
  description:
    'הצוות של אומנות הקשר כותב לך כרטיס היכרויות מקצועי שיגדיל פניות ב-400%. שאלון אישי, ניסוח מקצועי, שליחה למייל. 97 ₪.',
  alternates: { canonical: "/programs/dating-card" },
  openGraph: {
    title: 'כרטיס היכרויות מנצח | אומנות הקשר',
    description: 'כרטיס היכרויות מקצועי שמוכפל את הפניות. 97 ₪.',
    url: "/programs/dating-card",
    locale: "he_IL",
    type: "website",
  },
};

const process = [
  { num: 1, title: "תשלום מאובטח", desc: "97 ₪ דרך Summit. אישור מיידי לאימייל." },
  { num: 2, title: "שאלון אישי", desc: "מילוי שאלון מותאם של 10-15 דקות. אנחנו רוצים להכיר אותך." },
  { num: 3, title: "ניסוח מקצועי", desc: "הצוות כותב לך את הכרטיס תוך 3 ימי עסקים — שפה, טון, ובידול." },
  { num: 4, title: "מסירה לדייט הבא", desc: "כרטיס מוכן להעלאה ב-Tinder, Bumble, Hinge, JDate או כל אפליקציה." },
];

const bonuses = [
  { value: "297 ₪", title: "מדריך לצילום פרופיל", desc: "טיפים מקצועיים מצלם מנוסה — איך מצלמים תמונת פרופיל מנצחת" },
  { value: "397 ₪", title: "מדריך סטיילינג אישי", desc: "מה ללבוש לתמונה ולדייט. צבעים, צילומים, הטון הנכון." },
  { value: "397 ₪", title: "חודשיים חינם במועדון VIP", desc: "כניסה למועדון הדרך 90D ל-2 חודשים — בונוס של 60 ₪ שווי" },
];

export default function DatingCardPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תוכניות", href: "/programs" }, { label: "כרטיס היכרויות" }]} />
      </div>

      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/generated/blog-creative-date.jpg" alt="כרטיס היכרויות מנצח" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/68" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              שירות חד-פעמי
            </Badge>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              כרטיס היכרויות <span className="text-accent-light">מנצח</span>
            </h1>
            <p className="text-pretty text-xl md:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              אלעד והצוות כותבים לך באופן אישי כרטיס פרופיל מקצועי שיגדיל פניות ב-400%.
            </p>
            <p className="mt-6 text-white/75 text-base">
              שווי אמיתי: <span className="line-through tabular-nums">700-800 ₪</span>. היום: <span className="font-bold text-white tabular-nums">97 ₪</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">איך זה עובד</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">4 שלבים פשוטים</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {process.map((p) => (
              <Card key={p.num} className="border-border/50">
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg font-bold tabular-nums">
                    {p.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1.5">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">בונוסים</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">מה עוד תקבל/י</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              שווי בונוסים: <span className="font-semibold tabular-nums">1,091 ₪</span> — כלולים במחיר.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {bonuses.map((b, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <div className="mb-2 text-xs font-medium text-primary tabular-nums">שווי {b.value}</div>
                  <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">להזמנה</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">להזמין כרטיס היכרויות</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              תשלום חד-פעמי. ללא חיובים נסתרים. ללא Daily.
            </p>
          </div>
          <SummitCheckout slug="dating-card" ctaLabel="להזמנת הכרטיס" />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-muted-foreground mb-4">חיפושת עומק יותר במציאת זוגיות?</p>
          <Link href="/programs/hadrech-jim" className="text-primary font-semibold underline-offset-4 hover:underline">
            לתוכנית הדרך + חדר כושר לדייטים →
          </Link>
        </div>
      </section>
    </>
  );
}
