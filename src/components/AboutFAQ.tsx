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
    question: "מהי הגישה הטיפולית של אומנות הקשר?",
    answer:
      "הגישה שלנו משלבת מספר שיטות מבוססות מחקר: תקשורת לא אלימה (NVC), טיפול ממוקד רגש (EFT), וגישה קוגניטיבית-התנהגותית (CBT). אנחנו מאמינים בשילוב של כלים מעשיים עם הבנה עמוקה של דינמיקות רגשיות, כדי לייצר שינוי אמיתי ובר-קיימא בחיי הזוגיות והתקשורת.",
  },
  {
    question: "כמה זמן נמשך תהליך טיפולי ממוצע?",
    answer:
      "משך התהליך משתנה בהתאם לצרכים ולמטרות. תהליך קצר יכול להיות בין 6-10 מפגשים ומתאים לנושאים ממוקדים. תהליך עמוק יותר יכול להימשך 3-6 חודשים. כבר מהמפגשים הראשונים תרגישו שינוי ותקבלו כלים מעשיים שאפשר ליישם מיד.",
  },
  {
    question: "מה קורה בפגישת ההיכרות הראשונה?",
    answer:
      "פגישת ההיכרות היא הזדמנות להכיר אחד את השני, להבין את הצרכים שלכם, ולבדוק שיש התאמה. נשוחח על מה שהביא אתכם, על המטרות שלכם, ואסביר על דרך העבודה שלי. הפגישה ללא התחייבות ובסוף תוכלו להחליט אם ואיך להמשיך.",
  },
  {
    question: "האם אפשר להגיע לטיפול לבד, בלי בן/בת הזוג?",
    answer:
      "בהחלט. הליווי האישי מיועד בדיוק לזה - עבודה אישית על דפוסי תקשורת, הכנה לזוגיות, או התמודדות עם פרידה. לפעמים עבודה אישית היא הצעד הראשון שמוביל לשינוי גם בזוגיות, גם כשרק אחד מהזוג מגיע.",
  },
  {
    question: "מה ההבדל בין ייעוץ זוגי לסדנה קבוצתית?",
    answer:
      "ייעוץ זוגי הוא תהליך פרטי ואינטימי, מותאם לחלוטין לצרכים הספציפיים שלכם כזוג. סדנה קבוצתית מציעה למידה מחוויה משותפת, הזדמנות ללמוד מניסיון של אחרים, ותרגול בסביבה תומכת. הרבה זוגות משלבים בין השניים לתוצאות מיטביות.",
  },
  {
    question: "האם פגישות אונליין יעילות כמו פגישות פרונטליות?",
    answer:
      "מחקרים מראים שטיפול מקוון יעיל באותה מידה כמו טיפול פרונטלי. פגישות אונליין מציעות נוחות, גמישות בזמנים, וחיסכון בנסיעות. הפלטפורמה שאנחנו משתמשים בה מאובטחת ופרטית, ומאפשרת חוויה אישית ואינטימית גם דרך המסך.",
  },
  {
    question: "האם יש סודיות מלאה בתהליך?",
    answer:
      "סודיות היא ערך עליון. כל מה שנאמר במפגשים נשאר חסוי לחלוטין, בהתאם לכללי האתיקה המקצועיים. אני מחויבת לחיסיון מוחלט, ולא אשתף מידע עם גורם שלישי ללא הסכמתכם המפורשת (למעט מקרים חריגים המוגדרים בחוק).",
  },
  {
    question: "איך אדע שזה הזמן הנכון לפנות לייעוץ?",
    answer:
      "אין זמן \"מושלם\" לפנות לייעוץ. בין אם אתם במשבר, מרגישים שהתקשורת נתקעה, רוצים לחזק קשר קיים, או מתכוננים לשלב חדש בחיים - זה תמיד זמן טוב להשקיע בעצמכם ובקשרים שלכם. הצעד הראשון הוא תמיד הקשה ביותר, אבל גם הכי חשוב.",
  },
];

export function AboutFAQ() {
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
            כל מה שרציתם לדעת על הגישה והתהליך שלנו
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
