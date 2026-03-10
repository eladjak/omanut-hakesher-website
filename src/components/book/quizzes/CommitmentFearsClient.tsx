"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizForm } from "../QuizForm";
import { commitmentFearsConfig } from "@/data/book/quizzes/commitment-fears";

const STORAGE_KEY = "omanut-commitment-fears";

const axisLabels: Record<
  string,
  { label: string; color: string; bgColor: string; borderColor: string; icon: string }
> = {
  freedom: {
    label: "פחד מאובדן חופש",
    color: "#1E3A5F",
    bgColor: "rgba(30,58,95,0.06)",
    borderColor: "rgba(30,58,95,0.2)",
    icon: "🕊️",
  },
  choice: {
    label: "פחד מבחירה לא נכונה",
    color: "#E85D75",
    bgColor: "rgba(232,93,117,0.06)",
    borderColor: "rgba(232,93,117,0.2)",
    icon: "🔀",
  },
  failure: {
    label: "פחד מכישלון",
    color: "#D4A853",
    bgColor: "rgba(212,168,83,0.06)",
    borderColor: "rgba(212,168,83,0.2)",
    icon: "💔",
  },
  hurt: {
    label: "פחד מלהיפגע שוב",
    color: "#9B59B6",
    bgColor: "rgba(155,89,182,0.06)",
    borderColor: "rgba(155,89,182,0.2)",
    icon: "🩹",
  },
  identity: {
    label: "פחד מאובדן זהות",
    color: "#6B7280",
    bgColor: "rgba(107,114,128,0.06)",
    borderColor: "rgba(107,114,128,0.2)",
    icon: "🪞",
  },
};

const intensityLabel: Record<number, string> = {
  1: "כמעט לא",
  2: "לפעמים",
  3: "לעיתים קרובות",
  4: "שולט בי",
};

interface CommitmentFearsResult {
  scores: Record<string, number>;
}

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

function CommitmentFearsResults({ scores }: CommitmentFearsResult) {
  const entries = Object.entries(scores)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a);

  const dominantId = entries[0]?.[0] ?? "freedom";
  const dominant = axisLabels[dominantId];

  return (
    <div className="space-y-8" dir="rtl">
      {/* Dominant fear card */}
      <Card
        className="border-2"
        style={{ borderColor: dominant.borderColor, background: dominant.bgColor }}
      >
        <CardContent className="p-8 text-center">
          <span className="text-6xl mb-4 block" aria-hidden="true">
            {dominant.icon}
          </span>
          <Badge
            className="mb-3 text-white"
            style={{ backgroundColor: dominant.color }}
          >
            {dominant.label}
          </Badge>
          <h2 className="text-2xl font-bold mb-3">
            פחד המחויבות הדומיננטי שלך: {dominant.label}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {commitmentFearsConfig.axes.find((a) => a.id === dominantId)?.description}
          </p>
        </CardContent>
      </Card>

      {/* All fears bar chart */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-5 text-center text-lg">
            מפת פחדי המחויבות שלך
          </h3>
          <div className="space-y-4">
            {entries.map(([axisId, score]) => {
              const meta = axisLabels[axisId];
              if (!meta) return null;
              const pct = Math.round((score / 4) * 100);
              const roundedScore = Math.round(score * 10) / 10;
              return (
                <div key={axisId}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true">{meta.icon}</span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: meta.color }}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {intensityLabel[Math.round(roundedScore)] ?? `${roundedScore}/4`}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: meta.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="border-border/50" style={{ borderColor: dominant.borderColor }}>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">מה עכשיו?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {commitmentFearsConfig.interpretResult(scores).recommendation}
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => {
            const text = `עשיתי את מפת פחדי המחויבות מ"אומנות הקשר" — הפחד הדומיננטי שלי הוא ${dominant.label} ${dominant.icon}`;
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
          }}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-6"
        >
          שתף בוואטסאפ
        </Button>
        <Button variant="ghost" asChild className="rounded-full px-6">
          <a href="/book/13">חזרה לפרק 13</a>
        </Button>
      </div>
    </div>
  );
}

export function CommitmentFearsClient() {
  const [result, setResult] = useState<CommitmentFearsResult | null>(null);

  const handleComplete = ({
    scores,
  }: {
    answers: Record<string, number | string>;
    scores: Record<string, number>;
  }) => {
    saveResult(scores);
    setResult({ scores });
  };

  if (result) {
    return <CommitmentFearsResults scores={result.scores} />;
  }

  return (
    <QuizForm
      config={commitmentFearsConfig}
      chapterSlug="13"
      onComplete={handleComplete}
    />
  );
}
