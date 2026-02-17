import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "התהליך עם אומנות הקשר שינה את הזוגיות שלנו לחלוטין. למדנו להקשיב באמת אחד לשני ולדבר בצורה שמחברת.",
    author: "מיכל ודני",
    context: "זוג נשוי 8 שנים",
  },
  {
    quote: "הכלים שקיבלנו פשוטים ומעשיים. אנחנו משתמשים בהם כל יום ורואים את ההבדל. הויכוחים שלנו הפכו לשיחות בונות.",
    author: "רונית ויוסי",
    context: "לאחר שנתיים ביחד",
  },
  {
    quote: "גישה חמה ומקצועית. הרגשנו בטוחים לפתוח את הלב ולעבוד על הקשר שלנו. זו הייתה ההחלטה הכי טובה.",
    author: "שירה ואלון",
    context: "לפני החתונה",
  },
  {
    quote: "אחרי שנים של ניסיונות כושלים, סוף סוף מצאנו מקום שבו הדברים התחילו להשתנות באמת.",
    author: "יעל ומשה",
    context: "זוג עם ילדים",
  },
  {
    quote: "הסדנה הייתה חוויה מדהימה. למדתי כל כך הרבה על עצמי ועל הדרך שבה אני מתקשר.",
    author: "אורן",
    context: "משתתף בסדנה",
  },
  {
    quote: "הליווי האישי עזר לי להבין דפוסים שחזרו בכל הקשרים שלי. היום אני בקשר בריא ומספק.",
    author: "נעמה",
    context: "ליווי אישי",
  },
  {
    quote: "המפגשים האונליין היו נוחים ואפקטיביים. גם דרך המסך ההרגשה הייתה של קרבה ותמיכה אמיתית.",
    author: "דנה ורן",
    context: "פגישות אונליין",
  },
  {
    quote: "הגענו בזמן משבר קשה ויצאנו מחוזקים. הכלים שקיבלנו עוזרים לנו גם היום, שנתיים אחרי.",
    author: "תמר ואיתי",
    context: "ייעוץ זוגי",
  },
];

export function HomeTestimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            המלצות
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            מה אומרים <span className="text-primary">עלינו</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            סיפורים אמיתיים של זוגות ויחידים שעברו את התהליך
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                {/* Quote mark */}
                <div className="text-4xl text-primary/20 font-serif leading-none mb-3">&ldquo;</div>
                <blockquote className="text-sm leading-relaxed mb-4">
                  {testimonial.quote}
                </blockquote>
                <Separator className="my-4" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <cite className="not-italic font-semibold block text-sm">
                      {testimonial.author}
                    </cite>
                    <span className="text-xs text-muted-foreground">
                      {testimonial.context}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            לכל ההמלצות
            <span>&larr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
