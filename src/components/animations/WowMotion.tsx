"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * WowMotion — additive, framework-agnostic motion signature engine.
 *
 * Mounted ONCE in the root layout. Purely additive: it tags existing
 * server-rendered DOM with data-wow-* hooks and drives them with a
 * single shared IntersectionObserver each. It NEVER hides content on
 * the server and NEVER runs when the user prefers reduced motion
 * (belt #2 of the triple reduced-motion belt; CSS is belt #1;
 * base-state-is-final markup is belt #3).
 *
 * Effects:
 *  - Bidirectional scroll-reveal on top-level section children.
 *  - Count-up on stat numbers, restoring the exact server string.
 *  - One underline-draw per section heading (restrained).
 *
 * Re-runs on client navigation (pathname change). Idempotent: already
 * processed nodes carry a marker attribute and are skipped.
 */

const REDUCED = "(prefers-reduced-motion: reduce)";

// Matches a stat-style number: optional +, digits, optional separators.
// e.g. "461", "15+", "32+", "1,200". We animate the integer part only
// and restore the byte-exact server string on completion.
const STAT_RE = /^\s*(\d[\d,]*)\s*(\+?)\s*$/;

function prefersReduced(): boolean {
  try {
    return window.matchMedia(REDUCED).matches;
  } catch {
    // matchMedia unavailable → treat as motion-OK; CSS belt still guards.
    return false;
  }
}

/* ---------------- Scroll reveal ---------------- */

function initReveal(scope: ParentNode): (() => void) | undefined {
  if (!("IntersectionObserver" in window)) return; // no polyfill: stay visible

  // Reveal the direct block children of every <section> inside <main>.
  const sections = scope.querySelectorAll<HTMLElement>("main section");
  const targets: HTMLElement[] = [];

  sections.forEach((section) => {
    // Reveal the section's own top-level children so text + cards stagger.
    const kids = Array.from(section.children) as HTMLElement[];
    const list = kids.length > 0 ? kids : [section];
    list.forEach((el) => {
      if (el.hasAttribute("data-wow-reveal")) return;
      // Skip absolutely-positioned decoration (backgrounds, scrims).
      const pos = getComputedStyle(el).position;
      if (pos === "absolute" || pos === "fixed") return;
      el.setAttribute("data-wow-reveal", "");
      el.classList.add("wow-reveal");
      targets.push(el);
    });
  });

  if (targets.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        } else if (entry.boundingClientRect.top > 0) {
          // Bidirectional: fade back out only when it leaves upward
          // (i.e. its top is below the viewport top after scrolling up).
          el.classList.remove("is-visible");
        }
      }
    },
    // threshold:0 + rootMargin — NEVER 0.15 (tall mobile sections would
    // never reach 15% visibility). Root is always the viewport.
    { threshold: 0, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/* ---------------- Underline draw ---------------- */

function initUnderline(scope: ParentNode): (() => void) | undefined {
  if (!("IntersectionObserver" in window)) return;

  // One restrained underline per section: the first h2 in each section.
  const heads: HTMLElement[] = [];
  scope.querySelectorAll<HTMLElement>("main section").forEach((section) => {
    const h2 = section.querySelector<HTMLElement>("h2");
    if (h2 && !h2.hasAttribute("data-wow-underline")) {
      h2.setAttribute("data-wow-underline", "");
      heads.push(h2);
    }
  });

  if (heads.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target); // draw once
        }
      }
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" }
  );

  heads.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/* ---------------- Count-up ---------------- */

function animateCount(el: HTMLElement): void {
  const serverText = el.textContent ?? "";
  const match = serverText.match(STAT_RE);
  if (!match) return;

  const target = parseInt(match[1].replace(/,/g, ""), 10);
  if (!Number.isFinite(target) || target <= 0) return;

  const suffix = match[2] ?? "";
  const grouped = /,/.test(match[1]);
  const durationMs = 1200;
  const start = performance.now();

  el.setAttribute("data-wow-count", "");

  const fmt = (n: number) =>
    grouped ? n.toLocaleString("en-US") : String(n);

  const tick = (now: number) => {
    const p = Math.min((now - start) / durationMs, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    const value = Math.round(eased * target);
    if (p < 1) {
      el.textContent = fmt(value) + suffix;
      requestAnimationFrame(tick);
    } else {
      // Restore the byte-exact server string — never a reformatted value.
      el.textContent = serverText;
    }
  };

  requestAnimationFrame(tick);
}

function initCount(scope: ParentNode): (() => void) | undefined {
  if (!("IntersectionObserver" in window)) return;

  // Two sources of stat numbers:
  //  a) Explicit hooks (.tabular-nums / .num / [data-stat]).
  //  b) Auto-discovered prominent numbers — a leaf element whose ENTIRE
  //     text is a stat number (e.g. "13", "300+") rendered large (>=28px).
  //     The large-font gate isolates headline stats from body copy so we
  //     never animate an inline number inside a paragraph.
  const seen = new Set<HTMLElement>();
  const explicit = Array.from(
    scope.querySelectorAll<HTMLElement>(".tabular-nums, .num, [data-stat]")
  );
  const prominent = Array.from(
    scope.querySelectorAll<HTMLElement>("main section div, main section span, main section p")
  );

  const candidates = [...explicit, ...prominent].filter((el) => {
    if (seen.has(el)) return false;
    if (el.hasAttribute("data-wow-counted")) return false;
    if (el.children.length !== 0) return false;
    const t = (el.textContent ?? "").trim();
    if (!STAT_RE.test(t) || t.length > 10) return false;
    // Auto-discovered nodes must be visually prominent (a real stat).
    const isExplicit =
      el.classList.contains("tabular-nums") ||
      el.classList.contains("num") ||
      el.hasAttribute("data-stat");
    if (!isExplicit) {
      const fontPx = parseFloat(getComputedStyle(el).fontSize) || 0;
      if (fontPx < 28) return false;
    }
    seen.add(el);
    return true;
  });

  if (candidates.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.setAttribute("data-wow-counted", "");
          animateCount(el);
          io.unobserve(el);
        }
      }
    },
    { threshold: 0, rootMargin: "0px 0px -5% 0px" }
  );

  candidates.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

export function WowMotion() {
  const pathname = usePathname();

  useEffect(() => {
    // Belt #2: hard gate. If reduced motion, do nothing at all — the
    // server-rendered, fully-visible DOM stands untouched.
    if (prefersReduced()) return;

    // Defer to next frame so the new route's DOM is present.
    let cleanups: Array<(() => void) | undefined> = [];
    const raf = requestAnimationFrame(() => {
      cleanups = [
        initReveal(document),
        initUnderline(document),
        initCount(document),
      ];
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn?.());
    };
  }, [pathname]);

  return null;
}
