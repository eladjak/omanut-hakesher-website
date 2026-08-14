import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "סטטוס הרשמה — אירוע אהבה",
  description: "סטטוס ההרשמה לאירוע אהבה",
  alternates: { canonical: "/events/love-event/confirmed" },
  robots: { index: false, follow: false },
};

export default function LoveEventConfirmedPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-accent/30 shadow-xl shadow-accent/10">
          <CardContent className="p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              ההרשמה אינה פתוחה כרגע
            </h1>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              הגעה לעמוד הזה אינה אישור הרשמה. לא נאספו פרטים, לא נשלח לינק
              למפגש ואין מועד מאושר עד שיופיעו פרטי אירוע מלאים בעמוד הראשי.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/events/love-event"
                className="inline-flex px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                לעמוד האירוע
              </Link>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3 border border-border rounded-full font-semibold hover:bg-muted transition-colors"
              >
                לבירור מועד
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
