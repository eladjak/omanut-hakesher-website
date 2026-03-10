"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── Types ─────────────────────────────────────────────────────────────────── */
interface Question {
  id: number;
  text: string;
  round: 1 | 2 | 3;
}

interface SavedProgress {
  currentCard: number; // 0-based index into ALL_QUESTIONS (not counting break cards)
  savedAt: string;
}

const STORAGE_KEY = "omanut-36-questions";
const TIMER_DURATION = 120; // 2 minutes in seconds

/* ── Questions ──────────────────────────────────────────────────────────────── */
const ALL_QUESTIONS: Question[] = [
  // Round 1: קרבה ראשונית (12 questions)
  { id: 1, round: 1, text: "אם היית יכול/ה לבחור כל אחד בעולם, את מי היית מזמין/ה לארוחת ערב?" },
  { id: 2, round: 1, text: "מה היית רוצה להיות מפורסם/ת עליו?" },
  { id: 3, round: 1, text: "לפני שאתה/את מתקשר/ת, האם אתה/את מתרגל/ת מה תגיד/י? למה?" },
  { id: 4, round: 1, text: "מה נשמע בשבילך כמו יום מושלם?" },
  { id: 5, round: 1, text: "מתי בפעם האחרונה שרת לעצמך? ולמישהו אחר?" },
  { id: 6, round: 1, text: "אם יכולת לחיות עד גיל 90 ולשמור על גוף או מוח של גיל 30 לכל שנות ה-60 האחרונות של חייך, מה היית בוחר/ת?" },
  { id: 7, round: 1, text: "יש לך תחושה סודית כיצד אתה/את עומד/ת למות?" },
  { id: 8, round: 1, text: "ציין/י שלושה דברים שיש לך משותפים עם בן/בת שיחך." },
  { id: 9, round: 1, text: "על מה אתה/את הכי אסיר/ת תודה בחיים?" },
  { id: 10, round: 1, text: "אם היית יכול/ה לשנות משהו אחד בגדילה שלך, מה היה זה?" },
  { id: 11, round: 1, text: "ספר/י את סיפור חייך בארבע דקות כמה שיותר מפורט." },
  { id: 12, round: 1, text: "אם היית מתעורר/ת מחר עם יכולת מיוחדת, מה היית רוצה שזה יהיה?" },

  // Round 2: העמקה (12 questions)
  { id: 13, round: 2, text: "האם יש משהו שחלמת לעשות הרבה זמן ולא עשית? למה?" },
  { id: 14, round: 2, text: "מה ההישג הכי גדול שלך בחיים?" },
  { id: 15, round: 2, text: "מה הכי חשוב לך בידידות?" },
  { id: 16, round: 2, text: "מה הזיכרון הכי חם שלך?" },
  { id: 17, round: 2, text: "מה הוא הסוד הכי גרוע בחייך? מתי בפעם האחרונה בכית מול מישהו אחר? ולבד?" },
  { id: 18, round: 2, text: "ספר/י למשהו שלצד השני כבר יודע עליו משהו שאתה/את מביש/ה." },
  { id: 19, round: 2, text: "מה אתה/את הכי מתגעגע/ת אליו בחיים שלך?" },
  { id: 20, round: 2, text: "מה תפקיד האהבה בחייך?" },
  { id: 21, round: 2, text: "ספר/י בגישה חלוקה עם בן/בת שיחך דבר שאתה/את רואה כמאפיין חיובי שלו/שלה. ספר/י לו/לה חמישה דברים כאלה." },
  { id: 22, round: 2, text: "האם המשפחה שלך היא חמה וקרובה? האם אתה/את מרגיש/ה שילדותך הייתה יותר מאושרת מאשר של רוב האנשים?" },
  { id: 23, round: 2, text: "כיצד תרגיש/י לגבי היחסים שלך עם אמא שלך?" },
  { id: 24, round: 2, text: "ספר/י שלושה הצהרות נכונות תחילות ב-'אנחנו'. לדוגמה: 'אנחנו שניינו בחדר הזה מרגישים ___'."},

  // Round 3: פגיעות אמיתית (12 questions)
  { id: 25, round: 3, text: "השלם/י את המשפט: 'אני רוצה שיהיה מישהו שאוכל לשתף איתו ___'." },
  { id: 26, round: 3, text: "אם אתה/את הולך/ת להיות חברים קרובים עם בן/בת שיחך, שתף/י מה חשוב שהוא/היא יידע/תדע." },
  { id: 27, round: 3, text: "ספר/י לבן/בת שיחך מה אתה/את אוהב/ת בו/בה — בכנות, כמו שלא תגיד/י לסתם מכר." },
  { id: 28, round: 3, text: "ספר/י לבן/בת שיחך רגע מביך מחייך." },
  { id: 29, round: 3, text: "מתי בפעם האחרונה בכית בפני אחרים? ולבד?" },
  { id: 30, round: 3, text: "ספר/י לבן/בת שיחך דבר שאתה/את אוהב/ת בו/בה כבר." },
  { id: 31, round: 3, text: "מה — אם בכלל — נחשב רציני מדי לצחוק עליו?" },
  { id: 32, round: 3, text: "אם היית מת/ה הלילה בלי הזדמנות לדבר עם אף אחד, על מה היית מצטער/ת שלא אמרת? למה עוד לא אמרת?" },
  { id: 33, round: 3, text: "הבית שלך, עם כל מה שיש בו, עולה באש. לאחר שהצלת את יקיריך ואת חיות המחמד, יש לך זמן לרוץ ולהציל פריט אחד נוסף. מה זה יהיה?" },
  { id: 34, round: 3, text: "מי מכל בני משפחתך שמת היית הכי רוצה לשוחח איתו לחמש דקות? מה היית שואל/ת?" },
  { id: 35, round: 3, text: "ספר/י לבן/בת שיחך בעיה אישית ובקש/י ממנו/ה עצה כיצד ינהג בה. גם שאל/י אותו/ה כיצד הוא/היא נראה/ית לך על הבעיה שסיפרת." },
  { id: 36, round: 3, text: "ספר/י לבן/בת שיחך מה אתה/את אוהב/ת בו/בה. היה/הי ספציפי/ת." },
];

const ROUND_TITLES = {
  1: "קרבה ראשונית",
  2: "העמקה",
  3: "פגיעות אמיתית",
};

const ROUND_DESCRIPTIONS = {
  1: "שאלות פתיחה ליצירת נוחות וחיבור ראשוני",
  2: "שאלות עמוקות יותר שחושפות ערכים, חלומות וזיכרונות",
  3: "שאלות פגיעות שיוצרות קרבה אמיתית ועמוקה",
};

const ROUND_BREAK_MESSAGES = {
  2: {
    title: "סיימנו את השלב הראשון",
    message: "עכשיו נצלול קצת עמוק יותר. השאלות הבאות מבקשות ממך לשתף יותר — על ערכים, חלומות, ורגעים שעיצבו אותך. קח/קחי נשימה.",
    emoji: "🌊",
  },
  3: {
    title: "מוכנים לשלב האחרון?",
    message: "זה השלב של פגיעות אמיתית. השאלות כאן עשויות להרגיש קצת מפחידות — ובדיוק משם נוצרת קרבה אמיתית. אין תשובות נכונות. יש רק כנות.",
    emoji: "💛",
  },
};

/* ── Helpers ───────────────────────────────────────────────────────────────── */
function loadProgress(): SavedProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedProgress) : null;
  } catch {
    return null;
  }
}

function saveProgress(data: SavedProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ── Component ─────────────────────────────────────────────────────────────── */
export function ThirtySixQuestionsClient() {
  // currentCard: 0-35 (index into ALL_QUESTIONS)
  const [currentCard, setCurrentCard] = useState(0);
  const [phase, setPhase] = useState<"intro" | "playing" | "break" | "done">("intro");
  const [breakRound, setBreakRound] = useState<2 | 3 | null>(null);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(TIMER_DURATION);
  const [timerRunning, setTimerRunning] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load progress on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setCurrentCard(saved.currentCard);
      setPhase("playing");
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds((s) => {
          if (s <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning, timerSeconds]);

  const resetTimer = useCallback(() => {
    setTimerSeconds(TIMER_DURATION);
    setTimerRunning(false);
  }, []);

  const toggleTimer = useCallback(() => {
    if (timerRunning) {
      setTimerRunning(false);
    } else {
      if (timerSeconds === 0) setTimerSeconds(TIMER_DURATION);
      setTimerRunning(true);
    }
  }, [timerRunning, timerSeconds]);

  const handleNext = useCallback(() => {
    const nextIdx = currentCard + 1;

    // Check if next card is first card of round 2 or round 3 — show break
    if (nextIdx < ALL_QUESTIONS.length) {
      const nextQ = ALL_QUESTIONS[nextIdx];
      const currQ = ALL_QUESTIONS[currentCard];
      if (nextQ.round !== currQ.round && (nextQ.round === 2 || nextQ.round === 3)) {
        setBreakRound(nextQ.round as 2 | 3);
        setPhase("break");
        saveProgress({ currentCard, savedAt: new Date().toISOString() });
        resetTimer();
        return;
      }
    }

    if (nextIdx >= ALL_QUESTIONS.length) {
      setPhase("done");
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    setFlipping(true);
    setTimeout(() => {
      setCurrentCard(nextIdx);
      setFlipping(false);
      saveProgress({ currentCard: nextIdx, savedAt: new Date().toISOString() });
      resetTimer();
    }, 300);
  }, [currentCard, resetTimer]);

  const handlePrev = useCallback(() => {
    if (currentCard === 0) return;
    setFlipping(true);
    setTimeout(() => {
      const prevIdx = currentCard - 1;
      setCurrentCard(prevIdx);
      setFlipping(false);
      saveProgress({ currentCard: prevIdx, savedAt: new Date().toISOString() });
      resetTimer();
    }, 300);
  }, [currentCard, resetTimer]);

  const handleContinueFromBreak = useCallback(() => {
    const nextIdx = currentCard + 1;
    setFlipping(true);
    setTimeout(() => {
      setCurrentCard(nextIdx);
      setFlipping(false);
      setPhase("playing");
      setBreakRound(null);
      saveProgress({ currentCard: nextIdx, savedAt: new Date().toISOString() });
    }, 300);
  }, [currentCard]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentCard(0);
    setPhase("intro");
    setBreakRound(null);
    resetTimer();
  }, [resetTimer]);

  const currentQuestion = ALL_QUESTIONS[currentCard];
  const roundQuestions = ALL_QUESTIONS.filter((q) => q.round === currentQuestion?.round);
  const questionInRound = currentQuestion ? roundQuestions.findIndex((q) => q.id === currentQuestion.id) + 1 : 0;

  const timerColor =
    timerSeconds > 60
      ? "text-green-600"
      : timerSeconds > 30
        ? "text-amber-500"
        : "text-red-500";

  /* ─── Intro Phase ────────────────────────────────────────────────────────── */
  if (phase === "intro") {
    return (
      <div className="space-y-8">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-6xl">🃏</div>
            <h2 className="text-2xl font-bold">36 שאלות ליצירת קרבה</h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
              36 קלפים, 3 שלבים, קרבה אמיתית. שב/י מול מישהו שתרצה/י להכיר
              לעומק — ותנו לשאלות לעשות את העבודה.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center max-w-md mx-auto">
              {([1, 2, 3] as const).map((r) => (
                <div key={r} className="space-y-1">
                  <div className="text-2xl font-bold text-primary">שלב {r}</div>
                  <div className="text-xs font-medium">{ROUND_TITLES[r]}</div>
                  <div className="text-xs text-muted-foreground">12 שאלות</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setPhase("playing")}
                className="inline-flex px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
              >
                בואו נתחיל
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              ההתקדמות נשמרת אוטומטית — אפשר לעצור ולהמשיך מאוחר יותר
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ─── Round Break Phase ───────────────────────────────────────────────────── */
  if (phase === "break" && breakRound) {
    const breakData = ROUND_BREAK_MESSAGES[breakRound];
    return (
      <div className="space-y-8">
        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-10 text-center space-y-6">
            <div className="text-5xl">{breakData.emoji}</div>
            <Badge variant="outline" className="text-primary border-primary/30">
              מעבר לשלב {breakRound}
            </Badge>
            <h2 className="text-2xl font-bold">{breakData.title}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-base">
              {breakData.message}
            </p>
            <div className="bg-background/60 rounded-2xl p-4 max-w-xs mx-auto">
              <p className="text-sm font-medium">{ROUND_TITLES[breakRound]}</p>
              <p className="text-xs text-muted-foreground mt-1">{ROUND_DESCRIPTIONS[breakRound]}</p>
            </div>
            <button
              onClick={handleContinueFromBreak}
              className="inline-flex px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              מוכנים — נמשיך
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ─── Done Phase ─────────────────────────────────────────────────────────── */
  if (phase === "done") {
    return (
      <div className="space-y-8">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="p-10 text-center space-y-6">
            <div className="text-5xl">💛</div>
            <h2 className="text-2xl font-bold">סיימתם את כל 36 השאלות</h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
              מחקר אהרון הראה שהאנשים שענו על כל 36 השאלות האלה יחד הרגישו
              קרבה עמוקה זה לזה. עכשיו אתם יודעים למה.
            </p>
            <div className="bg-background/60 rounded-2xl p-6 max-w-sm mx-auto space-y-2">
              <p className="font-semibold text-primary">המשימה האחרונה:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                הסתכלו זה לזו/זו לזה בעיניים. בשקט. ארבע דקות שלמות.
                ללא מילים.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-colors"
            >
              שחק/שחקי שוב מההתחלה
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ─── Playing Phase ──────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6" dir="rtl">
      {/* Round + Progress Header */}
      <div className="flex items-center justify-between gap-4">
        <Badge
          variant="outline"
          className="text-primary border-primary/30 font-medium"
        >
          שלב {currentQuestion.round}: {ROUND_TITLES[currentQuestion.round]}
        </Badge>
        <span className="text-sm text-muted-foreground">
          שאלה {currentCard + 1} מתוך 36
        </span>
      </div>

      {/* Progress Dots by Round */}
      <div className="space-y-2">
        {([1, 2, 3] as const).map((r) => {
          const rQuestions = ALL_QUESTIONS.filter((q) => q.round === r);
          return (
            <div key={r} className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground w-8 shrink-0">
                {r === currentQuestion.round ? (
                  <span className="font-semibold text-primary">{r}</span>
                ) : (
                  r
                )}
              </span>
              <div className="flex gap-1 flex-1">
                {rQuestions.map((q) => {
                  const qGlobalIdx = ALL_QUESTIONS.findIndex((x) => x.id === q.id);
                  const isDone = qGlobalIdx < currentCard;
                  const isCurrent = qGlobalIdx === currentCard;
                  return (
                    <div
                      key={q.id}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        isDone
                          ? "bg-primary"
                          : isCurrent
                            ? "bg-primary/50"
                            : "bg-muted"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Question Card */}
      <div
        className={`transition-opacity duration-300 ${flipping ? "opacity-0" : "opacity-100"}`}
      >
        <Card className="border-primary/15 bg-[#FFFAF7] shadow-lg shadow-primary/5 min-h-[200px]">
          <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
            <div className="text-5xl font-bold text-primary/15 select-none leading-none">
              {currentCard + 1}
            </div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground max-w-lg">
              {currentQuestion.text}
            </p>
            <p className="text-xs text-muted-foreground/60">
              שאלה {questionInRound} מתוך 12 בשלב {currentQuestion.round}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Timer Section */}
      <div className="flex items-center gap-3 justify-center">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
          <div
            role="checkbox"
            aria-checked={timerEnabled}
            tabIndex={0}
            onClick={() => {
              setTimerEnabled((t) => !t);
              resetTimer();
            }}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                setTimerEnabled((t) => !t);
                resetTimer();
              }
            }}
            className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative ${
              timerEnabled ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                timerEnabled ? "left-4" : "left-0.5"
              }`}
            />
          </div>
          טיימר 2 דקות לכל שאלה
        </label>

        {timerEnabled && (
          <div className="flex items-center gap-2">
            <span className={`font-mono text-lg font-semibold ${timerColor}`}>
              {formatTime(timerSeconds)}
            </span>
            <button
              onClick={toggleTimer}
              className="text-xs px-3 py-1 rounded-full border border-border/50 hover:bg-muted/50 transition-colors"
            >
              {timerRunning ? "עצור" : timerSeconds === 0 ? "אפס" : "התחל"}
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentCard === 0}
          className="px-6 py-2.5 text-sm border border-border/50 rounded-full hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          הקודם
        </button>

        <div className="text-center">
          <button
            onClick={handleReset}
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-4"
          >
            התחל מחדש
          </button>
        </div>

        <button
          onClick={handleNext}
          className="px-6 py-2.5 text-sm bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
        >
          {currentCard === ALL_QUESTIONS.length - 1 ? "סיום" : "הבא"}
        </button>
      </div>
    </div>
  );
}
