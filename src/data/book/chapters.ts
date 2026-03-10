export interface ChapterTool {
  slug: string;
  title: string;
  description: string;
  type: "quiz" | "audio" | "video" | "pdf" | "interactive";
  icon: string; // emoji
  comingSoon?: boolean;
}

export interface ChapterData {
  slug: string; // "intro", "1", "2", ..., "13", "closing"
  number: number | null; // null for intro/closing
  title: string;
  subtitle: string;
  description: string;
  story?: string;
  tools: ChapterTool[];
  part: 1 | 2 | 3 | 4 | 5;
  partTitle: string;
}

export const chapters: ChapterData[] = [
  {
    slug: "intro",
    number: null,
    title: "פתח דבר",
    subtitle: "למה עוד ספר על זוגיות, ולמה דווקא זה",
    description:
      "ההקדמה שמסבירה למה הספר הזה שונה מכל מה שקראת, ואיך להפיק ממנו את המקסימום.",
    part: 1,
    partTitle: "מבפנים החוצה",
    tools: [
      {
        slug: "readiness-quiz",
        title: "שאלון מוכנות",
        description: "10 שאלות שיעזרו לך להבין איפה אתה עומד לפני שמתחילים",
        type: "quiz",
        icon: "📋",
      },
      {
        slug: "commitment",
        title: "חוזה מחויבות אישי",
        description: "מסמך התחייבות אישית לתהליך - להורדה",
        type: "pdf",
        icon: "📝",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "1",
    number: 1,
    title: "הסיפור שאתה מספר לעצמך",
    subtitle: "ודופק לך את הסיכוי",
    description:
      "כולנו נושאים סיפורים על עצמנו שמעצבים את הדרך שבה אנחנו ניגשים לזוגיות. הפרק הזה עוזר לזהות את הסיפורים האלה.",
    story: "נועם, 34 - שהיה משוכנע ש׳כל הטובות תפוסות׳",
    part: 1,
    partTitle: "מבפנים החוצה",
    tools: [
      {
        slug: "story-quiz",
        title: "מה הסיפור שלך?",
        description: "שאלון שעוזר לזהות את הנרטיב שאתה נושא על עצמך בזוגיות",
        type: "quiz",
        icon: "📖",
      },
      {
        slug: "four-a-day",
        title: "4 משפטים ביום",
        description: "תזכורות יומיות לאימון חשיבה חדשה",
        type: "interactive",
        icon: "💬",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "2",
    number: 2,
    title: "מלחמת האזרחים הפנימית שלך",
    subtitle: "כשהלב ושכל רבים",
    description:
      "14 הפחדים הנפוצים ביותר שעוצרים אותנו בדרך לזוגיות, ואיך לעבוד איתם במקום נגדם.",
    story: "ענבל, 29 - שגילתה שהפחד מדחייה שלט בכל בחירה שעשתה",
    part: 1,
    partTitle: "מבפנים החוצה",
    tools: [
      {
        slug: "fear-map",
        title: "מפת הפחדים שלך",
        description: "מפה את 14 הפחדים ותגלה אילו מהם שולטים בך",
        type: "quiz",
        icon: "🗺️",
      },
      {
        slug: "inner-dialogue",
        title: "מדיטציית דיאלוג פנימי",
        description: "תרגיל מודרך להקשבה לקולות הפנימיים",
        type: "audio",
        icon: "🎧",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "3",
    number: 3,
    title: "הרוח בכיסא השלישי",
    subtitle: "סליחה ושחרור",
    description:
      "איך להשתחרר מהעבר - מפרידות, מכאבים, מדפוסים - כדי לפנות מקום למשהו חדש.",
    story: "יואב, 38 - שגילה שהגירושין עדיין יושבים לו על הכתף",
    part: 1,
    partTitle: "מבפנים החוצה",
    tools: [
      {
        slug: "stop-rushing",
        title: "להפסיק לרוץ",
        description: "סרטון על איך מאטים ונותנים לתהליך לעבוד",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
      {
        slug: "release-letter",
        title: "מכתב שחרור",
        description: "תרגיל מודרך לכתיבת מכתב שחרור מהעבר",
        type: "audio",
        icon: "🎧",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "4",
    number: 4,
    title: "האומץ להיות אתה",
    subtitle: "וגם למצוא אהבה",
    description:
      "פגיעות היא לא חולשה - היא הכוח הכי גדול שלך בדרך לקשר אמיתי. איך מורידים את השריון.",
    story: "עידו, 36 - שהפסיק ללבוש את ׳חליפת השריון׳ שלו",
    part: 1,
    partTitle: "מבפנים החוצה",
    tools: [
      {
        slug: "body-scan",
        title: "סריקת גוף לפני דייט",
        description: "5 דקות של הרגעה והכנה לפני מפגש",
        type: "audio",
        icon: "🎧",
        comingSoon: true,
      },
      {
        slug: "boundary-talk",
        title: "שיחת גבולות",
        description: "הדגמה של שיחת גבולות בריאה",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "5",
    number: 5,
    title: "מי אתה באמת",
    subtitle: "ומה לעזאזל אתה מחפש?",
    description:
      "לפני שמחפשים מישהו - צריך לדעת מי אתה. סגנון ההתקשרות שלך, הצרכים שלך, מה באמת חשוב לך.",
    story: "דנה, 33 - שגילתה שהיא מחפשת את ההפך ממה שהיא צריכה",
    part: 2,
    partTitle: "מה אני מחפש",
    tools: [
      {
        slug: "attachment-quiz",
        title: "שאלון סגנון התקשרות",
        description: "20 שאלות לזיהוי סגנון ההתקשרות שלך - חרדתי, נמנע או בטוח",
        type: "quiz",
        icon: "🔗",
      },
      {
        slug: "who-am-i",
        title: "מדריך למשתמש - מי אני?",
        description:
          "12 שאלות שיוצרות את ה׳מדריך למשתמש׳ האישי שלך - להורדה כ-PDF",
        type: "quiz",
        icon: "📋",
      },
    ],
  },
  {
    slug: "6",
    number: 6,
    title: "תקשורת",
    subtitle: "או: למה הדייט הרגיש כמו ראיון עבודה?",
    description:
      "איך לדבר ככה שנשמעים. איך להקשיב ככה שהשני מרגיש שרואים אותו. שפת אינטימיות.",
    story: "שירה, 27 - שהייתה מגיעה לדייטים עם רשימת שאלות בראש",
    part: 2,
    partTitle: "מה אני מחפש",
    tools: [
      {
        slug: "emotion-wheel",
        title: "גלגל הרגשות",
        description: "כלי אינטראקטיבי לזיהוי ומיפוי רגשות",
        type: "interactive",
        icon: "🎡",
      },
      {
        slug: "active-listening",
        title: "הקשבה פעילה",
        description: "סרטון הדגמה של הקשבה שיוצרת חיבור",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "7",
    number: 7,
    title: "5 שניות. זה כל מה שיש לך",
    subtitle: "רושם ראשוני",
    description:
      "הרושם הראשוני נקבע בשניות. איך להיכנס לחדר, להתחיל שיחה, וליצור עניין - בלי לשחק תפקיד.",
    story: "רון, 30 - שהיה עם הפרופיל הכי יפה והתוצאות הכי גרועות",
    part: 3,
    partTitle: "יציאה לשטח",
    tools: [
      {
        slug: "body-language",
        title: "שפת גוף",
        description: "סרטון על שפת גוף שיוצרת משיכה ופתיחות",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
      {
        slug: "first-date-demo",
        title: "הדגמת דייט ראשון",
        description: "סרטון הדגמה של דייט ראשון טוב",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "8",
    number: 8,
    title: "אומץ ומשיכה",
    subtitle: "כשהפחד הופך לכוח",
    description:
      "למה אומץ הוא הדבר הכי מושך שיש, ואיך לגייס אותו - גם כשרועדים מבפנים.",
    part: 3,
    partTitle: "יציאה לשטח",
    tools: [
      {
        slug: "attraction-map",
        title: "מפת המשיכה",
        description: "שאלון 3 רמות לזיהוי מה באמת מושך אותך",
        type: "quiz",
        icon: "🧲",
        comingSoon: true,
      },
      {
        slug: "courage-tracker",
        title: "יומן אומץ יומי",
        description: "כלי מעקב יומי למעשי אומץ קטנים",
        type: "interactive",
        icon: "🦁",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "9",
    number: 9,
    title: "היכרויות אונליין",
    subtitle: "מעבר לפרופיל",
    description:
      "איך להציג את עצמך באמת באפליקציות - בלי לשחק תפקיד ובלי לאבד את עצמך.",
    part: 3,
    partTitle: "יציאה לשטח",
    tools: [
      {
        slug: "profile-photo",
        title: "מדריך תמונת פרופיל",
        description: "מדריך ויזואלי לתמונות שעובדות באפליקציות",
        type: "interactive",
        icon: "📸",
        comingSoon: true,
      },
      {
        slug: "date-report",
        title: "דו״ח דייט",
        description: "שאלון מהיר (5 שאלות) ומעמיק (7 שאלות) אחרי כל דייט",
        type: "quiz",
        icon: "📊",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "10",
    number: 10,
    title: "הדייט הכי טוב שתהיה בו",
    subtitle: "אומנות המפגש",
    description:
      "10 כללי הזהב לדייט מושלם. מה לעשות, מה לא, ואיך להפוך מפגש רגיל לבלתי נשכח.",
    story: "אורי ולירון - שלא הייתה כימיה מיידית, ובדיוק בגלל זה זה עבד",
    part: 4,
    partTitle: "אומנות הדייט",
    tools: [
      {
        slug: "golden-rules",
        title: "10 כללי הזהב",
        description: "פוסטר להורדה עם 10 כללי הזהב לדייט",
        type: "pdf",
        icon: "🏆",
        comingSoon: true,
      },
      {
        slug: "date-mastery",
        title: "אומנות הדייט",
        description: "סרטון מרכז על אומנות המפגש",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
      {
        slug: "pre-date-audio",
        title: "5 דקות לפני הדייט",
        description: "תרגיל הרגעה והכנה מנטלית",
        type: "audio",
        icon: "🎧",
        comingSoon: true,
      },
      {
        slug: "date-debrief-worksheet",
        title: "דיווח דייט",
        description: "7 שלבי הניתוח לאחר כל דייט, עם דוגמאות ושאלות מנחות",
        type: "pdf",
        icon: "📝",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "11",
    number: 11,
    title: "כימיה: האמת מאחורי ה״וואו״",
    subtitle: "כשהרגש מגיע אחרי",
    description:
      "למה כימיה מיידית היא לא סימן טוב, ואיך לזהות חיבור אמיתי שנבנה לאט.",
    part: 4,
    partTitle: "אומנות הדייט",
    tools: [
      {
        slug: "connection-score",
        title: "ציון חיבור",
        description: "שאלון 4 צירים למדידת עומק החיבור",
        type: "quiz",
        icon: "💯",
        comingSoon: true,
      },
      {
        slug: "chemistry-quiz",
        title: "שאלון כימיה",
        description: "15 שאלות לזיהוי סוג הכימיה שלך",
        type: "quiz",
        icon: "⚗️",
        comingSoon: true,
      },
      {
        slug: "real-chemistry",
        title: "כימיה אמיתית",
        description: "סרטון על ההבדל בין כימיה לחיבור",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
      {
        slug: "chance-calculator",
        title: "רמזור הסיכויים",
        description: "כלי החלטה אינטראקטיבי - ירוק, צהוב או אדום",
        type: "interactive",
        icon: "🚦",
        comingSoon: true,
      },
      {
        slug: "butterflies-audio",
        title: "פרפרים או חרדה?",
        description: "תרגיל גוף ונשימה של 8 דקות להבחנה בין ריגוש לפחד",
        type: "audio",
        icon: "🎧",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "12",
    number: 12,
    title: "משחק המחבואים של הלב",
    subtitle: "פגיעות ואינטימיות",
    description:
      "ברגע שיש חיבור - מגיע הפחד. איך לעבור את שלב הפגיעות ולבנות אינטימיות אמיתית.",
    part: 4,
    partTitle: "אומנות הדייט",
    tools: [
      {
        slug: "vulnerability-stage",
        title: "באיזה שלב אני?",
        description: "שאלון לזיהוי שלב הפגיעות שלך בקשר",
        type: "quiz",
        icon: "🏊",
        comingSoon: true,
      },
      {
        slug: "36-questions",
        title: "36 השאלות",
        description: "קלפי שאלות דיגיטליים ליצירת קרבה",
        type: "interactive",
        icon: "🃏",
        comingSoon: true,
      },
      {
        slug: "vulnerability-art",
        title: "אומנות הפגיעות",
        description: "סרטון 18 דקות - הבדל בין פגיעות בריאה לחשיפת יתר",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
      {
        slug: "vulnerable-sentence-audio",
        title: "המשפט הפגיע של הערב",
        description: "הקלטה של 6 דקות להכנה לפני מפגש - נשימה, כוונה, בחירת משפט",
        type: "audio",
        icon: "🎧",
        comingSoon: true,
      },
      {
        slug: "vulnerability-ladder",
        title: "סולם הפגיעות שלי",
        description: "דף עבודה עם 4 שלבי הכניסה לבריכה, דוגמאות ותרגול",
        type: "pdf",
        icon: "📄",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "13",
    number: 13,
    title: "הבחירה הכי מפחידה (והכי חשובה) בחיים",
    subtitle: "מחויבות",
    description:
      "הרגע שבו צריך להחליט. איך לדעת שזה ״זה״, ואיך להתמודד עם הפחד מהתחייבות.",
    story: "תמר ואיתי - שכמעט פרשו כי ׳הכל היה מושלם מדי׳",
    part: 5,
    partTitle: "לבנות משהו אמיתי",
    tools: [
      {
        slug: "fear-map",
        title: "מפת פחדי מחויבות",
        description: "5 הפחדים הגדולים מהתחייבות - ואיך להתמודד",
        type: "quiz",
        icon: "🗺️",
        comingSoon: true,
      },
      {
        slug: "readiness-quiz",
        title: "שאלון מוכנות למחויבות",
        description: "7 + 13 שאלות לבדיקת מוכנות להתחייבות",
        type: "quiz",
        icon: "💍",
        comingSoon: true,
      },
      {
        slug: "the-choice",
        title: "הבחירה",
        description: "סרטון על רגע ההחלטה",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
      {
        slug: "future-meditation",
        title: "שיחה עם העתיד",
        description: "מדיטציה מודרכת של 10 דקות - לדמיין את 2 הגרסאות של עצמך בעוד 20 שנה",
        type: "audio",
        icon: "🎧",
        comingSoon: true,
      },
    ],
  },
  {
    slug: "closing",
    number: null,
    title: "חוקי הזוגיות",
    subtitle: "הדרך ממשיכה",
    description:
      "10 עקרונות GPS לזוגיות ארוכת טווח. סיכום כל מה שלמדנו, ומכתב לעתיד.",
    part: 5,
    partTitle: "לבנות משהו אמיתי",
    tools: [
      {
        slug: "gps-poster",
        title: "פוסטר 10 עקרונות GPS",
        description: "פוסטר להורדה עם 10 העקרונות לזוגיות",
        type: "pdf",
        icon: "🧭",
        comingSoon: true,
      },
      {
        slug: "future-letter",
        title: "מכתב לעצמי בעתיד",
        description: "כתוב מכתב לעצמך - יישלח אליך בעוד שנה",
        type: "interactive",
        icon: "✉️",
      },
      {
        slug: "readiness-retest",
        title: "שאלון מוכנות - אחרי",
        description: "אותן 10 שאלות מההתחלה - עכשיו השווה את ההתקדמות שלך",
        type: "quiz",
        icon: "📊",
      },
      {
        slug: "first-step",
        title: "הצעד הראשון",
        description: "סרטון סיכום והשראה לדרך",
        type: "video",
        icon: "🎬",
        comingSoon: true,
      },
    ],
  },
];

export const parts = [
  { number: 1, title: "מבפנים החוצה", subtitle: "הכר את עצמך" },
  { number: 2, title: "מה אני מחפש", subtitle: "הכלים שלך" },
  { number: 3, title: "יציאה לשטח", subtitle: "בשטח" },
  { number: 4, title: "אומנות הדייט", subtitle: "המפגש" },
  { number: 5, title: "לבנות משהו אמיתי", subtitle: "הבחירה" },
];

export function getChapterBySlug(slug: string): ChapterData | undefined {
  return chapters.find((c) => c.slug === slug);
}

export function getAdjacentChapters(slug: string) {
  const index = chapters.findIndex((c) => c.slug === slug);
  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}

export function getChapterDisplayNumber(chapter: ChapterData): string {
  if (chapter.slug === "intro") return "הקדמה";
  if (chapter.slug === "closing") return "סיום";
  return `פרק ${chapter.number}`;
}
