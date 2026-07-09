import type { Metadata } from "next";
import { LeadMagnetTemplate } from "@/components/lead/LeadMagnetTemplate";

export const metadata: Metadata = {
  title: "איך לכתוב חזון אישי לזוגיות — מדריך חינמי",
  description:
    "המדריך החינמי לכתיבת חזון אישי שמכוון אותך לזוגיות הנכונה. 8 תחומי חיים, תרגילים מעשיים, ותכנית עבודה צעד-צעד מאלעד יעקובוביץ׳.",
  alternates: { canonical: "/lead/vision" },
  openGraph: {
    title: "חזון אישי לזוגיות | אומנות הקשר",
    description: "מדריך חינמי לכתיבת חזון אישי שמכוון לזוגיות הנכונה.",
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
      heroSubtitle="התרגיל שהופך 'אני רוצה זוגיות' למפת דרכים — 8 תחומי חיים, תרגילים פרקטיים, ותכנית עבודה מעשית."
      heroImage="/images/generated/blog-readiness.jpg"
      heroImageAlt="כתיבת חזון אישי לזוגיות"
      benefits={[
        { text: "מבנה ברור ל-8 תחומי חיים שצריך לשרטט מחדש" },
        { text: "התרגיל ש'בונה את האדם של מחר' לפני שמחפש את בן/בת הזוג" },
        { text: "תכנית עבודה שבועית להפוך חזון לפעולה" },
      ]}
      teaserBadge="הצצה פנימה"
      teaserTitle="מה תגלה במדריך"
      teaserSubtitle="(תוכן מלא — תרגילים, דוגמאות, ותכנית עבודה)"
      teasers={[
        { num: 1, title: "8 תחומי חיים לשרטט מחדש", desc: "מקריירה דרך בריאות עד יחסים — איפה כדאי להתחיל" },
        { num: 2, title: "תרגיל 'מכתב מעצמך בעוד 5 שנים'", desc: "התרגיל שמשנה את האופן שאת/ה רואה את עצמך עכשיו" },
        { num: 3, title: "מה זה חזון 'חי' vs חזון 'שכבה על הקיר'", desc: "ולמה רוב האנשים נכשלים כי החזון שלהם דקורטיבי" },
        { num: 4, title: "הקשר בין החזון לבחירת בן/בת זוג", desc: "איך החזון מסנן 80% מהדייטים הלא נכונים מראש" },
        { num: 5, title: "התרגיל 'הסרט של החיים שלי'", desc: "5 דקות שמסדרות סדרי עדיפויות לכל השנה" },
        { num: 6, title: "תכנית עבודה שבועית", desc: "איך הופכים חזון מ-PDF לפעולה ביומן השבוע" },
      ]}
      blurTeaser={{ num: 7, title: "החזון המשולב...", desc: "השלב שמחבר את 8 התחומים לתמונה אחת קוהרנטית — וזה הרגע שבו הכל מתחיל לזוז" }}
      ctaText="קבל/י את המדריך המלא"
      formIntro="PDF + תרגילים. נשלח מיד לתיבת המייל."
    />
  );
}
