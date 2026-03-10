import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

// ── Result ranges ─────────────────────────────────────────────────────────

const resultRanges: QuizResultRange[] = [
  {
    min: 36,
    max: 45,
    title: "כימיה מאוזנת ומשולשת",
    emoji: "🔥",
    description:
      "יש לך חיבור עמוק בשלושת הצירים — פיזי, רגשי ושכלי. זו הכימיה הנדירה שמאחדת בין משיכה, הבנה ועניין. שמור/י על זה — זה לא מובן מאליו.",
    recommendation:
      "המשך/כי לבנות על שלושת הצירים. כימיה מאוזנת כזו היא הבסיס לזוגיות בריאה ומעמיקה. פרק 12 ישמח אותך.",
  },
  {
    min: 28,
    max: 35,
    title: "כימיה חזקה עם ציר מוביל",
    emoji: "✨",
    description:
      "יש כאן כימיה משמעותית. אחד הצירים בולט יותר מהאחרים — וזה בסדר גמור. הכימיה הכי אמיתית מתחילה לרוב מציר אחד ומתפתחת משם.",
    recommendation:
      "שים/י לב לציר הנמוך ביותר שלך. לא צריך לדחוף, אבל כדאי לשים לב: האם הוא לא שם, או שרק לא נבחן עדיין?",
  },
  {
    min: 20,
    max: 27,
    title: "כימיה חלקית",
    emoji: "🌱",
    description:
      "יש ניצוצות, אבל לא בכל המקומות. ייתכן שהמפגשים היו קצרים מדי, או שאחד הצירים פשוט לא שם. זה לא בהכרח בעיה — אלא מידע.",
    recommendation:
      "תן/תני לזה עוד כמה מפגשים לפני שאתה/את מסיק/ה מסקנות. חיבור שכלי ורגשי לוקח זמן להתגלות. כימיה פיזית — לא.",
  },
  {
    min: 15,
    max: 19,
    title: "עדיין מוקדם לדעת",
    emoji: "🌤",
    description:
      "הציונים מראים שהכימיה עדיין לא ברורה. אולי עדיין מוקדם, אולי צריך יותר זמן, ואולי זה פשוט לא שם. שלוש האפשרויות תקינות.",
    recommendation:
      "אל תסיק/י מסקנות מהתוצאות האלה לבד. שאל/שאלי את עצמך: האם אתה/את פוגש/ת אותו/אותה מספיק? האם יש מה שמונע ממך להיות ספונטני/ת?",
  },
];

// ── Quiz config ────────────────────────────────────────────────────────────

export const chemistryQuizConfig: QuizConfig = {
  id: "chemistry-quiz",
  title: "שאלון כימיה",
  subtitle: "איזה סוג כימיה אתה/את חווה?",
  description:
    "15 שאלות שיעזרו לך לזהות את סוג הכימיה שאתה חווה עם מישהו — פיזי, רגשי, שכלי. חיבור אמיתי נבנה משלושתם.",
  icon: "⚗️",

  questions: [
    // ── ציר פיזי (q_p1–q_p5) ──────────────────────────────────────────────
    {
      id: "q_p1",
      text: "כשאני רואה אותו/אותה — הגוף שלי מגיב. יש משיכה שמורגשת בבטן או בחזה",
      type: "multiple-choice",
      axis: "physical",
      options: [
        { value: "1", label: "לא ממש — הגוף שלי לא מגיב באופן מיוחד" },
        { value: "2", label: "קצת — יש משהו קל, אבל לא בולט" },
        { value: "3", label: "כן — יש תגובה פיזית ברורה שאני מזהה/ה" },
      ],
    },
    {
      id: "q_p2",
      text: "אני מוצא/ת את עצמי שם/ה לב לנוכחות הפיזית שלו/שלה — הקול, התנועה, הריח",
      type: "multiple-choice",
      axis: "physical",
      options: [
        { value: "1", label: "לא — זה לא משהו שאני שם/ה לב אליו" },
        { value: "2", label: "לפעמים — יש מרכיב אחד שבולט לי" },
        { value: "3", label: "כן — הנוכחות הפיזית שלו/שלה משפיעה עליי" },
      ],
    },
    {
      id: "q_p3",
      text: "הרעיון של מגע — נגיעה, חיבוק, קרבה פיזית — נשמע לי טבעי ומושך",
      type: "multiple-choice",
      axis: "physical",
      options: [
        { value: "1", label: "לא — זה לא נשמע טבעי עבורי כרגע" },
        { value: "2", label: "אולי — אני יכול/ה לדמיין אבל לא בטוח/ה" },
        { value: "3", label: "כן — יש לי משיכה לקרבה פיזית איתו/איתה" },
      ],
    },
    {
      id: "q_p4",
      text: "כשאנחנו יושבים קרוב — יש תחושה של טינגל, חשמל, או פשוט מודעות לקרבה",
      type: "multiple-choice",
      axis: "physical",
      options: [
        { value: "1", label: "לא — אין תחושה מיוחדת בקרבה פיזית" },
        { value: "2", label: "קצת — יש מודעות, אבל לא אינטנסיבית" },
        { value: "3", label: "כן — אני מודע/ת לגמרי לקרבה הפיזית שלנו" },
      ],
    },
    {
      id: "q_p5",
      text: "אני מוצא/ת אותו/אותה מושך/ת — לא בהכרח מושלם/ת, אבל יש קסם שמשהו בו/בה",
      type: "multiple-choice",
      axis: "physical",
      options: [
        { value: "1", label: "לא ממש — אין משיכה פיזית מיוחדת" },
        { value: "2", label: "חלקית — יש משהו, אבל לא חזק במיוחד" },
        { value: "3", label: "כן — יש לי משיכה פיזית אמיתית אליו/אליה" },
      ],
    },

    // ── ציר רגשי (q_e1–q_e5) ─────────────────────────────────────────────
    {
      id: "q_e1",
      text: "כשאנחנו מדברים — אני מרגיש/ת שהוא/היא מבין/ה אותי ברמה שלא כולם מבינים",
      type: "multiple-choice",
      axis: "emotional",
      options: [
        { value: "1", label: "לא — אני לא מרגיש/ת שהוא/היא מבין/ה אותי במיוחד" },
        { value: "2", label: "לפעמים — יש רגעי הבנה אבל גם מחמיצים" },
        { value: "3", label: "כן — יש תחושה של 'הוא/היא מבין/ה אותי'" },
      ],
    },
    {
      id: "q_e2",
      text: "בנוכחות שלו/שלה אני מרגיש/ת בטוח/ה מספיק להיות עצמי — גם בצדדים הפחות מושלמים",
      type: "multiple-choice",
      axis: "emotional",
      options: [
        { value: "1", label: "לא — אני עדיין שומר/ת מרחק רגשי" },
        { value: "2", label: "בינוני — יש נוחות, אבל לא מלאה" },
        { value: "3", label: "כן — אני מרגיש/ת בטיחות רגשית בנוכחותו/בנוכחותה" },
      ],
    },
    {
      id: "q_e3",
      text: "אחרי שאנחנו נפרדים — אני יוצא/ת עם תחושה טובה, לא עם ספקות או כבדות",
      type: "multiple-choice",
      axis: "emotional",
      options: [
        { value: "1", label: "לא — לרוב יש ספקות או כבדות אחרי" },
        { value: "2", label: "לפעמים — תלוי במפגש" },
        { value: "3", label: "כן — אני יוצא/ת עם אנרגיה טובה" },
      ],
    },
    {
      id: "q_e4",
      text: "אני מרגיש/ת שהוא/היא שם/ה לב לאיך שאני מרגיש/ת — בלי שאני צריך/ה להסביר",
      type: "multiple-choice",
      axis: "emotional",
      options: [
        { value: "1", label: "לא — הוא/היא לא ממש שם/ה לב לאיך שאני" },
        { value: "2", label: "לפעמים — מדי פעם הוא/היא מזהה/ה" },
        { value: "3", label: "כן — יש תחושה שהוא/היא מחובר/ת אליי" },
      ],
    },
    {
      id: "q_e5",
      text: "כשאני מספר/ת לו/לה משהו אישי — אני לא מרגיש/ת שיפוטיות, אלא קשב",
      type: "multiple-choice",
      axis: "emotional",
      options: [
        { value: "1", label: "לא — אני מרגיש/ת שיפוט או חוסר קשב" },
        { value: "2", label: "בינוני — יש קשב אבל גם רגעים שמרגישים שיפוטיים" },
        { value: "3", label: "כן — יש תחושת קשב ואמפתיה" },
      ],
    },

    // ── ציר שכלי (q_i1–q_i5) ─────────────────────────────────────────────
    {
      id: "q_i1",
      text: "השיחות שלנו מעניינות אותי — לפעמים אני יוצא/ת עם נקודת מבט חדשה",
      type: "multiple-choice",
      axis: "intellectual",
      options: [
        { value: "1", label: "לא — השיחות שטחיות ו/או חוזרות על עצמן" },
        { value: "2", label: "לפעמים — יש רגעים מעניינים אבל לא תמיד" },
        { value: "3", label: "כן — השיחות שלנו מאתגרות ומרחיבות אותי" },
      ],
    },
    {
      id: "q_i2",
      text: "אני מוצא/ת אותו/אותה חכם/ה או בעל/ת ידע שמקסים אותי — גם בתחומים שלא הכרתי",
      type: "multiple-choice",
      axis: "intellectual",
      options: [
        { value: "1", label: "לא — לא מרגיש/ת גירוי שכלי מיוחד" },
        { value: "2", label: "קצת — יש תחום אחד שמרשים אותי" },
        { value: "3", label: "כן — אני מוצא/ת אותו/אותה מרשים/ה שכלית" },
      ],
    },
    {
      id: "q_i3",
      text: "כשאנחנו חלוקים בדעות — זה מרגיש מעניין ולא מאיים. השיחה נעשית יותר טובה, לא גרועה יותר",
      type: "multiple-choice",
      axis: "intellectual",
      options: [
        { value: "1", label: "לא — חילוקי דעות גורמים לי לאי-נוחות" },
        { value: "2", label: "לפעמים — תלוי בנושא" },
        { value: "3", label: "כן — דיון איתו/איתה מרגיש מעשיר" },
      ],
    },
    {
      id: "q_i4",
      text: "אני מרגיש/ת סקרן/ית לגביו/לגביה — רוצה לדעת יותר, לשמוע יותר, להבין יותר",
      type: "multiple-choice",
      axis: "intellectual",
      options: [
        { value: "1", label: "לא ממש — אין לי סקרנות מיוחדת" },
        { value: "2", label: "קצת — יש סקרנות בינונית" },
        { value: "3", label: "כן — אני מרגיש/ת סקרנות אמיתית לגביו/לגביה" },
      ],
    },
    {
      id: "q_i5",
      text: "אחרי שיחה איתו/איתה — אני מוצא/ת את עצמי ממשיך/ה לחשוב על רעיון שעלה",
      type: "multiple-choice",
      axis: "intellectual",
      options: [
        { value: "1", label: "לא — השיחות לא נשארות איתי" },
        { value: "2", label: "לפעמים — יש רעיונות שנשארים לזמן מה" },
        { value: "3", label: "כן — השיחות שלנו מלוות אותי הרבה אחרי" },
      ],
    },
  ],

  axes: [
    {
      id: "physical",
      label: "כימיה פיזית",
      description: "משיכה גופנית, מודעות לנוכחות, תשוקה",
      color: "#E85D75",
      maxScore: 15,
    },
    {
      id: "emotional",
      label: "כימיה רגשית",
      description: "תחושת הבנה, בטיחות, ראייה הדדית",
      color: "#D4A853",
      maxScore: 15,
    },
    {
      id: "intellectual",
      label: "כימיה שכלית",
      description: "גירוי מחשבתי, סקרנות, עניין",
      color: "#1E3A5F",
      maxScore: 15,
    },
  ],

  resultRanges,

  computeScores(answers: Record<string, number | string>): Record<string, number> {
    const axisQuestions: Record<string, string[]> = {
      physical: ["q_p1", "q_p2", "q_p3", "q_p4", "q_p5"],
      emotional: ["q_e1", "q_e2", "q_e3", "q_e4", "q_e5"],
      intellectual: ["q_i1", "q_i2", "q_i3", "q_i4", "q_i5"],
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
        values.length > 0 ? values.reduce((sum, v) => sum + v, 0) : 0;
    }

    scores.total = Object.values(scores).reduce((sum, v) => sum + v, 0);

    return scores;
  },

  interpretResult(scores: Record<string, number>): QuizResultRange {
    const total = scores.total ?? Object.values(scores).reduce((sum, v) => sum + v, 0);

    const match = resultRanges.find((r) => total >= r.min && total <= r.max);
    if (match) return match;

    if (total < 15) return resultRanges[3];
    return resultRanges[0];
  },
};
