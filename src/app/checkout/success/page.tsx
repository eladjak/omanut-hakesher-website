import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "תודה — התשלום התקבל",
  description: "תודה על הרכישה. פרטי הגישה והחשבונית מס/קבלה בדרך אליך לאימייל.",
  alternates: { canonical: "/checkout/success" },
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    product?: string;
    "OG-PaymentID"?: string;
    "OG-CustomerID"?: string;
    "OG-ExternalIdentifier"?: string;
    dev?: string;
  }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const product = params.product ? getProduct(params.product) : undefined;
  const isDev = params.dev === "1";
  const paymentId = params["OG-PaymentID"];

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-secondary/30 shadow-xl shadow-secondary/10">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="inline-flex p-5 rounded-full bg-secondary/15 mb-6">
              <svg
                className="w-12 h-12 text-secondary-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              {isDev ? "סימולציית תשלום (dev)" : "תודה — התשלום התקבל"}
            </h1>

            {product ? (
              <p className="text-xl text-muted-foreground mb-2 text-pretty">
                {product.nameHe}
              </p>
            ) : null}

            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              {isDev
                ? "Sumit לא מוגדר בסביבה הזו, אז דילגנו על תשלום אמיתי. בפרודקשן תגיע הנה אחרי תשלום מאובטח דרך Sumit."
                : "החשבונית/קבלה בדרך אליך לאימייל. תוך כמה דקות תקבל גם מייל עם פרטי הגישה הראשונים."}
            </p>

            {paymentId && (
              <p className="text-xs text-muted-foreground mb-8 tabular-nums">
                מזהה תשלום: <span dir="ltr" className="font-mono">{paymentId}</span>
              </p>
            )}

            <div className="space-y-3">
              <Link
                href="/coaching"
                className="inline-flex px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                לדף הבית של הליווי
              </Link>
              <div>
                <Link
                  href="https://wa.me/972512518025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-dark hover:opacity-80 transition-opacity"
                >
                  שאלות? כתבו לי בוואטסאפ
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
