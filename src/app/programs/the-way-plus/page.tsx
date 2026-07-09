import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getProduct, formatILS } from "@/lib/products";

const product = getProduct("the-way-plus")!;

export const metadata: Metadata = {
  title: `${product.nameHe} | ${formatILS(product.price.amount)} | אומנות הקשר`,
  description:
    "תוכנית הדרך המלאה + חדר כושר לדייטים: 12 מפגשי תרגול אונליין, ליווי יומיומי, כל הבונוסים. הצעת ערך מקסימלית.",
  alternates: { canonical: product.path },
  openGraph: {
    title: `${product.nameHe} | אומנות הקשר`,
    description: "המסלול המלא — תוכנית הדרך + 12 מפגשי תרגול אונליין + כל הבונוסים.",
    url: product.path,
    type: "website",
  },
};

const includes = [
  { title: "תוכנית הדרך המלאה", value: 1500, desc: "90 ימי תוכן עם סרטון יומי קצר. 6 שלבי השיטה." },
  { title: "חדר כושר לדייטים", value: 1500, desc: "12 מפגשי תרגול אונליין. אימון מעשי לפני כל סוג של דייט/שיחה." },
  { title: "ליווי VIP יומי", value: 2970, desc: "ליווי אישי ממנטור מוסמך דרך צ׳אט פרטי. תשובה לכל שאלה תוך 24 שעות." },
  { title: "הקהילה", value: 670, desc: "פורום סגור, פייסבוק, וואטסאפ פעיל. אנשים בתהליך שלך, איתך." },
  { title: "התרגולים VIP", value: 800, desc: "בונוסים מתוך תוכנית הליווי האישי. חומר שאין במסלולים אחרים." },
  { title: "8 בונוסים", value: 4980, desc: "8 הצעדים, נתיב ברשת, חזון אישי, אירועים, צילום+מיתוג ועוד." },
];

const bonuses = [
  '״8 הצעדים למציאת החבר/ה הראשונים״ — נוסחה מובנית',
  '״נתיב ברשת״ — קורס מלא להיכרויות אונליין',
  'סדנה ומדריך ״חזון אישי״',
  'כרטיס כניסה חינם לאירועים עתידיים',
  'חבילת צילום ומיתוג עם SmartDating (שת״פ עם גיא משאלי)',
  'חודש מתנה במועדון הדרך 90D',
  'מנוי + קידום באתר שליש גן עדן',
  'הנחה למנוי באתר 252',
];

const totalValue = includes.reduce((s, i) => s + i.value, 0);

// Folded 2026-07-09 from the hoover-variant hadrech-jim page.
const faqs = [
  {
    q: "כמה זמן ביום אני צריך להשקיע?",
    a: "5-10 דקות ביום. הסרטונים קצרים, התרגילים מעשיים. כל אחד מסוגל.",
  },
  {
    q: "מתאים גם לדתיים / חרדים?",
    a: "מתאים. אני עצמי שומר תורה ומצוות, ויש בקהילה גם דתיים, חרדים וחילונים.",
  },
  {
    q: "מה ההבדל בין זה לבין הליווי האישי?",
    a: "כאן יש ליווי יומיומי דרך צ׳אט פרטי + קהילה + מפגשי תרגול. הליווי האישי הוא 1-על-1 אינטנסיבי. שני המסלולים מובילים לתוצאה.",
  },
  {
    q: "ומה אם אני לא רואה תוצאות?",
    a: "אחריות יישומית של חצי שנה — אפשר להקפיא ולהתחיל מחדש. אבל בסוף — אם אתה לא משקיע, אף תוכנית לא תעבוד.",
  },
];

export default function TheWayPlusPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תוכניות", href: "/programs" }, { label: product.nameHe }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/coaching-program.jpg"
            alt="תוכנית הדרך + חדר כושר לדייטים"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/72" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              המסלול המלא · המומלץ ביותר
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              תוכנית הדרך{" "}
              <span className="text-accent-light">+ חדר כושר לדייטים</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              לא רק לדעת — לתרגל. 12 מפגשי תרגול אונליין על כל סוג מצב שתפגש בדרך לזוגיות.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#checkout"
                className="inline-flex px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                למסלול המלא — {formatILS(product.price.amount)}
              </a>
              <Link
                href="/programs/the-way"
                className="inline-flex px-8 py-4 border border-white/40 text-white rounded-full font-medium text-base hover:bg-white/10 transition-colors"
              >
                רוצה רק את התוכנית הבסיסית?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value stack */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/40">
              מה תקבל
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              6 רכיבים · 8 בונוסים · ערך מצטבר {formatILS(totalValue)}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {includes.map((item) => (
              <Card key={item.title} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <span className="text-sm font-semibold text-muted-foreground tabular-nums whitespace-nowrap">
                      שווי {formatILS(item.value)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-7">
              <h3 className="text-xl font-bold mb-5 text-center">8 הבונוסים הכלולים</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {bonuses.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-secondary-dark shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed text-pretty">{b}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing summary */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-primary/30 shadow-xl">
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground mb-1">שווי כולל</p>
              <p className="text-2xl font-semibold text-muted-foreground line-through tabular-nums mb-4">
                {formatILS(product.price.valueAmount ?? totalValue)}
              </p>
              <p className="text-sm text-muted-foreground mb-1">מחיר רגיל</p>
              <p className="text-xl text-muted-foreground line-through tabular-nums mb-4">
                {formatILS(product.price.anchorAmount!)}
              </p>
              <p className="text-sm text-muted-foreground mb-1">המחיר שלך — מחזור פתוח</p>
              <p className="text-5xl font-bold text-primary tabular-nums mb-3">
                {formatILS(product.price.amount)}
              </p>
              <p className="text-sm text-muted-foreground">עד {product.maxPayments} תשלומים ללא ריבית</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checkout */}
      <section id="checkout" className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-7">
                <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                  הרשמה למסלול המלא
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{product.nameHe}</h2>
                <p className="text-muted-foreground text-pretty">{product.taglineHe}</p>
              </div>
              <CheckoutForm product={product} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              שאלות נפוצות
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">לפני שאתה מתחיל</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <Card key={f.q} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4">עדיין מתלבט/ת?</p>
            <Link
              href="/coaching/book"
              className="inline-flex items-center gap-2 text-primary font-semibold underline-offset-4 hover:underline"
            >
              <span>שיחת היכרות חינמית של 30 דקות</span>
              <span aria-hidden style={{ transform: "scaleX(-1)" }}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
