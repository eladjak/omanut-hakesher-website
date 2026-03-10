"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizForm } from "../QuizForm";
import { connectionScoreConfig } from "@/data/book/quizzes/connection-score";
import type { QuizResultRange } from "@/lib/quiz-types";

const STORAGE_KEY = "omanut-connection-score";

interface ConnectionScoreEntry {
  timestamp: string;
  scores: Record<string, number>;
  result: QuizResultRange;
}

function saveConnectionScore(
  scores: Record<string, number>,
  result: QuizResultRange,
): void {
  if (typeof window === "undefined") return;
  try {
    const entry: ConnectionScoreEntry = {
      timestamp: new Date().toISOString(),
      scores,
      result,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // ignore storage errors
  }
}

// ── Axis bar component ─────────────────────────────────────────────────────

interface AxisBarProps {
  label: string;
  score: number;
  maxScore: number;
  color: string;
  description: string;
}

function AxisBar({ label, score, maxScore, color, description }: AxisBarProps) {
  const pct = Math.round((score / maxScore) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground text-xs">
          {score}/{maxScore}
        </span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

// ── Custom result panel ────────────────────────────────────────────────────

interface ConnectionResultProps {
  scores: Record<string, number>;
  result: QuizResultRange;
  onRetry: () => void;
}

function ConnectionResult({ scores, result, onRetry }: ConnectionResultProps) {
  const total = scores.total ?? 0;
  const maxTotal = 48;
  const totalPct = Math.round((total / maxTotal) * 100);

  const axes = connectionScoreConfig.axes;

  const handleShare = () => {
    const text = encodeURIComponent(
      `בדקתי את ציון החיבור שלי בספר "אומנות הקשר" ${result.emoji}\n\nהתוצאה: ${result.title}\nציון כולל: ${total}/${maxTotal}\n\nתנסה גם אתה: omanut-hakesher.co.il/book/11/connection-score`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Result header */}
      <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
        <CardContent className="p-8 text-center">
          <span className="text-6xl mb-4 block" aria-hidden="true">
            {result.emoji}
          </span>
          <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-4">
            {result.description}
          </p>
          {/* Total score ring */}
          <div className="inline-flex flex-col items-center gap-1 bg-background border border-border/40 rounded-2xl px-8 py-4">
            <span className="text-4xl font-bold text-primary">{total}</span>
            <span className="text-xs text-muted-foreground">מתוך {maxTotal}</span>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${totalPct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4 axis bars */}
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6">
          <h3 className="font-bold text-base mb-4">ניתוח לפי ציר</h3>
          {axes.map((axis) => (
            <AxisBar
              key={axis.id}
              label={axis.label}
              score={scores[axis.id] ?? 0}
              maxScore={axis.maxScore * 3} // 3 questions × max 4 = 12 per axis
              color={axis.color}
              description={axis.description}
            />
          ))}
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">מה עכשיו?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.recommendation}
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex-1 rounded-full border-primary/30 text-primary hover:bg-primary/5 gap-2"
        >
          <span aria-hidden="true">💬</span>
          שתף בוואטסאפ
        </Button>

        <Button
          onClick={onRetry}
          variant="ghost"
          className="flex-1 rounded-full text-muted-foreground hover:text-foreground"
        >
          התחל מחדש
        </Button>
      </div>

      <div className="text-center">
        <a href="/book/11" className="text-sm text-primary hover:underline">
          ← חזרה לפרק 11
        </a>
      </div>
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────────

export function ConnectionScoreClient() {
  const [completedData, setCompletedData] = useState<{
    scores: Record<string, number>;
    result: QuizResultRange;
  } | null>(null);

  const handleComplete = ({
    scores,
    result,
  }: {
    answers: Record<string, number | string>;
    scores: Record<string, number>;
    result: QuizResultRange;
  }) => {
    saveConnectionScore(scores, result);
    setCompletedData({ scores, result });
  };

  const handleRetry = () => {
    setCompletedData(null);
  };

  if (completedData) {
    return (
      <ConnectionResult
        scores={completedData.scores}
        result={completedData.result}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <QuizForm
      config={connectionScoreConfig}
      chapterSlug="11"
      onComplete={handleComplete}
    />
  );
}
