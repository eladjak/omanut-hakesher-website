"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useGender } from "@/components/GenderProvider";
import type { Gender } from "@/lib/gendered-content";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/about", label: "אודות" },
  { href: "/hadrech", label: "תוכנית הדרך" },
  { href: "/coaching", label: "ליווי אישי" },
  { href: "/book", label: "הספר" },
  { href: "/testimonials", label: "סיפורי הצלחה" },
  { href: "/podcast", label: "פודקאסט" },
  { href: "/blog", label: "בלוג" },
  { href: "/contact", label: "צור קשר" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { gender, setGender } = useGender();

  const cycleGender = () => {
    const cycle: Gender[] = ["neutral", "female", "male"];
    const currentIndex = cycle.indexOf(gender);
    const nextIndex = (currentIndex + 1) % cycle.length;
    setGender(cycle[nextIndex]);
  };

  const genderLabel =
    gender === "male"
      ? "מצב גברי - לחצו לשינוי"
      : gender === "female"
        ? "מצב נשי - לחצו לשינוי"
        : "התאמה אישית - לחצו לשינוי";
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Track scroll for header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 py-2" aria-label="ניווט ראשי">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            aria-label="אומנות הקשר - דף הבית"
          >
            <Image
              src="/images/logo.png"
              alt="לוגו אומנות הקשר"
              width={140}
              height={50}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden xl:flex items-center gap-0.5" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-primary rounded-full" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Theme toggle + Gender toggle + CTA */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
              aria-label={theme === "dark" ? "עבור למצב בהיר" : "עבור למצב כהה"}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Gender Theme Toggle */}
            <button
              onClick={cycleGender}
              className="p-2.5 rounded-xl text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
              aria-label={genderLabel}
              title={genderLabel}
            >
              {gender === "male" ? (
                <svg className="w-5 h-5 text-[#1E3A5F]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ) : gender === "female" ? (
                <svg className="w-5 h-5 text-[#E85D75]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ) : (
                <span className="flex -space-x-1.5" aria-hidden="true">
                  <svg className="w-4 h-4 text-[#E85D75]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg className="w-4 h-4 text-[#1E3A5F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Button asChild className="rounded-full bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20">
              <Link href="/coaching">שיחת היכרות חינם</Link>
            </Button>
          </div>

          {/* Mobile: Theme toggle + Gender toggle + Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={cycleGender}
              className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
              aria-label={genderLabel}
              title={genderLabel}
            >
              {gender === "male" ? (
                <svg className="w-5 h-5 text-[#1E3A5F]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ) : gender === "female" ? (
                <svg className="w-5 h-5 text-[#E85D75]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ) : (
                <span className="flex -space-x-1" aria-hidden="true">
                  <svg className="w-4 h-4 text-[#E85D75]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg className="w-4 h-4 text-[#1E3A5F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
              aria-label={theme === "dark" ? "עבור למצב בהיר" : "עבור למצב כהה"}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
              aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          id="mobile-menu"
          role="navigation"
          aria-label="תפריט מובייל"
          className={`xl:hidden overflow-hidden transition-all duration-200 ease-out ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-2 border-t border-border/50 mt-3">
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
              <Button asChild className="rounded-full bg-primary hover:bg-primary-dark text-white">
                <Link href="/coaching" onClick={closeMenu}>
                  שיחת היכרות חינם
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
