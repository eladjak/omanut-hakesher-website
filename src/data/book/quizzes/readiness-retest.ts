import type { QuizConfig } from "@/lib/quiz-types";
import { readinessQuizConfig } from "./readiness-quiz";

const STORAGE_KEY = "omanut-readiness-scores";

export function saveReadinessScores(
  scores: Record<string, number>,
  phase: "before" | "after",
) {
  if (typeof window === "undefined") return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    existing[phase] = { scores, timestamp: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable
  }
}

export function getReadinessScores(): {
  before?: { scores: Record<string, number>; timestamp: string };
  after?: { scores: Record<string, number>; timestamp: string };
} {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export const readinessRetestConfig: QuizConfig = {
  ...readinessQuizConfig,
  id: "readiness-retest",
  title: "שאלון מוכנות — מבחן חוזר",
  subtitle: "לבדוק כמה התקדמת",
  description:
    "אותן 10 שאלות מההתחלה — הפעם אחרי שקראת את הספר. ענה בכנות ותראה עד כמה השתנית.",
  icon: "📊",
};
