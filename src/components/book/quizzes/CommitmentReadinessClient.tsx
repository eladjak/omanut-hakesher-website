"use client";

import { QuizForm } from "../QuizForm";
import { commitmentReadinessConfig } from "@/data/book/quizzes/commitment-readiness";

const STORAGE_KEY = "omanut-commitment-readiness";

function saveResult(scores: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ scores, timestamp: new Date().toISOString() }),
    );
  } catch {
    // localStorage unavailable
  }
}

export function CommitmentReadinessClient() {
  return (
    <QuizForm
      config={commitmentReadinessConfig}
      chapterSlug="13"
      onComplete={({ scores }) => saveResult(scores)}
    />
  );
}
