"use client";

import type { QuizAxis } from "@/lib/quiz-types";

interface ComparisonChartProps {
  axes: QuizAxis[];
  beforeScores: Record<string, number>;
  afterScores: Record<string, number>;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonChart({
  axes,
  beforeScores,
  afterScores,
  beforeLabel = "לפני הקריאה",
  afterLabel = "אחרי הקריאה",
}: ComparisonChartProps) {
  const maxScore = Math.max(...axes.map((a) => a.maxScore), 5);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex gap-6 justify-center text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-muted-foreground/40" />
          <span className="text-muted-foreground">{beforeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">{afterLabel}</span>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-5">
        {axes.map((axis) => {
          const before = beforeScores[axis.id] ?? 0;
          const after = afterScores[axis.id] ?? 0;
          const beforePct = Math.round((before / maxScore) * 100);
          const afterPct = Math.round((after / maxScore) * 100);
          const diff = after - before;
          const improved = diff > 0;

          return (
            <div key={axis.id} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{axis.label}</span>
                <span
                  className={
                    improved
                      ? "text-green-600 dark:text-green-400 font-semibold"
                      : diff < 0
                        ? "text-red-500 font-semibold"
                        : "text-muted-foreground"
                  }
                >
                  {improved ? "+" : ""}
                  {diff.toFixed(1)}
                </span>
              </div>

              {/* Before bar */}
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-muted-foreground/30"
                  style={{ width: `${beforePct}%` }}
                />
              </div>

              {/* After bar */}
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-primary"
                  style={{ width: `${afterPct}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  לפני: {before.toFixed(1)} / {axis.maxScore}
                </span>
                <span>
                  אחרי: {after.toFixed(1)} / {axis.maxScore}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall improvement */}
      {(() => {
        const beforeAvg =
          axes.reduce((sum, a) => sum + (beforeScores[a.id] ?? 0), 0) /
          axes.length;
        const afterAvg =
          axes.reduce((sum, a) => sum + (afterScores[a.id] ?? 0), 0) /
          axes.length;
        const totalDiff = afterAvg - beforeAvg;
        const improved = totalDiff > 0;

        return (
          <div className="mt-6 p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground mb-1">שינוי כולל</p>
            <p
              className={`text-2xl font-bold ${
                improved
                  ? "text-green-600 dark:text-green-400"
                  : totalDiff < 0
                    ? "text-red-500"
                    : "text-muted-foreground"
              }`}
            >
              {improved ? "+" : ""}
              {totalDiff.toFixed(1)} נקודות
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ממוצע לפני: {beforeAvg.toFixed(1)} | ממוצע אחרי:{" "}
              {afterAvg.toFixed(1)}
            </p>
          </div>
        );
      })()}
    </div>
  );
}
