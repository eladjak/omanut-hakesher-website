import Link from "next/link";
import { getAdjacentChapters, getChapterDisplayNumber } from "@/data/book/chapters";

interface ChapterPrevNextProps {
  currentSlug: string;
}

export function ChapterPrevNext({ currentSlug }: ChapterPrevNextProps) {
  const { prev, next } = getAdjacentChapters(currentSlug);

  if (!prev && !next) return null;

  return (
    <section className="py-8 border-t border-border/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/book/${prev.slug}`}
              className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="text-right">
                <div className="text-xs text-muted-foreground/70">הפרק הקודם</div>
                <div className="font-medium">
                  {getChapterDisplayNumber(prev)}: {prev.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/book/${next.slug}`}
              className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors text-left"
            >
              <div>
                <div className="text-xs text-muted-foreground/70">הפרק הבא</div>
                <div className="font-medium">
                  {getChapterDisplayNumber(next)}: {next.title}
                </div>
              </div>
              <svg
                className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
