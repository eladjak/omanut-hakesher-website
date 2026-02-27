"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const footerLinks = {
  navigation: [
    { href: "/", label: "בית" },
    { href: "/about", label: "אודות אלעד" },
    { href: "/hadrech", label: "תוכנית הדרך" },
    { href: "/coaching", label: "ליווי אישי" },
    { href: "/testimonials", label: "סיפורי הצלחה" },
    { href: "/blog", label: "בלוג" },
    { href: "/contact", label: "צור קשר" },
  ],
  services: [
    { href: "/coaching", label: "ליווי אישי פרימיום" },
    { href: "/hadrech", label: "קורס ״הדרך״" },
    { href: "/book", label: "הספר" },
    { href: "/podcast", label: "פודקאסט" },
    { href: "/community", label: "קהילה" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-foreground text-background/90">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-background mb-1">
                הישארו מעודכנים
              </h3>
              <p className="text-background/60 text-sm">
                קבלו טיפים ותוכן בלעדי ישירות למייל
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 text-secondary-light">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>נרשמתם בהצלחה!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto" aria-label="הרשמה לניוזלטר">
                <label htmlFor="newsletter-email-footer" className="sr-only">כתובת אימייל</label>
                <input
                  type="email"
                  id="newsletter-email-footer"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="האימייל שלכם"
                  required
                  dir="ltr"
                  autoComplete="email"
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary-light text-foreground rounded-full text-sm font-medium hover:bg-primary transition-colors"
                >
                  הרשמה
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-primary-light hover:text-primary transition-colors"
            >
              אומנות הקשר
            </Link>
            <p className="mt-4 text-background/60 max-w-md leading-relaxed">
              ליווי מקצועי לרווקים ורווקות בדרך לזוגיות מאושרת. 461 זוגות
              כבר מצאו את האהבה - עכשיו תורך.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {/* TODO: Add Facebook/Instagram when real profiles are created */}
              <a
                href="https://wa.me/972512518025"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background/10 hover:bg-primary/80 transition-colors focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                aria-label="וואטסאפ"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-background">ניווט</h3>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-background">שירותים</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-lg mb-3 mt-8 text-background">צרו קשר</h3>
            <ul className="space-y-2 text-sm text-background/60">
              <li>
                <a href="tel:+972512518025" dir="ltr" className="hover:text-primary-light transition-colors">
                  051-251-8025
                </a>
              </li>
              <li>
                <a href="mailto:hello@omanut-hakesher.co.il" dir="ltr" className="hover:text-primary-light transition-colors">
                  hello@omanut-hakesher.co.il
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-background/40 text-sm">
          <p>&copy; {currentYear} אומנות הקשר. כל הזכויות שמורות.</p>
          <p className="text-background/30 text-xs">
            נבנה באהבה לקשרים טובים יותר
          </p>
        </div>
      </div>
    </footer>
  );
}
