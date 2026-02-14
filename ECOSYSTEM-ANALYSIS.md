# Omanut Hakesher Ecosystem Analysis - February 2026

## Three Connected Projects

### 1. Website (omanut-hakesher-website) - MVP Complete
- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- 7 pages: Home, About, Services, Testimonials, Blog (6 posts), Contact
- Warm terracotta/green/gold design, RTL Hebrew, Heebo font
- Gap: No backend, hardcoded content, no auth, no booking

### 2. Learning Platform (haderech-next) - Foundation Built
- Next.js 16, Convex (real-time DB), Clerk (auth)
- 6-table schema: courses, lessons, users, enrollments, progress
- 41+ Convex functions ready
- Gap: No courses populated, no video player, needs env vars

### 3. Book (omanut-hakesher-book) - Not Started
- Plan: 200-300 page book on relationship communication
- 5-section structure defined, no content written

## Content Available
- 6 blog posts (36,000+ chars) on communication, listening, intimacy
- 4 service descriptions (counseling, workshops, coaching, online)
- 8 testimonials
- Full brand identity (mission, values, approach)

## Integration Strategy
Website (marketing) → Platform (learning) → Book (authority)
Blog posts → Course lessons → Book chapters

## Quick Wins (30 days)
1. Link website to platform with CTAs
2. Populate 3 starter courses from blog content
3. Configure haderech-next env vars (Clerk + Convex)
4. Begin book outline

## Website Redesign Vision (from spec)
- Add: Courses page, Book teaser, Resources, Newsletter, Login
- Expand: Service pages with pricing, FAQ, booking
- AI Features: Dating simulator, AI chatbot, community forum
- Tech: Keep Next.js + add Convex + Clerk (same as haderech-next)
