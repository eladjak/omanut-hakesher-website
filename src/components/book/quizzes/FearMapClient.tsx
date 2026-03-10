"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizForm } from "../QuizForm";
import { fearMapConfig } from "@/data/book/quizzes/fear-map";

const STORAGE_KEY = "omanut-fear-map";

// Map each fear question to its Hebrew label
const fearLabels: Record<string, { title: string; category: string }> = {
  f1: { title: "פחד מדחייה", category: "worthiness" },
  f2: { title: "פחד מנטישה", category: "avoidance" },
  f3: { title: "פחד מאינטימיות", category: "avoidance" },
  f4: { title: "פחד מכישלון חוזר", category: "past" },
  f5: { title: "פחד מהצלחה", category: "worthiness" },
  f6: { title: "פחד מפגיעה", category: "past" },
  f7: { title: "פחד מהתחייבות", category: "avoidance" },
  f8: { title: "פחד מאי-התאמה", category: "worthiness" },
  f9: { title: "פחד ממה שיגידו", category: "external" },
  f10: { title: "פחד מהבלתי נודע", category: "external" },
  f11: { title: "פחד שהזמן אוזל", category: "external" },
  f12: { title: "פחד מפשרה", category: "external" },
  f13: { title: "פחד מאובדן שליטה", category: "avoidance" },
  f14: { title: "פחד מאובדן הזהות", category: "avoidance" },
};

const categoryMeta: Record<
  string,
  { label: string; color: string; bgColor: string; borderColor: string; icon: string }
> = {
  avoidance: {
    label: "פחדי הימנעות",
    color: "#1E3A5F",
    bgColor: "rgba(30,58,95,0.06)",
    borderColor: "rgba(30,58,95,0.2)",
    icon: "🧊",
  },
  worthiness: {
    label: "פחדי ערך עצמי",
    color: "#E85D75",
    bgColor: "rgba(232,93,117,0.06)",
    borderColor: "rgba(232,93,117,0.2)",
    icon: "🪞",
  },
  past: {
    label: "פחדי העבר",
    color: "#D4A853",
    bgColor: "rgba(212,168,83,0.06)",
    borderColor: "rgba(212,168,83,0.2)",
    icon: "🩹",
  },
  external: {
    label: "פחדים חיצוניים",
    color: "#6B7280",
    bgColor: "rgba(107,114,128,0.06)",
    borderColor: "rgba(107,114,128,0.2)",
    icon: "🌍",
  },
};

const intensityLabel: Record<number, string> = {
  1: "כמעט לא",
  2: "לפעמים",
  3: "לעיתים קרובות",
  4: "שולט בי",
};

interface FearMapResult {
  answers: Record<string, number | string>;
  scores: Record<string, number>;
}

function saveFearMapResult(result: FearMapResult) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...result, timestamp: new Date().toISOString() }),
    );
  } catch {
    // localStorage unavailable
  }
}

function FearMapResults({ answers, scores }: FearMapResult) {
  // Build sorted list of all fears by score descending
  const fearEntries = Object.entries(fearLabels).map(([id, meta]) => ({
    id,
    title: meta.title,
    category: meta.category,
    score: typeof answers[id] === "number" ? (answers[id] as number) : Number(answers[id]) || 0,
  }));

  fearEntries.sort((a, b) => b.score - a.score);

  const top3 = fearEntries.slice(0, 3).filter((f) => f.score >= 2);

  // Group all fears by category for the visual map
  const byCategory: Record<string, typeof fearEntries> = {
    avoidance: [],
    worthiness: [],
    past: [],
    external: [],
  };
  for (const fear of fearEntries) {
    byCategory[fear.category]?.push(fear);
  }

  // Dominant category
  const dominantCategory = Object.entries(scores).reduce(
    (best, curr) => (curr[1] > best[1] ? curr : best),
    ["avoidance", 0],
  )[0];

  const dominant = categoryMeta[dominantCategory];

  return (
    <div className="space-y-8" dir="rtl">
      {/* Dominant result card */}
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
            הפחד הדומיננטי שלך: {dominant.label}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {fearMapConfig.axes.find((a) => a.id === dominantCategory)?.description}
          </p>
        </CardContent>
      </Card>

      {/* Top 3 fears */}
      {top3.length > 0 && (
        <Card className="border-border/50">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-center text-lg">
              3 הפחדים הכי חזקים שלך
            </h3>
            <div className="space-y-4">
              {top3.map((fear, index) => {
                const meta = categoryMeta[fear.category];
                return (
                  <div
                    key={fear.id}
                    className="flex items-center gap-4 p-4 rounded-xl border"
                    style={{
                      borderColor: meta.borderColor,
                      background: meta.bgColor,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: meta.color }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{fear.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {meta.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-xs font-medium px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: meta.color }}
                      >
                        {intensityLabel[fear.score] ?? "לא מדורג"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full fear map — category breakdown */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-5 text-center text-lg">מפת הפחדים המלאה</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(byCategory).map(([catId, fears]) => {
              const meta = categoryMeta[catId];
              const axisScore = scores[catId] ?? 0;
              const pct = Math.round((axisScore / 4) * 100);
              return (
                <div
                  key={catId}
                  className="rounded-xl border p-4"
                  style={{
                    borderColor: meta.borderColor,
                    background: meta.bgColor,
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span aria-hidden="true">{meta.icon}</span>
                    <span className="font-semibold text-sm" style={{ color: meta.color }}>
                      {meta.label}
                    </span>
                    <span className="mr-auto text-xs text-muted-foreground">
                      {axisScore.toFixed(1)} / 4
                    </span>
                  </div>

                  {/* Score bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: meta.color }}
                    />
                  </div>

                  {/* Individual fears */}
                  <div className="space-y-1.5">
                    {fears.map((fear) => {
                      const score = fear.score;
                      return (
                        <div key={fear.id} className="flex items-center gap-2 text-xs">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor:
                                score >= 3
                                  ? meta.color
                                  : score === 2
                                    ? `${meta.color}80`
                                    : "#e5e7eb",
                            }}
                          />
                          <span
                            className={
                              score >= 3
                                ? "font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {fear.title}
                          </span>
                          {score >= 3 && (
                            <span
                              className="mr-auto text-xs font-medium"
                              style={{ color: meta.color }}
                            >
                              {intensityLabel[score]}
                            </span>
                          )}
                        </div>
                      );
                    })}
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
            {fearMapConfig.interpretResult(scores).recommendation}
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => {
            const text = `עשיתי את מפת הפחדים של "אומנות הקשר" — הפחד הדומיננטי שלי הוא ${dominant.label} ${dominant.icon}`;
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
          }}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-6"
        >
          שתף בוואטסאפ
        </Button>
        <Button variant="ghost" asChild className="rounded-full px-6">
          <a href="/book/2">חזרה לפרק 2</a>
        </Button>
      </div>
    </div>
  );
}

export function FearMapClient() {
  const [result, setResult] = useState<FearMapResult | null>(null);

  const handleComplete = ({
    answers,
    scores,
  }: {
    answers: Record<string, number | string>;
    scores: Record<string, number>;
  }) => {
    const data: FearMapResult = { answers, scores };
    saveFearMapResult(data);
    setResult(data);
  };

  if (result) {
    return <FearMapResults answers={result.answers} scores={result.scores} />;
  }

  return (
    <QuizForm
      config={fearMapConfig}
      chapterSlug="2"
      onComplete={handleComplete}
    />
  );
}
