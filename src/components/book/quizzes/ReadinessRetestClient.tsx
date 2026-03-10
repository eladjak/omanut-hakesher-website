"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizForm } from "../QuizForm";
import { ComparisonChart } from "../ComparisonChart";
import {
  readinessRetestConfig,
  saveReadinessScores,
  getReadinessScores,
} from "@/data/book/quizzes/readiness-retest";
import { readinessQuizConfig } from "@/data/book/quizzes/readiness-quiz";

export function ReadinessRetestClient() {
  const [beforeScores, setBeforeScores] = useState<Record<
    string,
    number
  > | null>(null);
  const [afterScores, setAfterScores] = useState<Record<
    string,
    number
  > | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const saved = getReadinessScores();
    if (saved.before?.scores) {
      setBeforeScores(saved.before.scores);
    }
  }, []);

  const handleComplete = ({
    scores,
  }: {
    scores: Record<string, number>;
  }) => {
    saveReadinessScores(scores, "after");
    setAfterScores(scores);
    if (beforeScores) {
      setShowComparison(true);
    }
  };

  // Show comparison after completing retest
  if (showComparison && beforeScores && afterScores) {
    return (
      <div className="space-y-8">
        <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
          <CardContent className="p-8 text-center">
            <span className="text-6xl mb-4 block" aria-hidden="true">
              📊
            </span>
            <h2 className="text-2xl font-bold mb-3">ההשוואה שלך</h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
              ככה השתנית מאז שהתחלת לקרוא את הספר. כל צעד קדימה הוא משמעותי.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <ComparisonChart
              axes={readinessQuizConfig.axes}
              beforeScores={beforeScores}
              afterScores={afterScores}
            />
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">מה עכשיו?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ההתקדמות שלך מוכיחה שהעבודה שעשית לאורך הספר הייתה משמעותית. קח
              את הכלים שלמדת והמשך ליישם אותם ביום-יום. זכור: הדרך לזוגיות
              בריאה היא מרתון, לא ספרינט.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => {
              const text = `סיימתי את ספר "אומנות הקשר" ועשיתי את שאלון המוכנות לפני ואחרי 📊`;
              const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
              window.open(url, "_blank");
            }}
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-6"
          >
            שתף בוואטסאפ
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setAfterScores(null);
              setShowComparison(false);
            }}
            className="rounded-full px-6"
          >
            נסה שוב
          </Button>
          <Button variant="ghost" asChild className="rounded-full px-6">
            <a href="/book/closing">חזרה לסיכום</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!beforeScores && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">שים לב:</span> לא נמצאו תוצאות
              קודמות מהשאלון בהקדמה. תוכל לעשות את השאלון בכל מקרה, אבל ההשוואה
              לפני/אחרי לא תהיה זמינה.{" "}
              <a
                href="/book/intro/readiness-quiz"
                className="text-primary hover:underline"
              >
                עשה קודם את שאלון המוכנות בהקדמה
              </a>
            </p>
          </CardContent>
        </Card>
      )}

      <QuizForm
        config={readinessRetestConfig}
        chapterSlug="closing"
        onComplete={handleComplete}
      />
    </div>
  );
}
