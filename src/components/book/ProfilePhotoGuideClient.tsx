"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── Types ─────────────────────────────────────────────────────────────────── */

interface CheckItem {
  id: string;
  text: string;
}

interface PhotoCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: CheckItem[];
  isWarning?: boolean;
}

interface SavedState {
  checked: string[];
  savedAt: string;
}

/* ── Data ───────────────────────────────────────────────────────────────────── */

const STORAGE_KEY = "omanut-profile-photo";

const CATEGORIES: PhotoCategory[] = [
  {
    id: "main",
    title: "תמונה ראשית",
    emoji: "😊",
    description: "התמונה הראשונה שיראו — הכי חשובה. פנים ברורות, מחייכות, שאפשר לזהות אותך.",
    items: [
      { id: "main-smile", text: "אני מחייך/ת בצורה טבעית (לא מאולצת)" },
      { id: "main-eye", text: "עין ישירה עם המצלמה — קשר עיניים" },
      { id: "main-light", text: "תאורה טובה — פנים מוארות ולא בצל" },
      { id: "main-no-glasses", text: "ללא משקפי שמש (בתמונה הראשית לפחות)" },
      { id: "main-clear-face", text: "הפנים שלי ברורות ותופסות לפחות 60% מהתמונה" },
    ],
  },
  {
    id: "activity",
    title: "תמונה שנייה — פעילות",
    emoji: "🏄",
    description: "אתה/את עושה משהו שאתה/את אוהב/ת. טבעי, אמיתי, מראה מי אתה/את.",
    items: [
      { id: "act-doing", text: "אני עושה משהו שאני באמת אוהב/ת (לא תמונת וויב)" },
      { id: "act-natural", text: "מצב טבעי — לא מבוים ומיוחד" },
      { id: "act-outdoor", text: "רצוי בחוץ או בסביבה מעניינת" },
      { id: "act-context", text: "הפעילות מספרת משהו אמיתי עלי" },
    ],
  },
  {
    id: "social",
    title: "תמונה שלישית — חברתית",
    emoji: "👥",
    description: "אתה/את עם אנשים — מראה שיש לך חיים חברתיים. חשוב שיהיה ברור מי אתה/את בתמונה.",
    items: [
      { id: "soc-identifiable", text: "ברור מי אני בתמונה הקבוצתית" },
      { id: "soc-smiling", text: "אני נראה/ית מאושר/ת ומחובר/ת לאנשים שאיתי" },
      { id: "soc-no-ex", text: "אין בתמונה מישהו/י שנראה/ית כמו בן/בת זוג לשעבר" },
      { id: "soc-good-vibe", text: "הסביבה מראה משהו חיובי עלי" },
    ],
  },
  {
    id: "fullbody",
    title: "תמונה רביעית — מלא/ת גוף",
    emoji: "🧍",
    description: "כל הגוף — בגדים שנוח לך בהם ועמידה שמביעה ביטחון. אותנטי לגמרי.",
    items: [
      { id: "full-posture", text: "עמידה פתוחה ובטוחה — לא כפוף/ה" },
      { id: "full-clothes", text: "בגדים שמרגישים נכון לי ומראים אותי כמו שאני" },
      { id: "full-authentic", text: "נראה/ית כמו שאני נראה/ית ביום יום" },
      { id: "full-quality", text: "תמונה ברזולוציה טובה, לא מטושטשת" },
    ],
  },
  {
    id: "avoid",
    title: "מה לא לעשות",
    emoji: "🚫",
    description: "הדברים שגורמים לפרופיל להיראות פחות אמין — מלכודות נפוצות.",
    isWarning: true,
    items: [
      { id: "no-filters", text: "ללא פילטרים מוגזמים שמשנים את הפנים" },
      { id: "no-gym", text: "ללא סלפי מראה בחדר כושר" },
      { id: "no-group-only", text: "לא רק תמונות קבוצתיות בלי תמונת בודד/ת" },
      { id: "no-ex-crop", text: "לא תמונות שנחתכו מהן מישהו/י (רואים את הזרוע)" },
      { id: "no-old", text: "לא תמונות ישנות מ-3+ שנים שלא מייצגות אותי היום" },
      { id: "no-hat-glasses", text: "לא כל התמונות עם כובע ומשקפי שמש" },
    ],
  },
  {
    id: "test",
    title: "הבדיקה האולטימטיבית",
    emoji: "👀",
    description: "לפני שמעלים — הראה/י ל-3 חברים/ות מהמין השני. בקש/י דעה כנה ואמיתית.",
    items: [
      { id: "test-showed", text: "הראיתי ל-3 אנשים מהמין השני ושמעתי דעה כנה" },
      { id: "test-first", text: "שאלתי: \"מה הרושם הראשוני?\" (לא רק \"נראה טוב?\")" },
      { id: "test-story", text: "שאלתי: \"מה זה מספר עלי?\" — ויוצא משהו אמיתי" },
      { id: "test-variety", text: "ה-4 תמונות מראות צדדים שונים שלי (לא אותו הדבר)" },
    ],
  },
];

function loadState(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedState;
    return parsed.checked ?? [];
  } catch {
    return [];
  }
}

function saveState(checked: string[]) {
  const state: SavedState = { checked, savedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function calcScore(checked: string[]): number {
  const allItems = CATEGORIES.flatMap((c) => c.items);
  // "avoid" items are special: they count as checked = avoid warnings, not do items
  const doItems = CATEGORIES.filter((c) => !c.isWarning).flatMap((c) => c.items);
  const avoidItems = CATEGORIES.filter((c) => c.isWarning).flatMap((c) => c.items);

  const doChecked = doItems.filter((item) => checked.includes(item.id)).length;
  const avoidChecked = avoidItems.filter((item) => checked.includes(item.id)).length;

  const total = allItems.length;
  const score = doChecked + avoidChecked;
  return Math.round((score / total) * 100);
}

function getScoreMessage(score: number): { text: string; emoji: string; color: string } {
  if (score >= 90) return { text: "הפרופיל שלך מוכן! בהצלחה!", emoji: "🏆", color: "text-green-700" };
  if (score >= 75) return { text: "כמעט שם — עוד כמה שיפורים ואתה/את מוכן/ה", emoji: "💪", color: "text-primary" };
  if (score >= 50) return { text: "טוב להתחלה, יש מקום לשיפור", emoji: "🌱", color: "text-yellow-700" };
  return { text: "עוד עבודה לעשות — לא נורא, בדיוק בשביל זה הכלי הזה", emoji: "💡", color: "text-secondary" };
}

/* ── Sub-components ──────────────────────────────────────────────────────────── */

interface CategoryCardProps {
  category: PhotoCategory;
  checked: string[];
  onToggle: (id: string) => void;
}

function CategoryCard({ category, checked, onToggle }: CategoryCardProps) {
  const completedCount = category.items.filter((item) => checked.includes(item.id)).length;
  const total = category.items.length;
  const allDone = completedCount === total;

  return (
    <Card
      className={`border-2 transition-colors ${
        allDone
          ? category.isWarning
            ? "border-green-300 bg-green-50/50"
            : "border-primary/30 bg-primary/5"
          : "border-border/40"
      }`}
    >
      <CardContent className="p-6 space-y-4">
        {/* Category Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-hidden="true">
              {category.emoji}
            </span>
            <div>
              <h3 className="font-bold text-secondary text-base">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
          <Badge
            variant={allDone ? "default" : "outline"}
            className={`shrink-0 ${allDone ? "bg-primary text-white" : ""}`}
          >
            {completedCount}/{total}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              allDone ? "bg-primary" : "bg-primary/60"
            }`}
            style={{ width: `${(completedCount / total) * 100}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {category.items.map((item) => {
            const isChecked = checked.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onToggle(item.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-right transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] ${
                  isChecked
                    ? category.isWarning
                      ? "bg-green-100/70 border border-green-200"
                      : "bg-primary/8 border border-primary/20"
                    : "bg-muted/30 border border-transparent hover:bg-muted/50"
                }`}
                aria-pressed={isChecked}
              >
                <span
                  className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs mt-0.5 transition-all ${
                    isChecked
                      ? "bg-primary border-primary text-white"
                      : "border-border/60"
                  }`}
                >
                  {isChecked && "✓"}
                </span>
                <span
                  className={`text-sm leading-relaxed ${
                    isChecked ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────────── */

export function ProfilePhotoGuideClient() {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    setChecked(loadState());
  }, []);

  const handleToggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveState(next);
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setChecked([]);
    saveState([]);
  }, []);

  const score = calcScore(checked);
  const scoreMsg = getScoreMessage(score);

  const allItems = CATEGORIES.flatMap((c) => c.items);
  const totalChecked = allItems.filter((item) => checked.includes(item.id)).length;

  return (
    <div className="space-y-8" dir="rtl">
      {/* Score Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-8 text-center space-y-4">
          <div className="text-5xl" role="img" aria-label="ניקוד">
            {scoreMsg.emoji}
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-secondary">
              {score}%
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              הפרופיל שלך מוכן ב-{score}%
            </p>
            <p className={`text-base font-semibold ${scoreMsg.color}`}>
              {scoreMsg.text}
            </p>
          </div>
          {/* Progress */}
          <div className="space-y-1">
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {totalChecked} מתוך {allItems.length} פריטים הושלמו
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-secondary/20 bg-secondary/5">
        <CardContent className="p-5 space-y-2">
          <h3 className="font-semibold text-secondary flex items-center gap-2">
            <span role="img" aria-label="מידע">ℹ️</span>
            איך להשתמש בכלי
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            סמן/י כל פריט שאתה/את כבר עומד/ת בו. בקטגוריית &ldquo;מה לא לעשות&rdquo; — סמן/י מה שאתה/את בטוח/ה שאינך עושה. הניקוד יתעדכן אוטומטית.
          </p>
        </CardContent>
      </Card>

      {/* Categories */}
      {CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          checked={checked}
          onToggle={handleToggle}
        />
      ))}

      {/* Final Tip */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-6 space-y-2">
          <h3 className="font-semibold flex items-center gap-2" style={{ color: "#8A6820" }}>
            <span role="img" aria-label="זהב">🌟</span>
            הסוד האחד שכולם שוכחים
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            התמונה הטובה ביותר לא צריכה להיות המיוחדת ביותר — היא צריכה להיות
            הכי אמיתית. אנשים מזהים אותנטיות. תמונה שמרגישה &ldquo;כן, זה
            אני&rdquo; תמשוך בדיוק את מי שיתחבר אליך.
          </p>
        </CardContent>
      </Card>

      {/* Reset */}
      {totalChecked > 0 && (
        <div className="text-center">
          <button
            onClick={handleReset}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            איפוס הרשימה
          </button>
        </div>
      )}
    </div>
  );
}
