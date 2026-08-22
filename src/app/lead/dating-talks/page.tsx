import type { Metadata } from "next";
import { LeadMagnetTemplate } from "@/components/lead/LeadMagnetTemplate";

export const metadata: Metadata = {
  title: "10 עקרונות לשיחה טובה בדייט — מדריך חינמי",
  description:
    "מדריך חינמי לשיחה הדדית בדייט: שאלות פתוחות, הקשבה, שיתוף, שתיקה וגבולות — עם הצעות שאפשר להתאים לסגנון שלך.",
  alternates: { canonical: "/lead/dating-talks" },
  openGraph: {
    title: "10 עקרונות לשיחה טובה בדייט | אומנות הקשר",
    description: "מדריך חינמי לשיחה הדדית, סקרנית ולא מאולצת בדייט.",
    url: "/lead/dating-talks",
    locale: "he_IL",
    type: "website",
  },
};

export default function DatingTalksPage() {
  return (
    <LeadMagnetTemplate
      slug="dating-talks"
      breadcrumbLabel="10 עקרונות לשיחה בדייט"
      heroBadge="מדריך חינמי"
      heroTitle={<>10 עקרונות לשיחה <span className="text-accent-light">הדדית בדייט</span></>}
      heroSubtitle="פחות לנסות להרשים, יותר לשים לב לסקרנות, לקצב ולמרחב שנוח לשני הצדדים."
      heroImage="/images/generated/blog-communication.jpg"
      heroImageAlt="שיחה הדדית ונינוחה בדייט"
      benefits={[
        { text: "עקרונות לאיזון בין שאלה, הקשבה ושיתוף אישי" },
        { text: "רעיונות למעבר מסמול־טוק לשיחה אישית בלי ללחוץ" },
        { text: "דרך לסכם דייט לפי תחושה, סקרנות והדדיות — לא לפי ביצוע מושלם" },
      ]}
      teaserBadge="הצצה פנימה"
      teaserTitle="כמה מהעקרונות שבמדריך"
      teaserSubtitle="אפשר לבחור אחד מהם לדייט הבא; אין צורך לזכור רשימה שלמה תוך כדי שיחה"
      teasers={[
        { num: 1, title: "לשים לב לאיזון", desc: "לא למדוד אחוזים — לבדוק אם לשני הצדדים יש מקום לדבר ולשאול" },
        { num: 2, title: "להעדיף סקרנות על חקירה", desc: "שאלה פתוחה אחת, ואז הקשבה לתשובה במקום רצף שאלות" },
        { num: 3, title: "לבנות גשר", desc: "להתחיל מעובדה קלה ולהעמיק רק אם הצד השני משתף פעולה" },
        { num: 5, title: "לתת מקום לשתיקה", desc: "לא כל רגע שקט דורש הצלה; אפשר לנשום ולבחור איך להמשיך" },
        { num: 6, title: "לשתף בהדרגה", desc: "להציע משהו אישי במידה שמתאימה לשלב ולראות אם יש הדדיות" },
        { num: 8, title: "להישאר בקשר עם עצמנו", desc: "לבדוק גם איך אנחנו מרגישים — ולא רק אם מצאנו חן" },
      ]}
      contextNote={{
        title: "אין שאלה קסומה",
        text: "שיחה טובה תלויה בהקשבה, בהדדיות ובקצב שמתאים לשני הצדדים. כל שאלה היא הזמנה בלבד, ותמיד אפשר לדלג או לשנות נושא.",
      }}
      practicePrompt={{
        title: "שאלה אחת, שתי תשובות",
        desc: "בחרו שאלה פתוחה אחת. אחרי התשובה, שתפו גם משהו קטן משלכם במקום לעבור מיד לשאלה הבאה.",
        questions: ["מה היה רגע קטן וטוב בשבוע שלך?", "מה מסקרן אותך בתקופה הזאת?"],
      }}
      ctaText="לפתיחת 10 העקרונות"
      formIntro="ה־PDF המלא ורעיונות התרגול זמינים לקריאה ישירה."
    />
  );
}
