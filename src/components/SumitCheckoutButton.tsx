'use client';

/**
 * Sumit checkout button — opens a modal-form to collect name+email+phone,
 * POSTs to /api/sumit/checkout, then redirects the user to Sumit's hosted
 * payment page.
 *
 * Falls back to "צרו קשר" (link to /contact) if Sumit is not configured.
 */
import { useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SumitCheckoutButtonProps {
  productSlug: string;
  /** Button text (e.g. "להירשם עכשיו") */
  label: string;
  /** Tailwind classes for the trigger button */
  className?: string;
  /** Optional shown price for the user (we still use server-side price) */
  displayPrice?: string;
  /** Optional human title for the dialog (defaults to label) */
  productTitle?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SumitCheckoutButton({
  productSlug,
  label,
  className = '',
  displayPrice,
  productTitle,
}: SumitCheckoutButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallback, setFallback] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError('נא להזין שם מלא (לפחות 2 תווים)');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('נא להזין כתובת אימייל תקינה');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/sumit/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
        }),
      });

      if (res.status === 503) {
        // Sumit not configured — degrade to contact form
        setFallback(true);
        setSubmitting(false);
        return;
      }

      const data = (await res.json()) as {
        checkoutUrl?: string;
        error?: string;
        message?: string;
      };

      if (!res.ok || !data.checkoutUrl) {
        setError(data.message || 'שגיאה ביצירת התשלום. נסו שוב או צרו קשר.');
        setSubmitting(false);
        return;
      }

      // Redirect to Sumit hosted checkout
      window.location.href = data.checkoutUrl;
    } catch {
      setError('שגיאה זמנית בחיבור. נסו שוב.');
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={
            className ||
            'inline-flex px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-md shadow-primary/20'
          }
        >
          {label}
          {displayPrice && (
            <span className="me-2 text-sm opacity-90">• {displayPrice}</span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">
            {productTitle || label}
          </DialogTitle>
          <DialogDescription className="text-right">
            מלאו את הפרטים. תועברו לדף תשלום מאובטח של Sumit.
            {displayPrice && (
              <span className="block mt-1 font-semibold text-foreground">
                סכום: {displayPrice}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {fallback ? (
          <div className="space-y-4 text-right">
            <p className="text-sm text-muted-foreground">
              מערכת התשלומים אינה זמינה כרגע. אנא צרו קשר באופן ישיר ונתאם רישום.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-full justify-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
            >
              לטופס יצירת קשר
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="sumit-name"
                className="block text-sm font-medium text-right mb-1"
              >
                שם מלא <span className="text-primary">*</span>
              </label>
              <input
                id="sumit-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-right focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="ישראל ישראלי"
                disabled={submitting}
              />
            </div>

            <div>
              <label
                htmlFor="sumit-email"
                className="block text-sm font-medium text-right mb-1"
              >
                אימייל <span className="text-primary">*</span>
              </label>
              <input
                id="sumit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                dir="ltr"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-left focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="you@example.com"
                disabled={submitting}
              />
            </div>

            <div>
              <label
                htmlFor="sumit-phone"
                className="block text-sm font-medium text-right mb-1"
              >
                טלפון (אופציונלי)
              </label>
              <input
                id="sumit-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                dir="ltr"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-left focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="050-1234567"
                disabled={submitting}
              />
            </div>

            {error && (
              <div
                role="alert"
                className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg text-right"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-primary/20"
            >
              {submitting ? 'מעביר לתשלום...' : 'המשך לתשלום מאובטח'}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              התשלום מעובד באמצעות Sumit. אשראי / Bit / Apple Pay. קבלה תישלח אוטומטית.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
