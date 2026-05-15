import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import testimonialsData from "@/data/testimonials.json";

const graphic = testimonialsData.graphic;
const featured = graphic.filter((t) => t.featured).slice(0, 2);
const others = graphic.filter((t) => !t.featured).slice(0, 4);

export function HomeTestimonials() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            461 זוגות ועולה
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            הם כבר <span className="text-primary">מצאו</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            סיפורים אמיתיים של בוגרי התוכנית — לא ציטוטים מומצאים, אנשים אמיתיים שהתחתנו ומצאו אהבה.
          </p>
        </div>

        {/* Featured testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-5xl mx-auto">
          {featured.map((t) => (
            <Card
              key={t.id}
              className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-8">
                <div className="text-5xl text-primary/20 font-serif leading-none mb-4">
                  &ldquo;
                </div>
                <blockquote className="text-lg leading-relaxed mb-6 text-pretty">
                  {t.image_quote}
                </blockquote>
                <Separator className="my-4" />
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">{t.author.charAt(0)}</span>
                  </div>
                  <div>
                    <cite className="not-italic font-semibold block">{t.author}</cite>
                    <span className="text-sm text-muted-foreground">{t.outcome || t.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {others.map((t) => (
            <Card
              key={t.id}
              className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="text-4xl text-primary/20 font-serif leading-none mb-3">
                  &ldquo;
                </div>
                <blockquote className="text-sm leading-relaxed mb-4 text-pretty">
                  {t.image_quote}
                </blockquote>
                <Separator className="my-4" />
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{t.author.charAt(0)}</span>
                  </div>
                  <div>
                    <cite className="not-italic font-semibold block text-sm">{t.author}</cite>
                    <span className="text-xs text-muted-foreground">{t.outcome || ""}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-3 py-1"
          >
            לכל סיפורי ההצלחה
            <span aria-hidden="true">&larr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
