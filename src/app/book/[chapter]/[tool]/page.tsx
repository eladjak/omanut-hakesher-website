import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { chapters, getChapterBySlug, getChapterDisplayNumber } from "@/data/book/chapters";

type Props = {
  params: Promise<{ chapter: string; tool: string }>;
};

export function generateStaticParams() {
  const params: { chapter: string; tool: string }[] = [];
  for (const chapter of chapters) {
    if (chapter.slug === "intro" || chapter.slug === "closing") continue;
    for (const tool of chapter.tools) {
      params.push({ chapter: chapter.slug, tool: tool.slug });
    }
  }
  return params;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { chapter: chapterSlug, tool: toolSlug } = await props.params;
  const chapter = getChapterBySlug(chapterSlug);
  if (!chapter) return {};

  const tool = chapter.tools.find((t) => t.slug === toolSlug);
  if (!tool) return {};

  return {
    title: `${tool.title} | ${getChapterDisplayNumber(chapter)}`,
    description: tool.description,
  };
}

export default async function ToolPage(props: Props) {
  const { chapter: chapterSlug, tool: toolSlug } = await props.params;
  const chapter = getChapterBySlug(chapterSlug);

  if (!chapter) {
    notFound();
  }

  const tool = chapter.tools.find((t) => t.slug === toolSlug);
  if (!tool) {
    notFound();
  }

  const displayNumber = getChapterDisplayNumber(chapter);

  // For tools that are coming soon, show a placeholder
  if (tool.comingSoon) {
    return (
      <>
        <div className="bg-muted/50 border-b border-border/30">
          <Breadcrumbs
            items={[
              { label: "הספר", href: "/book" },
              { label: displayNumber, href: `/book/${chapter.slug}` },
              { label: tool.title },
            ]}
          />
        </div>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <span className="text-6xl mb-6 block">{tool.icon}</span>
            <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {tool.description}
            </p>
            <Badge variant="outline" className="text-sm px-4 py-1.5 mb-8">
              בקרוב
            </Badge>
            <p className="text-sm text-muted-foreground mb-8">
              התוכן הזה עדיין בפיתוח. בינתיים, חזור לפרק וגלה את שאר הכלים.
            </p>
            <Link
              href={`/book/${chapter.slug}`}
              className="inline-flex px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
            >
              חזרה ל{displayNumber}
            </Link>
          </div>
        </section>
      </>
    );
  }

  // For active tools - this will be replaced by specific tool components
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: displayNumber, href: `/book/${chapter.slug}` },
            { label: tool.title },
          ]}
        />
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Badge
            variant="outline"
            className="mb-4 text-primary border-primary/30"
          >
            {displayNumber} • {tool.title}
          </Badge>
          <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {tool.description}
          </p>

          <Card className="border-border/50">
            <CardContent className="p-8 text-center">
              <span className="text-5xl mb-4 block">{tool.icon}</span>
              <p className="text-muted-foreground">
                הכלי הזה זמין לקוראי הספר. הזן את קוד הגישה שלך כדי להתחיל.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
