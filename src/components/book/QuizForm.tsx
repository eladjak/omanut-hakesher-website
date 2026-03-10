"use client";

import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";
import { QuizQuestionCard } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";

interface QuizFormProps {
  config: QuizConfig;
  chapterSlug?: string;
  onComplete?: (result: {
    answers: Record<string, number | string>;
    scores: Record<string, number>;
    result: QuizResultRange;
  }) => void;
}

type Phase = "intro" | "questions" | "results";

export function QuizForm({ config, chapterSlug, onComplete }: QuizFormProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResultRange | null>(null);

  const total = config.questions.length;
  const currentQuestion = config.questions[currentIndex];
  const currentValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = Math.round(((currentIndex + 1) / total) * 100);

  const handleAnswer = useCallback(
    (value: number | string) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    },
    [currentQuestion],
  );

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Last question — compute results
      const computed = config.computeScores(answers);
      const interpreted = config.interpretResult(computed);
      setScores(computed);
      setResult(interpreted);
      setPhase("results");
      onComplete?.({ answers, scores: computed, result: interpreted });
    }
  }, [currentIndex, total, answers, config, onComplete]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const retry = useCallback(() => {
    setPhase("intro");
    setCurrentIndex(0);
    setAnswers({});
    setScores({});
    setResult(null);
  }, []);

  // Intro screen
  if (phase === "intro") {
    return (
      <Card className="border-border/50">
        <CardContent className="p-8 text-center">
          <span className="text-6xl mb-6 block" aria-hidden="true">
            {config.icon}
          </span>
          <h2 className="text-2xl font-bold mb-3">{config.title}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
            {config.description}
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {config.axes.map((axis) => (
              <Badge
                key={axis.id}
                variant="outline"
                className="text-xs border-primary/20 text-primary"
              >
                {axis.label}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <span>⏱</span>
            <span>
              {total} שאלות • כ-{Math.max(2, Math.round(total / 4))} דקות
            </span>
          </div>

          <Button
            onClick={() => setPhase("questions")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold text-base"
          >
            התחל את השאלון
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Results screen
  if (phase === "results" && result) {
    return (
      <QuizResult
        result={result}
        scores={scores}
        axes={config.axes}
        onRetry={retry}
        backHref={chapterSlug ? `/book/${chapterSlug}` : "/book"}
        backLabel={chapterSlug ? "חזרה לפרק" : "חזרה לספר"}
      />
    );
  }

  // Questions screen
  return (
    <Card className="border-border/50">
      <CardContent className="p-6 md:p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
            <span>
              שאלה {currentIndex + 1} מתוך {total}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="min-h-[200px] flex items-center justify-center py-4">
          {currentQuestion && (
            <QuizQuestionCard
              question={currentQuestion}
              value={currentValue}
              onChange={handleAnswer}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/30">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentIndex === 0}
            className="rounded-full px-6"
          >
            הקודם
          </Button>

          <Button
            onClick={goNext}
            disabled={currentValue === undefined}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
          >
            {currentIndex === total - 1 ? "סיום" : "הבא"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
