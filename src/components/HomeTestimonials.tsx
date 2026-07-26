import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TestimonialCard } from "@/components/TestimonialCard";
import { testimonials } from "@/lib/testimonials";

/**
 * Real testimonials only.
 *
 * This section used to render six invented-looking persona quotes (named
 * people with ages and occupations, no image and no verifiable source).
 * It now surfaces the genuine testimonials from `src/data/testimonials.json`
 * — the same items already published on /sipurim, rendered with the shared
 * TestimonialCard so the homepage and the stories page stay consistent.
 *
 * The `couple` category is deliberately excluded here: those images are
 * private personal photos of real couples rather than testimony they
 * composed for publication, so they stay on /sipurim and are not promoted
 * to the homepage.
 */
const homeTestimonials = [
  ...testimonials.filter((t) => t.category === "text" && t.featured),
  ...testimonials.filter((t) => t.category === "graphic"),
].slice(0, 6);

export function HomeTestimonials() {
  if (homeTestimonials.length === 0) return null;

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            עדויות אמיתיות של תלמידים
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            הם כבר <span className="text-primary">מצאו</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            סיפורים של אנשים שעברו את התהליך ומצאו את הזוגיות שחיכתה להם — בשמם
            ובקולם שלהם.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeTestimonials.map((item, index) => (
            <TestimonialCard key={item.slug} item={item} index={index} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/sipurim"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-sm"
          >
            לכל סיפורי ההצלחה
            <span aria-hidden style={{ transform: "scaleX(-1)" }}>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
