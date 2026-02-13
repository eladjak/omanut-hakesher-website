import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "אודות | אומנות הקשר",
  description:
    "הכירו את הגישה והפילוסופיה של אומנות הקשר - ליווי זוגות ויחידים לתקשורת עמוקה ומשמעותית",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            אודות <span className="text-primary">אומנות הקשר</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            הדרך לקשרים בריאים ומספקים עוברת דרך תקשורת אמיתית ופתוחה
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">הסיפור שלנו</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                אומנות הקשר נולדה מתוך האמונה העמוקה שכל אדם וכל זוג יכולים
                ליצור קשרים עמוקים ומשמעותיים. לאורך שנים של עבודה עם זוגות
                ויחידים, ראינו כיצד שינויים קטנים בתקשורת יכולים להביא לשינוי
                עצום באיכות החיים ובשביעות הרצון מהזוגיות.
              </p>
              <p>
                הגישה שלנו משלבת ידע מקצועי מתחומי הפסיכולוגיה והתקשורת עם כלים
                מעשיים שניתן ליישם בחיי היום-יום. אנחנו מאמינים שלמידה והתפתחות
                צריכות להיות נגישות, מכבדות ומותאמות אישית לכל זוג ולכל אדם.
              </p>
              <p>
                המטרה שלנו היא להעניק לכם את הכלים והביטחון לבנות את הקשרים
                שאתם רוצים - קשרים מבוססים על הבנה, כבוד ואהבה.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">הערכים שלנו</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "כבוד",
                description: "יחס מכבד לכל אדם ולכל סיפור חיים",
              },
              {
                title: "אותנטיות",
                description: "עידוד לחיבור אמיתי עם עצמך ועם האחר",
              },
              {
                title: "מקצועיות",
                description: "ידע מבוסס מחקר וניסיון מעשי עשיר",
              },
              {
                title: "צמיחה",
                description: "אמונה ביכולת של כל אחד להשתנות ולהתפתח",
              },
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">הגישה שלנו</h2>
            <div className="space-y-8">
              {[
                {
                  title: "הקשבה עמוקה",
                  description:
                    "כל תהליך מתחיל בהקשבה אמיתית לצרכים, לרצונות ולאתגרים הייחודיים שלכם",
                },
                {
                  title: "כלים מעשיים",
                  description:
                    "דגש על טכניקות ואסטרטגיות שניתן ליישם מיד בחיי היום-יום",
                },
                {
                  title: "סביבה בטוחה",
                  description:
                    "יצירת מרחב תומך ולא שיפוטי שמאפשר פתיחות וחקירה",
                },
                {
                  title: "התקדמות הדרגתית",
                  description:
                    "בניית שינוי יציב ובר-קיימא דרך צעדים קטנים ומדידים",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6 bg-muted rounded-xl"
                >
                  <div className="text-2xl font-bold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">רוצים להתחיל?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
            פגישת היכרות ראשונה תעזור לנו להכיר ולהבין איך נוכל לעזור לכם
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors"
          >
            צרו קשר
          </Link>
        </div>
      </section>
    </>
  );
}
