import Link from "next/link";
import { getCheckoutUrl, SUMIT_PRODUCT_LABELS, type SumitProduct } from "@/lib/sumit";
import { Lock, ShoppingBag } from "lucide-react";

type Props = {
  product: SumitProduct;
  label?: string;
  price?: string;
  variant?: "primary" | "outline";
  className?: string;
};

export function BuyButton({
  product,
  label,
  price,
  variant = "primary",
  className = "",
}: Props) {
  const checkout = getCheckoutUrl(product);
  const displayLabel = label ?? `רכישת ${SUMIT_PRODUCT_LABELS[product]}`;

  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 shadow-lg hover:shadow-xl hover:-translate-y-0.5";

  const styles =
    variant === "outline"
      ? "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-white"
      : "bg-primary text-white hover:bg-primary-dark";

  if (!checkout.configured) {
    return (
      <Link
        href={checkout.url}
        className={`${base} ${styles} opacity-90 ${className}`}
        aria-label={`${displayLabel} — בקרוב`}
      >
        <Lock className="size-4" aria-hidden />
        <span>{displayLabel}</span>
        <span className="text-xs opacity-80">(בקרוב)</span>
      </Link>
    );
  }

  return (
    <a
      href={checkout.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
      data-checkout-product={product}
      data-checkout-mode={checkout.mode}
    >
      <ShoppingBag className="size-5" aria-hidden />
      <span>{displayLabel}</span>
      {price && <span className="tabular-nums opacity-95">{price}</span>}
      {checkout.mode === "sandbox" && (
        <span className="text-[10px] uppercase bg-amber-500/20 text-amber-100 px-2 py-0.5 rounded-full mr-1">
          sandbox
        </span>
      )}
    </a>
  );
}
