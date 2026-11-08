import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SummitCheckout } from "@/components/summit/SummitCheckout";

export const metadata: Metadata = {
  title: 'הדרך + חדר כושר לדייטים — 90 ימים למציאת זוגיות',
  description:
    'תוכנית הדרך + חדר כושר לדייטים — 90 ימי תוכן, ליווי אישי יומיומי, קהילה תומכת, ו-12 מפגשי תרגול מעשי. 2,970 ₪ או עד 12 תשלומים.',
  alternates: { canonical: "/programs/hadrech-jim" },
  openGraph: {
    title: 'הדרך + חדר כושר לדייטים | אומנות הקשר',
    description: 'תוכנית 90 ימים: השיטה + ליווי + קהילה + תרגול. 2,970 ₪.',
    url: "/programs/hadrech-jim",
    locale: "he_IL",
    type: "website",
  },
};

const phases = [
  { weeks: "שבועות 1-2", title: "גישה", desc: "גישה בריאה, איתור אמונות מגבילות, בניית חזון זוגיות" },
  { weeks: "שבועות 3-5", title: "תקשורת", desc: "יצירת הזדמנויות, הבדלים בין גברים ונשים, שפת גוף" },
  { weeks: "שבועות 6-8", title: "משיכה", desc: "פלירטוט, יזימה, היכרויות אונליין ופנים-אל-פנים, ניהול דייטים" },
  { weeks: "שבועות 9-11", title: "חיבור וכימיה", desc: "העמקת קשר, תקשורת מתקדמת, שפה זוגית משותפת, אינטימיות רגשית" },
  { weeks: "שבועות 12-13", title: "מחויבות", desc: "ייצוב זוגיות, קבלת החלטות, יסודות לחיים משותפים" },
];

const included = [
  { value: "1,500 ₪", title: "השיטה", desc: "90 ימי תוכן עם סרטון יומי קצר של 5-10 דקות" },
  { value: "2,970 ₪", title: "הליווי", desc: "תמיכה אישית יומיומית ממנטור מוסמך דרך צ׳אט פרטי" },
  { value: "670 ₪", title: "הקהילה", desc: "פורום סגור, קבוצת פייסבוק וקבוצת וואטסאפ של חברי התוכנית" },
  { value: "800 ₪", title: "התרגולים", desc: "בונוסים VIP מתכנית הליווי האישי — שווי 800 ₪" },
  { value: "1,500 ₪", title: "חדר כושר לדייטים", desc: "12 מפגשים אונליין לאימון מעשי בדייטים אמיתיים" },
  { value: "5,950 ₪", title: "בונוסים", desc: "8 הצעדים, נתיב ברשת, סדנת חזון, ועוד" },
];

const faqs = [
  { q: "כמה זמן ביום אני צריך להשקיע?", a: "5-10 דקות ביום. הסרטונים קצרים, התרגילים מעשיים. כל אחד מסוגל." },
  { q: "מתאים גם לדתיים / חרדים?", a: "מתאים. אני עצמי שומר תורה ומצוות, ויש בקהילה גם דתיים, חרדים וחילונים." },
  { q: "מה ההבדל בין זה לבין הליווי האישי?", a: "כאן יש ליווי יומיומי דרך צ׳אט פרטי + קהילה. הליווי האישי הוא 1-על-1 אינטנסיבי. שני המסלולים מובילים לתוצאה." },
  { q: "ומה אם אני לא רואה תוצאות?", a: "אחריות יישומית של חצי שנה — אפשר להקפיא ולהתחיל מחדש. אבל בסוף — אם אתה לא משקיע, אף תוכנית לא תעבוד." },
];

export default function HadrechJimPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תוכניות", href: "/programs" }, { label: "הדרך + חדר כושר" }]} />
      </div>

      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/generated/blog-readiness.jpg" alt="תוכנית הדרך — 90 ימים למציאת זוגיות" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              התוכנית הדגל של אומנות הקשר
            </Badge>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              הדרך + <span className="text-accent-light">חדר כושר לדייטים</span>
            </h1>
            <p className="text-pretty text-xl md:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-8">
              תוכנית 90 ימים שלימדה כבר 461 זוגות איך למצוא ולבנות זוגיות מאושרת
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-white/90 text-sm">
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">✓ ליווי אישי יומיומי</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">✓ קהילה תומכת</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">✓ 12 מפגשי תרגול</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">✓ אחריות יישומית</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">השיטה</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">5 השלבים של הדרך</h2>
            <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">
              לא טיפים גנריים — תהליך מובנה צעד-צעד, מבוסס על 15 שנות ניסיון.
            </p>
          </div>
          <div className="space-y-4">
            {phases.map((p, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6 md:p-8 flex gap-6 items-start">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold tabular-nums">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold">{p.title}</h3>
                      <span className="text-sm text-muted-foreground">{p.weeks}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">מה כלול</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">החבילה המלאה</h2>
            <p className="text-pretty text-lg text-muted-foreground">שווי אמיתי: <span className="font-semibold tabular-nums">12,420 ₪</span></p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {included.map((item, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <div className="mb-2 text-xs font-medium text-primary tabular-nums">שווי {item.value}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">להתחיל</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">המחיר היחיד שצריך לשלם</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              שווי אמיתי <span className="line-through tabular-nums">12,420 ₪</span> — היום ב-<span className="font-bold text-foreground tabular-nums">2,970 ₪</span>
            </p>
          </div>
          <SummitCheckout slug="hadrech-jim" ctaLabel="להתחלת התוכנית" />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">שאלות נפוצות</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold">לפני שאתה מתחיל</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4">עדיין מתלבט/ת?</p>
            <Link href="/programs/vip" className="text-primary font-semibold underline-offset-4 hover:underline">
              שיחת התאמה חינמית של 30 דקות →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
