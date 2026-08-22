"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRODUCT_FACTS } from "@/lib/product-facts";

const faqItems = [
  {
    question: "מה כוללת תוכנית הדרך?",
    answer: `מסלול למידה של ${PRODUCT_FACTS.course.weeks} שבועות ו־${PRODUCT_FACTS.course.phases} שלבים. במערכת הלמידה מסודרים כעת ${PRODUCT_FACTS.course.lmsMappedLessons} שיעורים ו־${PRODUCT_FACTS.course.practicePdfs} דפי תרגול. פרטי הליווי, הקהילה והמפגשים משתנים לפי המחזור ויוצגו במפורש לפני הצטרפות.`,
  },
  {
    question: "כמה זמן נמשכת התוכנית וכמה זמן צריך לפנות?",
    answer: `מבנה התוכן הוא בן ${PRODUCT_FACTS.course.weeks} שבועות. היקף התרגול אינו זהה בכל שבוע, ולכן לפני ההצטרפות יוצג אומדן עומס מעודכן למחזור. אפשר לחזור לשיעור, להתאים תרגיל או לדלג כשמשימה אינה מתאימה.`,
  },
  {
    question: "למי התוכנית מיועדת?",
    answer:
      "התוכנית נבנתה בראש ובראשונה ליחידים שרוצים לפתח בהירות ומיומנויות סביב היכרות, תקשורת וקשר. היא יכולה להתאים גם אחרי פרידה או בתקופת הפסקה מהיכרויות, אבל אינה טיפול ואינה תחליף לסיוע מקצועי כשנדרש.",
  },
  {
    question: "האם חייבים לבצע כל תרגיל ולשתף תשובות?",
    answer:
      "לא. אפשר לעצור, לדלג, לבחור חלופה או לשמור תשובה פרטית. תרגיל אינו מבחן לאופי, למוכנות או למחויבות, ושיתוף אישי נעשה רק מתוך בחירה ובהתאם לכללי הפרטיות של המחזור.",
  },
  {
    question: "האם התוכנית מבטיחה זוגיות או התאמה?",
    answer:
      "לא. אי אפשר להבטיח מתי יתחיל קשר, עם מי או איך יתפתח. התוכנית מציעה מסגרת ללמידה, תרגול וקבלת החלטות; הערך שלה נבחן במיומנויות ובבחירות שאפשר ליישם, לא בהבטחת תוצאה חיצונית.",
  },
  {
    question: "מתי נפתחת ההצטרפות ומה המחיר?",
    answer:
      "הצטרפות מקוונת אינה פתוחה כרגע. כשמחזור יאושר, תאריך, מחיר מלא, מתכונת, ערוצי ליווי, תנאי ביטול ומשך הגישה יוצגו יחד לפני איסוף תשלום. אפשר להשאיר פנייה כללית בעמוד יצירת הקשר בלי התחייבות.",
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
            עובדות שחשוב לדעת לפני שבוחרים אם המסלול מתאים
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
