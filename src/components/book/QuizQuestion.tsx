"use client";

import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz-types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  value: number | string | undefined;
  onChange: (value: number | string) => void;
}

export function QuizQuestionCard({ question, value, onChange }: QuizQuestionProps) {
  if (question.type === "scale") {
    const min = question.scaleMin ?? 1;
    const max = question.scaleMax ?? 5;
    const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-center leading-relaxed px-2">
          {question.text}
        </h3>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 flex-wrap justify-center">
            {values.map((v) => (
              <button
                key={v}
                onClick={() => onChange(v)}
                aria-label={`${v} מתוך ${max}`}
                className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-150 ${
                  value === v
                    ? "bg-primary text-primary-foreground scale-110 shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex justify-between w-full max-w-xs text-xs text-muted-foreground">
            <span>{question.scaleMinLabel ?? "לא בכלל"}</span>
            <span>{question.scaleMaxLabel ?? "בהחלט"}</span>
          </div>
        </div>
      </div>
    );
  }

  if (question.type === "multiple-choice" && question.options) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-center leading-relaxed px-2">
          {question.text}
        </h3>
        <div className="grid gap-3 max-w-md mx-auto">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`p-4 rounded-xl text-sm text-right transition-all duration-150 border ${
                value === option.value
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-border/50 bg-card hover:border-primary/20 text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "yes-no") {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-center leading-relaxed px-2">
          {question.text}
        </h3>
        <div className="flex gap-4 justify-center">
          {[
            { val: 1, label: "כן" },
            { val: 0, label: "לא" },
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => onChange(opt.val)}
              className={`px-8 py-3 rounded-xl text-base font-semibold transition-all duration-150 border ${
                value === opt.val
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 bg-card hover:border-primary/20 text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
