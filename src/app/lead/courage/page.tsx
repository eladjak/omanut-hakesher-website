import type { Metadata } from "next";
import { LeadMagnetTemplate } from "@/components/lead/LeadMagnetTemplate";

export const metadata: Metadata = {
  title: "8 דרכים לתרגל אומץ — מדריך חינמי",
  description:
    "מדריך מעשי לבחירת צעד קטן מול הימנעות, להתמודדות עם ביקורת וללמידה מהניסיון — בלי לחכות שהפחד ייעלם.",
  alternates: { canonical: "/lead/courage" },
  openGraph: {
    title: "8 דרכים לתרגל אומץ | אומנות הקשר",
    description: "מדריך חינמי לתרגול צעדים קטנים מול פחד והימנעות.",
    url: "/lead/courage",
    locale: "he_IL",
    type: "website",
  },
};

export default function CouragePage() {
  return (
    <LeadMagnetTemplate
      slug="courage"
      breadcrumbLabel="8 דרכים לאומץ"
      heroBadge="מדריך חינמי"
      heroTitle={<>8 דרכים לתרגל <span className="text-accent-light">אומץ</span></>}
      heroSubtitle="לא להעלים פחד — לבחור צעד קטן שאפשר לעשות גם כשהוא נוכח, ואז ללמוד ממנו."
      heroImage="/images/generated/blog-confidence.jpg"
      heroImageAlt="8 דרכים לחיים של אומץ"
      benefits={[
        { text: "דרך לזהות את הרגע שבו חשש הופך להימנעות" },
        { text: "תרגילים קצרים לבחירת צעד בר־ביצוע במקום קפיצה גדולה" },
        { text: "שאלות רפלקציה שמפרידות בין תוצאה לבין עצם הניסיון" },
      ]}
      teaserBadge="הצצה פנימה"
      teaserTitle="כמה מהדרכים שתגלה במדריך"
      teaserSubtitle="רעיונות לתרגול — לא מבחן אומץ ולא נוסחה אחת שמתאימה לכולם"
      teasers={[
        { num: 1, title: "לזהות את המשפט שעוצר", desc: "לשים לב למה עולה רגע לפני שמוותרים על פעולה שרצינו לעשות" },
        { num: 2, title: "להקטין את הצעד", desc: "להחליף משימה מאיימת בפעולה שאפשר באמת לבצע השבוע" },
        { num: 3, title: "לפעול לפני ויכוח ארוך עם עצמנו", desc: "לבחור סימן פשוט שמזכיר להתחיל פעולה קטנה" },
        { num: 5, title: "לבחון ביקורת", desc: "להפריד בין מידע שימושי, טעם אישי ופחד ישן" },
        { num: 6, title: "להגיד 'לא יודע'", desc: "לתרגל כנות בלי להקטין את עצמנו ובלי להעמיד פנים" },
        { num: 7, title: "הכנה למצב חברתי", desc: "להגדיר כוונה אחת שאינה תלויה בתגובה של הצד השני" },
      ]}
      contextNote={{
        title: "חשוב לדעת",
        text: "אומץ אינו מחייב להתעלם מסכנה, מגבול או מאי־נוחות משמעותית. המטרה היא לבחור פעולה מודעת ובטוחה — לא לדחוף את עצמנו בכל מחיר.",
      }}
      practicePrompt={{
        title: "סולם של שלושה צעדים",
        desc: "בחרו מצב אחד שנמנעתם ממנו וכתבו שלוש גרסאות שלו: קלה, בינונית וגדולה. השבוע נסו רק את הקלה.",
        questions: ["מה הצעד הקטן ביותר שעדיין נחשב פעולה?", "איך אדע שניסיתי — גם אם התוצאה לא הייתה בשליטתי?"],
      }}
      ctaText="לפתיחת כל 8 הדרכים"
      formIntro="ה־PDF המלא זמין לקריאה ישירה."
    />
  );
}
