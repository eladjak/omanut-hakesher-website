"use client";

import { QuizForm } from "../QuizForm";
import { readinessQuizConfig } from "@/data/book/quizzes/readiness-quiz";
import { saveReadinessScores } from "@/data/book/quizzes/readiness-retest";

export function ReadinessQuizClient() {
  return (
    <QuizForm
      config={readinessQuizConfig}
      chapterSlug="intro"
      onComplete={({ scores }) => saveReadinessScores(scores, "before")}
    />
  );
}
