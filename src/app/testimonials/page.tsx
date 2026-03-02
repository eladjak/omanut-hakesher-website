import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "סיפורי הצלחה | 461 זוגות כבר מצאו",
  description:
    "סיפורים אמיתיים של אנשים שעברו את התהליך עם אלעד יעקובוביץ׳ ומצאו את הזוגיות שחיכתה להם. 461 זוגות ועולה.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "סיפורי הצלחה | אומנות הקשר",
    description:
      "461 זוגות כבר מצאו אהבה. סיפורים אמיתיים של אנשים שעברו את התהליך ומצאו.",
    url: "/testimonials",
    locale: "he_IL",
    type: "website",
  },
};

interface Testimonial {
  quote: string;
  author: string;
  age?: number;
  occupation?: string;
  context: string;
  source: "coaching" | "course" | "book";
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "הגעתי לאלעד אחרי 5 שנים של דייטים כושלים. הייתי בטוח שמשהו לא בסדר איתי. תוך 3 חודשים הבנתי שהבעיה הייתה לא מה שחשבתי - למדתי שאני בורח מקרבה בגלל פחד מדחייה. היום אני נשוי כבר שנתיים לאישה הכי מדהימה שפגשתי.",
    author: "דני",
    age: 38,
    occupation: "מהנדס",
    context: "נשוי 2 שנים",
    source: "coaching",
    featured: true,
  },
  {
    quote:
      "ניסיתי הכל - אפליקציות, שדכנים, אירועים. שום דבר לא עבד. הליווי עם אלעד היה שונה לגמרי. הוא לא רק עזר לי להבין מה אני רוצה, אלא גם לימד אותי איך לתקשר את זה. פגשתי את בן זוגי אחרי חודשיים וחצי.",
    author: "מיכל",
    age: 34,
    occupation: "עורכת דין",
    context: "בזוגיות מאושרת",
    source: "coaching",
    featured: true,
  },
  {
    quote:
      "הייתי סקפטי בהתחלה. חשבתי שאני יודע הכל על דייטינג. אלעד הראה לי כמה דברים בסיסיים שפספסתי לגמרי. הייתה לי חברה תוך 6 שבועות. היום אנחנו גרים ביחד.",
    author: "אורי",
    age: 42,
    occupation: "יזם",
    context: "גרים ביחד",
    source: "coaching",
    featured: true,
  },
  {
    quote:
      "אחרי הגירושין הבנתי שאני צריך לעשות דברים אחרת. הליווי עם אלעד נתן לי את הכלים והביטחון. לא טיפול - דרך מעשית שעובדת.",
    author: "יואב",
    age: 38,
    occupation: "מנהל שיווק",
    context: "בזוגיות חדשה",
    source: "coaching",
  },
  {
    quote:
      "מגיעה כל שנתיים של דייטים אינסופיים, הייתי מותשת. כולם אומרים ׳את נפלאה, זה יגיע׳ - אבל אלעד נתן כלים, לא עידוד. וזה מה שהיה חסר.",
    author: "ענבל",
    age: 29,
    occupation: "מעצבת",
    context: "מאורסת",
    source: "coaching",
  },
  {
    quote:
      "אלעד לא מנחה ׳מלמעלה׳. הוא מדבר בגובה העיניים, ישר, בלי בולשיט. גישה שלגברים כמוני היה קשה למצוא בכל מקום אחר.",
    author: "נועם",
    age: 34,
    occupation: "מהנדס תוכנה",
    context: "מאורס",
    source: "coaching",
  },
  {
    quote:
      "הייתה לי בעיה שחזרה על עצמה - תמיד נמשכתי לאנשים לא זמינים. דרך הליווי הבנתי למה, ושיניתי את הדפוס. הבן זוג שלי היום הוא הכי זמין שיש.",
    author: "שרון",
    age: 31,
    occupation: "רואת חשבון",
    context: "בזוגיות שנה",
    source: "coaching",
  },
  {
    quote:
      "בגיל 45 חשבתי שזה כבר מאוחר מדי. אלעד הראה לי שזה בדיוק הגיל שבו יודעים מה רוצים - וזה יתרון. מצאתי את בת הזוג שלי אחרי 4 חודשים.",
    author: "משה",
    age: 45,
    occupation: "רופא",
    context: "בזוגיות מאושרת",
    source: "coaching",
  },
  {
    quote:
      "תוכנית הדרך שינתה לי את הראש. הבנתי למה כל הדייטים שלי נגמרים אחרי דייט שני. עכשיו אני בקשר כבר חצי שנה - שיא אישי.",
    author: "גיל",
    age: 33,
    occupation: "מתכנת",
    context: "בזוגיות 6 חודשים",
    source: "course",
  },
  {
    quote:
      "הגעתי מרקע דתי ועברתי למגזר חילוני. הרגשתי שאני לא מתאים לאף מקום. אלעד עזר לי למצוא את הזהות שלי ומשם - את הזוגיות.",
    author: "יונתן",
    age: 36,
    occupation: "מורה",
    context: "נשוי",
    source: "coaching",
  },
  {
    quote:
      "הספר של אלעד היה כמו מראה. ראיתי את עצמי בכל פרק. התרגילים בסוף כל פרק הם מה שעשה את ההבדל - לא רק קריאה, אלא עשייה.",
    author: "רונית",
    age: 28,
    occupation: "סטודנטית",
    context: "בזוגיות",
    source: "book",
  },
  {
    quote:
      "אחרי 3 שנים של רווקות חשבתי שאני מכירה את כל הטריקים. אלעד הפתיע אותי - הגישה שלו שונה מכל מה שניסיתי. ישירה, אמיתית, ובעיקר - עובדת.",
    author: "הדר",
    age: 32,
    occupation: "אדריכלית",
    context: "מאורסת",
    source: "coaching",
  },
];

const sourceLabels = {
  coaching: "ליווי אישי",
  course: "תוכנית הדרך",
  book: "הספר",
};

const sourceColors = {
  coaching: "bg-primary/10 text-primary",
  course: "bg-accent/10 text-accent-dark",
  book: "bg-secondary/10 text-secondary",
};

export default function TestimonialsPage() {
  const featured = testimonials.filter((t) => t.featured);
  const others = testimonials.filter((t) => !t.featured);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "סיפורי הצלחה" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/testimonials-hero.jpg"
            alt="סיפורי הצלחה - 461 זוגות"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-4 text-white border-white/30">
            461 זוגות ועולה
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            הם כבר <span className="text-accent-light">מצאו</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            סיפורים אמיתיים של אנשים שהיו בדיוק איפה שאתה עכשיו -
            ועשו את הצעד שהביא אותם לזוגיות
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { number: "461", label: "זוגות שנוצרו" },
              { number: "15+", label: "שנות ניסיון" },
              { number: "3", label: "חודשים ממוצע לזוגיות" },
              { number: "95%", label: "ממליצים לחברים" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              סיפורים <span className="text-primary">מובילים</span>
            </h2>
          </div>

          <div className="space-y-8">
            {featured.map((testimonial, index) => (
              <Card
                key={index}
                className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-all"
              >
                <CardContent className="p-8 md:p-10">
                  <div className="flex items-start gap-2 mb-4">
                    <Badge className={`text-xs ${sourceColors[testimonial.source]}`}>
                      {sourceLabels[testimonial.source]}
                    </Badge>
                  </div>
                  <div className="text-5xl text-primary/20 font-serif leading-none mb-4">
                    &ldquo;
                  </div>
                  <blockquote className="text-lg md:text-xl leading-relaxed mb-6">
                    {testimonial.quote}
                  </blockquote>
                  <Separator className="my-6" />
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold text-lg block">
                        {testimonial.author}
                        {testimonial.age ? `, ${testimonial.age}` : ""}
                      </cite>
                      <span className="text-sm text-muted-foreground">
                        {testimonial.occupation && `${testimonial.occupation} · `}
                        {testimonial.context}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              עוד סיפורי <span className="text-primary">הצלחה</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((testimonial, index) => (
              <Card
                key={index}
                className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`text-xs ${sourceColors[testimonial.source]}`}>
                      {sourceLabels[testimonial.source]}
                    </Badge>
                  </div>
                  <div className="text-4xl text-primary/20 font-serif leading-none mb-3">
                    &ldquo;
                  </div>
                  <blockquote className="text-sm leading-relaxed mb-4">
                    {testimonial.quote}
                  </blockquote>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block text-sm">
                        {testimonial.author}
                        {testimonial.age ? `, ${testimonial.age}` : ""}
                      </cite>
                      <span className="text-xs text-muted-foreground">
                        {testimonial.occupation && `${testimonial.occupation} · `}
                        {testimonial.context}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Testimonials - Real Screenshots */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              הודעות אמיתיות
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מה <span className="text-primary">כותבים לי</span> אחרי התהליך
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              צילומי מסך אמיתיים מוואטסאפ - ישירות מהלקוחות
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="rounded-xl overflow-hidden shadow-md border border-border/30">
                <img
                  src={`/assets/testimonials/whatsapp-${n}.jpg`}
                  alt={`עדות לקוח ${n} - הודעת וואטסאפ`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden">
            <Image
              src="/images/generated/testimonials-wedding.jpg"
              alt="חתונה - זוג שמצא אהבה דרך אומנות הקשר"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              עדויות בווידאו
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              שמע <span className="text-primary">מהם ישירות</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { id: "Kbd7BRJ25TM", title: "עדויות של מלווים" },
              { id: "chvsmJzcihE", title: "סיפורי הצלחה" },
            ].map((video) => (
              <div key={video.id} className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            הסיפור הבא
            <br />
            <span className="text-accent-light">יכול להיות שלך.</span>
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            שיחת היכרות של 30+ דקות, בחינם, בלי התחייבות.
          </p>
          <Link
            href="/coaching"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לשיחת היכרות חינם
          </Link>
        </div>
      </section>
    </>
  );
}
