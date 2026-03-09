import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentCard } from "./ContentCard";
import { ChapterPrevNext } from "./ChapterPrevNext";
import type { ChapterData } from "@/data/book/chapters";
import { getChapterDisplayNumber } from "@/data/book/chapters";

interface ChapterHubProps {
  chapter: ChapterData;
}

export function ChapterHub({ chapter }: ChapterHubProps) {
  const displayNumber = getChapterDisplayNumber(chapter);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: displayNumber },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 border-b border-border/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              {chapter.partTitle} • {displayNumber}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {chapter.title}
            </h1>
            {chapter.subtitle && (
              <p className="text-lg text-muted-foreground mb-4">
                {chapter.subtitle}
              </p>
            )}
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {chapter.description}
            </p>
            {chapter.story && (
              <p className="text-sm text-primary/70 italic mt-4">
                הסיפור של {chapter.story}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">תוכן נלווה לפרק</h2>
            <p className="text-sm text-muted-foreground">
              כלים, שאלונים ותרגילים שמשלימים את הקריאה
            </p>
          </div>

          <div className="grid gap-4">
            {chapter.tools.map((tool) => (
              <ContentCard
                key={tool.slug}
                tool={tool}
                chapterSlug={chapter.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      <ChapterPrevNext currentSlug={chapter.slug} />
    </>
  );
}
