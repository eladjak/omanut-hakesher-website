import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

const resultRanges: QuizResultRange[] = [
  {
    min: 3.25,
    max: 4.0,
    title: "דייט מצוין — חיבור אמיתי",
    emoji: "✨",
    description:
      "היה פה משהו אמיתי. הרגשת בנוח, היית עצמך, והייתה כימיה. זו הסיבה שבשבילה יוצאים לדייטים.",
    recommendation:
      "שמור/י את מה שעשה את הדייט הזה מיוחד — זה הקנה מידה שלך לדייטים הבאים. אם יש רצון לעוד מפגש, תיזום/י.",
  },
  {
    min: 2.5,
    max: 3.24,
    title: "דייט טוב — יש פוטנציאל",
    emoji: "🌱",
    description:
      "לא היה וואו, אבל היה נעים ומעניין. כימיה לפעמים בנויה לאט — אל תמהר/י לשפוט.",
    recommendation:
      "שקול/י דייט שני. הפעם תן/י לעצמך להיות קצת יותר פתוח/ה ולראות מה מתפתח.",
  },
  {
    min: 1.75,
    max: 2.49,
    title: "דייט ללמידה — הפקת לקחים",
    emoji: "📚",
    description:
      "הדייט הזה לא היה הנכון, אבל כל דייט מלמד אותך משהו על עצמך ועל מה שאתה/את מחפש/ת.",
    recommendation:
      "שים/י לב לתשובות על שאלות 1-2 ו-6-7 — שם מסתתרת התובנה החשובה ביותר מהדייט הזה.",
  },
  {
    min: 1.0,
    max: 1.74,
    title: "דייט שלא עבד — אבל למדת",
    emoji: "🔍",
    description:
      "זה לא היה מתאים, וזה בסדר לגמרי. לדעת מה לא מתאים — זו גם ידיעה חשובה. הדייט הבא יהיה טוב יותר.",
    recommendation:
      "חשוב/י על שאלה 12 — מה למדת על עצמך? כל דייט הוא מידע, לא כישלון.",
  },
];

export const dateReportConfig: QuizConfig = {
  id: "date-report",
  title: "דו\"ח דייט",
  subtitle: "ניתוח קצר אחרי כל מפגש",
  description:
    "12 שאלות לעיבוד הדייט — כדי להבין מה קרה, מה הרגשת, ומה ללמוד ממנו. מלא/י מיד אחרי, כשהזיכרון עוד טרי.",
  icon: "📊",

  questions: [
    {
      id: "dr1",
      text: "איך הרגשתי במהלך הדייט?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "לחוץ/ה מאוד",
      scaleMaxLabel: "רגוע/ה ואותנטי/ת",
      axis: "growth",
    },
    {
      id: "dr2",
      text: "כמה הייתי עצמי/עצמי?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "שיחקתי תפקיד",
      scaleMaxLabel: "הייתי אני לגמרי",
      axis: "authenticity",
    },
    {
      id: "dr3",
      text: "האם הרגשתי שמקשיבים לי?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "בכלל לא",
      scaleMaxLabel: "לגמרי",
      axis: "connection",
    },
    {
      id: "dr4",
      text: "האם הייתי סקרן/ית לגבי הצד השני?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "לא ממש",
      scaleMaxLabel: "מאוד",
      axis: "connection",
    },
    {
      id: "dr5",
      text: "איך הרגשתי אחרי הדייט?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "מותש/ת ומתוסכל/ת",
      scaleMaxLabel: "מלא/ה אנרגיה",
      axis: "growth",
    },
    {
      id: "dr6",
      text: "האם שאלתי שאלות עמוקות?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "נשארנו בשטח",
      scaleMaxLabel: "הגענו לעומק",
      axis: "authenticity",
    },
    {
      id: "dr7",
      text: "האם שמרתי על הגבולות שלי?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "ויתרתי על עצמי",
      scaleMaxLabel: "שמרתי בנוחות",
      axis: "authenticity",
    },
    {
      id: "dr8",
      text: "האם הייתה כימיה?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "לא הרגשתי",
      scaleMaxLabel: "חזקה מאוד",
      axis: "connection",
    },
    {
      id: "dr9",
      text: "האם הרגשתי בטוח/ה?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "לא נוח/ה",
      scaleMaxLabel: "מאוד בטוח/ה",
      axis: "growth",
    },
    {
      id: "dr10",
      text: "האם הצד השני היה אותנטי?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "הרגשתי שמשחק תפקיד",
      scaleMaxLabel: "כנה ופתוח/ה",
      axis: "connection",
    },
    {
      id: "dr11",
      text: "האם אני רוצה עוד דייט?",
      type: "scale",
      scaleMin: 1,
      scaleMax: 4,
      scaleMinLabel: "ממש לא",
      scaleMaxLabel: "בהחלט כן",
      axis: "interest",
    },
    {
      id: "dr12",
      text: "מה למדתי על עצמי מהדייט הזה?",
      type: "multiple-choice",
      axis: "interest",
      options: [
        {
          value: "1",
          label: "שאני מגיע/ה עם ציפיות גבוהות מדי",
        },
        {
          value: "2",
          label: "שאני נסגר/ת מהר מדי כשמשהו קטן לא לטעמי",
        },
        {
          value: "3",
          label: "שאני יכול/ה להיות יותר פתוח/ה ולסמוך על התהליך",
        },
        {
          value: "4",
          label: "שאני יודע/ת מה אני מחפש/ת ואני לא מתפשר/ת",
        },
      ],
    },
  ],

  axes: [
    {
      id: "authenticity",
      label: "אותנטיות",
      description: "עד כמה היית עצמך — שאלת שאלות עמוקות ושמרת על גבולות",
      color: "var(--primary)",
      maxScore: 4,
    },
    {
      id: "connection",
      label: "חיבור",
      description: "האם הרגשת שרואים אותך, היית סקרן/ית, והייתה כימיה",
      color: "var(--secondary)",
      maxScore: 4,
    },
    {
      id: "growth",
      label: "צמיחה",
      description: "האם הרגשת שלם/ה עם עצמך לפני, במהלך ואחרי הדייט",
      color: "var(--accent)",
      maxScore: 4,
    },
    {
      id: "interest",
      label: "עניין",
      description: "הרצון להמשיך ומה למדת על עצמך מהמפגש",
      color: "var(--chart-4)",
      maxScore: 4,
    },
  ],

  resultRanges,

  computeScores(
    answers: Record<string, number | string>,
  ): Record<string, number> {
    const axisQuestions: Record<string, string[]> = {
      authenticity: ["dr2", "dr6", "dr7"],
      connection: ["dr3", "dr4", "dr8", "dr10"],
      growth: ["dr1", "dr5", "dr9"],
      interest: ["dr11", "dr12"],
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
    const axisValues = Object.values(scores).filter((v) => v > 0);
    const average =
      axisValues.length > 0
        ? axisValues.reduce((sum, v) => sum + v, 0) / axisValues.length
        : 0;

    const match = resultRanges.find((r) => average >= r.min && average <= r.max);

    if (match) return match;
    if (average < 1.0) return resultRanges[resultRanges.length - 1];
    return resultRanges[0];
  },
};
