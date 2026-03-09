# Book Section Implementation Plan

## /book/* Companion Content for "Omanut HaKesher" Website

**Created:** 2026-03-09
**Source:** `omanut-hakesher-book/website-content-plan.md`
**Target:** `omanut-hakesher-website/src/app/book/*`

---

## 1. Current State Analysis

### Existing /book page
The current `/book` page (`src/app/book/page.tsx`) is a static marketing page with:
- Hero section with book cover placeholder
- Stats strip (10 chapters, 32 exercises, 250+ pages, 9 stories)
- "Who is this for" section
- Chapter table of contents (10 chapters listed)
- Three promises section
- Excerpt from the introduction
- CTA section

**What needs to change:** The current page becomes the landing/gateway page for the entire `/book/*` section. It needs to be enhanced with an access code input, navigation to chapter hubs, and a preview-to-gated content flow.

### Existing Design System (must preserve)
- **Colors:** Primary `#E85D75`, Secondary `#1E3A5F`, Accent `#D4A853`, Background `#FFFAF7`
- **Dark mode:** Full support with `.dark` class composition
- **Gender-adaptive:** `.gender-male` / `.gender-female` classes swap primary/secondary
- **Font:** Heebo (300-700 weights), `--font-heebo` CSS variable
- **Radius:** 0.75rem base (`--radius`)
- **Framework:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui
- **CMS:** Sanity v5 (for blog, testimonials, services -- NOT yet for book content)
- **Animations:** framer-motion (ScrollReveal, StaggerContainer, AnimatedCounter)
- **RTL:** `dir="rtl"` on `<html>`, Hebrew throughout

### Existing Components to Reuse
- `Breadcrumbs` -- schema.org structured data, supports multi-level
- `Badge` -- shadcn/ui, used for section labels
- `Card`, `CardContent` -- shadcn/ui, primary content container
- `ScrollReveal` -- framer-motion scroll animations
- `StaggerContainer`, `StaggerItem` -- staggered entrance animations
- `AnimatedCounter` -- animated number counters
- `Accordion` -- shadcn/ui, for FAQ sections
- `GenderedText` / `GenderProvider` -- gender-adaptive content system
- `Separator` -- shadcn/ui divider

### Existing UI Patterns (from hadrech, about, book pages)
- Hero: full-width image background with overlay + text content
- Section: `py-20` or `py-24` padding, alternating `bg-muted/50`
- Headings: `Badge` label above, `h2` with `<span className="text-primary">` highlight
- Cards: `border-border/50`, hover effects (`hover:shadow-md hover:border-primary/20`)
- CTAs: `bg-primary text-white rounded-full` buttons
- Container: `container mx-auto px-4 max-w-{size}` pattern

---

## 2. Route Structure

### Information Architecture

```
/book                           -- Landing + access gate (enhanced existing page)
/book/intro                     -- Hub: Introduction companion content
/book/intro/readiness-quiz      -- Interactive quiz: Readiness assessment
/book/intro/commitment          -- PDF download: Personal commitment contract
/book/1                         -- Hub: Chapter 1 companion content
/book/1/story-quiz              -- Interactive quiz: What's your story?
/book/1/four-a-day              -- Interactive tool: Daily affirmation reminders
/book/2                         -- Hub: Chapter 2 companion content
/book/2/fear-map                -- Interactive quiz: Map your 14 fears
/book/2/inner-dialogue          -- Audio exercise: Inner dialogue meditation
/book/3                         -- Hub: Chapter 3 companion content
/book/3/stop-rushing            -- Video embed
/book/3/release-letter          -- Audio exercise: Release letter
/book/4                         -- Hub: Chapter 4 companion content
/book/4/body-scan               -- Audio exercise: Pre-date body scan
/book/4/boundary-talk           -- Video embed: Boundary conversation demo
/book/5                         -- Hub: Chapter 5 companion content
/book/5/attachment-quiz         -- Interactive quiz: Attachment style
/book/5/who-am-i                -- Interactive quiz: User manual generator
/book/6                         -- Hub: Chapter 6 companion content
/book/6/emotion-wheel           -- Interactive tool: Emotion wheel
/book/6/active-listening        -- Video embed
/book/7                         -- Hub: Chapter 7 companion content
/book/7/body-language           -- Video embed
/book/7/first-date-demo         -- Video embed
/book/8                         -- Hub: Chapter 8 companion content
/book/8/attraction-map          -- Interactive quiz: Attraction map
/book/8/courage-tracker         -- Interactive tool: Daily courage journal
/book/9                         -- Hub: Chapter 9 companion content
/book/9/profile-photo           -- Visual guide: Winning profile photos
/book/9/date-report             -- Interactive quiz: Date report (quick + deep)
/book/10                        -- Hub: Chapter 10 companion content
/book/10/golden-rules           -- Poster download: 10 golden rules
/book/10/date-mastery           -- Video embed
/book/10/pre-date-audio         -- Audio exercise: 5 minutes before the date
/book/10/date-debrief-worksheet -- PDF download: Date debrief worksheet
/book/11                        -- Hub: Chapter 11 companion content
/book/11/connection-score       -- Interactive quiz: Connection score
/book/11/chance-calculator      -- Interactive tool: Traffic light decision tool
/book/11/real-chemistry         -- Video embed
/book/11/chemistry-quiz         -- Interactive quiz: Chemistry test
/book/11/butterflies-audio      -- Audio exercise
/book/12                        -- Hub: Chapter 12 companion content
/book/12/vulnerability-stage    -- Interactive quiz: Pool stage assessment
/book/12/36-questions           -- Interactive tool: Digital question cards
/book/12/vulnerability-art      -- Video embed
/book/12/vulnerable-sentence-audio -- Audio exercise
/book/12/vulnerability-ladder   -- PDF download
/book/13                        -- Hub: Chapter 13 companion content
/book/13/fear-map               -- Interactive quiz: Commitment fears
/book/13/readiness-quiz         -- Interactive quiz: Commitment readiness (7+13 Qs)
/book/13/the-choice             -- Video embed
/book/13/future-meditation      -- Audio exercise
/book/closing                   -- Hub: Closing companion content
/book/closing/gps-poster        -- Poster download: 10 GPS principles
/book/closing/future-letter     -- Digital service: Letter to future self
/book/closing/readiness-retest  -- Interactive quiz: Before/after comparison
/book/closing/first-step        -- Video embed
```

### Next.js App Router File Structure

```
src/app/book/
  layout.tsx              -- Book section layout (AccessGate, book nav sidebar)
  page.tsx                -- Landing page (enhanced existing) with access code input
  intro/
    page.tsx              -- Hub page
    readiness-quiz/
      page.tsx            -- Quiz page
    commitment/
      page.tsx            -- PDF download page
  [chapter]/              -- Dynamic route for chapters 1-13
    page.tsx              -- Hub page (dynamic, content from MDX/data)
    [tool]/               -- Dynamic route for chapter tools
      page.tsx            -- Tool page (renders quiz/audio/video/pdf based on type)
  closing/
    page.tsx              -- Hub page
    gps-poster/
      page.tsx
    future-letter/
      page.tsx
    readiness-retest/
      page.tsx
    first-step/
      page.tsx
```

**Note on dynamic routes:** Using `[chapter]` and `[tool]` dynamic segments allows a single template to render all 13 chapter hubs and all tools based on content data files. This dramatically reduces code duplication. Static routes are used only for `intro/`, `closing/`, and the main `page.tsx` because they have unique layouts.

### Merged Pages (from content plan)
- `/book/9/date-report` and `/book/10/date-debrief` --> unified at `/book/date-report` with quick (5Q) and deep (7Q) modes
- `/book/13/readiness-quiz` and `/book/13/readiness-check` --> unified at `/book/13/readiness-quiz` with core (7Q) + expansion (13Q) stages
- `/book/closing/future-letter` and `/book/closing/letter-template` --> unified at `/book/closing/future-letter` with PDF download option + email scheduling

---

## 3. Priority P0 Pages (Launch Day)

These pages MUST be live when the book ships. Total: ~20 pages + infrastructure.

### Infrastructure (Week 1)
1. **Access code system** -- code validation API route, session management
2. **`<AccessGate>` wrapper component** -- wraps all `/book/*` content
3. **Book section `layout.tsx`** -- shared navigation, progress tracker sidebar
4. **Supabase project + schema** -- access_codes, users, quiz_results, user_progress

### Core Pages (Weeks 2-3)
5. **`/book` landing** -- enhanced existing page with access code input field
6. **`/book/intro` hub** -- video embed + links to readiness quiz + audio player
7. **`/book/intro/readiness-quiz`** -- 10 questions, radar chart, score saved to DB
8. **`/book/5` hub** -- video embed + links to both quizzes + PDF download
9. **`/book/5/attachment-quiz`** -- 20 questions, anxiety/avoidance chart, recommendations
10. **`/book/5/who-am-i`** -- 12 questions, PDF report generation, shareable
11. **`/book/closing` hub** -- video embed + links to all closing tools
12. **`/book/closing/readiness-retest`** -- same 10 questions, comparison with intro score
13. **`/book/closing/future-letter`** -- letter writing form + Resend scheduled email

### All 15 Hub Pages (Week 4)
14-28. Hub pages for all chapters (intro, 1-13, closing) -- even if some tools show "coming soon"

---

## 4. Component Architecture

### New Shared Components

```
src/components/book/
  AccessGate.tsx          -- Validates access code, shows login/gate UI
  AccessCodeInput.tsx     -- Styled input + validation for entering book code
  ChapterHub.tsx          -- Reusable layout for chapter landing pages
  ChapterNav.tsx          -- Sidebar/bottom navigation between chapters
  ProgressTracker.tsx     -- Visual progress indicator across book journey
  ContentCard.tsx         -- Card for linking to a tool (quiz/audio/video/pdf)
  ComingSoonBadge.tsx     -- Badge for tools not yet available
  QuizForm.tsx            -- Reusable quiz engine (questions, scoring, results)
  QuizQuestion.tsx        -- Single quiz question component (scale/multiple choice)
  RadarChart.tsx          -- Radar/spider chart for multi-axis scoring
  BarChart.tsx            -- Bar chart for single-axis comparisons
  ComparisonChart.tsx     -- Before/after comparison chart
  AudioPlayer.tsx         -- Custom audio player (progress, speed, download)
  VideoEmbed.tsx          -- Responsive video embed (YouTube/Vimeo) with tracking
  PDFDownload.tsx         -- Download button with file preview and analytics
  QuizResult.tsx          -- Styled quiz result display with recommendations
  ShareButton.tsx         -- Social/WhatsApp sharing for quiz results
  BookBreadcrumbs.tsx     -- Extended breadcrumbs for book section (3 levels deep)
```

### Data Layer

```
src/data/book/
  chapters.ts             -- Chapter metadata (number, title, slug, description)
  quizzes/
    readiness-quiz.ts     -- Questions, scoring logic, result text
    attachment-quiz.ts    -- Questions, scoring axes, recommendations
    who-am-i.ts           -- Questions, combined analysis, PDF template
    story-quiz.ts         -- Questions, story type classification
    fear-map.ts           -- 14 fears, rating scale, coping strategies
    attraction-map.ts     -- 3-level attraction questions + tips
    date-report.ts        -- Quick (5Q) + deep (7Q) modes
    connection-score.ts   -- 4-axis scoring
    chemistry-quiz.ts     -- 15 questions, 3-type classification
    vulnerability-stage.ts -- 4 stages, recommendations
    fear-map-13.ts        -- 5 commitment fears
    readiness-quiz-13.ts  -- 7 core + 13 expansion questions
    readiness-retest.ts   -- Same as readiness-quiz, with comparison logic
  hub-content/
    intro.ts              -- Hub page content (videos, links, descriptions)
    chapter-1.ts          -- etc.
    ...
    chapter-13.ts
    closing.ts
```

### API Routes

```
src/app/api/book/
  validate-code/
    route.ts              -- POST: validate access code, create session
  quiz-results/
    route.ts              -- POST: save quiz results; GET: retrieve user's results
  future-letter/
    route.ts              -- POST: save letter, schedule delivery
  progress/
    route.ts              -- POST: mark chapter complete; GET: user progress
```

---

## 5. Database Schema (Supabase)

```sql
-- Access codes (printed in physical book)
CREATE TABLE access_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(12) UNIQUE NOT NULL,      -- e.g., "AHK-2026-XXXX"
  activated_at TIMESTAMPTZ,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Users (optional email for saved progress)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255),
  name VARCHAR(255),
  access_code_id UUID REFERENCES access_codes(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz results
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  quiz_type VARCHAR(50) NOT NULL,         -- e.g., "readiness", "attachment", "who-am-i"
  answers JSONB NOT NULL,                 -- raw answers
  score JSONB NOT NULL,                   -- computed scores/axes
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Date reports (unified quick/deep)
CREATE TABLE date_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  mode VARCHAR(10) NOT NULL,              -- "quick" or "deep"
  date_number INTEGER,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Future letters (scheduled email)
CREATE TABLE future_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  send_at TIMESTAMPTZ NOT NULL,           -- 1 year from creation
  sent_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'pending',   -- pending, sent, failed
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User progress tracking
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  chapter VARCHAR(20) NOT NULL,           -- "intro", "1", "2", ..., "13", "closing"
  tool_slug VARCHAR(50),                  -- specific tool completed (optional)
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_type ON quiz_results(quiz_type);
CREATE INDEX idx_date_reports_user ON date_reports(user_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_future_letters_send ON future_letters(send_at) WHERE status = 'pending';
CREATE INDEX idx_access_codes_code ON access_codes(code);
```

---

## 6. Authentication Flow

```
1. User scans QR code from physical book --> lands on /book/[chapter]/[tool]
2. Page renders a PREVIEW (blurred content, teaser text)
3. User taps "Enter access code" --> modal/section with AccessCodeInput
4. Code validated via API --> Supabase anonymous session created
5. Session stored in localStorage + cookie (for SSR)
6. All /book/* content now accessible
7. Optional: user provides email for persistent progress + future-letter
```

**Access code format:** `AHK-XXXX-XXXX` (12 chars, alphanumeric, printed inside book cover)

**Session persistence:** Anonymous Supabase auth session. If user provides email, session upgrades to persistent. Quiz results saved to user_id in both cases.

**QR code behavior:** Each QR code in the physical book points to a specific `/book/[chapter]/[tool]` URL. The page shows a teaser preview (e.g., quiz title, description, 1-2 sample questions) before requiring authentication. This ensures the QR landing page is useful even without a code, encouraging purchase.

---

## 7. Integration with Existing Site

### Navigation
- The header already has a "Book" link pointing to `/book`
- `Header.tsx` uses `pathname.startsWith(href)` for active state, so all `/book/*` pages will highlight the "Book" nav item
- No header changes needed

### Layout Strategy
- **`/book` landing page** uses the root layout (Header + Footer visible)
- **`/book/*` content pages** use a nested `layout.tsx` that adds:
  - A chapter sidebar navigation (desktop) / bottom tab bar (mobile)
  - A progress tracker showing completed chapters
  - The AccessGate wrapper
  - The Header and Footer remain from the root layout

### Breadcrumbs Pattern
Existing `Breadcrumbs` component supports multi-level. For book pages:
```
Home > Book > Chapter 5 > Attachment Quiz
```
Use: `items={[{ label: "Book", href: "/book" }, { label: "Chapter 5", href: "/book/5" }, { label: "Attachment Quiz" }]}`

### Gender-Adaptive Content
Quiz questions and results should use the `GenderedText` system. New gendered content entries needed:
```
"book.access-code": { neutral: "הזינו את קוד הגישה", male: "הזן את קוד הגישה", female: "הזיני את קוד הגישה" }
"book.your-results": { neutral: "התוצאות שלכם", male: "התוצאות שלך", female: "התוצאות שלך" }
"book.share": { neutral: "שתפו את התוצאה", male: "שתף את התוצאה", female: "שתפי את התוצאה" }
```

### Dark Mode
All new components must respect the existing dark mode tokens. Use CSS variables (`bg-background`, `text-foreground`, `bg-card`, etc.) -- never hardcode colors.

### Sanity CMS
The book content is NOT managed through Sanity. Quiz questions, chapter content, and hub page data are stored as TypeScript data files in `src/data/book/`. This is intentional:
- Book content is versioned with code (matches book edition)
- No need for non-technical content editing
- Static generation (SSG) for performance
- User-generated data (quiz results, letters) goes to Supabase

---

## 8. Content Type Patterns

### Quiz Pages
```
Layout:
  Breadcrumbs
  Hero (small: title + description + chapter badge)
  QuizForm (questions -> scoring -> results)
  Results section (chart + recommendations + share button)
  "Next in this chapter" navigation
```

### Hub Pages (Chapter Landing)
```
Layout:
  Breadcrumbs
  Hero (chapter number + title + description)
  Video embed (main chapter video from course)
  Content cards grid (links to quizzes, audio, PDFs, tools)
  Chapter navigation (prev/next chapter)
```

### Audio Exercise Pages
```
Layout:
  Breadcrumbs
  Hero (small: title + description)
  AudioPlayer (custom player with progress, speed controls, download)
  Exercise instructions text
  "Next in this chapter" navigation
```

### Video Pages
```
Layout:
  Breadcrumbs
  Hero (small: title + description)
  VideoEmbed (responsive, with tracking)
  Key takeaways / summary text
  "Next in this chapter" navigation
```

### PDF Download Pages
```
Layout:
  Breadcrumbs
  Hero (small: title + description)
  PDF preview image
  PDFDownload button (with analytics)
  Usage instructions
  "Next in this chapter" navigation
```

---

## 9. Sprint Plan

### Week 1: Infrastructure & Foundation
**Goal:** Database, auth flow, core components, layout

| Task | Files | Effort |
|------|-------|--------|
| Set up Supabase project | External | 2h |
| Create database schema (all tables + indexes) | Supabase migration | 1h |
| Create `/book/layout.tsx` with sidebar + AccessGate | `src/app/book/layout.tsx` | 4h |
| Build `AccessGate` component | `src/components/book/AccessGate.tsx` | 3h |
| Build `AccessCodeInput` component | `src/components/book/AccessCodeInput.tsx` | 2h |
| API route: `/api/book/validate-code` | `src/app/api/book/validate-code/route.ts` | 3h |
| Build `ChapterHub` layout component | `src/components/book/ChapterHub.tsx` | 3h |
| Build `ChapterNav` sidebar/bottom nav | `src/components/book/ChapterNav.tsx` | 3h |
| Build `ContentCard` for hub pages | `src/components/book/ContentCard.tsx` | 2h |
| Build `VideoEmbed` component | `src/components/book/VideoEmbed.tsx` | 2h |
| Build `AudioPlayer` component | `src/components/book/AudioPlayer.tsx` | 4h |
| Build `PDFDownload` component | `src/components/book/PDFDownload.tsx` | 2h |
| Build `ProgressTracker` component | `src/components/book/ProgressTracker.tsx` | 3h |
| Create chapter metadata data file | `src/data/book/chapters.ts` | 1h |
| Create hub content data files (all 15) | `src/data/book/hub-content/*.ts` | 3h |
| Enhance existing `/book` page with access code input | `src/app/book/page.tsx` | 3h |

**Week 1 Total: ~40h**

### Week 2: Core Quizzes
**Goal:** QuizForm engine + 3 critical quizzes

| Task | Files | Effort |
|------|-------|--------|
| Build `QuizForm` reusable engine | `src/components/book/QuizForm.tsx` | 6h |
| Build `QuizQuestion` (scale + multiple choice) | `src/components/book/QuizQuestion.tsx` | 3h |
| Build `RadarChart` component (recharts) | `src/components/book/RadarChart.tsx` | 4h |
| Build `BarChart` component | `src/components/book/BarChart.tsx` | 2h |
| Build `QuizResult` display component | `src/components/book/QuizResult.tsx` | 3h |
| Build `ShareButton` component | `src/components/book/ShareButton.tsx` | 2h |
| API route: `/api/book/quiz-results` | `src/app/api/book/quiz-results/route.ts` | 3h |
| Data: readiness-quiz questions + scoring | `src/data/book/quizzes/readiness-quiz.ts` | 2h |
| Page: `/book/intro/readiness-quiz` | `src/app/book/intro/readiness-quiz/page.tsx` | 4h |
| Data: attachment-quiz questions + scoring | `src/data/book/quizzes/attachment-quiz.ts` | 3h |
| Page: `/book/5/attachment-quiz` | `src/app/book/5/attachment-quiz/page.tsx` | 4h |
| Build `ComparisonChart` (before/after) | `src/components/book/ComparisonChart.tsx` | 3h |
| Data: readiness-retest (reuses readiness questions) | `src/data/book/quizzes/readiness-retest.ts` | 1h |
| Page: `/book/closing/readiness-retest` | `src/app/book/closing/readiness-retest/page.tsx` | 4h |

**Week 2 Total: ~44h**

### Week 3: Premium Content + Hub Pages
**Goal:** who-am-i quiz, future-letter, all hub pages

| Task | Files | Effort |
|------|-------|--------|
| Install recharts (or chart.js) + @react-pdf/renderer | `package.json` | 0.5h |
| Data: who-am-i quiz questions + analysis | `src/data/book/quizzes/who-am-i.ts` | 4h |
| Page: `/book/5/who-am-i` (PDF generation) | `src/app/book/5/who-am-i/page.tsx` | 8h |
| PDF template: "User Manual" report | `src/components/book/UserManualPDF.tsx` | 6h |
| Page: `/book/closing/future-letter` | `src/app/book/closing/future-letter/page.tsx` | 6h |
| API route: `/api/book/future-letter` | `src/app/api/book/future-letter/route.ts` | 3h |
| Resend integration for scheduled emails | `src/lib/email.ts` | 3h |
| Vercel Cron job for letter delivery | `vercel.json` + `src/app/api/cron/send-letters/route.ts` | 3h |
| Dynamic hub page template | `src/app/book/[chapter]/page.tsx` | 5h |
| Hub page: `/book/intro` | `src/app/book/intro/page.tsx` | 2h |
| Hub page: `/book/closing` | `src/app/book/closing/page.tsx` | 2h |
| Hub content data for all 15 chapters | `src/data/book/hub-content/*.ts` | 4h |

**Week 3 Total: ~46.5h**

### Week 4: Polish, Testing, Launch
**Goal:** Mobile testing, RTL polish, analytics, QR codes

| Task | Files | Effort |
|------|-------|--------|
| Mobile responsiveness testing (all pages) | -- | 6h |
| RTL polish (charts, navigation, forms) | Various | 4h |
| Accessibility audit (ARIA labels, keyboard nav, focus) | Various | 4h |
| Gender-adaptive content entries | `src/lib/gendered-content.ts` | 2h |
| PostHog analytics integration | `src/lib/analytics.ts` | 3h |
| Track: quiz completions, page views, PDF downloads | Various | 3h |
| Generate QR codes for print (all tool pages) | Script + output | 2h |
| SEO metadata for all pages | Various `metadata` exports | 3h |
| Open Graph images for quiz share pages | `opengraph-image.tsx` variants | 4h |
| Error handling + loading states | Various | 3h |
| Generate hero images for book section pages (Gemini) | `public/images/book/` | 3h |
| Final cross-browser testing | -- | 3h |
| Deploy to staging + UAT | Vercel | 2h |

**Week 4 Total: ~42h**

---

## 10. New Dependencies

| Package | Purpose | Notes |
|---------|---------|-------|
| `recharts` | Radar charts, bar charts, comparison charts | Lightweight, React-native |
| `@react-pdf/renderer` | Generate "User Manual" PDF from who-am-i quiz | Server-side PDF generation |
| `resend` | Scheduled email delivery for future-letter | Vercel-friendly email API |
| `@supabase/supabase-js` | Database + auth | User data, quiz results |
| `qrcode` | Generate QR codes for print | Dev dependency only |

---

## 11. Content Dependencies (Non-Code)

These items require Elad/team to produce. They are NOT blockers for P0 launch -- hub pages can show "coming soon" badges for items that require these assets.

| Item | Needed For | Priority |
|------|-----------|----------|
| YouTube/Vimeo video URLs (13+ chapter videos) | Hub page video embeds | P0 (can use placeholder) |
| Audio recordings (9 guided exercises) | Audio exercise pages | P2 |
| PDF assets (10 worksheets) | PDF download pages | P1 |
| Profile photo guide images | `/book/9/profile-photo` | P1 |
| Access code batch generation | Auth system | P0 |

**Launch strategy:** Hub pages launch with available content. Missing videos/audio show "Coming soon" with email notification signup. This ensures the book ships with a working companion site even before all media assets are produced.

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Supabase cold starts affect quiz UX | Medium | Use connection pooling, edge functions |
| PDF generation slow on mobile | Medium | Generate server-side, cache result, serve as download |
| Recharts bundle size | Low | Dynamic import, tree-shake unused chart types |
| Access code brute force | High | Rate limiting (5 attempts/IP/hour), CAPTCHA after 3 fails |
| Future-letter email deliverability | Medium | Resend handles SPF/DKIM; test with major providers |
| Video embed performance on 3G | Medium | Lazy load iframes, show thumbnail until play |
| RTL chart labels | Medium | Test recharts RTL support early; fallback to custom SVG |

---

## 13. Post-Launch Roadmap (P1/P2/P3)

### P1 (Month 1)
- All remaining quizzes (story-quiz, fear-map, date-report, connection-score, chemistry-quiz, vulnerability-stage, commitment fears, attraction-map)
- All PDF worksheets (commitment, boundary-map, compass-card, emotion-card, golden-rules, vulnerability-ladder, bio-template, date-debrief-worksheet, gps-poster)
- Emotion wheel interactive tool
- Profile photo visual guide
- Pre-date audio exercise

### P2 (Months 1-3)
- All video embeds (requires filming/editing by Elad)
- All audio exercises (requires recording by Elad)
- Courage tracker (daily journal app)
- Four-a-day affirmation reminder system
- 36 questions digital cards
- Chance calculator (traffic light tool)

### P3 (Months 3-6)
- Community features (forum, success stories wall)
- Email drip campaign (progress-based engagement)
- Advanced analytics dashboard (quiz trends, engagement metrics)
- A/B testing on quiz flows
- PWA wrapper for mobile app-like experience
- Integration with course registration system
- Admin panel for access code management + usage stats

---

## 14. File Count Summary

| Category | Count |
|----------|-------|
| Page files (routes) | ~55 |
| Shared components | ~18 |
| Data files (quiz questions, hub content) | ~30 |
| API routes | 4 |
| **Total new files** | **~107** |

---

## 15. Key Technical Decisions

1. **Static data files over Sanity CMS** -- Book content is tightly coupled to the book edition. Version control > CMS flexibility. User data goes to Supabase.

2. **Dynamic routes `[chapter]` / `[tool]`** -- Reduces 55 page files to ~10 dynamic templates. Content differentiation comes from data files, not route files.

3. **Anonymous Supabase auth** -- No email required for basic access. Code entry creates anonymous session. Email is optional for persistent features (progress saving, future-letter).

4. **Recharts over Chart.js** -- Better React integration, lighter bundle, easier to style with Tailwind CSS variables for dark/light mode and gender themes.

5. **Server Components for hub pages, Client Components for quizzes** -- Hub pages are mostly static content (SSG). Quiz forms require client interactivity. This split maximizes performance.

6. **Shared QuizForm engine** -- All 14 quizzes share one engine component. Quiz-specific behavior (scoring algorithms, result display, chart types) is configured via data files. This means adding a new quiz requires zero new components -- just a new data file.

7. **Preview-then-gate pattern** -- QR code landing pages show a compelling preview before requiring authentication. This supports the book's marketing (people see what they get) while protecting the content.
