import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getProduct, formatILS } from "@/lib/products";

const product = getProduct("the-way")!;

export const metadata: Metadata = {
  title: `${product.nameHe} | ${formatILS(product.price.amount)} | אומנות הקשר`,
  description:
    "תוכנית הדרך — 90 ימים למציאת זוגיות מאושרת. 6 שלבי השיטה, ליווי יומיומי ממנטור, קהילה תומכת. 461 זוגות כבר מצאו אהבה.",
  alternates: { canonical: product.path },
  openGraph: {
    title: `${product.nameHe} | אומנות הקשר`,
    description: "תוכנית הדרך — 90 ימים למציאת זוגיות מאושרת, בליווי אישי.",
    url: product.path,
    type: "website",
  },
};

const stages = [
  {
    num: "01",
    weeks: "שבועות 1-2",
    title: "גישה",
    desc: "בניית גישה בריאה לזוגיות, איתור אמונות מגבילות, יצירת חזון אישי ברור — בלי הרשימות הבלתי-אפשריות.",
  },
  {
    num: "02",
    weeks: "שבועות 3-5",
    title: "תקשורת",
    desc: "יצירת הזדמנויות להיכרות, הבנת ההבדלים בתקשורת בין גברים ונשים, שפת גוף, תקשורת אונליין.",
  },
  {
    num: "03",
    weeks: "שבועות 6-8",
    title: "משיכה",
    desc: "פלירטוט אמיתי, יזימה ללא לחץ, ניהול דייטים שמובילים למשהו — לא עוד 'היה נחמד נשמור על קשר'.",
  },
  {
    num: "04",
    weeks: "שבועות 9-11",
    title: "חיבור וכימיה",
    desc: "העמקת קשר, תקשורת מתקדמת, יצירת שפה זוגית משותפת, אינטימיות רגשית.",
  },
  {
    num: "05",
    weeks: "חלק משלב 4",
    title: "אינטימיות רגשית",
    desc: "הבנת מהו חיבור רגשי אמיתי, הרחבת המכנה המשותף, בניית אמון.",
  },
  {
    num: "06",
    weeks: "שבועות 12-13",
    title: "מחויבות",
    desc: "ייצוב הזוגיות, קבלת החלטות מתוך בהירות, יסודות לחיים משותפים.",
  },
];

const includes = [
  { title: "השיטה", value: 1500, desc: "90 ימי תוכן עם סרטון קצר יומי. 5-10 דקות ביום." },
  { title: "ליווי יומי", value: 2970, desc: "ליווי מנטור מוסמך דרך צ׳אט פרטי. תשובה לכל שאלה." },
  { title: "הקהילה", value: 670, desc: "פורום סגור, קבוצת פייסבוק, קבוצת וואטסאפ פעילה." },
  { title: "התרגולים", value: 800, desc: "בונוסים מתוך תוכנית הליווי האישי — חומר ב-VIP בלבד." },
];

const objections = [
  {
    q: "ואם אין לי זמן ל-90 יום שלמים?",
    a: "השיטה בנויה ל-5-10 דקות ביום. בערך כמו צפייה בריל. אם אין לך 10 דקות ביום לעצמך, נדבר על זה לפני שאתה משקיע — ייתכן שעכשיו לא הזמן הנכון.",
  },
  {
    q: "אני כבר ניסיתי הכל. למה זה יעבוד דווקא?",
    a: "כי 461 לפניך כבר עברו את זה. השיטה לא ׳עוד טיפ׳ — היא תהליך מובנה של 6 שלבים. כל שלב נבנה על קודמו. כשמוותרים על שלב, הבא לא עובד.",
  },
  {
    q: "מתאים לדתי/חרדי?",
    a: "כן. אני עצמי שומר תורה ומצוות. השיטה אגנוסטית מבחינה דתית — היא מדברת על תקשורת, פגיעות, חיבור. הכלים זהים, ההקשר משתנה.",
  },
  {
    q: "יש החזר כספי?",
    a: "לא. אני בטוח באיכות מספיק בשביל לא להציע ערבות החזר — אבל יש לי אחריות יישומית של חצי שנה. אם נתקעת, אנחנו עוצרים, מחזירים אחורה, מתחילים מחדש. בלי תוספת.",
  },
];

export default function TheWayProgramPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "תוכניות", href: "/programs" },
            { label: product.nameHe },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/hadrech-hero.jpg"
            alt="תוכנית הדרך — מציאת זוגיות מאושרת"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              תוכנית 90 יום · מחזור פתוח להרשמה
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              90 ימים למציאת זוגיות מאושרת —{" "}
              <span className="text-accent-light">בליווי ובהתחייבות</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              לא עוד ׳טיפ׳, לא עוד סדנה של שבועיים. תהליך מובנה של 6 שלבים, עם ליווי יומיומי, שעבד עבור 461 זוגות.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#checkout"
                className="inline-flex px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                להרשמה — {formatILS(product.price.amount)}
              </a>
              <Link
                href="/coaching"
                className="inline-flex px-8 py-4 border border-white/40 text-white rounded-full font-medium text-base hover:bg-white/10 transition-colors"
              >
                לא בטוח/ה? שיחת היכרות חינם
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 stages */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              השיטה — 6 שלבים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              לא עוד ׳טיפים׳ — תהליך מובנה
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              כל שלב נבנה על קודמו. אי-אפשר לדלג. אי-אפשר לקצר. ולכן זה עובד.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {stages.map((s) => (
              <Card key={s.num} className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all">
                <CardContent className="p-7">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl font-bold text-primary/30 tabular-nums">{s.num}</span>
                    <span className="text-xs text-muted-foreground font-medium tracking-wide">{s.weeks}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-accent-dark border-accent/40">
                מה כלול בתוכנית
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                4 רכיבים שעובדים יחד
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {includes.map((item) => (
                <Card key={item.title} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <span className="text-sm font-semibold text-muted-foreground tabular-nums">
                        שווי {formatILS(item.value)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 md:p-8 text-center">
              <p className="text-sm text-muted-foreground mb-1">שווי כולל של הרכיבים</p>
              <p className="text-3xl font-bold text-primary tabular-nums">{formatILS(5940)}</p>
              <p className="text-base text-muted-foreground mt-3">
                המחיר שלך:{" "}
                <span className="text-2xl font-bold text-foreground tabular-nums">
                  {formatILS(product.price.amount)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout form */}
      <section id="checkout" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/50 shadow-xl shadow-primary/5">
              <CardContent className="p-8 md:p-10">
                <div className="text-center mb-7">
                  <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                    הרשמה — מחזור פתוח
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{product.nameHe}</h2>
                  <p className="text-muted-foreground text-pretty">{product.taglineHe}</p>
                </div>

                <CheckoutForm product={product} />

                <div className="mt-7 pt-7 border-t border-border/50 text-center">
                  <p className="text-sm text-muted-foreground mb-3">לא בטוח/ה? צור/י קשר ישיר עם אלעד</p>
                  <Link
                    href="https://wa.me/972512518025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-secondary-dark hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    שלח/י לי הודעה בוואטסאפ
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objections (FAQ) */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              שאלות שאני שומע הכי הרבה
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">לפני שאתם נרשמים</h2>
          </div>

          <div className="space-y-4">
            {objections.map((item) => (
              <Card key={item.q} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            עוד 90 יום עוברים בכל מקרה
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed text-pretty">
            השאלה היא איפה תהיה בסופם — באותו מקום, או בזוגיות.
          </p>
          <a
            href="#checkout"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            להרשמה עכשיו — {formatILS(product.price.amount)}
          </a>
        </div>
      </section>
    </>
  );
}
