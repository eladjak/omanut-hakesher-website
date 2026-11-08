import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: 'ליווי VIP פרטי לאהבה — שיחת התאמה חינמית',
  description:
    'ליווי אישי יומיומי של 6-12 חודשים עם התחייבות לתוצאה. מוגבל ל-10 לקוחות בכל מחזור. שיחת היכרות והתאמה של 30 דקות בחינם.',
  alternates: { canonical: "/programs/vip" },
  openGraph: {
    title: 'ליווי VIP פרטי לאהבה | אומנות הקשר',
    description: 'ליווי אישי 1-על-1 עם התחייבות לתוצאה. שיחה חינמית של 30 דקות.',
    url: "/programs/vip",
    locale: "he_IL",
    type: "website",
  },
};

const features = [
  { title: "ליווי אישי 1-על-1", desc: "צ׳אט פרטי איתי באופן אישי — לא צוות, לא אסיסטנט. אני" },
  { title: "מענה תוך 24 שעות", desc: "ימים א׳-ה׳, 09:00-18:00. שאלה — תשובה. בלי המתנות מיותרות" },
  { title: "6-12 חודשים", desc: "ליווי עד החופה ומעבר. ההתחייבות שלי איתך עד התוצאה" },
  { title: "אחריות מלאה", desc: "אם לא הגעת לזוגיות מאושרת תוך 12 חודשים — נמשיך עד שכן" },
  { title: "מותאם לחיים שלך", desc: "כל לקוח מקבל תוכנית אישית. לא תבנית, לא קופי-פייסט" },
  { title: "מוגבל ל-10 לקוחות", desc: "בכל מחזור — לא יותר. כדי שתקבל/י את הקשב הראוי" },
];

const idealFor = [
  "אתה/את מעל גיל 30, מתוסכל/ת מ-5+ שנים של דייטים ללא תוצאות",
  "ניסית כבר טיפול, מאמנים, שדכנים — והרגשת שזה לא חורק עומק",
  "יש לך קריירה מסודרת ויכולת השקעה — ואת/ה רוצה ליווי אינטנסיבי",
  "את/ה מוכן/ה לפעול — לא לקרוא עוד ספר, אלא לעשות",
];

export default function VipPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תוכניות", href: "/programs" }, { label: "ליווי VIP" }]} />
      </div>

      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/brand/ohlove-photo-1.jpg" alt="ליווי VIP פרטי לאהבה" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/72" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              לליווי אינטנסיבי בלבד · מוגבל ל-10 לקוחות
            </Badge>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              ליווי <span className="text-accent-light">VIP פרטי</span> לאהבה
            </h1>
            <p className="text-pretty text-xl md:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-8">
              ליווי אישי יומיומי איתי. עד החופה — עם התחייבות לתוצאה.
            </p>
            <Link
              href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%AA%D7%A2%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%9C%D7%99%D7%95%D7%95%D7%99%20VIP%20-%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%9B%D7%A8%D7%95%D7%AA%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-muted transition-colors shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              לשיחת התאמה חינמית
            </Link>
            <p className="mt-4 text-white/75 text-sm">30 דקות בזום או טלפון. ללא התחייבות.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">מה כלול</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold">מה שאתה מקבל</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">למי זה מתאים</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold">VIP זה לא בשבילי לכל אחד/ת</h2>
            <p className="text-pretty text-lg text-muted-foreground mt-4">
              זה מסלול אינטנסיבי, יקר, ולא מתאים לכולם. אני אומר את זה כדי שלא תחושו רוב מצומצם.
            </p>
          </div>
          <Card className="border-border/50">
            <CardContent className="p-8">
              <ul className="space-y-4">
                {idealFor.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="shrink-0 mt-1 inline-flex w-6 h-6 rounded-full bg-primary/10 text-primary items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">השלב הבא: שיחת התאמה</h2>
          <p className="text-pretty text-xl opacity-90 mb-8 leading-relaxed">
            30 דקות. אני אבחן את המצב שלך, נדבר על המטרות, ואחליט אם אני הבן-אדם הנכון בשבילך.
            <br />
            המחיר מפורסם רק בשיחה — והוא לא 'הפתעה'.
          </p>
          <Link
            href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%AA%D7%A2%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%9C%D7%99%D7%95%D7%95%D7%99%20VIP%20-%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%9B%D7%A8%D7%95%D7%AA%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-muted transition-colors shadow-xl"
          >
            לשיחת התאמה בוואטסאפ
          </Link>
          <p className="mt-4 text-white/80 text-sm">חינמי. בלי התחייבות. תוך 24 שעות אחזור אליך.</p>
        </div>
      </section>
    </>
  );
}
