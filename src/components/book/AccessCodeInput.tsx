"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBookAccess } from "@/components/book/BookAccessProvider";

interface AccessCodeInputProps {
  onSuccess?: () => void;
}

/** Format raw keypresses into AHK-XXXX-XXXX as the user types. */
function formatCode(raw: string): string {
  // Strip everything that's not alphanumeric, then uppercase
  const clean = raw.replace(/[^A-Z0-9]/gi, "").toUpperCase();

  // Split into blocks of 4 (prefix is 3 chars: AHK)
  // Pattern: [3]-[4]-[4]  → "AHK-2026-BOOK"
  const parts: string[] = [];
  if (clean.length > 0) parts.push(clean.slice(0, 3));
  if (clean.length > 3) parts.push(clean.slice(3, 7));
  if (clean.length > 7) parts.push(clean.slice(7, 11));

  return parts.join("-");
}

type ValidationState = "idle" | "error" | "success";

export function AccessCodeInput({ onSuccess }: AccessCodeInputProps) {
  const { unlock } = useBookAccess();
  const [raw, setRaw] = useState("");
  const [status, setStatus] = useState<ValidationState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const formatted = formatCode(raw);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Keep only the alphanumeric chars for internal state
    const stripped = e.target.value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    setRaw(stripped.slice(0, 11)); // max 3+4+4 = 11 chars
    setStatus("idle");
    setErrorMsg("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formatted) {
      setStatus("error");
      setErrorMsg("נא להזין קוד גישה");
      return;
    }

    const success = unlock(formatted);
    if (success) {
      setStatus("success");
      onSuccess?.();
    } else {
      setStatus("error");
      setErrorMsg("קוד גישה לא תקין. בדוק את הקוד שמופיע בספר ונסה שוב.");
    }
  }

  const borderColor =
    status === "success"
      ? "border-green-500 focus-visible:border-green-500"
      : status === "error"
        ? "border-destructive focus-visible:border-destructive"
        : "";

  return (
    <form onSubmit={handleSubmit} dir="rtl" className="w-full space-y-3">
      <div className="flex gap-2">
        <Input
          type="text"
          inputMode="text"
          value={formatted}
          onChange={handleChange}
          placeholder="AHK-XXXX-XXXX"
          maxLength={13} // 3-4-4 + 2 dashes
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="קוד גישה לספר"
          aria-invalid={status === "error"}
          aria-describedby={status !== "idle" ? "access-code-message" : undefined}
          className={[
            "text-center font-mono text-base tracking-widest uppercase h-11 rounded-xl",
            borderColor,
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <Button
          type="submit"
          disabled={raw.length < 3 || status === "success"}
          className="shrink-0 rounded-xl px-5 h-11 bg-primary hover:bg-primary/90 text-white font-semibold"
        >
          {status === "success" ? "✓" : "כניסה"}
        </Button>
      </div>

      {status !== "idle" && (
        <p
          id="access-code-message"
          role={status === "error" ? "alert" : "status"}
          className={[
            "text-sm text-center",
            status === "success" ? "text-green-600" : "text-destructive",
          ].join(" ")}
        >
          {status === "success" ? "הקוד אומת בהצלחה! הכניסה מאושרת." : errorMsg}
        </p>
      )}
    </form>
  );
}
