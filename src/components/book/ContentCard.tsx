import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ChapterTool } from "@/data/book/chapters";

const typeLabels: Record<ChapterTool["type"], string> = {
  quiz: "שאלון",
  audio: "תרגיל מודרך",
  video: "סרטון",
  pdf: "להורדה",
  interactive: "כלי אינטראקטיבי",
};

const typeColors: Record<ChapterTool["type"], string> = {
  quiz: "bg-primary/10 text-primary border-primary/20",
  audio: "bg-accent/10 text-accent-dark border-accent/20",
  video: "bg-secondary/10 text-secondary border-secondary/20",
  pdf: "bg-muted text-muted-foreground border-border/50",
  interactive: "bg-chart-3/10 text-chart-3 border-chart-3/20",
};

interface ContentCardProps {
  tool: ChapterTool;
  chapterSlug: string;
}

export function ContentCard({ tool, chapterSlug }: ContentCardProps) {
  const href = `/book/${chapterSlug}/${tool.slug}`;

  if (tool.comingSoon) {
    return (
      <Card className="border-border/50 opacity-60 cursor-default">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <span className="text-2xl" aria-hidden="true">
              {tool.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm">{tool.title}</h3>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  בקרוב
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
              <Badge
                variant="outline"
                className={`mt-2 text-[10px] ${typeColors[tool.type]}`}
              >
                {typeLabels[tool.type]}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={href}>
      <Card className="border-border/50 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <span
              className="text-2xl group-hover:scale-110 transition-transform"
              aria-hidden="true"
            >
              {tool.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
              <Badge
                variant="outline"
                className={`mt-2 text-[10px] ${typeColors[tool.type]}`}
              >
                {typeLabels[tool.type]}
              </Badge>
            </div>
            <svg
              className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 rotate-180"
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
