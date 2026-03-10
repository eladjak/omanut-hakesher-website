"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBookAccess } from "@/components/book/BookAccessProvider";
import { AccessCodeInput } from "@/components/book/AccessCodeInput";

interface AccessGateProps {
  children: React.ReactNode;
}

export function AccessGate({ children }: AccessGateProps) {
  const { isUnlocked } = useBookAccess();
  const [faqOpen, setFaqOpen] = useState(false);

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative" dir="rtl">
      {/* Blurred preview of children */}
      <div
        aria-hidden="true"
        className="select-none pointer-events-none"
        style={{
          filter: "blur(6px)",
          WebkitFilter: "blur(6px)",
          maxHeight: "520px",
          overflow: "hidden",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 30%, transparent 90%)",
        }}
      >
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-start justify-center pt-16 px-4">
        <Card className="w-full max-w-md border-border/50 shadow-xl bg-background/98 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-8">
            {/* Book icon */}
            <div className="flex justify-center mb-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
              >
                <svg
                  className="w-8 h-8"
                  style={{ color: "hsl(var(--primary))" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center mb-6">
              <Badge
                variant="outline"
                className="mb-3 text-xs"
                style={{ borderColor: "hsl(var(--primary) / 0.3)", color: "hsl(var(--primary))" }}
              >
                תוכן בלעדי לקוראי הספר
              </Badge>
              <h2 className="text-xl font-bold mb-2">
                כניסה לתוכן הדיגיטלי
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                הזן את קוד הגישה שמופיע בעמוד השני של הספר כדי להיכנס
              </p>
            </div>

            {/* Access code input */}
            <AccessCodeInput />

            {/* Where is my code */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setFaqOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
                aria-expanded={faqOpen}
              >
                <svg
                  className={[
                    "w-4 h-4 transition-transform duration-200",
                    faqOpen ? "rotate-180" : "",
                  ].join(" ")}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                איפה אני מוצא את הקוד שלי?
              </button>

              {faqOpen && (
                <div className="mt-3 p-4 bg-muted/50 rounded-xl text-sm text-muted-foreground leading-relaxed space-y-2">
                  <p>
                    קוד הגישה מודפס על&nbsp;
                    <strong className="text-foreground">עמוד 2 של הספר</strong>
                    &nbsp;(ה״עמוד מאחורי השער״).
                  </p>
                  <p>
                    הקוד נראה כך:&nbsp;
                    <code className="font-mono bg-background px-1.5 py-0.5 rounded text-foreground">
                      AHK-XXXX-XXXX
                    </code>
                  </p>
                  <p>
                    קיבלת את הספר כמתנה ואין לך קוד?{" "}
                    <Link
                      href="/contact"
                      className="underline underline-offset-2 hover:text-foreground transition-colors"
                    >
                      צור קשר
                    </Link>{" "}
                    ונסדר.
                  </p>
                </div>
              )}
            </div>

            {/* Separator + buy link */}
            <div className="mt-6 pt-5 border-t border-border/30 text-center">
              <p className="text-xs text-muted-foreground mb-3">
                עדיין אין לך את הספר?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: "hsl(var(--primary))" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                הזמן את הספר
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom spacer so the overlay card has space */}
      <div className="h-[700px]" aria-hidden="true" />
    </div>
  );
}
