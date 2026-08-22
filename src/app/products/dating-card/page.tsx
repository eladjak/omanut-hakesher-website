import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getProduct } from "@/lib/products";

const product = getProduct("dating-card")!;

export const metadata: Metadata = {
  title: `${product.nameHe} | אומנות הקשר`,
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
              שירות כתיבה אישי · בכפוף לזמינות
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
                className="inline-flex min-h-11 items-center px-10 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                לבדיקת זמינות
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* A useful self-check before ordering */}
      <section className="py-20 border-y border-border/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">לפני כתיבה</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">שלושה דברים שכדאי לדייק קודם</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              כרטיס טוב לא צריך להישמע מרשים; הוא צריך לתת לאדם אחר משהו אמיתי וספציפי להתחיל ממנו שיחה.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "רגע מהחיים", desc: "פעילות, מקום או הרגל שבועי שממחישים איך נראה היומיום שלך." },
              { title: "סוג החיבור", desc: "מה חשוב לך בדרך שבה מדברים, מבלים ומקבלים החלטות — בלי רשימת דרישות אינסופית." },
              { title: "פתח לשיחה", desc: "שאלה או פרט שקל להגיב אליו, במקום משפט כללי כמו 'אוהב/ת ליהנות מהחיים'." },
            ].map((item) => (
              <Card key={item.title} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-6 border-secondary/30 bg-secondary/5">
            <CardContent className="p-6 md:p-8">
              <p className="text-sm font-semibold text-secondary-dark mb-2">תרגיל של דקה</p>
              <p className="text-lg leading-relaxed text-pretty">
                השלימו: “בשבוע טוב אפשר למצוא אותי ___; אשמח להכיר אדם ש___; אפשר לפתוח איתי שיחה על ___”. אחר כך מחקו כל מילה שלא הייתם אומרים בקול.
              </p>
            </CardContent>
          </Card>
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

      {/* Availability — checkout remains off */}
      <section id="checkout" className="py-20 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-7">
                <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                  בדיקת זמינות
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{product.nameHe}</h2>
                <p className="text-muted-foreground text-pretty">
                  הרכישה המקוונת אינה פעילה כרגע. לפני הזמנה יאושרו בכתב המחיר, התכולה, מספר סבבי התיקון ומועד המסירה.
                </p>
              </div>
              <div className="rounded-2xl bg-muted/50 border border-border/60 p-5 mb-6">
                <h3 className="font-bold mb-3">מה אפשר לשלוח בבירור הראשון</h3>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li>• הפלטפורמה שבה הכרטיס מיועד להופיע</li>
                  <li>• האם צריך ניסוח חדש או עריכה לטקסט קיים</li>
                  <li>• מועד רצוי — בלי לשלוח בשלב הזה מידע אישי או רגיש שאינו נחוץ</li>
                </ul>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%91%D7%93%D7%95%D7%A7%20%D7%96%D7%9E%D7%99%D7%A0%D7%95%D7%AA%20%D7%9C%D7%A9%D7%99%D7%A8%D7%95%D7%AA%20%D7%9B%D7%A8%D7%98%D7%99%D7%A1%20%D7%94%D7%94%D7%99%D7%9B%D7%A8%D7%95%D7%99%D7%95%D7%AA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center px-7 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                  לבדוק זמינות בוואטסאפ
                </Link>
                <Link href="/resources" className="inline-flex min-h-11 items-center px-7 py-3 border border-border rounded-full font-semibold hover:bg-muted transition-colors">
                  להמשיך לתרגול עצמי
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
