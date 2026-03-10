"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizForm } from "../QuizForm";
import { attractionMapConfig } from "@/data/book/quizzes/attraction-map";

const STORAGE_KEY = "omanut-attraction-map";

interface AttractionResult {
  answers: Record<string, number | string>;
  scores: Record<string, number>;
}

function saveResult(result: AttractionResult) {
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

const levelMeta: Record<
  string,
  { label: string; description: string; color: string; bgColor: string; borderColor: string; icon: string; tip: string }
> = {
  surface: {
    label: "שטח",
    description: "משיכה ויזואלית ופיזית",
    color: "#E85D75",
    bgColor: "rgba(232,93,117,0.07)",
    borderColor: "rgba(232,93,117,0.25)",
    icon: "✨",
    tip: "הפחד: לפספס אנשים שהמשיכה אליהם מתפתחת לאט. תן לפחות 3 פגישות.",
  },
  depth: {
    label: "עומק",
    description: "אישיות, הומור, שכל וערכים",
    color: "#1E3A5F",
    bgColor: "rgba(30,58,95,0.07)",
    borderColor: "rgba(30,58,95,0.25)",
    icon: "🧠",
    tip: "הכוח שלך: אתה יודע שמה שנמצא מתחת לפני השטח הוא מה שחשוב. זכור לכלול גם את שכבת הליבה.",
  },
  core: {
    label: "ליבה",
    description: "בטחון רגשי, אותנטיות ופגיעות",
    color: "#D4A853",
    bgColor: "rgba(212,168,83,0.07)",
    borderColor: "rgba(212,168,83,0.25)",
    icon: "❤️",
    tip: "הכוח שלך: רמת משיכה עמוקה ובוגרת. שים לב שאתה לא מוותר לגמרי על שכבות השטח והעומק.",
  },
};

function PyramidBar({ level, score, total }: { level: string; score: number; total: number }) {
  const meta = levelMeta[level];
  if (!meta) return null;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span aria-hidden="true">{meta.icon}</span>
          <span className="font-medium" style={{ color: meta.color }}>
            {meta.label}
          </span>
          <span className="text-xs text-muted-foreground">— {meta.description}</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: meta.color }}
        />
      </div>
    </div>
  );
}

function AttractionMapResults({ scores }: { scores: Record<string, number> }) {
  const surface = scores.surface ?? 0;
  const depth = scores.depth ?? 0;
  const core = scores.core ?? 0;
  const total = surface + depth + core;

  const interpreted = attractionMapConfig.interpretResult(scores);

  // Determine dominant
  const dominant =
    interpreted.title === "משיכה מאוזנת"
      ? null
      : surface >= depth && surface >= core
        ? levelMeta.surface
        : depth >= surface && depth >= core
          ? levelMeta.depth
          : levelMeta.core;

  const dominantKey =
    interpreted.title === "משיכה מאוזנת"
      ? null
      : surface >= depth && surface >= core
        ? "surface"
        : depth >= surface && depth >= core
          ? "depth"
          : "core";

  const cardStyle = dominant
    ? { borderColor: dominant.borderColor, background: dominant.bgColor }
    : {
        borderColor: "rgba(107,114,128,0.3)",
        background: "rgba(107,114,128,0.05)",
      };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Result header card */}
      <Card className="border-2" style={cardStyle}>
        <CardContent className="p-8 text-center">
          <span className="text-6xl mb-4 block" aria-hidden="true">
            {interpreted.emoji}
          </span>
          <Badge
            className="mb-3 text-white"
            style={{ backgroundColor: dominant?.color ?? "#6B7280" }}
          >
            {interpreted.title}
          </Badge>
          <h2 className="text-2xl font-bold mb-3">{interpreted.title}</h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {interpreted.description}
          </p>
        </CardContent>
      </Card>

      {/* Pyramid diagram — 3 bars */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-6 text-center text-lg">פירמידת המשיכה שלך</h3>
          <div className="space-y-5">
            {/* Core on top (most important / rare) */}
            <PyramidBar level="core" score={core} total={total} />
            <PyramidBar level="depth" score={depth} total={total} />
            <PyramidBar level="surface" score={surface} total={total} />
          </div>

          <p className="mt-5 text-xs text-muted-foreground text-center">
            כל שכבה מייצגת היבט אחר במה שמושך אותך. שלוש השכבות יחד יוצרות משיכה שלמה.
          </p>
        </CardContent>
      </Card>

      {/* Tip for dominant level */}
      {dominantKey && levelMeta[dominantKey] && (
        <Card
          className="border"
          style={{
            borderColor: levelMeta[dominantKey].borderColor,
            background: levelMeta[dominantKey].bgColor,
          }}
        >
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5" aria-hidden="true">
                {levelMeta[dominantKey].icon}
              </span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: levelMeta[dominantKey].color }}>
                  טיפ לשכבת {levelMeta[dominantKey].label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {levelMeta[dominantKey].tip}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Three levels explained */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 text-center text-lg">שלוש שכבות המשיכה</h3>
          <div className="space-y-4">
            {(["surface", "depth", "core"] as const).map((key) => {
              const meta = levelMeta[key];
              const score = scores[key] ?? 0;
              const pct = total > 0 ? Math.round((score / total) * 100) : 0;
              const axis = attractionMapConfig.axes.find((a) => a.id === key);
              return (
                <div
                  key={key}
                  className="flex items-start gap-4 p-4 rounded-xl border"
                  style={{ borderColor: meta.borderColor, background: meta.bgColor }}
                >
                  <span className="text-2xl mt-0.5" aria-hidden="true">{meta.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm" style={{ color: meta.color }}>
                        {meta.label}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{ borderColor: meta.borderColor, color: meta.color }}
                      >
                        {pct}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {axis?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">מה עכשיו?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {interpreted.recommendation}
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => {
            const text = `עשיתי את מפת המשיכה של "אומנות הקשר" — ${interpreted.emoji} ${interpreted.title}`;
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
          }}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-6"
        >
          שתף בוואטסאפ
        </Button>
        <Button variant="ghost" asChild className="rounded-full px-6">
          <a href="/book/8">חזרה לפרק 8</a>
        </Button>
      </div>
    </div>
  );
}

export function AttractionMapClient() {
  const [result, setResult] = useState<AttractionResult | null>(null);

  const handleComplete = ({
    answers,
    scores,
  }: {
    answers: Record<string, number | string>;
    scores: Record<string, number>;
  }) => {
    const data: AttractionResult = { answers, scores };
    saveResult(data);
    setResult(data);
  };

  if (result) {
    return <AttractionMapResults scores={result.scores} />;
  }

  return (
    <QuizForm
      config={attractionMapConfig}
      chapterSlug="8"
      onComplete={handleComplete}
    />
  );
}
