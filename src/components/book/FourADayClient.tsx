"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── Types ─────────────────────────────────────────────────────────────────── */

interface DayEntry {
  date: string; // YYYY-MM-DD
  savedAt: string; // ISO timestamp
  sentences: [string, string, string, string];
}

/* ── Constants ──────────────────────────────────────────────────────────────── */

const STORAGE_KEY = "omanut-four-a-day";

const FIELD_PROMPTS: [string, string, string, string] = [
  "משפט חדש על עצמי:",
  "משפט חדש על הצד השני:",
  "משפט חדש על זוגיות:",
  "משפט חופשי:",
];

const FIELD_PLACEHOLDERS: [string, string, string, string] = [
  'לדוגמה: \u201Cאני ראוי/ה לאהבה גם בלי להיות מושלם/ת\u201D',
  'לדוגמה: \u201Cיש אנשים טובים שרוצים חיבור אמיתי\u201D',
  'לדוגמה: \u201Cזוגיות יכולה להיות מקום בטוח ומחזק\u201D',
  "כל מה שעולה לך כרגע...",
];

const FIELD_EMOJIS: [string, string, string, string] = ["🌟", "🤝", "💑", "✨"];

const INSPIRATION_SENTENCES = [
  "אני שווה אהבה גם בלי להיות מושלם/ת",
  "יש מי שיאהב אותי בגלל מי שאני, לא למרות",
  "אני מוכן/ה לקשר אמיתי ומלא",
  "הפתיחות שלי היא כוח, לא חולשה",
  "יש אנשים טובים ואותנטיים שמחפשים חיבור",
  "זוגיות יכולה להיות מקום בטוח ומחזק",
  "אני לומד/ת ומשתפר/ת כל יום",
  "אני ראוי/ה לאהבה בדיוק כמו שאני",
  "הלב שלי פתוח לאפשרויות חדשות",
  "אני בוחר/ת לראות את הטוב בעצמי ובאחרים",
];

/* ── Helpers ─────────────────────────────────────────────────────────────────── */

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function loadEntries(): DayEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DayEntry[]) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: DayEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function formatDate(isoDate: string): string {
  return new Date(isoDate + "T00:00:00").toLocaleDateString("he-IL", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function calculateStreak(entries: DayEntry[]): number {
  if (entries.length === 0) return 0;
  const dates = [...new Set(entries.map((e) => e.date))].sort().reverse();
  const today = getTodayDate();
  let streak = 0;
  let checkDate = today;

  for (const date of dates) {
    if (date === checkDate) {
      streak++;
      const d = new Date(checkDate + "T00:00:00");
      d.setDate(d.getDate() - 1);
      checkDate = d.toISOString().split("T")[0];
    } else {
      break;
    }
  }
  return streak;
}

function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

/* ── Sub-components ──────────────────────────────────────────────────────────── */

const QUOTE_CARD_COLORS = [
  { bg: "bg-primary/10", border: "border-primary/25", text: "text-primary" },
  { bg: "bg-secondary/10", border: "border-secondary/25", text: "text-secondary" },
  { bg: "bg-accent/15", border: "border-accent/35", text: "text-[#8A6820]" },
  { bg: "bg-green-50", border: "border-green-200", text: "text-green-800" },
];

interface QuoteCardProps {
  sentence: string;
  label: string;
  emoji: string;
  colorIndex: number;
}

function QuoteCard({ sentence, label, emoji, colorIndex }: QuoteCardProps) {
  const colors = QUOTE_CARD_COLORS[colorIndex % QUOTE_CARD_COLORS.length];
  return (
    <div
      className={`rounded-2xl p-5 border-2 ${colors.bg} ${colors.border} space-y-2`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl" role="img" aria-hidden="true">
          {emoji}
        </span>
        <span className={`text-xs font-semibold uppercase tracking-wide ${colors.text}`}>
          {label}
        </span>
      </div>
      <p className="text-base font-medium text-foreground leading-relaxed">
        &ldquo;{sentence}&rdquo;
      </p>
    </div>
  );
}

/* ── Calendar Dot ────────────────────────────────────────────────────────────── */

interface CalendarDotProps {
  date: string;
  completed: boolean;
  isToday: boolean;
}

function CalendarDot({ date, completed, isToday }: CalendarDotProps) {
  const day = new Date(date + "T00:00:00").getDate();
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`
          w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
          transition-all
          ${
            completed
              ? "bg-primary text-white shadow-sm shadow-primary/30"
              : isToday
                ? "border-2 border-primary/40 text-primary"
                : "bg-muted/50 text-muted-foreground"
          }
        `}
        title={formatDate(date)}
      >
        {completed ? "✓" : day}
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────────── */

export function FourADayClient() {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<DayEntry | null>(null);
  const [drafts, setDrafts] = useState<[string, string, string, string]>(["", "", "", ""]);
  const [showInspiration, setShowInspiration] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [saved, setSaved] = useState(false);

  const today = getTodayDate();

  useEffect(() => {
    const all = loadEntries();
    setEntries(all);
    const todayData = all.find((e) => e.date === today) ?? null;
    setTodayEntry(todayData);
    if (todayData) {
      setDrafts([...todayData.sentences] as [string, string, string, string]);
    }
  }, [today]);

  const allFilled = drafts.every((s) => s.trim().length > 0);

  const handleSave = useCallback(() => {
    if (!allFilled) return;
    const entry: DayEntry = {
      date: today,
      savedAt: new Date().toISOString(),
      sentences: drafts,
    };
    const without = entries.filter((e) => e.date !== today);
    const updated = [entry, ...without].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    saveEntries(updated);
    setEntries(updated);
    setTodayEntry(entry);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [drafts, allFilled, entries, today]);

  const handleEdit = useCallback(() => {
    setTodayEntry(null);
  }, []);

  const streak = calculateStreak(entries);
  const last30 = getLast30Days();
  const completedDates = new Set(entries.map((e) => e.date));

  /* ─── View: Today complete ──────────────────────────────────────────────── */
  if (todayEntry) {
    return (
      <div className="space-y-8" dir="rtl">
        {/* Streak Banner */}
        <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
          <span className="text-xl" role="img" aria-label="אש">🔥</span>
          <span className="font-semibold text-primary">
            {streak} {streak === 1 ? "יום רצוף" : "ימים רצופים"}!
          </span>
        </div>

        {/* Today header */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8 text-center space-y-2">
            <div className="text-5xl" role="img" aria-label="כוכב">✨</div>
            <h2 className="text-2xl font-bold text-secondary">
              המשפטים של היום
            </h2>
            <p className="text-muted-foreground text-sm">
              {formatDate(today)}
            </p>
          </CardContent>
        </Card>

        {/* Quote Cards */}
        <div className="space-y-4">
          {todayEntry.sentences.map((sentence, i) => (
            <QuoteCard
              key={i}
              sentence={sentence}
              label={FIELD_PROMPTS[i].replace(":", "")}
              emoji={FIELD_EMOJIS[i]}
              colorIndex={i}
            />
          ))}
        </div>

        {/* Calendar */}
        <Card className="border-border/30">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-secondary text-sm text-center">
              30 הימים האחרונים
            </h3>
            <div className="grid grid-cols-10 gap-1.5">
              {last30.map((date) => (
                <CalendarDot
                  key={date}
                  date={date}
                  completed={completedDates.has(date)}
                  isToday={date === today}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {completedDates.size} ימים הושלמו מתוך 30
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleEdit}
            className="px-6 py-3 border border-border/50 rounded-full font-medium text-sm hover:bg-muted/50 transition-colors text-secondary"
          >
            ערוך משפטים של היום
          </button>
          <button
            onClick={() => setShowHistory((v) => !v)}
            className="px-6 py-3 border border-border/50 rounded-full font-medium text-sm hover:bg-muted/50 transition-colors text-secondary"
          >
            {showHistory ? "הסתר היסטוריה" : `היסטוריה (${entries.length} ימים)`}
          </button>
        </div>

        {/* History */}
        {showHistory && (
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary">ימים קודמים</h3>
            {entries
              .filter((e) => e.date !== today)
              .slice(0, 7)
              .map((entry) => (
                <Card key={entry.date} className="border-border/30">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {formatDate(entry.date)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {entry.sentences.map((s, i) => (
                        <p key={i} className="text-sm text-foreground leading-relaxed">
                          <span className="text-muted-foreground text-xs ml-1">
                            {FIELD_EMOJIS[i]}
                          </span>
                          &ldquo;{s}&rdquo;
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    );
  }

  /* ─── View: Fill in today ───────────────────────────────────────────────── */
  return (
    <div className="space-y-8" dir="rtl">
      {/* Streak Banner */}
      {streak > 0 && (
        <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
          <span className="text-xl" role="img" aria-label="אש">🔥</span>
          <span className="font-semibold text-primary text-sm">
            {streak} {streak === 1 ? "יום רצוף" : "ימים רצופים"} של אימון חשיבה!
          </span>
        </div>
      )}

      {/* Main Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-8 space-y-7">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-5xl" role="img" aria-label="עיפרון">✏️</div>
            <h2 className="text-2xl font-bold text-secondary">
              4 משפטים ליום זה
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
              כל יום, 4 משפטים שמחליפים את הסיפור הישן בסיפור חדש. כתוב/י
              במילים שלך — לא מה שנכון, אלא מה שרוצה להיות אמיתי בשבילך.
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-5">
            {FIELD_PROMPTS.map((prompt, i) => (
              <div key={i} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-secondary">
                  <span role="img" aria-hidden="true">{FIELD_EMOJIS[i]}</span>
                  {prompt}
                </label>
                <input
                  type="text"
                  value={drafts[i]}
                  onChange={(e) => {
                    const next = [...drafts] as [string, string, string, string];
                    next[i] = e.target.value;
                    setDrafts(next);
                  }}
                  placeholder={FIELD_PLACEHOLDERS[i]}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/50"
                  aria-label={prompt}
                />
              </div>
            ))}
          </div>

          {/* Inspiration Toggle */}
          <div className="border-t border-border/30 pt-5">
            <button
              onClick={() => setShowInspiration((v) => !v)}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <span role="img" aria-hidden="true">💡</span>
              {showInspiration ? "הסתר השראה" : "צריך/ה השראה?"}
            </button>
            {showInspiration && (
              <div className="mt-4 grid grid-cols-1 gap-2">
                {INSPIRATION_SENTENCES.map((sentence, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      // Find first empty field or use field 0
                      const emptyIndex = drafts.findIndex((s) => s.trim() === "");
                      if (emptyIndex !== -1) {
                        const next = [...drafts] as [string, string, string, string];
                        next[emptyIndex] = sentence;
                        setDrafts(next);
                      }
                    }}
                    className="text-right text-sm px-4 py-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors border border-border/30 hover:border-primary/30"
                  >
                    &ldquo;{sentence}&rdquo;
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!allFilled}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99]"
          >
            {saved ? "✓ נשמר!" : "שמור/י את 4 המשפטים של היום"}
          </button>
        </CardContent>
      </Card>

      {/* Calendar */}
      {entries.length > 0 && (
        <Card className="border-border/30">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-secondary text-sm text-center">
              30 הימים האחרונים
            </h3>
            <div className="grid grid-cols-10 gap-1.5">
              {last30.map((date) => (
                <CalendarDot
                  key={date}
                  date={date}
                  completed={completedDates.has(date)}
                  isToday={date === today}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {completedDates.size} ימים הושלמו
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
