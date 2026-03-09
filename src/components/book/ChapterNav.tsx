"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapters, getChapterDisplayNumber } from "@/data/book/chapters";
import type { ChapterData } from "@/data/book/chapters";

function ChapterNavItem({ chapter, isActive }: { chapter: ChapterData; isActive: boolean }) {
  const displayNumber = getChapterDisplayNumber(chapter);
  const href = `/book/${chapter.slug}`;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {chapter.number ?? (chapter.slug === "intro" ? "⟫" : "⟪")}
      </span>
      <span className="truncate">{displayNumber}: {chapter.title}</span>
    </Link>
  );
}

export function ChapterNav() {
  const pathname = usePathname();

  // Extract current chapter slug from path
  const segments = pathname.split("/").filter(Boolean);
  const currentSlug = segments[1] || "";

  return (
    <nav aria-label="ניווט פרקים" className="space-y-1">
      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        פרקי הספר
      </div>
      {chapters.map((chapter) => (
        <ChapterNavItem
          key={chapter.slug}
          chapter={chapter}
          isActive={currentSlug === chapter.slug}
        />
      ))}
    </nav>
  );
}
