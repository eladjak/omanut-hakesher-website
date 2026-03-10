"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── Types ─────────────────────────────────────────────────────────────────── */

type IntensityLevel = "mild" | "moderate" | "intense";

interface SubEmotion {
  label: string;
  level: IntensityLevel;
}

interface Emotion {
  id: string;
  name: string;
  color: string;
  textColor: string;
  emoji: string;
  subEmotions: SubEmotion[];
  relationshipContext: string;
  suggestion: string;
}

interface EmotionEntry {
  emotionId: string;
  emotionName: string;
  subEmotion: string;
  level: IntensityLevel;
  timestamp: string;
}

/* ── Data ───────────────────────────────────────────────────────────────────── */

const STORAGE_KEY = "omanut-emotion-log";

const LEVEL_LABELS: Record<IntensityLevel, string> = {
  mild: "עדין",
  moderate: "בינוני",
  intense: "עז",
};

const EMOTIONS: Emotion[] = [
  {
    id: "joy",
    name: "שמחה",
    color: "#FFD700",
    textColor: "#7A6000",
    emoji: "😊",
    subEmotions: [
      { label: "סיפוק", level: "mild" },
      { label: "אושר", level: "moderate" },
      { label: "אקסטזה", level: "intense" },
    ],
    relationshipContext:
      "את/ה מרגיש/ה חיבור. זה הרגע לשים לב מה בדיוק יוצר את זה — כי מה שיוצר שמחה בקשר הוא המפה שלך לאהבה.",
    suggestion:
      "שתף/י את השמחה הזו עם מישהו שאכפת לך ממנו. שמחה שמשותפת מכפילה את עצמה.",
  },
  {
    id: "trust",
    name: "אמון",
    color: "#8BC34A",
    textColor: "#3B5E1A",
    emoji: "🤝",
    subEmotions: [
      { label: "קבלה", level: "mild" },
      { label: "אמינות", level: "moderate" },
      { label: "הערצה", level: "intense" },
    ],
    relationshipContext:
      "יש כאן בסיס. אמון הוא הדלק של כל קשר עמוק — כשאתה/את מרגיש/ה אמון, אתה/את בונה משהו אמיתי.",
    suggestion:
      "מה יוצר את האמון הזה? זהה/י את ההתנהגות הספציפית שבנתה אותו — כך תדע/י מה לחזק.",
  },
  {
    id: "fear",
    name: "פחד",
    color: "#9C27B0",
    textColor: "#FFFFFF",
    emoji: "😨",
    subEmotions: [
      { label: "חשש", level: "mild" },
      { label: "דאגה", level: "moderate" },
      { label: "בהלה", level: "intense" },
    ],
    relationshipContext:
      "משהו מאיים על הביטחון שלך בקשר. פחד בזוגיות הוא כמעט תמיד על שאלה אחת: 'האם אני מספיק/ה?'",
    suggestion:
      "שאל/י את עצמך: מה הדבר הגרוע ביותר שאתה/את מפחד/ת שיקרה? ברגע שתתמודד/י עם הפחד בשמו — הוא מתחיל לאבד כוח.",
  },
  {
    id: "surprise",
    name: "הפתעה",
    color: "#FF9800",
    textColor: "#FFFFFF",
    emoji: "😲",
    subEmotions: [
      { label: "סקרנות", level: "mild" },
      { label: "תדהמה", level: "moderate" },
      { label: "הלם", level: "intense" },
    ],
    relationshipContext:
      "משהו לא היה צפוי. הפתעה פותחת חלון — אתה/את פתוח/ה כרגע לקלוט מידע חדש על הקשר.",
    suggestion:
      "לפני שאתה/את מגיב/ה, קח/י נשימה. הפתעה יכולה להוביל לבהירות מדהימה — אם נותנים לה רגע להתיישב.",
  },
  {
    id: "sadness",
    name: "עצב",
    color: "#2196F3",
    textColor: "#FFFFFF",
    emoji: "😢",
    subEmotions: [
      { label: "אכזבה", level: "mild" },
      { label: "עצבות", level: "moderate" },
      { label: "ייאוש", level: "intense" },
    ],
    relationshipContext:
      "משהו חשוב לך לא קרה, או הלך לאיבוד. עצב בקשר הוא לא חולשה — הוא הוכחה שאכפת לך.",
    suggestion:
      "אל/אל תחפש/י לפתור את העצב מיד. תן/י לו מקום. לפעמים צריך פשוט לישון עם הרגש לפני שמחפשים פתרון.",
  },
  {
    id: "disgust",
    name: "גועל",
    color: "#795548",
    textColor: "#FFFFFF",
    emoji: "🤢",
    subEmotions: [
      { label: "אי-נוחות", level: "mild" },
      { label: "דחייה", level: "moderate" },
      { label: "סלידה", level: "intense" },
    ],
    relationshipContext:
      "משהו מנוגד לערכים שלך. גועל הוא אחד האותות החזקים ביותר — גוף ותת-מודע שלך אומרים 'זה לא בשבילי'.",
    suggestion:
      "זהה/י מה בדיוק עורר את הגועל. האם זה ממשי ועקרוני, או אולי פחד מוסווה? ההבחנה הזו קריטית.",
  },
  {
    id: "anger",
    name: "כעס",
    color: "#F44336",
    textColor: "#FFFFFF",
    emoji: "😠",
    subEmotions: [
      { label: "רוגז", level: "mild" },
      { label: "כעס", level: "moderate" },
      { label: "זעם", level: "intense" },
    ],
    relationshipContext:
      "יש גבול שנחצה, או צורך שלא נענה. כעס הוא לא הבעיה — הוא שליח שמראה לך מה חשוב לך.",
    suggestion:
      "שאל/י: 'מה הצורך שלא נענה כאן?' כשתמצא/י את הצורך, תוכל/י לדבר עליו — במקום לנהל ויכוח על הסימפטום.",
  },
  {
    id: "anticipation",
    name: "ציפייה",
    color: "#FF5722",
    textColor: "#FFFFFF",
    emoji: "🌟",
    subEmotions: [
      { label: "עניין", level: "mild" },
      { label: "התרגשות", level: "moderate" },
      { label: "ציפייה נלהבת", level: "intense" },
    ],
    relationshipContext:
      "יש כאן תקווה ותשוקה לעתיד. ציפייה בריאה היא מנוע של קשר — היא מה שמעיר אותנו בבוקר.",
    suggestion:
      "שתף/י את הציפייה הזו. לא צריך לחכות עם התרגשות — ספר/י לאחר/ת מה אתה/את מצפה/ה אליו/ה בקשר.",
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────────── */

function loadLog(): EmotionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EmotionEntry[]) : [];
  } catch {
    return [];
  }
}

function saveEntry(entry: EmotionEntry) {
  const log = loadLog();
  const updated = [entry, ...log].slice(0, 20); // keep last 20 entries
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ── Sub-component: Emotion Card ─────────────────────────────────────────────── */

interface EmotionCardProps {
  emotion: Emotion;
  isSelected: boolean;
  onClick: () => void;
}

function EmotionCard({ emotion, isSelected, onClick }: EmotionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-2xl border-2 transition-all duration-200 text-right
        hover:scale-105 hover:shadow-lg active:scale-95
        ${
          isSelected
            ? "border-current shadow-lg scale-105"
            : "border-transparent hover:border-current/30"
        }
      `}
      style={{
        backgroundColor: isSelected ? emotion.color : `${emotion.color}22`,
        color: isSelected ? emotion.textColor : "#1E3A5F",
        borderColor: isSelected ? emotion.color : "transparent",
      }}
      aria-pressed={isSelected}
    >
      <span
        className="text-3xl block mb-2"
        role="img"
        aria-label={emotion.name}
      >
        {emotion.emoji}
      </span>
      <span className="font-bold text-lg block">{emotion.name}</span>
    </button>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────────── */

export function EmotionWheelClient() {
  const [phase, setPhase] = useState<"select" | "intensity" | "result">(
    "select"
  );
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubEmotion | null>(null);
  const [history, setHistory] = useState<EmotionEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setHistory(loadLog());
  }, []);

  const handleEmotionSelect = useCallback((emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setSelectedSub(null);
    setPhase("intensity");
  }, []);

  const handleSubSelect = useCallback(
    (sub: SubEmotion) => {
      if (!selectedEmotion) return;
      setSelectedSub(sub);
      const entry: EmotionEntry = {
        emotionId: selectedEmotion.id,
        emotionName: selectedEmotion.name,
        subEmotion: sub.label,
        level: sub.level,
        timestamp: new Date().toISOString(),
      };
      saveEntry(entry);
      setHistory(loadLog());
      setPhase("result");
    },
    [selectedEmotion]
  );

  const handleReset = useCallback(() => {
    setSelectedEmotion(null);
    setSelectedSub(null);
    setPhase("select");
  }, []);

  /* ─── Phase: Select Emotion ─────────────────────────────────────────────── */
  if (phase === "select") {
    return (
      <div className="space-y-8" dir="rtl">
        {/* Intro */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center space-y-2">
            <span className="text-4xl block" role="img" aria-label="גלגל">
              🎡
            </span>
            <h2 className="text-xl font-bold text-secondary">
              מה אתה/את מרגיש/ה עכשיו?
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
              לחץ/י על הרגש שהכי קרוב למה שאתה/את חווה/ה כרגע. אין תשובה
              נכונה או לא נכונה.
            </p>
          </CardContent>
        </Card>

        {/* Emotion Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EMOTIONS.map((emotion) => (
            <EmotionCard
              key={emotion.id}
              emotion={emotion}
              isSelected={false}
              onClick={() => handleEmotionSelect(emotion)}
            />
          ))}
        </div>

        {/* History Toggle */}
        {history.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setShowHistory((v) => !v)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              {showHistory
                ? "הסתר היסטוריה"
                : `הצג היסטוריה (${history.length} צ'ק-אינים)`}
            </button>
            {showHistory && (
              <div className="mt-4 space-y-2 text-right">
                {history.slice(0, 8).map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2 rounded-xl bg-muted/40 text-sm"
                  >
                    <span className="text-muted-foreground text-xs">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {LEVEL_LABELS[entry.level]}
                      </Badge>
                      <span className="font-medium">{entry.subEmotion}</span>
                      <span className="text-muted-foreground">
                        {entry.emotionName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  /* ─── Phase: Intensity Selection ────────────────────────────────────────── */
  if (phase === "intensity" && selectedEmotion) {
    return (
      <div className="space-y-6" dir="rtl">
        {/* Back */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <svg
            className="w-4 h-4 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          חזרה לגלגל
        </button>

        {/* Selected emotion header */}
        <Card
          className="border-2"
          style={{
            borderColor: selectedEmotion.color,
            backgroundColor: `${selectedEmotion.color}18`,
          }}
        >
          <CardContent className="p-6 text-center space-y-2">
            <span className="text-5xl block" role="img" aria-label={selectedEmotion.name}>
              {selectedEmotion.emoji}
            </span>
            <h2
              className="text-2xl font-bold"
              style={{ color: selectedEmotion.textColor === "#FFFFFF" ? "#1E3A5F" : selectedEmotion.textColor }}
            >
              {selectedEmotion.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              עכשיו בחר/י את העוצמה:
            </p>
          </CardContent>
        </Card>

        {/* Intensity Levels */}
        <div className="space-y-3">
          {selectedEmotion.subEmotions.map((sub) => (
            <button
              key={sub.label}
              onClick={() => handleSubSelect(sub)}
              className="w-full p-5 rounded-2xl border-2 border-transparent text-right transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] flex items-center justify-between gap-4"
              style={{
                backgroundColor: `${selectedEmotion.color}${
                  sub.level === "mild"
                    ? "25"
                    : sub.level === "moderate"
                      ? "50"
                      : "80"
                }`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  selectedEmotion.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "transparent";
              }}
            >
              <div className="text-left">
                <Badge
                  variant="outline"
                  className="text-xs mb-1"
                  style={{ borderColor: selectedEmotion.color, color: "#1E3A5F" }}
                >
                  {LEVEL_LABELS[sub.level]}
                </Badge>
              </div>
              <div className="text-right">
                <span className="font-bold text-lg text-secondary block">
                  {sub.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ─── Phase: Result ──────────────────────────────────────────────────────── */
  if (phase === "result" && selectedEmotion && selectedSub) {
    return (
      <div className="space-y-6" dir="rtl">
        {/* Emotion Confirmed */}
        <Card
          className="border-2"
          style={{
            borderColor: selectedEmotion.color,
            background: `linear-gradient(135deg, ${selectedEmotion.color}22, transparent)`,
          }}
        >
          <CardContent className="p-8 text-center space-y-3">
            <span
              className="text-6xl block"
              role="img"
              aria-label={selectedEmotion.name}
            >
              {selectedEmotion.emoji}
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-secondary">
                {selectedSub.label}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <Badge
                  style={{
                    backgroundColor: selectedEmotion.color,
                    color: selectedEmotion.textColor,
                  }}
                >
                  {selectedEmotion.name}
                </Badge>
                <Badge variant="outline">{LEVEL_LABELS[selectedSub.level]}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relationship Context */}
        <Card className="border-secondary/20 bg-secondary/5">
          <CardContent className="p-6 space-y-2">
            <h3 className="font-semibold text-secondary flex items-center gap-2">
              <span role="img" aria-label="קשר">💑</span>
              מה זה אומר בקשר?
            </h3>
            <p className="text-foreground leading-relaxed">
              {selectedEmotion.relationshipContext}
            </p>
          </CardContent>
        </Card>

        {/* Suggestion */}
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-6 space-y-2">
            <h3
              className="font-semibold flex items-center gap-2"
              style={{ color: "#B8892A" }}
            >
              <span role="img" aria-label="רעיון">💡</span>
              הצעה לצעד הבא
            </h3>
            <p className="text-foreground leading-relaxed">
              {selectedEmotion.suggestion}
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-primary text-white rounded-full font-medium text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            צ'ק-אין חדש
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="px-6 py-2.5 border border-border/50 rounded-full font-medium text-sm hover:bg-muted/50 transition-colors"
          >
            ראה היסטוריה
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `עשיתי צ'ק-אין רגשי עם גלגל הרגשות של "אומנות הקשר" 🎡\n\nהרגשתי: ${selectedSub.label} (${selectedEmotion.name})\n\nכלי מעולה לפתח מודעות רגשית בזוגיות:\nhttps://www.omanut-hakesher.co.il/book/6/emotion-wheel`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white rounded-full font-medium text-sm hover:bg-[#20bd5a] transition-colors"
          >
            שתף/י בוואטסאפ
          </a>
        </div>

        {/* Recent History inline */}
        {showHistory && history.length > 0 && (
          <Card className="border-border/30">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-sm">היסטוריית הצ'ק-אינים שלך</h3>
              <div className="space-y-2">
                {history.slice(0, 6).map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm py-2 border-b border-border/20 last:border-0"
                  >
                    <span className="text-muted-foreground text-xs">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {LEVEL_LABELS[entry.level]}
                      </Badge>
                      <span className="font-medium">{entry.subEmotion}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">
                        {entry.emotionName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                סגור
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return null;
}
