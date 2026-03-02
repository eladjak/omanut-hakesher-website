import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: 'תוכנית "הדרך" - 12 שבועות למציאת זוגיות',
  description:
    "תוכנית מובנית בת 12 שבועות שכבר עזרה למאות אנשים למצוא זוגיות מאושרת. 18+ שיעורי וידאו, תרגילים מעשיים וקהילה תומכת.",
  alternates: {
    canonical: "/hadrech",
  },
  openGraph: {
    title: 'תוכנית "הדרך" | אומנות הקשר',
    description:
      "תוכנית מובנית בת 12 שבועות שכבר עזרה למאות אנשים למצוא זוגיות מאושרת. 18+ שיעורי וידאו, תרגילים מעשיים וקהילה תומכת.",
    url: "/hadrech",
    locale: "he_IL",
    type: "website",
  },
};

const phases = [
  {
    phase: 1,
    weeks: "שבועות 1-3",
    title: "מבפנים החוצה",
    subtitle: "הכרת עצמך האמיתית",
    description:
      "לפני שמחפשים זוגיות - צריך להבין מי אתה באמת. בשלב הזה נפרק את הסיפורים שסיפרת לעצמך, נזהה את הפחדים שחוסמים אותך, ונבנה ביטחון עצמי אמיתי. לא מוטיבציה זולה - עבודה פנימית עמוקה.",
    topics: [
      "שבירת סיפורים מגבילים על זוגיות",
      "הבנת 14 הפחדים הנפוצים בדרך לזוגיות",
      "בניית ביטחון עצמי מבפנים",
      "כתיבת חזון אישי לזוגיות",
    ],
    color: "from-secondary to-secondary-light",
    iconColor: "bg-secondary/10 text-secondary",
  },
  {
    phase: 2,
    weeks: "שבועות 4-6",
    title: "שפת החיבור",
    subtitle: "המיומנויות שלא לימדו אותך",
    description:
      "רוב האנשים לא יודעים לנהל שיחה רגשית. לא לימדו אותם. בשלב הזה תלמד לתקשר, להציב גבולות בריאים, ולהיות פגיע בלי לאבד את עצמך. אלה המיומנויות שמבדילות בין דייט כושל לחיבור אמיתי.",
    topics: [
      "תקשורת רגשית ושפת חיבור",
      "גבולות בריאים ביחסים",
      "פגיעות ואינטימיות",
      "הקשבה פעילה ואמפתיה",
    ],
    color: "from-primary to-primary-light",
    iconColor: "bg-primary/10 text-primary",
  },
  {
    phase: 3,
    weeks: "שבועות 7-9",
    title: "המפגש",
    subtitle: "מהתיאוריה לשטח",
    description:
      "עכשיו, כשאתה מכיר את עצמך ויודע לתקשר - הגיע הזמן לצאת לשטח. כלים מעשיים לדייטינג, יצירת כימיה אמיתית, ניווט בהיכרויות בצורה חכמה. לא טריקים - מיומנויות אמיתיות.",
    topics: [
      "כלים מעשיים לדייטינג מוצלח",
      "יצירת כימיה אמיתית (לא מלאכותית)",
      "ניווט בהיכרויות ודייטים",
      "זיהוי הזדמנויות אמיתיות",
    ],
    color: "from-accent-dark to-accent",
    iconColor: "bg-accent/10 text-accent-dark",
  },
  {
    phase: 4,
    weeks: "שבועות 10-12",
    title: "בניית קשר אמיתי",
    subtitle: "מדייט למחויבות",
    description:
      "מצאת מישהו? מעולה. עכשיו מתחיל האתגר האמיתי - לבנות קשר שנמשך. מחויבות היא לא רגש, היא החלטה. בשלב הזה תלמד לשמור על הקשר, להתמודד עם קונפליקטים, ולבנות זוגיות לטווח ארוך.",
    topics: [
      "מחויבות כהחלטה, לא כרגש",
      "ניהול קונפליקטים בצורה בריאה",
      "שמירה על הקשר לאורך זמן",
      "בניית זוגיות יציבה ומאושרת",
    ],
    color: "from-primary-dark to-secondary",
    iconColor: "bg-primary-dark/10 text-primary-dark",
  },
];

const included = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "18+ שיעורי וידאו",
    description:
      "שיעורים מוקלטים של 10-20 דקות כל אחד. צפה בקצב שלך, חזור כמה שתרצה.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "דפי עבודה ותרגילים",
    description:
      "תרגילים מעשיים לכל שיעור - לא רק לומדים, עושים. 32 תרגילים שאפשר ליישם מיד.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "גישה לקהילה",
    description:
      "הצטרפות חינמית למועדון החברים של אומנות הקשר - קהילה תומכת, אירועים ותוכן בלעדי.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    title: "שאלוני הערכה עצמית",
    description:
      "כלי אבחון שיעזרו לך להבין איפה אתה עומד, מה חוסם אותך, ואיך אתה מתקדם.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "גישה לכל החיים",
    description:
      "קנית פעם אחת - הגישה שלך לחומרים היא לצמיתות. חוזר לצפות מתי שתרצה.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: "תוכן נלווה",
    description:
      'מדריכים, מאמרים ותוכן בונוס שמשלים את השיעורים - כולל גישה לספר "אומנות הקשר".',
  },
];

const comparison = [
  {
    approach: "אפליקציות דייטינג",
    description: "נותנות הזדמנויות, אבל בלי כלים. זה כמו לתת למישהו מפתח בלי ללמד אותו לנהוג.",
    verdict: "הזדמנויות ללא כלים",
  },
  {
    approach: "שדכנים",
    description: "מספקים התאמות, אבל לא מטפלים בסיבה שדייטים קודמים נכשלו.",
    verdict: "התאמות ללא עבודה פנימית",
  },
  {
    approach: "טיפול פסיכולוגי",
    description: "עוזר להבין את עצמך, אבל לרוב לא מלווה אותך בשטח ולא נותן כלים מעשיים לדייטינג.",
    verdict: "הבנה ללא ליווי בשטח",
  },
  {
    approach: "ספרי עזרה עצמית",
    description: "טיפים מעניינים, אבל קוראים, מתלהבים, ואחרי שבוע חוזרים לאותם דפוסים.",
    verdict: "השראה ללא מסגרת",
  },
];

const testimonials = [
  {
    quote:
      "הגעתי לאלעד אחרי 5 שנים של דייטים כושלים. הייתי בטוח שמשהו לא בסדר איתי. תוך 3 חודשים הבנתי שהבעיה הייתה לא מה שחשבתי - למדתי שאני בורח מקרבה בגלל פחד מדחייה. היום אני נשוי כבר שנתיים לאישה הכי מדהימה שפגשתי.",
    name: "דני",
    age: 38,
    profession: "מהנדס",
  },
  {
    quote:
      "ניסיתי הכל - אפליקציות, שדכנים, אירועים. שום דבר לא עבד. הליווי עם אלעד היה שונה לגמרי. הוא לא רק עזר לי להבין מה אני רוצה, אלא גם לימד אותי איך לתקשר את זה. פגשתי את בן זוגי אחרי חודשיים וחצי.",
    name: "מיכל",
    age: 34,
    profession: "עורכת דין",
  },
  {
    quote:
      "הייתי סקפטי בהתחלה. חשבתי שאני יודע הכל על דייטינג. אלעד הראה לי כמה דברים בסיסיים שפספסתי לגמרי. הייתה לי חברה תוך 6 שבועות. היום אנחנו גרים ביחד.",
    name: "אורי",
    age: 42,
    profession: "יזם",
  },
];

const faqs = [
  {
    question: "למי תוכנית הדרך מתאימה?",
    answer:
      "התוכנית מתאימה לרווקים ורווקות בגילאי 25-55 שמחפשים זוגיות רצינית ומוכנים לעשות עבודה אמיתית. לא משנה אם אתה אחרי פרידה, אחרי גירושין, או פשוט מרגיש תקוע - אם אתה מוכן לשינוי, התוכנית בשבילך.",
  },
  {
    question: "כמה זמן לוקח לראות תוצאות?",
    answer:
      'רוב המשתתפים מרגישים שינוי כבר בשבועות הראשונים - בעיקר בצורה שבה הם מבינים את עצמם ואת הדפוסים שלהם. התוכנית בנויה ל-12 שבועות, אבל אפשר לצפות בחומרים בקצב שלך. רבים מוצאים זוגיות עוד לפני סיום התוכנית.',
  },
  {
    question: "מה ההבדל בין תוכנית הדרך לליווי אישי?",
    answer:
      "תוכנית הדרך היא קורס דיגיטלי שאפשר ללמוד בקצב עצמאי - שיעורי וידאו, תרגילים וקהילה. הליווי האישי כולל מפגשים פרטניים עם אלעד, תמיכה בוואטסאפ, ומשוב על דייטים בזמן אמת. הליווי האישי כולל גם גישה לכל חומרי התוכנית.",
  },
  {
    question: "אין לי זמן ל-12 שבועות מרוכזים. מה עושים?",
    answer:
      "התוכנית גמישה לחלוטין. כל השיעורים מוקלטים ואפשר לצפות בהם מתי שנוח - בבוקר, בערב, בשבת. אין לחץ. יש לך גישה לכל החיים, אז אתה יכול לחזור לחומרים מתי שתרצה.",
  },
  {
    question: "מה אם כבר ניסיתי קורסים/ליווי ולא עבד?",
    answer:
      'זו בדיוק הסיבה שהדרך שונה. לא מדובר בטיפים ומוטיבציה - מדובר בתהליך מובנה שמתחיל מהשורש. כל מי שאומר "ניסיתי" - ניסה את הדבר הלא נכון או בצורה הלא נכונה. הדרך עובדת כי היא לא מתעלמת מהעבודה הפנימית.',
  },
  {
    question: "האם התוכנית מתאימה גם לנשים?",
    answer:
      "בהחלט. התוכנית נכתבה בשפה מכלילה ומתאימה לגברים ולנשים כאחד. רוב העקרונות הם אוניברסליים - הבנת עצמך, תקשורת, פגיעות ומחויבות רלוונטיים לכולם.",
  },
  {
    question: "יש אחריות כספית?",
    answer:
      "אנחנו מאמינים בתוכנית, ולכן מציעים 14 ימי ניסיון. אם בתוך 14 יום הרגשת שזה לא בשבילך - תקבל החזר מלא, ללא שאלות.",
  },
  {
    question: "איך נראית הקהילה?",
    answer:
      "הקהילה כוללת אנשים שעוברים את אותו מסע כמוך. תוכל לשתף, לשאול, לקבל ולתת תמיכה. יש גם אירועים מיוחדים ותוכן בלעדי לחברי הקהילה. ההצטרפות לקהילה היא בחינם לרוכשי התוכנית.",
  },
];

const stats = [
  { end: 12, suffix: "", label: "שבועות תוכנית" },
  { end: 18, suffix: "+", label: "שיעורי וידאו" },
  { end: 32, suffix: "", label: "תרגילים מעשיים" },
];

export default function HaDrechPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: 'תוכנית "הדרך"' }]} />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/hadrech-hero.jpg"
            alt='תוכנית "הדרך" - 12 שבועות למציאת זוגיות'
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/65" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                variant="secondary"
                className="mb-6 text-sm px-4 py-1.5 bg-white/10 text-white border-white/20 hover:bg-white/10"
              >
                קורס דיגיטלי - 12 שבועות
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                תוכנית{" "}
                <span className="text-accent-light">&quot;הדרך&quot;</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium mt-3">
                12 שבועות שישנו את חיי האהבה שלך
              </p>
              <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
                לא עוד טיפים מפוזרים. לא עוד &quot;תהיה עצמך&quot; ו&quot;זה
                יגיע כשתפסיק לחפש&quot;. תוכנית הדרך היא{" "}
                <strong className="text-foreground">
                  מסע מובנה ומוכח
                </strong>{" "}
                שמתחיל מהעבודה הפנימית ומוביל אותך צעד אחר צעד למציאת זוגיות
                אמיתית.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  התחל את הדרך שלך
                </Link>
                <a
                  href="#phases"
                  className="px-8 py-4 border-2 border-secondary text-secondary rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-colors"
                >
                  גלה את התוכנית
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/generated/coaching-program.jpg"
                  alt='תוכנית "הדרך" - 12 שבועות למציאת זוגיות'
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

      {/* Stats Strip */}
      <section className="py-12 bg-muted/50 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 text-primary border-primary/30"
              >
                מה זה הדרך?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                לא טיפים.{" "}
                <span className="text-primary">דרך שלמה.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                רוב העצות על זוגיות הן חסרות תועלת. &quot;תצא יותר&quot;,
                &quot;תהיה עצמך&quot;, &quot;זה יגיע&quot;. אם זה עבד - לא היית
                צריך להיות כאן.
              </p>
              <Separator className="my-6 max-w-xs mx-auto" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                תוכנית הדרך היא{" "}
                <strong className="text-foreground">מסע מובנה בן 4 שלבים</strong>{" "}
                שמתחיל מהעבודה על עצמך ומוביל אותך בצורה מעשית - שלב אחר שלב -
                עד למציאת זוגיות אמיתית ובניית קשר שנמשך. לא תיאוריה מופשטת.
                כל שיעור כולל כלי ספציפי שאפשר ליישם מחר בבוקר.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The 4 Phases */}
      <section id="phases" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 text-accent-dark border-accent/30"
              >
                ארבעת השלבים
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                המסע <span className="text-primary">שלך</span> לזוגיות
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                מסע מובנה שמתחיל מבפנים ויוצא החוצה. כל שלב בונה על הקודם.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-8">
            {phases.map((phase, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="relative overflow-hidden border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-l ${phase.color}`}
                  />
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="shrink-0">
                        <div
                          className={`w-16 h-16 ${phase.iconColor} rounded-2xl flex items-center justify-center`}
                        >
                          <span className="text-2xl font-bold">
                            {String(phase.phase).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border-0 text-xs"
                          >
                            {phase.weeks}
                          </Badge>
                          <h3 className="text-xl md:text-2xl font-semibold">
                            {phase.title}
                          </h3>
                        </div>
                        <p className="text-sm text-secondary font-medium mb-3">
                          {phase.subtitle}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {phase.description}
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {phase.topics.map((topic, topicIndex) => (
                            <li
                              key={topicIndex}
                              className="flex items-start gap-2 text-sm"
                            >
                              <svg
                                className="w-4 h-4 text-primary shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-muted-foreground">
                                {topic}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 text-primary border-primary/30"
              >
                מה כולל?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                הכל <span className="text-primary">במקום אחד</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                לא רק שיעורים - חבילה שלמה שנבנתה כדי שתצליח
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {included.map((item, index) => (
              <StaggerItem key={index}>
                <Card className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200 h-full">
                  <CardContent className="p-6">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 text-accent-dark border-accent/30"
              >
                למה הדרך?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                מה <span className="text-primary">באמת</span> עובד?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                כבר ניסית דברים אחרים. הנה למה הם לא עבדו - ולמה הדרך שונה.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-10">
              {comparison.map((item, index) => (
                <StaggerItem key={index}>
                  <Card className="border-border/50 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {item.approach}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-destructive/10 text-destructive border-0 text-xs"
                      >
                        {item.verdict}
                      </Badge>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* HaDerech Solution Card */}
            <ScrollReveal>
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                    תוכנית הדרך
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4">
                    עבודה פנימית + מיומנויות + מסגרת + קהילה
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    הדרך משלבת את מה שחסר בכל גישה אחרת: עבודה עמוקה על עצמך,
                    כלים מעשיים לדייטינג, מסגרת מובנית שמחזיקה אותך, וקהילה
                    של אנשים שעוברים את אותו מסע. זו לא עוד גישה - זו{" "}
                    <strong className="text-foreground">הדרך השלמה</strong>.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 text-primary border-primary/30"
              >
                סיפורי הצלחה
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                הם עשו את <span className="text-primary">הדרך</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                אנשים אמיתיים שהרגישו בדיוק כמוך - ומצאו את הזוגיות שמגיעה להם
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((item, index) => (
              <StaggerItem key={index}>
                <Card className="border-border/50 h-full hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <svg
                      className="w-8 h-8 text-primary/20 mb-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                    </svg>
                    <p className="text-sm leading-relaxed mb-4">
                      &quot;{item.quote}&quot;
                    </p>
                    <Separator className="mb-4" />
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.age}, {item.profession}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Community Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative w-full h-72 rounded-2xl overflow-hidden">
            <Image
              src="/images/generated/hadrech-community.jpg"
              alt="קהילת תוכנית הדרך"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Concept - "פנוי לקשר" */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10">
              הרעיון המרכזי
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              &quot;פנוי לקשר&quot; - זה לא מצב.
              <br />
              זו <span className="text-accent">מיומנות</span>.
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              יש הבדל בין <strong>לרצות</strong> זוגיות לבין{" "}
              <strong>להיות פנוי</strong> לזוגיות. רוב האנשים שאומרים &quot;אני
              מחפש זוגיות&quot; בעצם לא באמת פנויים - לא בגלל שהם משקרים, אלא
              בגלל שמשהו חוסם אותם.
            </p>
            <p className="text-lg opacity-80 leading-relaxed mb-10">
              תוכנית הדרך מזהה את החסם ומפתחת את הכלים לעבור ממצב של &quot;לא
              פנוי&quot; ל&quot;פנוי לקשר&quot;. זה לא קסם - זה תהליך.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 text-primary border-primary/30"
              >
                שאלות נפוצות
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                שאלות <span className="text-primary">ותשובות</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-right text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            הזוגיות שמגיעה לך לא תדפוק בדלת.
            <br />
            <span className="text-accent-light">
              אבל אם תצא לדרך - היא מחכה לך.
            </span>
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
            12 שבועות. 18+ שיעורים. 32 תרגילים. קהילה תומכת. וגישה לכל החיים.
            <br />
            כל מה שצריך כדי להתחיל את המסע שלך לזוגיות אמיתית.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              התחל את הדרך שלך
            </Link>
            <Link
              href="/coaching"
              className="inline-flex px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              מעדיף ליווי אישי?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
