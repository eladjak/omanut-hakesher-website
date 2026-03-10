import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

// Commitment fear categories (axes):
// "freedom"   - פחד מאובדן חופש
// "choice"    - פחד מבחירה לא נכונה
// "failure"   - פחד מכישלון ומפגיעה
// "hurt"      - פחד מלהיפגע שוב
// "identity"  - פחד מאובדן זהות

const resultRanges: QuizResultRange[] = [
  {
    min: 1,
    max: 1,
    title: "פחד מאובדן חופש",
    emoji: "🕊️",
    description:
      "הפחד הדומיננטי שלך קשור לאובדן החופש האישי. משהו בך חושש שמחויבות תהפוך לכלוב. האמת היא שמחויבות בריאה לא לוקחת את החופש — היא נותנת לו כיוון ומשמעות.",
    recommendation:
      "חזרו לפרק 13 — הפרק דן ישירות בפחד הזה ומציע כלים להבחין בין מחויבות-כלוב למחויבות-בית.",
  },
  {
    min: 2,
    max: 2,
    title: "פחד מבחירה לא נכונה",
    emoji: "🔀",
    description:
      "הפחד הדומיננטי שלך הוא FOMO — מה אם יש מישהו/י טוב יותר שם בחוץ? הפחד הזה מאוד נפוץ בעידן הדיגיטלי. אבל שלמות היא לא תנאי לאהבה — זוהי אמת שכדאי לחקור.",
    recommendation:
      "שאלו את עצמכם: 'אם לא הייתי יודע/ת שיש אפשרויות אחרות — האם הייתי מאושר/ת עם מה שיש לי עכשיו?' התשובה לשאלה הזו אומרת הרבה.",
  },
  {
    min: 3,
    max: 3,
    title: "פחד מכישלון",
    emoji: "💔",
    description:
      "הפחד הדומיננטי שלך הוא שהמאמץ לא ישתלם — שהכל ייבנה ואז יתפרק. פחד זה לגיטימי לחלוטין, אבל הוא יכול למנוע ממך גם את הסיכוי להצלחה.",
    recommendation:
      "הפחד מכישלון הוא לא ראיה שהדבר יכשל. חשבו: האם הפחד מלהישאר לבד/ה לנצח גדול יותר מהפחד להיפגע בדרך?",
  },
  {
    min: 4,
    max: 4,
    title: "פחד מלהיפגע שוב",
    emoji: "🩹",
    description:
      "הפחד הדומיננטי שלך נולד מצלקות אמיתיות. כאבים מהעבר שמעצבים את ההחלטות שלך היום. זה הגיוני ואנושי — ואפשר לרפא.",
    recommendation:
      "הצלקות שלך הן עדות לכך שאהבת. הכאב הוא לא חולשה — הוא הוכחה שהיית שם, שהשקעת, שהרגשת. הדרך קדימה היא דרך הריפוי, לא עוקפת אותו.",
  },
  {
    min: 5,
    max: 5,
    title: "פחד מאובדן זהות",
    emoji: "🪞",
    description:
      "הפחד הדומיננטי שלך הוא שבזוגיות תאבד את עצמך — את מי שבנית לאורך שנים. הפחד הזה מגיע ממקום בריא של כיבוד עצמי. אבל מחויבות אמיתית היא שותפות, לא מיזוג.",
    recommendation:
      "מחויבות בריאה לא מוחקת אותך — היא יוצרת שטח משותף עם אדם אחר, תוך שמירה על ה'אני' שלך. שאלו: 'האם הפחד הזה מגיע מהקשר הנוכחי, או מסיפור ישן?'",
  },
];

export const commitmentFearsConfig: QuizConfig = {
  id: "commitment-fears",
  title: "מפת פחדי מחויבות",
  subtitle: "5 הפחדים הגדולים שמעכבים אותנו מהתחייבות",
  description:
    "כשמבינים ממה בדיוק אנחנו מפחדים, הפחד מאבד מכוחו. 10 שאלות יממפו את פחדי המחויבות שלך ויגלו איזה מהם הדומיננטי — וממה הוא בא.",
  icon: "🗺️",

  questions: [
    // פחד 1: אובדן חופש — שאלה א
    {
      id: "cf1",
      text: "\"אם אתחייב/תחייב, הספונטניות שלי תיעלם\" — עד כמה המשפט הזה מתאר אותך?",
      type: "multiple-choice",
      axis: "freedom",
      options: [
        { value: "1", label: "כמעט לא — זה לא מה שאני חושש/ת ממנו" },
        { value: "2", label: "לפעמים — הרעיון הזה מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — זה מה שמעכב אותי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה כבד מאוד" },
      ],
    },
    // פחד 1: אובדן חופש — שאלה ב
    {
      id: "cf2",
      text: "\"בזוגיות אצטרך לוותר על הזמן שלי, על הרגלים שלי, על עצמי\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "freedom",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מטריד אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // פחד 2: בחירה לא נכונה — שאלה א
    {
      id: "cf3",
      text: "\"מה אם ממש אחרי שאתחייב/תחייב, אפגוש מישהו/י מושלם יותר?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "choice",
      options: [
        { value: "1", label: "כמעט לא — זה לא מה שמטריד אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // פחד 2: בחירה לא נכונה — שאלה ב
    {
      id: "cf4",
      text: "\"אני לא בטוח/ה שהאדם הזה הוא 'האחד/ת' בשבילי — מה אם טועה?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "choice",
      options: [
        { value: "1", label: "כמעט לא — אני סומך/ת על ההחלטה שלי" },
        { value: "2", label: "לפעמים — הספקות מופיעים אבל לא שולטים" },
        { value: "3", label: "לעיתים קרובות — הספקות משתקים אותי" },
        { value: "4", label: "זה אני לגמרי — לא מסוגל/ת להחליט" },
      ],
    },
    // פחד 3: כישלון — שאלה א
    {
      id: "cf5",
      text: "\"מה אם נשקיע הכל ואז ייכשל? לא שווה לסכן את עצמי\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "failure",
      options: [
        { value: "1", label: "כמעט לא — אני מוכן/ה לסכן את עצמי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // פחד 3: כישלון — שאלה ב
    {
      id: "cf6",
      text: "\"ראיתי זוגות שהתחילו בשמחה ונגמרו בכאב. לא רוצה להיות שם\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "failure",
      options: [
        { value: "1", label: "כמעט לא — זה לא עוצר אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // פחד 4: להיפגע שוב — שאלה א
    {
      id: "cf7",
      text: "\"כבר נפגעתי פעם אחת. אני לא יכול/ה לעבור את זה שוב\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "hurt",
      options: [
        { value: "1", label: "כמעט לא — אני מוכן/ה לפתוח שוב" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // פחד 4: להיפגע שוב — שאלה ב
    {
      id: "cf8",
      text: "\"אם אפתח יותר מדי, הם יכאיבו לי דרך נקודות החולשה שגיליתי להם\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "hurt",
      options: [
        { value: "1", label: "כמעט לא — אני סומך/ת על הפרטנר שלי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — מונע ממני להיפתח" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // פחד 5: אובדן זהות — שאלה א
    {
      id: "cf9",
      text: "\"עבדתי שנים לבנות את מי שאני. בזוגיות אני חושש/ת לאבד את עצמי\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "identity",
      options: [
        { value: "1", label: "כמעט לא — ידיעת עצמי לא מפחידה אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // פחד 5: אובדן זהות — שאלה ב
    {
      id: "cf10",
      text: "\"אם נהיה 'אנחנו' — איפה יישאר ה'אני' שלי?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "identity",
      options: [
        { value: "1", label: "כמעט לא — אני בטוח/ה בזהות שלי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
  ],

  axes: [
    {
      id: "freedom",
      label: "פחד מאובדן חופש",
      description: "חשש שמחויבות תלקח את הספונטניות, האוטונומיה והחופש האישי",
      color: "#1E3A5F",
      maxScore: 4,
    },
    {
      id: "choice",
      label: "פחד מבחירה לא נכונה",
      description: "פחד מ-FOMO, מספקות, מהמתנה לאפשרות ה'מושלמת'",
      color: "#E85D75",
      maxScore: 4,
    },
    {
      id: "failure",
      label: "פחד מכישלון",
      description: "פחד שההשקעה לא תשתלם וכל מה שנבנה יתפרק",
      color: "#D4A853",
      maxScore: 4,
    },
    {
      id: "hurt",
      label: "פחד מלהיפגע שוב",
      description: "צלקות מהעבר שמעצבות את ההחלטות בהווה",
      color: "#9B59B6",
      maxScore: 4,
    },
    {
      id: "identity",
      label: "פחד מאובדן זהות",
      description: "חשש שמחויבות תמחק את מי שבנית לאורך שנים",
      color: "#6B7280",
      maxScore: 4,
    },
  ],

  resultRanges,

  computeScores(answers: Record<string, number | string>): Record<string, number> {
    const axisQuestions: Record<string, string[]> = {
      freedom: ["cf1", "cf2"],
      choice: ["cf3", "cf4"],
      failure: ["cf5", "cf6"],
      hurt: ["cf7", "cf8"],
      identity: ["cf9", "cf10"],
    };

    const scores: Record<string, number> = {};

    for (const [axisId, questionIds] of Object.entries(axisQuestions)) {
      const values = questionIds
        .map((qId) => {
          const val = answers[qId];
          return typeof val === "number" ? val : Number(val);
        })
        .filter((v) => !isNaN(v) && v > 0);

      scores[axisId] =
        values.length > 0
          ? values.reduce((sum, v) => sum + v, 0) / values.length
          : 0;
    }

    return scores;
  },

  interpretResult(scores: Record<string, number>): QuizResultRange {
    // Find the dominant commitment fear
    const entries = Object.entries(scores).filter(([, v]) => v > 0);
    if (entries.length === 0) return resultRanges[0];

    const dominant = entries.reduce((best, curr) =>
      curr[1] > best[1] ? curr : best,
    );

    const categoryIndex: Record<string, number> = {
      freedom: 0,
      choice: 1,
      failure: 2,
      hurt: 3,
      identity: 4,
    };

    const idx = categoryIndex[dominant[0]] ?? 0;
    return resultRanges[idx];
  },
};
