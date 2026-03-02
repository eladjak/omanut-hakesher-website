export type Gender = "male" | "female" | "neutral";

export interface GenderedText {
  neutral: string;
  male: string;
  female: string;
}

// Registry of all gendered strings, keyed by a stable ID
export const genderedContent: Record<string, GenderedText> = {
  // === CTAs ===
  "cta.ready": {
    neutral: "מוכנים להתחיל את המסע?",
    male: "מוכן להתחיל את המסע?",
    female: "מוכנה להתחיל את המסע?",
  },
  "cta.want-to-start": {
    neutral: "רוצים להתחיל?",
    male: "רוצה להתחיל?",
    female: "רוצה להתחיל?",
  },
  "cta.schedule": {
    neutral: "לקביעת פגישת היכרות",
    male: "לקביעת פגישת היכרות",
    female: "לקביעת פגישת היכרות",
  },
  "cta.contact": {
    neutral: "צרו קשר",
    male: "צור קשר",
    female: "צרי קשר",
  },
  "cta.free-call": {
    neutral: "לשיחת היכרות חינם",
    male: "לשיחת היכרות חינם",
    female: "לשיחת היכרות חינם",
  },

  // === Hero Section ===
  "hero.title-main": {
    neutral: "מצא/י את הזוגיות",
    male: "מצא את הזוגיות",
    female: "מצאי את הזוגיות",
  },
  "hero.pain-intro": {
    neutral: "בוא ננסה אחרת.",
    male: "בוא ננסה אחרת.",
    female: "בואי ננסה אחרת.",
  },

  // === Final CTA Section ===
  "final-cta.heading": {
    neutral: "מוכנים להתחיל את המסע?",
    male: "מוכן להתחיל את המסע?",
    female: "מוכנה להתחיל את המסע?",
  },
  "final-cta.body": {
    neutral:
      "פגישת היכרות ראשונה ללא התחייבות. בואו נכיר ונראה איך אפשר לעזור לכם לבנות את הקשר שאתם רוצים.",
    male: "פגישת היכרות ראשונה ללא התחייבות. בוא נכיר ונראה איך אפשר לעזור לך לבנות את הקשר שאתה רוצה.",
    female:
      "פגישת היכרות ראשונה ללא התחייבות. בואי נכיר ונראה איך אפשר לעזור לך לבנות את הקשר שאת רוצה.",
  },
  "final-cta.free-call": {
    neutral: "בוא נבדוק ביחד - שיחת היכרות חינם",
    male: "בוא נבדוק ביחד - שיחת היכרות חינם",
    female: "בואי נבדוק ביחד - שיחת היכרות חינם",
  },
  "final-cta.read-more": {
    neutral: "קרא עוד עליי",
    male: "קרא עוד עליי",
    female: "קראי עוד עליי",
  },

  // === About Page ===
  "about.know-us": {
    neutral: "הכירו אותנו",
    male: "הכר אותנו",
    female: "הכירי אותנו",
  },

  // === Services Page ===
  "services.what-we-offer": {
    neutral: "מה אנחנו מציעים",
    male: "מה אנחנו מציעים",
    female: "מה אנחנו מציעים",
  },
  "services.your-needs": {
    neutral: "מותאם אישית לצרכים שלכם",
    male: "מותאם אישית לצרכים שלך",
    female: "מותאם אישית לצרכים שלך",
  },

  // === Contact Form ===
  "contact.tell-us": {
    neutral: "ספרו לנו קצת",
    male: "ספר לנו קצת",
    female: "ספרי לנו קצת",
  },
  "contact.placeholder": {
    neutral: "מה הביא אתכם אלינו? איך נוכל לעזור?",
    male: "מה הביא אותך אלינו? איך נוכל לעזור?",
    female: "מה הביא אותך אלינו? איך נוכל לעזור?",
  },
  "contact.response": {
    neutral: "נחזור אליכם תוך 24 שעות",
    male: "נחזור אליך תוך 24 שעות",
    female: "נחזור אליך תוך 24 שעות",
  },
  "contact.success": {
    neutral: "נחזור אליכם בהקדם האפשרי",
    male: "נחזור אליך בהקדם האפשרי",
    female: "נחזור אליך בהקדם האפשרי",
  },

  // === Newsletter ===
  "newsletter.your-email": {
    neutral: "האימייל שלכם",
    male: "האימייל שלך",
    female: "האימייל שלך",
  },
  "newsletter.stay-updated": {
    neutral: "הישארו מעודכנים",
    male: "הישאר מעודכן",
    female: "הישארי מעודכנת",
  },
  "newsletter.signup-cta": {
    neutral:
      "הירשמו לניוזלטר וקבלו טיפים, מאמרים ותוכן בלעדי ישירות למייל",
    male: "הירשם לניוזלטר וקבל טיפים, מאמרים ותוכן בלעדי ישירות למייל",
    female:
      "הירשמי לניוזלטר וקבלי טיפים, מאמרים ותוכן בלעדי ישירות למייל",
  },
  "newsletter.want-free-tools": {
    neutral: "רוצה לקבל כלים בחינם?",
    male: "רוצה לקבל כלים בחינם?",
    female: "רוצה לקבל כלים בחינם?",
  },
  "newsletter.join-cta": {
    neutral:
      "הצטרף לרשימת התפוצה וקבל מדריכים, טיפים ותוכן בלעדי ישירות למייל.",
    male: "הצטרף לרשימת התפוצה וקבל מדריכים, טיפים ותוכן בלעדי ישירות למייל.",
    female:
      "הצטרפי לרשימת התפוצה וקבלי מדריכים, טיפים ותוכן בלעדי ישירות למייל.",
  },

  // === Testimonials ===
  "testimonials.what-they-say": {
    neutral: "מה אומרים עלינו",
    male: "מה אומרים עלינו",
    female: "מה אומרים עלינו",
  },

  // === Blog ===
  "blog.read-more": {
    neutral: "קראו עוד",
    male: "קרא עוד",
    female: "קראי עוד",
  },
  "blog.about-approach": {
    neutral: "קרא עוד על הגישה שלי",
    male: "קרא עוד על הגישה שלי",
    female: "קראי עוד על הגישה שלי",
  },

  // === Footer ===
  "footer.registered-success": {
    neutral: "נרשמתם בהצלחה!",
    male: "נרשמת בהצלחה!",
    female: "נרשמת בהצלחה!",
  },

  // === Homepage pain points ===
  "pain.feeling": {
    neutral: "מכיר/ה את התחושה הזאת?",
    male: "מכיר את התחושה הזאת?",
    female: "מכירה את התחושה הזאת?",
  },
  "pain.try-differently": {
    neutral: "אם מה שעשית עד עכשיו היה עובד - לא היית צריך/ה להיות כאן. בוא/י ננסה אחרת.",
    male: "אם מה שעשית עד עכשיו היה עובד - לא היית צריך להיות כאן. בוא ננסה אחרת.",
    female:
      "אם מה שעשית עד עכשיו היה עובד - לא היית צריכה להיות כאן. בואי ננסה אחרת.",
  },

  // === Products section ===
  "products.choose": {
    neutral: "כמה דרכים להתחיל - בחר/י את מה שמתאים לך.",
    male: "כמה דרכים להתחיל - בחר את מה שמתאים לך.",
    female: "כמה דרכים להתחיל - בחרי את מה שמתאים לך.",
  },
};

export function t(key: string, gender: Gender): string {
  const entry = genderedContent[key];
  if (!entry) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Missing gendered content key: ${key}`);
    }
    return key;
  }
  return entry[gender] ?? entry.neutral;
}
