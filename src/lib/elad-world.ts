/**
 * "העולם של אלעד" — קישורי הקהילה הרשמיים בוואטסאפ.
 *
 * מקור-אמת יחיד (SITES-CONTRACT: אין לינקים inline ב-JSX — מייבאים מכאן).
 * הקישורים נמסרו ע"י אלעד ב-22.6.2026 ואומתו חיים ב-5.7.2026 (HTTP 200).
 * לעדכון: לשנות כאן בלבד.
 */
export const ELAD_WORLD = {
  /** הקהילה — ההצטרפות הראשית, פתוחה לכולם בחינם */
  community: {
    href: "https://chat.whatsapp.com/LXBiFc545av4K2Dtyj2eee",
    label: "קהילת “העולם של אלעד”",
    description: "הבית הפתוח — הצטרפות חופשית, בחינם",
  },
  /** קבוצת הדיונים — שיחה פעילה */
  discussion: {
    href: "https://chat.whatsapp.com/E4f9M7qQcfN1iZalOp7IDj",
    label: "קבוצת הדיונים",
    description: "לשאול, לשתף ולדבר — שיחה פתוחה",
  },
  /** הערוץ — עדכונים בלבד (broadcast) */
  channel: {
    href: "https://whatsapp.com/channel/0029VbD5m4bG3R3iF7oZk10E",
    label: "הערוץ — עדכונים",
    description: "לעקוב בשקט — רק עדכונים, בלי רעש",
  },
} as const;

export type EladWorldLink = (typeof ELAD_WORLD)[keyof typeof ELAD_WORLD];
