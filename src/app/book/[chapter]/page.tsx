import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chapters, getChapterBySlug, getChapterDisplayNumber } from "@/data/book/chapters";
import { ChapterHub } from "@/components/book/ChapterHub";

type Props = {
  params: Promise<{ chapter: string }>;
};

export function generateStaticParams() {
  return chapters
    .filter((c) => c.slug !== "intro" && c.slug !== "closing")
    .map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { chapter: slug } = await props.params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return {};

  const displayNumber = getChapterDisplayNumber(chapter);
  return {
    title: `${displayNumber}: ${chapter.title}`,
    description: chapter.description,
    alternates: { canonical: `/book/${slug}` },
    openGraph: {
      title: `${displayNumber}: ${chapter.title} | הספר - אומנות הקשר`,
      description: chapter.description,
      url: `/book/${slug}`,
      locale: "he_IL",
      type: "website",
    },
  };
}

export default async function ChapterPage(props: Props) {
  const { chapter: slug } = await props.params;

  // Prevent dynamic route from matching intro/closing (they have static routes)
  if (slug === "intro" || slug === "closing") {
    notFound();
  }

  const chapter = getChapterBySlug(slug);
  if (!chapter) {
    notFound();
  }

  return <ChapterHub chapter={chapter} />;
}
