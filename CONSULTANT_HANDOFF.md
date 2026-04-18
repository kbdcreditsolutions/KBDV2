# KBD Credit Solutions: Technical Handoff & Architecture Review

**Version:** 3.0 (Next.js / TypeScript Migration & Premium PDF Engine)  
**Live Deployment:** [https://kbdcreditsolutions.vercel.app/](https://kbdcreditsolutions.vercel.app/)  
**Stack:** Next.js 14 (App Router), Tailwind CSS, TypeScript, Framer Motion  
**Backend:** Supabase (PostgreSQL + GoTrue Auth)  

---

## 1. Executive Summary
KBD Credit Solutions has evolved from a static portal into a high-performance **Lead Generation & Financial Intelligence Platform**. The current architecture (V3.0) emphasizes typesafe development, server-side performance optimization, and premium document generation to compete at a bank-grade level.

## 2. Technical Architecture

### Frontend (Modern Next.js)
The application utilizes the **Next.js 14 App Router** for optimal SEO and performance.
- **Components:** Modular React components in `src/components/`, strictly followed by Tailwind variants.
- **State Management:** React Hook Form + Zod for robust lead capture validation.
- **Animations:** Framer Motion for premium transitions and interactive calculator feedback.

### Financial Engine (Amortization & PDF)
A major addition in V3.0 is the decentralized **Amortization & PDF Service**.
- **Service Layer**: Located at `src/lib/services/pdf-service.ts`.
- **Core Libraries**: `jspdf` and `jspdf-autotable`.
- **Capabilities**: 
  - Dynamic generation of EMI-inclusive amortization schedules.
  - Institutional branding with high-resolution PNG logos.
  - Multi-page diagonal watermarking for document integrity.

---

## 3. Portals & Lead Capture

### A. Dedicated Estimator (`/estimator`)
A full-page financial dashboard providing EMI calculations, amortization graphs, and professional PDF exports. 

### B. High-Conversion Calculators
Interactive calculators embedded in the `Hero` and `LoanEstimator` components on the home page. These are synchronized via a shared logic layer to ensure identical financial output.

### C. Supabase Integration
- **Auth**: Email/Password authentication for potential admin/connector portals.
- **Database**: PostgreSQL tables for lead submissions, partner profiles, and site configuration.

---

## 4. Key Maintenance Guardrails

1. **Zero-Hidden-Data Policy**: All financial tables must be tested for responsive visibility (specifically the 'Balance' column) across mobile/desktop. 
2. **Theme Sanity**: Shared UI components like `Modal` must use stable text colors to avoid "white-on-white" invisibility when the mobile/desktop app is in a global dark-mode container.
3. **Logo Integrity**: Always use the Base64 PNG version of the logo for PDF generation to avoid SVG rendering failures in jsPDF.

---

## 5. Next Steps (Roadmap)
1. **Interactive Graphs**: Expand the Amortization Graph with hover-state data tooltips.
2. **Auto-Lead Routing**: Enhance the Supabase triggers to route high-value business leads directly to specific Case Managers.
3. **Dynamic Rates**: Move interest rates from constants into a Supabase `site_config` table for easier updates.
