import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CoachingFAQ } from "./CoachingFAQ";
import {
  getPublishedTestimonials,
  getPublishedVideos,
} from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "ליווי אישי לדייטינג ולקשר | שיחת היכרות",
  description:
    "ליווי אישי עם אלעד יעקובוביץ׳: מיפוי דפוסים, תוכנית עבודה מותאמת, פגישות ומשוב בין המפגשים. אפשר לתאם שיחת היכרות לבדיקת התאמה.",
  alternates: {
    canonical: "/coaching",
  },
  openGraph: {
    title: "ליווי אישי לדייטינג ולקשר | אומנות הקשר",
    description:
      "ליווי אישי עם אלעד יעקובוביץ׳: תוכנית עבודה מותאמת, פגישות ומשוב מעשי לאורך הדרך.",
    url: "/coaching",
    type: "website",
  },
};

const BOOKING_URL = "/coaching/book";

const painPoints = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "אותו תסריט חוזר בדייטים",
    description:
      "יש היכרויות, אבל שוב ושוב מגיעים לנקודה דומה: השיחה נעצרת, הבחירה לא ברורה או שקשה להבין מה כדאי לעשות אחרת.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    title: "תחום אחד מרגיש פחות ברור",
    description:
      "בחלקים אחרים בחיים יש דרך עבודה מוכרת, אבל בהיכרות ובקשר קשה יותר להגדיר מטרה, לתרגל וללמוד מהניסיון.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "הלחץ מבחוץ מתערבב עם הרצון שלך",
    description:
      "שאלות מהסביבה, השוואות ולוחות זמנים של אחרים מקשים לשמוע מה באמת חשוב לך ומהו קצב שמתאים לחיים שלך.",
  },
];

const failedApproaches = [
  {
    approach: "אפליקציות היכרויות",
    problem: "מספקות הזדמנויות, אבל לא תמיד כוללות כלים לתקשורת, לבחירה ולהיכרות מעמיקה. ריבוי דייטים לבדו לא בהכרח משנה דפוסים.",
  },
  {
    approach: "אתרי היכרויות",
    problem: "עשויים להציע התאמות ופרטי קשר, אך בדרך כלל אינם מסגרת לתרגול תקשורת, בירור צרכים ועיבוד חוויות מדייטים.",
  },
  {
    approach: "פסיכולוגים ומטפלים",
    problem: "טיפול עשוי לסייע בהבנה ובעבודה רגשית. לא כל מסגרת טיפולית כוללת תרגול ממוקד בדייטינג או משוב סמוך לאירוע.",
  },
  {
    approach: "ספרי עזרה עצמית",
    problem: "יכולים להציע רעיונות שימושיים, אך בלי התאמה אישית ומשוב שוטף עלול להיות קשה לתרגם אותם לתרגול עקבי.",
  },
];

const methodSteps = [
  {
    step: "01",
    title: "מיפוי",
    description:
      "מנסחים את המצב, מזהים מה חוזר ומפרידים בין מה שבשליטתך, מה שאינו בשליטתך ומה שעדיין לא ברור.",
    color: "from-secondary to-secondary-light",
  },
  {
    step: "02",
    title: "בחירת מוקד",
    description:
      "בוחרים נושא אחד לעבודה — למשל גבולות, תקשורת, קצב, בחירה או נוכחות — ומגדירים סימן להתקדמות שאפשר לבדוק.",
    color: "from-primary to-primary-light",
  },
  {
    step: "03",
    title: "תרגול",
    description:
      "מתכננים פעולה קטנה למצב אמיתי, מתכוננים אליה בלי לכתוב תסריט קשיח ומנסים בקצב שמתאים לך.",
    color: "from-accent-dark to-accent",
  },
  {
    step: "04",
    title: "בדיקה והתאמה",
    description:
      "חוזרים למה שקרה, לומדים גם מניסיון שלא התפתח כמצופה ומעדכנים את הצעד הבא במקום להמשיך על אוטומט.",
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
    description: "פגישות 1:1 למיפוי, תרגול ובדיקה. משך, תדירות וערוץ נקבעים מראש בהצעה.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: "ערוץ קשר מוסכם",
    description: "שאלות ועדכונים בין מפגשים במסגרת ערוץ, זמני מענה וגבולות שמוגדרים מראש.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "תרגילים מותאמים למוקד",
    description: "בוחרים תרגיל לפי המצב והמטרה, ומצמצמים אותו אם הוא גדול מדי לביצוע בשגרה.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "התבוננות בדפוסים",
    description: "בודקים מחשבות, רגשות והרגלים שחוזרים — בלי להניח מראש שכל קושי הוא חסם פנימי או אשמה אישית.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "מיומנויות תקשורת ובחירה",
    description: "מתרגלים הקשבה, שיתוף, גבולות, בירור הדדיות וקבלת החלטות לאורך היכרות.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "עיבוד של מצבים מהשטח",
    description: "חוזרים לאירוע רלוונטי, מפרידים עובדה מפרשנות ובוחרים מה לשמר או לשנות במסגרת זמני המענה שסוכמו.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "בדיקה והתאמה לאורך הדרך",
    description: "מגדירים יעדים לתהליך, בודקים התקדמות ומשנים את תוכנית העבודה כשמשהו לא משרת אותך.",
  },
];

const testimonials = getPublishedTestimonials("coaching")
  .filter((t) => t.category === "text" && t.featured)
  .slice(0, 3);
const testimonialVideos = getPublishedVideos("coaching").slice(0, 2);

const decisionOptions = [
  { title: "כלי נקודתי", desc: "אם צריך שאלה, תרגיל או כיוון קטן — כדאי להתחיל במשאבים החינמיים.", href: "/resources", label: "למשאבים" },
  { title: "מסלול מובנה", desc: "אם מתאים ללמוד ולתרגל לפי רצף של 12 שבועות — אפשר להכיר את תוכנית הדרך.", href: "/programs/the-way", label: "לתוכנית הדרך" },
  { title: "התאמה אישית", desc: "אם אותו קושי חוזר ונדרש משוב 1:1 — אפשר לבדוק התאמה לליווי.", href: BOOKING_URL, label: "לשיחת היכרות" },
];

const coachingProofQuestions = [
  {
    title: "מה נעשה בפועל?",
    text: "בקשו דוגמה לרצף עבודה: מיפוי, תרגול, משוב ובדיקה מחדש — ולא רק תיאור של תוצאה רצויה.",
  },
  {
    title: "איך מודדים התקדמות?",
    text: "בחרו שניים או שלושה סימנים התנהגותיים שאפשר לבדוק לאורך הדרך, בלי ציון אישיות ובלי הבטחת זוגיות.",
  },
  {
    title: "מה הגבולות?",
    text: "בררו זמני מענה, פרטיות, מה נשמר, מה לא נדרש לשתף, ומתי נכון לפנות לטיפול או לשירות מקצועי אחר.",
  },
  {
    title: "איך יוצאים או משנים כיוון?",
    text: "תהליך טוב צריך לאפשר עצירה, התאמה או מעבר לחלופה בלי לחץ, אשמה או צורך להצדיק את הבחירה.",
  },
];

export default function CoachingPage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92dvh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/coaching-hero.jpg"
            alt="ליווי אישי למציאת זוגיות"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/65" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 bg-white/10 text-white border-white/20 hover:bg-white/10">
                ליווי אישי · בדיקת התאמה לפני התחייבות
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                ליווי אישי
                <br />
                <span className="text-accent-light">לתרגול קשר ובחירה</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium mt-3">
                ליווי אישי עם תוכנית עבודה שמתעדכנת יחד איתך.
              </p>
              <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                מתחילים במיפוי של המקום הנוכחי, מגדירים מטרה ובונים צעדים
                <strong className="text-white"> שאפשר לתרגל ולבדוק</strong> לאורך הדרך.
                המטרה אינה להבטיח מתי ייווצר קשר, אלא להרחיב בהירות, מיומנות ויכולת בחירה.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={BOOKING_URL}
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  לתיאום שיחת היכרות
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
                  <div className="text-2xl md:text-3xl font-bold text-accent-light">מיפוי</div>
                  <div className="text-sm text-white/70 mt-1">מה חוזר ומה חשוב</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-light">תרגול</div>
                  <div className="text-sm text-white/70 mt-1">צעד קטן בשטח</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-light">משוב</div>
                  <div className="text-sm text-white/70 mt-1">למידה מהניסיון</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-light">התאמה</div>
                  <div className="text-sm text-white/70 mt-1">עדכון הצעד הבא</div>
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

      {/* ===== CHOOSE THE RIGHT LEVEL ===== */}
      <section className="py-16 border-b border-border/40" aria-labelledby="choose-support-level">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">לא חייבים להתחיל בליווי</Badge>
            <h2 id="choose-support-level" className="text-3xl md:text-4xl font-bold mb-4 text-balance">לבחור את רמת התמיכה שמתאימה עכשיו</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">אותו צורך יכול לקבל מענה שונה. כדאי להתחיל באפשרות הקלה והמספקת ביותר — ולהעמיק רק כשיש סיבה.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {decisionOptions.map((option) => (
              <Card key={option.title} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 text-pretty">{option.desc}</p>
                  <Link href={option.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">{option.label}</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PAIN POINTS ===== */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              אולי אחד המצבים האלה <span className="text-primary">מוכר</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              לא צריך להזדהות עם הכול. מספיק מצב אחד שחוזר ושווה להתבונן בו.
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
              מה כל אפשרות נותנת — ומה לפעמים חסר
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              לא צריך לפסול את מה שכבר ניסית
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              אפליקציה, טיפול, ספר או קורס יכולים להיות שימושיים למטרות שונות. השאלה היא איזה רכיב חסר כרגע: הזדמנויות, הבנה, תרגול, משוב או התאמה אישית.
            </p>

            <div className="space-y-4">
              {failedApproaches.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-xl bg-muted/50 border border-border/50"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
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
                <strong className="text-primary">ליווי אישי מוסיף שכבת התאמה ומשוב.</strong>{" "}
                הוא יכול להשלים טיפול, ספר או אפליקציה כשנדרש לתרגם תובנה לצעד ולחזור לבדוק מה קרה. הוא אינו תחליף לטיפול נפשי או רפואי כשאלה נדרשים.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE SOLUTION - "פנוי לקשר" ===== */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10">
              הקונספט המרכזי
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              ״פנוי לקשר״ — שאלה שאפשר לפרק למיומנויות
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              אפשר לרצות קשר ובאותו זמן לחוות חשש, בלבול או קושי סביב גבולות, בחירה וקרבה. זה אנושי, ולא אבחון של “חוסר פניות”.
            </p>
            <p className="text-lg opacity-80 leading-relaxed mb-4">
              במקום לחפש הסבר אחד, בודקים יחד מה קורה במצבים ממשיים ומה ניתן לתרגל בבטחה.
            </p>
            <p className="text-lg opacity-90 leading-relaxed font-medium">
              הליווי מתמקד בתקשורת, בבחירה, בגבולות ובנוכחות — לצד הכרה בכך שהדדיות ותוצאה אינן בשליטה של אדם אחד.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TRANSFORMATION IMAGE ===== */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative w-full h-72 rounded-2xl overflow-hidden">
            <Image
              src="/assets/products/ohlove-service-1.png"
              alt="ליווי אישי - תהליך שינוי וצמיחה"
              fill
              className="object-cover"
            />
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
              ארבע עדשות <span className="text-primary">לעבודה משותפת</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              לא חייבים לעבוד עליהן בסדר קבוע. בוחרים את המוקד שמתאים למצב הנוכחי וחוזרים אליו לפי הצורך.
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
              לבדוק אם זה מתאים בשיחת היכרות
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
              רכיבי עבודה אפשריים — <span className="text-primary">מוגדרים בהצעה.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              העמוד מציג את אופן העבודה, לא התחייבות לתכולה קבועה. לפני התחלה מאשרים מה נכלל, מה לא, ובאילו גבולות.
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

          {/* Results image */}
          <div className="mt-12 max-w-xs mx-auto">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/assets/products/ohlove-support-image.png"
                alt="ליווי אישי - תמיכה מלאה לאורך הדרך"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Process commitment callout */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">מחויבות לתהליך</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">מגדירים יעדים, מתרגלים ובודקים מה קורה בפועל.</strong>{" "}
                אם נתקעים, חוזרים למיפוי ומעדכנים את הצעדים במקום להמשיך על אוטומט.
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
                  src="/assets/brand/ohlove-photo-2.jpg"
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
                  עם <strong className="text-primary">רקע באמנויות הבמה</strong> כשחקן,
                  מוזיקאי ובובנאי - אני מביא לליווי דרך ייחודית שמחברת בין אמנות ליחסים.
                </p>
              </div>

              <aside className="mt-8 rounded-2xl border border-border/60 bg-muted/30 p-5">
                <h3 className="font-bold mb-3">שלוש שאלות שכדאי לשאול אותי לפני התחלה</h3>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li>• באילו כלים נעבוד, ומה הניסיון הרלוונטי שלי למוקד שלך?</li>
                  <li>• איפה עובר הגבול בין אימון וליווי לבין טיפול מקצועי?</li>
                  <li>• איך נדע שהמסגרת מועילה, ומתי נשנה כיוון או נסיים?</li>
                </ul>
              </aside>

              {/* Key stat */}
              <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 inline-block">
                <p className="text-foreground">
                  <strong className="text-primary text-2xl">אישי</strong>
                  <span className="mr-2 text-muted-foreground"> מיפוי, תרגול ומשוב שמותאמים לאדם</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW TO EVALUATE COACHING ===== */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              בדיקת התאמה מעשית
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              לא צריך סיפור הצלחה כדי לשאול <span className="text-primary">שאלות טובות</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              לפני שמתחילים ליווי, כדאי להבין את העבודה עצמה. אפשר להעתיק את ארבע השאלות האלה ולהביא אותן לשיחת ההיכרות.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {coachingProofQuestions.map((question, index) => (
              <Card key={question.title} className="border-border/60 bg-background">
                <CardContent className="p-7">
                  <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-primary/10 font-bold text-primary tabular-nums">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{question.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{question.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
            <p className="leading-relaxed text-muted-foreground">
              סיפורים אישיים, תמונות וסרטונים יוצגו רק לאחר אימות מקור והסכמה עדכנית לכל פריט ולכל משטח פרסום.
              עד אז, אפשר להשתמש ב<Link href="/sipurim" className="mx-1 font-semibold text-primary underline-offset-4 hover:underline">כלי הקריאה ובדיקת ההתאמה</Link>
              כדי להעריך כל הצעה — גם שלנו.
            </p>
          </div>
        </div>
      </section>

      {(testimonials.length > 0 || testimonialVideos.length > 0) && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                עברו אימות לפרסום
              </Badge>
              <h2 className="text-3xl font-bold md:text-4xl">חוויות אישיות עם מקור והסכמה מתועדים</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                חוויה של אדם אחד אינה תחזית לתוצאה של אדם אחר. קראו אותה לצד ההקשר ושאלות ההתאמה שמעל.
              </p>
            </div>

            {testimonials.length > 0 && (
              <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.slug} className="border-border/50">
                    <CardContent className="p-7">
                      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                        ״{testimonial.full_text ?? testimonial.short_quote}״
                      </p>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      <Link href={`/sipurim/${testimonial.slug}`} className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
                        לסיפור ולהקשר
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {testimonialVideos.length > 0 && (
              <div className="mx-auto mt-8 grid max-w-4xl gap-8 md:grid-cols-2">
                {testimonialVideos.map((video) => (
                  <div key={video.id} className="aspect-video overflow-hidden rounded-2xl border border-border/50 shadow-lg">
                    <iframe
                      src={video.embed}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="size-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
              לתיאום שיחת היכרות
              <span>&larr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            לא צריך להחליט על ליווי עכשיו
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-4 leading-relaxed">
            שיחת היכרות נועדה לברר את הצורך, צורת העבודה, התנאים והחלופות — לפני הצעה או התחייבות.
          </p>
          <p className="text-lg opacity-80 max-w-xl mx-auto mb-10 leading-relaxed">
            אפשר להגיע עם שאלה אחת, לבקש זמן לחשוב אחרי השיחה ולהחליט שלא להמשיך. אם מסלול אחר מתאים יותר, זו תשובה טובה לא פחות.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={BOOKING_URL}
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              לתיאום שיחת היכרות
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
