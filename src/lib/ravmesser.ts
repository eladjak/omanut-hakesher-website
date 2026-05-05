/**
 * Rav-Messer (Responder) V2 OAuth client — narrow surface for the lead-magnet flow.
 *
 * The full client lives in the content-studio project; here we only need:
 *   - subscribe(email, name, listId, tags) → adds to a list, returns subscriber
 *   - getAccessToken() → cached OAuth token
 *
 * Account: 1001688 (eladjak Pro plan, ~2153 subscribers, 120K msg/mo).
 *
 * Env vars required:
 *   RAVMESSER_CLIENT_ID
 *   RAVMESSER_CLIENT_SECRET
 *   RAVMESSER_USER_TOKEN
 *
 * If any are missing the client returns a typed "not-configured" result so the
 * caller can degrade to email-only (Resend) or to a queued-for-manual flow.
 */

const API_BASE = 'https://graph.responder.live/v2'
const TOKEN_TTL_MS = 50 * 60 * 1000 // V2 tokens last ~1h; refresh 10 min early

type TokenCache = { token: string; expiresAt: number } | null
let cachedToken: TokenCache = null

export type SubscribeResult =
  | { ok: true; subscriberId: string; listId: number; alreadyExists: boolean }
  | { ok: false; reason: 'not-configured' | 'auth-failed' | 'api-error'; detail?: string }

function readCreds() {
  const clientId = process.env.RAVMESSER_CLIENT_ID
  const clientSecret = process.env.RAVMESSER_CLIENT_SECRET
  const userToken = process.env.RAVMESSER_USER_TOKEN
  if (!clientId || !clientSecret || !userToken) return null
  return { clientId, clientSecret, userToken }
}

async function getAccessToken(): Promise<string | null> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token
  }
  const creds = readCreds()
  if (!creds) return null

  const res = await fetch(`${API_BASE}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: creds.clientId,
      client_secret: creds.clientSecret,
      user_token: creds.userToken,
    }),
  })

  if (!res.ok) return null
  const data = (await res.json()) as { access_token?: string; token?: string }
  const token = data.access_token ?? data.token
  if (!token) return null

  cachedToken = { token, expiresAt: Date.now() + TOKEN_TTL_MS }
  return token
}

/**
 * Subscribe an email to a Rav-Messer list with optional tags.
 * Idempotent — re-subscribing an existing email returns alreadyExists=true.
 */
export async function subscribeToList(input: {
  email: string
  firstName?: string
  lastName?: string
  listId: number
  tags?: string[]
  customFields?: Record<string, string>
}): Promise<SubscribeResult> {
  if (!readCreds()) {
    return { ok: false, reason: 'not-configured' }
  }

  const token = await getAccessToken()
  if (!token) {
    return { ok: false, reason: 'auth-failed' }
  }

  const body: Record<string, unknown> = {
    email: input.email,
    list_id: input.listId,
  }
  if (input.firstName) body.first_name = input.firstName
  if (input.lastName) body.last_name = input.lastName
  if (input.tags?.length) body.tags = input.tags
  if (input.customFields) body.custom_fields = input.customFields

  const res = await fetch(`${API_BASE}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => 'unknown')
    // 409 = already subscribed → treat as success (idempotent)
    if (res.status === 409) {
      return { ok: true, subscriberId: 'existing', listId: input.listId, alreadyExists: true }
    }
    return { ok: false, reason: 'api-error', detail: `${res.status}: ${detail.slice(0, 200)}` }
  }

  const data = (await res.json()) as { id?: string | number; subscriber_id?: string | number }
  const subscriberId = String(data.id ?? data.subscriber_id ?? 'unknown')
  return { ok: true, subscriberId, listId: input.listId, alreadyExists: false }
}

export function isConfigured(): boolean {
  return readCreds() !== null
}
