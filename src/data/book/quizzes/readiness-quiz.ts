import type { QuizConfig, QuizResultRange } from "@/lib/quiz-types";

export const readinessQuizConfig: QuizConfig = {
  id: "readiness-quiz",
  title: "שאלון מוכנות",
  subtitle: "איפה אתה עומד לפני שמתחילים",
  description:
    "10 שאלות שיעזרו לך להבין את רמת המוכנות שלך לזוגיות — לפני שנצא יחד לדרך. ענה בכנות, אין תשובות נכונות ולא נכונות.",
  icon: "📋",

  questions: [
    {
      id: "q1",
      text: "אני יודע/ת מה באמת חשוב לי בזוגיות — מעבר לרשימה שטחית של תכונות",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "self-awareness",
    },
    {
      id: "q2",
      text: "אני מסוגל/ת לזהות את הרגשות שלי ולתת להם מקום, גם כשזה לא נוח",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "emotional-openness",
    },
    {
      id: "q3",
      text: "כשאני יוצא/ת לדייט, אני יודע/ת לנהל שיחה שיוצרת חיבור אמיתי",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "practical-skills",
    },
    {
      id: "q4",
      text: "אני לא נבהל/ת מדחייה — אני מבין/ה שזה חלק מהתהליך",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "courage-action",
    },
    {
      id: "q5",
      text: "אני מוכן/ה להתפשר על דברים שפחות חשובים כדי לבנות קשר אמיתי",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "relationship-readiness",
    },
    {
      id: "q6",
      text: "אני מכיר/ה את הדפוסים שחוזרים אצלי בזוגיות ויודע/ת לזהות אותם",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "self-awareness",
    },
    {
      id: "q7",
      text: "אני יכול/ה לשתף מישהו במה שמפחיד אותי בלי להרגיש שאני חלש/ה",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "emotional-openness",
    },
    {
      id: "q8",
      text: "אני יודע/ת להציב גבולות בריאים בלי להרגיש אשם/ה",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "practical-skills",
    },
    {
      id: "q9",
      text: "אני יוזם/ת באופן פעיל מפגשים ולא רק מחכה שדברים יקרו",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "courage-action",
    },
    {
      id: "q10",
      text: "אני מרגיש/ה שהגיע הזמן לבנות משהו אמיתי, ואני מוכן/ה להשקיע בזה",
      type: "scale",
      scaleMin: 1,
      scaleMax: 5,
      scaleMinLabel: "לא מתאר אותי בכלל",
      scaleMaxLabel: "מתאר אותי בדיוק",
      axis: "relationship-readiness",
    },
  ],

  axes: [
    {
      id: "self-awareness",
      label: "הכרה עצמית",
      description: "עד כמה אתה מכיר את עצמך, את הדפוסים שלך ואת הצרכים שלך",
      color: "var(--primary)",
      maxScore: 5,
    },
    {
      id: "emotional-openness",
      label: "פתיחות רגשית",
      description: "הנכונות להיות פגיע, לבטא רגשות ולשתף במה שמפחיד",
      color: "var(--secondary)",
      maxScore: 5,
    },
    {
      id: "practical-skills",
      label: "כלים מעשיים",
      description: "מיומנויות תקשורת, דייטים וניהול קונפליקטים",
      color: "var(--accent)",
      maxScore: 5,
    },
    {
      id: "courage-action",
      label: "אומץ ופעולה",
      description: "נטילת יוזמה, התמודדות עם פחדים ויציאה לשטח",
      color: "var(--chart-4)",
      maxScore: 5,
    },
    {
      id: "relationship-readiness",
      label: "מוכנות לקשר",
      description: "מוכנות כוללת למחויבות, אינטימיות ובניית משהו אמיתי",
      color: "var(--chart-5)",
      maxScore: 5,
    },
  ],

  resultRanges: [
    {
      min: 1.0,
      max: 2.0,
      title: "בתחילת הדרך",
      emoji: "🌱",
      description:
        "אתה בנקודת התחלה חשובה. הספר הזה מתחיל בדיוק מאיפה שאתה עומד.",
      recommendation:
        "התחל מפרק 1 — ׳הסיפור שאתה מספר לעצמך׳. שם מתחיל הכל.",
    },
    {
      min: 2.1,
      max: 3.0,
      title: "בדרך",
      emoji: "🚶",
      description:
        "יש לך בסיס טוב, אבל יש עוד מקום לצמוח. הפרקים הראשונים יעזרו לך לחזק את היסודות.",
      recommendation:
        "שים לב במיוחד לפרקים 2-4 — הם ידעו לחדד את מה שכבר קיים אצלך.",
    },
    {
      min: 3.1,
      max: 4.0,
      title: "כמעט שם",
      emoji: "🔥",
      description:
        "אתה במקום טוב! הספר יעזור לך לחדד את הכלים ולצאת לשטח בביטחון.",
      recommendation:
        "פרקים 5-9 הם שלך — יש לך בשלות, עכשיו צריך רק לחדד את הביצוע.",
    },
    {
      min: 4.1,
      max: 5.0,
      title: "מוכן לדרך",
      emoji: "🚀",
      description:
        "אתה מוכן! עכשיו צריך רק את הכלים הנכונים להגיע לשם.",
      recommendation:
        "קפוץ ישר לפרקים 7-10 — שם תמצא את הכלים המתקדמים שאתה מחפש.",
    },
  ],

  computeScores(answers: Record<string, number | string>): Record<string, number> {
    const axisQuestions: Record<string, string[]> = {
      "self-awareness": ["q1", "q6"],
      "emotional-openness": ["q2", "q7"],
      "practical-skills": ["q3", "q8"],
      "courage-action": ["q4", "q9"],
      "relationship-readiness": ["q5", "q10"],
    };

    const scores: Record<string, number> = {};

    for (const [axisId, questionIds] of Object.entries(axisQuestions)) {
      const values = questionIds
        .map((qId) => {
          const val = answers[qId];
          return typeof val === "number" ? val : Number(val);
        })
        .filter((v) => !isNaN(v) && v > 0);

      scores[axisId] = values.length > 0
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
        title: "בתחילת הדרך",
        emoji: "🌱",
        description:
          "אתה בנקודת התחלה חשובה. הספר הזה מתחיל בדיוק מאיפה שאתה עומד.",
        recommendation:
          "התחל מפרק 1 — ׳הסיפור שאתה מספר לעצמך׳. שם מתחיל הכל.",
      },
      {
        min: 2.1,
        max: 3.0,
        title: "בדרך",
        emoji: "🚶",
        description:
          "יש לך בסיס טוב, אבל יש עוד מקום לצמוח. הפרקים הראשונים יעזרו לך לחזק את היסודות.",
        recommendation:
          "שים לב במיוחד לפרקים 2-4 — הם ידעו לחדד את מה שכבר קיים אצלך.",
      },
      {
        min: 3.1,
        max: 4.0,
        title: "כמעט שם",
        emoji: "🔥",
        description:
          "אתה במקום טוב! הספר יעזור לך לחדד את הכלים ולצאת לשטח בביטחון.",
        recommendation:
          "פרקים 5-9 הם שלך — יש לך בשלות, עכשיו צריך רק לחדד את הביצוע.",
      },
      {
        min: 4.1,
        max: 5.0,
        title: "מוכן לדרך",
        emoji: "🚀",
        description:
          "אתה מוכן! עכשיו צריך רק את הכלים הנכונים להגיע לשם.",
        recommendation:
          "קפוץ ישר לפרקים 7-10 — שם תמצא את הכלים המתקדמים שאתה מחפש.",
      },
    ];

    const match = ranges.find((r) => average >= r.min && average <= r.max);

    if (match) return match;

    // Fallback: return the closest range
    if (average < 1.0) return ranges[0];
    return ranges[ranges.length - 1];
  },
};
