import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90dvh] flex items-center bg-gradient-to-bl from-muted via-background to-primary-light/20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              לבנות קשר עמוק
              <span className="block text-primary mt-2">שנמשך לאורך זמן</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              ליווי מקצועי לזוגות ויחידים בדרך לתקשורת אמיתית ומשמעותית. יחד
              נגלה את הכלים לחיבור עמוק יותר.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors"
              >
                לקביעת פגישת היכרות
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-colors"
              >
                השירותים שלנו
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            למה אומנות הקשר?
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            גישה ייחודית המשלבת ידע מקצועי עם כלים מעשיים ליצירת שינוי אמיתי
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💬",
                title: "תקשורת אפקטיבית",
                description:
                  "לימוד כלים לתקשורת פתוחה וכנה שיוצרת הבנה הדדית ומחזקת את הקשר",
              },
              {
                icon: "🤝",
                title: "גישה מותאמת אישית",
                description:
                  "כל זוג וכל אדם הם ייחודיים. התהליך מותאם לצרכים ולמטרות האישיות שלכם",
              },
              {
                icon: "🌱",
                title: "צמיחה מתמשכת",
                description:
                  "הכלים שתרכשו ילוו אתכם לאורך החיים ויאפשרו התפתחות והעמקה מתמדת",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-background rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            השירותים שלנו
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            מגוון אפשרויות לליווי וצמיחה בתחום הזוגיות והתקשורת
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "ייעוץ זוגי",
                description:
                  "מפגשים אישיים לזוגות לחיזוק הקשר, שיפור התקשורת והתמודדות עם אתגרים",
                href: "/services#couples",
              },
              {
                title: "סדנאות קבוצתיות",
                description:
                  "סדנאות מעשיות בקבוצות קטנות לפיתוח מיומנויות תקשורת וקשר",
                href: "/services#workshops",
              },
              {
                title: "ליווי אישי",
                description:
                  "מפגשים פרטניים להתפתחות אישית ובניית יכולות לקשרים בריאים",
                href: "/services#individual",
              },
              {
                title: "פגישות אונליין",
                description:
                  "גמישות מלאה עם אפשרות למפגשים מקוונים מכל מקום בעולם",
                href: "/services#online",
              },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group p-8 border border-border rounded-2xl hover:border-primary hover:bg-primary/5 transition-all"
              >
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
                <span className="inline-block mt-4 text-primary font-medium">
                  למידע נוסף &larr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            מה אומרים עלינו
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "התהליך עם אומנות הקשר שינה את הזוגיות שלנו לחלוטין. למדנו להקשיב באמת אחד לשני.",
                author: "מיכל ודני",
              },
              {
                quote:
                  "הכלים שקיבלנו פשוטים ומעשיים. אנחנו משתמשים בהם כל יום ורואים את ההבדל.",
                author: "רונית ויוסי",
              },
              {
                quote:
                  "גישה חמה ומקצועית. הרגשנו בטוחים לפתוח את הלב ולעבוד על הקשר שלנו.",
                author: "שירה ואלון",
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-8 bg-background rounded-2xl">
                <blockquote className="text-lg mb-4">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <cite className="text-primary font-medium not-italic">
                  — {testimonial.author}
                </cite>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="text-primary font-semibold hover:underline"
            >
              לכל ההמלצות &larr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            מוכנים להתחיל את המסע?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            פגישת היכרות ראשונה ללא התחייבות. בואו נכיר ונראה איך אפשר לעזור לכם
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors"
          >
            לקביעת פגישה
          </Link>
        </div>
      </section>
    </>
  );
}
