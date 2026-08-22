import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
    desc: "תרגול קבוצתי, שאלות ושיתוף סביב מצבים מהדרך — כשהפעילות פתוחה ובהתאם למתכונת שתפורסם.",
  },
  {
    title: "ערוץ קהילתי",
    desc: "מרחב ללמידה בין משתתפים, בכפוף לכללי פרטיות, הסכמה והתנהלות שיוצגו לפני הצטרפות.",
  },
  {
    title: "למידת עמיתים",
    desc: "אפשרות לשמוע נקודות מבט נוספות וללמוד מניסיון של אחרים, בלי להפוך עצה ללחץ או לכלל מחייב.",
  },
  {
    title: "חומרי תרגול",
    desc: "משאבים נלווים שמותאמים לנושאים ולמתכונת הפעילות של המועדון.",
  },
  {
    title: "עדכוני פעילות",
    desc: "לוח פעילות מסודר אמור להבהיר מראש מה מתקיים, באיזה ערוץ ואילו הכנות נדרשות.",
  },
];

const fitSignals = [
  "נוח לך ללמוד בקבוצה ולשמוע גם נקודות מבט של אחרים",
  "יש לך בסיס של ידע, והצורך המרכזי כרגע הוא תרגול ועקביות",
  "מתאים לך לשמור על פרטיות המשתתפים ולכבד זכות לדלג או לא לשתף",
];

const questionsBeforeJoining = [
  "מהו לוח המפגשים ומה קורה אם מחמיצים מפגש?",
  "אילו ערוצים פעילים, מי מנחה ומהם זמני המענה?",
  "מה כללי הפרטיות, השיתוף והצילום במפגשים?",
  "מה המחיר, משך החברות, החידוש ואופן הביטול?",
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
                href="#decide"
                className="inline-flex min-h-11 items-center px-10 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                לבדוק אם המסגרת מתאימה
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
              הכיוון של המועדון
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">מה המסגרת נועדה לאפשר</h2>
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

      {/* Decision support + availability */}
      <section id="decide" className="py-20 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">לפני שמצטרפים</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">בדיקת התאמה בשתי דקות</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              המועדון עדיין אינו פתוח לרכישה באתר. אפשר להשתמש ברשימות הבאות כדי להבין אם שווה לברר עליו כשייפתח.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-secondary/30 bg-secondary/5">
              <CardContent className="p-7">
                <h3 className="text-xl font-bold mb-5">המסגרת עשויה להתאים אם</h3>
                <ul className="space-y-3">
                  {fitSignals.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed"><span className="text-secondary-dark" aria-hidden>✓</span><span>{item}</span></li>)}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-7">
                <h3 className="text-xl font-bold mb-5">ארבע שאלות שחייבות לקבל תשובה</h3>
                <ol className="space-y-3">
                  {questionsBeforeJoining.map((item, index) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed"><span className="font-bold text-primary tabular-nums">{index + 1}.</span><span>{item}</span></li>)}
                </ol>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6 border-primary/20 bg-background shadow-lg shadow-primary/5">
            <CardContent className="p-7 md:p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">רוצה לדעת אם נפתחה פעילות?</h3>
              <p className="text-muted-foreground mb-6 text-pretty">אפשר לשלוח הודעה קצרה. בירור זמינות אינו הרשמה ואינו יוצר חיוב.</p>
              <Link
                href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%94%D7%90%D7%9D%20%D7%99%D7%A9%20%D7%9B%D7%A8%D7%92%D7%A2%20%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%AA%20%D7%9E%D7%90%D7%95%D7%A9%D7%A8%D7%AA%20%D7%9C%D7%9E%D7%95%D7%A2%D7%93%D7%95%D7%9F%20%D7%94%D7%93%D7%A8%D7%9A%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center px-7 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                לבירור זמינות בוואטסאפ
              </Link>
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
              מה כדאי לברר לפני החלטה
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
            <p className="text-muted-foreground mb-4">מחפש/ת מסלול לימוד מובנה במקום מסגרת קהילה שוטפת?</p>
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
