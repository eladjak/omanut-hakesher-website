import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

// Fear categories (axes):
// "avoidance"  - הימנעות: פחדים 2,3,7,13,14 (הימנעות מקרבה/מחויבות)
// "worthiness" - ערך עצמי: פחדים 1,5,8 (תחושת אי-התאמה)
// "past"       - עבר: פחדים 4,6 (פציעות מהעבר)
// "external"   - חיצוני: פחדים 9,10,11,12 (לחצים חיצוניים)

const resultRanges: QuizResultRange[] = [
  {
    min: 1,
    max: 1,
    title: "פחדי הימנעות",
    emoji: "🧊",
    description:
      "הפחדים הדומיננטיים שלך קשורים להימנעות מקרבה ומחויבות. משהו בך מושך לזוגיות, אבל משהו אחר מפחד להיכנע לה. זה מאבק פנימי שמוכר לרבים.",
    recommendation:
      "פרקים 3 ו-4 יעזרו לך להבין את שורשי ההימנעות ולהוריד את השריון בהדרגה.",
  },
  {
    min: 2,
    max: 2,
    title: "פחדי ערך עצמי",
    emoji: "🪞",
    description:
      "הפחדים הדומיננטיים שלך קשורים לתחושת ערך עצמי — האם אתה/את מספיק טוב/ה, מתאים/ה, ראוי/ה לאהבה. הפחד הזה עמוק, אבל הוא ניתן לשינוי.",
    recommendation:
      "פרק 1 (הסיפורים שאתה מספר לעצמך) ופרק 2 הם הנקודת ההתחלה הנכונה עבורך.",
  },
  {
    min: 3,
    max: 3,
    title: "פחדי העבר",
    emoji: "🩹",
    description:
      "הפחדים הדומיננטיים שלך נולדו מחוויות כואבות מהעבר. כאבים ישנים שעדיין מעצבים את ההחלטות שלך היום. זה הגיוני לחלוטין — ואפשר לרפא.",
    recommendation:
      "פרק 3 (הרוח בכיסא השלישי) נכתב עבורך. שם תמצא דרך לשחרר ולהמשיך.",
  },
  {
    min: 4,
    max: 4,
    title: "פחדים חיצוניים",
    emoji: "🌍",
    description:
      "הפחדים הדומיננטיים שלך קשורים ללחצים חיצוניים — מה יגידו, הזמן שעובר, פחד מהבלתי נודע. הלב שלך מוכן, אבל העולם מסביב מרעיש יותר מדי.",
    recommendation:
      "פרק 5 (מי אתה באמת) יעזור לך להתחבר לפנימי שלך ולסנן את הרעשים החיצוניים.",
  },
];

export const fearMapConfig: QuizConfig = {
  id: "fear-map",
  title: "מפת הפחדים שלך",
  subtitle: "14 הפחדים שעוצרים אותנו בדרך לזוגיות",
  description:
    "לכולנו יש פחדים שמשפיעים על הדרך שלנו לזוגיות. השאלון הזה ממפה את 14 הפחדים הנפוצים ביותר — ומגלה אילו מהם דומיננטיים אצלך. ענה בכנות, כי ידיעת הפחד היא הצעד הראשון לשחרור ממנו.",
  icon: "🗺️",

  questions: [
    // fear 1 — פחד מדחייה — axis: worthiness
    {
      id: "f1",
      text: "\"מה אם אגיד מה שאני מרגיש ויגידו לי לא?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "worthiness",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 2 — פחד מנטישה — axis: avoidance
    {
      id: "f2",
      text: "\"מה אם אתאהב ופתאום ייעלמו?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "avoidance",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 3 — פחד מאינטימיות — axis: avoidance
    {
      id: "f3",
      text: "\"מה אם מישהו יתקרב אלי וייגעל ממה שהוא יראה?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "avoidance",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 4 — פחד מכישלון חוזר — axis: past
    {
      id: "f4",
      text: "\"מה אם גם הפעם ייגמר כמו כל הפעמים הקודמות?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "past",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 5 — פחד מהצלחה — axis: worthiness
    {
      id: "f5",
      text: "\"מה אם זה באמת יעבוד? מה אני אעשה עם כל האושר הזה?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "worthiness",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 6 — פחד מפגיעה — axis: past
    {
      id: "f6",
      text: "\"מה אם יכאיבו לי כמו שכאבו לי בעבר?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "past",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 7 — פחד מהתחייבות — axis: avoidance
    {
      id: "f7",
      text: "\"מה אם אתחייב ואז אגלה שזה לא מה שרציתי?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "avoidance",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 8 — פחד מאי-התאמה — axis: worthiness
    {
      id: "f8",
      text: "\"מה אם אני פשוט לא מתאים/ה לזוגיות?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "worthiness",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 9 — פחד ממה שיגידו — axis: external
    {
      id: "f9",
      text: "\"מה אם הבן/בת זוג שלי לא יתאים/ה לציפיות של המשפחה/חברים?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "external",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 10 — פחד מהבלתי נודע — axis: external
    {
      id: "f10",
      text: "\"מה אם תהיו ביחד ויקרה משהו שאני לא יכול לשלוט בו?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "external",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 11 — פחד שהזמן אוזל — axis: external
    {
      id: "f11",
      text: "\"מה אם כבר מאוחר מדי? אולי פיספסתי את הרכבת?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "external",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 12 — פחד מפשרה — axis: external
    {
      id: "f12",
      text: "\"מה אם אתפשר על מישהו/י שלא ממש מתאים/ה לי?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "external",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 13 — פחד מאובדן שליטה — axis: avoidance
    {
      id: "f13",
      text: "\"מה אם אתאהב כל כך שאאבד את עצמי?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "avoidance",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
    // fear 14 — פחד מאובדן הזהות — axis: avoidance
    {
      id: "f14",
      text: "\"מה אם בזוגיות אפסיק להיות אני?\" — עד כמה הפחד הזה מוכר לך?",
      type: "multiple-choice",
      axis: "avoidance",
      options: [
        { value: "1", label: "כמעט לא — זה לא ממש מעכב אותי" },
        { value: "2", label: "לפעמים — מופיע אבל לא שולט" },
        { value: "3", label: "לעיתים קרובות — משפיע על ההחלטות שלי" },
        { value: "4", label: "זה אני לגמרי — הפחד הזה שולט בי" },
      ],
    },
  ],

  axes: [
    {
      id: "avoidance",
      label: "פחדי הימנעות",
      description: "פחד מקרבה, מחויבות, אינטימיות ואובדן עצמי בזוגיות",
      color: "#1E3A5F",
      maxScore: 4,
    },
    {
      id: "worthiness",
      label: "פחדי ערך עצמי",
      description: "פחד מדחייה, מאי-התאמה, ושאלת ״האם אני מספיק?״",
      color: "#E85D75",
      maxScore: 4,
    },
    {
      id: "past",
      label: "פחדי העבר",
      description: "פחד מכישלון חוזר ומפגיעה שנולדה מחוויות קודמות",
      color: "#D4A853",
      maxScore: 4,
    },
    {
      id: "external",
      label: "פחדים חיצוניים",
      description: "פחד מלחצים חברתיים, הזמן שעובר, הבלתי נודע ופשרה",
      color: "#6B7280",
      maxScore: 4,
    },
  ],

  resultRanges,

  computeScores(answers: Record<string, number | string>): Record<string, number> {
    const axisQuestions: Record<string, string[]> = {
      avoidance: ["f2", "f3", "f7", "f13", "f14"],
      worthiness: ["f1", "f5", "f8"],
      past: ["f4", "f6"],
      external: ["f9", "f10", "f11", "f12"],
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
    // Find the dominant fear category
    const entries = Object.entries(scores).filter(([, v]) => v > 0);
    if (entries.length === 0) return resultRanges[0];

    const dominant = entries.reduce((best, curr) =>
      curr[1] > best[1] ? curr : best,
    );

    const categoryIndex: Record<string, number> = {
      avoidance: 0,
      worthiness: 1,
      past: 2,
      external: 3,
    };

    const idx = categoryIndex[dominant[0]] ?? 0;
    return resultRanges[idx];
  },
};
