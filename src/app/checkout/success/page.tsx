import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "סטטוס רכישה | אומנות הקשר",
  description: "עמוד סטטוס לרכישה מקוונת.",
  alternates: { canonical: "/checkout/success" },
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-accent/30 shadow-xl shadow-accent/10">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="inline-flex p-5 rounded-full bg-accent/15 mb-6" aria-hidden>
              <svg
                className="w-12 h-12 text-accent-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              אין כאן אישור תשלום
            </h1>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              מערכת הרכישה המקוונת עדיין אינה פעילה. כתובת העמוד או פרמטרים בקישור
              אינם הוכחה לתשלום, ולכן לא נציג אישור, חשבונית או הבטחת מסירה בלי
              אימות שרת מלא.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                לבירור מולנו
              </Link>
              <Link
                href="/"
                className="inline-flex px-8 py-3 border border-border rounded-full font-semibold hover:bg-muted transition-colors"
              >
                חזרה לאתר
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
