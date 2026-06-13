"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GenderedText } from "@/components/GenderedText";
import { NewsletterForm } from "@/components/NewsletterForm";
import { WebPageJsonLd } from "@/components/JsonLd";

// Real research sources behind the method — credibility + AI-citation signal.
const researchSources = [
  {
    title: "36 השאלות להתאהבות",
    detail: "מחקרו של ד״ר ארתור ארון על קרבה הדדית מואצת — בסיס לתרגיל האינטימיות.",
    href: "https://en.wikipedia.org/wiki/36_questions_that_lead_to_love",
    source: "Arthur Aron, 1997",
  },
  {
    title: "תקשורת מקרבת (NVC)",
    detail: "שיטת התקשורת של מרשל רוזנברג — לדבר על רגשות וצרכים בלי האשמה.",
    href: "https://www.cnvc.org/learn-nvc/what-is-nvc",
    source: "Marshall Rosenberg",
  },
  {
    title: "טיפול ממוקד רגש (EFT)",
    detail: "עבודתה של ד״ר סו ג׳ונסון על דפוסי התקשרות בזוגיות.",
    href: "https://iceeft.com/what-is-eft/",
    source: "Sue Johnson, ICEEFT",
  },
  {
    title: "מחקר הזוגיות של גוטמן",
    detail: "ארבעים שנות מחקר על מה שמחזיק קשר לאורך זמן.",
    href: "https://www.gottman.com/about/research/",
    source: "The Gottman Institute",
  },
  {
    title: "תורת ההתקשרות",
    detail: "סגנונות ההתקשרות שמעצבים את הדרך שבה אנחנו נקשרים.",
    href: "https://en.wikipedia.org/wiki/Attachment_theory",
    source: "Bowlby & Ainsworth",
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
  { number: "461", label: "זוגות שנוצרו" },
  { number: "15+", label: "שנות ניסיון" },
  { number: "12", label: "שבועות תוכנית" },
  { number: "20+", label: "שנים על הבמה" },
];

type Product = {
  icon: React.ReactNode;
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
    title: "תוכנית ״הדרך״",
    description: "קורס 12 שבועות מובנה שמוביל אותך צעד אחר צעד מהעבודה הפנימית ועד למציאת הזוגיות. כולל 18+ שיעורי וידאו, תרגילים מעשיים וקהילה תומכת.",
    href: "/hadrech",
    color: "bg-primary/10 text-primary",
    cta: "לפרטים על הדרך",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "ליווי אישי פרימיום",
    description: "תהליך מותאם אישית עם מפגשים פרטניים, תמיכה בווטסאפ, משוב על דייטים בזמן אמת והתחייבות לתוצאה. זוגיות תוך 3 חודשים או המשך ליווי חינם.",
    href: "/coaching",
    color: "bg-secondary/10 text-secondary",
    cta: "לשיחת היכרות חינם",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "הספר ״אומנות הקשר״",
    description: "10 פרקים, 32 תרגילים מעשיים ועשרות סיפורים מהשטח. לא עוד ספר טיפים - דרך שלמה ומובנית למציאת הזוגיות שמגיעה לך. עם כלים אינטראקטיביים לכל פרק.",
    href: "/book",
    color: "bg-accent/10 text-accent-dark",
    cta: "לסקשן הספר",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "הקהילה",
    description: "מועדון חברים עם תוכן איכותי, קהילה תומכת, אירועים ומפגשים. נכנסים בחינם לאחר רכישת תוכנית הדרך ונהנים ממשאבים בלתי מוגבלים.",
    href: "/community",
    color: "bg-primary-light/20 text-primary-dark",
    cta: "לפרטים על הקהילה",
  },
];

const painPoints = [
  {
    title: "נמאס מדייטים שלא מובילים לשום מקום?",
    description: "כבר ניסית באמפר, בהינג׳, בטינדר. מעולה. עכשיו בוא ננסה משהו שבאמת עובד.",
  },
  {
    title: "מרגיש שאתה בסדר, אבל משהו לא עובד?",
    description: "קריירה מצוינת, חברים טובים, הכל מושלם - חוץ מהדבר הזה. הזוגיות.",
  },
  {
    title: "כבר ניסית ליווי ולא עבד?",
    description: "אתרי היכרויות נותנים הזדמנויות. פסיכולוגים עוזרים להבין. אנחנו עושים את הדבר עם ליווי זוגי בשטח.",
  },
];

const method = [
  {
    step: "01",
    title: "מבפנים החוצה",
    description: "הכרת עצמך, שבירת סיפורים מגבילים, הבנת הפחדים שחוסמים אותך מזוגיות",
    color: "from-secondary to-secondary-light",
  },
  {
    step: "02",
    title: "שפת החיבור",
    description: "תקשורת רגשית, גבולות בריאים, אינטימיות ופגיעות - המיומנויות שלא לימדו אותך",
    color: "from-primary to-primary-light",
  },
  {
    step: "03",
    title: "המפגש",
    description: "כלים מעשיים לדייטינג, יצירת כימיה אמיתית, היכרויות שמובילות ליותר",
    color: "from-accent-dark to-accent",
  },
  {
    step: "04",
    title: "בניית קשר אמיתי",
    description: "מחויבות כהחלטה, שמירה על הקשר, בניית זוגיות שנמשכת לאורך זמן",
    color: "from-primary-dark to-secondary",
  },
];

export default function HomePage() {
  return (
    <>
      <WebPageJsonLd
        name="אומנות הקשר | מצא את הזוגיות שמגיעה לך"
        description="בית הספר למציאת זוגיות מאושרת. תוכנית ״הדרך״, ליווי אישי, הספר ״אומנות הקשר״ וקהילה תומכת — עם אלעד יעקובוביץ׳."
        url="https://omanut-hakesher.co.il/"
      />
      {/* Hero Section */}
      <section className="relative min-h-[92dvh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/hero-homepage.jpg"
            alt="אומנות הקשר - בית הספר למציאת זוגיות"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-scrim" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 bg-white/10 text-white border-white/20 hover:bg-white/10">
              בית הספר למציאת זוגיות - עם אלעד יעקובוביץ׳
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
              <GenderedText id="hero.title-main" />
              <br />
              <span className="text-primary">שמגיעה לך</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mt-3">
              תוך 3 חודשים. בליווי אישי. בהתחייבות לתוצאה.
            </p>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              לא עוד טיפים מפוזרים ולא עוד דייטים לשווא.
              {" "}
              <strong className="text-white">אומנות הקשר</strong> היא דרך מובנית שכבר הובילה
              {" "}
              <strong className="text-accent-light">461 זוגות</strong> לזוגיות מאושרת.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/coaching"
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                לשיחת היכרות חינם
              </Link>
              <Link
                href="/hadrech"
                className="px-8 py-4 border-2 border-secondary text-secondary rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-colors"
              >
                על תוכנית ״הדרך״
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-16 flex flex-wrap gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-light tabular-nums">{stat.number}</div>
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
                  אני לא פסיכולוג. לא מטפל זוגי עם תואר שלישי. לא חוקר אקדמי.
                  ואם אני ממש כנה - גם אני עשיתי את כל הטעויות שאני מלמד להימנע מהן.
                </p>
                <p>
                  לפני שנים, הייתי רווק תקוע. בשיא הקריירה, חברים טובים, הכל מושלם על
                  הנייר - חוץ מהזוגיות. אחרי שנים של עבודה על עצמי, הבנתי שהבעיה לא הייתה
                  מה שעשיתי, אלא מה שלא הבנתי על עצמי.
                </p>
                <p className="text-foreground font-medium">
                  היום אני נשוי באושר, ועוזר לאחרים לעשות את אותו המסע.
                  עם רקע של <strong className="text-primary">~20 שנה בתחום הבמה</strong> כשחקן,
                  מוזיקאי ובובנאי - אני מביא לליווי דרך ייחודית שמחברת בין אמנות ליחסים.
                </p>
              </div>

              {/* Real Credentials */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  NLP מוסמך
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  CBT
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  קואצ׳ יהודי
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  דמיון מודרך
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                  ~20 שנות במה
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

      {/* Method - The 4 Steps */}
      <section className="py-24 bg-muted/50">
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
              href="/hadrech"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-semibold text-lg hover:bg-secondary-dark transition-colors shadow-lg shadow-secondary/20"
            >
              גלה את תוכנית הדרך
              <span>&larr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Foundation Section — credibility + citation signal */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 text-secondary border-secondary/30">
              על מה זה מבוסס
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              לא אינטואיציה. <span className="text-primary">מחקר.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              הכלים של אומנות הקשר נשענים על עשורים של מחקר בזוגיות, תקשורת והתקשרות -
              מעובדים לשפה פשוטה ולתרגילים שאפשר ליישם כבר היום.
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
              הדרך <span className="text-primary">שלך</span> לזוגיות
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <GenderedText id="products.choose" /> כל אחת מהן כבר הוכיחה את עצמה.
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

      {/* Testimonials Section */}
      <HomeTestimonials />

      {/* Video Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              הם מספרים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              סיפורי <span className="text-primary">הצלחה</span> אמיתיים
            </h2>
          </div>

          {/* Testimonial thumbnails */}
          <div className="grid grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto">
            <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/media/youtube-testimonial-1.jpg"
                alt="סיפור הצלחה - לקוחות של אומנות הקשר"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/media/youtube-testimonial-2.jpg"
                alt="סיפור הצלחה - לקוחות של אומנות הקשר"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Kbd7BRJ25TM"
                title="סיפור הצלחה - אומנות הקשר"
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
                title="סיפור הצלחה - אומנות הקשר"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
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
              הקונספט המרכזי
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              ״פנוי לקשר״ - זה לא מצב. זו <span className="text-accent">מיומנות</span>.
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              יש הבדל בין <strong>לרצות</strong> זוגיות לבין <strong>להיות פנוי</strong> לזוגיות.
              רוב האנשים שאומרים ״אני מחפש זוגיות״ בעצם לא באמת פנויים -
              לא בגלל שהם משקרים, אלא בגלל שמשהו חוסם אותם.
            </p>
            <p className="text-lg opacity-80 leading-relaxed mb-10">
              הליווי של אומנות הקשר מזהה את החסם ומפתח את הכלים לעבור
              ממצב של ״לא פנוי״ ל״פנוי לקשר״.
            </p>
            <Link
              href="/coaching"
              className="inline-flex px-10 py-4 bg-white text-secondary rounded-full font-semibold text-lg hover:bg-accent hover:text-secondary-dark transition-colors shadow-lg"
            >
              <GenderedText id="final-cta.free-call" />
            </Link>
          </div>
        </div>
      </section>

      {/* Free Workshop CTA Banner */}
      <FreeWorkshopBanner />

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">
                <GenderedText id="newsletter.want-free-tools" />
              </h2>
              <p className="text-muted-foreground mb-8">
                <GenderedText id="newsletter.join-cta" /> בלי ספאם, רק ערך אמיתי.
              </p>
              <NewsletterForm
                layout="stack"
                buttonLabel="שלח לי!"
                ariaLabel="הרשמה לרשימת תפוצה"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            הזוגיות שמגיעה לך לא תדפוק בדלת.
            <br />
            <span className="text-accent-light">אבל אם תצא לדרך - היא מחכה לך.</span>
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
            <GenderedText id="final-cta.body" />
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/coaching"
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              <GenderedText id="cta.free-call" />
            </Link>
            <Link
              href="/about"
              className="inline-flex px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              <GenderedText id="final-cta.read-more" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
