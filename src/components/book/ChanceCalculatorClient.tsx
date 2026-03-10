"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ── Types ─────────────────────────────────────────────────────────────────

type TrafficLight = "green" | "yellow" | "red";

interface Indicator {
  id: string;
  label: string;
  question: string;
  options: { value: 3 | 2 | 1; label: string; color: TrafficLight }[];
}

interface ChanceEntry {
  timestamp: string;
  name: string;
  answers: Record<string, number>;
  total: number;
  light: TrafficLight;
}

const STORAGE_KEY = "omanut-chance-calculator";

// ── Indicator definitions ─────────────────────────────────────────────────

const indicators: Indicator[] = [
  {
    id: "comfort",
    label: "נוחות להיות עצמי",
    question: "כמה נוח לי להיות עצמי לידו/ה?",
    options: [
      { value: 3, label: "מרגיש/ת חופשי/ה לגמרי להיות עצמי", color: "green" },
      { value: 2, label: "בינוני — שומר/ת על חלק מעצמי", color: "yellow" },
      { value: 1, label: "מרגיש/ת צורך לסנן את עצמי", color: "red" },
    ],
  },
  {
    id: "curiosity",
    label: "סקרנות",
    question: "כמה אני סקרן/ית לגביו/ה?",
    options: [
      { value: 3, label: "מאוד סקרן/ית — רוצה לדעת עוד ועוד", color: "green" },
      { value: 2, label: "קצת — יש נושאים שמעניינים אותי", color: "yellow" },
      { value: 1, label: "לא ממש — לא מרגיש/ת סקרנות מיוחדת", color: "red" },
    ],
  },
  {
    id: "respect",
    label: "כבוד הדדי",
    question: "האם יש כבוד הדדי?",
    options: [
      { value: 3, label: "ברור — יש כבוד הדדי עמוק", color: "green" },
      { value: 2, label: "ברוב המקרים — אבל לא תמיד", color: "yellow" },
      { value: 1, label: "לא ממש — יש רגעים שמרגיש/ת חוסר כבוד", color: "red" },
    ],
  },
  {
    id: "consistency",
    label: "עקביות",
    question: "האם הוא/היא עקבי/ת?",
    options: [
      { value: 3, label: "כן — ניתן לסמוך ולצפות את ההתנהגות שלו/שלה", color: "green" },
      { value: 2, label: "לפעמים — יש תנודות שמבלבלות אותי", color: "yellow" },
      { value: 1, label: "לא — ההתנהגות שלו/שלה לא צפויה ומבלבלת", color: "red" },
    ],
  },
  {
    id: "safety",
    label: "תחושת בטיחות",
    question: "האם אני מרגיש/ת בטוח/ה?",
    options: [
      { value: 3, label: "כן — מרגיש/ת בטוח/ה רגשית ופיזית לידו/ה", color: "green" },
      { value: 2, label: "בינוני — יש בטיחות חלקית", color: "yellow" },
      { value: 1, label: "לא — יש תחושת עוררות חרדתית בנוכחותו/ה", color: "red" },
    ],
  },
  {
    id: "values",
    label: "חזון דומה",
    question: "האם יש לנו חזון דומה?",
    options: [
      { value: 3, label: "כן — יש יישור קו בדברים החשובים לי", color: "green" },
      { value: 2, label: "חלקית — יש כיוון דומה אבל גם פערים", color: "yellow" },
      { value: 1, label: "לא — הכיוונים שלנו שונים מהותית", color: "red" },
    ],
  },
  {
    id: "afterfeeling",
    label: "תחושה אחרי מפגש",
    question: "איך אני מרגיש/ת אחרי מפגש?",
    options: [
      { value: 3, label: "מלא/ה ומועלה/ת — המפגש ממלא אותי", color: "green" },
      { value: 2, label: "ניטרלי/ת — לא מרגיש/ת הרבה", color: "yellow" },
      { value: 1, label: "מרוקן/ת או מבולבל/ת — המפגש מנקז", color: "red" },
    ],
  },
  {
    id: "future",
    label: "חזון לעתיד",
    question: "האם אני יכול/ה לדמיין עתיד?",
    options: [
      { value: 3, label: "כן — אני מדמיין/ת אותנו יחד בצורה טבעית", color: "green" },
      { value: 2, label: "אולי — קשה לי לדמיין אבל לא נשלל", color: "yellow" },
      { value: 1, label: "לא — לא מסוגל/ת לדמיין עתיד משותף", color: "red" },
    ],
  },
];

// ── Scoring ───────────────────────────────────────────────────────────────

function getTrafficLight(total: number): TrafficLight {
  if (total >= 20) return "green";
  if (total >= 14) return "yellow";
  return "red";
}

const LIGHT_CONFIG: Record<
  TrafficLight,
  { emoji: string; label: string; color: string; bg: string; border: string; message: string }
> = {
  green: {
    emoji: "🟢",
    label: "אור ירוק",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#86efac",
    message: "אור ירוק! כדאי להמשיך להשקיע",
  },
  yellow: {
    emoji: "🟡",
    label: "אור צהוב",
    color: "#ca8a04",
    bg: "#fefce8",
    border: "#fde047",
    message: "עצור רגע. יש פוטנציאל אבל צריך תשומת לב",
  },
  red: {
    emoji: "🔴",
    label: "אור אדום",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fca5a5",
    message: "אור אדום. כנראה שווה לשקול מחדש",
  },
};

const OPTION_STYLES: Record<TrafficLight, { selected: string; dot: string }> = {
  green: {
    selected: "border-green-500 bg-green-50 dark:bg-green-950/20",
    dot: "bg-green-500",
  },
  yellow: {
    selected: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
    dot: "bg-yellow-500",
  },
  red: {
    selected: "border-red-500 bg-red-50 dark:bg-red-950/20",
    dot: "bg-red-500",
  },
};

// ── localStorage helpers ──────────────────────────────────────────────────

function loadEntries(): ChanceEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChanceEntry[]) : [];
  } catch {
    return [];
  }
}

function saveEntry(entry: ChanceEntry): void {
  if (typeof window === "undefined") return;
  try {
    const entries = loadEntries();
    // Replace existing entry for same name (case-insensitive)
    const idx = entries.findIndex(
      (e) => e.name.trim().toLowerCase() === entry.name.trim().toLowerCase(),
    );
    if (idx >= 0) {
      entries[idx] = entry;
    } else {
      entries.unshift(entry);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

// ── Sub-components ────────────────────────────────────────────────────────

interface IndicatorCardProps {
  indicator: Indicator;
  value: number | undefined;
  onChange: (val: number) => void;
}

function IndicatorCard({ indicator, value, onChange }: IndicatorCardProps) {
  return (
    <div className="space-y-3">
      <p className="font-medium text-sm leading-snug">{indicator.question}</p>
      <div className="space-y-2">
        {indicator.options.map((opt) => {
          const isSelected = value === opt.value;
          const styles = OPTION_STYLES[opt.color];
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`w-full text-right p-3 rounded-lg border-2 transition-all duration-150 flex items-center gap-3 text-sm hover:border-primary/40 ${
                isSelected
                  ? styles.selected
                  : "border-border/40 bg-transparent hover:bg-muted/30"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full shrink-0 ${styles.dot} ${!isSelected ? "opacity-30" : ""}`}
              />
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TrafficLightDisplayProps {
  light: TrafficLight;
  total: number;
}

function TrafficLightDisplay({ light, total }: TrafficLightDisplayProps) {
  const cfg = LIGHT_CONFIG[light];
  return (
    <div
      className="rounded-2xl border-2 p-8 text-center transition-all"
      style={{
        backgroundColor: cfg.bg,
        borderColor: cfg.border,
      }}
    >
      {/* Traffic light visual */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="bg-gray-800 rounded-2xl p-3 flex flex-col gap-2 w-14">
          <div
            className={`w-8 h-8 rounded-full mx-auto transition-all duration-300 ${
              light === "red" ? "opacity-100" : "opacity-20"
            } bg-red-500`}
          />
          <div
            className={`w-8 h-8 rounded-full mx-auto transition-all duration-300 ${
              light === "yellow" ? "opacity-100" : "opacity-20"
            } bg-yellow-400`}
          />
          <div
            className={`w-8 h-8 rounded-full mx-auto transition-all duration-300 ${
              light === "green" ? "opacity-100" : "opacity-20"
            } bg-green-500`}
          />
        </div>
      </div>

      <p
        className="text-2xl font-bold mb-2"
        style={{ color: cfg.color }}
      >
        {cfg.label}
      </p>
      <p className="text-base font-medium mb-4" style={{ color: cfg.color }}>
        {cfg.message}
      </p>
      <p className="text-sm text-muted-foreground">
        ציון: {total} מתוך 24
      </p>
    </div>
  );
}

// ── Result view ───────────────────────────────────────────────────────────

interface ResultViewProps {
  entry: ChanceEntry;
  answers: Record<string, number>;
  onReset: () => void;
  onNewPerson: () => void;
}

function ResultView({ entry, answers, onReset, onNewPerson }: ResultViewProps) {
  const cfg = LIGHT_CONFIG[entry.light];

  // Green indicators
  const greens = indicators.filter((ind) => answers[ind.id] === 3);
  const reds = indicators.filter((ind) => answers[ind.id] === 1);

  const handleShare = () => {
    const text = encodeURIComponent(
      `השתמשתי ב"רמזור הסיכויים" מספר "אומנות הקשר" ${cfg.emoji}\n\nהתוצאה: ${cfg.message}\n\nתנסה גם: omanut-hakesher.co.il/book/11/chance-calculator`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Traffic light result */}
      <TrafficLightDisplay light={entry.light} total={entry.total} />

      {/* Breakdown */}
      {(greens.length > 0 || reds.length > 0) && (
        <Card className="border-border/50">
          <CardContent className="p-6 space-y-4">
            {greens.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-green-600 mb-2">
                  נקודות חוזק ({greens.length})
                </p>
                <ul className="space-y-1">
                  {greens.map((ind) => (
                    <li key={ind.id} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      {ind.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {reds.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-red-600 mb-2">
                  נקודות לתשומת לב ({reds.length})
                </p>
                <ul className="space-y-1">
                  {reds.map((ind) => (
                    <li key={ind.id} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      {ind.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Framing note */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium">חשוב לזכור:</span> הרמזור לא מחליט
            בשבילך. הוא כלי שעוזר לך לראות את התמונה בצורה ברורה יותר. לפעמים
            אור צהוב הוא הזמנה לשיחה, לא לסיום.
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
          onClick={onNewPerson}
          variant="outline"
          className="flex-1 rounded-full gap-2"
        >
          <span aria-hidden="true">➕</span>
          בדוק אדם חדש
        </Button>
        <Button
          onClick={onReset}
          variant="ghost"
          className="flex-1 rounded-full text-muted-foreground hover:text-foreground"
        >
          ערוך תשובות
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

// ── Main component ────────────────────────────────────────────────────────

type Phase = "name" | "questions" | "result";

export function ChanceCalculatorClient() {
  const [phase, setPhase] = useState<Phase>("name");
  const [personName, setPersonName] = useState("");
  const [nameError, setNameError] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedEntry, setCompletedEntry] = useState<ChanceEntry | null>(null);

  const total = indicators.length;
  const currentIndicator = indicators[currentIdx];
  const currentValue = currentIndicator ? answers[currentIndicator.id] : undefined;
  const progress = Math.round(((currentIdx + 1) / total) * 100);
  const answeredCount = Object.keys(answers).length;

  const handleNameSubmit = useCallback(() => {
    const trimmed = personName.trim();
    if (!trimmed) {
      setNameError("נא להזין שם או כינוי");
      return;
    }
    setNameError("");
    setPhase("questions");
  }, [personName]);

  const handleAnswer = useCallback(
    (val: number) => {
      if (!currentIndicator) return;
      setAnswers((prev) => ({ ...prev, [currentIndicator.id]: val }));
    },
    [currentIndicator],
  );

  const goNext = useCallback(() => {
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      // Compute and save result
      const scoreTotal = Object.values(answers).reduce((sum, v) => sum + v, 0);
      const light = getTrafficLight(scoreTotal);
      const entry: ChanceEntry = {
        timestamp: new Date().toISOString(),
        name: personName.trim(),
        answers,
        total: scoreTotal,
        light,
      };
      saveEntry(entry);
      setCompletedEntry(entry);
      setPhase("result");
    }
  }, [currentIdx, total, answers, personName]);

  const goBack = useCallback(() => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  }, [currentIdx]);

  const resetToQuestions = useCallback(() => {
    setPhase("questions");
    setCurrentIdx(0);
    setCompletedEntry(null);
  }, []);

  const startNewPerson = useCallback(() => {
    setPhase("name");
    setPersonName("");
    setAnswers({});
    setCurrentIdx(0);
    setCompletedEntry(null);
  }, []);

  // ── Phase: result ────────────────────────────────────────────────────────
  if (phase === "result" && completedEntry) {
    return (
      <ResultView
        entry={completedEntry}
        answers={answers}
        onReset={resetToQuestions}
        onNewPerson={startNewPerson}
      />
    );
  }

  // ── Phase: name ──────────────────────────────────────────────────────────
  if (phase === "name") {
    return (
      <Card className="border-border/50">
        <CardContent className="p-8 text-center">
          <span className="text-6xl mb-6 block" aria-hidden="true">
            🚦
          </span>
          <h2 className="text-2xl font-bold mb-3">רמזור הסיכויים</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            בדוק את הפוטנציאל של קשר עם מישהו ספציפי — 8 אינדיקטורים שיעזרו לך
            לראות תמונה ברורה יותר.
          </p>

          <div className="max-w-xs mx-auto space-y-3">
            <label className="block text-sm font-medium text-right">
              על מי אתה/את רוצה לבדוק?
            </label>
            <input
              type="text"
              value={personName}
              onChange={(e) => {
                setPersonName(e.target.value);
                if (nameError) setNameError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameSubmit();
              }}
              placeholder="שם, כינוי, ר׳ב, אחות גבוהה..."
              className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background text-right focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              dir="rtl"
            />
            {nameError && (
              <p className="text-xs text-destructive text-right">{nameError}</p>
            )}
            <Button
              onClick={handleNameSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3 font-semibold"
            >
              התחל בדיקה
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            8 אינדיקטורים • כ-2 דקות • נשמר רק אצלך
          </p>
        </CardContent>
      </Card>
    );
  }

  // ── Phase: questions ─────────────────────────────────────────────────────
  return (
    <Card className="border-border/50">
      <CardContent className="p-6 md:p-8">
        {/* Header with person name */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            בדיקה עבור:{" "}
            <span className="font-medium text-foreground">{personName}</span>
          </span>
          <span className="text-sm text-muted-foreground">
            {answeredCount}/{total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
            <span>
              {currentIdx + 1} מתוך {total}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current indicator */}
        <div className="min-h-[220px] flex items-start py-4">
          {currentIndicator && (
            <div className="w-full space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide mb-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentValue === 3
                      ? "bg-green-500"
                      : currentValue === 2
                        ? "bg-yellow-400"
                        : currentValue === 1
                          ? "bg-red-500"
                          : "bg-muted"
                  }`}
                />
                {currentIndicator.label}
              </div>
              <IndicatorCard
                indicator={currentIndicator}
                value={currentValue}
                onChange={handleAnswer}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/30">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentIdx === 0}
            className="rounded-full px-6"
          >
            הקודם
          </Button>

          <Button
            onClick={goNext}
            disabled={currentValue === undefined}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
          >
            {currentIdx === total - 1 ? "קבל תוצאה" : "הבא"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
