import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

// Commitment readiness axes:
// "emotional"   - מוכנות רגשית: האם אתה רגשית מוכן למחויבות
// "practical"   - מוכנות מעשית: כלים, חזון, יציבות לבניית קשר
// "relational"  - מוכנות זוגית: איכות הקשר הספציפי ויכולת ההיפתחות

const resultRanges: QuizResultRange[] = [
  {
    min: 1.0,
    max: 2.0,
    title: "עדיין בתהליך",
    emoji: "🌱",
    description:
      "אתה עדיין בתהליך של הכנה פנימית. זה לא אומר שאתה לא מוכן לזוגיות — אלא שיש עוד עבודה פנימית שתפוצח לפני ואחרי המחויבות.",
    recommendation:
      "חזרו לפרקים 1-3 של הספר — שם תמצאו את הבסיס להכנה הפנימית. מחויבות לא פותרת בעיות פנימיות, היא מגדילה אותן.",
  },
  {
    min: 2.1,
    max: 3.0,
    title: "בדרך למוכנות",
    emoji: "🚶",
    description:
      "יש לך בסיס טוב, אבל יש עוד שאלות פתוחות. ייתכן שחלק מהפחדים עדיין פועלים מהחסכים שלך, או שהכלים לבניית קשר עדיין מתפתחים.",
    recommendation:
      "שאלות פתוחות הן לא חולשה — הן כנות. המשיכו בתהליך, שוחחו עם הפרטנר על מה שעדיין לא ברור, ואל תמהרו לסגור.",
  },
  {
    min: 3.1,
    max: 4.0,
    title: "כמעט מוכן",
    emoji: "🔥",
    description:
      "אתה קרוב למוכנות אמיתית. יש לך בשלות רגשית, כלים מעשיים ויכולת היפתחות. מה שנשאר הוא לסמוך על מה שבנית.",
    recommendation:
      "הפחד לפני מחויבות הוא נורמלי ובריא. שאלות כמו 'האם זה האדם הנכון?' הן שאלות טובות — לא סימן שמשהו לא בסדר.",
  },
  {
    min: 4.1,
    max: 5.0,
    title: "מוכן למחויבות",
    emoji: "💍",
    description:
      "אתה מוכן. לא בוודאות מוחלטת — כי וודאות מוחלטת לא קיימת — אלא במוכנות אמיתית לבחור, לבנות ולהשקיע בקשר.",
    recommendation:
      "מחויבות היא לא רגש שמגיע יום אחד. היא החלטה. ואתה מוכן לקבל אותה. הצעד הבא הוא שיחה כנה עם הפרטנר — לא שאלת 'מה אנחנו?' אלא 'לאן אנחנו הולכים?'",
  },
];

export const commitmentReadinessConfig: QuizConfig = {
  id: "commitment-readiness",
  title: "שאלון מוכנות למחויבות",
  subtitle: "האם אתה מוכן להתחייב — או רק מפחד להיות לבד?",
  description:
    "לא כולם מוכנים למחויבות באותו הרגע. הבעיה מתחילה כשאתה לא מוכן, אבל מספר לעצמך שכן. 12 שאלות יעזרו לך להבחין בין מוכנות אמיתית לפחד. ענה בכנות — אין תשובות נכונות.",
  icon: "💍",

  questions: [
    // מוכנות רגשית
    {
      id: "cr1",
      text: "אני יכול/ה לשאת ספקות ולא לדעת ב-100% — ובכל זאת לבחור להישאר",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "emotional",
    },
    {
      id: "cr2",
      text: "כשאני מדמיין/ת את החיים עם הפרטנר הנוכחי/ה — אני מרגיש/ת תחושת בית, לא מלכודת",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "emotional",
    },
    {
      id: "cr3",
      text: "אני מסוגל/ת לבחור מישהו/י לא מפחד מבדידות, אלא כי אני רוצה אותו/ה בחיי",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "emotional",
    },
    {
      id: "cr4",
      text: "אני שלם/ה יחסית עם מי שאני כרגע — לא מחכה ל'גרסה משופרת' של עצמי לפני שמתחייב/ת",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "emotional",
    },
    // מוכנות מעשית
    {
      id: "cr5",
      text: "יש לי חזון ברור (גם אם גמיש) לחיים שאני רוצה לבנות — ואיפה פרטנר מתאים בתוך החזון הזה",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "practical",
    },
    {
      id: "cr6",
      text: "אני יודע/ת לנהל קונפליקטים בצורה שמחזקת את הקשר — לא מפחד/ת מוויכוחים",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "practical",
    },
    {
      id: "cr7",
      text: "אני מסוגל/ת לאחד את הצרכים שלי עם צרכי הפרטנר מבלי לוותר על ה'אני' שלי",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "practical",
    },
    {
      id: "cr8",
      text: "אני מוכן/ה להשקיע מאמץ גם בתקופות קשות — מחויבות היא לא רק לתקופות הטובות",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "practical",
    },
    // מוכנות זוגית
    {
      id: "cr9",
      text: "אני מרגיש/ת בטוח/ה ברמה הבסיסית עם הפרטנר — אין חרדת נטישה מתמדת",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "relational",
    },
    {
      id: "cr10",
      text: "אני יכול/ה לשתף את הפרטנר במה שמפחיד אותי — ולהרגיש שמקבלים אותי גם עם הפחדים",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "relational",
    },
    {
      id: "cr11",
      text: "כשאני מוחק/ת נפשית את הפרטנר ומדמיין/ת חיים בלעדיו/ה — אני מרגיש/ת אובדן אמיתי",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "relational",
    },
    {
      id: "cr12",
      text: "הערכים הבסיסיים שלנו — כיצד מגדלים ילדים, מה חשוב בחיים, כיצד מנהלים כסף — מספיק דומים לי",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "relational",
    },
  ],

  axes: [
    {
      id: "emotional",
      label: "מוכנות רגשית",
      description: "יכולת לשאת ספק, לבחור מתוך חיבור ולא מפחד, ולהיות שלם עם עצמך",
      color: "var(--primary)",
      maxScore: 5,
    },
    {
      id: "practical",
      label: "מוכנות מעשית",
      description: "חזון, כלים לניהול קונפליקטים, ויכולת לאחד צרכים",
      color: "var(--secondary)",
      maxScore: 5,
    },
    {
      id: "relational",
      label: "מוכנות זוגית",
      description: "איכות הקשר הספציפי, ביטחון, היפתחות ועמידה בערכים משותפים",
      color: "var(--accent)",
      maxScore: 5,
    },
  ],

  resultRanges,

  computeScores(answers: Record<string, number | string>): Record<string, number> {
    const axisQuestions: Record<string, string[]> = {
      emotional: ["cr1", "cr2", "cr3", "cr4"],
      practical: ["cr5", "cr6", "cr7", "cr8"],
      relational: ["cr9", "cr10", "cr11", "cr12"],
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

    const ranges: QuizResultRange[] = [
      {
        min: 1.0,
        max: 2.0,
        title: "עדיין בתהליך",
        emoji: "🌱",
        description:
          "אתה עדיין בתהליך של הכנה פנימית. זה לא אומר שאתה לא מוכן לזוגיות — אלא שיש עוד עבודה פנימית שתפוצח לפני ואחרי המחויבות.",
        recommendation:
          "חזרו לפרקים 1-3 של הספר — שם תמצאו את הבסיס להכנה הפנימית. מחויבות לא פותרת בעיות פנימיות, היא מגדילה אותן.",
      },
      {
        min: 2.1,
        max: 3.0,
        title: "בדרך למוכנות",
        emoji: "🚶",
        description:
          "יש לך בסיס טוב, אבל יש עוד שאלות פתוחות. ייתכן שחלק מהפחדים עדיין פועלים מהחסכים שלך, או שהכלים לבניית קשר עדיין מתפתחים.",
        recommendation:
          "שאלות פתוחות הן לא חולשה — הן כנות. המשיכו בתהליך, שוחחו עם הפרטנר על מה שעדיין לא ברור, ואל תמהרו לסגור.",
      },
      {
        min: 3.1,
        max: 4.0,
        title: "כמעט מוכן",
        emoji: "🔥",
        description:
          "אתה קרוב למוכנות אמיתית. יש לך בשלות רגשית, כלים מעשיים ויכולת היפתחות. מה שנשאר הוא לסמוך על מה שבנית.",
        recommendation:
          "הפחד לפני מחויבות הוא נורמלי ובריא. שאלות כמו 'האם זה האדם הנכון?' הן שאלות טובות — לא סימן שמשהו לא בסדר.",
      },
      {
        min: 4.1,
        max: 5.0,
        title: "מוכן למחויבות",
        emoji: "💍",
        description:
          "אתה מוכן. לא בוודאות מוחלטת — כי וודאות מוחלטת לא קיימת — אלא במוכנות אמיתית לבחור, לבנות ולהשקיע בקשר.",
        recommendation:
          "מחויבות היא לא רגש שמגיע יום אחד. היא החלטה. ואתה מוכן לקבל אותה. הצעד הבא הוא שיחה כנה עם הפרטנר — לא שאלת 'מה אנחנו?' אלא 'לאן אנחנו הולכים?'",
      },
    ];

    const match = ranges.find((r) => average >= r.min && average <= r.max);
    if (match) return match;
    if (average < 1.0) return ranges[0];
    return ranges[ranges.length - 1];
  },
};
