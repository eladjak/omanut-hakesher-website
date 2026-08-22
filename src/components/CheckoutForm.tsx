import Link from "next/link";

/**
 * The former client checkout posted to the retired `/api/checkout` endpoint
 * and carried draft price data into the browser. Keep the public surface useful
 * without presenting a dormant payment path or collecting order details.
 */
export function CheckoutForm() {
  return (
    <div
      className="rounded-2xl border border-accent/40 bg-accent/10 px-6 py-7 text-center"
      role="status"
    >
      <h3 className="mb-2 text-lg font-bold">ההרשמה המקוונת אינה פתוחה כרגע</h3>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        אין כאן טופס הזמנה פעיל ולא נאספים פרטי תשלום. אפשר להכיר את מבנה
        התוכנית, לפתוח חומר לתרגול או לפנות בשאלה; פנייה אינה הרשמה ואינה יוצרת חיוב.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          לשאלה על התאמה וזמינות
        </Link>
        <Link
          href="/lead"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
        >
          לפתוח כלי לתרגול עכשיו
        </Link>
      </div>
    </div>
  );
}
