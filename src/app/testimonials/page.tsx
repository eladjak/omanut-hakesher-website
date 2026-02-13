import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "המלצות | אומנות הקשר",
  description: "מה אומרים זוגות ויחידים שעברו את התהליך עם אומנות הקשר",
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
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            מה אומרים <span className="text-primary">עלינו</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            סיפורים אמיתיים של זוגות ויחידים שעברו את התהליך
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-muted rounded-2xl hover:shadow-md transition-shadow"
              >
                <blockquote className="text-lg mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "זוגות ויחידים" },
              { number: "95%", label: "שביעות רצון" },
              { number: "10+", label: "שנות ניסיון" },
              { number: "50+", label: "סדנאות" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">רוצים להצטרף לסיפורי ההצלחה?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
            הצעד הראשון מתחיל בפגישת היכרות
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors"
          >
            לקביעת פגישה
          </Link>
        </div>
      </section>
    </>
  );
}
