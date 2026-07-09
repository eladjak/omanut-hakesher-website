"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatILS, type Product } from "@/lib/products";

type Status = "idle" | "submitting" | "error";

interface Props {
  product: Product;
  /** Compact mode hides description block (use when product info already shown above). */
  compact?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^0(5\d|2|3|4|7|8|9)[-\s]?\d{3}[-\s]?\d{4}$/;

export function CheckoutForm({ product, compact = false }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; submit?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) e.name = "נא להזין שם מלא";
    if (!EMAIL_RE.test(email.trim())) e.email = "כתובת אימייל לא תקינה";
    if (phone.trim() && !PHONE_RE.test(phone.trim())) e.phone = "טלפון לא תקין (פורמט: 05X-XXXXXXX)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setErrors({});
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { redirectUrl?: string; error?: string };
      if (!res.ok || !data.redirectUrl) {
        setErrors({ submit: data.error === "invalid-email" ? "כתובת אימייל לא תקינה" : "לא הצלחנו לפתוח את הקופה. נסה/י שוב או צרו קשר." });
        setStatus("error");
        return;
      }
      // Hard-redirect to Sumit hosted checkout.
      window.location.assign(data.redirectUrl);
    } catch {
      setErrors({ submit: "אין חיבור לרשת. בדוק/י את החיבור ונסה/י שוב." });
      setStatus("error");
    }
  };

  return (
    <div className="space-y-5">
      {!compact && (
        <div>
          <p className="text-3xl font-bold text-primary leading-none">
            {formatILS(product.price.amount)}
            {product.type === "recurring-monthly" && (
              <span className="text-base font-medium text-muted-foreground mr-2">/ חודש</span>
            )}
          </p>
          {product.price.anchorAmount && (
            <p className="text-sm text-muted-foreground mt-1">
              <span className="line-through">{formatILS(product.price.anchorAmount)}</span>{" "}
              במחיר רגיל
            </p>
          )}
          {product.maxPayments && product.maxPayments > 1 && (
            <p className="text-sm text-muted-foreground mt-1">
              עד {product.maxPayments} תשלומים ללא ריבית
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {errors.submit && (
          <div
            className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {errors.submit}
          </div>
        )}

        <div>
          <label htmlFor={`name-${product.slug}`} className="block text-sm font-medium mb-1.5">
            שם מלא <span className="text-destructive">*</span>
          </label>
          <Input
            id={`name-${product.slug}`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((p) => ({ ...p, name: undefined }));
            }}
            placeholder="ישראל ישראלי"
            className={`rounded-xl ${errors.name ? "border-destructive" : ""}`}
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && (
            <p className="text-destructive text-xs mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`email-${product.slug}`} className="block text-sm font-medium mb-1.5">
            אימייל <span className="text-destructive">*</span>
          </label>
          <Input
            id={`email-${product.slug}`}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
            placeholder="your@email.com"
            dir="ltr"
            className={`rounded-xl ${errors.email ? "border-destructive" : ""}`}
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`phone-${product.slug}`} className="block text-sm font-medium mb-1.5">
            טלפון <span className="text-muted-foreground text-xs">(אופציונלי)</span>
          </label>
          <Input
            id={`phone-${product.slug}`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((p) => ({ ...p, phone: undefined }));
            }}
            placeholder="050-1234567"
            dir="ltr"
            className={`rounded-xl ${errors.phone ? "border-destructive" : ""}`}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-destructive text-xs mt-1" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-primary hover:bg-primary-dark text-white text-lg py-6 font-semibold"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              מעביר/ה לתשלום מאובטח...
            </span>
          ) : (
            "המשך/י לתשלום מאובטח"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          התשלום מאובטח דרך Sumit. חשבונית מס/קבלה תישלח אוטומטית למייל.
        </p>
      </form>
    </div>
  );
}
