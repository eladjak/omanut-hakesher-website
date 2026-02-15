import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70dvh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        {/* Decorative number */}
        <div className="relative inline-block mb-8">
          <span className="text-[10rem] md:text-[14rem] font-bold leading-none text-primary/10 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <svg
                className="w-16 h-16 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          הדף לא נמצא
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
          מצטערים, הדף שחיפשתם לא קיים או שהועבר למקום אחר.
          אולי תמצאו את מה שאתם מחפשים באחד הדפים האלה:
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            className="rounded-full bg-primary hover:bg-primary-dark text-white px-8"
          >
            <Link href="/">חזרה לדף הבית</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-primary/5 px-8"
          >
            <Link href="/services">השירותים שלנו</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-primary/5 px-8"
          >
            <Link href="/blog">הבלוג</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-primary/5 px-8"
          >
            <Link href="/contact">צור קשר</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
