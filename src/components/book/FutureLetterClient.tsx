"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── Types ─────────────────────────────────────────────────────────────────── */
interface LetterData {
  date: string;
  answers: string[];
  name: string;
  savedAt: string;
}

const STORAGE_KEY = "omanut-future-letter";

const PROMPTS = [
  "הדבר הכי גדול שהבנתי על עצמי הוא ש...",
  "הסיפור הישן שאני בוחר/ת להפסיק לספר לעצמי הוא...",
  "הצעד הקטן והאמיתי שאני מתחייב/ת לעשות, החל ממחר, הוא...",
  'מה שאני באמת, אבל באמת, רוצה להרגיש בקשר זה... (לא "גבוה וחכם", אלא "ביטחון", "שמחה", "שיראו אותי")',
  "בעוד שנה, כשאקרא את זה, אני מקווה שאראה ש...",
] as const;

/* ── Helpers ───────────────────────────────────────────────────────────────── */
function loadLetter(): LetterData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LetterData) : null;
  } catch {
    return null;
  }
}

function saveLetter(data: LetterData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getOneYearFromNow(): Date {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

function buildGoogleCalendarUrl(name: string): string {
  const oneYear = getOneYearFromNow();
  const dateStr = oneYear.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const endDate = new Date(oneYear.getTime() + 60 * 60 * 1000);
  const endStr = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const title = encodeURIComponent(`${name} — הגיע הזמן לפתוח את המכתב`);
  const details = encodeURIComponent(
    `לפני שנה סיימת לקרוא את "אומנות הקשר" וכתבת מכתב לעצמך.\n\nהגיע הזמן לפתוח אותו.\n\nאפשר לקרוא אותו כאן:\nhttps://www.omanut-hakesher.co.il/book/closing/future-letter`
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${endStr}&details=${details}`;
}

function buildLetterText(answers: string[], name: string, date: string): string {
  return `היי אני, של עוד שנה,

היום ה-${date}. סיימתי לקרוא את הספר "אומנות הקשר", והראש שלי מסתובב.
אני רוצה לזכור כמה דברים:

1. ${PROMPTS[0]}
${answers[0]}

2. ${PROMPTS[1]}
${answers[1]}

3. ${PROMPTS[2]}
${answers[2]}

4. ${PROMPTS[3]}
${answers[3]}

5. ${PROMPTS[4]}
${answers[4]}

תאמין/י בדרך. זה קורה.

שלך,
${name}`;
}

/* ── Component ─────────────────────────────────────────────────────────────── */
export function FutureLetterClient() {
  const [phase, setPhase] = useState<"intro" | "writing" | "done">("intro");
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [name, setName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [savedLetter, setSavedLetter] = useState<LetterData | null>(null);
  const [calendarOpened, setCalendarOpened] = useState(false);

  // Load existing letter on mount
  useEffect(() => {
    const existing = loadLetter();
    if (existing) {
      setSavedLetter(existing);
      setPhase("done");
    }
  }, []);

  const handleAnswer = useCallback(
    (idx: number, value: string) => {
      const next = [...answers];
      next[idx] = value;
      setAnswers(next);
    },
    [answers]
  );

  const handleSubmit = useCallback(() => {
    const today = new Date().toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const data: LetterData = {
      date: today,
      answers,
      name: name || "אני",
      savedAt: new Date().toISOString(),
    };
    saveLetter(data);
    setSavedLetter(data);
    setPhase("done");
  }, [answers, name]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedLetter(null);
    setAnswers(Array(5).fill(""));
    setName("");
    setCurrentStep(0);
    setPhase("intro");
  }, []);

  const canProceed = answers[currentStep]?.trim().length > 0;
  const allFilled = answers.every((a) => a.trim().length > 0);

  /* ─── Intro Phase ────────────────────────────────────────────────────────── */
  if (phase === "intro") {
    return (
      <div className="space-y-8">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-6xl">✉️</div>
            <h2 className="text-2xl font-bold">מכתב לעצמי בעוד שנה</h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
              התרגיל האחרון שלנו יחד. קחו רגע, שבו בנוח, וכתבו מכתב לעצמכם
              של עוד שנה. בדיוק בעוד שנה תקבלו תזכורת לפתוח אותו.
            </p>
            <p className="text-sm text-muted-foreground">
              5 שאלות מנחות. 10 דקות. זיכרון לכל החיים.
            </p>
            <button
              onClick={() => setPhase("writing")}
              className="inline-flex px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              בואו נתחיל לכתוב
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ─── Writing Phase ──────────────────────────────────────────────────────── */
  if (phase === "writing") {
    return (
      <div className="space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-3">
          {PROMPTS.map((_, i) => (
            <div key={i} className="flex-1 flex items-center gap-1">
              <div
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i < currentStep
                    ? "bg-primary"
                    : i === currentStep
                      ? "bg-primary/60"
                      : "bg-muted"
                }`}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          שאלה {currentStep + 1} מתוך {PROMPTS.length}
        </p>

        {/* Letter Header */}
        <Card className="border-primary/10">
          <CardContent className="p-8">
            <div className="font-serif space-y-6" dir="rtl">
              <p className="text-lg font-medium text-primary/80 italic">
                היי אני, של עוד שנה,
              </p>
              <p className="text-muted-foreground">
                היום סיימתי לקרוא את הספר &quot;אומנות הקשר&quot;, והראש שלי מסתובב.
                אני רוצה לזכור כמה דברים:
              </p>

              {/* Current prompt */}
              <div className="space-y-3">
                <label className="block text-base font-medium">
                  {currentStep + 1}. {PROMPTS[currentStep]}
                </label>
                <textarea
                  value={answers[currentStep]}
                  onChange={(e) => handleAnswer(currentStep, e.target.value)}
                  placeholder="כתוב/כתבי מהלב..."
                  className="w-full min-h-[140px] p-4 rounded-xl border border-border/50 bg-muted/30 text-base leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/50"
                  autoFocus
                />
              </div>

              {/* Previous answers preview */}
              {currentStep > 0 && (
                <div className="space-y-3 pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground font-medium">
                    מה כבר כתבת:
                  </p>
                  {answers.slice(0, currentStep).map((a, i) => (
                    <div key={i} className="text-sm text-muted-foreground">
                      <span className="font-medium">{i + 1}.</span>{" "}
                      {a.length > 80 ? a.slice(0, 80) + "..." : a}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="px-6 py-2.5 text-sm border border-border/50 rounded-full hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            הקודם
          </button>

          {currentStep < PROMPTS.length - 1 ? (
            <button
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!canProceed}
              className="px-6 py-2.5 text-sm bg-primary text-white rounded-full font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              הבא
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="השם שלך"
                className="px-4 py-2.5 text-sm border border-border/50 rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 w-36 text-center"
              />
              <button
                onClick={handleSubmit}
                disabled={!allFilled}
                className="px-6 py-2.5 text-sm bg-primary text-white rounded-full font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                חתום וסגור את המכתב
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─── Done Phase ─────────────────────────────────────────────────────────── */
  if (phase === "done" && savedLetter) {
    const letterText = buildLetterText(
      savedLetter.answers,
      savedLetter.name,
      savedLetter.date
    );
    const calendarUrl = buildGoogleCalendarUrl(savedLetter.name);
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      "המכתב שלי לעצמי בעוד שנה — אומנות הקשר"
    )}&body=${encodeURIComponent(letterText)}`;

    return (
      <div className="space-y-8">
        {/* Success Banner */}
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
          <CardContent className="p-6 text-center space-y-3">
            <div className="text-4xl">🎉</div>
            <h2 className="text-xl font-bold">המכתב שלך נשמר</h2>
            <p className="text-sm text-muted-foreground">
              נכתב בתאריך {savedLetter.date}
            </p>
          </CardContent>
        </Card>

        {/* The Letter */}
        <Card className="border-primary/15 bg-[#FFFAF7]">
          <CardContent className="p-8">
            <div className="font-serif space-y-4 leading-relaxed" dir="rtl">
              <p className="text-lg font-medium text-primary/80 italic">
                היי אני, של עוד שנה,
              </p>
              <p className="text-muted-foreground">
                היום ה-{savedLetter.date}. סיימתי לקרוא את הספר &quot;אומנות
                הקשר&quot;, והראש שלי מסתובב. אני רוצה לזכור כמה דברים:
              </p>

              {savedLetter.answers.map((answer, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium text-primary/70">
                    {i + 1}. {PROMPTS[i]}
                  </p>
                  <p className="whitespace-pre-wrap">{answer}</p>
                </div>
              ))}

              <div className="pt-4 border-t border-primary/10 space-y-1">
                <p className="font-medium">תאמין/י בדרך. זה קורה.</p>
                <p>שלך,</p>
                <p className="font-bold">{savedLetter.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">מה עכשיו?</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Calendar Reminder */}
            <Card
              className={`border-border/30 transition-colors ${calendarOpened ? "border-green-300 bg-green-50/50" : ""}`}
            >
              <CardContent className="p-5 text-center space-y-3">
                <div className="text-3xl">{calendarOpened ? "✅" : "📅"}</div>
                <h4 className="font-semibold">תזכורת ביומן</h4>
                <p className="text-sm text-muted-foreground">
                  {calendarOpened
                    ? "נוסף ליומן!"
                    : "קבע תזכורת לפתוח את המכתב בעוד שנה בדיוק"}
                </p>
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalendarOpened(true)}
                  className="inline-flex px-5 py-2 text-sm bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  הוסף ליומן Google
                </a>
              </CardContent>
            </Card>

            {/* Email to Self */}
            <Card className="border-border/30">
              <CardContent className="p-5 text-center space-y-3">
                <div className="text-3xl">📧</div>
                <h4 className="font-semibold">שלח לעצמך</h4>
                <p className="text-sm text-muted-foreground">
                  שמור עותק של המכתב באימייל שלך
                </p>
                <a
                  href={mailtoUrl}
                  className="inline-flex px-5 py-2 text-sm border border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-colors"
                >
                  שלח באימייל
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Share via WhatsApp */}
          <div className="text-center">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `סיימתי לקרוא את "אומנות הקשר" וכתבתי מכתב לעצמי בעוד שנה 💌\n\nאם גם אתם רוצים, זה כאן:\nhttps://www.omanut-hakesher.co.il/book/closing/future-letter`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>שתף/י בוואטסאפ</span>
              <Badge variant="outline" className="text-xs">
                WhatsApp
              </Badge>
            </a>
          </div>

          {/* Write Again */}
          <div className="text-center pt-4 border-t border-border/20">
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              רוצה לכתוב מחדש? לחץ כאן
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
