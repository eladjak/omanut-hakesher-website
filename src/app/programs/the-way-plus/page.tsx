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
    "תוכנית הדרך לצד 12 מפגשי תרגול אונליין, קהילה ומשוב מעשי.",
  alternates: { canonical: product.path },
  openGraph: {
    title: `${product.nameHe} | אומנות הקשר`,
    description: "תוכנית הדרך לצד 12 מפגשי תרגול אונליין, קהילה ומשוב מעשי.",
    url: product.path,
    type: "website",
  },
};

const includes = [
  { title: "תוכנית הדרך המלאה", desc: "12 שבועות של תוכן ותרגול במסלול מובנה." },
  { title: "חדר כושר לדייטים", desc: "12 מפגשי תרגול אונליין כהכנה למצבי היכרות ושיחה." },
  { title: "ליווי בצ׳אט", desc: "ערוץ לשאלות, משוב והכוונה לאורך המסלול, לפי תנאי התוכנית." },
  { title: "הקהילה", desc: "מרחב סגור לאנשים שנמצאים בתהליך דומה." },
  { title: "תרגולים נוספים", desc: "חומרי תרגול שמרחיבים את שיעורי הליבה." },
  { title: "משאבים נלווים", desc: "כלים בנושאי חזון, פעולה, פרופיל היכרויות ושיחה." },
];

const supportingResources = [
  "תרגילי הכנה למצבי היכרות ושיחה",
  "חומרי עבודה על חזון, פעולה ותקשורת",
  "דגשים לפרופיל היכרויות ולהתנהלות אונליין",
  "משאבים נוספים שיפורטו במסמך תכולת המחזור",
];


// Folded 2026-07-09 from the hoover-variant hadrech-jim page.
const faqs = [
  {
    q: "כמה זמן ביום אני צריך להשקיע?",
    a: "העומס משתנה בין שיעור, תרגיל ומפגש. לפני ההצטרפות נציג את מתכונת המחזור כדי שתוכל/י לבדוק אם היא מתאימה לשגרה שלך.",
  },
  {
    q: "מתאים גם לדתיים / חרדים?",
    a: "מתאים. אני עצמי שומר תורה ומצוות, ויש בקהילה גם דתיים, חרדים וחילונים.",
  },
  {
    q: "מה ההבדל בין זה לבין הליווי האישי?",
    a: "כאן יש צ׳אט פרטי, קהילה ומפגשי תרגול. ליווי אישי הוא תהליך 1-על-1 מותאם ואינטנסיבי יותר; הבחירה תלויה בסוג התמיכה והמשוב שמתאימים לכם.",
  },
  {
    q: "ומה אם אני לא רואה תוצאות?",
    a: "אי אפשר להבטיח תוצאה אישית או לוח זמנים. אפשר לבחון את היישום, לבקש משוב ולבדוק מה דורש התאמה במסגרת התנאים שיוצגו לפני ההצטרפות.",
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
              מסלול משולב
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              תוכנית הדרך{" "}
              <span className="text-accent-light">+ חדר כושר לדייטים</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              תוכן ותרגול משולבים ב-12 מפגשי אונליין למצבי היכרות, שיחה ומשוב.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#checkout"
                className="inline-flex px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                לבדיקת זמינות המסלול
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
              מה כלול במסלול
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {includes.map((item) => (
              <Card key={item.title} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-7">
              <h3 className="text-xl font-bold mb-5 text-center">משאבים נלווים לתרגול</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {supportingResources.map((b, i) => (
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
              <p className="text-sm text-muted-foreground mb-1">מחיר המסלול המוצג כעת</p>
              <p className="text-5xl font-bold text-primary tabular-nums mb-3">
                {formatILS(product.price.amount)}
              </p>
              <p className="text-sm text-muted-foreground">
                הרכישה המקוונת אינה פעילה; המחיר והתנאים יאושרו לפני פתיחת הרשמה.
              </p>
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
              <span>לתיאום שיחת היכרות</span>
              <span aria-hidden style={{ transform: "scaleX(-1)" }}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
