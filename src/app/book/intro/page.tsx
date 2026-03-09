import type { Metadata } from "next";
import { getChapterBySlug } from "@/data/book/chapters";
import { ChapterHub } from "@/components/book/ChapterHub";

export const metadata: Metadata = {
  title: "פתח דבר | הספר - אומנות הקשר",
  description:
    "ההקדמה שמסבירה למה הספר הזה שונה מכל מה שקראת, ואיך להפיק ממנו את המקסימום.",
  alternates: { canonical: "/book/intro" },
  openGraph: {
    title: "פתח דבר | הספר - אומנות הקשר",
    description: "ההקדמה שמסבירה למה הספר הזה שונה מכל מה שקראת.",
    url: "/book/intro",
    locale: "he_IL",
    type: "website",
  },
};

export default function IntroPage() {
  const chapter = getChapterBySlug("intro")!;
  return <ChapterHub chapter={chapter} />;
}
