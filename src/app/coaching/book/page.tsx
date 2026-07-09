import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "תיאום שיחת היכרות חינם | ליווי אישי | אומנות הקשר",
  description:
    "שיחת היכרות חינם של 30+ דקות עם אלעד יעקובוביץ׳. נבחן יחד אם הליווי האישי מתאים לך — בלי מחויבות.",
  alternates: { canonical: "/coaching/book" },
  robots: { index: true, follow: true },
};

// YouCanBookMe embed URL — placeholder until Elad provides the final booking page URL.
// Replace with the real value (e.g. https://omanut-hakesher.youcanbook.me/?embed=true)
// when known. The page degrades gracefully if the iframe is empty.
const YCBM_URL = process.env.NEXT_PUBLIC_YCBM_URL ?? "";

export default function CoachingBookPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "ליווי", href: "/coaching" }, { label: "תיאום שיחה" }]} />
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              שיחת היכרות · 30+ דקות · ללא עלות
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              נקבע שיחה — נראה אם זה מתאים
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              בחר/י זמן שנוח לך מהלוח למטה. תוך כמה דקות אקבל את הפגישה בלוח שלי וישלח אליך אישור עם לינק זום.
            </p>
          </div>

          {YCBM_URL ? (
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <iframe
                  src={YCBM_URL}
                  title="תיאום שיחת היכרות עם אלעד"
                  className="w-full"
                  style={{ height: "780px", border: 0 }}
                  loading="lazy"
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-6">
                  לוח הזמנים האונליין בתחזוקה כרגע. בינתיים אפשר לתאם איתי ישירות:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="https://wa.me/972512518025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    וואטסאפ
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-full font-medium hover:bg-muted transition-colors"
                  >
                    טופס יצירת קשר
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            <Card className="border-border/50">
              <CardContent className="p-5 text-center">
                <p className="text-sm font-semibold mb-1">30+ דקות</p>
                <p className="text-xs text-muted-foreground">בלי הגבלת זמן קשיחה — נדבר כל זמן שנדרש</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-5 text-center">
                <p className="text-sm font-semibold mb-1">בזום</p>
                <p className="text-xs text-muted-foreground">מקבל/ת לינק במייל מיד עם תיאום הפגישה</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-5 text-center">
                <p className="text-sm font-semibold mb-1">בלי מחויבות</p>
                <p className="text-xs text-muted-foreground">שיחת היכרות. אם לא מתאים, אין לחץ להמשיך</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
