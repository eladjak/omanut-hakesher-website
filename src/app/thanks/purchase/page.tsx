import type { Metadata } from 'next';
import Link from 'next/link';
import { SUMIT_PRODUCTS } from '@/lib/sumit-products';

export const metadata: Metadata = {
  title: 'תודה על הרכישה — אומנות הקשר',
  description: 'הקבלה והפרטים נשלחו אליך לאימייל',
  robots: { index: false, follow: false },
};

export default async function ThanksPurchasePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const productSlug = params.product;
  const product = productSlug ? SUMIT_PRODUCTS[productSlug] : undefined;

  return (
    <section className="min-h-[70vh] py-20">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-8">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          תודה! הרכישה הושלמה.
        </h1>

        {product ? (
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            רכשת: <span className="font-semibold text-foreground">{product.nameHe}</span>.
            <br />
            הקבלה תישלח אליך לאימייל בדקות הקרובות. כך גם פרטי הגישה.
          </p>
        ) : (
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            הקבלה והפרטים נשלחו אליך לאימייל בדקות הקרובות.
          </p>
        )}

        <div className="bg-muted/50 rounded-2xl p-6 mb-8 text-right">
          <h2 className="font-semibold mb-3">מה עכשיו?</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• בדוק את תיבת המייל שלך (כולל ספאם) בדקות הקרובות.</li>
            <li>• אני אצור איתך קשר אישית בימים הקרובים לתיאום הצעדים הבאים.</li>
            <li>• אם יש שאלות דחופות, אפשר להגיב על המייל או בטלפון.</li>
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            לדף הבית
          </Link>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3 border-2 border-primary/30 text-primary rounded-full font-semibold hover:bg-primary/5 transition-colors"
          >
            לחזור איתי בשאלה
          </Link>
        </div>
      </div>
    </section>
  );
}
