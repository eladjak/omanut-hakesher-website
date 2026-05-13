"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark";

interface Props {
  variant?: Variant;
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
  /** Lead-magnet slug to subscribe under. Default = 'newsletter'. */
  slug?: string;
  /** Optional inline success copy override */
  successLabel?: string;
}

export function NewsletterForm({
  variant = "light",
  placeholder = "האימייל שלך",
  buttonLabel = "הרשמה",
  className,
  slug = "newsletter",
  successLabel = "נרשמת בהצלחה! בדוק/י את תיבת הדוא״ל.",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "", slug, consent: true }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("err");
        setErrorMsg(
          data.error === "invalid-email"
            ? "האימייל לא תקין"
            : "משהו השתבש. נסה/י שוב בעוד רגע.",
        );
        return;
      }
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
      setErrorMsg("משהו השתבש. נסה/י שוב בעוד רגע.");
    }
  }

  if (status === "ok") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-medium",
          variant === "dark" ? "text-secondary-light" : "text-primary",
          className,
        )}
        role="status"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>{successLabel}</span>
      </div>
    );
  }

  const inputCls =
    variant === "dark"
      ? "flex-1 md:w-64 px-4 py-2.5 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
      : "flex-1 px-5 py-3 border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm";

  const buttonCls =
    variant === "dark"
      ? "px-6 py-2.5 bg-primary-light text-foreground rounded-full text-sm font-medium hover:bg-primary transition-colors disabled:opacity-60"
      : "px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-sm disabled:opacity-60";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col sm:flex-row gap-2 w-full md:w-auto",
        className,
      )}
      aria-label="הרשמה לניוזלטר"
      noValidate
    >
      <label htmlFor={inputId} className="sr-only">
        כתובת אימייל
      </label>
      <input
        id={inputId}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        dir="ltr"
        autoComplete="email"
        disabled={status === "loading"}
        className={inputCls}
      />
      <button type="submit" disabled={status === "loading"} className={buttonCls}>
        {status === "loading" ? "שולח..." : buttonLabel}
      </button>
      {status === "err" && (
        <span
          role="alert"
          className={cn(
            "text-xs basis-full",
            variant === "dark" ? "text-red-300" : "text-destructive",
          )}
        >
          {errorMsg}
        </span>
      )}
    </form>
  );
}
