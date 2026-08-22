import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function FreeWorkshopBanner() {
  return (
    <section className="py-16 bg-gradient-to-l from-primary via-primary-dark to-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* A white chip lightens the pink gradient underneath it, so white-on-white/20
              measured 4.21:1 (12px needs 4.5). Darkening the chip instead of the text
              keeps the badge reading as a chip and measures 7.08:1 over --primary and
              8.56:1 over --primary-dark, i.e. it passes at both ends of the gradient. */}
          <Badge className="bg-black/20 text-white border-white/40 hover:bg-black/20 mb-4">
            אירועי הדרכה
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            סדנאות חיות לתרגול שיחה, גבולות וקבלת החלטות
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            המועד הבא עדיין לא נקבע. כשייפתח אירוע נציג מראש מה מתרגלים, למי הוא
            מתאים, תאריך, שעה, מחיר, מתכונת, מדיניות הקלטה ותנאי ביטול — כדי
            שאפשר יהיה לבחור בלי לחץ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/events/love-event"
              className="inline-flex px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              מה מתרגלים בסדנה
            </Link>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              לבירור מועד
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
