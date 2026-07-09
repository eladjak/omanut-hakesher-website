import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TestimonialCard } from "@/components/TestimonialCard";
import { testimonials, emailQuotes, whatsappShots, videos } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "סיפורי הצלחה אמיתיים | אומנות הקשר",
  description:
    "עדויות אמיתיות מתלמידים שעברו תהליך עם אלעד יעקובוביץ׳ — לחץ על כל עדות לסיפור המלא. 461 זוגות ועולה.",
  alternates: { canonical: "/sipurim" },
  openGraph: {
    title: "סיפורי הצלחה | אומנות הקשר",
    description:
      "עדויות מקוריות — לחץ על כל אחת לסיפור הנרחב. תמונות, ציטוטים, וידאו וצילומי וואטסאפ.",
    url: "/sipurim",
    locale: "he_IL",
    type: "website",
  },
};

const featured = testimonials.filter((t) => t.featured);
const couples = testimonials.filter((t) => t.category === "couple");
const graphics = testimonials.filter((t) => t.category === "graphic");

export default function SipurimPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "סיפורי הצלחה" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/30 via-secondary to-secondary-dark" />
        <div className="absolute top-1/4 right-1/4 size-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 size-72 rounded-full bg-primary/20 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <Badge className="mb-6 bg-accent text-accent-foreground border-0 px-4 py-1.5 text-sm">
            <span className="tabular-nums">461</span> זוגות ועולה
          </Badge>
          <h1 className="text-balance text-4xl md:text-6xl font-bold mb-6 leading-tight">
            הם כבר <span className="text-accent-light">מצאו</span>.
            <br />
            הסיפור הבא יכול להיות שלך.
          </h1>
          <p className="text-pretty text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            לחץ על כל עדות לסיפור המלא — תמונה, ציטוט, ולפעמים גם וידאו.
            בלי עריכה, בלי פילטרים.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-b border-border/40 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "461", label: "זוגות שנוצרו" },
              { number: "15+", label: "שנות ניסיון" },
              { number: "3", label: "חודשים ממוצע" },
              { number: "95%", label: "ממליצים" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-1 tabular-nums">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured (text testimonials) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-accent/40 text-accent-dark">
              מובילים
            </Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">
              עדויות <span className="text-primary">מובילות</span>
            </h2>
            <p className="text-pretty text-muted-foreground max-w-xl mx-auto">
              לחץ על כל עדות לסיפור המלא, ההקשר והעצה.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((t, i) => (
              <TestimonialCard key={t.slug} item={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Email quotes — authentic first-name stories from the email sequences */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
              מתוך המיילים
            </Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">
              סיפורים <span className="text-primary">שנכתבו לי</span>
            </h2>
            <p className="text-pretty text-muted-foreground max-w-xl mx-auto">
              שלוש עדויות מתוך סדרות המייל — בשם פרטי, כפי שנשלחו.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emailQuotes.map((q) => (
              <Card key={q.id} className="border-border/50 h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <span aria-hidden className="text-5xl text-primary/20 font-serif leading-none mb-3">
                    “
                  </span>
                  <blockquote className="text-sm leading-relaxed mb-4 text-pretty flex-1">
                    {q.quote}
                  </blockquote>
                  <Separator className="mb-4" />
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">{q.author.charAt(0)}</span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block text-sm">
                        {q.author}
                        {q.age ? `, ${q.age}` : ""}
                      </cite>
                      <span className="text-xs text-muted-foreground">
                        {q.occupation ? `${q.occupation} · ` : ""}
                        {q.context}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Couples */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
              זוגות שנוצרו
            </Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">
              הקשר שלהם <span className="text-primary">התחיל כאן</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {couples.map((t, i) => (
              <TestimonialCard key={t.slug} item={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Graphic testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-accent/40 text-accent-dark">
              עדויות מקוריות
            </Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">
              מי <span className="text-primary">עבר את התהליך</span>
            </h2>
            <p className="text-pretty text-muted-foreground max-w-xl mx-auto">
              לחץ על כל תמונה לדף נרחב — שמות מלאים, סיפור, וקריאה לפעולה.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphics.map((t, i) => (
              <TestimonialCard key={t.slug} item={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp gallery */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-accent/40 text-accent-dark">
              <span className="tabular-nums">{whatsappShots.length}</span> הודעות
            </Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">
              מה <span className="text-primary">כותבים לי</span> אחרי התהליך
            </h2>
            <p className="text-pretty text-muted-foreground max-w-xl mx-auto">
              צילומי מסך מוואטסאפ — לחץ להגדלה. פרטים מזהים מוסתרים.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {whatsappShots.map((w, i) => (
              <a
                key={w.id}
                href={w.image}
                target="_blank"
                rel="noopener"
                className="group rounded-xl overflow-hidden shadow-md border border-border/40 bg-card hover:shadow-xl transition-shadow focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                aria-label={`עדות לקוח ${i + 1} — צילום וואטסאפ (לחץ להגדלה)`}
              >
                <div className="relative aspect-[3/4] w-full bg-muted">
                  <Image
                    src={w.image}
                    alt={`עדות לקוח ${i + 1} — צילום וואטסאפ`}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
              עדויות בווידאו
            </Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-3">
              שמע <span className="text-primary">מהם ישירות</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((v) => (
              <div
                key={v.id}
                className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-border/40"
              >
                <iframe
                  src={v.embed}
                  title={v.title}
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
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 size-64 rounded-full bg-accent/15 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 size-48 rounded-full bg-secondary/20 translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-balance text-3xl md:text-5xl font-bold mb-5 leading-tight">
            הסיפור הבא{" "}
            <span className="text-accent-light">יכול להיות שלך</span>.
          </h2>
          <p className="text-pretty text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
            שיחת היכרות בת 30+ דקות, חינם, בלי התחייבות.
          </p>
          <Link
            href="/coaching"
            className="inline-flex items-center px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted hover:scale-[1.02] transition-all shadow-lg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            לשיחת היכרות חינם
          </Link>
        </div>
      </section>
    </>
  );
}
