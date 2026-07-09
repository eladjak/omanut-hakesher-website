import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  getAllSlugs,
  getTestimonial,
  testimonials,
  categoryLabel,
  type TestimonialItem,
} from "@/lib/testimonials";
import { TestimonialDetailMotion } from "./detail-motion";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getTestimonial(slug);
  if (!item) return { title: "סיפור לא נמצא | אומנות הקשר" };

  return {
    title: `${item.name} — ${item.title} | אומנות הקשר`,
    description: item.short_quote,
    alternates: { canonical: `/sipurim/${item.slug}` },
    openGraph: {
      title: `${item.name} — סיפור הצלחה`,
      description: item.short_quote,
      url: `/sipurim/${item.slug}`,
      images: [{ url: item.image, alt: `עדות לקוח — ${item.name}` }],
      locale: "he_IL",
      type: "article",
    },
  };
}

function getRelated(current: TestimonialItem): TestimonialItem[] {
  return testimonials
    .filter((t) => t.slug !== current.slug && t.category === current.category)
    .slice(0, 3);
}

const ctaLabels: Record<string, string> = {
  "/coaching": "לליווי אישי עם אלעד",
  "/hadrech": "לתוכנית הדרך",
  "/book": "להזמנת הספר",
  "/contact": "לשיחת היכרות חינם",
};

export default async function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getTestimonial(slug);
  if (!item) notFound();

  const related = getRelated(item);
  const ctaLabel = ctaLabels[item.cta_target] ?? "לשיחת היכרות חינם";

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Service",
      name: "אומנות הקשר — ליווי אישי לזוגיות",
      provider: {
        "@type": "Person",
        name: "אלעד יעקובוביץ׳",
      },
    },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: item.name },
    reviewBody: item.full_text ?? item.short_quote,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />

      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "סיפורי הצלחה", href: "/sipurim" },
            { label: item.name },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-bl from-secondary via-secondary to-secondary-dark text-white">
        <div className="absolute top-1/4 right-0 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 size-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <TestimonialDetailMotion>
            <Badge className="mb-6 bg-accent text-accent-foreground border-0 px-4 py-1.5 text-sm">
              {categoryLabel(item.category)}
            </Badge>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {item.name}
            </h1>
            <p className="text-pretty text-lg md:text-xl text-white/85 mb-2">
              {item.title}
            </p>
            <p className="text-pretty text-base md:text-lg text-accent-light italic max-w-2xl">
              “{item.short_quote}”
            </p>
          </TestimonialDetailMotion>
        </div>
      </section>

      {/* Body — image + story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div
            className={`grid gap-10 ${
              item.category === "text" ? "md:grid-cols-[260px_1fr]" : "lg:grid-cols-2"
            } items-start`}
          >
            <div
              className={`relative w-full bg-muted rounded-2xl overflow-hidden shadow-xl border border-border/40 ${
                item.category === "text"
                  ? "aspect-square max-w-[260px] mx-auto"
                  : "aspect-[4/5]"
              }`}
            >
              <Image
                src={item.image}
                alt={`עדות לקוח — ${item.name}`}
                fill
                sizes="(max-width:1024px) 100vw, 600px"
                className={
                  item.category === "text"
                    ? "object-cover"
                    : "object-contain object-top"
                }
                priority
              />
            </div>

            <div>
              {item.full_text && (
                <blockquote className="relative pr-8 mb-8">
                  <span
                    aria-hidden
                    className="absolute top-0 right-0 text-6xl text-primary/20 font-serif leading-none"
                  >
                    “
                  </span>
                  <p className="text-balance text-xl md:text-2xl leading-relaxed text-foreground/90">
                    {item.full_text}
                  </p>
                </blockquote>
              )}

              <h2 className="text-2xl font-bold mb-3 text-primary">הסיפור</h2>
              <p className="text-pretty text-base md:text-lg leading-relaxed text-foreground/85 mb-8">
                {item.context}
              </p>

              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
                <h3 className="text-lg font-bold mb-2">רוצה את הסיפור הבא להיות שלך?</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  שיחת היכרות של 30+ דקות, חינם, בלי התחייבות.
                </p>
                <Link
                  href={item.cta_target}
                  className="inline-flex items-center px-7 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-dark hover:scale-[1.02] transition-all shadow-md focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-muted/40 border-t border-border/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-balance text-2xl md:text-3xl font-bold mb-3">
                עוד <span className="text-primary">סיפורים דומים</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/sipurim/${r.slug}`}
                  prefetch
                  className="group block rounded-2xl overflow-hidden bg-card border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  aria-label={`קרא את הסיפור של ${r.name}`}
                >
                  <div
                    className={`relative w-full bg-muted ${
                      r.aspect === "portrait" ? "aspect-[4/5]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={r.image}
                      alt={`עדות לקוח — ${r.name}`}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className={`${
                        r.category === "text" ? "object-cover" : "object-contain object-top"
                      } transition-transform duration-300 group-hover:scale-[1.03]`}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {r.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/sipurim"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded"
              >
                <span aria-hidden style={{ transform: "scaleX(-1)" }}>
                  →
                </span>
                <span>לכל סיפורי ההצלחה</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
