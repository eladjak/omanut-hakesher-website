"use client";

import { QuizForm } from "../QuizForm";
import { attachmentQuizConfig } from "@/data/book/quizzes/attachment-quiz";

export function AttachmentQuizClient() {
  return <QuizForm config={attachmentQuizConfig} chapterSlug="5" />;
}
