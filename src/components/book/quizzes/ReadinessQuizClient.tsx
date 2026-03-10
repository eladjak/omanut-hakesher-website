"use client";

import { QuizForm } from "../QuizForm";
import { readinessQuizConfig } from "@/data/book/quizzes/readiness-quiz";

export function ReadinessQuizClient() {
  return <QuizForm config={readinessQuizConfig} chapterSlug="intro" />;
}
