import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

const resultRanges: QuizResultRange[] = [
  {
    min: 40,
    max: 48,
    title: "חיבור עמוק",
    emoji: "💞",
    description:
      "יש כאן משהו אמיתי. החיבור שלכם חזק בכל הצירים — אינטלקטואלי, רגשי, פיזי וערכי. זה לא נפוץ, ואל תיקח את זה כמובן מאליו.",
    recommendation:
      "המשך לפרק 12 — ׳משחק המחבואים של הלב׳. עכשיו הגיע הזמן ללמוד לבנות אינטימיות אמיתית על הבסיס הזה.",
  },
  {
    min: 30,
    max: 39,
    title: "חיבור מבטיח",
    emoji: "✨",
    description:
      "יש כאן ניצוץ אמיתי. החיבור חזק ברוב הצירים, ויש מקום לצמיחה. זה בדיוק המקום הנכון להמשיך ולהשקיע.",
    recommendation:
      "שים לב לצירים שקיבלו ציון נמוך יותר — הם לא בעיות, הם הזמנות לשיחות עמוקות יותר.",
  },
  {
    min: 20,
    max: 29,
    title: "חיבור חלקי",
    emoji: "🌱",
    description:
      "יש כימיה, אבל החיבור עדיין חלקי. ייתכן שחלק מהצירים לא נבדקו מספיק, או שיש פערים שכדאי לשים לב אליהם.",
    recommendation:
      "תן לזה עוד כמה מפגשים לפני שאתה מחליט. חיבור אמיתי לפעמים לוקח זמן להתגלות.",
  },
  {
    min: 12,
    max: 19,
    title: "עדיין מוקדם",
    emoji: "🌤",
    description:
      "יש פוטנציאל, אבל עדיין מוקדם מדי לדעת. ייתכן שהמפגשים היו קצרים מדי, או שאחד מכם עדיין לא פתוח לגמרי.",
    recommendation:
      "אל תסיק מסקנות מהר. אם יש משהו שמושך אותך — תן לזה עוד הזדמנות. אם לא — גם זו תשובה.",
  },
];

export const connectionScoreConfig: QuizConfig = {
  id: "connection-score",
  title: "ציון חיבור",
  subtitle: "מדידת עומק החיבור על 4 צירים",
  description:
    "12 שאלות שמודדות את עומק החיבור בינך לבין מישהו שאתה פוגש — על ארבעה צירים: אינטלקטואלי, רגשי, פיזי וערכי. עדיף למלא אחרי 2-3 מפגשים לפחות.",
  icon: "💯",

  questions: [
    // ── ציר אינטלקטואלי (q_i1, q_i2, q_i3) ──
    {
      id: "q_i1",
      text: "השיחות שלנו מעניינות אותי — אני לומד/ת משהו חדש או רואה דברים בצורה אחרת",
      type: "multiple-choice",
      axis: "intellectual",
      options: [
        { value: "1", label: "לא ממש — השיחות שטחיות ו/או חוזרות על עצמן" },
        { value: "2", label: "לפעמים — יש רגעים מעניינים אבל לא תמיד" },
        { value: "3", label: "לעיתים קרובות — השיחות שלנו מושכות את תשומת ליבי" },
        { value: "4", label: "כמעט תמיד — אני מרגיש/ת שמולי מישהו שמאתגר אותי לחשוב" },
      ],
    },
    {
      id: "q_i2",
      text: "אני מרגיש/ת שהאדם שמולי מכבד את הדעות שלי — גם כשאנחנו לא מסכימים",
      type: "multiple-choice",
      axis: "intellectual",
      options: [
        { value: "1", label: "לא — הוא/היא מפחית/ה ממה שאני אומר/ת או לא מקשיב/ה באמת" },
        { value: "2", label: "חלקית — לפעמים כן ולפעמים לא" },
        { value: "3", label: "כן ברוב המקרים — יש קשב וכבוד" },
        { value: "4", label: "בהחלט — הוא/היא גורם/ת לי להרגיש שדעתי חשובה" },
      ],
    },
    {
      id: "q_i3",
      text: "יש לנו נושאים שאנחנו יכולים לדבר עליהם שעות מבלי שייגמר לנו מה לומר",
      type: "multiple-choice",
      axis: "intellectual",
      options: [
        { value: "1", label: "לא — נגמר לנו חומר לדיבור לאחר זמן קצר" },
        { value: "2", label: "לפעמים — יש נושאים שזורמים אבל לא תמיד" },
        { value: "3", label: "כן — יש לנו כמה נושאים שאנחנו יכולים להתעמק בהם" },
        { value: "4", label: "ממש כן — השיח זורם באופן טבעי ועמוק" },
      ],
    },

    // ── ציר רגשי (q_e1, q_e2, q_e3) ──
    {
      id: "q_e1",
      text: "אני מרגיש/ת שאני יכול/ה להיות עצמי לגמרי מולו/מולה — בלי לשחק תפקיד",
      type: "multiple-choice",
      axis: "emotional",
      options: [
        { value: "1", label: "לא — אני מרגיש/ת שאני צריך/ה לסנן את עצמי" },
        { value: "2", label: "בחלקו — מסוים, אבל לא לגמרי" },
        { value: "3", label: "ברוב הזמן — יש רמה טובה של נוחות להיות עצמי" },
        { value: "4", label: "לחלוטין — אני מרגיש/ת בנוח גם עם הצדדים הפחות מושלמים שלי" },
      ],
    },
    {
      id: "q_e2",
      text: "האדם שמולי שם לב כשמשהו אצלי השתנה — גם בלי שאני אומר/ת דבר",
      type: "multiple-choice",
      axis: "emotional",
      options: [
        { value: "1", label: "לא — הוא/היא לא ממש שם/ה לב לאיך אני מרגיש/ת" },
        { value: "2", label: "לפעמים — מדי פעם הוא/היא מזהה/ה שמשהו אחר" },
        { value: "3", label: "לעיתים קרובות — יש תשומת לב לסטיות קטנות במצב הרוח שלי" },
        { value: "4", label: "כמעט תמיד — הוא/היא קולט/ת אותי לפני שאני צריך/ה להסביר" },
      ],
    },
    {
      id: "q_e3",
      text: "אחרי שאנחנו נפרדים — אני מרגיש/ת מועלה/ת ומחובר/ת, לא מרוקן/ת",
      type: "multiple-choice",
      axis: "emotional",
      options: [
        { value: "1", label: "לרוב מרוקן/ת — המפגשים מנקזים ממני אנרגיה" },
        { value: "2", label: "תלוי — לפעמים מלא/ה ולפעמים ריק/ה" },
        { value: "3", label: "לרוב מועלה/ת — אני יוצא/ת עם אנרגיה טובה" },
        { value: "4", label: "תמיד — המפגשים שלנו ממלאים אותי" },
      ],
    },

    // ── ציר פיזי (q_p1, q_p2, q_p3) ──
    {
      id: "q_p1",
      text: "יש משיכה פיזית שמורגשת — לא בהכרח עצימה, אבל נוכחת",
      type: "multiple-choice",
      axis: "physical",
      options: [
        { value: "1", label: "לא — אין משיכה פיזית מיוחדת" },
        { value: "2", label: "קצת — יש משהו, אבל לא בולט" },
        { value: "3", label: "כן — יש משיכה שאני מרגיש/ת אותה בבירור" },
        { value: "4", label: "ממש כן — יש כימיה פיזית ברורה ונעימה" },
      ],
    },
    {
      id: "q_p2",
      text: "מגע (גם קל — כמו נגיעה בכתף) מרגיש טבעי ולא מאולץ",
      type: "multiple-choice",
      axis: "physical",
      options: [
        { value: "1", label: "לא — מגע מרגיש מוזר או מאולץ" },
        { value: "2", label: "לפעמים — תלוי בסיטואציה" },
        { value: "3", label: "לרוב כן — יש נוחות עם קרבה פיזית" },
        { value: "4", label: "לגמרי — המגע זורם באופן טבעי וחם" },
      ],
    },
    {
      id: "q_p3",
      text: "אני מרגיש/ת נוח/ה עם הנוכחות הפיזית שלו/שלה — המרחב המשותף, הקצב, הסגנון",
      type: "multiple-choice",
      axis: "physical",
      options: [
        { value: "1", label: "לא ממש — יש תחושת אי-נוחות בנוכחות שלו/שלה" },
        { value: "2", label: "חלקית — יש היבטים שמרגישים נוח יותר מאחרים" },
        { value: "3", label: "כן — אני מרגיש/ת בנוח עם נוכחותו/נוכחותה" },
        { value: "4", label: "ממש כן — יש הרמוניה פיזית שמורגשת" },
      ],
    },

    // ── ציר ערכי (q_v1, q_v2, q_v3) ──
    {
      id: "q_v1",
      text: "כשמדברים על מה חשוב בחיים — יש תחושת יישור קו בסיסי",
      type: "multiple-choice",
      axis: "values",
      options: [
        { value: "1", label: "לא — הערכים שלנו שונים מאוד ביסוד" },
        { value: "2", label: "חלקית — יש כיווניות דומה אבל גם פערים משמעותיים" },
        { value: "3", label: "כן — יש יישור קו בנושאים החשובים לי" },
        { value: "4", label: "ממש כן — אני מרגיש/ת שאנחנו מדברים את אותה שפה" },
      ],
    },
    {
      id: "q_v2",
      text: "הדרך שבה הוא/היא מתייחס/ת לאנשים אחרים — משפחה, חברים, זרים — מתאימה לי",
      type: "multiple-choice",
      axis: "values",
      options: [
        { value: "1", label: "לא — יש דברים בהתנהגות שלו/שלה שמפריעים לי מאוד" },
        { value: "2", label: "בינוני — יש היבטים שמקובלים עליי ויש שלא" },
        { value: "3", label: "כן ברוב המקרים — אני מסכים/ה עם האופן שבו הוא/היא מתנהג/ת" },
        { value: "4", label: "ממש כן — אני מכבד/ת ומוקסם/ת מהאופן שבו הוא/היא בעולם" },
      ],
    },
    {
      id: "q_v3",
      text: "כשאני מדמיין/ת את העתיד — יש חפיפה בין מה שאני רוצה לבין מה שהוא/היא רוצה",
      type: "multiple-choice",
      axis: "values",
      options: [
        { value: "1", label: "לא — הכיוונים שלנו בחיים שונים מאוד" },
        { value: "2", label: "חלקית — יש כיוון דומה אבל גם פערים" },
        { value: "3", label: "כן — אני רואה פוטנציאל לחיים שהולכים בכיוון דומה" },
        { value: "4", label: "ממש כן — יש תחושת חפיפה ברורה בין החזון שלנו" },
      ],
    },
  ],

  axes: [
    {
      id: "intellectual",
      label: "אינטלקטואלי",
      description: "עומק השיחות, גירוי מחשבתי, כבוד הדדי לדעות",
      color: "#1E3A5F",
      maxScore: 4,
    },
    {
      id: "emotional",
      label: "רגשי",
      description: "נוחות לגלות, תחושת בטיחות, ראייה ושמיעה הדדית",
      color: "#E85D75",
      maxScore: 4,
    },
    {
      id: "physical",
      label: "פיזי",
      description: "משיכה, נוחות עם מגע ונוכחות, הרמוניה פיזית",
      color: "#D4A853",
      maxScore: 4,
    },
    {
      id: "values",
      label: "ערכי",
      description: "יישור קו בערכים, אורח חיים, חזון לעתיד",
      color: "#4A7C59",
      maxScore: 4,
    },
  ],

  resultRanges,

  computeScores(answers: Record<string, number | string>): Record<string, number> {
    const axisQuestions: Record<string, string[]> = {
      intellectual: ["q_i1", "q_i2", "q_i3"],
      emotional: ["q_e1", "q_e2", "q_e3"],
      physical: ["q_p1", "q_p2", "q_p3"],
      values: ["q_v1", "q_v2", "q_v3"],
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

    // Also compute total
    scores.total = Object.values(scores).reduce((sum, v) => sum + v, 0);

    return scores;
  },

  interpretResult(scores: Record<string, number>): QuizResultRange {
    const total = scores.total ?? Object.values(scores).reduce((sum, v) => sum + v, 0);

    const match = resultRanges.find((r) => total >= r.min && total <= r.max);
    if (match) return match;

    if (total < 12) return resultRanges[3];
    return resultRanges[0];
  },
};
