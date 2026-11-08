import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getProduct, formatILS } from "@/lib/products";

const product = getProduct("dating-card")!;

export const metadata: Metadata = {
  title: `${product.nameHe} | ${formatILS(product.price.amount)} | אומנות הקשר`,
  description:
    "אלעד והצוות יכתבו לך כרטיס היכרויות מקצועי שיגדיל פניות פי 3-5. שאלון אישי → ניסוח על ידי הצוות → שליחה למייל. כולל 3 בונוסים.",
  alternates: { canonical: product.path },
  openGraph: {
    title: `${product.nameHe} | אומנות הקשר`,
    description: "כרטיס היכרויות שמכפיל פניות. ₪97 — כתיבה אישית, לא תבנית.",
    url: product.path,
    type: "website",
  },
};

const steps = [
  {
    num: "01",
    title: "סליקה",
    desc: "תשלום מאובטח דרך Sumit. חשבונית מס/קבלה אוטומטית.",
  },
  {
    num: "02",
    title: "שאלון אישי",
    desc: "טופס 15 דקות עם השאלות הנכונות. בלי השאלות הסטנדרטיות שכולם שואלים.",
  },
  {
    num: "03",
    title: "ניסוח על ידי הצוות",
    desc: "אלעד והצוות כותבים את הכרטיס עבורך. לא AI, לא תבנית — כתיבה אנושית מקצועית.",
  },
  {
    num: "04",
    title: "קבלת הכרטיס למייל",
    desc: "תוך 5-7 ימי עסקים תקבל את הכרטיס המלא + הוראות שימוש בכל אתר היכרויות.",
  },
];

const whatYouGet = [
  "פתיח שמושך לקרוא הלאה (לא ׳היי, אני XX, גר ב-YY׳)",
  "תיאור אישיות שמשדר אמון ועניין — שני הרגשות הקריטיים",
  "תיאור מה אתה מחפש — בלי שתישמע נוקשה או בורח",
  "Call-to-action שאליו אנשים באמת מגיבים",
  "התאמה לכל פלטפורמה: Tinder, Bumble, Hinge, JDate, Israel Mate",
];

const bonuses = [
  {
    title: "מדריך לצילום פרופיל",
    value: 297,
    desc: "מה לצלם, איך לצלם, איפה לצלם — בעצמך או עם טלפון.",
  },
  {
    title: "מדריך סטיילינג אישי",
    value: 397,
    desc: "מה ללבוש לפי סוג גוף, אירוע ופרופיל. בלי לחזור על אותה תמונה ב-5 פלטפורמות.",
  },
  {
    title: "חודשיים חינם במועדון VIP",
    value: 397,
    desc: "כניסה למועדון הדרך 90D עם תוכן, קהילה ומפגשים שבועיים.",
  },
];

const totalBonusValue = bonuses.reduce((s, b) => s + b.value, 0);

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
            alt="כרטיס היכרויות מנצח"
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
              כרטיס היכרויות שמכפיל{" "}
              <span className="text-accent-light">פניות</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              אנחנו כותבים את הכרטיס שלך. לא AI, לא תבנית — כתיבה אנושית של אלעד והצוות, מותאמת אישית אליך.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#checkout"
                className="inline-flex px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                להזמנה — {formatILS(product.price.amount)}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">4 צעדים, 5-7 ימי עסקים</h2>
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

      {/* Bonuses */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/40">
              + 3 בונוסים כלולים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              שווי בונוסים: {formatILS(totalBonusValue)}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {bonuses.map((b) => (
              <Card key={b.title} className="border-border/50">
                <CardContent className="p-6">
                  <div className="text-xs font-semibold text-accent-dark mb-2">שווי {formatILS(b.value)}</div>
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
                  הזמנה
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
