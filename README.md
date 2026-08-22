# Omanut HaKesher Website

The Hebrew, RTL-first public website for the Omanut HaKesher ecosystem: free resources, the book, the 12-week program, and individual guidance.

## Current product surface

- Public learning and decision-support pages for visitors who want to explore before choosing an offer.
- Resource and lead-guide delivery with explicit separation between receiving a guide and joining a marketing list.
- Marketing pages for the book, program, coaching, events, podcast, and related resources.
- Mobile-first Hebrew UI built with reusable accessible components.
- Fail-closed publication controls for testimonials, protected book content, checkout, and provider-dependent flows.

The local source contains routes and contracts that are intentionally unavailable until their entitlement, payment, proof, or provider requirements are implemented and approved. A successful local build is not evidence of a production deployment.

## Technology

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | App Router and server rendering |
| [React 19](https://react.dev/) | UI runtime |
| [TypeScript](https://www.typescriptlang.org/) | Static type checking |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling and responsive layout |
| [Framer Motion](https://www.framer.com/motion/) | Deliberate interface motion |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI primitives |
| [Lucide React](https://lucide.dev/) | Interface icons |

## Local development

Prerequisites: a supported Node.js release and npm.

```bash
npm install
npm run dev
```

The development server listens on [http://localhost:3333](http://localhost:3333).

## Local quality gates

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Provider, payment, DNS, email, authentication, and production-data checks require isolated staging or sandbox credentials. Do not infer production readiness from the local commands above.

## License

This project and its content are not distributed under an open-source license. All rights are reserved unless explicit written permission is granted.

*[README בעברית](README.he.md)*
