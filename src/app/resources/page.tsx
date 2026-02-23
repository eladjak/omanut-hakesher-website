import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "משאבים",
  description:
    "משאבים חינמיים לזוגיות טובה יותר - מאמרים, תרגילים, כלי עזר והמלצות קריאה לחיזוק הקשר והתקשורת",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "משאבים | אומנות הקשר",
    description:
      "משאבים חינמיים לזוגיות טובה יותר - מאמרים, תרגילים, כלי עזר והמלצות קריאה לחיזוק הקשר והתקשורת",
    url: "/resources",
    locale: "he_IL",
    type: "website",
  },
};

const categories = [
  {
    icon: "📝",
    title: "מאמרים ומדריכים",
    description:
      "מאמרים מקצועיים ומדריכים מעשיים על תקשורת, זוגיות ופיתוח אישי.",
    color: "bg-primary/10",
  },
  {
    icon: "🎯",
    title: "תרגילים",
    description:
      "תרגילים מעשיים שאפשר לעשות לבד או עם בן/בת הזוג לשיפור התקשורת.",
    color: "bg-secondary/10",
  },
  {
    icon: "🛠️",
    title: "כלי עזר",
    description:
      "כלים ושיטות שיעזרו לכם ליישם את מה שלמדתם בחיי היום-יום.",
    color: "bg-accent/10",
  },
  {
    icon: "📚",
    title: "המלצות קריאה",
    description:
      "ספרים ומקורות מומלצים להעמקה בנושאי תקשורת, זוגיות ופסיכולוגיה.",
    color: "bg-primary-light/20",
  },
];

const resources = [
  {
    icon: "💬",
    title: "5 כללי זהב לתקשורת זוגית",
    description:
      "מדריך מעשי עם חמישה עקרונות פשוטים שישפרו את התקשורת הזוגית שלכם מהיום.",
    category: "מאמר",
    link: "/blog/communication-tips",
    categoryColor: "bg-primary/10 text-primary",
  },
  {
    icon: "🧘",
    title: "תרגיל הקשבה אמפתית",
    description:
      "תרגיל של 15 דקות לתירגול הקשבה עמוקה - לעשות יחד עם בן/בת הזוג פעם בשבוע.",
    category: "תרגיל",
    link: "/blog/active-listening",
    categoryColor: "bg-secondary/10 text-secondary-dark",
  },
  {
    icon: "❤️",
    title: "איך לשמור על זוגיות בריאה",
    description:
      "טיפים ועצות לשמירה על קשר בריא ומספק לאורך זמן, גם בתקופות עמוסות.",
    category: "מאמר",
    link: "/blog/healthy-relationship",
    categoryColor: "bg-primary/10 text-primary",
  },
  {
    icon: "🔄",
    title: "מחזור הריב - איך לצאת ממנו",
    description:
      "הבנת דפוסי הריב החוזרים וכלים מעשיים לשבור את המעגל ולבנות דיאלוג בונה.",
    category: "מדריך",
    link: "/blog/conflict-resolution",
    categoryColor: "bg-accent/10 text-accent-dark",
  },
  {
    icon: "📖",
    title: "שבעת העקרונות לזוגיות מוצלחת",
    description:
      "המלצה על הספר של ד\"ר ג'ון גוטמן - מחקר מקיף על מה שעובד בזוגיות.",
    category: "ספר",
    link: "/blog/quality-time",
    categoryColor: "bg-primary-light/20 text-primary-dark",
  },
  {
    icon: "🎯",
    title: "תרגיל צ'ק-אין זוגי שבועי",
    description:
      "שאלון קצר לשיחה שבועית עם בן/בת הזוג - לחזק את הקשר ולמנוע הצטברות של מתחים.",
    category: "תרגיל",
    link: "/blog/relationship-exercises",
    categoryColor: "bg-secondary/10 text-secondary-dark",
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "משאבים" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            כלים מעשיים
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            משאבים <span className="text-primary">לזוגיות טובה יותר</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            אוסף של מאמרים, תרגילים, כלי עזר והמלצות שיעזרו לכם
            לשפר את התקשורת ולחזק את הקשר - בחינם
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <StaggerItem key={index}>
                <Card className="border-border/50 hover:shadow-md transition-all duration-200 text-center h-full">
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 text-2xl ${cat.color}`}
                    >
                      {cat.icon}
                    </div>
                    <h2 className="text-lg font-semibold mb-3">{cat.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Resources Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                משאבים נבחרים
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                התחילו <span className="text-primary">מכאן</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                אוסף של המשאבים הפופולריים והמועילים ביותר
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <StaggerItem key={index}>
                <Link href={resource.link} className="block h-full">
                  <Card className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-2xl">{resource.icon}</span>
                        <Badge
                          variant="secondary"
                          className={`${resource.categoryColor} border-0 text-xs`}
                        >
                          {resource.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {resource.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter / Blog CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-border/50 text-center">
            <CardContent className="p-8">
              <svg
                className="w-10 h-10 text-primary mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-3">
                רוצים עוד תוכן?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                בבלוג שלנו תמצאו מאמרים מעמיקים, טיפים מעשיים ותובנות
                מעולם הזוגיות והתקשורת - הכל בעברית ובחינם.
              </p>
              <Button
                asChild
                className="rounded-full bg-primary hover:bg-primary-dark text-white"
              >
                <Link href="/blog">לבלוג שלנו</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            רוצים ליווי אישי?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            המשאבים הם התחלה מצוינת, אבל שום דבר לא מחליף ליווי מקצועי
            ואישי
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            צרו קשר
          </Link>
        </div>
      </section>
    </>
  );
}
