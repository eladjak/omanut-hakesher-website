"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizForm } from "../QuizForm";
import { chemistryQuizConfig } from "@/data/book/quizzes/chemistry-quiz";
import type { QuizResultRange } from "@/lib/quiz-types";

const STORAGE_KEY = "omanut-chemistry-quiz";

interface ChemistryEntry {
  timestamp: string;
  scores: Record<string, number>;
  result: QuizResultRange;
}

function saveChemistryResult(
  scores: Record<string, number>,
  result: QuizResultRange,
): void {
  if (typeof window === "undefined") return;
  try {
    const entry: ChemistryEntry = {
      timestamp: new Date().toISOString(),
      scores,
      result,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // ignore storage errors
  }
}

// ── Axis bar ──────────────────────────────────────────────────────────────

interface AxisBarProps {
  label: string;
  score: number;
  maxScore: number;
  color: string;
  description: string;
}

function AxisBar({ label, score, maxScore, color, description }: AxisBarProps) {
  const pct = Math.round((score / maxScore) * 100);
  const levelLabel =
    pct >= 80 ? "גבוה" : pct >= 50 ? "בינוני" : "נמוך";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">{label}</span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {levelLabel} · {score}/{maxScore}
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

// ── Dominant chemistry label ──────────────────────────────────────────────

function getDominantAxis(scores: Record<string, number>) {
  const axes = [
    { id: "physical", label: "פיזית", color: "#E85D75" },
    { id: "emotional", label: "רגשית", color: "#D4A853" },
    { id: "intellectual", label: "שכלית", color: "#1E3A5F" },
  ];

  let max = -1;
  let dominant = axes[0];
  for (const ax of axes) {
    const v = scores[ax.id] ?? 0;
    if (v > max) {
      max = v;
      dominant = ax;
    }
  }
  return dominant;
}

// ── Result panel ─────────────────────────────────────────────────────────

interface ChemistryResultProps {
  scores: Record<string, number>;
  result: QuizResultRange;
  onRetry: () => void;
}

function ChemistryResult({ scores, result, onRetry }: ChemistryResultProps) {
  const dominant = getDominantAxis(scores);
  const axes = chemistryQuizConfig.axes;
  const total = scores.total ?? 0;
  const maxTotal = 45;
  const totalPct = Math.round((total / maxTotal) * 100);

  const handleShare = () => {
    const text = encodeURIComponent(
      `בדקתי את סוג הכימיה שלי בספר "אומנות הקשר" ${result.emoji}\n\nהתוצאה: ${result.title}\nציר מוביל: כימיה ${dominant.label}\n\nתנסה גם אתה: omanut-hakesher.co.il/book/11/chemistry-quiz`,
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
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-5">
            {result.description}
          </p>

          {/* Dominant axis badge */}
          <div className="inline-flex flex-col items-center gap-2 bg-background border border-border/40 rounded-2xl px-8 py-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              הכימיה המובילה שלך
            </span>
            <span
              className="text-xl font-bold"
              style={{ color: dominant.color }}
            >
              כימיה {dominant.label}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-primary">{total}</span>
              <span className="text-xs text-muted-foreground">/ {maxTotal}</span>
            </div>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${totalPct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3-axis bars */}
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6">
          <h3 className="font-bold text-base mb-4">שלושת צירי הכימיה</h3>
          {axes.map((axis) => (
            <AxisBar
              key={axis.id}
              label={axis.label}
              score={scores[axis.id] ?? 0}
              maxScore={15}
              color={axis.color}
              description={axis.description}
            />
          ))}
          {/* Balance insight */}
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium">על שלושת הצירים:</span> חיבור אמיתי
              ומתמשך צריך את שלושתם. הציר הפיזי הוא לרוב הראשון לצוץ — אבל הוא
              גם הכי מתיישן. הציר הרגשי והשכלי הם אלה שמחזיקים את הזוגיות לטווח
              ארוך.
            </p>
          </div>
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

export function ChemistryQuizClient() {
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
    saveChemistryResult(scores, result);
    setCompletedData({ scores, result });
  };

  const handleRetry = () => {
    setCompletedData(null);
  };

  if (completedData) {
    return (
      <ChemistryResult
        scores={completedData.scores}
        result={completedData.result}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <QuizForm
      config={chemistryQuizConfig}
      chapterSlug="11"
      onComplete={handleComplete}
    />
  );
}
