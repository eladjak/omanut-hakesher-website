import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

// Attraction axes:
// "surface" - שטח: מה מושך אותך מבחוץ (מראה, סטייל, רושם ראשוני)
// "depth"   - עומק: מה מושך אותך בפנים (אישיות, הומור, אינטליגנציה, ערכים)
// "core"    - ליבה: מה מושך אותך בעומק (בטחון רגשי, פגיעות, אותנטיות, צמיחה)

const resultRanges: QuizResultRange[] = [
  {
    // index 0 — Surface-dominant
    min: 0,
    max: 0,
    title: "משיכת שטח",
    emoji: "✨",
    description:
      "אתה מושך בעיקר על ידי מה שאפשר לראות ולחוש מיד — מראה, נוכחות, אנרגיה ראשונית. זה טבעי לחלוטין, אבל לפעמים זה גורם לך לפספס אנשים מעולים שהמשיכה אליהם מגיעה אחרי שמכירים אותם.",
    recommendation:
      "נסה לתת לפחות שלושה פגישות לפני שאתה מחליט. ברוב הקשרים הטובים ביותר המשיכה גדלה עם הזמן.",
  },
  {
    // index 1 — Depth-dominant
    min: 1,
    max: 1,
    title: "משיכת עומק",
    emoji: "🧠",
    description:
      "אתה נמשך בעיקר לאישיות, לשכל, לחוש ההומור ולערכים המשותפים. אתה יודע שמה שנמצא מתחת לפני השטח הוא מה שחשוב באמת — וזה כוח. הסכנה היא להזניח לגמרי את הצד הפיזי או הרגשי.",
    recommendation:
      "זכור שמשיכה שלמה מורכבת משלושה שכבות. תן מקום גם לשכבת הליבה — הבטחון הרגשי הוא מה שמחזיק קשר לאורך זמן.",
  },
  {
    // index 2 — Core-dominant
    min: 2,
    max: 2,
    title: "משיכת ליבה",
    emoji: "❤️",
    description:
      "אתה נמשך בעיקר לאנשים שנותנים לך להרגיש בטוח, מוכל ומובן. אתה מחפש מישהו שמסוגל להיות אמיתי איתך — ולתת לך להיות אמיתי איתו. זו רמת משיכה עמוקה ובוגרת מאוד.",
    recommendation:
      "הכוח שלך הוא שאתה יודע מה חשוב. שים לב שאתה לא מוותר על שכבות השטח והעומק — גם הן חלק מהסיפור השלם.",
  },
  {
    // index 3 — Balanced
    min: 3,
    max: 3,
    title: "משיכה מאוזנת",
    emoji: "⚖️",
    description:
      "יש לך משיכה מאוזנת — אתה רגיש לשלושת השכבות: מראה, אישיות ובטחון רגשי. זה מעיד על בגרות רגשית ועל כך שאתה יודע מה אתה מחפש ב-360 מעלות.",
    recommendation:
      "הכוח שלך הוא שלמות. המשך לבנות על הבסיס הזה — ובזמן ההיכרויות, שאל את עצמך בכל פגישה: מה התחזק?",
  },
];

export const attractionMapConfig: QuizConfig = {
  id: "attraction-map",
  title: "מפת המשיכה",
  subtitle: "מה באמת מושך אותך — בשלוש שכבות",
  description:
    "רוב האנשים חושבים שהם יודעים מה מושך אותם. אבל המשיכה עובדת בשלוש שכבות — ורוב הזמן אנחנו לא מודעים לאיזו שכבה שולטת. 12 שאלות שיגלו לך את מפת המשיכה האישית שלך.",
  icon: "🧲",

  questions: [
    // ── Level 1: שטח (Surface) — questions 1–4 ──
    {
      id: "s1",
      text: "כשאתה פוגש מישהו לראשונה, מה הדבר הראשון שגורם לך לרצות להמשיך את השיחה?",
      type: "multiple-choice",
      axis: "surface",
      options: [
        { value: "surface", label: "מראה מושך — יש משהו שמשך את העין שלי מיד" },
        { value: "depth", label: "משהו בסגנון שלו שגרם לי לחשוב 'זה מעניין'" },
        { value: "core", label: "הוא/היא נראה/ת רגוע/ה ואמיתי/ת — זה מרגיע אותי" },
        { value: "balanced", label: "שילוב של כמה דברים ביחד" },
      ],
    },
    {
      id: "s2",
      text: "תאר/י פגישה שבה הרגשת משיכה חזקה מאוד. מה הכי בלט בה?",
      type: "multiple-choice",
      axis: "surface",
      options: [
        { value: "surface", label: "משהו ויזואלי — שפת גוף, עיניים, חיוך, נוכחות פיזית" },
        { value: "depth", label: "שיחה שזרמה — הומור, עומק, תחושת 'הוא מבין אותי'" },
        { value: "core", label: "הרגשתי בטוח/ה להיות עצמי/ת — ללא שיפוטיות" },
        { value: "balanced", label: "הכל הרגיש נכון — קשה לנפק" },
      ],
    },
    {
      id: "s3",
      text: "אפליקציות היכרויות: מה מביא אותך ללחוץ 'לייק' על פרופיל?",
      type: "multiple-choice",
      axis: "surface",
      options: [
        { value: "surface", label: "התמונות — הראשונה קבעה הכל" },
        { value: "depth", label: "הביו — כמה שורות שגרמו לי לחייך או לחשוב" },
        { value: "core", label: "תחושה שמאחורי הפרופיל יש מישהו אמיתי, לא מבויים" },
        { value: "balanced", label: "שילוב של תמונה טובה וטקסט מעניין" },
      ],
    },
    {
      id: "s4",
      text: "מה יגרום לך להפסיק להתעניין במישהו אחרי פגישה ראשונה?",
      type: "multiple-choice",
      axis: "surface",
      options: [
        { value: "surface", label: "בעיה פיזית שלא צפיתי — קושי עם מראה, ניקיון, סגנון" },
        { value: "depth", label: "שיחה שהרגישה ריקה — אין עומק, הומור, עניין" },
        { value: "core", label: "הרגשתי שהוא/היא משחק/ת תפקיד — לא אמיתי/ת" },
        { value: "balanced", label: "פשוט לא הרגשתי כלום — אין ניצוץ" },
      ],
    },

    // ── Level 2: עומק (Depth) — questions 5–8 ──
    {
      id: "d1",
      text: "מה גורם לך לחשוב על מישהו שוב ושוב אחרי שפגשתם?",
      type: "multiple-choice",
      axis: "depth",
      options: [
        { value: "surface", label: "המראה שלו/ה נשאר לי בראש — תמונה שמחזיקה" },
        { value: "depth", label: "משהו שאמר/ה — רעיון, בדיחה, תובנה שנשארה איתי" },
        { value: "core", label: "אני חושב/ת על הרגשות שהיו לי כשהיינו ביחד" },
        { value: "balanced", label: "החבילה כולה — קשה לנפק גורם יחיד" },
      ],
    },
    {
      id: "d2",
      text: "מה הדבר שהכי מדליק אותך בשיחה עם מישהו שאתה/את נמשך/ת אליו/ה?",
      type: "multiple-choice",
      axis: "depth",
      options: [
        { value: "surface", label: "כשהוא/היא מסתכל/ת ישירות בעיניים ומחייך/ת" },
        { value: "depth", label: "כשהוא/היא אומר/ת משהו חכם, מצחיק או מפתיע" },
        { value: "core", label: "כשמרגיש/ה שהוא/היא אמיתי/ת — שאפשר לסמוך" },
        { value: "balanced", label: "כשהשיחה זורמת ולא צריך לדחוף" },
      ],
    },
    {
      id: "d3",
      text: "מה יגרום לך לרצות דייט שני?",
      type: "multiple-choice",
      axis: "depth",
      options: [
        { value: "surface", label: "שיהיה פיזית יותר מושך/ת ממה שציפיתי" },
        { value: "depth", label: "שהייתה שיחה שגרמה לי לחשוב — ולרצות לדעת עוד" },
        { value: "core", label: "שהרגשתי שאני יכול/ה להיות עצמי/ת לגמרי" },
        { value: "balanced", label: "שהרגשתי שמשהו כאן שווה לחקור" },
      ],
    },
    {
      id: "d4",
      text: "בן/בת הזוג האידיאלי/ת שלך — מה מבדיל אותו/ה מכולם?",
      type: "multiple-choice",
      axis: "depth",
      options: [
        { value: "surface", label: "נוכחות פיזית שגורמת לי להרגיש גאה/ה לצידו/ה" },
        { value: "depth", label: "שכל, הומור, ויכולת לדבר על כל נושא בעולם" },
        { value: "core", label: "שמקבל/ת אותי כמו שאני — גם את החלקים הפחות יפים" },
        { value: "balanced", label: "שאני נמשך/ת אליו/ה בכל הרמות" },
      ],
    },

    // ── Level 3: ליבה (Core) — questions 9–12 ──
    {
      id: "c1",
      text: "מה הדבר שהכי חסר לך בקשרים שלא עבדו?",
      type: "multiple-choice",
      axis: "core",
      options: [
        { value: "surface", label: "משיכה פיזית — הייתה חברות אבל לא ניצוץ" },
        { value: "depth", label: "עומק — השיחות היו שטחיות, אף אחד לא באמת הכיר את השני" },
        { value: "core", label: "בטחון — תמיד הרגשתי שאני צריך/ה להיות מישהו אחר" },
        { value: "balanced", label: "שילוב של כמה גורמים ביחד" },
      ],
    },
    {
      id: "c2",
      text: "כשאתה/את מדמיין/ת זוגיות ארוכת טווח, מה הדבר החשוב לך ביותר?",
      type: "multiple-choice",
      axis: "core",
      options: [
        { value: "surface", label: "שיהיה משיכה פיזית גם אחרי שנים — לא רק חברות" },
        { value: "depth", label: "שנוכל לדבר שעות — ולא נשתעמם לעולם" },
        { value: "core", label: "שאוכל להיות לגמרי עצמי/ת — גם ביומות הרעים" },
        { value: "balanced", label: "שיהיה גם משיכה, גם שיחה, גם בטחון" },
      ],
    },
    {
      id: "c3",
      text: "מתי הרגשת הכי חזק שאתה/את נמשך/ת למישהו?",
      type: "multiple-choice",
      axis: "core",
      options: [
        { value: "surface", label: "ברגע שראיתי אותו/ה — קודם כל הייתה משיכה פיזית" },
        { value: "depth", label: "כשגיליתי שיש לו/ה עולם פנימי עשיר — אחרי שיחה ארוכה" },
        { value: "core", label: "כשהוא/היא שיתף/ה משהו אמיתי ופגיע — ולא הרגשתי שפוטים" },
        { value: "balanced", label: "זה היה תהליך — כל פגישה הוסיפה שכבה" },
      ],
    },
    {
      id: "c4",
      text: "מה ה'בדיקה' שאתה/את עושה — בין מודע לבין לא — כדי לדעת אם מישהו מתאים לך?",
      type: "multiple-choice",
      axis: "core",
      options: [
        { value: "surface", label: "איך הוא/היא נראה/ת בסיטואציות שונות — לא רק בדייט" },
        { value: "depth", label: "איך הוא/היא מגיב/ה כשאני אומר/ת משהו שנוי במחלוקת" },
        { value: "core", label: "האם אני מרגיש/ה בנוח לשתף איתו/ה דבר שמבייש אותי" },
        { value: "balanced", label: "בודק/ת כמה שיותר — בסיטואציות שונות לאורך זמן" },
      ],
    },
  ],

  axes: [
    {
      id: "surface",
      label: "שטח",
      description:
        "משיכה ויזואלית ופיזית — מראה, נוכחות, שפת גוף, רושם ראשוני. מהירה, אינסטינקטיבית, ומשפיעה מאוד על ה'קליק' הראשון.",
      color: "#E85D75",
      maxScore: 12,
    },
    {
      id: "depth",
      label: "עומק",
      description:
        "משיכה לאישיות, לשכל, לחוש ההומור ולערכים משותפים. מתפתחת עם ההכרות ויוצרת את ה'כימיה' הנפשית.",
      color: "#1E3A5F",
      maxScore: 12,
    },
    {
      id: "core",
      label: "ליבה",
      description:
        "משיכה לבטחון רגשי, לאותנטיות ולמרחב שבו אפשר להיות עצמי. נדירה ביותר, ומה שמחזיק קשר לאורך שנים.",
      color: "#D4A853",
      maxScore: 12,
    },
  ],

  resultRanges,

  computeScores(answers: Record<string, number | string>): Record<string, number> {
    const questionIds = ["s1", "s2", "s3", "s4", "d1", "d2", "d3", "d4", "c1", "c2", "c3", "c4"];

    const scores: Record<string, number> = { surface: 0, depth: 0, core: 0 };

    for (const qId of questionIds) {
      const val = answers[qId];
      if (typeof val === "string" && val in scores) {
        scores[val] = (scores[val] ?? 0) + 3;
      }
    }

    return scores;
  },

  interpretResult(scores: Record<string, number>): QuizResultRange {
    const surface = scores.surface ?? 0;
    const depth = scores.depth ?? 0;
    const core = scores.core ?? 0;
    const total = surface + depth + core;

    // Balanced: no single axis exceeds 50% of total
    if (total > 0 && surface <= total * 0.5 && depth <= total * 0.5 && core <= total * 0.5) {
      return resultRanges[3]; // Balanced
    }

    // Dominant axis
    if (surface >= depth && surface >= core) return resultRanges[0]; // Surface
    if (depth >= surface && depth >= core) return resultRanges[1];  // Depth
    return resultRanges[2];                                          // Core
  },
};
