import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { listProducts, formatILS } from "@/lib/products";

export const metadata: Metadata = {
  title: "תוכניות | אומנות הקשר",
  description:
    "כל המסלולים למציאת זוגיות מאושרת: תוכנית הדרך, חדר כושר לדייטים, ליווי VIP, מועדון 90D וכרטיס היכרויות מנצח.",
  alternates: { canonical: "/programs" },
};

const programs = listProducts().filter((p) =>
  p.path.startsWith("/programs") || p.path.startsWith("/products") || p.path === "/club" || p.path === "/coaching/vip"
);

export default function ProgramsIndexPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "תוכניות" }]} />
      </div>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              כל המסלולים
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              לבחור את הדרך שמתאימה לך
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              מנקודת הכניסה הנגישה (₪4 לחודש ראשון במועדון) ועד ליווי אישי מלא — בכל רמת השקעה יש דרך.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p) => (
              <Card key={p.slug} className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all">
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-2xl font-bold leading-tight text-balance">{p.nameHe}</h2>
                    {p.type !== "booking-required" && (
                      <span className="text-lg font-bold text-primary tabular-nums whitespace-nowrap">
                        {formatILS(p.price.amount)}
                        {p.type === "recurring-monthly" && <span className="text-xs text-muted-foreground"> /חודש</span>}
                      </span>
                    )}
                    {p.type === "booking-required" && (
                      <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                        מותאם
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-pretty mb-6 flex-grow">
                    {p.taglineHe}
                  </p>
                  <Link
                    href={p.path}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
                  >
                    {p.type === "booking-required" ? "לפרטים ושיחת היכרות" : "לפרטים מלאים והרשמה"}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-3">לא בטוח/ה מה מתאים?</p>
            <Link
              href="/coaching/book"
              className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
            >
              שיחת היכרות חינם — נחליט יחד →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
