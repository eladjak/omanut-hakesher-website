import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getProduct } from "@/lib/products";

const product = getProduct("club-90d")!;

export const metadata: Metadata = {
  title: `${product.nameHe} | אומנות הקשר`,
  description:
    "מועדון הדרך 90D — מסגרת קהילתית לתרגול, שיתוף ומפגשים. פרטי הפעילות ותנאי ההצטרפות יאושרו לפני הפעלה.",
  alternates: { canonical: product.path },
  openGraph: {
    title: `${product.nameHe} | אומנות הקשר`,
    description: "מסגרת קהילתית עם תוכן, תרגול ומפגשים לפי מתכונת הפעילות.",
    url: product.path,
    type: "website",
  },
};

const benefits = [
  {
    title: "מפגשי תרגול אונליין",
    desc: "מפגשים קבוצתיים לתרגול, שאלות ושיתוף, לפי לוח הפעילות המאושר.",
  },
  {
    title: "ערוץ קהילתי",
    desc: "מרחב לשיתוף וללמידה בין המשתתפים, עם כללי פרטיות והתנהלות שיימסרו מראש.",
  },
  {
    title: "קהילה פעילה",
    desc: "פורום, פייסבוק, וואטסאפ — אנשים בתהליך שלך, איתך. בלי לחפש לבד תמיכה.",
  },
  {
    title: "חומרי תרגול",
    desc: "משאבים נלווים שמותאמים לנושאים ולמתכונת הפעילות של המועדון.",
  },
  {
    title: "עדכוני פעילות",
    desc: "מידע על מפגשים ואירועים רלוונטיים; כל מחיר או הטבה יאושרו לפני הרשמה.",
  },
];

// Folded 2026-07-09 from the hoover-variant club page — the questions every
// new member actually asks.
const faqs = [
  {
    q: "מה ההבדל בין המועדון לתוכנית ׳הדרך׳?",
    a: "המועדון מיועד למסגרת קהילתית שוטפת; ׳הדרך׳ היא תוכנית לימוד ותרגול מובנית בת 12 שבועות. פרטי שני המסלולים נבדקים לפני הצטרפות.",
  },
  {
    q: "מהם תנאי הביטול?",
    a: "תנאי הביטול והחידוש יוצגו במפורש לפני כל רכישה. כרגע ההצטרפות המקוונת אינה פעילה ולכן אין חיוב או חידוש דרך העמוד.",
  },
  {
    q: "איך מתבצע החיוב?",
    a: "מודל התשלום עדיין אינו פעיל באתר. לפני הפעלה יוצגו המחיר, תדירות החיוב, מועד החידוש ואופן הביטול במסמך תנאים אחד.",
  },
  {
    q: "לכמה זמן מתחייבים?",
    a: "משך ההצטרפות ותנאי ההמשך יאושרו ויוצגו לפני רכישה. לא תתבצע הארכה אוטומטית דרך העמוד במצבו הנוכחי.",
  },
];

export default function ClubPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: product.nameHe }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/hadrech-community.jpg"
            alt="מועדון הדרך 90D"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/72" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              מסגרת קהילה ותרגול
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              מועדון{" "}
              <span className="text-accent-light">הדרך 90D</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              מרחב קבוצתי לתרגול, שיתוף ולמידה. פרטי המפגשים, הערוצים והתנאים
              מוצגים לפני הצטרפות.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#join"
                className="inline-flex px-10 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                לבדיקת זמינות
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              5 רכיבי המועדון
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">מה כלול בחברות</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
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

      {/* Pricing + Join */}
      <section id="join" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-7">
                <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                  פרטי ההצטרפות
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{product.nameHe}</h2>
                <p className="text-sm text-muted-foreground mt-3">
                  המחיר, תדירות החיוב ותנאי הביטול יאושרו לפני פתיחת הרכישה.
                </p>
              </div>

              <CheckoutForm product={product} compact />

              <p className="mt-5 text-xs text-muted-foreground text-center leading-relaxed">
                אין כרגע רכישה, חיוב או חידוש אוטומטי דרך העמוד. נעדכן את התנאים
                ואת אופן ההצטרפות לאחר השלמת בדיקות התשלום והמסירה.
              </p>

              <div className="mt-7 pt-7 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-3">שאלות לפני שמצטרפים?</p>
                <Link
                  href="https://wa.me/972512518025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-secondary-dark hover:opacity-80 transition-opacity"
                >
                  כתבו לי בוואטסאפ
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              שאלות נפוצות
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              מה שכל חבר/ה חדש/ה שואל/ת
            </h2>
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
            <p className="text-muted-foreground mb-4">רוצה משהו יותר אינטנסיבי?</p>
            <Link
              href="/programs/the-way"
              className="inline-flex items-center gap-2 text-primary font-semibold underline-offset-4 hover:underline"
            >
              <span>לתוכנית הדרך — 12 שבועות של תוכן, תרגול וליווי</span>
              <span aria-hidden style={{ transform: "scaleX(-1)" }}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
