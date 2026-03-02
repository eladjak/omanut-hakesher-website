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
    { href: "/podcast", label: "פודקאסט" },
    { href: "/contact", label: "צור קשר" },
    { href: "/thanks", label: "תודות" },
  ],
  services: [
    { href: "/coaching", label: "ליווי אישי פרימיום" },
    { href: "/hadrech", label: "קורס ״הדרך״" },
    { href: "/book", label: "הספר" },
    { href: "/community", label: "קהילת אומנות הקשר" },
    { href: "/podcast", label: "פודקאסט" },
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
            <div className="flex gap-3 mt-6 flex-wrap">
              {/* WhatsApp */}
              <a href="https://wa.me/972512518025" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background/10 hover:bg-primary/80 transition-colors"
                aria-label="וואטסאפ">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              {/* Telegram */}
              <a href="https://t.me/MatimLiZugiut" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background/10 hover:bg-primary/80 transition-colors"
                aria-label="טלגרם">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.463c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.16 14.26l-2.95-.924c-.64-.203-.654-.64.136-.95l11.5-4.431c.533-.194 1.001.13.716.293z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/groups/mateemlizugiut" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background/10 hover:bg-primary/80 transition-colors"
                aria-label="פייסבוק">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/c/אומנותהקשר" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background/10 hover:bg-primary/80 transition-colors"
                aria-label="יוטיוב">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </a>
              {/* Spotify */}
              <a href="https://open.spotify.com/show/2mXzv3AS0rZw7eTCVjEbyZ" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-background/10 hover:bg-primary/80 transition-colors"
                aria-label="ספוטיפיי">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
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
