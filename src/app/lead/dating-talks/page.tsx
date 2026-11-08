import type { Metadata } from "next";
import { LeadMagnetTemplate } from "@/components/lead/LeadMagnetTemplate";

export const metadata: Metadata = {
  title: "10 כללים לשיחות דייט מנצחות — מדריך חינמי",
  description:
    "המדריך החינמי של אלעד יעקובוביץ׳: 10 כללים לשיחה בדייט שיוצרת חיבור אמיתי. נושאי שיחה, טעויות שכיחות, ושאלות שפותחות לב. PDF במייל.",
  alternates: { canonical: "/lead/dating-talks" },
  openGraph: {
    title: "10 כללים לשיחות דייט מנצחות | אומנות הקשר",
    description: "מדריך חינמי לניהול שיחה בדייט שיוצרת חיבור אמיתי.",
    url: "/lead/dating-talks",
    locale: "he_IL",
    type: "website",
  },
};

export default function DatingTalksPage() {
  return (
    <LeadMagnetTemplate
      slug="dating-talks"
      breadcrumbLabel="10 כללים לשיחות דייט"
      heroBadge="מדריך חינמי"
      heroTitle={<>10 כללים לשיחות דייט <span className="text-accent-light">מנצחות</span></>}
      heroSubtitle="הנושאים שכן, הטעויות שלא, והשאלות שגורמות לאדם השני להרגיש שהוא מדבר עם מישהו שמבין."
      heroImage="/images/generated/blog-communication.jpg"
      heroImageAlt="10 כללים לשיחות דייט מנצחות"
      benefits={[
        { text: "10 כללי זהב לשיחה שמייצרת חיבור אמיתי (ולא ראיון עבודה)" },
        { text: "רשימת 12 נושאי שיחה שמשאירים את האדם השני רוצה עוד" },
        { text: "הטעויות ה-5 הנפוצות שהורגות חיבור בדייט הראשון" },
      ]}
      teaserBadge="הצצה פנימה"
      teaserTitle="כמה מהכללים שתגלה במדריך"
      teaserSubtitle="(10 כללים + נושאי שיחה + תרגילים מעשיים)"
      teasers={[
        { num: 1, title: "כלל ה-70/30", desc: "מי צריך לדבר יותר בדייט הראשון — והתשובה תפתיע אותך" },
        { num: 2, title: "השאלה שאסור לשאול בדייט הראשון", desc: "השאלה שמרגישה לא מזיקה אבל סוגרת לאדם השני את הלב" },
        { num: 3, title: "טכניקת 'הגשר הרגשי'", desc: "איך עוברים משאלות סמול-טוק לחיבור אמיתי בלי שזה ירגיש מאולץ" },
        { num: 5, title: "מה לעשות עם שתיקה", desc: "השתיקה היא לא האויב — אם יודעים מה לעשות איתה" },
        { num: 6, title: "סיפורים אישיים — מתי ולמה", desc: "התזמון הנכון לחשוף משהו עליך, ומה לא לחשוף אף פעם" },
        { num: 8, title: "הטעות שכל גבר/אישה עושה ב-15 הדקות הראשונות", desc: "הניסיון להרשים — שדווקא יוצר את האפקט ההפוך" },
      ]}
      blurTeaser={{ num: 10, title: "השאלה שמשנה הכל...", desc: "השאלה האחת שאם תשאל אותה בזמן הנכון — הדייט הזה הופך למשהו אחר לגמרי" }}
      ctaText="קבל/י את כל 10 הכללים"
      formIntro="PDF מלא + רשימת נושאי שיחה. נשלח עכשיו."
    />
  );
}
