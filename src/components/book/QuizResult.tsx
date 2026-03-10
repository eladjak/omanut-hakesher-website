"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QuizAxis, QuizResultRange } from "@/lib/quiz-types";

interface QuizResultProps {
  result: QuizResultRange;
  scores: Record<string, number>;
  axes: QuizAxis[];
  onRetry: () => void;
  backHref: string;
  backLabel: string;
}

export function QuizResult({
  result,
  scores,
  axes,
  onRetry,
  backHref,
  backLabel,
}: QuizResultProps) {
  // Find the max possible score for bar width calculation
  const maxScore = Math.max(...axes.map((a) => a.maxScore), 5);

  return (
    <div className="space-y-8">
      {/* Main result */}
      <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
        <CardContent className="p-8 text-center">
          <span className="text-6xl mb-4 block" aria-hidden="true">
            {result.emoji}
          </span>
          <h2 className="text-2xl font-bold mb-3">{result.title}</h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-4">
            {result.description}
          </p>
        </CardContent>
      </Card>

      {/* Score bars */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 text-center">הציונים שלך</h3>
          <div className="space-y-4">
            {axes.map((axis) => {
              const score = scores[axis.id] ?? 0;
              const pct = Math.round((score / maxScore) * 100);
              return (
                <div key={axis.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{axis.label}</span>
                    <span className="text-muted-foreground">
                      {score.toFixed(1)} / {axis.maxScore}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-primary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {axis.description}
                  </p>
                </div>
              );
            })}
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
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => {
            const text = `עשיתי את שאלון המוכנות של "אומנות הקשר" וקיבלתי: ${result.title} ${result.emoji}`;
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
          }}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-6"
        >
          שתף בוואטסאפ
        </Button>
        <Button
          variant="outline"
          onClick={onRetry}
          className="rounded-full px-6"
        >
          נסה שוב
        </Button>
        <Button variant="ghost" asChild className="rounded-full px-6">
          <a href={backHref}>{backLabel}</a>
        </Button>
      </div>
    </div>
  );
}
