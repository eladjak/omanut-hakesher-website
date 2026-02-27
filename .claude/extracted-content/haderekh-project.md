# HaDerekh Next Project - Status

## Project Not Found
The directory `C:\Users\eladj\projects\haderekh-next\` does not exist.

However, references to this project were found in the platform specification document:

### From "אפיון פלטפורמה משולב 2026.md":
- The platform spec mentions "Clone HaDerech Next repo" as a setup task
- HaDerech Next was apparently a planned Next.js-based learning platform
- The new Omanut HaKesher website/platform is intended to be its successor

### Planned Tech Stack (from platform spec):
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS (RTL), Radix UI/shadcn, Framer Motion
- **Backend**: tRPC, Prisma ORM, PostgreSQL (Supabase), Redis
- **Auth**: Supabase Auth, OAuth (Google, Facebook), Magic Links
- **Services**: OpenAI API (simulator), Stripe/PayPlus (payments), Resend (emails), Green API (WhatsApp), Cal.com (scheduling)
- **Infrastructure**: Vercel, Supabase, Cloudflare

### Relevant for Website Rebuild:
The HaDerekh Next concept lives on as the platform vision described in the course-platform.md file. The current omanut-hakesher-website project (Next.js 16 + Tailwind CSS 4) is the active implementation of the public-facing website, while the full platform features (course player, community, simulator) are planned for a future phase.

### Migration Notes (from platform spec):
- ohlove.co.il (current Wix site) to remain active in parallel
- Gradual redirect to new platform
- Content from "תכנית הדרך" course becomes the core course offering
- Existing marketing documents become lead magnets and website content
