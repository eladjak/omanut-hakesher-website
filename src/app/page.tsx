"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GenderedText } from "@/components/GenderedText";
import { OpenResourcesLinks } from "@/components/OpenResourcesLinks";
import { WebPageJsonLd } from "@/components/JsonLd";
import { CANONICAL_SITE_URL } from "@/lib/site-url";
import { PRODUCT_FACTS } from "@/lib/product-facts";

// Selected sources and professional frameworks that influenced parts of the
// curriculum. They do not validate every exercise or turn the program into
// therapy; each card states the narrower relationship honestly.
const researchSources = [
  {
    title: "הליך ניסויי ליצירת קרבה בין־אישית",
    detail: "המחקר של Aron ועמיתיו בדק משימות חשיפה הדרגתיות בתנאי ניסוי. הוא לא הוכיח שהשאלות גורמות להתאהבות או להתאמה.",
    href: "https://doi.org/10.1177/0146167297234003",
    source: "Aron et al., 1997",
  },
  {
    title: "תקשורת מקרבת (NVC)",
    detail: "מסגרת להתבוננות, רגשות, צרכים ובקשות. בקורס היא מוצגת כאפשרות לתרגול, לא כנוסחה שמבטיחה פתרון.",
    href: "https://www.cnvc.org/learn-nvc/what-is-nvc",
    source: "Marshall Rosenberg",
  },
  {
    title: "טיפול ממוקד רגש (EFT)",
    detail: "מסגרת טיפולית של אנשי מקצוע שהשפיעה על השפה סביב קשר ורגש. התוכנית עצמה אינה טיפול EFT.",
    href: "https://iceeft.com/what-is-eft/",
    source: "Sue Johnson, ICEEFT",
  },
  {
    title: "מחקרי תצפית על זוגות",
    detail: "עבודת מכון גוטמן היא מקור לרעיונות על תקשורת וקונפליקט. היא אינה מאפשרת לאבחן קשר או לנבא את עתידו כאן.",
    href: "https://www.gottman.com/about/research/",
    source: "The Gottman Institute",
  },
];

// Dynamic imports for below-fold components
const HomeTestimonials = dynamic(
  () => import("@/components/HomeTestimonials").then((mod) => mod.HomeTestimonials),
  { ssr: true }
);

const FreeWorkshopBanner = dynamic(
  () => import("@/components/FreeWorkshopBanner").then((mod) => mod.FreeWorkshopBanner),
  { ssr: true }
);

const stats = [
  { number: String(PRODUCT_FACTS.course.weeks), label: "שבועות בתוכנית" },
  { number: String(PRODUCT_FACTS.book.chapters), label: "פרקים בספר" },
  { number: String(PRODUCT_FACTS.book.numberedExercises), label: "תרגילים ממוספרים" },
  { number: String(PRODUCT_FACTS.course.lmsMappedLessons), label: "שיעורים ב־LMS" },
];

type Product = {
  icon: React.ReactNode;
  stage: string;
  title: string;
  description: string;
  href: string;
  color: string;
  cta: string;
  external?: boolean;
};

const products: Product[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    stage: "01 · מתחילים בחינם",
    title: "משאבים פתוחים לתרגול",
    description: "מדריכים ותרגילים שאפשר לפתוח עכשיו, לנסות בקצב שלך ולבדוק אם השפה והגישה של אומנות הקשר מדברות אליך.",
    href: "/resources",
    color: "bg-primary/10 text-primary",
    cta: "לבחור תרגול פתוח",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    stage: "02 · קוראים ומתרגלים",
    title: "הספר ״אומנות הקשר״ + Book Companion",
    description: `${PRODUCT_FACTS.book.chapters} פרקים ו־${PRODUCT_FACTS.book.numberedExercises} תרגילים ממוספרים. הספר עומד בפני עצמו; הליווי הדיגיטלי שנבנה לצדו יוסיף בהמשך קול, וידאו ותרגול לקוראים.`,
    href: "/book",
    color: "bg-secondary/10 text-secondary",
    cta: "להכיר את הספר והליווי",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    stage: "03 · ממקדים צורך",
    title: "כרטיס היכרויות אישי",
    description: "שירות ממוקד לניסוח כרטיס שמרגיש כמוך ונותן לאדם אחר פתח אמיתי לשיחה. הזמינות, התכולה ומועד המסירה מאושרים מראש.",
    href: "/products/dating-card",
    color: "bg-accent/10 text-accent-dark",
    cta: "לבדוק התאמה וזמינות",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    stage: "04 · בונים תהליך",
    title: "תוכנית ״הדרך״",
    description: `תוכנית מובנית של ${PRODUCT_FACTS.course.weeks} שבועות ו־${PRODUCT_FACTS.course.phases} שלבים שמחברת עבודה פנימית, תקשורת, היכרויות ותרגול. תנאי הגישה והליווי מפורטים בעמוד התוכנית.`,
    href: "/programs/the-way",
    color: "bg-primary-light/20 text-primary-dark",
    cta: "לפרטים על התוכנית",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    stage: "05 · מקבלים ליווי",
    title: "ליווי אישי",
    description: "כשהתוכן לבדו לא מספיק, אפשר לבדוק תהליך מותאם אישית עם מפגשים פרטניים, תרגול ומשוב על מה שקורה בפועל.",
    href: "/coaching",
    color: "bg-secondary/10 text-secondary",
    cta: "לבדוק אם ליווי מתאים",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    stage: "06 · ממשיכים יחד",
    title: "קהילה וסימולטור כהמשך",
    description: "אחרי שנוצר בסיס, הקהילה יכולה להוסיף שייכות ועקביות והסימולטור יכול להוסיף תרגול. ההצטרפות והגישה נקבעות לפי המסלול ואינן מוצגות כאן כהבטחה פתוחה.",
    href: "/community",
    color: "bg-primary/10 text-primary",
    cta: "להכיר את אפשרויות ההמשך",
  },
];

const painPoints = [
  {
    title: "היכרויות מתחילות להרגיש כמו אותה שיחה שוב ושוב?",
    description: "אפליקציות מייצרות הזדמנויות, אבל לא תמיד בהירות. אפשר לתרגל שיחה, גבולות וקבלת החלטות בלי להבטיח לאן מפגש יוביל.",
  },
  {
    title: "יש לך חיים מלאים — ובקשרים עדיין יש סימני שאלה?",
    description: "זה לא אומר שמשהו בך מקולקל. לפעמים צריך שפה ומבנה שיעזרו לזהות דפוסים ולבחור מה לנסות אחרת.",
  },
  {
    title: "כבר צברת תובנות, אבל חסר לך תרגול מסודר?",
    description: "אומנות הקשר מחברת למידה קצרה, תרגילים ורפלקציה. היא אינה טיפול ואינה תחליף לעזרה מקצועית כשזו נדרשת.",
  },
];

const method = [
  {
    step: "01",
    title: "גישה",
    description: "לזהות סיפורים, פחדים והרגלים — בלי להפוך אותם לאבחנה ובלי להאשים את עצמך.",
    color: "from-secondary to-secondary-light",
  },
  {
    step: "02",
    title: "תקשורת",
    description: "לתרגל רגשות, צרכים, הקשבה וגבולות, תוך שמירה על הזכות לומר לא או לעצור.",
    color: "from-primary to-primary-light",
  },
  {
    step: "03",
    title: "משיכה ותנועה",
    description: "ליצור הזדמנויות להיכרות ולתרגל נוכחות ואומץ, בלי לקרוא שפת גוף כהסכמה.",
    color: "from-accent-dark to-accent",
  },
  {
    step: "04",
    title: "חיבור",
    description: "לשאול, להקשיב ולבדוק סקרנות הדדית — בלי להפוך כימיה למדד להתאמה או לבטיחות.",
    color: "from-primary-dark to-secondary",
  },
  {
    step: "05",
    title: "אינטימיות",
    description: "לבנות קרבה בהדרגה, עם פרטיות, הסכמה ואפשרות לדלג על כל שאלה או תרגיל.",
    color: "from-secondary-light to-primary",
  },
  {
    step: "06",
    title: "מחויבות",
    description: "לקבל החלטות הדדיות בקצב שמתאים לשני הצדדים, עם מקום להאט, לשנות כיוון או לצאת.",
    color: "from-accent to-secondary",
  },
];

export default function HomePage() {
  return (
    <>
      <WebPageJsonLd
        name="אומנות הקשר | ללמוד ליצור קשר בבהירות ובבחירה"
        description="ספר, תוכנית למידה וליווי לתרגול תקשורת, גבולות, היכרות וקבלת החלטות בקשרים — בלי הבטחת תוצאה ובלי נוסחאות קסם."
        url={`${CANONICAL_SITE_URL}/`}
      />
      {/* Hero Section */}
      <section className="relative min-h-[92dvh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/hero-homepage.jpg"
            alt="אומנות הקשר — למידה ותרגול של תקשורת, היכרות וקשר"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-scrim pointer-events-none" aria-hidden="true" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 bg-white/10 text-white border-white/20 hover:bg-white/10">
              בית ללמידה ותרגול של תקשורת, היכרות וקשר
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
              <GenderedText id="hero.title-main" />
              <br />
              <span className="text-primary">בלי לאבד את עצמך</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mt-3">
              להבין דפוסים. לתרגל תקשורת וגבולות. לבחור את הצעד הבא.
            </p>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              <strong className="text-white">אומנות הקשר</strong> מחברת ספר, תוכנית למידה
              וליווי אנושי למסע מעשי של התבוננות, תרגול ורפלקציה. אין כאן הבטחה
              לזוגיות — יש דרך מסודרת לפתח מיומנויות ולבחור מתוך יותר בהירות.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/resources"
                data-wow-lift
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary-dark shadow-lg shadow-primary/20"
              >
                להתחיל ממשאב פתוח
              </Link>
              {/* Legibility fix 25.7: this button was border-secondary /
                  text-secondary — navy #1E3A5F — on the DARK hero scrim, which
                  measured 1.36:1 against its actual backdrop on the rendered
                  page. That is not a near-miss, it is unreadable; the styling
                  was written for a light section and never adjusted for the
                  hero. White-on-dark is the correct pairing here and inverts on
                  hover to the brand navy, so the identity colour still carries
                  the interaction. No transition utility here on purpose:
                  [data-wow-lift] owns the `transition` shorthand for these
                  elements and would override any class-level one (equal
                  specificity, and wow.css loads later), so the easing for
                  colour is declared there instead. transition-colors is also
                  avoided repo-wide on lifted elements: it animates
                  border-color. */}
              <Link
                href="/book"
                data-wow-lift
                className="px-8 py-4 border-2 border-white/80 text-white rounded-full font-semibold text-lg hover:bg-white hover:text-secondary"
              >
                להכיר את הספר
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-16 flex flex-wrap gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-on-dark tabular-nums">{stat.number}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GenderedText id="pain.feeling" />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <GenderedText id="pain.try-differently" />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200 motion-safe:hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-3">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* "Who I Am" Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl overflow-hidden">
                <Image
                  src="/assets/brand/facebook-profile.jpg"
                  alt="אלעד יעקובוביץ׳ - מייסד אומנות הקשר"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full -z-10" />
            </div>

            {/* Story */}
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                מי אני
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                אלעד יעקובוביץ׳ - <span className="text-primary">המסע שלי</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  הגעתי לעבודה הזאת מתוך מסע אישי ומתוך שנים בעולם הבמה — כשחקן,
                  מוזיקאי ובובנאי. שם למדתי הרבה על נוכחות, הקשבה, תרגול ועל הפער
                  בין מה שאנחנו רוצים לבטא לבין מה שהאדם מולנו באמת פוגש.
                </p>
                <p>
                  בחיים האישיים גיליתי שתובנה לבדה לא תמיד משנה דפוס. לפעמים צריך
                  לעצור, לפרק מיומנות לצעדים קטנים, לנסות, לקבל משוב ולבחור מחדש.
                  החיבור הזה בין תוכן לתרגול הפך לבסיס של אומנות הקשר.
                </p>
                <p className="text-foreground font-medium">
                  אני לא פסיכולוג ולא מטפל זוגי, והתוכנית אינה טיפול. אני מביא הנחיה,
                  תוכן ותרגול מתוך נקודת המבט שלי — ומבהיר מתי נכון לפנות לאיש או אשת
                  מקצוע מתאימים.
                </p>
              </div>

              {/* Real Credentials */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  תוכן מעשי
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  תרגול מובנה
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  הנחיה ומשוב
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  כלים אינטראקטיביים
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  הרצאות וסדנאות
                </Badge>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-3 transition-all"
              >
                <GenderedText id="blog.about-approach" />
                <span>&larr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Canonical curriculum path — six phases */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              הגישה שלי
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ששת <span className="text-primary">שלבי הלמידה</span> בתוכנית
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              רצף שמתחיל בהיכרות עצמית, עובר דרך תקשורת והיכרות, ומגיע לקרבה
              ולמחויבות מתוך בחירה — לא מתוך לחץ לעמוד בקצב אחיד.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {method.map((item, index) => (
              <Card key={index} className="relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-200 group motion-safe:hover:-translate-y-1">
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
              href="/programs/the-way"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold text-lg hover:bg-secondary-dark transition-colors shadow-lg shadow-secondary/20"
            >
              גלה את תוכנית הדרך
              <span>&larr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Sources and influences — scoped claims, not blanket validation */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 text-secondary border-secondary/30">
              מקורות והשפעות
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              מסגרות מקצועיות — <span className="text-primary">עם גבולות ברורים</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              חלק מהתוכן הושפע ממחקר וממסגרות מקצועיות, וחלקו הוא פרשנות ותרגול
              פדגוגי של אומנות הקשר. מקור אינו מוכיח שכל תרגיל “עובד”, ולכן אנחנו
              מציינים כאן גם את ההקשר וגם את המגבלה.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {researchSources.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.detail}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary">
                  {item.source}
                  <span className="text-primary transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true">&larr;</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products/Services Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מה אני מציע
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מסע שאפשר להיכנס אליו <span className="text-primary">מהמקום שלך</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              לא חייבים לקפוץ ישר למסלול הגדול. מתחילים בערך פתוח, ומתקדמים רק כשיש סיבה טובה לצעד הבא.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product, index) => {
              const cardInner = (
                <Card className="h-full border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 motion-safe:group-hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className={`inline-flex p-3 rounded-xl mb-5 ${product.color}`}>
                      {product.icon}
                    </div>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
                      {product.stage}
                    </p>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-5 text-primary font-medium group-hover:gap-3 transition-all">
                      {product.cta} <span>&larr;</span>
                    </span>
                  </CardContent>
                </Card>
              );
              return product.external ? (
                <a
                  key={index}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  {cardInner}
                </a>
              ) : (
                <Link key={index} href={product.href} className="group">
                  {cardInner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inspectable evidence while no testimonial has publication approval. */}
      <HomeTestimonials />

      {/* Core Concept - "פנוי לקשר" as reflection, not diagnosis */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10">
              הקונספט המרכזי
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              ״פנוי לקשר״ הוא לא ציון. זו <span className="text-accent">שאלה חוזרת</span>.
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              אפשר לרצות קשר ובאותו זמן להזדקק לעוד מרחב, ביטחון, תרגול או בהירות.
              זה לא הופך אותך ל״לא פנוי/ה״ ולא אומר שיש חסם נסתר שצריך לאבחן.
            </p>
            <p className="text-lg opacity-80 leading-relaxed mb-10">
              התוכנית מציעה שאלות וכלים לבדוק מה מתאים עכשיו: איזה גבול נחוץ, איזו
              מיומנות כדאי לתרגל, ומהו צעד קטן שאפשר לבחור — כולל הבחירה להאט או לעצור.
            </p>
            <Link
              href="/programs/the-way"
              className="inline-flex px-10 py-4 bg-white text-secondary rounded-full font-semibold text-lg hover:bg-accent hover:text-secondary-dark transition-colors shadow-lg"
            >
              להכיר את ששת שלבי התוכנית
            </Link>
          </div>
        </div>
      </section>

      {/* Free Workshop CTA Banner */}
      <FreeWorkshopBanner />

      {/* Immediate-value section: no signup is offered until a list is approved. */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">רוצה כלי שאפשר לפתוח עכשיו?</h2>
              <p className="text-muted-foreground mb-8">
                שלושה מדריכים מלאים, מאמרים ופודקאסט זמינים בלי טופס, בלי הרשמה ובלי לחכות למייל.
              </p>
              <OpenResourcesLinks layout="stack" className="justify-center" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            לא צריך להחליט על כל הדרך היום.
            <br />
            <span className="text-accent-on-dark">אפשר להתחיל מצעד אחד שמתאים לך.</span>
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
            להכיר את התוכנית, להתחיל מהספר, או פשוט לקרוא עוד. אין מסלול אחד נכון,
            ואין צורך להתחייב לתוצאה כדי להתחיל ללמוד ולתרגל.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/programs/the-way"
              data-wow-lift
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              להכיר את תוכנית ״הדרך״
            </Link>
            <Link
              href="/book"
              data-wow-lift
              className="inline-flex px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              להכיר את הספר
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
