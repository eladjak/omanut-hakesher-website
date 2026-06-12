"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

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
 * Real newsletter signup, wired to the existing /api/lead/subscribe pipeline
 * with the dedicated `newsletter` magnet (Rav-Messer list 22958 + Resend
 * welcome). Handles loading / success / error states — no fake setTimeout.
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
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputId = useId();

  const isDark = theme === "dark";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();

    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("נראה שזו לא כתובת אימייל תקינה — בדוק שוב?");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/lead/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, slug: "newsletter" }),
      });

      if (!res.ok) {
        setStatus("error");
        setMessage("משהו השתבש. נסה שוב בעוד רגע.");
        return;
      }

      setStatus("success");
      setMessage("נרשמת בהצלחה — שלחתי לך מייל קצר לאישור.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("אין חיבור כרגע. בדוק את האינטרנט ונסה שוב.");
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
    ? "px-6 py-2.5 bg-primary-light text-foreground rounded-full text-sm font-medium hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    : "px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className={layout === "stack" ? "w-full" : "w-full md:w-auto"}>
      <form
        onSubmit={handleSubmit}
        className={`flex ${layout === "stack" ? "flex-col sm:flex-row" : ""} gap-3 ${
          layout === "stack" ? "max-w-md mx-auto" : "w-full md:w-auto"
        } ${className}`}
        aria-label={ariaLabel}
        noValidate
      >
        <label htmlFor={inputId} className="sr-only">
          כתובת אימייל
        </label>
        <input
          type="email"
          id={inputId}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={placeholder}
          dir="ltr"
          autoComplete="email"
          required
          disabled={status === "loading"}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${inputId}-err` : undefined}
          className={inputClass}
        />
        <button type="submit" disabled={status === "loading"} className={buttonClass}>
          {status === "loading" ? "רושם..." : buttonLabel}
        </button>
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
