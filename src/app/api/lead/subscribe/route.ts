import { NextResponse } from 'next/server'
import { subscribeToList, isConfigured as isRavMesserConfigured } from '@/lib/ravmesser'
import { getLeadMagnet } from '@/lib/lead-magnets'

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

async function sendWelcomeEmail(args: {
  email: string
  firstName: string
  subject: string
  assetUrl: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return // silent: caller already returned success

  const { email, firstName, subject, assetUrl } = args

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'אומנות הקשר <hello@eladjak.com>',
      to: [email],
      subject,
      html: `
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
      `,
    }),
  }).catch(() => {
    // best-effort: subscription already succeeded, mail failure is not fatal
  })
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
  if (name.length < 2) {
    return NextResponse.json({ error: 'invalid-name' }, { status: 400 })
  }

  const magnet = getLeadMagnet(slug)
  if (!magnet) {
    return NextResponse.json({ error: 'unknown-magnet', slug }, { status: 400 })
  }

  const { firstName, lastName } = splitName(name)

  // If Rav-Messer is not configured (dev / preview), don't fail the user —
  // log and still send the welcome email so the asset is delivered.
  if (!isRavMesserConfigured()) {
    console.warn('[lead/subscribe] Rav-Messer not configured, skipping list subscription', {
      slug,
      email,
    })
    await sendWelcomeEmail({
      email,
      firstName,
      subject: magnet.welcomeSubject,
      assetUrl: magnet.assetUrl,
    })
    return NextResponse.json({ ok: true, mode: 'email-only', alreadySubscribed: false })
  }

  const result = await subscribeToList({
    email,
    firstName,
    lastName: lastName || undefined,
    listId: magnet.listId,
    tags: magnet.tags,
    customFields: {
      lead_magnet: magnet.slug,
      signup_source: 'website',
      signup_at: new Date().toISOString(),
    },
  })

  if (!result.ok) {
    // Subscriber path failed — still try to deliver asset by email so the user
    // gets value. Surface the failure mode to the dashboard via console.
    console.error('[lead/subscribe] Rav-Messer subscribe failed', { slug, email, result })
    await sendWelcomeEmail({
      email,
      firstName,
      subject: magnet.welcomeSubject,
      assetUrl: magnet.assetUrl,
    })
    return NextResponse.json(
      { ok: true, mode: 'email-fallback', alreadySubscribed: false, ravMesserReason: result.reason },
      { status: 200 },
    )
  }

  // Send welcome email regardless of alreadyExists — the user just asked for
  // the asset, they expect it now.
  await sendWelcomeEmail({
    email,
    firstName,
    subject: magnet.welcomeSubject,
    assetUrl: magnet.assetUrl,
  })

  return NextResponse.json({
    ok: true,
    mode: 'subscribed',
    alreadySubscribed: result.alreadyExists,
  })
}
