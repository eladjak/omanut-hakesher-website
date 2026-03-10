// who-am-i.ts
// "מדריך למשתמש - מי אני?" — profile generator quiz for Chapter 5
// This quiz is special: it mixes free-text and multiple-choice questions.
// It does NOT produce a score — it produces a structured UserManual profile.

export type WhoAmIQuestionType = "text" | "multiple-choice";

export interface WhoAmIOption {
  value: string;
  label: string;
  description?: string;
}

export interface WhoAmIQuestion {
  id: string;
  text: string;
  subtitle?: string;
  type: WhoAmIQuestionType;
  placeholder?: string;
  options?: WhoAmIOption[];
}

export interface UserManualProfile {
  identity: {
    selfWords: string;
    friendWords: string;
    bestCompliment: string;
  };
  needs: {
    loveLanguageReceive: string;
    loveLanguageGive: string;
    deepestNeed: string;
  };
  operatingSystem: {
    attachmentStyle: string;
    attachmentStyleLabel: string;
  };
  fears: {
    biggestFear: string;
    loveStory: string;
  };
  patterns: {
    recurringComplaint: string;
    defaultReaction: string;
    childhoodPattern: string;
  };
  direction: {
    idealFeeling: string;
  };
}

export const LOVE_LANGUAGES: WhoAmIOption[] = [
  {
    value: "words",
    label: "מילות אישור",
    description: "מחמאות, הכרה מילולית, עידוד",
  },
  {
    value: "time",
    label: "זמן איכות",
    description: "נוכחות מלאה, קשב, פעילויות משותפות",
  },
  {
    value: "gifts",
    label: "מתנות",
    description: "מחוות, הפתעות, סמלים של אהבה",
  },
  {
    value: "service",
    label: "מעשי שירות",
    description: "עזרה מעשית, הקלה על העומס, מחוות של דאגה",
  },
  {
    value: "touch",
    label: "מגע פיזי",
    description: "חיבוקים, נגיעה, קרבה גופנית",
  },
];

export const ATTACHMENT_STYLES: WhoAmIOption[] = [
  {
    value: "secure",
    label: "בטוחה",
    description:
      "מרגיש בנוח עם קרבה ועם עצמאות. נותן אמון ולא מפחד מפגיעות.",
  },
  {
    value: "anxious",
    label: "חרדתית",
    description:
      "משתוקק לקרבה אבל מפחד שיעזבו אותו. מחפש הרבה אישורים.",
  },
  {
    value: "avoidant",
    label: "נמנעת",
    description:
      "מעדיף עצמאות ומרחק רגשי. קשה לו להיפתח ולבקש עזרה.",
  },
  {
    value: "fearful",
    label: "מעורבת (חרדתית-נמנעת)",
    description:
      "רוצה קרבה אבל גם מפחד ממנה. מתנדנד בין התקרבות להתרחקות.",
  },
];

export const RELATIONSHIP_FEARS: WhoAmIOption[] = [
  { value: "rejection", label: "דחייה — שלא יאהבו אותי מספיק" },
  { value: "abandonment", label: "נטישה — שיעזבו אותי" },
  { value: "engulfment", label: "בלעות — שאאבד את עצמי בתוך הזוגיות" },
  { value: "vulnerability", label: "פגיעות — שיראו את החלשות שלי" },
  { value: "betrayal", label: "בגידה — שיפגעו בי ויאכזבו אותי" },
  { value: "failure", label: "כישלון — שוב אכשל בזוגיות" },
];

export const DEFAULT_REACTIONS: WhoAmIOption[] = [
  { value: "withdraw", label: "מתכנס לתוך עצמי ומשתתק" },
  { value: "attack", label: "מתפרץ ומביע את הכאב בצורה חזקה" },
  { value: "appease", label: "מתרצה ומנסה לפייס מהר" },
  { value: "rationalize", label: "מנתח אינטלקטואלית ומרחיק את הרגש" },
  { value: "humor", label: "מבדח ומנסה להקל על המתח" },
  { value: "flee", label: "בורח — פיזית או רגשית" },
];

// ── Questions ──────────────────────────────────────────────────────────────

export const whoAmIQuestions: WhoAmIQuestion[] = [
  // Q1 — Self words
  {
    id: "q1_self_words",
    text: "באילו חמש מילים היית מתאר את עצמך?",
    subtitle: "מילים שמגיעות מהבטן, לא מה שכדאי לומר",
    type: "text",
    placeholder: "לדוגמה: יצירתי, רגיש, אמביציוזי, הומוריסט, נאמן",
  },

  // Q2 — Friends' words
  {
    id: "q2_friend_words",
    text: "באילו חמש מילים החברים הכי טובים שלך היו מתארים אותך?",
    subtitle: "מה הם אומרים עליך כשאתה לא בחדר?",
    type: "text",
    placeholder: "לדוגמה: אמין, מצחיק, עמוק, מתחשב, חם",
  },

  // Q3 — Best compliment
  {
    id: "q3_best_compliment",
    text: "מהי המחמאה הכי טובה שמישהו יכול לתת לך, שלא קשורה למראה חיצוני?",
    subtitle: "מה נוגע לך לעומק — מה שאתה באמת רוצה שיראו בך",
    type: "text",
    placeholder: "לדוגמה: שאתה האדם הכי אמין שהם מכירים",
  },

  // Q4a — Love language: receive
  {
    id: "q4a_love_receive",
    text: "באיזו שפת אהבה אתה הכי צריך לקבל אהבה?",
    subtitle: "מה גורם לך להרגיש אהוב ומוערך",
    type: "multiple-choice",
    options: LOVE_LANGUAGES,
  },

  // Q4b — Love language: give
  {
    id: "q4b_love_give",
    text: "באיזו שפת אהבה הכי טבעי לך לתת אהבה?",
    subtitle: "איך אתה מביע אהבה באופן ספונטני",
    type: "multiple-choice",
    options: LOVE_LANGUAGES,
  },

  // Q5 — Attachment style
  {
    id: "q5_attachment",
    text: "איזו מ-4 מערכות ההפעלה מתארת אותך הכי טוב?",
    subtitle: "אין תשובה נכונה או שגויה — רק תשובה כנה",
    type: "multiple-choice",
    options: ATTACHMENT_STYLES,
  },

  // Q6 — Biggest fear
  {
    id: "q6_fear",
    text: "מה הפחד הכי גדול שלך בזוגיות?",
    subtitle: "הדבר שמחזיק אותך עצמאי גם כשלא תכננת",
    type: "multiple-choice",
    options: RELATIONSHIP_FEARS,
  },

  // Q7 — Recurring complaint
  {
    id: "q7_complaint",
    text: "מהי התלונה שהכי חזרה על עצמה כלפיך בקשרים קודמים?",
    subtitle: "גם אם לא הסכמת איתה — מה אמרו שוב ושוב?",
    type: "text",
    placeholder: "לדוגמה: שאתה לא זמין רגשית, שאתה דומיננטי מדי, שאתה לא מבטא...",
  },

  // Q8 — Default reaction when hurt
  {
    id: "q8_reaction",
    text: "כשאתה מרגיש פגוע, מהי תגובת ברירת המחדל שלך?",
    subtitle: "התגובה האוטומטית, לפני שאתה חושב",
    type: "multiple-choice",
    options: DEFAULT_REACTIONS,
  },

  // Q9 — Childhood love pattern
  {
    id: "q9_childhood",
    text: "איך הראו אהבה בבית שגדלת בו? האם אתה משחזר את הדפוס הזה או בורח ממנו?",
    subtitle: "קצר זה בסדר — גם שורה אחת מספיקה",
    type: "text",
    placeholder: "לדוגמה: אצלנו לא דיברו על רגשות. אני בורח מהדפוס הזה ומנסה לדבר יותר",
  },

  // Q10 — Deepest emotional need
  {
    id: "q10_need",
    text: "מהו הצורך הרגשי הכי עמוק שלך?",
    subtitle: "הדבר שאם היה לך בזוגיות — הכל היה שונה",
    type: "text",
    placeholder: "לדוגמה: להרגיש מקובל כמו שאני, להרגיש שאני מספיק, להרגיש בטוח...",
  },

  // Q11 — Story about love
  {
    id: "q11_story",
    text: "מהו ה׳סיפור׳ שאתה מספר לעצמך על אהבה?",
    subtitle: "האמונה הסמויה שמנחה את הבחירות שלך",
    type: "text",
    placeholder: "לדוגמה: שאהבה כואבת, שאני לא מספיק, שמי שאני אוהב עוזב בסוף...",
  },

  // Q12 — Ideal feeling
  {
    id: "q12_ideal",
    text: "אם היית בזוגיות הכי טובה שאתה יכול לדמיין, איך היית מרגיש?",
    subtitle: "לא מה הזוגיות הייתה נראית — מה היית מרגיש בפנים",
    type: "text",
    placeholder: "לדוגמה: רגוע, מובן, חופשי להיות עצמי, אהוב ללא תנאי...",
  },
];

// ── Label helpers ──────────────────────────────────────────────────────────

function getLoveLanguageLabel(value: string): string {
  return LOVE_LANGUAGES.find((o) => o.value === value)?.label ?? value;
}

function getAttachmentLabel(value: string): string {
  return ATTACHMENT_STYLES.find((o) => o.value === value)?.label ?? value;
}

function getFearLabel(value: string): string {
  return RELATIONSHIP_FEARS.find((o) => o.value === value)?.label ?? value;
}

function getReactionLabel(value: string): string {
  return DEFAULT_REACTIONS.find((o) => o.value === value)?.label ?? value;
}

// ── generateUserManual ─────────────────────────────────────────────────────

export function generateUserManual(
  answers: Record<string, string>,
): UserManualProfile {
  const attachmentValue = answers.q5_attachment ?? "";
  const attachmentStyle = ATTACHMENT_STYLES.find(
    (s) => s.value === attachmentValue,
  );

  return {
    identity: {
      selfWords: answers.q1_self_words ?? "",
      friendWords: answers.q2_friend_words ?? "",
      bestCompliment: answers.q3_best_compliment ?? "",
    },
    needs: {
      loveLanguageReceive: getLoveLanguageLabel(answers.q4a_love_receive ?? ""),
      loveLanguageGive: getLoveLanguageLabel(answers.q4b_love_give ?? ""),
      deepestNeed: answers.q10_need ?? "",
    },
    operatingSystem: {
      attachmentStyle: attachmentValue,
      attachmentStyleLabel: attachmentStyle?.label ?? attachmentValue,
    },
    fears: {
      biggestFear: getFearLabel(answers.q6_fear ?? ""),
      loveStory: answers.q11_story ?? "",
    },
    patterns: {
      recurringComplaint: answers.q7_complaint ?? "",
      defaultReaction: getReactionLabel(answers.q8_reaction ?? ""),
      childhoodPattern: answers.q9_childhood ?? "",
    },
    direction: {
      idealFeeling: answers.q12_ideal ?? "",
    },
  };
}
