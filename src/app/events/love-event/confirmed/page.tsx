import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "אישור הרשמה — אירוע אהבה",
  description: "פרטי החיבור לאירוע אהבה הקרוב",
  alternates: { canonical: "/events/love-event/confirmed" },
  robots: { index: false, follow: false },
};

export default function LoveEventConfirmedPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-secondary/30 shadow-xl shadow-secondary/10">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="inline-flex p-5 rounded-full bg-secondary/15 mb-6">
              <svg className="w-12 h-12 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              נרשמת לאירוע אהבה
            </h1>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              שלחנו לך לאימייל את לינק הזום + התאריך המדויק של האירוע הבא. נשמח לראות אותך שם.
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="inline-flex px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                לדף הבית
              </Link>
              <div>
                <Link
                  href="https://wa.me/972512518025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-dark hover:opacity-80 transition-opacity"
                >
                  שאלות לפני האירוע? כתבו לי
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
