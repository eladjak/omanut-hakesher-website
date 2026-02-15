import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "המלצות",
  description: "מה אומרים זוגות ויחידים שעברו את התהליך עם אומנות הקשר",
  alternates: {
    canonical: "/testimonials",
  },
};

const testimonials = [
  {
    quote:
      "התהליך עם אומנות הקשר שינה את הזוגיות שלנו לחלוטין. למדנו להקשיב באמת אחד לשני ולדבר בצורה שמחברת במקום להרחיק.",
    author: "מיכל ודני",
    context: "זוג נשוי 8 שנים",
  },
  {
    quote:
      "הכלים שקיבלנו פשוטים ומעשיים. אנחנו משתמשים בהם כל יום ורואים את ההבדל. הויכוחים שלנו הפכו לשיחות בונות.",
    author: "רונית ויוסי",
    context: "לאחר שנתיים ביחד",
  },
  {
    quote:
      "גישה חמה ומקצועית. הרגשנו בטוחים לפתוח את הלב ולעבוד על הקשר שלנו. זו הייתה ההחלטה הכי טובה שעשינו.",
    author: "שירה ואלון",
    context: "לפני החתונה",
  },
  {
    quote:
      "אחרי שנים של ניסיונות כושלים לשפר את התקשורת ביננו, סוף סוף מצאנו מקום שבו הדברים התחילו להשתנות.",
    author: "יעל ומשה",
    context: "זוג עם ילדים",
  },
  {
    quote:
      "הסדנה הייתה חוויה מדהימה. למדתי כל כך הרבה על עצמי ועל הדרך שבה אני מתקשר. ממליץ לכל מי שרוצה להשתפר.",
    author: "אורן",
    context: "משתתף בסדנה",
  },
  {
    quote:
      "הליווי האישי עזר לי להבין דפוסים שחזרו בכל הקשרים שלי. היום אני בקשר בריא ומספק, וזה בזכות העבודה שעשינו יחד.",
    author: "נעמה",
    context: "ליווי אישי",
  },
  {
    quote:
      "המפגשים האונליין היו מאוד נוחים ואפקטיביים. גם דרך המסך ההרגשה הייתה של קרבה ותמיכה אמיתית.",
    author: "דנה ורן",
    context: "פגישות אונליין",
  },
  {
    quote:
      "הגענו בזמן משבר קשה ויצאנו מחוזקים. הכלים שקיבלנו עוזרים לנו גם היום, שנתיים אחרי.",
    author: "תמר ואיתי",
    context: "ייעוץ זוגי",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            סיפורי הצלחה
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            מה אומרים <span className="text-primary">עלינו</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            סיפורים אמיתיים של זוגות ויחידים שעברו את התהליך
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-200"
              >
                <CardContent className="p-8">
                  {/* Quote mark */}
                  <div className="text-5xl text-primary/20 font-serif leading-none mb-4">&ldquo;</div>
                  <blockquote className="text-lg mb-6 leading-relaxed">
                    {testimonial.quote}
                  </blockquote>
                  <Separator className="my-5" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block">
                        {testimonial.author}
                      </cite>
                      <span className="text-sm text-muted-foreground">
                        {testimonial.context}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "זוגות ויחידים" },
              { number: "95%", label: "שביעות רצון" },
              { number: "10+", label: "שנות ניסיון" },
              { number: "50+", label: "סדנאות" },
            ].map((stat, index) => (
              <Card key={index} className="border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">רוצים להצטרף לסיפורי ההצלחה?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            הצעד הראשון מתחיל בפגישת היכרות
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לקביעת פגישה
          </Link>
        </div>
      </section>
    </>
  );
}
