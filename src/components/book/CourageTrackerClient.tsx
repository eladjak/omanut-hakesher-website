"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── Types ─────────────────────────────────────────────────────────────────── */

type CourageLevel = "small" | "jump" | "superhero";
type CourageCategory =
  | "initiated-conversation"
  | "said-no"
  | "shared-feeling"
  | "asked-for-help"
  | "let-go"
  | "comfort-zone"
  | "other";

interface CourageEntry {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  savedAt: string; // ISO timestamp
  text: string;
  category: CourageCategory;
  level: CourageLevel;
}

/* ── Constants ──────────────────────────────────────────────────────────────── */

const STORAGE_KEY = "omanut-courage-tracker";

const CATEGORIES: { id: CourageCategory; label: string; emoji: string }[] = [
  { id: "initiated-conversation", label: "יזמתי שיחה", emoji: "💬" },
  { id: "said-no", label: "אמרתי לא", emoji: "🛑" },
  { id: "shared-feeling", label: "שיתפתי רגש", emoji: "❤️" },
  { id: "asked-for-help", label: "ביקשתי עזרה", emoji: "🙏" },
  { id: "let-go", label: "ויתרתי על שליטה", emoji: "🕊️" },
  { id: "comfort-zone", label: "יצאתי מאזור הנוחות", emoji: "🚀" },
  { id: "other", label: "אחר", emoji: "✨" },
];

const LEVELS: { id: CourageLevel; label: string; emoji: string; color: string }[] = [
  { id: "small", label: "צעד קטן", emoji: "🌱", color: "#8BC34A" },
  { id: "jump", label: "קפיצה", emoji: "⚡", color: "#FF9800" },
  { id: "superhero", label: "סופר-גיבור/ה", emoji: "🦸", color: "#E85D75" },
];

const MOTIVATIONAL_QUOTES = [
  "אומץ הוא לא היעדר הפחד — אלא ההחלטה שמשהו אחר חשוב יותר מהפחד. — פרק 8",
  "כל פעם שאתה/את עושה את מה שמפחיד, אתה/את מראה לעצמך מי אתה/את באמת.",
  "המשיכה הכי חזקה שיכולה להיות — זה מישהו שיודע מה הוא/היא רוצה ומוכן/ה לעשות את זה.",
  "אומץ קטן יום אחר יום בונה אדם שיכול לאהוב ולהיאהב בלי לאבד את עצמו.",
  "הפחד לא נעלם. אתה/את פשוט מחליט/ה ללכת קדימה למרות שהוא שם.",
];

/* ── Helpers ─────────────────────────────────────────────────────────────────── */

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function loadEntries(): CourageEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CourageEntry[]) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: CourageEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function formatDate(isoDate: string): string {
  return new Date(isoDate + "T00:00:00").toLocaleDateString("he-IL", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function calculateStreak(entries: CourageEntry[]): number {
  if (entries.length === 0) return 0;
  const dates = [...new Set(entries.map((e) => e.date))].sort().reverse();
  const today = getTodayDate();
  let streak = 0;
  let checkDate = today;

  for (const date of dates) {
    if (date === checkDate) {
      streak++;
      // Move to previous day
      const d = new Date(checkDate + "T00:00:00");
      d.setDate(d.getDate() - 1);
      checkDate = d.toISOString().split("T")[0];
    } else {
      break;
    }
  }
  return streak;
}

function calculateLongestStreak(entries: CourageEntry[]): number {
  if (entries.length === 0) return 0;
  const dates = [...new Set(entries.map((e) => e.date))].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1] + "T00:00:00");
    const curr = new Date(dates[i] + "T00:00:00");
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

function getMostCommonCategory(entries: CourageEntry[]): CourageCategory | null {
  if (entries.length === 0) return null;
  const counts: Record<string, number> = {};
  for (const e of entries) {
    counts[e.category] = (counts[e.category] || 0) + 1;
  }
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return top ? (top[0] as CourageCategory) : null;
}

function getRandomQuote(): string {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

/* ── Sub-components ──────────────────────────────────────────────────────────── */

interface CategoryBadgeProps {
  category: (typeof CATEGORIES)[0];
  selected: boolean;
  onClick: () => void;
}

function CategoryBadge({ category, selected, onClick }: CategoryBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
        border-2 transition-all duration-200 hover:scale-105 active:scale-95
        ${
          selected
            ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
            : "border-border/50 bg-background text-foreground hover:border-primary/50 hover:bg-primary/5"
        }
      `}
      aria-pressed={selected}
    >
      <span role="img" aria-hidden="true">{category.emoji}</span>
      {category.label}
    </button>
  );
}

interface LevelButtonProps {
  level: (typeof LEVELS)[0];
  selected: boolean;
  onClick: () => void;
}

function LevelButton({ level, selected, onClick }: LevelButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-4 px-3 rounded-2xl border-2 text-center transition-all duration-200
        hover:scale-[1.03] hover:shadow-lg active:scale-[0.97] space-y-1
      `}
      style={{
        borderColor: selected ? level.color : "transparent",
        backgroundColor: selected ? `${level.color}22` : "#f8f8f8",
        boxShadow: selected ? `0 4px 12px ${level.color}30` : undefined,
      }}
      aria-pressed={selected}
    >
      <span className="text-3xl block" role="img" aria-label={level.label}>
        {level.emoji}
      </span>
      <span
        className="font-bold text-sm block"
        style={{ color: selected ? level.color : "#1E3A5F" }}
      >
        {level.label}
      </span>
    </button>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────────── */

export function CourageTrackerClient() {
  const [phase, setPhase] = useState<"log" | "celebrate" | "history">("log");
  const [entries, setEntries] = useState<CourageEntry[]>([]);
  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CourageCategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CourageLevel | null>(null);
  const [lastEntry, setLastEntry] = useState<CourageEntry | null>(null);
  const [quote] = useState(getRandomQuote);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const canSubmit = text.trim().length > 0 && selectedCategory !== null && selectedLevel !== null;

  const handleSubmit = useCallback(() => {
    if (!selectedCategory || !selectedLevel) return;
    const entry: CourageEntry = {
      id: Date.now().toString(),
      date: getTodayDate(),
      savedAt: new Date().toISOString(),
      text: text.trim(),
      category: selectedCategory,
      level: selectedLevel,
    };
    const updated = [entry, ...entries];
    saveEntries(updated);
    setEntries(updated);
    setLastEntry(entry);
    setPhase("celebrate");
  }, [text, selectedCategory, selectedLevel, entries]);

  const handleNewEntry = useCallback(() => {
    setText("");
    setSelectedCategory(null);
    setSelectedLevel(null);
    setLastEntry(null);
    setPhase("log");
  }, []);

  const streak = calculateStreak(entries);
  const longestStreak = calculateLongestStreak(entries);
  const topCategory = getMostCommonCategory(entries);
  const topCategoryData = CATEGORIES.find((c) => c.id === topCategory);

  /* ─── Phase: Log ─────────────────────────────────────────────────────────── */
  if (phase === "log") {
    return (
      <div className="space-y-8" dir="rtl">
        {/* Streak Banner */}
        {streak > 0 && (
          <div className="flex items-center justify-center gap-3 py-3 px-5 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
            <span className="text-xl" role="img" aria-label="אש">🔥</span>
            <span className="font-semibold text-primary text-sm">
              {streak} {streak === 1 ? "יום רצוף" : "ימים רצופים"} של אומץ!
            </span>
          </div>
        )}

        {/* Main Log Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8 space-y-7">
            {/* Prompt */}
            <div className="text-center space-y-2">
              <div className="text-5xl" role="img" aria-label="אומץ">🦁</div>
              <h2 className="text-2xl font-bold text-secondary">
                מה עשית היום באומץ?
              </h2>
              <p className="text-muted-foreground text-sm">
                לא משנה כמה קטן — כל מעשה אומץ נחשב
              </p>
            </div>

            {/* Text Area */}
            <div className="space-y-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="תאר/י בקצרה מה עשית..."
                className="w-full min-h-[110px] p-4 rounded-xl border border-border/50 bg-background text-base leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/50"
                aria-label="תיאור מעשה האומץ"
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary">מה סוג האומץ?</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <CategoryBadge
                    key={cat.id}
                    category={cat}
                    selected={selectedCategory === cat.id}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat.id ? null : cat.id
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Level Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary">כמה אומץ לקח?</p>
              <div className="flex gap-3">
                {LEVELS.map((lvl) => (
                  <LevelButton
                    key={lvl.id}
                    level={lvl}
                    selected={selectedLevel === lvl.id}
                    onClick={() =>
                      setSelectedLevel(selectedLevel === lvl.id ? null : lvl.id)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99]"
            >
              רשום/י את מעשה האומץ שלי
            </button>
          </CardContent>
        </Card>

        {/* History Button */}
        {entries.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setPhase("history")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              ראה/י את היומן שלך ({entries.length} רשומות)
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ─── Phase: Celebrate ───────────────────────────────────────────────────── */
  if (phase === "celebrate" && lastEntry) {
    const entryCategory = CATEGORIES.find((c) => c.id === lastEntry.category);
    const entryLevel = LEVELS.find((l) => l.id === lastEntry.level);

    return (
      <div className="space-y-8" dir="rtl">
        {/* Celebration Banner */}
        <Card
          className="border-2 text-center overflow-hidden"
          style={{ borderColor: entryLevel?.color ?? "#E85D75" }}
        >
          <CardContent
            className="p-8 space-y-4"
            style={{
              background: `linear-gradient(135deg, ${entryLevel?.color ?? "#E85D75"}18, transparent)`,
            }}
          >
            <div className="text-6xl" role="img" aria-label="חגיגה">🎉</div>
            <h2 className="text-2xl font-bold text-secondary">
              כל הכבוד! עשית את זה!
            </h2>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {entryCategory && (
                <Badge
                  className="text-sm px-3 py-1"
                  style={{
                    backgroundColor: `${entryLevel?.color ?? "#E85D75"}22`,
                    color: "#1E3A5F",
                    border: `1px solid ${entryLevel?.color ?? "#E85D75"}55`,
                  }}
                >
                  {entryCategory.emoji} {entryCategory.label}
                </Badge>
              )}
              {entryLevel && (
                <Badge
                  className="text-sm px-3 py-1"
                  style={{
                    backgroundColor: entryLevel.color,
                    color: "white",
                    border: "none",
                  }}
                >
                  {entryLevel.emoji} {entryLevel.label}
                </Badge>
              )}
            </div>
            {lastEntry.text && (
              <p className="text-foreground leading-relaxed max-w-md mx-auto bg-white/60 rounded-xl p-4 text-base">
                &ldquo;{lastEntry.text}&rdquo;
              </p>
            )}
          </CardContent>
        </Card>

        {/* Streak Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center space-y-2">
            <div className="text-4xl" role="img" aria-label="רצף">🔥</div>
            <p className="text-2xl font-bold text-primary">
              {streak} {streak === 1 ? "יום רצוף" : "ימים רצופים"} של אומץ!
            </p>
            {streak >= 3 && (
              <p className="text-sm text-muted-foreground">
                {streak >= 7
                  ? "שבוע שלם! אתה/את בונה הרגל חדש 💪"
                  : streak >= 5
                    ? "חמישה ימים! הרצף שלך מרשים!"
                    : "שלושה ימים! הרצף שלך בנייה!"}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Motivational Quote */}
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-6 text-center space-y-2">
            <div className="text-2xl" role="img" aria-label="ציטוט">💡</div>
            <p
              className="text-base leading-relaxed italic"
              style={{ color: "#8A6820" }}
            >
              &ldquo;{quote}&rdquo;
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleNewEntry}
            className="px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            חזרה ליומן
          </button>
          <button
            onClick={() => setPhase("history")}
            className="px-8 py-3.5 border border-border/50 rounded-full font-semibold hover:bg-muted/50 transition-colors text-secondary"
          >
            ראה/י את ההיסטוריה שלי
          </button>
        </div>
      </div>
    );
  }

  /* ─── Phase: History ─────────────────────────────────────────────────────── */
  if (phase === "history") {
    const last10 = entries.slice(0, 10);

    return (
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-secondary">יומן האומץ שלי</h2>
          <button
            onClick={handleNewEntry}
            className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            + רשומה חדשה
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center space-y-1">
              <div className="text-2xl font-bold text-primary">{entries.length}</div>
              <div className="text-xs text-muted-foreground">מעשי אומץ</div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center space-y-1">
              <div className="text-2xl font-bold text-primary">
                {longestStreak}
              </div>
              <div className="text-xs text-muted-foreground">רצף הכי ארוך</div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center space-y-1">
              <div className="text-2xl font-bold text-primary">
                {topCategoryData?.emoji ?? "—"}
              </div>
              <div className="text-xs text-muted-foreground">
                {topCategoryData?.label ?? "טרם הוכנסו רשומות"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        {last10.length === 0 ? (
          <Card className="border-border/30">
            <CardContent className="p-8 text-center space-y-3">
              <div className="text-4xl" role="img" aria-label="ריק">📭</div>
              <p className="text-muted-foreground">עדיין אין רשומות. הוסף/י את הראשונה!</p>
              <button
                onClick={handleNewEntry}
                className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                התחל/י עכשיו
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {last10.map((entry) => {
              const cat = CATEGORIES.find((c) => c.id === entry.category);
              const lvl = LEVELS.find((l) => l.id === entry.level);
              return (
                <Card
                  key={entry.id}
                  className="border-border/30 hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1 min-w-0">
                        {entry.text && (
                          <p className="text-sm leading-relaxed text-foreground line-clamp-2">
                            {entry.text}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {cat && (
                            <Badge variant="outline" className="text-xs">
                              {cat.emoji} {cat.label}
                            </Badge>
                          )}
                          {lvl && (
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: `${lvl.color}22`,
                                color: lvl.color,
                                border: `1px solid ${lvl.color}55`,
                              }}
                            >
                              {lvl.emoji} {lvl.label}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap pt-1 shrink-0">
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {entries.length > 10 && (
          <p className="text-center text-xs text-muted-foreground">
            מוצגות 10 הרשומות האחרונות מתוך {entries.length}
          </p>
        )}
      </div>
    );
  }

  return null;
}
