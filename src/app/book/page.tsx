import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "הספר ״אומנות הקשר״ - הדרך לזוגיות שאתה ראוי לה",
  description:
    "הספר שמלמד את מה שלא לימדו אותך על זוגיות. 10 פרקים, 32 תרגילים מעשיים, וסיפורים אמיתיים של אנשים שעברו את הדרך. מאת אלעד יעקובוביץ׳.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "הספר ״אומנות הקשר״ | הדרך לזוגיות שאתה ראוי לה",
    description:
      "10 פרקים, 32 תרגילים מעשיים. הספר שמלמד את מה שלא לימדו אותך על זוגיות.",
    url: "/book",
    locale: "he_IL",
    type: "website",
  },
};

const chapters = [
  {
    number: 1,
    title: "מבפנים החוצה",
    subtitle: "הכרת עצמך האמיתית",
    description: "הבנת מי אתה באמת, מעבר לסיפורים שסיפרת לעצמך. כי לפני שמוצאים מישהו - צריך להכיר את עצמך.",
    story: "נועם, 34 - שהיה משוכנע ש׳כל הטובות תפוסות׳",
  },
  {
    number: 2,
    title: "הגבולות שמגנים עליך",
    subtitle: "גבולות בריאים בדרך לקשר",
    description: "איך לזהות מה באמת חשוב לך, ואיך לתקשר את זה - בלי להתנצל ובלי להתנגח.",
    story: "ענבל, 29 - שהייתה אומרת ׳כן׳ לכולם חוץ מלעצמה",
  },
  {
    number: 3,
    title: "הדפוסים שמחזיקים אותך",
    subtitle: "שבירת מעגלי חזרה",
    description: "זיהוי הדפוסים שחוזרים על עצמם בדייטים ובקשרים - ואיך לשבור אותם.",
    story: "יואב, 38 - שגילה שהוא מחפש את מה שאבא שלו רצה",
  },
  {
    number: 4,
    title: "14 הפחדים",
    subtitle: "מה באמת עוצר אותך",
    description: "מיפוי 14 הפחדים הנפוצים ביותר בדרך לזוגיות - ואיך לעבוד איתם במקום נגדם.",
  },
  {
    number: 5,
    title: "השריון שלך",
    subtitle: "פגיעות ככוח",
    description: "למה ההגנות שבנית בדיוק מה שמרחיק ממך את הזוגיות, ואיך להוריד אותן בזהירות.",
    story: "עידו, 36 - שהפסיק ללבוש את ׳חליפת השריון׳ שלו",
  },
  {
    number: 6,
    title: "לצאת לדרך",
    subtitle: "כלים מעשיים לדייטינג",
    description: "כל מה שצריך לדעת על דייטינג - מפרופיל מנצח ועד שיחה ראשונה שיוצרת חיבור אמיתי.",
    story: "דנה, 33 - שיום אחד החליטה שהיא לא צריכה לחכות שיפנו אליה",
  },
  {
    number: 7,
    title: "מעבר לפרופיל",
    subtitle: "אותנטיות באונליין",
    description: "איך להציג את עצמך באמת באפליקציות - בלי לשחק תפקיד ובלי לאבד את עצמך.",
    story: "רון, 30 - שהיה עם הפרופיל הכי יפה והתוצאות הכי גרועות",
  },
  {
    number: 8,
    title: "שפת החיבור",
    subtitle: "תקשורת שיוצרת קרבה",
    description: "איך לדבר ככה שנשמעים. איך להקשיב ככה שהשני מרגיש שרואים אותו. שפת אינטימיות.",
    story: "שירה, 27 - שהייתה מגיעה לדייטים עם רשימת שאלות בראש",
  },
  {
    number: 9,
    title: "מעבר לכימיה",
    subtitle: "כשהרגש מגיע אחרי",
    description: "למה כימיה מיידית זה לא סימן טוב, ואיך לזהות חיבור אמיתי שנבנה לאט.",
    story: "אורי ולירון - שלא הייתה כימיה מיידית, ובדיוק בגלל זה זה עבד",
  },
  {
    number: 10,
    title: "בניית קשר אמיתי",
    subtitle: "מחויבות, החלטה, שמירה",
    description: "מה קורה אחרי שמוצאים? איך בונים קשר שנשמר ומתחזק - בלי לאבד את עצמך בדרך.",
    story: "תמר ואיתי - שכמעט פרשו כי ׳הכל היה מושלם מדי׳",
  },
];

const bookStats = [
  { number: "10", label: "פרקים" },
  { number: "32", label: "תרגילים מעשיים" },
  { number: "250+", label: "עמודים" },
  { number: "9", label: "סיפורי חיים אמיתיים" },
];

export default function BookPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "הספר" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
                הספר החדש
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                אומנות הקשר
              </h1>
              <p className="text-2xl text-primary font-medium mb-6">
                הדרך לזוגיות שאתה ראוי לה
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                הספר שמלמד את מה שלא לימדו אותך על זוגיות. לא עוד ״תהיה עצמך״
                ו-״זה יגיע כשתפסיק לחפש״. אלא דרך מובנית, מעשית, שעובדת -
                מבוססת על עבודה עם מאות אנשים שעברו את התהליך ומצאו.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <span className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                  10 פרקים
                </span>
                <span className="text-sm bg-accent/10 text-accent-dark px-3 py-1.5 rounded-full">
                  32 תרגילים
                </span>
                <span className="text-sm bg-secondary/10 text-secondary px-3 py-1.5 rounded-full">
                  9 סיפורים אמיתיים
                </span>
              </div>

              <blockquote className="border-r-4 border-primary/30 pr-4 text-muted-foreground italic mb-8">
                &ldquo;אני לא הולך לספר לך מה שנעים לשמוע. אני הולך לספר לך מה שצריך לשמוע.
                ישירות, בלי בולשיט.&rdquo;
                <cite className="block not-italic text-sm mt-2 text-foreground font-medium">
                  - אלעד יעקובוביץ׳
                </cite>
              </blockquote>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
                >
                  רוצה לשמוע כשיוצא
                </Link>
                <Link
                  href="/hadrech"
                  className="inline-flex px-8 py-3.5 border-2 border-primary/30 text-primary rounded-full font-semibold hover:bg-primary/5 transition-colors"
                >
                  בינתיים - תוכנית הדרך
                </Link>
              </div>
            </div>

            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-[430px] bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-2xl shadow-2xl flex items-center justify-center border border-border/30">
                  <div className="text-center px-8">
                    <div className="text-6xl mb-4">📖</div>
                    <h3 className="text-2xl font-bold mb-2">אומנות הקשר</h3>
                    <Separator className="my-3 bg-primary/20" />
                    <p className="text-sm text-muted-foreground">הדרך לזוגיות שאתה ראוי לה</p>
                    <p className="text-xs text-muted-foreground mt-4">אלעד יעקובוביץ׳</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/20 rounded-full blur-xl" />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {bookStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              למי הספר מיועד
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              הספר הזה <span className="text-primary">בשבילך</span> אם...
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "כבר שנים שאתה יוצא לדייטים ושום דבר לא מתקדם",
              "הכל בחיים מסתדר - חוץ מהזוגיות",
              "עברת פרידה קשה ולא בטוח איך להתחיל מחדש",
              "מרגיש שמשהו חוסם אותך אבל לא יודע מה",
              "קראת כבר ספרים וטיפים - אבל שום דבר לא עבד",
              "רוצה דרך מעשית, לא רק ״תהיה עצמך״",
            ].map((item, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-5 flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm leading-relaxed">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              תוכן עניינים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              10 פרקים. דרך <span className="text-primary">שלמה</span>.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              כל פרק כולל תרגילים מעשיים וסיפור אמיתי של מישהו שעבר את הדרך
            </p>
          </div>

          <div className="space-y-4">
            {chapters.map((chapter) => (
              <Card key={chapter.number} className="border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-lg">{chapter.number}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <h3 className="text-lg font-bold">{chapter.title}</h3>
                        <span className="text-sm text-muted-foreground">- {chapter.subtitle}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        {chapter.description}
                      </p>
                      {chapter.story && (
                        <p className="text-xs text-primary/70 italic">
                          הסיפור של {chapter.story}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Promises */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              ההתחייבות שלי
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              שלוש הבטחות <span className="text-primary">לקורא</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "אמת",
                description:
                  "אני לא הולך לספר לך מה שנעים לשמוע. אני הולך לספר לך מה שצריך לשמוע. ישירות, בלי בולשיט.",
              },
              {
                icon: "🔧",
                title: "כלים",
                description:
                  "כל פרק כולל משהו שאפשר לעשות מחר בבוקר. לא תיאוריה מופשטת - 32 תרגילים שעובדים.",
              },
              {
                icon: "🤝",
                title: "כבוד",
                description:
                  "אני לא הולך להטיף לך. הגעת לכאן כי אתה רוצה לשנות משהו - וזה לבד כבר אומר על הערך שלך.",
              },
            ].map((promise, index) => (
              <Card key={index} className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{promise.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{promise.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {promise.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Excerpt */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              טעימה מהספר
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              מתוך <span className="text-primary">ההקדמה</span>
            </h2>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-8 md:p-12">
              <div className="text-5xl text-primary/20 font-serif leading-none mb-4">&ldquo;</div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  אני לא פסיכולוג. לא מטפל זוגי עם תואר שלישי. לא חוקר אקדמי שפרסם מאמרים
                  בכתבי עת. ואם אני ממש כנה - גם אני עשיתי את כל הטעויות שהספר שלי מלמד
                  להימנע מהן.
                </p>
                <p>
                  לפני שנים, ישבתי לבד בדירה שכורה בתל אביב, אחרי עוד פרידה, עוד דייט כושל,
                  עוד תקופה של &ldquo;אולי עכשיו זה יקרה&rdquo;. הייתי בשיא הקריירה. חברים טובים,
                  תחביבים, כושר גופני - על הנייר, הכל היה מושלם. חוץ מהדבר הזה. הזוגיות.
                </p>
                <p>
                  ואז הבנתי משהו שנשמע ברור כמו אור יום: הבעיה הייתה לא מה שעשיתי -
                  אלא מה שלא הבנתי על עצמי.
                </p>
              </div>
              <div className="text-left mt-6">
                <cite className="not-italic text-sm font-medium text-foreground">
                  - אלעד יעקובוביץ׳, מתוך ההקדמה
                </cite>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            הספר בדרך אליך.
            <br />
            <span className="text-accent-light">בינתיים - יש דרך להתחיל כבר עכשיו.</span>
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            שיחת היכרות של 30+ דקות, בחינם, בלי התחייבות.
            נבין ביחד איפה אתה עומד ומה הצעד הבא בשבילך.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/coaching"
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              לשיחת היכרות חינם
            </Link>
            <Link
              href="/hadrech"
              className="inline-flex px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              גלה את תוכנית הדרך
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
