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
    question: "כמה עולה שיחת ההיכרות?",
    answer:
      "שיחת ההיכרות היא חינמית לגמרי וללא שום התחייבות. המטרה היא שנכיר אחד את השני ונבדוק אם יש התאמה, לפני שמתחייבים לתהליך.",
  },
  {
    question: "כמה זמן נמשכת השיחה?",
    answer:
      "שיחת ההיכרות נמשכת כ-20 דקות. מספיק זמן כדי להכיר, להבין את הצרכים שלכם, ולהסביר על דרך העבודה - בלי לחץ ובלי ללהק.",
  },
  {
    question: "האם השיחה בזום או בטלפון?",
    answer:
      "מה שנוח לכם! אפשר בטלפון, בזום, או אפילו בפגישה פרונטלית. רוב הזוגות מעדיפים שיחת טלפון או זום לנוחות, אבל אנחנו גמישים.",
  },
  {
    question: "האם צריך להכין משהו לקראת השיחה?",
    answer:
      "לא צריך להכין שום דבר מיוחד. פשוט בואו כפי שאתם. אם יש נושא ספציפי שהביא אתכם, מומלץ לחשוב עליו מראש, אבל זה לא חובה.",
  },
  {
    question: "האם בן/בת הזוג צריכים להשתתף?",
    answer:
      "לא בהכרח. לפעמים אחד מהזוג פונה ראשון, וזה לגמרי בסדר. אפשר לקיים את שיחת ההיכרות גם לבד, ולהחליט יחד אחר כך על המשך.",
  },
];

export function BookFAQ() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            שאלות נפוצות
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            שאלות <span className="text-primary">ותשובות</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            כל מה שרציתם לדעת לפני שיחת ההיכרות
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
