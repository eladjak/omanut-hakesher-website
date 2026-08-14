import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "אירוע אהבה | אומנות הקשר",
  description:
    "מתכונת מתוכננת לאירוע הדרכה קבוצתי של אומנות הקשר. המועד, המחיר ופרטי ההרשמה יפורסמו לאחר אישור.",
  alternates: { canonical: "/events/love-event" },
};

const plannedFormat = [
  {
    title: "הדרכה ממוקדת",
    desc: "נושא מוגדר מעולם התקשורת, ההיכרות והקשר, כפי שיפורט בהזמנה לאירוע.",
  },
  {
    title: "תרגול מונחה",
    desc: "אפשרות לתרגול בקבוצה או בחדרים קטנים, עם זכות מלאה לבחור אם להשתתף.",
  },
  {
    title: "שאלות ותשובות",
    desc: "זמן לשאלות כלליות. אין צורך לחשוף מידע אישי או להשתתף מעבר למה שנוח.",
  },
  {
    title: "המשך אפשרי",
    desc: "בסיום יוצגו משאבים או מסלולים רלוונטיים, בלי התחייבות ובלי הבטחת תוצאה.",
  },
];

const factsBeforeRegistration = [
  "תאריך, שעה, משך וקישור למפגש",
  "מחיר מלא ותנאי ביטול, אם האירוע בתשלום",
  "מדיניות הקלטה, פרטיות ושימוש בפרטי ההרשמה",
  "התאמות נגישות ודרך לבקש חלופה להשתתפות",
];

export default function LoveEventPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "אירוע אהבה" }]} />
      </div>

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/community.jpg"
            alt="מפגש קבוצתי להדרכה ותרגול"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/72" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              המועד הבא טרם פורסם
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              אירוע <span className="text-accent-light">אהבה</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              מתכונת קבוצתית מתוכננת להדרכה, תרגול ושאלות. ההרשמה תיפתח רק
              לאחר אישור המועד, התנאים ודרך המסירה.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מתכונת מתוכננת
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              מה עשוי להיכלל במפגש
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plannedFormat.map((item) => (
              <Card key={item.title} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-10">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                לפני שנרשמים
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-balance">
                כל הפרטים יוצגו יחד ובמפורש
              </h2>
              <ul className="space-y-3 mb-8">
                {factsBeforeRegistration.map((fact) => (
                  <li key={fact} className="flex gap-3 items-start">
                    <span className="text-primary mt-0.5" aria-hidden>✓</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 mb-7" role="status">
                <p className="font-bold mb-1">ההרשמה אינה פתוחה כרגע</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  אין טופס פעיל, לא נאספים פרטים ולא נשלח אישור אוטומטי עד
                  שהאירוע הבא יאושר.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                לבירור מועד עתידי
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
