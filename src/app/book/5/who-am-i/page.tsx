import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhoAmIQuizClient } from "@/components/book/quizzes/WhoAmIQuizClient";

export const metadata: Metadata = {
  title: "מדריך למשתמש - מי אני? | פרק 5 - אומנות הקשר",
  description:
    "12 שאלות שיוצרות את הפרופיל האישי שלך — שפת האהבה, סגנון ההתקשרות, הפחדים והדפוסים. המדריך למשתמש שלך לזוגיות.",
  alternates: {
    canonical: "/book/5/who-am-i",
  },
  openGraph: {
    title: "מדריך למשתמש - מי אני? | פרק 5 - אומנות הקשר",
    description:
      "12 שאלות שיוצרות את הפרופיל האישי שלך — שפת האהבה, סגנון ההתקשרות, הפחדים והדפוסים.",
    url: "/book/5/who-am-i",
    locale: "he_IL",
    type: "website",
  },
};

export default function WhoAmIPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 5", href: "/book/5" },
            { label: "מי אני?" },
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
              פרק 5 • כלי שני
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              מי אני? — המדריך למשתמש
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              12 שאלות שיוצרות את הפרופיל האישי שלך
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              לפני שמתחילים לחפש את הזוגיות, כדאי להכיר את עצמנו. השאלון הזה
              יצור עבורך מדריך למשתמש — מסמך אחד שמרכז מי אתה, מה אתה צריך,
              ומה מניע אותך בזוגיות.
            </p>
          </div>
        </div>
      </section>

      {/* Sections overview */}
      <section className="py-10 border-b border-border/30 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6 text-center">
            6 חלקי המדריך
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            {[
              { emoji: "🪞", label: "מי אני" },
              { emoji: "💡", label: "מה אני צריך" },
              { emoji: "⚙️", label: "מערכת ההפעלה שלי" },
              { emoji: "🔐", label: "הפחדים שלי" },
              { emoji: "🔁", label: "הדפוסים שלי" },
              { emoji: "🧭", label: "הכיוון שלי" },
            ].map((item) => (
              <div key={item.label}>
                <span
                  className="text-2xl mb-1 block"
                  aria-hidden="true"
                >
                  {item.emoji}
                </span>
                <p className="font-semibold text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <WhoAmIQuizClient />
        </div>
      </section>

      {/* Context note */}
      <section className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">טיפ:</span> שמור את התוצאה. חזור
            אליה אחרי שתסיים לקרוא את הספר — ותשים לב מה השתנה.{" "}
            <a href="/book/5" className="text-primary hover:underline">
              המשך לקרוא את פרק 5
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
