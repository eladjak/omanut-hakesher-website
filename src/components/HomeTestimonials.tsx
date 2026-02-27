import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Testimonial {
  quote: string;
  author: string;
  age?: number;
  occupation?: string;
  context: string;
  highlight?: boolean;
}

const testimonials: Testimonial[] = [
  {
    quote: "הגעתי לאלעד אחרי 5 שנים של דייטים כושלים. הייתי בטוח שמשהו לא בסדר איתי. תוך 3 חודשים הבנתי שהבעיה הייתה לא מה שחשבתי - למדתי שאני בורח מקרבה בגלל פחד מדחייה. היום אני נשוי כבר שנתיים לאישה הכי מדהימה שפגשתי.",
    author: "דני",
    age: 38,
    occupation: "מהנדס",
    context: "נשוי 2 שנים",
    highlight: true,
  },
  {
    quote: "ניסיתי הכל - אפליקציות, שדכנים, אירועים. שום דבר לא עבד. הליווי עם אלעד היה שונה לגמרי. הוא לא רק עזר לי להבין מה אני רוצה, אלא גם לימד אותי איך לתקשר את זה. פגשתי את בן זוגי אחרי חודשיים וחצי.",
    author: "מיכל",
    age: 34,
    occupation: "עורכת דין",
    context: "בזוגיות מאושרת",
    highlight: true,
  },
  {
    quote: "הייתי סקפטי בהתחלה. חשבתי שאני יודע הכל על דייטינג. אלעד הראה לי כמה דברים בסיסיים שפספסתי לגמרי. הייתה לי חברה תוך 6 שבועות. היום אנחנו גרים ביחד.",
    author: "אורי",
    age: 42,
    occupation: "יזם",
    context: "גרים ביחד",
  },
  {
    quote: "אחרי הגירושין הבנתי שאני צריך לעשות דברים אחרת. הליווי עם אלעד נתן לי את הכלים והביטחון. לא טיפול - דרך מעשית שעובדת.",
    author: "יואב",
    age: 38,
    occupation: "מנהל שיווק",
    context: "בזוגיות חדשה",
  },
  {
    quote: "מגיעה כל שנתיים של דייטים אינסופיים, הייתי מותשת. כולם אומרים ׳את נפלאה, זה יגיע׳ - אבל אלעד נתן כלים, לא עידוד. וזה מה שהיה חסר.",
    author: "ענבל",
    age: 29,
    occupation: "מעצבת",
    context: "מאורסת",
  },
  {
    quote: "אלעד לא מנחה ׳מלמעלה׳. הוא מדבר בגובה העיניים, ישר, בלי בולשיט. גישה שלגברים כמוני היה קשה למצוא בכל מקום אחר.",
    author: "נועם",
    age: 34,
    occupation: "מהנדס תוכנה",
    context: "מאורס",
  },
];

export function HomeTestimonials() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            461 זוגות ועולה
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            הם כבר <span className="text-primary">מצאו</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            סיפורים אמיתיים של אנשים שעברו את התהליך ומצאו את הזוגיות שחיכתה להם
          </p>
        </div>

        {/* Featured testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {testimonials.filter(t => t.highlight).map((testimonial, index) => (
            <Card key={index} className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-all duration-200">
              <CardContent className="p-8">
                <div className="text-5xl text-primary/20 font-serif leading-none mb-4">&ldquo;</div>
                <blockquote className="text-lg leading-relaxed mb-6">
                  {testimonial.quote}
                </blockquote>
                <Separator className="my-4" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <cite className="not-italic font-semibold block">
                      {testimonial.author}, {testimonial.age}
                    </cite>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.occupation} &middot; {testimonial.context}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.filter(t => !t.highlight).map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
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
                      {testimonial.author}{testimonial.age ? `, ${testimonial.age}` : ""}
                    </cite>
                    <span className="text-xs text-muted-foreground">
                      {testimonial.occupation ? `${testimonial.occupation} · ` : ""}{testimonial.context}
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
            לכל סיפורי ההצלחה
            <span>&larr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
