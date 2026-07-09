/**
 * Lead-magnet → Rav-Messer mapping.
 * Single source of truth for: which list each magnet feeds, what asset URL to
 * deliver, what tags to apply for downstream sequence triggering.
 *
 * Strategy: ALL lead-magnet subscribers go to the main 'omanut-hakesher' list
 * (22958) so a single newsletter send reaches everyone. Per-magnet segmentation
 * is via tags, not separate lists. This keeps unsubscribe semantics clean.
 *
 * The Rav-Messer list IDs come from the content-studio brand-list mapping
 * (account 1001688). If those IDs change, update both projects.
 */

export interface LeadMagnetConfig {
  slug: string
  /** Hebrew label, used in welcome email subjects + admin ops */
  titleHe: string
  /** Rav-Messer list to subscribe to */
  listId: number
  /** Tags applied on subscription — drives segmentation + automation */
  tags: string[]
  /** Public asset URL (PDF / page) the subscriber gets after confirming */
  assetUrl: string
  /** Welcome email subject (optional — Resend send) */
  welcomeSubject: string
}

/** Master list for omanut-hakesher (Rav-Messer account 1001688). */
const OMANUT_HAKESHER_LIST_ID = 22958

export const LEAD_MAGNETS: Record<string, LeadMagnetConfig> = {
  '23-reasons': {
    slug: '23-reasons',
    titleHe: '23 הסיבות שאתה עדיין רווק/ה',
    listId: OMANUT_HAKESHER_LIST_ID,
    tags: ['lead-magnet', 'lead:23-reasons', 'source:website'],
    assetUrl: 'https://omanut-hakesher.co.il/lead/23-reasons/download',
    welcomeSubject: 'המדריך שלך מוכן: 23 הסיבות שאתה עדיין רווק/ה',
  },
  '7-principles': {
    slug: '7-principles',
    titleHe: '7 עקרונות הזהב למציאת זוגיות',
    listId: OMANUT_HAKESHER_LIST_ID,
    tags: ['lead-magnet', 'lead:7-principles', 'source:website'],
    assetUrl: 'https://omanut-hakesher.co.il/lead/7-principles/download',
    welcomeSubject: 'המדריך שלך מוכן: 7 עקרונות הזהב למציאת זוגיות',
  },
  '36-questions': {
    slug: '36-questions',
    titleHe: '36 השאלות שיכולות ליצור אהבה',
    listId: OMANUT_HAKESHER_LIST_ID,
    tags: ['lead-magnet', 'lead:36-questions', 'source:website'],
    assetUrl: 'https://omanut-hakesher.co.il/lead/36-questions/download',
    welcomeSubject: 'המדריך שלך מוכן: 36 השאלות שיכולות ליצור אהבה',
  },
  // --- Salvaged 2026-07-09 from worktrees bold-leavitt-80e5cc + hardcore-hoover-5e3797 ---
  courage: {
    slug: 'courage',
    titleHe: '8 דרכים לחיים של אומץ',
    listId: OMANUT_HAKESHER_LIST_ID,
    tags: ['lead-magnet', 'lead:courage', 'source:website'],
    assetUrl: 'https://omanut-hakesher.co.il/lead/courage/download',
    welcomeSubject: 'המדריך שלך מוכן: 8 דרכים לחיים של אומץ',
  },
  vision: {
    slug: 'vision',
    titleHe: 'איך לכתוב חזון אישי לזוגיות',
    listId: OMANUT_HAKESHER_LIST_ID,
    tags: ['lead-magnet', 'lead:vision', 'source:website'],
    assetUrl: 'https://omanut-hakesher.co.il/lead/vision/download',
    welcomeSubject: 'המדריך שלך מוכן: חזון אישי לזוגיות',
  },
  'dating-talks': {
    slug: 'dating-talks',
    titleHe: '10 כללים לשיחות דייט מנצחות',
    listId: OMANUT_HAKESHER_LIST_ID,
    tags: ['lead-magnet', 'lead:dating-talks', 'source:website'],
    assetUrl: 'https://omanut-hakesher.co.il/lead/dating-talks/download',
    welcomeSubject: 'המדריך שלך מוכן: 10 כללים לשיחות דייט מנצחות',
  },
  'love-event-rsvp': {
    slug: 'love-event-rsvp',
    titleHe: 'אירוע אהבה — הרשמה',
    listId: OMANUT_HAKESHER_LIST_ID,
    tags: ['event:love-event', 'source:website'],
    // Confirmation/details page — Resend email links here.
    assetUrl: 'https://omanut-hakesher.co.il/events/love-event/confirmed',
    welcomeSubject: 'נרשמת בהצלחה לאירוע אהבה — פרטי החיבור בפנים',
  },
  // General newsletter signup (footer / homepage / blog). No downloadable
  // asset — just joins the list. name is optional for this magnet.
  newsletter: {
    slug: 'newsletter',
    titleHe: 'רשימת התפוצה של אומנות הקשר',
    listId: OMANUT_HAKESHER_LIST_ID,
    tags: ['newsletter', 'source:website'],
    assetUrl: 'https://www.ohlove.co.il/',
    welcomeSubject: 'נרשמת לרשימת אומנות הקשר',
  },
}

export function getLeadMagnet(slug: string): LeadMagnetConfig | undefined {
  return LEAD_MAGNETS[slug]
}

export function isValidLeadMagnetSlug(slug: string): slug is keyof typeof LEAD_MAGNETS {
  return slug in LEAD_MAGNETS
}
