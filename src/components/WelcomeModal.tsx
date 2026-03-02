"use client";

import { useGender } from "@/components/GenderProvider";
import { useEffect, useRef } from "react";

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

export function WelcomeModal() {
  const { isFirstVisit, setGender, dismissWelcome } = useGender();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirstVisit) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleChoice("neutral");
      }
    };

    // Delay focus for smoother UX
    const timer = setTimeout(() => {
      dialogRef.current?.focus();
    }, 500);

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // handleChoice is stable - defined inline below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstVisit]);

  function handleChoice(choice: "male" | "female" | "neutral") {
    setGender(choice);
    dismissWelcome();
  }

  if (!isFirstVisit) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm"
      style={{ animation: "welcomeFadeIn 0.3s ease forwards" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="mx-4 w-full max-w-md bg-card rounded-3xl p-8 md:p-10 shadow-2xl text-center outline-none"
        style={{ animation: "welcomeZoomIn 0.2s ease forwards" }}
      >
        {/* Dual hearts icon */}
        <div className="flex justify-center gap-2 mb-6" aria-hidden="true">
          <HeartIcon className="w-10 h-10 text-[#E85D75]" />
          <HeartIcon className="w-10 h-10 text-[#1E3A5F]" />
        </div>

        <h2
          id="welcome-title"
          className="text-2xl font-bold mb-2 text-foreground"
        >
          ברוכים הבאים לאומנות הקשר
        </h2>
        <p className="text-muted-foreground mb-8 text-base leading-relaxed">
          כדי שנוכל להתאים לך את החוויה הטובה ביותר,
          <br />
          בחר/י את החוויה המותאמת לך
        </p>

        <div className="flex gap-4 justify-center mb-6">
          {/* Female option */}
          <button
            onClick={() => handleChoice("female")}
            className="group flex-1 p-6 rounded-2xl border-2 border-border hover:border-[#E85D75] hover:bg-[#E85D75]/5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#E85D75] focus-visible:outline-none"
          >
            <HeartIcon className="w-12 h-12 mx-auto mb-3 text-[#E85D75] group-hover:scale-110 transition-transform" />
            <span className="font-semibold block text-foreground">
              אני אישה
            </span>
            <span className="text-sm text-muted-foreground mt-1 block">
              מחפשת זוגיות
            </span>
          </button>

          {/* Male option */}
          <button
            onClick={() => handleChoice("male")}
            className="group flex-1 p-6 rounded-2xl border-2 border-border hover:border-[#1E3A5F] hover:bg-[#1E3A5F]/5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1E3A5F] focus-visible:outline-none"
          >
            <HeartIcon className="w-12 h-12 mx-auto mb-3 text-[#1E3A5F] group-hover:scale-110 transition-transform" />
            <span className="font-semibold block text-foreground">
              אני גבר
            </span>
            <span className="text-sm text-muted-foreground mt-1 block">
              מחפש זוגיות
            </span>
          </button>
        </div>

        <button
          onClick={() => handleChoice("neutral")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          המשך בלי לציין
        </button>
      </div>

      <style>{`
        @keyframes welcomeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes welcomeZoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .welcome-modal-overlay,
          .welcome-modal-dialog {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
