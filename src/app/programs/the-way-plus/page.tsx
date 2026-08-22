import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getProduct } from "@/lib/products";

const product = getProduct("the-way-plus")!;

export const metadata: Metadata = {
  title: `${product.nameHe} | אומנות הקשר`,
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
    a: "ההתאמה תלויה בתוכן, בשעות, בערוצי הקהילה ובגבולות האישיים שלך. לפני הצטרפות אפשר לבקש את מתכונת המחזור ולברר נקודות שחשובות לך.",
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
                href="#choose"
                className="inline-flex min-h-11 items-center px-10 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
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

      {/* Choice support */}
      <section id="choose" className="py-20 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">איזה מסלול מתאים</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">התוכנית הבסיסית או המסלול המשולב?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">ההבדל המרכזי הוא לא “יותר טוב”, אלא כמה תרגול חי, משוב וקבוצה מתאימים לך כרגע.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border/60 bg-background">
            <table className="w-full min-w-[640px] text-right">
              <caption className="sr-only">השוואה בין תוכנית הדרך לבין תוכנית הדרך פלוס</caption>
              <thead className="bg-muted/60">
                <tr>
                  <th scope="col" className="p-4 font-semibold">מה חשוב לך</th>
                  <th scope="col" className="p-4 font-semibold">תוכנית הדרך</th>
                  <th scope="col" className="p-4 font-semibold">הדרך + תרגול קבוצתי</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  ["קצב", "מסלול מובנה שאפשר ללמוד בו באופן עצמאי", "מסלול מובנה לצד מועדי תרגול"],
                  ["משוב", "לפי מנגנוני התמיכה של התוכנית", "משוב גם במסגרת התרגול והערוצים שיאושרו"],
                  ["למידה חברתית", "לא נדרשת כדי להתקדם בתוכן", "חלק מרכזי יותר מהחוויה"],
                  ["מה צריך לבדוק", "גישה לתוכן, עומס ותמיכה", "בנוסף: שעות, נוכחות, פרטיות וכללי הקבוצה"],
                ].map(([label, base, plus]) => (
                  <tr key={label}>
                    <th scope="row" className="p-4 font-semibold align-top">{label}</th>
                    <td className="p-4 text-sm text-muted-foreground leading-relaxed align-top">{base}</td>
                    <td className="p-4 text-sm text-muted-foreground leading-relaxed align-top">{plus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground text-center md:hidden">אפשר להחליק לצדדים כדי לראות את כל ההשוואה.</p>
          <div className="mt-6 text-center">
            <Link href="/programs/the-way" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">לפרטים המלאים על תוכנית הדרך</Link>
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

      {/* Availability — checkout remains off */}
      <section id="checkout" className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-7">
                <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                  לפני החלטה
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{product.nameHe}</h2>
                <p className="text-muted-foreground text-pretty">ההרשמה המקוונת אינה פעילה כרגע. כשייפתח מחזור, יש לאשר לפני תשלום את מועדי המפגשים, ערוצי התמיכה, כללי הקהילה, המחיר ותנאי הביטול.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-7">
                {["מועדים ונוכחות", "עומס שבועי", "פרטיות בקבוצה", "מחיר וביטול"].map((item) => (
                  <div key={item} className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm font-medium text-center">{item}</div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%91%D7%93%D7%95%D7%A7%20%D7%90%D7%9D%20%D7%99%D7%A9%20%D7%9E%D7%97%D7%96%D7%95%D7%A8%20%D7%9E%D7%90%D7%95%D7%A9%D7%A8%20%D7%9C%D7%93%D7%A8%D7%9A%20%D7%A4%D7%9C%D7%95%D7%A1%20%D7%95%D7%9C%D7%A7%D7%91%D7%9C%20%D7%90%D7%AA%20%D7%94%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%AA%20%D7%94%D7%9E%D7%9C%D7%90%D7%94."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center px-7 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                  לבירור מחזור מאושר
                </Link>
                <Link href="/programs/the-way" className="inline-flex min-h-11 items-center px-7 py-3 border border-border rounded-full font-semibold hover:bg-muted transition-colors">למסלול הבסיסי</Link>
              </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-balance">לפני שמתחילים</h2>
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
