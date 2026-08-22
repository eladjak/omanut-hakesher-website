import { NextResponse } from 'next/server'
import { subscribeToList, isConfigured as isRavMesserConfigured } from '@/lib/ravmesser'
import { getLeadMagnet } from '@/lib/lead-magnets'
import { getApprovedMarketingList } from '@/lib/marketing-list-policy'
import { absoluteFunctionalUrl } from '@/lib/site-url'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface LeadSubscribeBody {
  email?: string
  name?: string
  slug?: string
  consent?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function splitName(full: string): { firstName: string; lastName: string } {
  const trimmed = full.trim()
  const parts = trimmed.split(/\s+/)
  if (parts.length === 1) return { firstName: parts[0]!, lastName: '' }
  return { firstName: parts[0]!, lastName: parts.slice(1).join(' ') }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]!
  })
}

async function sendWelcomeEmail(args: {
  email: string
  firstName: string
  subject: string
  assetUrl: string
  variant?: 'guide' | 'newsletter'
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  const { email, subject, variant = 'guide' } = args
  const firstName = escapeHtml(args.firstName)
  // Relative asset paths are resolved against a domain that actually serves
  // this app (fleet-sweep 2026-07-10: omanut-hakesher.co.il is NXDOMAIN —
  // absolute links to it in welcome emails were dead on arrival).
  const assetUrl = absoluteFunctionalUrl(args.assetUrl)

  const body =
    variant === 'newsletter'
      ? `
        <div dir="rtl" style="font-family: 'Heebo', Arial, sans-serif; max-width: 580px; margin: 0 auto; line-height: 1.7; color: #2a2a2a;">
          <p>היי,</p>
          <p>נרשמת לרשימת אומנות הקשר — שמח שאתה כאן.</p>
          <p>מדי כמה שבועות אשלח לך כלי אחד אמיתי לדרך לזוגיות: לא ספאם, לא מילוי מקום, רק מה שבאמת עוזר. בלי התחייבות — אפשר לצאת בכל רגע.</p>
          <p style="margin: 32px 0;">
            <a href="${assetUrl}"
               style="background: #c97b63; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
              להכיר את אומנות הקשר
            </a>
          </p>
          <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 14px;">
            אלעד יעקובוביץ' — אומנות הקשר<br/>
            לכל שאלה: <a href="mailto:hello@eladjak.com" style="color: #c97b63;">hello@eladjak.com</a>
          </p>
        </div>
      `
      : `
        <div dir="rtl" style="font-family: 'Heebo', Arial, sans-serif; max-width: 580px; margin: 0 auto; line-height: 1.7; color: #2a2a2a;">
          <p>היי ${firstName},</p>
          <p>תודה שנרשמת. המדריך מוכן בשבילך.</p>
          <p style="margin: 32px 0;">
            <a href="${assetUrl}"
               style="background: #c97b63; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
              להורדה והקריאה
            </a>
          </p>
          <p>אם הקישור לא עובד, העתק/י אותו: <span style="word-break: break-all; color: #888;">${assetUrl}</span></p>
          <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 14px;">
            אלעד יעקובוביץ' — אומנות הקשר<br/>
            לכל שאלה: <a href="mailto:hello@eladjak.com" style="color: #c97b63;">hello@eladjak.com</a>
          </p>
        </div>
      `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'אומנות הקשר <hello@eladjak.com>',
      to: [email],
      subject,
      html: body,
    }),
  }).catch(() => null)
  return response?.ok === true
}

export async function POST(request: Request) {
  let body: LeadSubscribeBody
  try {
    body = (await request.json()) as LeadSubscribeBody
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase() ?? ''
  const name = body.name?.trim() ?? ''
  const slug = body.slug?.trim() ?? ''

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid-email' }, { status: 400 })
  }

  const magnet = getLeadMagnet(slug)
  if (!magnet) {
    return NextResponse.json({ error: 'unknown-magnet', slug }, { status: 400 })
  }
  if (!magnet.deliverable) {
    return NextResponse.json(
      { error: 'asset-not-ready', message: 'המדריך עדיין אינו זמין למסירה.' },
      { status: 503 },
    )
  }

  // The general newsletter magnet only collects an email — name is optional.
  // Every other (gated) magnet still requires a real name for the welcome flow.
  const isNewsletter = magnet.slug === 'newsletter'
  const hasMarketingConsent = body.consent === true
  if (isNewsletter && !hasMarketingConsent) {
    return NextResponse.json({ error: 'consent-required' }, { status: 400 })
  }
  if (!isNewsletter && name.length < 2) {
    return NextResponse.json({ error: 'invalid-name' }, { status: 400 })
  }

  const { firstName, lastName } = name.length >= 2
    ? splitName(name)
    : { firstName: 'חבר/ה', lastName: '' }

  // Delivering a requested guide does not imply consent to marketing. Only
  // subscribe guide recipients who explicitly opted in.
  if (!isNewsletter && !hasMarketingConsent) {
    const delivered = await sendWelcomeEmail({
      email,
      firstName,
      subject: magnet.welcomeSubject,
      assetUrl: magnet.assetUrl,
      variant: 'guide',
    })
    if (!delivered) {
      return NextResponse.json({ error: 'asset-delivery-failed' }, { status: 502 })
    }
    return NextResponse.json({
      ok: true,
      mode: 'asset-only',
      alreadySubscribed: false,
      marketingSubscribed: false,
    })
  }

  const marketingList = getApprovedMarketingList()
  if (marketingList.status !== 'approved') {
    if (isNewsletter) {
      return NextResponse.json(
        {
          error: 'marketing-list-not-approved',
          reason: marketingList.status,
          message: 'ההרשמה לעדכונים עדיין אינה זמינה. כתובת האימייל לא נוספה לרשימה.',
        },
        { status: 503 },
      )
    }

    const delivered = await sendWelcomeEmail({
      email,
      firstName,
      subject: magnet.welcomeSubject,
      assetUrl: magnet.assetUrl,
      variant: 'guide',
    })
    if (!delivered) {
      return NextResponse.json({ error: 'asset-delivery-failed' }, { status: 502 })
    }
    return NextResponse.json({
      ok: true,
      mode: 'asset-only',
      alreadySubscribed: false,
      marketingSubscribed: false,
      marketingReason: marketingList.status,
    })
  }

  // Guide delivery can still succeed when the marketing provider is absent.
  // A newsletter-only request cannot: reporting success would be misleading.
  if (!isRavMesserConfigured()) {
    console.warn('[lead/subscribe] Rav-Messer not configured, skipping list subscription', {
      slug,
    })
    if (isNewsletter) {
      return NextResponse.json(
        {
          error: 'marketing-provider-not-configured',
          message: 'ההרשמה לעדכונים עדיין אינה זמינה. כתובת האימייל לא נוספה לרשימה.',
        },
        { status: 503 },
      )
    }
    const delivered = await sendWelcomeEmail({
      email,
      firstName,
      subject: magnet.welcomeSubject,
      assetUrl: magnet.assetUrl,
      variant: 'guide',
    })
    if (!delivered) {
      return NextResponse.json({ error: 'email-delivery-not-configured' }, { status: 503 })
    }
    return NextResponse.json({
      ok: true,
      mode: 'asset-only',
      alreadySubscribed: false,
      marketingSubscribed: false,
      marketingReason: 'provider-not-configured',
    })
  }

  const result = await subscribeToList({
    email,
    firstName,
    lastName: lastName || undefined,
    listId: marketingList.listId,
    tags: magnet.tags,
    customFields: {
      lead_magnet: magnet.slug,
      signup_source: 'website',
      signup_at: new Date().toISOString(),
      consent_text_version: 'marketing-opt-in-v1-2026-08-13',
      consent_at: new Date().toISOString(),
    },
  })

  if (!result.ok) {
    // Subscriber path failed. A requested guide still gets delivered; a pure
    // newsletter request must not pretend that a subscription was created.
    console.error('[lead/subscribe] Rav-Messer subscribe failed', { slug, reason: result.reason })
    if (isNewsletter) {
      return NextResponse.json(
        { error: 'marketing-subscription-failed' },
        { status: 502 },
      )
    }
    const delivered = await sendWelcomeEmail({
      email,
      firstName,
      subject: magnet.welcomeSubject,
      assetUrl: magnet.assetUrl,
      variant: 'guide',
    })
    if (!delivered) {
      return NextResponse.json({ error: 'asset-delivery-failed' }, { status: 502 })
    }
    return NextResponse.json(
      {
        ok: true,
        mode: 'asset-only',
        alreadySubscribed: false,
        marketingSubscribed: false,
        marketingReason: 'provider-error',
      },
      { status: 200 },
    )
  }

  // Send welcome email regardless of alreadyExists — the user just asked for
  // the asset, they expect it now.
  const delivered = await sendWelcomeEmail({
    email,
    firstName,
    subject: magnet.welcomeSubject,
    assetUrl: magnet.assetUrl,
    variant: isNewsletter ? 'newsletter' : 'guide',
  })

  if (!delivered) {
    return NextResponse.json(
      { error: 'email-delivery-failed', subscribed: true },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    mode: 'subscribed',
    alreadySubscribed: result.alreadyExists,
    marketingSubscribed: true,
  })
}
