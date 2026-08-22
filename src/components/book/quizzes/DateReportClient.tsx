"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  readBookStorageItem,
  useBookStorageItem,
  writeBookStorageItem,
} from "@/components/book/book-local-storage";
import { QuizForm } from "../QuizForm";
import { dateReportConfig } from "@/data/book/quizzes/date-report";
import type { QuizResultRange } from "@/lib/quiz-types";

const STORAGE_KEY = "omanut-date-reports";

interface DateReportEntry {
  reportNumber: number;
  timestamp: string;
  scores: Record<string, number>;
  result: QuizResultRange;
}

function parseDateReports(raw: string | null): DateReportEntry[] {
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as DateReportEntry[]) : [];
  } catch {
    return [];
  }
}

function saveDateReport(
  scores: Record<string, number>,
  result: QuizResultRange,
): number | null {
  try {
    const existing = parseDateReports(readBookStorageItem(STORAGE_KEY));
    const reportNumber = existing.length + 1;
    const entry: DateReportEntry = {
      reportNumber,
      timestamp: new Date().toISOString(),
      scores,
      result,
    };
    existing.push(entry);
    return writeBookStorageItem(STORAGE_KEY, JSON.stringify(existing))
      ? reportNumber
      : null;
  } catch {
    return null;
  }
}

export function DateReportClient() {
  const storedReports = useBookStorageItem(STORAGE_KEY);
  const reports = useMemo(
    () => parseDateReports(storedReports),
    [storedReports],
  );
  const reportNumber = reports.length + 1;
  const [savedReportNumber, setSavedReportNumber] = useState<number | null>(
    null,
  );

  const handleComplete = ({
    scores,
    result,
  }: {
    answers: Record<string, number | string>;
    scores: Record<string, number>;
    result: QuizResultRange;
  }) => {
    const savedNum = saveDateReport(scores, result);
    if (savedNum !== null) setSavedReportNumber(savedNum);
  };

  return (
    <div className="space-y-6">
      {/* Report counter banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            📊
          </span>
          <div>
            <p className="font-semibold text-sm">
              דו&quot;ח דייט מספר {savedReportNumber ?? reportNumber}
            </p>
            {reportNumber > 1 && savedReportNumber === null && (
              <p className="text-xs text-muted-foreground">
                יש לך {reportNumber - 1} דו&quot;ח{reportNumber - 1 === 1 ? "" : "ות"} קודמ{reportNumber - 1 === 1 ? "" : "ים"}
              </p>
            )}
            {savedReportNumber !== null && (
              <p className="text-xs text-muted-foreground">
                נשמר בהצלחה! סה&quot;כ {savedReportNumber} דו&quot;ח{savedReportNumber === 1 ? "" : "ות"} שמורים
              </p>
            )}
          </div>
          {reportNumber > 1 && (
            <Badge
              variant="outline"
              className="mr-auto text-xs border-primary/30 text-primary"
            >
              דייט #{reportNumber - 1} קודם
            </Badge>
          )}
        </CardContent>
      </Card>

      <QuizForm
        config={dateReportConfig}
        chapterSlug="9"
        onComplete={handleComplete}
      />
    </div>
  );
}
