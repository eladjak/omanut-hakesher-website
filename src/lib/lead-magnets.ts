/**
 * Lead-magnet → Rav-Messer mapping.
 * Single source of truth for asset delivery labels, paths and segmentation tags.
 * Marketing-list selection deliberately lives in marketing-list-policy.ts: a
 * requested guide can be delivered without silently opting the recipient into
 * a historical list.
 */

export interface LeadMagnetConfig {
  slug: string
  /** Hebrew label, used in welcome email subjects + admin ops */
  titleHe: string
  /** Tags applied on subscription — drives segmentation + automation */
  tags: string[]
  /**
   * Asset the subscriber gets after confirming. Site-relative path (preferred,
   * resolved against FUNCTIONAL_BASE_URL from src/lib/site-url.ts at send time)
   * or a full external URL.
   */
  assetUrl: string
  /** Welcome email subject (optional — Resend send) */
  welcomeSubject: string
  /** False until the promised asset route has been verified end to end. */
  deliverable: boolean
}

export const LEAD_MAGNETS: Record<string, LeadMagnetConfig> = {
  '23-reasons': {
    slug: '23-reasons',
    titleHe: '23 נקודות לבדיקה כשקשר לא מתקדם',
    tags: ['lead-magnet', 'lead:23-reasons', 'source:website'],
    assetUrl: '/lead/23-reasons/download',
    welcomeSubject: 'המדריך שלך מוכן: 23 נקודות לבדיקה כשקשר לא מתקדם',
    deliverable: false,
  },
  '7-principles': {
    slug: '7-principles',
    titleHe: '7 עקרונות לתרגול קשר',
    tags: ['lead-magnet', 'lead:7-principles', 'source:website'],
    assetUrl: '/lead/7-principles/download',
    welcomeSubject: 'המדריך שלך מוכן: 7 עקרונות לתרגול קשר',
    deliverable: false,
  },
  '36-questions': {
    slug: '36-questions',
    titleHe: '36 שאלות לשיחה שמעמיקה היכרות',
    tags: ['lead-magnet', 'lead:36-questions', 'source:website'],
    assetUrl: '/lead/36-questions/download',
    welcomeSubject: 'המדריך שלך מוכן: 36 שאלות לשיחה שמעמיקה היכרות',
    deliverable: false,
  },
  // --- Salvaged 2026-07-09 from worktrees bold-leavitt-80e5cc + hardcore-hoover-5e3797 ---
  courage: {
    slug: 'courage',
    titleHe: '8 דרכים לתרגל אומץ',
    tags: ['lead-magnet', 'lead:courage', 'source:website'],
    assetUrl: '/lead/courage/download',
    welcomeSubject: 'המדריך שלך מוכן: 8 דרכים לתרגל אומץ',
    deliverable: true,
  },
  vision: {
    slug: 'vision',
    titleHe: 'איך לכתוב חזון אישי לזוגיות',
    tags: ['lead-magnet', 'lead:vision', 'source:website'],
    assetUrl: '/lead/vision/download',
    welcomeSubject: 'המדריך שלך מוכן: חזון אישי לזוגיות',
    deliverable: true,
  },
  'dating-talks': {
    slug: 'dating-talks',
    titleHe: '10 עקרונות לשיחה טובה בדייט',
    tags: ['lead-magnet', 'lead:dating-talks', 'source:website'],
    assetUrl: '/lead/dating-talks/download',
    welcomeSubject: 'המדריך שלך מוכן: 10 עקרונות לשיחה טובה בדייט',
    deliverable: true,
  },
  'love-event-rsvp': {
    slug: 'love-event-rsvp',
    titleHe: 'אירוע אהבה — הרשמה',
    tags: ['event:love-event', 'source:website'],
    // Event date, registration terms and delivery flow are not yet approved.
    // Keep direct API calls fail-closed until a real event instance exists.
    assetUrl: '/events/love-event',
    welcomeSubject: 'אירוע אהבה — פרטי המועד יפורסמו לאחר אישור',
    deliverable: false,
  },
  // General newsletter signup (footer / homepage / blog). No downloadable
  // asset — just joins the list. name is optional for this magnet.
  newsletter: {
    slug: 'newsletter',
    titleHe: 'רשימת התפוצה של אומנות הקשר',
    tags: ['newsletter', 'source:website'],
    assetUrl: '/',
    welcomeSubject: 'נרשמת לרשימת אומנות הקשר',
    deliverable: true,
  },
}

export function getLeadMagnet(slug: string): LeadMagnetConfig | undefined {
  return LEAD_MAGNETS[slug]
}

export function isValidLeadMagnetSlug(slug: string): slug is keyof typeof LEAD_MAGNETS {
  return slug in LEAD_MAGNETS
}
