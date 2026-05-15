import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import testimonialsData from "@/data/testimonials.json";
import { TestimonialLightbox } from "@/components/TestimonialLightbox";

export const metadata: Metadata = {
  title: "סיפורי הצלחה | 461 זוגות כבר מצאו",
  description:
    "סיפורים אמיתיים של אנשים שעברו את התהליך עם אלעד יעקובוביץ׳ ומצאו את הזוגיות שחיכתה להם. 461 זוגות ועולה.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "סיפורי הצלחה | אומנות הקשר",
    description:
      "461 זוגות כבר מצאו אהבה. סיפורים אמיתיים של אנשים שעברו את התהליך ומצאו.",
    url: "/testimonials",
    locale: "he_IL",
    type: "website",
  },
};

const { graphic, whatsapp, video } = testimonialsData;
const featuredGraphic = graphic.filter((t) => t.featured);
const otherGraphic = graphic.filter((t) => !t.featured);
const featuredWhatsapp = whatsapp.filter(
  (t): t is typeof whatsapp[number] & { author: string; full_text: string; short_quote: string } =>
    Boolean((t as { full_text?: string }).full_text)
);

export default function TestimonialsPage() {
  return (
    <>
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
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-4 text-white border-white/30">
            461 זוגות ועולה
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-balance">
            הם כבר <span className="text-accent-light">מצאו</span>
          </h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto leading-relaxed text-pretty">
            סיפורים אמיתיים של אנשים שהיו בדיוק איפה שאתה עכשיו —
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
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1 tabular-nums">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Graphic Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              עדויות בוגרים אמיתיים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              הם <span className="text-primary">סיפרו</span> את הסיפור שלהם
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              כל עדות — אדם אמיתי, סיפור אמיתי, זוגיות אמיתית. לחצו על תמונה כדי לקרוא את הסיפור המלא.
            </p>
          </div>

          <TestimonialLightbox testimonials={graphic} />
        </div>
      </section>

      {/* Featured WhatsApp message */}
      {featuredWhatsapp.slice(0, 1).map((t) => (
        <section key={t.id} className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                הודעת WhatsApp אמיתית
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">
                מה כותבים <span className="text-primary">אחרי שנה</span>
              </h2>
            </div>

            <Card className="border-primary/20 shadow-xl">
              <CardContent className="p-8 md:p-10">
                <div className="text-5xl text-primary/30 font-serif leading-none mb-4">&ldquo;</div>
                <blockquote className="text-base md:text-lg leading-relaxed whitespace-pre-line text-pretty">
                  {t.full_text}
                </blockquote>
                <Separator className="my-6" />
                <div className="flex items-center gap-4">
                  <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-lg">{t.author.charAt(0)}</span>
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-lg block">{t.author}</cite>
                    <span className="text-sm text-muted-foreground">תכנית הדרך · בוגרת התוכנית</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      ))}

      {/* More WhatsApp Short Quotes */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">
              עוד <span className="text-primary">קולות מהקבוצה</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredWhatsapp.slice(1).map((t) => (
              <Card key={t.id} className="hover:shadow-md transition-shadow border-border/50 hover:border-primary/30 hover:-translate-y-0.5 transition-transform duration-200">
                <CardContent className="p-6">
                  <div className="text-4xl text-primary/20 font-serif leading-none mb-2">&ldquo;</div>
                  <blockquote className="text-sm leading-relaxed mb-4 text-pretty">
                    {t.short_quote}
                  </blockquote>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">{t.author.charAt(0)}</span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block text-sm">{t.author}</cite>
                      <span className="text-xs text-muted-foreground">תכנית הדרך</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Screenshot Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              צילומי מסך אמיתיים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              <span className="text-primary">ההודעות</span> בעצמן
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              צילומי מסך מקוריים מקבוצת תכנית הדרך — בלי עריכה, בלי פילטרים.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {whatsapp.map((t) => (
              <a
                key={t.id}
                href={t.image}
                target="_blank"
                rel="noopener"
                className="block rounded-xl overflow-hidden shadow-md border border-border/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`פתח עדות ${"author" in t ? t.author : "צילום חתונה"} בגודל מלא`}
              >
                <img
                  src={t.image}
                  alt={`עדות ${"author" in t ? t.author : "חתונה"}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
            <Image
              src="/images/generated/testimonials-wedding.jpg"
              alt="חתונה - זוג שמצא אהבה דרך אומנות הקשר"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              שמע <span className="text-primary">מהם ישירות</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {video.map((v) => (
              <div key={v.youtube_id} className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtube_id}`}
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
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 size-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 size-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-balance">
            הסיפור הבא
            <br />
            <span className="text-accent-light">יכול להיות שלך.</span>
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
            שיחת היכרות של 30+ דקות, בחינם, בלי התחייבות.
          </p>
          <Link
            href="/coaching"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            לשיחת היכרות חינם
          </Link>
        </div>
      </section>
    </>
  );
}
