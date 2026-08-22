import type { Metadata } from "next";
import { LeadMagnetTemplate } from "@/components/lead/LeadMagnetTemplate";

export const metadata: Metadata = {
  title: "איך לכתוב חזון אישי לזוגיות — מדריך חינמי",
  description:
    "מדריך חינמי לבירור צרכים, ערכים, גבולות ואורח חיים רצוי — ולהפיכת הכיוון האישי לצעד שבועי שאפשר לבדוק.",
  alternates: { canonical: "/lead/vision" },
  openGraph: {
    title: "חזון אישי לזוגיות | אומנות הקשר",
    description: "מדריך חינמי לבירור הכיוון האישי והזוגי בלי להפוך אותו לרשימת דרישות קשיחה.",
    url: "/lead/vision",
    locale: "he_IL",
    type: "website",
  },
};

export default function VisionPage() {
  return (
    <LeadMagnetTemplate
      slug="vision"
      breadcrumbLabel="חזון אישי"
      heroBadge="מדריך חינמי"
      heroTitle={<>איך לכתוב <span className="text-accent-light">חזון אישי</span> לזוגיות</>}
      heroSubtitle="להפוך משאלה כללית לבירור של צרכים, ערכים, גבולות והחיים שהיית רוצה לבנות לצד קשר."
      heroImage="/images/generated/blog-readiness.jpg"
      heroImageAlt="כתיבת חזון אישי לזוגיות"
      benefits={[
        { text: "מבנה להתבוננות בתחומי חיים שמשפיעים גם על זוגיות" },
        { text: "הבחנה בין ערך חשוב, העדפה וגמישות אפשרית" },
        { text: "תרגום של רעיון גדול לצעד שבועי שאפשר לבצע ולבחון" },
      ]}
      teaserBadge="הצצה פנימה"
      teaserTitle="מה נעשה במדריך"
      teaserSubtitle="תרגילים לבירור כיוון — לא תחזית ולא מסנן אוטומטי לבני ובנות זוג"
      teasers={[
        { num: 1, title: "מבט על תחומי החיים", desc: "לראות איך זמן, עבודה, קהילה, בית וקשר משתלבים בתמונה אחת" },
        { num: 2, title: "מכתב מהעתיד", desc: "לנסח אפשרות רצויה בלי לדרוש שהמציאות תיראה בדיוק כך" },
        { num: 3, title: "חזון חי", desc: "לחבר את הכיוון להחלטה קטנה ולא להשאיר אותו כהצהרה יפה" },
        { num: 4, title: "ערכים והעדפות", desc: "להפריד בין מה שחיוני עבורך לבין מה שנחמד שיהיה" },
        { num: 5, title: "תמונה של יום רגיל", desc: "לבחון איך נראים היומיום, הזמן והשותפות — לא רק רגעי שיא" },
        { num: 6, title: "צעד שבועי", desc: "לבחור פעולה אחת שמקרבת את החיים לכיוון שהוגדר" },
      ]}
      contextNote={{
        title: "חזון הוא מצפן, לא חוזה",
        text: "הוא נועד לעזור לזהות כיוון ושאלות טובות. כדאי להשאיר מקום לאדם אמיתי, לשינוי ולהפתעות שלא הופיעו בתכנון.",
      }}
      practicePrompt={{
        title: "יום שלישי רגיל בעוד שנתיים",
        desc: "כתבו חמש שורות על יום חול רגיל: מה חשוב שיהיה בו, על מה אפשר להתגמש ומה עדיין לא ברור.",
        questions: ["איזה צורך עומד מאחורי התמונה שכתבתי?", "איזה צעד קטן בחיים שלי אפשר לעשות כבר השבוע?"],
      }}
      ctaText="לפתיחת המדריך המלא"
      formIntro="ה־PDF המלא והתרגילים זמינים לקריאה ישירה."
    />
  );
}
