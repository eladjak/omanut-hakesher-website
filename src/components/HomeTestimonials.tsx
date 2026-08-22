import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const verificationPaths = [
  {
    number: "בדיקה א׳",
    title: "לקרוא תוכן מלא",
    description: "לא רק כותרת שיווקית: לבחור מאמר ולבדוק את השפה, העומק והגישה.",
    href: "/blog",
    cta: "למאמרים",
  },
  {
    number: "בדיקה ב׳",
    title: "לפתוח כלי מעשי",
    description: "לקחת מדריך מלא ולראות אם התרגול ברור, מכבד ושימושי לחיים שלך.",
    href: "/lead",
    cta: "למדריכים הפתוחים",
  },
  {
    number: "בדיקה ג׳",
    title: "לבדוק את המבנה",
    description: "לעבור על שלבי התוכנית, מה כלול ומה צריך לברר לפני כל התחייבות.",
    href: "/programs/the-way",
    cta: "למבנה התוכנית",
  },
] as const;

/**
 * No personal proof is rendered here while the publication ledger is empty.
 * Instead, the homepage offers evidence visitors can inspect for themselves.
 */
export function HomeTestimonials() {
  return (
    <section className="bg-muted/30 py-20" data-proof-substitute="verification-path">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            לא צריך להאמין על המילה
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">
            שלוש דרכים לבדוק אם הגישה מתאימה לך
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            לפני תוכנית, ספר או ליווי אפשר לפגוש את התוכן עצמו, לנסות כלי אחד
            ולבדוק אם הוא יוצר יותר בהירות — בלי להתחייב ובלי להסתמך על הבטחת תוצאה.
          </p>
        </div>

        <ol className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {verificationPaths.map((path) => (
            <li key={path.number}>
              <Card className="h-full border-border/60">
                <CardContent className="flex h-full flex-col p-6">
                  <span className="mb-3 self-start text-sm font-bold text-primary">
                    {path.number}
                  </span>
                  <h3 className="mb-2 text-xl font-bold">{path.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {path.description}
                  </p>
                  <Link
                    href={path.href}
                    className="mt-auto inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {path.cta} ←
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          סיפורים אישיים ועדויות אינם מוצגים בלי אימות מקור והסכמה לפרסום. עד שיהיו
          כאלה, אפשר להעריך את העבודה דרך החומרים הפתוחים עצמם.
        </p>
      </div>
    </section>
  );
}
