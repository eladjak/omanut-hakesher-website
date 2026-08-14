import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Server-rendered fail-closed state for protected book routes.
 *
 * Do not accept or render protected children here. Access can be restored only
 * after a server-side entitlement source is connected and verified.
 */
export function BookAccessUnavailable() {
  return (
    <main className="min-h-[70vh] grid place-items-center py-20 px-4" dir="rtl">
      <Card className="w-full max-w-lg border-border/50 shadow-xl rounded-2xl">
        <CardContent className="p-8 md:p-10 text-center">
          <Badge variant="outline" className="mb-5 text-xs">
            תוכן לקוראי הספר
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            אימות הגישה אינו זמין כרגע
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-3">
            עד לחיבור מנגנון מאומת להזמנה או לחשבון, פרקי הקורא והכלים
            הדיגיטליים חסומים.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-7">
            אם רכשת את הספר, אפשר ליצור קשר כדי לקבל עדכון כשהגישה המאובטחת
            תהיה זמינה.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex px-5 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              חזרה לעמוד הספר
            </Link>
            <Link
              href="/contact"
              className="inline-flex px-5 py-2.5 rounded-full border border-border font-semibold hover:bg-muted transition-colors"
            >
              יצירת קשר
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
