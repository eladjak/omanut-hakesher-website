import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "שירותים | אומנות הקשר",
  description:
    "ייעוץ זוגי, סדנאות, ליווי אישי ופגישות אונליין - מגוון אפשרויות לחיזוק הקשר והתקשורת",
};

const services = [
  {
    id: "couples",
    title: "ייעוץ זוגי",
    description:
      "מפגשים אישיים לזוגות המעוניינים לחזק את הקשר, לשפר את התקשורת ולהתמודד עם אתגרים יחד",
    features: [
      "מפגשים פרטיים ואינטימיים",
      "התאמה אישית לצרכי הזוג",
      "כלים מעשיים לתקשורת יומיומית",
      "תמיכה בזמני משבר ושינוי",
      "חיזוק הקרבה והאינטימיות",
    ],
    duration: "מפגש של 60-90 דקות",
  },
  {
    id: "workshops",
    title: "סדנאות קבוצתיות",
    description:
      "סדנאות מעשיות בקבוצות קטנות לפיתוח מיומנויות תקשורת ויצירת קשרים משמעותיים",
    features: [
      "למידה מניסיון של אחרים",
      "תרגול מעשי בסביבה בטוחה",
      "קבוצות קטנות ואינטימיות",
      "נושאים מגוונים ורלוונטיים",
      "חומרים ללמידה עצמאית",
    ],
    duration: "סדנה של 3-4 שעות",
  },
  {
    id: "individual",
    title: "ליווי אישי",
    description:
      "מפגשים פרטניים להתפתחות אישית, בניית ביטחון עצמי ופיתוח יכולות לקשרים בריאים",
    features: [
      "מיקוד בצרכים האישיים שלך",
      "עבודה על דפוסים ואמונות",
      "פיתוח מודעות עצמית",
      "הכנה לקשר זוגי",
      "התמודדות עם פרידה או אובדן",
    ],
    duration: "מפגש של 50-60 דקות",
  },
  {
    id: "online",
    title: "פגישות אונליין",
    description:
      "גמישות מלאה עם אפשרות למפגשים מקוונים מכל מקום - אותה איכות, נגישות מקסימלית",
    features: [
      "נוחות ונגישות מהבית",
      "חיסכון בזמן נסיעות",
      "מתאים לזוגות במרחק",
      "פלטפורמה מאובטחת ופרטית",
      "גמישות בקביעת מועדים",
    ],
    duration: "כמו מפגש פרונטלי",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            השירותים <span className="text-primary">שלנו</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            מגוון אפשרויות לליווי וצמיחה בתחום הזוגיות והתקשורת
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-12 items-center scroll-mt-24`}
              >
                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground bg-muted inline-block px-4 py-2 rounded-full">
                    {service.duration}
                  </p>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">לגבי מחירים</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            המחירים משתנים בהתאם לסוג השירות ולמשך התהליך. בפגישת ההיכרות נדבר
            על הצרכים שלכם ונמצא את ההתאמה הטובה ביותר.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            צרו קשר לפרטים
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">מוכנים להתחיל?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
            פגישת היכרות ראשונה ללא התחייבות
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
