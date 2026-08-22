import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "ליווי אישי VIP | אומנות הקשר",
  description:
    "ליווי אישי VIP עם תוכנית עבודה מותאמת, פגישות, ערוץ פרטי ומשוב לפי מסגרת הליווי.",
  alternates: { canonical: "/coaching/vip" },
  openGraph: {
    title: "ליווי אישי VIP | אומנות הקשר",
    description: "ליווי אישי מותאם עם תוכנית עבודה, פגישות ומשוב.",
    url: "/coaching/vip",
    type: "website",
  },
};

const whatVipMeans = [
  {
    title: "ערוץ פרטי איתי",
    desc: "שאלות, מצבים והתלבטויות מקבלים מקום בערוץ פרטי, בהתאם לזמני המענה ולגבולות הליווי שייקבעו מראש.",
  },
  {
    title: "מסגרת עבודה מוגדרת",
    desc: "מגדירים יחד מטרות לתהליך, אבני דרך וצעדים לביצוע. בודקים את ההתקדמות ומעדכנים את התוכנית לפי הצורך.",
  },
  {
    title: "מעקב יישומי",
    desc: "אם נתקעת, בודקים מה לא עובד, חוזרים לצעד הרלוונטי ומעדכנים את תוכנית העבודה במסגרת שסוכמה.",
  },
  {
    title: "ייעוץ אסטרטגי",
    desc: "מעבר לליווי הטכני — חשיבה אסטרטגית על החיים שלך, הקריירה, האנרגיה, איך הזוגיות משתלבת בכל זה.",
  },
];

const whoFits = [
  "יש צורך בהתאמה אישית ובמשוב תכוף יותר ממסלול לימוד עצמאי",
  "אפשר להקדיש זמן קבוע לפגישות, לתרגול ולבדיקה בין המפגשים",
  "נוח לקבל משוב ישיר, לשאול שאלות ולעדכן את התוכנית כשמשהו לא עובד",
  "אפשר לבחון הצעה מלאה — כולל עלות, גבולות וזמני מענה — בלי לחץ להחליט במקום",
];

const whoDoesntFit = [
  "הצורך כרגע הוא בכלי נקודתי שאפשר לפתור במשאב או בפגישה בודדת",
  "אין כרגע זמן או מרחב רגשי לתרגול עקבי בין פגישות",
  "ההשקעה עלולה ליצור לחץ כלכלי; במקרה כזה עדיף לבחון משאבים או מסלול קבוצתי",
  "נדרש טיפול נפשי, רפואי או מענה חירום — הליווי אינו תחליף לאלה",
];

const proposalChecklist = [
  "מטרת התהליך ומה ייחשב להתקדמות שאפשר לבדוק",
  "משך המסגרת, תדירות הפגישות ודרך שינוי או סיום",
  "ערוץ הקשר, זמני המענה ומה לא כלול בזמינות",
  "מחיר מלא, מועדי תשלום ותנאי ביטול — לפני התחייבות",
];

export default function VipCoachingPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "ליווי", href: "/coaching" }, { label: "VIP" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/coaching-program.jpg"
            alt="איור מסלול עבודה עם נקודות בחירה ותרגול"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/72" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              ליווי מותאם אישית
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              ליווי אישי <span className="text-accent-light">VIP</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              מסגרת אישית עם תוכנית עבודה, פגישות ומשוב בין המפגשים. ההיקף והגבולות נקבעים רק בהצעה כתובה אחרי שיחת היכרות.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/coaching/book"
                className="inline-flex min-h-11 items-center px-10 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                לתיאום בדיקת התאמה
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What VIP means */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מה זה אומר VIP בפועל
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">מה אמור להיות מוגדר בתהליך</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {whatVipMeans.map((item) => (
              <Card key={item.title} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fit check */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">בדיקת התאמה</h2>
            <p className="text-lg text-muted-foreground">
              המטרה היא לבחור את רמת התמיכה שמתאימה לצורך ולמשאבים — לא את המסלול היקר ביותר.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-secondary/30 bg-secondary/5">
              <CardContent className="p-7">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-lg font-bold">מסגרת אינטנסיבית עשויה להתאים אם</h3>
                </div>
                <ul className="space-y-3">
                  {whoFits.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed text-pretty">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-7">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m0 3.75h.008v.008H12V16.5z" />
                  </svg>
                  <h3 className="text-lg font-bold">עדיף לבחור כרגע חלופה אחרת אם</h3>
                </div>
                <ul className="space-y-3">
                  {whoDoesntFit.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed text-pretty">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proposal checklist */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/40">
              לפני התחייבות
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">ארבעה דברים שצריכים להופיע בהצעה</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              אין מחיר או מסלול מאושר בעמוד הזה. אם תהיה התאמה, בקשו לראות את כל התנאים יחד לפני החלטה.
            </p>
          </div>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-7 md:p-8">
              <ol className="space-y-4">
                {proposalChecklist.map((item, index) => (
                  <li key={item} className="flex items-start gap-4 leading-relaxed">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold tabular-nums">{index + 1}</span>
                    <span className="pt-1">{item}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <div className="mt-6 text-center">
            <Link href="/coaching" className="font-semibold text-primary underline underline-offset-4">להשוואה לליווי האישי הרגיל</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            הצעד הבא — שיחת היכרות
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed text-pretty">
            נברר את הצורך, צורת העבודה וההתאמה ההדדית לפני הצעה או התחייבות.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/coaching/book"
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              לתיאום שיחת היכרות
            </Link>
            <Link
              href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%AA%D7%A2%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%9C%D7%99%D7%95%D7%95%D7%99%20VIP%20-%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%9B%D7%A8%D7%95%D7%AA%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-4 border-2 border-white/50 text-white rounded-full font-medium text-base hover:bg-white/10 transition-colors"
            >
              או ישירות בוואטסאפ
            </Link>
          </div>
          <p className="mt-4 text-white/80 text-sm">זמני המענה וערוצי הקשר מוגדרים מראש כחלק מההצעה.</p>
        </div>
      </section>
    </>
  );
}
