import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AttachmentQuizClient } from "@/components/book/quizzes/AttachmentQuizClient";

export const metadata: Metadata = {
  title: "שאלון סגנון התקשרות | פרק 5 - אומנות הקשר",
  description:
    "20 שאלות לזיהוי סגנון ההתקשרות שלך — חרדתי, נמנע, חרדתי-נמנע, או בטוח. מבוסס על תיאוריית ההתקשרות של בולבי, חזאן ושייבר.",
  alternates: {
    canonical: "/book/5/attachment-quiz",
  },
  openGraph: {
    title: "שאלון סגנון התקשרות | פרק 5 - אומנות הקשר",
    description:
      "גלה את סגנון ההתקשרות שלך ב-20 שאלות — הצעד הראשון להבנת הדפוסים שמשפיעים על הזוגיות שלך.",
    url: "/book/5/attachment-quiz",
    locale: "he_IL",
    type: "website",
  },
};

export default function AttachmentQuizPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "הספר", href: "/book" },
            { label: "פרק 5", href: "/book/5" },
            { label: "שאלון סגנון התקשרות" },
          ]}
        />
      </div>

      <AttachmentQuizClient />
    </>
  );
}
