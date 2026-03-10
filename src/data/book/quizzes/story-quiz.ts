import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

// ── Result ranges ────────────────────────────────────────────────────────────
// This quiz uses 3 axes: self, others, relationship
// interpretResult finds which axis has the highest score and returns its result
// We encode results using the min/max fields as axis-index markers (0, 1, 2)

const resultRanges: QuizResultRange[] = [
  {
    // index 0 — סיפורים על עצמי (self)
    min: 0,
    max: 0,
    title: "הסיפור הוא עליך",
    emoji: "🪞",
    description:
      "הנרטיב הדומיננטי שלך מתמקד בך — ב׳אני לא מספיק טוב/ה׳, ב׳אני תמיד יוצא/ת אינטנסיבי/ת מדי׳, או ב׳משהו אצלי גורם לדברים להתפרק׳. הסיפור הזה הוא שכיח מאוד, ומגן עליך מפגיעה. אבל הוא גם מחזיק אותך במקום.",
    recommendation:
      "השלב הראשון הוא לזהות מתי הסיפור הזה עולה ולשאול: ״האם זה עובדה, או פרשנות?״ בפרק 1 יש תרגיל שיעזור לך לאתגר את הנרטיב בצורה עדינה ומעשית.",
  },
  {
    // index 1 — סיפורים על הצד השני (others)
    min: 1,
    max: 1,
    title: "הסיפור הוא על ה׳אחר׳",
    emoji: "👥",
    description:
      "הנרטיב הדומיננטי שלך נוגע לצד השני — ״גברים/נשים בגיל שלי כבר לא...״, ״כולם רק רוצים...״, ״לא נשאר מישהו שמחפש קשר רציני.״ הסיפור הזה מגן עליך מאכזבה, אבל הוא גם סוגר דלתות לפני שבכלל הספקת לפתוח אותן.",
    recommendation:
      "נסה להבחין בין נתוני עובדה לבין הסיפור שאתה בונה מהם. פרק 1 מציג כלי פשוט לבדיקת הסיפורים האלה — ״מה אני יודע בוודאות, ומה אני מוסיף?״",
  },
  {
    // index 2 — סיפורים על זוגיות (relationship)
    min: 2,
    max: 2,
    title: "הסיפור הוא על זוגיות בכלל",
    emoji: "💔",
    description:
      "הנרטיב הדומיננטי שלך נוגע למוסד הזוגיות עצמו — ״בסוף כל קשר נגמר״, ״אין דבר כזה אהבה אמיתית״, ״זוגיות זה רק פשרות וכאב.״ לרוב, סיפור כזה צמח מחוויות ספציפיות שהפכו לאמת כללית.",
    recommendation:
      "הסיפור הזה נבנה מניסיון — ולכן הוא מרגיש ממש אמיתי. פרק 3 (׳הרוח בכיסא השלישי׳) עוסק ספציפית בשחרור מדפוסי עבר כדי שיהיה מקום למשהו חדש.",
  },
];

// ── Quiz config ──────────────────────────────────────────────────────────────

export const storyQuizConfig: QuizConfig = {
  id: "story-quiz",
  title: "מה הסיפור שלך?",
  subtitle: "10 שאלות לזיהוי הנרטיב שמשפיע על הזוגיות שלך",
  description:
    "אנחנו כולנו נושאים סיפורים על הזוגיות שלנו — חלקם על עצמנו, חלקם על הצד השני, וחלקם על קשרים בכלל. הסיפור הדומיננטי שלך משפיע יותר ממה שאתה מדמיין. 10 שאלות, ענה בכנות.",
  icon: "📖",

  questions: [
    {
      id: "sq1",
      text: "כשדייט לא יוצא כמו שציפית, המחשבה הראשונה שלך היא:",
      type: "multiple-choice",
      axis: "self",
      options: [
        { value: "self", label: "בטח עשיתי משהו לא בסדר" },
        { value: "others", label: "הוא/היא פשוט לא בשל/ה לקשר" },
        { value: "relationship", label: "זה תמיד ככה, דייטים אף פעם לא מובילים לשום מקום" },
        { value: "neutral", label: "זה פשוט לא הלך — הבא" },
      ],
    },
    {
      id: "sq2",
      text: "כשאתה חושב על הגיל שלך ועל הסטטוס שלך כרגע, מה עולה לך?",
      type: "multiple-choice",
      axis: "self",
      options: [
        { value: "self", label: "אולי יש בי משהו שדוחף אנשים הרחק" },
        { value: "others", label: "בגיל שלי, הגרסאות הטובות כבר תפוסות" },
        { value: "relationship", label: "זוגיות ארוכת טווח היא מיתוס ממילא" },
        { value: "neutral", label: "אני במקום טוב, פשוט עדיין לא מצאתי את המתאים/ה" },
      ],
    },
    {
      id: "sq3",
      text: "חבר/ה מספרים שפגשו מישהו נהדר. מה עובר לך בראש?",
      type: "multiple-choice",
      axis: "others",
      options: [
        { value: "self", label: "למה לא לי? אולי אני מפחיד/ה אנשים" },
        { value: "others", label: "בטוח שיצא שזה לא מה שזה נראה" },
        { value: "relationship", label: "שמח/ה להם, אבל שלבסוף זה גם ייגמר" },
        { value: "neutral", label: "כיף להם! אני מקווה שלי יהיה משהו כזה גם" },
      ],
    },
    {
      id: "sq4",
      text: "מישהו מאוד מתאים לך מחפש קשר רציני — אבל הוא/היא חי/ה בעיר אחרת. אתה חושב:",
      type: "multiple-choice",
      axis: "relationship",
      options: [
        { value: "self", label: "כשיראה כמה אני מסובך/ת, הוא/היא יעוף/תעוף ממילא" },
        { value: "others", label: "אף אחד לא באמת מוכן לעשות מאמץ לקשר" },
        { value: "relationship", label: "מרחק לא עובד. קשרים לא שורדים מרחק" },
        { value: "neutral", label: "מרחק זה אתגר, אבל אפשר לנסות ולראות" },
      ],
    },
    {
      id: "sq5",
      text: "איזה משפט הכי מזדהה איתו?",
      type: "multiple-choice",
      axis: "self",
      options: [
        { value: "self", label: "אני יודע/ת שאני קצת יותר מסובך/ת מרוב האנשים" },
        { value: "others", label: "אנשים בגיל שלי כבר עמוסים בבגג׳ — לא שווה" },
        { value: "relationship", label: "אהבה אמיתית זה כמו חד-קרן — לא ממש קיים" },
        { value: "neutral", label: "אני מאמין/ה שיש מישהו שמתאים לי" },
      ],
    },
    {
      id: "sq6",
      text: "היה לך קשר שנגמר בצורה כואבת. מה אתה אומר לעצמך עכשיו?",
      type: "multiple-choice",
      axis: "relationship",
      options: [
        { value: "self", label: "בטח עשיתי משהו שגרם לזה להתפרק" },
        { value: "others", label: "הצד השני לא היה מוכן לקשר אמיתי" },
        { value: "relationship", label: "בסוף כולם הולכים — אין טעם להיקשר" },
        { value: "neutral", label: "זה כאב, אבל למדתי מזה משהו חשוב" },
      ],
    },
    {
      id: "sq7",
      text: "יש לך דייט שני עם מישהו שנראה מעניין. מה המחשבה שמפריעה לך הכי הרבה?",
      type: "multiple-choice",
      axis: "self",
      options: [
        { value: "self", label: "כשיכיר אותי טוב יותר, הוא/היא ירצה ללכת" },
        { value: "others", label: "בטוח שהוא/היא עוד מישהו/ת שמחפש/ת לא-נכון" },
        { value: "relationship", label: "גם אם יצא טוב, בסוף ייגמר" },
        { value: "neutral", label: "אני סקרן/ית — אראה לאן זה הולך" },
      ],
    },
    {
      id: "sq8",
      text: "חבר טוב שואל אותך ״למה עדיין לא בזוגיות?״ מה תשיב באמת?",
      type: "multiple-choice",
      axis: "others",
      options: [
        { value: "self", label: "כנראה יש בי משהו שמפחיד אנשים או שלא מושך" },
        { value: "others", label: "כי האנשים שפוגש/ת לא מחפשים דבר רציני" },
        { value: "relationship", label: "כי זוגיות בריאה ואמיתית — פשוט לא מציאותי" },
        { value: "neutral", label: "עדיין לא פגשתי את המתאים/ה — פשוט צירוף נסיבות" },
      ],
    },
    {
      id: "sq9",
      text: "אתה רואה זוג מבוגר שנראה מאושר ואוהב. מה אתה חושב?",
      type: "multiple-choice",
      axis: "relationship",
      options: [
        { value: "self", label: "יפה לראות, אבל אני לא הסוג שזה עובד לו" },
        { value: "others", label: "כנראה שאחד מהם פשרן בצורה לא בריאה" },
        { value: "relationship", label: "נדיר מאוד — ולא משהו שאפשר לסמוך עליו" },
        { value: "neutral", label: "נותן לי תקווה שזה אפשרי" },
      ],
    },
    {
      id: "sq10",
      text: "אחרי סדרה של אכזבות בדייטים, מה הסיכום שלך?",
      type: "multiple-choice",
      axis: "self",
      options: [
        { value: "self", label: "כנראה אני עושה משהו עקבי שלא עובד — צריך לשנות אותי" },
        { value: "others", label: "הבעיה היא שרוב האנשים לא מחפשים דבר אמיתי" },
        { value: "relationship", label: "כנראה שזוגיות פשוט לא בשבילי" },
        { value: "neutral", label: "לא מצאתי עדיין את הנכון/ה — אמשיך לנסות" },
      ],
    },
  ],

  axes: [
    {
      id: "self",
      label: "סיפורים על עצמי",
      description: "נרטיבים על חוסר ערך עצמי, אינטנסיביות, או פחד שמשהו פגום בי",
      color: "#E85D75",
      maxScore: 10,
    },
    {
      id: "others",
      label: "סיפורים על הצד השני",
      description: "נרטיבים על שהאחר/ת לא מוכן/ת, לא בשל/ה, או מחפש/ת לא-נכון",
      color: "#1E3A5F",
      maxScore: 10,
    },
    {
      id: "relationship",
      label: "סיפורים על זוגיות בכלל",
      description: "נרטיבים על זוגיות כמוסד — שהיא מיתוס, שהיא בלתי אפשרית, שהיא תמיד נגמרת",
      color: "#D4A853",
      maxScore: 10,
    },
  ],

  resultRanges,

  computeScores(answers: Record<string, number | string>): Record<string, number> {
    const scores: Record<string, number> = { self: 0, others: 0, relationship: 0 };

    for (const value of Object.values(answers)) {
      const category = value as string;
      if (category in scores) {
        scores[category] = (scores[category] ?? 0) + 1;
      }
    }

    return scores;
  },

  interpretResult(scores: Record<string, number>): QuizResultRange {
    const selfScore = scores.self ?? 0;
    const othersScore = scores.others ?? 0;
    const relationshipScore = scores.relationship ?? 0;

    // Find dominant story type
    if (selfScore >= othersScore && selfScore >= relationshipScore) {
      return resultRanges[0]; // self
    }
    if (othersScore >= selfScore && othersScore >= relationshipScore) {
      return resultRanges[1]; // others
    }
    return resultRanges[2]; // relationship
  },
};
