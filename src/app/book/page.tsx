import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { chapters as chapterData } from "@/data/book/chapters";

export const metadata: Metadata = {
  title: "הספר ״אומנות הקשר״ - הדרך לזוגיות שאתה ראוי לה",
  description:
    "הספר שמלמד את מה שלא לימדו אותך על זוגיות. 13 פרקים, 32 תרגילים מעשיים, וסיפורים אמיתיים של אנשים שעברו את הדרך. מאת אלעד יעקובוביץ׳.",
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

const bookStats = [
  { number: "13", label: "פרקים" },
  { number: "32+", label: "תרגילים מעשיים" },
  { number: "300+", label: "עמודים" },
  { number: "10+", label: "סיפורי חיים אמיתיים" },
];

export default function BookPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "הספר" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/book-hero.jpg"
            alt='הספר "אומנות הקשר"'
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <Badge variant="outline" className="mb-4 text-white border-white/30">
                הספר החדש
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
                אומנות הקשר
              </h1>
              <p className="text-2xl text-accent-light font-medium mb-6">
                הדרך לזוגיות שאתה ראוי לה
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                הספר שמלמד את מה שלא לימדו אותך על זוגיות. לא עוד ״תהיה עצמך״
                ו-״זה יגיע כשתפסיק לחפש״. אלא דרך מובנית, מעשית, שעובדת -
                מבוססת על עבודה עם מאות אנשים שעברו את התהליך ומצאו.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <span className="text-sm bg-white/20 text-white px-3 py-1.5 rounded-full">
                  13 פרקים
                </span>
                <span className="text-sm bg-white/20 text-white px-3 py-1.5 rounded-full">
                  32 תרגילים
                </span>
                <span className="text-sm bg-white/20 text-white px-3 py-1.5 rounded-full">
                  9 סיפורים אמיתיים
                </span>
              </div>

              <blockquote className="border-r-4 border-white/40 pr-4 text-white/80 italic mb-8">
                &ldquo;אני לא הולך לספר לך מה שנעים לשמוע. אני הולך לספר לך מה שצריך לשמוע.
                ישירות, בלי בולשיט.&rdquo;
                <cite className="block not-italic text-sm mt-2 text-white font-medium">
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
                  className="inline-flex px-8 py-3.5 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  בינתיים - תוכנית הדרך
                </Link>
              </div>
            </div>

            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-[430px] rounded-2xl shadow-2xl overflow-hidden">
                  <Image
                    src="/images/generated/book-cover.jpg"
                    alt='כריכת הספר "אומנות הקשר - הדרך לזוגיות שאתה ראוי לה"'
                    fill
                    className="object-cover"
                    priority
                  />
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

      {/* Book Reading Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden">
            <Image
              src="/images/generated/book-reading.jpg"
              alt="קוראים את הספר אומנות הקשר"
              fill
              className="object-cover"
            />
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
              13 פרקים. דרך <span className="text-primary">שלמה</span>.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              כל פרק כולל תרגילים מעשיים וסיפור אמיתי של מישהו שעבר את הדרך
            </p>
          </div>

          <div className="space-y-4">
            {chapterData
              .filter((ch) => ch.number !== null)
              .map((chapter) => (
              <Link key={chapter.slug} href={`/book/${chapter.slug}`}>
                <Card className="border-border/50 hover:border-primary/20 hover:shadow-md transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <span className="text-primary font-bold text-lg">{chapter.number}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{chapter.title}</h3>
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
                        {chapter.tools.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {chapter.tools.map((tool) => (
                              <span key={tool.slug} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                                {tool.icon} {tool.title}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <svg
                        className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0 rotate-180 mt-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "אמת",
                description:
                  "אני לא הולך לספר לך מה שנעים לשמוע. אני הולך לספר לך מה שצריך לשמוע. ישירות, בלי בולשיט.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "כלים",
                description:
                  "כל פרק כולל משהו שאפשר לעשות מחר בבוקר. לא תיאוריה מופשטת - 32 תרגילים שעובדים.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "כבוד",
                description:
                  "אני לא הולך להטיף לך. הגעת לכאן כי אתה רוצה לשנות משהו - וזה לבד כבר אומר על הערך שלך.",
              },
            ].map((promise, index) => (
              <Card key={index} className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                    {promise.icon}
                  </div>
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
