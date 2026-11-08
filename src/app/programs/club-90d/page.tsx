import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SummitCheckout } from "@/components/summit/SummitCheckout";

export const metadata: Metadata = {
  title: 'מועדון הדרך 90D — נקודת הכניסה לאומנות הקשר',
  description:
    'מועדון הדרך 90D: מפגש תמיכה שבועי, ליווי יומי בצ׳אט, קהילה תומכת ובונוסים. 30 ₪ לחודש, ללא התחייבות, ביטול בכל עת.',
  alternates: { canonical: "/programs/club-90d" },
  openGraph: {
    title: 'מועדון הדרך 90D | אומנות הקשר',
    description: 'מועדון מנויים חודשי עם תוכן שוטף, תמיכה ומפגשים. 30 ₪/חודש.',
    url: "/programs/club-90d",
    locale: "he_IL",
    type: "website",
  },
};

const benefits = [
  { title: "מפגש שבועי בזום", desc: "שעתיים של תמיכה, שאלות, ומענה אישי — כל שבוע, בלייב" },
  { title: "ליווי יומי בצ׳אט", desc: "מנטור צמוד שעונה תוך 24 שעות, 6 ימים בשבוע" },
  { title: "קהילה פעילה", desc: "פורום סגור, פייסבוק וקבוצת וואטסאפ של חברי המועדון" },
  { title: "בונוסים VIP", desc: "תרגילים, מדריכים וסדנאות שלא נמצאים בשום מקום אחר" },
  { title: "כניסה חינמית לאירועים", desc: "וובינרים, מפגשים פיזיים ואירועי 'אהבה' — חינם" },
  { title: "הנחות על סדנאות", desc: "מחירי חברי מועדון על כל מה שאומנות הקשר מציעה" },
];

const faqs = [
  { q: "מה ההבדל בין המועדון לתוכנית 'הדרך'?", a: "המועדון = תמיכה שוטפת ללא תוכנית מובנית. 'הדרך' = תוכנית 90 ימים צעד-צעד. שניהם משלימים, לא תחליפים." },
  { q: "אפשר לבטל בכל עת?", a: "כן. ביטול בכל עת, מבלי לתת סיבות. אנחנו לא רוצים לקוחות חודשי כפויים." },
  { q: "האם החיוב יומי? (מודל Daily)", a: "לא. חיוב חודשי בלבד. אנחנו לא מאמינים במודל Daily של חיוב יומי — זה לא הוגן." },
  { q: "כמה זמן להתחייב?", a: "חודש בכל פעם. אפשר לעצור אחרי חודש, אפשר להמשיך שנה. אתה בוחר." },
];

export default function Club90DPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תוכניות", href: "/programs" }, { label: "מועדון 90D" }]} />
      </div>

      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/generated/blog-listening.jpg" alt="מועדון הדרך 90D" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/68" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              נקודת הכניסה הנגישה
            </Badge>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              מועדון <span className="text-accent-light">הדרך 90D</span>
            </h1>
            <p className="text-pretty text-xl md:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-8">
              להכנס לאקוסיסטם של אומנות הקשר בלי להתחייב להרבה. 30 ₪ לחודש.
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-white/90 text-sm">
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">✓ מפגש שבועי</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">✓ קהילה</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">✓ ללא Daily</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">✓ ביטול חופשי</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">מה כלול</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">החברים מקבלים את הכל</h2>
            <p className="text-pretty text-lg text-muted-foreground">30 ₪ לחודש — פחות מארוחת צהריים אחת.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <div className="mb-3 inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">להצטרפות</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">חודש אחד. בלי התחייבות.</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              נסה/י חודש, ואם זה לא מתאים — בטל/י. בלי שאלות.
            </p>
          </div>
          <SummitCheckout slug="club-90d" ctaLabel="להצטרף למועדון" />
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">שאלות נפוצות</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold">מה שכל חבר/ה חדש/ה שואל/ת</h2>
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
            <p className="text-muted-foreground mb-4">רוצה משהו יותר אינטנסיבי?</p>
            <Link href="/programs/hadrech-jim" className="text-primary font-semibold underline-offset-4 hover:underline">
              לתוכנית הדרך + חדר כושר לדייטים →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
