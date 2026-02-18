"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="he" dir="rtl">
      <body style={{ fontFamily: "Heebo, sans-serif", margin: 0, padding: 0 }}>
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#faf8f5",
          }}
        >
          <div style={{ textAlign: "center", padding: "2rem", maxWidth: "600px" }}>
            {/* Decorative number */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: "2rem" }}>
              <span
                style={{
                  fontSize: "10rem",
                  fontWeight: "bold",
                  lineHeight: 1,
                  color: "rgba(192, 108, 72, 0.1)",
                  userSelect: "none",
                }}
              >
                500
              </span>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(192, 108, 72, 0.1)",
                  }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c06c48"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
              </div>
            </div>

            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#1a1a1a",
              }}
            >
              שגיאה בלתי צפויה
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#666",
                maxWidth: "28rem",
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}
            >
              מצטערים, משהו השתבש. הצוות שלנו מטפל בבעיה.
              אנא נסו שוב או חזרו לדף הבית.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: "0.75rem 2rem",
                  backgroundColor: "#c06c48",
                  color: "white",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                נסו שוב
              </button>
              <a
                href="/"
                style={{
                  padding: "0.75rem 2rem",
                  border: "2px solid #c06c48",
                  color: "#c06c48",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  fontFamily: "inherit",
                }}
              >
                חזרה לדף הבית
              </a>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
