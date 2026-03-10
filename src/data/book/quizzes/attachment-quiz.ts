import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

// Result range indices for 2-axis attachment model:
// 0 = Secure        (low anxiety,  low avoidance)
// 1 = Anxious       (high anxiety, low avoidance)
// 2 = Avoidant      (low anxiety,  high avoidance)
// 3 = Fearful       (high anxiety, high avoidance)
const ANXIETY_THRESHOLD = 3;
const AVOIDANCE_THRESHOLD = 3;

const resultRanges: QuizResultRange[] = [
  {
    // index 0 — Secure
    min: 0,
    max: 0,
    title: "סגנון בטוח",
    emoji: "💚",
    description:
      "יש לך בסיס יציב! אתה מרגיש בנוח עם קרבה וגם עם עצמאות. אתה מסוגל לתת אמון ולא מפחד מפגיעות. זה הבסיס הכי חזק לזוגיות בריאה.",
    recommendation:
      "המשך לפרק 6 — הכלים שתלמד שם יעזרו לך לשמר את הביטחון הזה גם כשהקשר מתעמק.",
  },
  {
    // index 1 — Anxious
    min: 1,
    max: 1,
    title: "סגנון חרדתי",
    emoji: "💛",
    description:
      "אתה משתוקק לקרבה ולחיבור עמוק, אבל לפעמים החרדה מגירוי מופרז גורמת לך לדחוף יותר מדי חזק. זה לא חולשה — זה פשוט אומר שאתה צריך ללמוד לווסת את הצורך הזה.",
    recommendation:
      "פרקים 2 ו-4 בספר נכתבו בדיוק בשבילך — הם מלמדים לזהות את הדפוסים האלה ולעבוד איתם.",
  },
  {
    // index 2 — Avoidant
    min: 2,
    max: 2,
    title: "סגנון נמנע",
    emoji: "🧊",
    description:
      "אתה מרגיש חזק ועצמאי, אבל לפעמים הקושי להתחבר רגשית מרחיק ממך את מה שאתה באמת רוצה. ההימנעות היא מנגנון הגנה — והספר יעזור לך להוריד אותו בזהירות.",
    recommendation:
      "פרק 4 (האומץ להיות אתה) ופרק 12 (אינטימיות ופגיעות) הם המפתח שלך.",
  },
  {
    // index 3 — Fearful-Avoidant
    min: 3,
    max: 3,
    title: "סגנון חרדתי-נמנע",
    emoji: "🔴",
    description:
      "אתה רוצה קרבה אבל גם מפחד ממנה — וזה יוצר מעגל מתסכל של התקרבות-התרחקות. זה לא אומר שאתה 'שבור' — זה אומר שיש עבודה חשובה לעשות, והספר ילווה אותך בה.",
    recommendation:
      "התחל מפרק 1 (הסיפורים שאתה מספר לעצמך) — הבנת השורשים היא הצעד הראשון.",
  },
];

export const attachmentQuizConfig: QuizConfig = {
  id: "attachment-quiz",
  title: "שאלון סגנון התקשרות",
  subtitle: "20 שאלות לזיהוי סגנון ההתקשרות שלך",
  description:
    "שאלון זה מבוסס על תיאוריית ההתקשרות (Bowlby / Hazan & Shaver) ומודד שני צירים: חרדה והימנעות. יחד הם מגדירים את אחד מארבעת סגנונות ההתקשרות.",
  icon: "🔗",
  questions: [
    // ── Anxiety axis (questions 1–10) ──
    {
      id: "a1",
      text: "אני דואג/ת שבן/בת הזוג שלי לא באמת אוהב/ת אותי",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a2",
      text: "אני צריך/ה הרבה אישורים וביטויי חיבה מבן/בת הזוג",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a3",
      text: "כשבן/בת הזוג לא עונה לי מהר, אני מתחיל/ה לדאוג",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a4",
      text: "אני חושש/ת שברגע שמישהו יכיר אותי באמת — הוא ירצה לעזוב",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a5",
      text: "אחרי ריב, אני לא מצליח/ה להירגע עד שהכל מסתדר",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a6",
      text: "אני נוטה לקנא ולהרגיש מאוים/ת כשבן/בת הזוג מבלה עם אחרים",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a7",
      text: "אני מרגיש/ה שאני רוצה יותר קרבה ממה שבן/בת הזוג שלי מוכן/ה לתת",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a8",
      text: "מחשבות על פרידה גורמות לי חרדה חזקה",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a9",
      text: "אני נוטה לפרש דברים קטנים כסימן שמשהו לא בסדר בקשר",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },
    {
      id: "a10",
      text: "כשאני לבד, אני מרגיש/ה חוסר שקט עד שאני מדבר/ת עם בן/בת הזוג",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "anxiety",
    },

    // ── Avoidance axis (questions 11–20) ──
    {
      id: "av1",
      text: "אני מעדיף/ה לשמור מרחק רגשי גם בקשר קרוב",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av2",
      text: "קשה לי לבקש עזרה, גם מבן/בת הזוג הכי קרוב/ה",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av3",
      text: "אני מרגיש/ה לא בנוח כשמישהו מתקרב אליי רגשית מדי מהר",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av4",
      text: "אני מעדיף/ה לפתור בעיות לבד מאשר לדבר עליהן",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av5",
      text: "כשהקשר נהיה רציני מדי, משהו בי רוצה לברוח",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av6",
      text: "אני שומר/ת את הרגשות העמוקים שלי לעצמי",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av7",
      text: "אני מעריך/ה עצמאות מעל הכל — גם בזוגיות",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av8",
      text: "כשבן/בת הזוג מבקש/ת יותר קרבה, אני נוטה להתרחק",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av9",
      text: "אני לא מרגיש/ה צורך חזק להיות בזוגיות",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
    {
      id: "av10",
      text: "קל לי יותר להראות אהבה במעשים מאשר במילים",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מסכים/ה בכלל",
      scaleMaxLabel: "מסכים/ה לחלוטין",
      axis: "avoidance",
    },
  ],
  axes: [
    {
      id: "anxiety",
      label: "חרדה",
      description: "פחד מנטישה, צורך באישורים, דאגה לגבי רגשות בן/בת הזוג",
      color: "#E85D75",
      maxScore: 5,
    },
    {
      id: "avoidance",
      label: "הימנעות",
      description: "אי-נוחות עם קרבה, צורך בעצמאות, דיכוי רגשות",
      color: "#1E3A5F",
      maxScore: 5,
    },
  ],
  resultRanges,
  computeScores(answers) {
    const anxietyIds = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"];
    const avoidanceIds = ["av1", "av2", "av3", "av4", "av5", "av6", "av7", "av8", "av9", "av10"];

    const sum = (ids: string[]) =>
      ids.reduce((acc, id) => acc + (Number(answers[id]) || 0), 0);

    const anxietyScore = sum(anxietyIds) / anxietyIds.length;
    const avoidanceScore = sum(avoidanceIds) / avoidanceIds.length;

    return { anxiety: anxietyScore, avoidance: avoidanceScore };
  },
  interpretResult(scores) {
    const highAnxiety = (scores.anxiety ?? 0) > ANXIETY_THRESHOLD;
    const highAvoidance = (scores.avoidance ?? 0) > AVOIDANCE_THRESHOLD;

    if (!highAnxiety && !highAvoidance) return resultRanges[0]; // Secure
    if (highAnxiety && !highAvoidance) return resultRanges[1];  // Anxious
    if (!highAnxiety && highAvoidance) return resultRanges[2];  // Avoidant
    return resultRanges[3];                                      // Fearful-Avoidant
  },
};
