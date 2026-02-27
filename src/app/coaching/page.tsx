import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CoachingFAQ } from "./CoachingFAQ";

export const metadata: Metadata = {
  title: "ליווי אישי למציאת זוגיות | שיחת היכרות חינם",
  description:
    "ליווי אישי עם אלעד יעקובוביץ׳ למציאת זוגיות מאושרת תוך 3 חודשים. 461 זוגות כבר מצאו אהבה. שיחת היכרות של 30+ דקות בחינם.",
  alternates: {
    canonical: "/coaching",
  },
  openGraph: {
    title: "ליווי אישי למציאת זוגיות | אומנות הקשר",
    description:
      "ליווי אישי עם אלעד יעקובוביץ׳ למציאת זוגיות מאושרת תוך 3 חודשים. 461 זוגות כבר מצאו אהבה.",
    url: "/coaching",
    type: "website",
  },
};

const BOOKING_URL = "/contact";

const painPoints = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "דייטים שלא מובילים לשום מקום",
    description:
      "כבר שנים שאתה יוצא לדייטים. באמפר, בהינג׳, בטינדר, דרך חברים. יש מפגשים, אבל הם לא מובילים לשום מקום אמיתי. נפגשים פעם-פעמיים, ואז זה מתפספס.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    title: "הכל בסדר - חוץ מהזוגיות",
    description:
      "קריירה מצוינת, חברים טובים, תחביבים, כושר - הכל מושלם על הנייר. חוץ מהדבר הזה. הזוגיות. ואתה לא מבין למה דווקא בתחום הזה אתה תקוע.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "הזמן עובר ושום דבר לא משתנה",
    description:
      "לראות את כל החברים מתחתנים ומקימים משפחות. לשמוע את השאלות ״אז מה איתך?״ בכל אירוע משפחתי. להרגיש שהחיים לא ממש מתקדמים.",
  },
];

const failedApproaches = [
  {
    approach: "אפליקציות היכרויות",
    problem: "מספקות הזדמנויות - אבל בלי כלים ליצור חיבור אמיתי, עוד 50 דייטים לא ישנו שום דבר.",
  },
  {
    approach: "שדכנים",
    problem: "נותנים שמות וטלפונים - אבל לא מלמדים איך להיות פנוי לקשר, איך לתקשר, איך ליצור כימיה.",
  },
  {
    approach: "פסיכולוגים ומטפלים",
    problem: "עוזרים להבין למה - אבל לא מלווים בשטח. לא יושבים איתך אחרי הדייט ומנתחים מה קרה.",
  },
  {
    approach: "ספרי עזרה עצמית",
    problem: "נותנים השראה לרגע - אבל בלי מישהו שילווה, מותאם אישית, עם אחריות לתוצאה.",
  },
];

const methodSteps = [
  {
    step: "01",
    title: "מבפנים החוצה",
    description:
      "הכרת עצמך האמיתית. שבירת הסיפורים המגבילים שאתה מספר לעצמך. הבנת הפחדים שחוסמים אותך מזוגיות - ומה באמת עומד מאחוריהם.",
    color: "from-secondary to-secondary-light",
  },
  {
    step: "02",
    title: "שפת החיבור",
    description:
      "תקשורת רגשית, גבולות בריאים, אינטימיות ופגיעות. המיומנויות שלא לימדו אותך בבית הספר ושבלעדיהן אי אפשר לבנות קשר אמיתי.",
    color: "from-primary to-primary-light",
  },
  {
    step: "03",
    title: "המפגש",
    description:
      "כלים מעשיים לדייטינג. יצירת כימיה אמיתית. היכרויות שמובילות ליותר מ״היה נחמד, נשמור על קשר״.",
    color: "from-accent-dark to-accent",
  },
  {
    step: "04",
    title: "בניית קשר אמיתי",
    description:
      "מחויבות כהחלטה, לא כרגש. שמירה על הקשר גם כשלא קל. בניית זוגיות שנמשכת לאורך זמן - לא רק חלון ירח דבש.",
    color: "from-primary-dark to-secondary",
  },
];

const included = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "מפגשים אישיים",
    description: "פגישות של שעה וחצי כל אחת, פנים מול פנים או בזום - מותאמות אישית רק לך.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: "תמיכה בוואטסאפ",
    description: "גישה ישירה אליי לאורך כל התהליך. שאלות, התלבטויות, עדכונים - אני כאן.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "תרגילים מותאמים אישית",
    description: "לא תרגילים גנריים. תרגילים שנבנו במיוחד בשבילך, בהתאם לחסמים הייחודיים שלך.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "עבודה על חסמים פנימיים",
    description: "זיהוי ופירוק הדפוסים שמונעים ממך להיפתח לקשר אמיתי - פחד מדחייה, פחד ממחויבות, סיפורים מגבילים.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "מיומנויות תקשורת ודייטינג",
    description: "איך ליצור כימיה, איך לנהל שיחה שמחברת, איך לעבור מדייט ראשון לקשר אמיתי.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "משוב בזמן אמת על דייטים",
    description: "חזרת מדייט? אני כאן. מנתחים ביחד מה קרה, מה עבד, מה אפשר לשפר לפעם הבאה.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "ערבות לתוצאה",
    description: "זוגיות תוך 3 חודשים - או המשך ליווי חינם עד שתמצא. זו לא הבטחה ריקה. זה ביטחון בשיטה.",
  },
];

const testimonials = [
  {
    name: "דני",
    age: 38,
    title: "מהנדס",
    quote:
      "הגעתי לאלעד אחרי 5 שנים של דייטים כושלים. הייתי בטוח שמשהו לא בסדר איתי. תוך 3 חודשים הבנתי שהבעיה הייתה לא מה שחשבתי - למדתי שאני בורח מקרבה בגלל פחד מדחייה. היום אני נשוי כבר שנתיים לאישה הכי מדהימה שפגשתי.",
    highlight: "נשוי כבר שנתיים",
  },
  {
    name: "מיכל",
    age: 34,
    title: "עורכת דין",
    quote:
      "ניסיתי הכל - אפליקציות, שדכנים, אירועים. שום דבר לא עבד. הליווי עם אלעד היה שונה לגמרי. הוא לא רק עזר לי להבין מה אני רוצה, אלא גם לימד אותי איך לתקשר את זה. פגשתי את בן זוגי אחרי חודשיים וחצי.",
    highlight: "מצאה בן זוג תוך חודשיים וחצי",
  },
  {
    name: "אורי",
    age: 42,
    title: "יזם",
    quote:
      "הייתי סקפטי בהתחלה. חשבתי שאני יודע הכל על דייטינג. אלעד הראה לי כמה דברים בסיסיים שפספסתי לגמרי. הייתה לי חברה תוך 6 שבועות. היום אנחנו גרים ביחד.",
    highlight: "מצא חברה תוך 6 שבועות",
  },
];

const credentials = [
  "NLP מוסמך",
  "CBT",
  "קואצ׳ יהודי",
  "דמיון מודרך",
  "~20 שנות במה",
];

export default function CoachingPage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92dvh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-bl from-secondary-light/15 via-background to-primary-light/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/8 to-transparent rounded-tr-full pointer-events-none" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/10">
                ליווי אישי פרימיום - אומנות הקשר
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                ליווי אישי
                <br />
                <span className="text-primary">למציאת זוגיות</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary font-medium mt-3">
                זוגיות תוך 3 חודשים - או המשך ליווי חינם.
              </p>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                תהליך מותאם אישית שכבר עזר ל-
                <strong className="text-primary">461 זוגות</strong> למצוא אהבה אמיתית.
                לא טיפים מפוזרים - ליווי צמוד, עם אחריות לתוצאה.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={BOOKING_URL}
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  לשיחת היכרות חינם
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 border-2 border-secondary text-secondary rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-colors"
                >
                  איך זה עובד?
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap gap-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">461</div>
                  <div className="text-sm text-muted-foreground mt-1">זוגות שנוצרו</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground mt-1">חודשים ממוצע</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground mt-1">שנות ניסיון</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">30+</div>
                  <div className="text-sm text-muted-foreground mt-1">דקות שיחה חינם</div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/generated/coaching-program.jpg"
                  alt="ליווי אישי למציאת זוגיות עם אלעד יעקובוביץ׳"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAIN POINTS ===== */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מכיר את <span className="text-primary">התחושה</span> הזאת?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              הדבר הכי קשה הוא לא הבדידות - זה לא להבין למה זה לא קורה לך.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-5">
                    {point.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM EXPLAINED ===== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 text-secondary border-secondary/30">
              למה מה שניסית עד עכשיו לא עבד
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              הבעיה היא לא <span className="text-primary">בך</span>.
              <br />
              הבעיה היא <span className="text-primary">בגישה</span>.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              אם תמשיך לעשות מה שעשית - תמשיך לקבל מה שקיבלת.
              רוב הפתרונות שניסית מתייחסים לסימפטום, לא לשורש.
            </p>

            <div className="space-y-4">
              {failedApproaches.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-xl bg-muted/50 border border-border/50"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.approach}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.problem}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-lg text-foreground leading-relaxed">
                <strong className="text-primary">הליווי של אומנות הקשר שונה</strong> - כי הוא מחבר בין
                עבודה פנימית, מיומנויות מעשיות, ליווי צמוד בשטח, ואחריות אישית לתוצאה.
                לא רק מבינים - <strong>עושים</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE SOLUTION - "פנוי לקשר" ===== */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10">
              הקונספט המרכזי
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              ״פנוי לקשר״ - זה לא מצב.
              <br />
              זו <span className="text-accent">מיומנות</span>.
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              יש הבדל בין <strong>לרצות</strong> זוגיות לבין <strong>להיות פנוי</strong> לזוגיות.
              רוב האנשים שאומרים ״אני מחפש זוגיות״ בעצם לא באמת פנויים -
              לא בגלל שהם משקרים, אלא בגלל שמשהו חוסם אותם.
            </p>
            <p className="text-lg opacity-80 leading-relaxed mb-4">
              אולי זה פחד מדחייה. אולי זה דפוס של בריחה מקרבה.
              אולי זה סיפור מגביל שנבנה בילדות.
            </p>
            <p className="text-lg opacity-90 leading-relaxed font-medium">
              הליווי שלי מזהה את החסם הייחודי שלך ומפתח את הכלים
              לעבור ממצב של ״לא פנוי״ ל״פנוי לקשר״.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS - 4 STEPS ===== */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              הגישה שלי
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ארבעת <span className="text-primary">השלבים</span> בדרך לזוגיות
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              לא טיפים מפוזרים - דרך שלמה ומובנית. מסע שמתחיל מבפנים ויוצא החוצה.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodSteps.map((item, index) => (
              <Card key={index} className="relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-200 group">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-l ${item.color}`} />
                <CardContent className="p-6 pt-8">
                  <div className="text-5xl font-bold text-muted/30 mb-4 group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={BOOKING_URL}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              רוצה להתחיל? שיחת היכרות חינם
              <span>&larr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED ===== */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מה כולל הליווי
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              הכל כלול. <span className="text-primary">בלי הפתעות.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ליווי אישי פרימיום - לא סתם שיחות. תהליך שלם עם כל מה שצריך כדי להגיע לזוגיות.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {included.map((item, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="inline-flex p-2.5 rounded-lg bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Guarantee callout */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">ערבות לתוצאה</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">זוגיות תוך 3 חודשים - או המשך ליווי חינם</strong> עד שתמצא.
                זו לא הבטחה שיווקית. זה ביטחון של מי שעשה את זה 461 פעמים.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO IS ELAD ===== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl overflow-hidden">
                <Image
                  src="/assets/elad-photos/profile-current.jpg"
                  alt="אלעד יעקובוביץ׳ - מייסד אומנות הקשר"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full -z-10" />
            </div>

            {/* Bio */}
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                מי אני
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                אלעד יעקובוביץ׳ - <span className="text-primary">המסע שלי</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  גם אני הייתי שם. ילד עם ביטחון עצמי נמוך. מתבייש לדבר עם בנות.
                  בטוח שזוגיות זה לא בשבילי. ואז משהו השתנה.
                </p>
                <p>
                  הבנתי שהבעיה היא לא בי - הבעיה היא שלא לימדו אותי איך.
                  איך להיות פנוי לקשר. איך לזהות הזדמנויות אמיתיות. איך לבנות
                  קשר בריא ומאושר. כשלמדתי את זה - הכל השתנה.
                </p>
                <p className="text-foreground font-medium">
                  היום אני נשוי באושר, ועוזר לאחרים לעשות את אותו המסע.
                  עם רקע של <strong className="text-primary">~20 שנה בתחום הבמה</strong> כשחקן,
                  מוזיקאי ובובנאי - אני מביא לליווי דרך ייחודית שמחברת בין אמנות ליחסים.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 flex flex-wrap gap-3">
                {credentials.map((cred, index) => (
                  <Badge key={index} variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                    {cred}
                  </Badge>
                ))}
              </div>

              {/* Key stat */}
              <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 inline-block">
                <p className="text-foreground">
                  <strong className="text-primary text-2xl">461</strong>
                  <span className="mr-2 text-muted-foreground"> זוגות שמצאו אהבה דרך התהליך</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              הם כבר עשו את זה
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              סיפורי <span className="text-primary">הצלחה</span> אמיתיים
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              לא שמות בדויים ולא סיפורים מומצאים. אנשים אמיתיים שעברו את התהליך.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-8">
                  {/* Quote mark */}
                  <svg className="w-8 h-8 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                  </svg>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    ״{testimonial.quote}״
                  </p>
                  <div className="border-t border-border/50 pt-4">
                    <p className="font-semibold text-foreground">
                      {testimonial.name}, {testimonial.age}
                    </p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20 text-xs">
                      {testimonial.highlight}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEO TESTIMONIALS ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              בווידאו
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              שמע <span className="text-primary">מהם</span> ישירות
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              אנשים אמיתיים מספרים על החוויה שלהם בתהליך.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Kbd7BRJ25TM"
                title="סיפור הצלחה - ליווי אישי אומנות הקשר"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/chvsmJzcihE"
                title="סיפור הצלחה - ליווי אישי אומנות הקשר"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              שאלות נפוצות
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              שאלות <span className="text-primary">ותשובות</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              כל מה שרצית לדעת לפני שיחת ההיכרות.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <CoachingFAQ />
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">עדיין יש שאלות? שיחת ההיכרות בדיוק בשביל זה.</p>
            <Link
              href={BOOKING_URL}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              קבע שיחת היכרות חינם
              <span>&larr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            הזוגיות שמגיעה לך לא תדפוק בדלת.
            <br />
            <span className="text-accent-light">אבל אם תצא לדרך - היא מחכה לך.</span>
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-4 leading-relaxed">
            שיחת היכרות של 30+ דקות, בחינם, בלי התחייבות.
          </p>
          <p className="text-lg opacity-80 max-w-xl mx-auto mb-10 leading-relaxed">
            אין פה מכירה בלחץ. אין טריקים. רק שיחה כנה, שבה נבין ביחד
            אם ואיך אני יכול לעזור לך.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={BOOKING_URL}
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              לשיחת היכרות חינם
            </Link>
            <a
              href="tel:+972512518025"
              className="inline-flex px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              או התקשר: 051-2518025
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
