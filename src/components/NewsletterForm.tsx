"use client";

import { useId, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";
type ErrorField = "email" | "consent" | "submit" | null;

interface NewsletterFormProps {
  /** Visual variant — controls colors so it fits both light sections and the dark footer. */
  theme?: "light" | "dark";
  /** Layout: "row" (input + button side by side) or "stack" (vertical). */
  layout?: "row" | "stack";
  placeholder?: string;
  buttonLabel?: string;
  /** aria-label for the form element. */
  ariaLabel?: string;
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Dormant newsletter implementation. No public surface renders this component
 * while the approval ledger has no destination. The server still requires a
 * dedicated approved list and never falls back to a historical event list.
 * Reintroducing this UI requires an owner-approved list and end-to-end proof.
 */
export function NewsletterForm({
  theme = "light",
  layout = "row",
  placeholder = "האימייל שלך",
  buttonLabel = "הרשמה",
  ariaLabel = "הרשמה לרשימת התפוצה",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>(null);
  const inputId = useId();
  const consentId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const isDark = theme === "dark";

  function reportError(field: Exclude<ErrorField, null>, nextMessage: string) {
    setStatus("error");
    setErrorField(field);
    setMessage(nextMessage);
    window.requestAnimationFrame(() => {
      if (field === "email") emailRef.current?.focus();
      if (field === "consent") consentRef.current?.focus();
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();

    if (!EMAIL_RE.test(value)) {
      reportError("email", "נראה שזו לא כתובת אימייל תקינה — בדוק שוב?");
      return;
    }
    if (!consent) {
      reportError("consent", "כדי להצטרף לרשימה צריך לסמן הסכמה לקבלת דיוור.");
      return;
    }

    setStatus("loading");
    setErrorField(null);
    setMessage("");

    try {
      const res = await fetch("/api/lead/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, slug: "newsletter", consent }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        const unavailable =
          data.error === "marketing-list-not-approved" ||
          data.error === "marketing-provider-not-configured";
        reportError(
          "submit",
          unavailable
            ? "ההרשמה לעדכונים עדיין אינה זמינה, ולא שמרנו את הכתובת. אפשר לנסות שוב בהמשך."
            : "משהו השתבש. נסה שוב בעוד רגע.",
        );
        return;
      }

      setStatus("success");
      setErrorField(null);
      setMessage("נרשמת בהצלחה — שלחתי לך מייל קצר לאישור.");
      setEmail("");
      setConsent(false);
    } catch {
      reportError("submit", "אין חיבור כרגע. בדוק את האינטרנט ונסה שוב.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex items-center gap-2 ${
          isDark ? "text-secondary-light" : "text-primary"
        } ${className}`}
        role="status"
        aria-live="polite"
      >
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    );
  }

  const inputClass = isDark
    ? "flex-1 md:w-64 px-4 py-2.5 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-60"
    : "flex-1 px-5 py-3 border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm disabled:opacity-60";

  const buttonClass = isDark
    ? "px-6 py-2.5 bg-primary-light text-[#0F1729] rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    : "px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary-dark transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className={layout === "stack" ? "w-full" : "w-full md:w-auto"}>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-wrap ${layout === "stack" ? "flex-col sm:flex-row" : ""} gap-3 ${
          layout === "stack" ? "max-w-md mx-auto" : "w-full md:w-auto"
        } ${className}`}
        aria-label={ariaLabel}
        aria-busy={status === "loading"}
        noValidate
      >
        <label htmlFor={inputId} className="sr-only">
          כתובת אימייל
        </label>
        <input
          ref={emailRef}
          type="email"
          id={inputId}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorField === "email") {
              setStatus("idle");
              setErrorField(null);
              setMessage("");
            }
          }}
          placeholder={placeholder}
          dir="ltr"
          autoComplete="email"
          required
          disabled={status === "loading"}
          aria-invalid={errorField === "email"}
          aria-describedby={errorField === "email" ? `${inputId}-err` : undefined}
          className={inputClass}
        />
        <button type="submit" disabled={status === "loading"} className={buttonClass}>
          {status === "loading" ? "רושם..." : buttonLabel}
        </button>
        <label
          htmlFor={consentId}
          className={`basis-full flex items-start gap-2 text-xs leading-relaxed ${
            isDark ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          <input
            ref={consentRef}
            id={consentId}
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (errorField === "consent") {
                setStatus("idle");
                setErrorField(null);
                setMessage("");
              }
            }}
            required
            aria-invalid={errorField === "consent"}
            aria-describedby={errorField === "consent" ? `${inputId}-err` : undefined}
            disabled={status === "loading"}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          <span>אני מסכים/ה לקבל מאומנות הקשר כלים ועדכונים במייל. אפשר להסיר את ההסכמה בכל עת.</span>
        </label>
      </form>
      {status === "error" && (
        <p
          id={`${inputId}-err`}
          role="alert"
          className={`mt-2 text-sm ${isDark ? "text-accent-light" : "text-destructive"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
