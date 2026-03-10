"use client";

import { useCallback } from "react";
import { QuizForm } from "@/components/book/QuizForm";
import { storyQuizConfig } from "@/data/book/quizzes/story-quiz";
import type { QuizResultRange } from "@/lib/quiz-types";

const STORAGE_KEY = "omanut-story-quiz";

export function StoryQuizClient() {
  const handleComplete = useCallback(
    ({
      scores,
      result,
    }: {
      answers: Record<string, number | string>;
      scores: Record<string, number>;
      result: QuizResultRange;
    }) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            completedAt: new Date().toISOString(),
            scores,
            result: {
              title: result.title,
              emoji: result.emoji,
            },
          }),
        );
      } catch {
        // localStorage may be unavailable in some environments
      }
    },
    [],
  );

  return (
    <QuizForm
      config={storyQuizConfig}
      chapterSlug="1"
      onComplete={handleComplete}
    />
  );
}
