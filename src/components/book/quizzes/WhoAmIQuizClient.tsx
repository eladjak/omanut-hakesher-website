"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  whoAmIQuestions,
  generateUserManual,
  type UserManualProfile,
  type WhoAmIQuestion,
} from "@/data/book/quizzes/who-am-i";

// ── Types ──────────────────────────────────────────────────────────────────

type Phase = "intro" | "questions" | "results";

// ── Sub-components ─────────────────────────────────────────────────────────

function TextQuestion({
  question,
  value,
  onChange,
}: {
  question: WhoAmIQuestion;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-xl font-bold leading-snug mb-1">{question.text}</h3>
        {question.subtitle && (
          <p className="text-sm text-muted-foreground">{question.subtitle}</p>
        )}
      </div>
      <textarea
        dir="rtl"
        rows={4}
        placeholder={question.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-base
          placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40
          resize-none leading-relaxed transition-shadow"
      />
    </div>
  );
}

function MultiChoiceQuestion({
  question,
  value,
  onChange,
}: {
  question: WhoAmIQuestion;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-xl font-bold leading-snug mb-1">{question.text}</h3>
        {question.subtitle && (
          <p className="text-sm text-muted-foreground">{question.subtitle}</p>
        )}
      </div>
      <div className="grid gap-3">
        {question.options?.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`w-full text-right rounded-xl border px-4 py-3 transition-all duration-150
                ${
                  selected
                    ? "border-primary bg-primary/8 ring-1 ring-primary/40"
                    : "border-border/50 bg-background hover:border-primary/40 hover:bg-muted/40"
                }`}
            >
              <p className={`font-semibold text-sm ${selected ? "text-primary" : ""}`}>
                {option.label}
              </p>
              {option.description && (
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {option.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Profile section card ───────────────────────────────────────────────────

function ProfileSection({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl" aria-hidden="true">
          {emoji}
        </span>
        <h3 className="font-bold text-base">{title}</h3>
      </div>
      <div className="space-y-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="font-medium">{value}</span>
    </div>
  );
}

// ── Results screen ─────────────────────────────────────────────────────────

function UserManualResult({
  profile,
  onRetry,
}: {
  profile: UserManualProfile;
  onRetry: () => void;
}) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `יצרתי את המדריך למשתמש שלי בספר "אומנות הקשר" 📋\n\nמערכת ההפעלה שלי: ${profile.operatingSystem.attachmentStyleLabel}\nהצורך הכי עמוק שלי: ${profile.needs.deepestNeed}\nאני מקבל אהבה דרך: ${profile.needs.loveLanguageReceive}\n\nתנסה גם אתה: omanut-hakesher.co.il/book/5/who-am-i`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-6 px-4 rounded-2xl bg-primary/5 border border-primary/10">
        <span className="text-5xl mb-3 block" aria-hidden="true">
          📋
        </span>
        <h2 className="text-2xl font-bold mb-2">המדריך למשתמש שלך</h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          זה לא אבחנה — זו נקודת פתיחה. שמור את זה, חזור אליו, ותראה איך אתה
          מתפתח.
        </p>
      </div>

      {/* Profile sections */}
      <ProfileSection emoji="🪞" title="מי אני">
        <ProfileRow label="איך אני מתאר את עצמי" value={profile.identity.selfWords} />
        <ProfileRow label="איך חברים מתארים אותי" value={profile.identity.friendWords} />
        <ProfileRow label="המחמאה שנוגעת לי" value={profile.identity.bestCompliment} />
      </ProfileSection>

      <ProfileSection emoji="💡" title="מה אני צריך">
        <ProfileRow
          label="מקבל אהבה דרך"
          value={profile.needs.loveLanguageReceive}
        />
        <ProfileRow
          label="נותן אהבה דרך"
          value={profile.needs.loveLanguageGive}
        />
        <ProfileRow label="הצורך הרגשי הכי עמוק שלי" value={profile.needs.deepestNeed} />
      </ProfileSection>

      <ProfileSection emoji="⚙️" title="מערכת ההפעלה שלי">
        <ProfileRow
          label="סגנון התקשרות"
          value={profile.operatingSystem.attachmentStyleLabel}
        />
      </ProfileSection>

      <ProfileSection emoji="🔐" title="הפחדים שלי">
        <ProfileRow label="הפחד הכי גדול שלי בזוגיות" value={profile.fears.biggestFear} />
        <ProfileRow label="הסיפור שאני מספר לעצמי על אהבה" value={profile.fears.loveStory} />
      </ProfileSection>

      <ProfileSection emoji="🔁" title="הדפוסים שלי">
        <ProfileRow
          label="מה אמרו עליי שוב ושוב"
          value={profile.patterns.recurringComplaint}
        />
        <ProfileRow
          label="כשנפגע, אני"
          value={profile.patterns.defaultReaction}
        />
        <ProfileRow
          label="דפוס הבית שלי"
          value={profile.patterns.childhoodPattern}
        />
      </ProfileSection>

      <ProfileSection emoji="🧭" title="הכיוון שלי">
        <ProfileRow
          label="בזוגיות הכי טובה, ארגיש"
          value={profile.direction.idealFeeling}
        />
      </ProfileSection>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleWhatsApp}
          variant="outline"
          className="flex-1 rounded-full border-primary/30 text-primary hover:bg-primary/5 gap-2"
        >
          <span aria-hidden="true">💬</span>
          שתף בוואטסאפ
        </Button>

        <Button
          disabled
          variant="outline"
          className="flex-1 rounded-full border-border/40 text-muted-foreground gap-2 cursor-not-allowed"
          title="בקרוב"
        >
          <span aria-hidden="true">📥</span>
          הורד PDF
          <span className="text-xs">(בקרוב)</span>
        </Button>

        <Button
          onClick={onRetry}
          variant="ghost"
          className="flex-1 rounded-full text-muted-foreground hover:text-foreground"
        >
          התחל מחדש
        </Button>
      </div>

      <div className="text-center">
        <a
          href="/book/5"
          className="text-sm text-primary hover:underline"
        >
          ← חזרה לפרק 5
        </a>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function WhoAmIQuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<UserManualProfile | null>(null);

  const total = whoAmIQuestions.length;
  const currentQuestion = whoAmIQuestions[currentIndex];
  const currentValue = currentQuestion ? (answers[currentQuestion.id] ?? "") : "";
  const progress = Math.round(((currentIndex + 1) / total) * 100);

  const canAdvance = currentValue.trim().length > 0;

  const handleAnswer = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    },
    [currentQuestion],
  );

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Last question — generate the user manual
      const allAnswers = { ...answers, [currentQuestion.id]: currentValue };
      const generatedProfile = generateUserManual(allAnswers);
      setProfile(generatedProfile);
      setPhase("results");
    }
  }, [currentIndex, total, answers, currentQuestion, currentValue]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const retry = useCallback(() => {
    setPhase("intro");
    setCurrentIndex(0);
    setAnswers({});
    setProfile(null);
  }, []);

  // ── Intro ────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <Card className="border-border/50">
        <CardContent className="p-8 text-center">
          <span className="text-6xl mb-6 block" aria-hidden="true">
            📋
          </span>
          <h2 className="text-2xl font-bold mb-3">מדריך למשתמש — מי אני?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
            12 שאלות שיוצרות את הפרופיל האישי שלך: שפת האהבה, מערכת ההפעלה,
            הפחדים, הדפוסים, והכיוון שלך לזוגיות.
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["מי אני", "מה אני צריך", "הדפוסים שלי", "הכיוון שלי"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs border border-primary/20 text-primary rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <span aria-hidden="true">⏱</span>
            <span>12 שאלות • כ-10 דקות</span>
          </div>

          <p className="text-xs text-muted-foreground mb-8 max-w-xs mx-auto">
            אין תשובות נכונות. ענה בכנות — ככל שתהיה כן עם עצמך, כך המדריך
            יהיה מדויק יותר.
          </p>

          <Button
            onClick={() => setPhase("questions")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold text-base"
          >
            צור את המדריך שלי
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Results ──────────────────────────────────────────────────────────────
  if (phase === "results" && profile) {
    return <UserManualResult profile={profile} onRetry={retry} />;
  }

  // ── Questions ────────────────────────────────────────────────────────────
  return (
    <Card className="border-border/50">
      <CardContent className="p-6 md:p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
            <span>
              שאלה {currentIndex + 1} מתוך {total}
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

        {/* Question */}
        <div className="min-h-[220px] flex items-start py-4">
          {currentQuestion && (
            <>
              {currentQuestion.type === "text" ? (
                <TextQuestion
                  question={currentQuestion}
                  value={currentValue}
                  onChange={handleAnswer}
                />
              ) : (
                <MultiChoiceQuestion
                  question={currentQuestion}
                  value={currentValue}
                  onChange={handleAnswer}
                />
              )}
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/30">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentIndex === 0}
            className="rounded-full px-6"
          >
            הקודם
          </Button>

          <Button
            onClick={goNext}
            disabled={!canAdvance}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
          >
            {currentIndex === total - 1 ? "צור מדריך" : "הבא"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
