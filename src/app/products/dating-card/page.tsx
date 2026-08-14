import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getProduct, formatILS } from "@/lib/products";

const product = getProduct("dating-card")!;

export const metadata: Metadata = {
  title: `${product.nameHe} | ${formatILS(product.price.amount)} | אומנות הקשר`,
  description:
    "כתיבה אישית של כרטיס היכרויות: שאלון, ניסוח מותאם על ידי הצוות ושליחה למייל.",
  alternates: { canonical: product.path },
  openGraph: {
    title: `${product.nameHe} | אומנות הקשר`,
    description: "כרטיס היכרויות בכתיבה אישית ומותאמת — לא תבנית גנרית.",
    url: product.path,
    type: "website",
  },
};

const steps = [
  {
    num: "01",
    title: "בדיקת זמינות",
    desc: "לפני הזמנה מאשרים שהשירות פעיל, מה כלול בו ומהו מועד המסירה.",
  },
  {
    num: "02",
    title: "שאלון אישי",
    desc: "טופס היכרות שמרכז את המידע הדרוש לכתיבה אישית ומדויקת יותר.",
  },
  {
    num: "03",
    title: "ניסוח על ידי הצוות",
    desc: "אלעד והצוות מנסחים את הכרטיס על בסיס התשובות והדגשים שאושרו איתך.",
  },
  {
    num: "04",
    title: "קבלת הכרטיס למייל",
    desc: "הכרטיס והנחיות השימוש נשלחים במועד שאושר מראש לפני ההזמנה.",
  },
];

const whatYouGet = [
  "פתיח אישי שאינו נשען על תבנית גנרית",
  "תיאור אישיות המבוסס על המידע שמסרת",
  "ניסוח ברור של סוג ההיכרות והקשר שמעניינים אותך",
  "הזמנה לשיחה בניסוח שמתאים לקול שלך",
  "הנחיות להתאמת הטקסט לפלטפורמות היכרות שונות",
];

const bonuses = [
  {
    title: "מדריך לצילום פרופיל",
    desc: "מה לצלם, איך לצלם, איפה לצלם — בעצמך או עם טלפון.",
  },
  {
    title: "דגשים להצגה חזותית",
    desc: "נקודות לבדיקה בבחירת לבוש, סביבה ומגוון תמונות לפרופיל.",
  },
  {
    title: "משאב לתרגול הפרופיל",
    desc: "דף עבודה לבחינת הניסוח וההתאמה שלו לפלטפורמות שונות.",
  },
];

export default function DatingCardPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "מוצרים", href: "/products" }, { label: product.nameHe }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/blog-confidence.jpg"
            alt="שירות כתיבה לכרטיס היכרויות"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              שירות חד-פעמי · {formatILS(product.price.amount)}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              כרטיס היכרויות שמספר{" "}
              <span className="text-accent-light">מי אתם</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              אלעד והצוות מנסחים את הכרטיס על בסיס שאלון והדגשים שאישרת, בשפה שמתאימה לך.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#checkout"
                className="inline-flex px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                לבדיקת זמינות
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              איך זה עובד
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">4 צעדים מתיאום ועד מסירה</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s) => (
              <Card key={s.num} className="border-border/50">
                <CardContent className="p-6">
                  <span className="text-3xl font-bold text-primary/30 tabular-nums">{s.num}</span>
                  <h3 className="text-lg font-bold mt-2 mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-border/50">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-balance">מה תקבל בכרטיס</h2>
              <ul className="space-y-4">
                {whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-secondary-dark shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supporting resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/40">
              משאבים נלווים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              כלים שתומכים ביישום הכרטיס
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {bonuses.map((b) => (
              <Card key={b.title} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout */}
      <section id="checkout" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-7">
                <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                  בדיקת זמינות
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{product.nameHe}</h2>
                <p className="text-muted-foreground text-pretty">{product.taglineHe}</p>
              </div>
              <CheckoutForm product={product} />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
