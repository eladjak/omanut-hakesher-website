import type { Metadata } from "next";
import { LeadMagnetTemplate } from "@/components/lead/LeadMagnetTemplate";

export const metadata: Metadata = {
  title: "8 דרכים לחיים של אומץ — מדריך חינמי",
  description:
    "המדריך החינמי של אלעד יעקובוביץ׳: 8 דרכים לפתח אומץ אמיתי, להתמודד עם ביקורת, ולצאת מהפחד שעוצר אותך לפני שהתחלת. PDF במייל מיד.",
  alternates: { canonical: "/lead/courage" },
  openGraph: {
    title: "8 דרכים לחיים של אומץ | אומנות הקשר",
    description: "מדריך חינמי לפיתוח אומץ אמיתי לדייטים, ליחסים ולחיים.",
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
      heroTitle={<>8 דרכים לחיים של <span className="text-accent-light">אומץ</span></>}
      heroSubtitle="הכלים המעשיים לפתח חוסן מנטלי, להפסיק לחשוב יותר מדי, ולעשות צעדים שעוצרים אותך כבר שנים."
      heroImage="/images/generated/blog-confidence.jpg"
      heroImageAlt="8 דרכים לחיים של אומץ"
      benefits={[
        { text: "6 הרגלים יומיים שמאמנים את שריר האומץ" },
        { text: "הטכניקה להתמודד עם ביקורת חיצונית ופנימית" },
        { text: "תרגיל 5 דקות לפני כל דייט שמוריד 80% מהחרדה" },
      ]}
      teaserBadge="הצצה פנימה"
      teaserTitle="כמה מהדרכים שתגלה במדריך"
      teaserSubtitle="(ועוד דרכים נוספות ממתינות בפנים)"
      teasers={[
        { num: 1, title: "הקול הפנימי שמשתק אותך", desc: "המקור שלו, איך לזהות אותו בזמן אמת, ואיך להמשיך הלאה" },
        { num: 2, title: "ההרגל היומי של אנשים אמיצים", desc: "5 דקות בבוקר ששינוי גישה לכל היום" },
        { num: 3, title: "החוק של ה-3 שניות", desc: "המדע מאחורי הרגע הזה ואיך להשתמש בו לטובתך" },
        { num: 5, title: "להפסיק לבקש אישור מאחרים", desc: "איך מבינים שהפנימיתם את הביקורת — ואיך משחררים" },
        { num: 6, title: "האומץ של 'לא יודע'", desc: "למה החזק ביותר הוא דווקא מי שמודה במגבלות" },
        { num: 7, title: "התרגיל שכל לקוח שלי עושה לפני דייט ראשון", desc: "60 שניות שמשנות איך אתה נכנס לחדר" },
      ]}
      blurTeaser={{ num: 8, title: "השיטה המלאה...", desc: "הדרך השמינית — זו שמחברת את כל השאר ועושה אותך לבן אדם שאת/ה תהיה גאה להיות" }}
      ctaText="קבל/י את כל 8 הדרכים"
      formIntro="ממש כאן, ממש עכשיו. בלי תשלום, בלי התחייבות."
    />
  );
}
