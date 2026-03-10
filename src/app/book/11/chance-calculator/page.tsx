import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChanceCalculatorClient } from "@/components/book/ChanceCalculatorClient";

export const metadata: Metadata = {
  title: "רמזור הסיכויים | פרק 11 - אומנות הקשר",
  description:
    "כלי החלטה אינטראקטיבי — 8 אינדיקטורים שיעזרו לך לדעת אם כדאי להמשיך להשקיע בקשר. ירוק, צהוב או אדום.",
  alternates: { canonical: "/book/11/chance-calculator" },
  openGraph: {
    title: "רמזור הסיכויים | פרק 11 - אומנות הקשר",
    description:
      "8 שאלות על קשר ספציפי — ותקבל תמונה ברורה אם כדאי להמשיך להשקיע.",
    url: "/book/11/chance-calculator",
    locale: "he_IL",
    type: "website",
  },
};

export default function ChanceCalculatorPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 11", href: "/book/11" },
            { label: "רמזור הסיכויים" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-16 border-b border-border/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              פרק 11 • כימיה
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              רמזור הסיכויים
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              ירוק, צהוב, או אדום?
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              לפעמים הראש שלנו מבולבל — יש כימיה, אבל גם ספקות. הכלי הזה עוזר
              לך לראות תמונה ברורה: 8 אינדיקטורים מרכזיים שמראים אם קשר ספציפי
              ראוי להמשך השקעה.
            </p>
          </div>

          {/* Traffic light preview */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                🟢
              </span>
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                אור ירוק
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                כדאי להמשיך להשקיע
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                🟡
              </span>
              <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                אור צהוב
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                יש פוטנציאל, צריך תשומת לב
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <span className="text-2xl mb-2 block" aria-hidden="true">
                🔴
              </span>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                אור אדום
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                שווה לשקול מחדש
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <ChanceCalculatorClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">חשוב:</span> הרמזור הוא כלי לחשיבה,
            לא גזר דין. לפעמים אור צהוב הוא הזמנה לשיחה פתוחה — לא לסיום.
            תסמוך גם על הבטן שלך.
          </p>
        </div>
      </section>
    </>
  );
}
