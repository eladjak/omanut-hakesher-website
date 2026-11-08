"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSummitProduct, getSummitCheckoutUrl, type SummitMode } from "@/lib/summit";

interface SummitCheckoutProps {
  slug: string;
  ctaLabel?: string;
  whatsAppMessage?: string;
}

const MODE_LABELS: Record<SummitMode, string> = {
  "one-time": "תשלום חד-פעמי מאובטח",
  "installments": "חד-פעמי או עד 12 תשלומים",
  "monthly": "מנוי חודשי — ביטול בכל עת",
};

export function SummitCheckout({ slug, ctaLabel, whatsAppMessage }: SummitCheckoutProps) {
  const product = getSummitProduct(slug);
  const url = getSummitCheckoutUrl(slug);
  const [opened, setOpened] = useState(false);

  if (!product) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="p-6 text-center text-sm text-destructive">
          מוצר לא נמצא ({slug}). פנה/י אלינו בוואטסאפ ונסדר.
        </CardContent>
      </Card>
    );
  }

  const waText =
    whatsAppMessage ??
    `שלום, אני מתעניין/ת ב-${product.titleHe} (${product.amountIls.toLocaleString("he-IL")} ₪)`;
  const waUrl = `https://wa.me/972512518025?text=${encodeURIComponent(waText)}`;

  // Summit not configured → WhatsApp fallback (still 100% functional)
  if (!url) {
    return (
      <Card className="border-border/50 bg-card shadow-lg shadow-primary/5">
        <CardContent className="p-6 md:p-8">
          <div className="text-center">
            <div className="mb-4 text-sm font-medium text-muted-foreground">{MODE_LABELS[product.mode]}</div>
            <div className="mb-1 text-4xl font-bold tabular-nums">
              ₪{product.amountIls.toLocaleString("he-IL")}
              {product.mode === "monthly" && <span className="text-xl text-muted-foreground"> / חודש</span>}
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {product.mode === "installments" && product.maxInstallments
                ? `או עד ${product.maxInstallments} תשלומים ללא ריבית`
                : product.mode === "monthly"
                ? "ללא התחייבות, ביטול בכל עת"
                : "אמצעי תשלום מאובטחים"}
            </p>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 text-lg shadow-md transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {ctaLabel ?? "להזמנה בוואטסאפ"}
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              סליקה דרך Summit — אבטחה ברמת בנק. אישור חיוב מיידי לאימייל.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Summit configured → iframe (lazy-loaded on click)
  return (
    <Card className="border-border/50 bg-card shadow-lg shadow-primary/5">
      <CardContent className="p-6 md:p-8">
        <div className="text-center">
          <div className="mb-4 text-sm font-medium text-muted-foreground">{MODE_LABELS[product.mode]}</div>
          <div className="mb-1 text-4xl font-bold tabular-nums">
            ₪{product.amountIls.toLocaleString("he-IL")}
            {product.mode === "monthly" && <span className="text-xl text-muted-foreground"> / חודש</span>}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {product.mode === "installments" && product.maxInstallments
              ? `או עד ${product.maxInstallments} תשלומים ללא ריבית`
              : product.mode === "monthly"
              ? "ללא התחייבות, ביטול בכל עת"
              : "אמצעי תשלום מאובטחים"}
          </p>

          {!opened ? (
            <Button
              type="button"
              onClick={() => setOpened(true)}
              className="w-full rounded-full bg-primary hover:bg-primary-dark text-white font-semibold py-6 text-lg"
            >
              {ctaLabel ?? "לתשלום מאובטח"}
            </Button>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-border/50 bg-background">
              <iframe
                src={url}
                title={`Summit checkout — ${product.titleHe}`}
                className="w-full"
                style={{ height: "640px", border: 0 }}
                allow="payment"
              />
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            סליקה דרך Summit — אבטחה ברמת בנק. אישור חיוב מיידי לאימייל.
          </p>

          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">בעיה בתשלום? אפשר גם בוואטסאפ:</p>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-secondary-dark hover:opacity-80 transition-opacity"
            >
              שליחת הודעה ←
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
