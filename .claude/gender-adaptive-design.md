# Gender-Adaptive Website Architecture

Technical design for a gender-adaptive theme system on the Omanut HaKesher website.
The site's logo features two intertwined hearts (pink and blue), which naturally maps
to a personalized color experience for male and female visitors.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, npm on Windows.

---

## Table of Contents

1. [CSS Variables System](#1-css-variables-system)
2. [UI Component: Gender Selector](#2-ui-component-gender-selector)
3. [Content Adaptation](#3-content-adaptation)
4. [Hebrew Language Forms](#4-hebrew-language-forms)
5. [Technical Implementation Plan](#5-technical-implementation-plan)
6. [File Structure](#6-file-structure)
7. [Migration Checklist](#7-migration-checklist)

---

## 1. CSS Variables System

### Design Principle

The existing `globals.css` already defines `--primary` (pink #E85D75) and `--secondary`
(blue #1E3A5F) as CSS custom properties, with light and dark variants for each. The
gender system works by **swapping which color maps to `--primary` and which to
`--secondary`** via a CSS class on `<html>`, exactly the same pattern used for dark mode.

This means every component that already uses `text-primary`, `bg-primary`, `bg-secondary`,
etc. (all of them, currently) will automatically adapt with **zero component changes**.

### CSS Class Mapping

| Class on `<html>` | `--primary` resolves to | `--secondary` resolves to | Who sees it |
|--------------------|-------------------------|---------------------------|-------------|
| *(none / default)* | Pink #E85D75 | Blue #1E3A5F | Everyone (current design) |
| `.gender-female` | Pink #E85D75 | Blue #1E3A5F | Female visitors (same as default but semantic) |
| `.gender-male` | Blue #1E3A5F | Pink #E85D75 | Male visitors (swapped) |

### Implementation in `globals.css`

Add the following **after** the existing `:root` and `.dark` blocks but **before** the
`@theme inline` block. The gender classes override only the color variables, not layout
or typography:

```css
/* ================================================
   Gender-Adaptive Color Overrides
   Applied on <html> element alongside dark class.
   Composable: .gender-male.dark works correctly.
   ================================================ */

/* Female: explicit class, same as default (enables future female-specific tweaks) */
.gender-female {
  --primary: #E85D75;
  --primary-foreground: #ffffff;
  --primary-light: #F08C9E;
  --primary-dark: #C94A62;

  --secondary: #1E3A5F;
  --secondary-foreground: #ffffff;
  --secondary-light: #2C5280;
  --secondary-dark: #152B47;

  --ring: #E85D75;

  /* Warm background tint */
  --background: #FFFAF7;
  --muted: #F5EDE8;
  --border: #E8DDD5;
}

/* Male: swap primary/secondary so blue dominates */
.gender-male {
  --primary: #1E3A5F;
  --primary-foreground: #ffffff;
  --primary-light: #2C5280;
  --primary-dark: #152B47;

  --secondary: #E85D75;
  --secondary-foreground: #ffffff;
  --secondary-light: #F08C9E;
  --secondary-dark: #C94A62;

  --ring: #1E3A5F;

  /* Cool background tint */
  --background: #F7FAFF;
  --muted: #E8EDF5;
  --border: #D5DDE8;
}

/* Male + Dark Mode composition */
.gender-male.dark {
  --primary: #4A7AB5;
  --primary-foreground: #0F1729;
  --primary-light: #2C5280;
  --primary-dark: #7BA3D0;

  --secondary: #F08C9E;
  --secondary-foreground: #0F1729;
  --secondary-light: #E85D75;
  --secondary-dark: #F5B0BD;

  --ring: #4A7AB5;
}

/* Female + Dark Mode (explicit, same as current .dark) */
.gender-female.dark {
  --primary: #F08C9E;
  --primary-foreground: #0F1729;
  --primary-light: #E85D75;
  --primary-dark: #F5B0BD;

  --secondary: #4A7AB5;
  --secondary-foreground: #0F1729;
  --secondary-light: #2C5280;
  --secondary-dark: #7BA3D0;

  --ring: #F08C9E;
}
```

### Transition Effect

Add a smooth transition to the root element so color changes feel intentional:

```css
html {
  transition: background-color 0.3s ease, color 0.15s ease;
}

/* All elements that use CSS custom properties get smooth transitions */
html:not([style*="prefers-reduced-motion"]) * {
  transition-property: color, background-color, border-color, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease;
}
```

**Important:** Wrap this in `@media (prefers-reduced-motion: no-preference)` to respect
the existing reduced-motion support already in `globals.css`.

### Chart / Sidebar Variable Overrides

The `.gender-male` block should also remap chart and sidebar variables:

```css
.gender-male {
  /* ... primary/secondary as above ... */

  --chart-1: #1E3A5F;
  --chart-2: #E85D75;
  /* chart-3 (gold) stays the same */

  --sidebar-primary: #1E3A5F;
  --sidebar-ring: #1E3A5F;
}
```

### Why This Works

- The existing `@theme inline` block maps `--color-primary: var(--primary)`, so Tailwind
  classes like `text-primary`, `bg-primary/10`, `border-primary/30` all resolve through
  the CSS custom property chain.
- Gender classes compose with `.dark` because CSS specificity is flat (both are single
  class selectors) and they target different variable subsets.
- Zero Tailwind config changes needed.

---

## 2. UI Component: Gender Selector

### Placement Strategy

**Primary:** Welcome modal on first visit (cookie/localStorage check).
**Persistent:** Small toggle in header next to the dark mode button.

### Welcome Modal Design (First Visit)

A warm, non-intrusive overlay that appears once and never again:

```
+-----------------------------------------------+
|                                                |
|   [two hearts icon - pink and blue]            |
|                                                |
|   ברוכים הבאים לאומנות הקשר                    |
|   בחרו את החוויה המותאמת לכם                   |
|                                                |
|   [  Pink Heart  ]  [  Blue Heart  ]           |
|     חוויה נשית        חוויה גברית              |
|                                                |
|   [ להמשיך ללא התאמה  ]   (link, not button)   |
|                                                |
+-----------------------------------------------+
```

Key UX decisions:
- **Framing:** "Personalize your experience" (התאמה אישית), NOT "what is your gender."
- **Icons:** Two heart SVGs matching the logo. The pink heart pulses gently for female,
  blue for male. Both are presented equally.
- **Escape hatch:** A subtle text link to skip. Choosing to skip stores `"neutral"` and
  never shows the modal again.
- **Animation:** Modal fades in after 500ms delay (no jarring popup on load).
- **Accessibility:** Focus-trapped, Escape key dismisses (stores neutral), proper
  `role="dialog"` and `aria-labelledby`.
- **Mobile:** Full-screen with large touch targets.

### Header Toggle (Persistent)

A minimal icon button next to the existing dark mode toggle:

```tsx
// Two overlapping circles (hearts simplified to dots for minimal UI)
<button
  onClick={cycleGender}
  className="p-2.5 rounded-xl text-foreground/60 hover:text-foreground
             hover:bg-muted transition-colors"
  aria-label={genderLabel}
>
  {gender === 'male' ? <BlueHeartIcon /> :
   gender === 'female' ? <PinkHeartIcon /> :
   <DualHeartsIcon />}
</button>
```

Clicking cycles: neutral -> female -> male -> neutral.

The icons are small (20x20), using the same heart SVG path from the logo but filled
with the appropriate color:
- Neutral: both hearts shown (pink + blue side by side)
- Female: single pink heart
- Male: single blue heart

### Implementation Notes

- The modal is a client component (`"use client"`) rendered conditionally.
- It checks `localStorage.getItem("gender-preference")` on mount.
- If no value exists, it shows the modal.
- Once a choice is made, it stores the value and calls `setGender()` from context.

---

## 3. Content Adaptation

### What Changes Per Gender

| Content Area | Neutral (Default) | Female Visitor | Male Visitor |
|--------------|--------------------|----------------|--------------|
| **Primary color** | Pink dominant | Pink dominant | Blue dominant |
| **Background tint** | Warm cream #FFFAF7 | Warm cream | Cool off-white #F7FAFF |
| **Hero gradient** | Pink-to-blue blend | Pink emphasis | Blue emphasis |
| **CTA buttons** | Pink bg | Pink bg | Blue bg |
| **Verb forms** | Plural/neutral (אתם) | Feminine (את) | Masculine (אתה) |
| **Testimonials order** | Mixed | Female-authored first | Male-authored first |
| **Business owner title** | מטפלת זוגית מוסמכת (current) | Same | מטפל זוגי מוסמך |
| **Service descriptions** | Plural (שלכם) | Feminine (שלך/ך) | Masculine (שלך/ך) |

### Testimonials Reordering

Each testimonial gets a `gender` tag in the data:

```typescript
interface Testimonial {
  quote: string;
  author: string;
  context: string;
  gender: 'male' | 'female' | 'couple' | 'neutral';
}
```

The display component sorts testimonials to show same-gender ones first, followed by
couples, then the other gender. Example for a male visitor:

```typescript
function sortTestimonials(testimonials: Testimonial[], viewerGender: Gender): Testimonial[] {
  const priority: Record<string, number> = {
    [viewerGender]: 0,
    couple: 1,
    neutral: 2,
  };
  const otherGender = viewerGender === 'male' ? 'female' : 'male';
  priority[otherGender] = 3;

  return [...testimonials].sort(
    (a, b) => (priority[a.gender] ?? 2) - (priority[b.gender] ?? 2)
  );
}
```

### Hero Section Gradient Adaptation

The current hero has:
```tsx
<div className="absolute inset-0 bg-gradient-to-bl from-primary-light/20 via-background to-secondary-light/10" />
```

Because `--primary-light` and `--secondary-light` swap via CSS variables, the hero
gradient automatically shifts to blue-dominant for male visitors. No JSX change needed.

### Decorative Elements

The decorative blobs on the hero already use `bg-primary/5` and `bg-secondary/5`. These
automatically adapt.

---

## 4. Hebrew Language Forms

### The Problem

Hebrew has grammatical gender. The current site uses a mix of:
1. **Feminine singular** for the business owner (מאמינה, ראיתי, הגישה שלי) - these
   describe the therapist and should NOT change based on visitor gender.
2. **Masculine plural** for visitors (אתם, שלכם, מוכנים) - Hebrew uses masculine
   plural as default for mixed/unknown audiences.

The adaptation targets **visitor-facing language** (category 2), not the therapist's
self-description (category 1).

### Content Categories

| Category | Example | Adapts? | Why |
|----------|---------|---------|-----|
| Therapist self-reference | מאמינה, ראיתי, הגישה שלי | NO | Describes the (female) therapist |
| Visitor address (2nd person) | אתם/אתה/את, שלכם | YES | Address the visitor |
| CTAs and imperatives | מוכנים?, רוצים?, צרו קשר | YES | Direct call to action |
| Generic/educational | תקשורת, זוגיות, קשר | NO | Gender-neutral nouns |

### Gendered Content Registry

Create a content mapping system where each adaptive string has three variants:

```typescript
// src/lib/gendered-content.ts

export type Gender = 'male' | 'female' | 'neutral';

export interface GenderedText {
  neutral: string;   // Default (usually masculine plural, current site)
  male: string;      // Masculine singular
  female: string;    // Feminine singular
}

// Registry of all gendered strings, keyed by a stable ID
export const genderedContent: Record<string, GenderedText> = {
  // === CTAs ===
  'cta.ready': {
    neutral: 'מוכנים להתחיל את המסע?',
    male: 'מוכן להתחיל את המסע?',
    female: 'מוכנה להתחיל את המסע?',
  },
  'cta.want-to-start': {
    neutral: 'רוצים להתחיל?',
    male: 'רוצה להתחיל?',
    female: 'רוצה להתחיל?',  // same in this case
  },
  'cta.schedule': {
    neutral: 'לקביעת פגישת היכרות',
    male: 'לקביעת פגישת היכרות',
    female: 'לקביעת פגישת היכרות',  // same - infinitive is gender-neutral
  },
  'cta.contact': {
    neutral: 'צרו קשר',
    male: 'צור קשר',
    female: 'צרי קשר',
  },

  // === Hero Section ===
  'hero.subtitle': {
    neutral: 'לבנות קשר עמוק שנמשך לאורך זמן',
    male: 'לבנות קשר עמוק שנמשך לאורך זמן',
    female: 'לבנות קשר עמוק שנמשך לאורך זמן',  // infinitive = neutral
  },
  'hero.description': {
    neutral: 'ליווי מקצועי לזוגות ויחידים בדרך לתקשורת אמיתית ומשמעותית. יחד נגלה את הכלים לחיבור עמוק יותר ולקשרים שמספקים.',
    male: 'ליווי מקצועי בדרך לתקשורת אמיתית ומשמעותית. יחד נגלה את הכלים לחיבור עמוק יותר ולקשרים שמספקים.',
    female: 'ליווי מקצועי בדרך לתקשורת אמיתית ומשמעותית. יחד נגלה את הכלים לחיבור עמוק יותר ולקשרים שמספקים.',
  },

  // === Final CTA Section ===
  'final-cta.heading': {
    neutral: 'מוכנים להתחיל את המסע?',
    male: 'מוכן להתחיל את המסע?',
    female: 'מוכנה להתחיל את המסע?',
  },
  'final-cta.body': {
    neutral: 'פגישת היכרות ראשונה ללא התחייבות. בואו נכיר ונראה איך אפשר לעזור לכם לבנות את הקשר שאתם רוצים.',
    male: 'פגישת היכרות ראשונה ללא התחייבות. בוא נכיר ונראה איך אפשר לעזור לך לבנות את הקשר שאתה רוצה.',
    female: 'פגישת היכרות ראשונה ללא התחייבות. בואי נכיר ונראה איך אפשר לעזור לך לבנות את הקשר שאת רוצה.',
  },

  // === About Page ===
  'about.know-us': {
    neutral: 'הכירו אותנו',
    male: 'הכר אותנו',
    female: 'הכירי אותנו',
  },

  // === Services Page ===
  'services.what-we-offer': {
    neutral: 'מה אנחנו מציעים',
    male: 'מה אנחנו מציעים',
    female: 'מה אנחנו מציעים',  // 1st person stays
  },
  'services.your-needs': {
    neutral: 'מותאם אישית לצרכים שלכם',
    male: 'מותאם אישית לצרכים שלך',
    female: 'מותאם אישית לצרכים שלך',
  },

  // === Contact Form ===
  'contact.tell-us': {
    neutral: 'ספרו לנו קצת',
    male: 'ספר לנו קצת',
    female: 'ספרי לנו קצת',
  },
  'contact.placeholder': {
    neutral: 'מה הביא אתכם אלינו? איך נוכל לעזור?',
    male: 'מה הביא אותך אלינו? איך נוכל לעזור?',
    female: 'מה הביא אותך אלינו? איך נוכל לעזור?',
  },
  'contact.response': {
    neutral: 'נחזור אליכם תוך 24 שעות',
    male: 'נחזור אליך תוך 24 שעות',
    female: 'נחזור אליך תוך 24 שעות',
  },
  'contact.success': {
    neutral: 'נחזור אליכם בהקדם האפשרי',
    male: 'נחזור אליך בהקדם האפשרי',
    female: 'נחזור אליך בהקדם האפשרי',
  },

  // === Newsletter ===
  'newsletter.your-email': {
    neutral: 'האימייל שלכם',
    male: 'האימייל שלך',
    female: 'האימייל שלך',
  },
  'newsletter.stay-updated': {
    neutral: 'הישארו מעודכנים',
    male: 'הישאר מעודכן',
    female: 'הישארי מעודכנת',
  },
  'newsletter.signup-cta': {
    neutral: 'הירשמו לניוזלטר וקבלו טיפים, מאמרים ותוכן בלעדי ישירות למייל',
    male: 'הירשם לניוזלטר וקבל טיפים, מאמרים ותוכן בלעדי ישירות למייל',
    female: 'הירשמי לניוזלטר וקבלי טיפים, מאמרים ותוכן בלעדי ישירות למייל',
  },

  // === Testimonials ===
  'testimonials.what-they-say': {
    neutral: 'מה אומרים עלינו',
    male: 'מה אומרים עלינו',
    female: 'מה אומרים עלינו',  // 3rd person, stays same
  },

  // === Blog ===
  'blog.read-more': {
    neutral: 'קראו עוד',
    male: 'קרא עוד',
    female: 'קראי עוד',
  },
  'blog.about-approach': {
    neutral: 'קראו עוד על הגישה שלי',
    male: 'קרא עוד על הגישה שלי',
    female: 'קראי עוד על הגישה שלי',
  },

  // === Footer ===
  'footer.registered-success': {
    neutral: 'נרשמתם בהצלחה!',
    male: 'נרשמת בהצלחה!',
    female: 'נרשמת בהצלחה!',  // same for both singular
  },
};
```

### Helper Function

```typescript
// src/lib/gendered-content.ts (continued)

export function t(key: string, gender: Gender): string {
  const entry = genderedContent[key];
  if (!entry) {
    console.warn(`Missing gendered content key: ${key}`);
    return key;
  }
  return entry[gender] ?? entry.neutral;
}
```

### React Hook Integration

```typescript
// Usage in components
const { gender } = useGender();

// In JSX:
<h2>{t('cta.ready', gender)}</h2>
```

### Important: What Does NOT Change

The **therapist's own voice** stays feminine because the business owner is female:
- "מאמינה שכולם יכולים" - STAYS (therapist speaking)
- "ראיתי כיצד" - STAYS
- "הגישה שלי" - STAYS
- "מטפלת זוגית מוסמכת" - STAYS
- "אני מאמינה" - STAYS

Only visitor-addressed text (2nd person) adapts.

---

## 5. Technical Implementation Plan

### 5.1 GenderContext Provider

```typescript
// src/components/GenderProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Gender } from "@/lib/gendered-content";

interface GenderContextValue {
  gender: Gender;
  setGender: (gender: Gender) => void;
  isFirstVisit: boolean;
  dismissWelcome: () => void;
}

const GenderContext = createContext<GenderContextValue>({
  gender: "neutral",
  setGender: () => {},
  isFirstVisit: false,
  dismissWelcome: () => {},
});

export function useGender() {
  return useContext(GenderContext);
}

const STORAGE_KEY = "gender-preference";
const WELCOMED_KEY = "gender-welcomed";

export function GenderProvider({ children }: { children: React.ReactNode }) {
  const [gender, setGenderState] = useState<Gender>("neutral");
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as Gender | null;
    if (stored === "male" || stored === "female" || stored === "neutral") {
      setGenderState(stored);
    }

    const welcomed = localStorage.getItem(WELCOMED_KEY);
    if (!welcomed) {
      setIsFirstVisit(true);
    }
  }, []);

  // Apply CSS class when gender changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("gender-male", "gender-female");

    if (gender === "male") {
      root.classList.add("gender-male");
    } else if (gender === "female") {
      root.classList.add("gender-female");
    }

    localStorage.setItem(STORAGE_KEY, gender);
  }, [gender, mounted]);

  const setGender = useCallback((newGender: Gender) => {
    setGenderState(newGender);
  }, []);

  const dismissWelcome = useCallback(() => {
    setIsFirstVisit(false);
    localStorage.setItem(WELCOMED_KEY, "true");
  }, []);

  return (
    <GenderContext.Provider value={{ gender, setGender, isFirstVisit, dismissWelcome }}>
      {children}
    </GenderContext.Provider>
  );
}
```

### 5.2 Flash Prevention Script

Similar to the existing dark mode flash prevention script in `layout.tsx`, add a gender
flash prevention script:

```html
<script dangerouslySetInnerHTML={{ __html: `
  (function(){
    try {
      var g = localStorage.getItem("gender-preference");
      if (g === "male") document.documentElement.classList.add("gender-male");
      else if (g === "female") document.documentElement.classList.add("gender-female");
    } catch(e) {}
  })()
`}} />
```

This runs synchronously before React hydration, preventing a flash of the wrong color
scheme (same technique already used for dark mode).

### 5.3 Layout Integration

Update `src/app/layout.tsx`:

```tsx
import { GenderProvider } from "@/components/GenderProvider";
import { WelcomeModal } from "@/components/WelcomeModal";

// In the body:
<body className={`${heebo.variable} font-sans antialiased`}>
  <ThemeProvider>
    <GenderProvider>
      <TooltipProvider>
        <SkipToContent />
        <GoogleAnalytics />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WelcomeModal />
        <WhatsAppButton />
        <ScrollToTop />
      </TooltipProvider>
    </GenderProvider>
  </ThemeProvider>
</body>
```

### 5.4 Welcome Modal Component

```typescript
// src/components/WelcomeModal.tsx
"use client";

import { useGender } from "@/components/GenderProvider";
import { useEffect, useRef } from "react";

export function WelcomeModal() {
  const { isFirstVisit, setGender, dismissWelcome } = useGender();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isFirstVisit) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleChoice("neutral");
      }
    };

    // Delay appearance for smoother UX
    const timer = setTimeout(() => {
      dialogRef.current?.focus();
    }, 500);

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFirstVisit]);

  function handleChoice(choice: "male" | "female" | "neutral") {
    setGender(choice);
    dismissWelcome();
  }

  if (!isFirstVisit) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center
                 bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="mx-4 w-full max-w-md bg-card rounded-3xl p-8 md:p-10
                   shadow-2xl text-center animate-in zoom-in-95 duration-200"
      >
        {/* Dual hearts icon */}
        <div className="flex justify-center gap-2 mb-6">
          <svg className="w-10 h-10 text-[#E85D75]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <svg className="w-10 h-10 text-[#1E3A5F]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        <h2 id="welcome-title" className="text-2xl font-bold mb-2">
          ברוכים הבאים לאומנות הקשר
        </h2>
        <p className="text-muted-foreground mb-8">
          בחרו את החוויה המותאמת לכם
        </p>

        <div className="flex gap-4 justify-center mb-6">
          {/* Female option */}
          <button
            onClick={() => handleChoice("female")}
            className="group flex-1 p-6 rounded-2xl border-2 border-border
                       hover:border-[#E85D75] hover:bg-[#E85D75]/5
                       transition-all duration-200 focus-visible:ring-2
                       focus-visible:ring-[#E85D75]"
          >
            <svg className="w-12 h-12 mx-auto mb-3 text-[#E85D75]
                            group-hover:scale-110 transition-transform"
                 fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-semibold block">חוויה נשית</span>
          </button>

          {/* Male option */}
          <button
            onClick={() => handleChoice("male")}
            className="group flex-1 p-6 rounded-2xl border-2 border-border
                       hover:border-[#1E3A5F] hover:bg-[#1E3A5F]/5
                       transition-all duration-200 focus-visible:ring-2
                       focus-visible:ring-[#1E3A5F]"
          >
            <svg className="w-12 h-12 mx-auto mb-3 text-[#1E3A5F]
                            group-hover:scale-110 transition-transform"
                 fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-semibold block">חוויה גברית</span>
          </button>
        </div>

        <button
          onClick={() => handleChoice("neutral")}
          className="text-sm text-muted-foreground hover:text-foreground
                     transition-colors underline underline-offset-4"
        >
          להמשיך ללא התאמה
        </button>
      </div>
    </div>
  );
}
```

### 5.5 Header Gender Toggle

Add to the existing `Header.tsx`, next to the dark mode toggle:

```tsx
import { useGender } from "@/components/GenderProvider";
import { t } from "@/lib/gendered-content";

// Inside the Header component:
const { gender, setGender } = useGender();

const cycleGender = () => {
  const cycle: Gender[] = ["neutral", "female", "male"];
  const currentIndex = cycle.indexOf(gender);
  const nextIndex = (currentIndex + 1) % cycle.length;
  setGender(cycle[nextIndex]);
};

const genderLabel =
  gender === "male" ? "מצב גברי - לחצו לשינוי" :
  gender === "female" ? "מצב נשי - לחצו לשינוי" :
  "התאמה אישית - לחצו לשינוי";

// JSX (add next to theme toggle):
<button
  onClick={cycleGender}
  className="p-2.5 rounded-xl text-foreground/60 hover:text-foreground
             hover:bg-muted transition-colors"
  aria-label={genderLabel}
  title={genderLabel}
>
  {gender === "male" ? (
    <svg className="w-5 h-5 text-[#1E3A5F]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ) : gender === "female" ? (
    <svg className="w-5 h-5 text-[#E85D75]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ) : (
    <div className="flex -space-x-1.5">
      <svg className="w-4 h-4 text-[#E85D75]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <svg className="w-4 h-4 text-[#1E3A5F]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </div>
  )}
</button>
```

### 5.6 GenderedText Component

A convenience component for inline use:

```tsx
// src/components/GenderedText.tsx
"use client";

import { useGender } from "@/components/GenderProvider";
import { t } from "@/lib/gendered-content";

interface GenderedTextProps {
  id: string;           // Key from genderedContent registry
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function GenderedText({ id, as: Tag = "span", className }: GenderedTextProps) {
  const { gender } = useGender();
  return <Tag className={className}>{t(id, gender)}</Tag>;
}
```

Usage:
```tsx
<GenderedText id="cta.ready" as="h2" className="text-3xl font-bold" />
```

### 5.7 Interaction with Dark Mode

The two systems compose cleanly:

| State | Classes on `<html>` | Result |
|-------|---------------------|--------|
| Light + Neutral | *(none)* | Current default |
| Light + Female | `gender-female` | Pink primary, warm bg |
| Light + Male | `gender-male` | Blue primary, cool bg |
| Dark + Neutral | `dark` | Current dark mode |
| Dark + Female | `dark gender-female` | Pink primary, dark bg |
| Dark + Male | `dark gender-male` | Blue primary, dark bg |

CSS specificity ensures both work because `.gender-male.dark` is defined explicitly
in `globals.css` and overrides the base `.dark` values for primary/secondary.

### 5.8 localStorage Schema

```
localStorage keys:
  "theme"              -> "light" | "dark"               (existing)
  "gender-preference"  -> "male" | "female" | "neutral"  (new)
  "gender-welcomed"    -> "true"                          (new, controls modal)
```

### 5.9 SSR / Hydration Safety

- Both providers (`ThemeProvider` and `GenderProvider`) use the `mounted` state pattern
  to avoid hydration mismatches.
- The inline `<script>` in `<head>` applies the correct class before paint, preventing
  flashes.
- Server-rendered HTML always reflects the neutral/default state. The client script
  immediately applies the correct gender class if one is stored.

---

## 6. File Structure

```
src/
  lib/
    gendered-content.ts          # GenderedText registry, t() helper, Gender type
    blog-posts.ts                # (existing) - add gender tags to testimonial data
    utils.ts                     # (existing)

  components/
    GenderProvider.tsx            # GenderContext, useGender hook, localStorage
    WelcomeModal.tsx              # First-visit gender selection modal
    GenderedText.tsx              # <GenderedText id="..." /> convenience component
    ThemeProvider.tsx             # (existing, unchanged)
    Header.tsx                   # (modified: add gender toggle button)
    Footer.tsx                   # (modified: use GenderedText for visitor strings)
    ContactForm.tsx              # (modified: use GenderedText for labels/placeholders)
    HomeTestimonials.tsx         # (modified: sort by viewer gender, add gender tags)

  app/
    layout.tsx                   # (modified: add GenderProvider, flash-prevention script)
    globals.css                  # (modified: add .gender-male, .gender-female blocks)
    page.tsx                     # (modified: use GenderedText for CTAs)
    about/page.tsx               # (modified: use GenderedText for visitor-facing text)
    services/page.tsx            # (modified: use GenderedText)
    contact/page.tsx             # (modified: use GenderedText)
    testimonials/page.tsx        # (modified: sort by gender)
    blog/page.tsx                # (modified: use GenderedText for "read more")
```

### New Files (3)

| File | Lines (est.) | Purpose |
|------|-------------|---------|
| `src/lib/gendered-content.ts` | ~150 | Content registry, `t()` function, `Gender` type |
| `src/components/GenderProvider.tsx` | ~80 | Context, hook, localStorage, CSS class management |
| `src/components/WelcomeModal.tsx` | ~120 | First-visit modal with heart icons |
| `src/components/GenderedText.tsx` | ~20 | Convenience component for inline use |

### Modified Files (8-10)

| File | Change Scope | Description |
|------|-------------|-------------|
| `globals.css` | +50 lines | Gender color variable blocks |
| `layout.tsx` | +10 lines | GenderProvider, flash script, WelcomeModal |
| `Header.tsx` | +30 lines | Gender toggle button |
| `page.tsx` | ~15 edits | Replace hardcoded Hebrew with GenderedText |
| `about/page.tsx` | ~8 edits | Replace visitor-facing text |
| `services/page.tsx` | ~6 edits | Replace visitor-facing text |
| `contact/page.tsx` | ~4 edits | Replace visitor-facing text |
| `ContactForm.tsx` | ~5 edits | Labels and placeholders |
| `HomeTestimonials.tsx` | +20 lines | Gender tags on data, sorting logic |
| `Footer.tsx` | ~4 edits | Newsletter text |

---

## 7. Migration Checklist

### Phase 1: Infrastructure (no visual changes)

- [ ] Create `src/lib/gendered-content.ts` with type, registry, and `t()` function
- [ ] Create `src/components/GenderProvider.tsx`
- [ ] Create `src/components/GenderedText.tsx`
- [ ] Add gender CSS variable blocks to `globals.css`
- [ ] Add `GenderProvider` to `layout.tsx`
- [ ] Add flash-prevention `<script>` to `layout.tsx`
- [ ] Verify dark mode still works (no regressions)
- [ ] Verify `npm run build` succeeds

### Phase 2: Gender Selection UI

- [ ] Create `src/components/WelcomeModal.tsx`
- [ ] Add WelcomeModal to `layout.tsx`
- [ ] Add gender toggle button to `Header.tsx` (desktop and mobile)
- [ ] Test cycling through neutral -> female -> male
- [ ] Test modal appears on first visit, never again
- [ ] Test Escape key dismisses modal
- [ ] Test dark mode + gender composition (6 states)
- [ ] Verify accessibility (keyboard, screen reader)

### Phase 3: Content Adaptation

- [ ] Replace hardcoded Hebrew CTAs with `<GenderedText>` on home page
- [ ] Replace on about page
- [ ] Replace on services page
- [ ] Replace on contact page and ContactForm
- [ ] Replace on blog listing page
- [ ] Replace in Footer (newsletter section)
- [ ] Add `gender` field to testimonials data
- [ ] Implement testimonial sorting by viewer gender
- [ ] Test all three modes across all pages

### Phase 4: Polish

- [ ] Verify smooth transition animations between modes
- [ ] Verify reduced-motion preferences respected
- [ ] Verify SSR: server renders neutral, client hydrates correctly
- [ ] Test on mobile (modal full-screen, toggle accessible)
- [ ] Cross-browser test (Chrome, Firefox, Safari, Edge)
- [ ] Lighthouse audit (no performance regression)
- [ ] `npm run build` clean, no TypeScript errors

### Edge Cases to Test

- localStorage disabled (should fall back to neutral gracefully)
- Browser back/forward with different gender state
- Multiple tabs with different gender settings
- Clearing localStorage resets to first-visit experience
- Very slow network: modal should not flash content behind it
