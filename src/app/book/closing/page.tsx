import type { Metadata } from "next";
import { getChapterBySlug } from "@/data/book/chapters";
import { ChapterHub } from "@/components/book/ChapterHub";

export const metadata: Metadata = {
  title: "חוקי הזוגיות | הספר - אומנות הקשר",
  description:
    "10 עקרונות GPS לזוגיות ארוכת טווח. סיכום כל מה שלמדנו, ומכתב לעתיד.",
  alternates: { canonical: "/book/closing" },
  openGraph: {
    title: "חוקי הזוגיות - סיום | הספר - אומנות הקשר",
    description: "10 עקרונות GPS לזוגיות ארוכת טווח.",
    url: "/book/closing",
    locale: "he_IL",
    type: "website",
  },
};

export default function ClosingPage() {
  const chapter = getChapterBySlug("closing")!;
  return <ChapterHub chapter={chapter} />;
}
