"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "מה כוללת תכנית הדרך?",
    answer:
      "התכנית כוללת מפגשים אישיים שבועיים או דו-שבועיים, תרגילים מעשיים לבית, כלים לתקשורת יומיומית, וליווי צמוד לאורך כל התהליך. כל תכנית מותאמת אישית לצרכים ולמטרות של הזוג.",
  },
  {
    question: "כמה זמן נמשכת התכנית?",
    answer:
      "התכנית נמשכת בדרך כלל בין 3-6 חודשים, אבל הקצב מותאם אליכם. חלק מהזוגות מרגישים שינוי משמעותי כבר אחרי חודש-חודשיים, ואחרים בוחרים להמשיך לתקופה ארוכה יותר להעמקה.",
  },
  {
    question: "האם אפשר להצטרף גם כיחיד?",
    answer:
      "בהחלט. התכנית מותאמת גם ליחידים שרוצים לעבוד על דפוסי תקשורת, להתכונן לזוגיות, או לעבד חוויות מקשרים קודמים. עבודה אישית יכולה להיות צעד משמעותי מאוד.",
  },
  {
    question: "מה המחיר של התכנית?",
    answer:
      "המחיר משתנה בהתאם למשך התכנית ולתדירות המפגשים. בשיחת ההיכרות החינמית נדבר על הצרכים שלכם ונתאים תכנית ומחיר. אנחנו מאמינים בשקיפות מלאה ובהתאמה אישית.",
  },
  {
    question: "האם המפגשים פרונטליים או אונליין?",
    answer:
      "שניהם! אפשר לבחור מפגשים פרונטליים, מפגשים בזום, או שילוב של השניים - מה שנוח לכם. מחקרים מראים שטיפול מקוון יעיל באותה מידה כמו טיפול פרונטלי.",
  },
];

export function CourseFAQ() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            שאלות נפוצות
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            שאלות <span className="text-primary">ותשובות</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            כל מה שרציתם לדעת על תכנית הדרך
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-border/50">
          <CardContent className="p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-base text-right leading-relaxed hover:no-underline hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
