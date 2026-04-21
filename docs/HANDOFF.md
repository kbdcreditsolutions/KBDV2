# KBD Credit Solutions — Handoff Document

> **Version:** 0.1.0  
> **Date:** 21 April 2026 (Updated)  
> **Index:** [Documentation Index](./README.md)  
> **Domain:** https://kbdcredit.com  
> **Stack:** Next.js 14 · React 18 · Tailwind CSS 3 · TypeScript 5

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev          # → http://localhost:3000

# Production build
npm run build

# Start production server
npm start

# Run tests
npm test             # Unit tests (Vitest)
npm run test:e2e     # E2E tests (Playwright)

# Lint
npm run lint
```

### Environment Variables

| Variable            | Required | Description                                    |
|---------------------|----------|------------------------------------------------|
| `MAINTENANCE_MODE`  | No       | Set `true` to redirect all traffic to `/maintenance` |
| `GA_MEASUREMENT_ID` | No       | Google Analytics ID (currently hardcoded as `G-XYZ` in `layout.tsx`) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes | Required for the chatbot to connect to Google's Gemini 2.0 Flash model. |

## Authentication Guide

The primary user-facing application does not require authentication to browse. However, the backend `/api/chat` endpoint requires a valid `GOOGLE_GENERATIVE_AI_API_KEY` in your environment variables to function correctly. The endpoint itself does not require client-side authentication tokens.

---

## Architecture Overview

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — fonts, metadata, analytics, chatbot
│   ├── page.tsx            # Homepage
│   ├── middleware.ts       # CSP headers, maintenance mode redirect
│   ├── api/chat/route.ts   # Chatbot API (Vercel AI SDK + Gemini 2.0 Flash streaming)
│   ├── about/              # About Us page
│   ├── assistance/         # Loan assistance / application form
│   ├── blog/               # Blog listing page
│   ├── contact/            # Contact page
│   ├── cookies/            # Cookie policy
│   ├── disclaimer/         # Disclaimer page
│   ├── estimator/          # EMI / loan amount calculator
│   ├── feedback/           # User feedback form
│   ├── loans/              # Loan comparison tool
│   ├── maintenance/        # Maintenance mode page
│   ├── partners/           # Bank partners listing
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
│
├── components/
│   ├── analytics/          # Web Vitals tracking
│   ├── chat/               # ChatWidget — floating chatbot
│   ├── home/               # Homepage sections (7 components)
│   │   ├── hero.tsx
│   │   ├── loan-categories.tsx
│   │   ├── how-it-works.tsx
│   │   ├── why-kbd.tsx
│   │   ├── testimonials.tsx
│   │   └── cta-section.tsx
│   ├── layout/             # Navbar, Footer, Section, SectionHeader
│   └── ui/                 # 16 reusable components (Button, Card, Input, etc.)
│
├── lib/
│   ├── constants.ts        # Site config, nav links, loan types, bank partners
│   ├── utils.ts            # cn() helper (clsx + tailwind-merge)
│   ├── chatbot-knowledge.ts  # KBD knowledge base data
│   └── services/           # Business logic services
│       └── pdf-service.ts  # Premium Amortization PDF Engine (jsPDF + AutoTable)
│
└── styles/
    └── globals.css         # Design tokens, CSS custom properties
```

---

## Pages & Routes

| Route           | Type       | Description                            |
|-----------------|------------|----------------------------------------|
| `/`             | Static     | Homepage with hero, loans, testimonials, CTA |
| `/loans`        | Static     | Loan comparison table across banks     |
| `/estimator`    | Static     | EMI calculator with sliders            |
| `/partners`     | Static     | Bank partner cards with rates          |
| `/assistance`   | Static     | Loan application assistance flow       |
| `/about`        | Static     | Company info, team, values             |
| `/blog`         | Static     | Blog listing with featured + article grid |
| `/contact`      | Static     | Contact form + map + details           |
| `/feedback`     | Static     | User feedback submission form          |
| `/privacy`      | Static     | Privacy policy                         |
| `/terms`        | Static     | Terms of service                       |
| `/cookies`      | Static     | Cookie policy                          |
| `/disclaimer`   | Static     | Disclaimer                             |
| `/maintenance`  | Static     | Maintenance mode page                  |

---

## API Reference

### `POST /api/chat`

Chatbot endpoint — streams AI responses back to the user widget. Processes user messages using Vercel AI SDK v6 (`createUIMessageStream`, `createUIMessageStreamResponse`, `convertToModelMessages`) and Google's Gemini 2.0 Flash model, augmented by a local knowledge base (`chatbotKnowledge`). The frontend widget consumes the stream via the `useChat` hook from `@ai-sdk/react` v3.

**Authentication Requirements:** No client-side token required. Server requires `GOOGLE_GENERATIVE_AI_API_KEY`.
**Rate Limiting:** Currently not implemented at the application level. Ensure Vercel or your hosting platform has DDoS protection configured.

**Code Example (cURL):**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "What are personal loan rates?"}]}'
```

**Request:**

```json
{
  "messages": [
    { "role": "user", "content": "What are personal loan rates?" }
  ]
}
```

**Response (200):**

```json
{
  "role": "assistant",
  "content": "Personal loan rates start from 10.25% p.a. ..."
}
```

**Error (400):**

```json
{ "error": "No user message found" }
```

**Error (500):**

```json
{ "error": "Failed to process message" }
```

**Key files:**
- `src/app/api/chat/route.ts` — API handler integrating Vercel AI SDK v6 and Google Gemini 2.0 Flash
- `src/lib/chatbot-knowledge.ts` — System prompt / Knowledge base data
- `src/components/chat/chat-widget.tsx` — Custom React widget — floating chatbot, useChat hook, sessionStorage persistence, Framer Motion

---

## Design System

### Fonts

| Usage     | Font     | Variable         |
|-----------|----------|------------------|
| Body text | Inter    | `--font-inter`   |
| Headings  | Manrope  | `--font-manrope` |

### Key Colors

| Token       | Value     | Usage                  |
|-------------|-----------|------------------------|
| `--primary` | `#050A18` | Dark backgrounds, text |
| `--accent`  | `#FFC857` | CTAs, highlights, gold |
| Surface     | `#F8F9FA` | Section backgrounds    |

### Brand Logo

- **SVG file:** `src/components/ui/kbd_logo.svg` (original 739×951 brand SVG)
- **React component:** `src/components/ui/kbd-logo.tsx`
  - `variant`: `full` | `mark` | `text`
  - `theme`: `dark` | `light`
  - `size`: `sm` | `md` | `lg`
- **Usage:** Navbar (full/light/md) and Footer (full/light/md)

---

## Security

Implemented via `src/middleware.ts`:

| Header                | Value                                        |
|-----------------------|----------------------------------------------|
| Content-Security-Policy | `default-src 'self'`, script/style/img/font/frame sources scoped |
| X-Content-Type-Options | `nosniff`                                   |
| X-Frame-Options       | `DENY`                                       |
| Referrer-Policy       | `strict-origin-when-cross-origin`            |
| Permissions-Policy    | Camera, mic, geolocation, browsing-topics disabled |

---

## SEO & Analytics

- **Metadata:** Configured in `layout.tsx` — title, description, OpenGraph, Twitter cards
- **Structured Data:** JSON-LD `FinancialService` schema embedded in layout
- **Sitemap:** Auto-generated at `src/app/sitemap.ts`
- **Robots:** Configured at `src/app/robots.ts`
- **Google Analytics:** Integrated via `@next/third-parties` (ID: `G-XYZ` — **replace with real ID**)
- **Web Vitals:** Tracked via `src/components/analytics/web-vitals.tsx`

---

## Key Dependencies

| Package           | Version | Purpose                          |
|-------------------|---------|----------------------------------|
| `next`            | ^14.2   | Framework                        |
| `react`           | ^18.2   | UI library                       |
| `tailwindcss`     | ^3.4    | Utility-first CSS                |
| `framer-motion`   | ^11.18  | Animations                       |
| `lucide-react`    | ^0.400  | Icons                            |
| `react-hook-form` | ^7.50   | Form handling                    |
| `zod`             | ^3.22   | Validation schemas               |
| `clsx` + `tailwind-merge` | — | Class name utilities      |
| `@ai-sdk/google`  | ^0.24 | Generative AI integration |
| `ai`              | ^6.0  | Vercel AI SDK             |
| `jspdf`           | ^2.5  | PDF generation core       |
| `jspdf-autotable` | ^3.8  | Table-based PDF layout    |

### Unused Dependencies

Previously unused AI packages (`@ai-sdk/openai`, `openai`, `langchain`, `@langchain/openai`, `@langchain/core`, `@langchain/community`) have been uninstalled. No further cleanup is needed.

---

## Data Sources

All data is **client-side static** (no database). Content is defined in:

| Data              | Location                   |
|-------------------|---------------------------|
| Site config       | `src/lib/constants.ts`    |
| Nav links         | `src/lib/constants.ts`    |
| Loan types        | `src/lib/constants.ts`    |
| Bank partners     | `src/lib/constants.ts`    |
| Testimonials      | `src/lib/constants.ts`    |
| Process steps     | `src/lib/constants.ts`    |
| Blog articles     | `src/app/blog/page.tsx`   |
| Chatbot knowledge | `src/lib/chatbot-knowledge.ts` |

---

## Action Items for Production

| Priority | Item | Notes |
|----------|------|-------|
| 🔴 High | Replace Google Analytics ID | `G-XYZ` in `layout.tsx` → real GA4 ID |
| 🔴 High | Update `siteConfig` | Real phone, email, address, social links in `constants.ts` |
| 🔴 High | Update structured data | Real street address in `layout.tsx` JSON-LD |
| 🟡 Medium | Set `metadataBase` | Add to layout metadata for OG image resolution |
| 🟡 Medium | Add real bank logos | Place SVGs in `/public/banks/` directory |
| ~~🟡 Medium~~ | ~~Remove unused AI deps~~ | Resolved — unused packages uninstalled |
| 🟡 Medium | Add blog content | Replace placeholder posts in `blog/page.tsx` |
| 🟢 Low | Add OG image | Place `og-image.png` (1200×630) in `/public/` |
| 🟢 Low | Configure error tracking | Add Sentry or similar for production monitoring |

---

## Deployment

The project is configured for any Node.js hosting platform:

```bash
npm run build    # Produces .next/ output
npm start        # Starts production server on port 3000
```

**Vercel (recommended):**
- Zero-config deployment — push to Git and connect to Vercel
- Set `MAINTENANCE_MODE` env var in Vercel dashboard if needed

---

## Changelog

| Date       | Change                                          |
|------------|-------------------------------------------------|
| 2026-04-18 | **Premium Amortization & PDF Overhaul**: High-res branding, diagonal watermarks, EMI-column integration, and HUD-to-Clean UI synchronization. |
| 2026-02-26 | Replaced Botpress with custom Gemini 2.0 Flash chat widget |
| 2026-02-16 | Added Blog section to header navigation         |
| 2026-02-15 | Integrated KBD brand logo SVG across navbar/footer |
| 2026-02-15 | Rewrote chatbot to use local response engine    |
| 2026-02-14 | Completed all 17 development phases             |
| 2026-02-13 | Initial project setup and core implementation   |
