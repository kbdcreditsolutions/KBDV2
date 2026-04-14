# KBD Credit Solutions: Technical Handoff & Architecture Review

**Version:** 2.3 (Automation & Lead Generation Scale)  
**Live Deployment:** [https://kbdv2.onrender.com](https://kbdv2.onrender.com)  
**Backend:** Supabase (PostgreSQL + GoTrue Auth)  
**Frontend Deployment:** Render.com (Global CDN Static Site)  

---

## 1. Executive Summary
KBD Credit Solutions has transitioned from a static landing page (V1), through a secure multi-tenant Loan Distribution Hub (V2.1), into a fully automated, standalone **Lead Generation and Conversion Engine (V2.3)**. 

The core philosophy of V2.3 is blending **Physical Portal Separation** for internal operations with scalable **Top-of-Funnel Pipeline Capture** (Calculators, Data Scraping, and CIBIL Consultation).

## 2. Technical Architecture

### Frontend (Client-Side)
The application is a lightweight, high-performance static site built with Vanilla HTML5, CSS3, and JavaScript. It does not use bulky frameworks (like React or Next.js) to ensure zero build-time overhead and blazingly fast load times on mobile devices.
- **Styling:** Custom CSS (`styles.css`, `dashboard.css`) enforcing the Institutional Navy & Gold identity.
- **Icons:** Feather Icons (via CDN).
- **Hosting:** Render.com (Static Site).

### Backend (Supabase / Database-as-a-Service)
The platform uses Supabase for Auth, Database, and real-time APIs.
- **Authentication:** Supabase GoTrue (Email/Password).
- **Database:** PostgreSQL.
- **API:** PostgREST (Auto-generated from the schema).

---

## 3. Core Business Logic & Portals

The application strictly separates users into two physical portals based on their database-assigned `role`.

### A. The Connector Portal (`connector_dashboard.html`)
- **Access:** Via `connector_login.html`.
- **Purpose:** The personal dashboard for partners.
- **Functionality:** 
  - Submit new loan cases via a secure modal.
  - Track live status of submitted cases.
- **Security:** Connectors can *only* see data where `connector_id` matches their own authenticated User ID.

### B. The Admin HQ (`admin_dashboard.html`)
- **Access:** Via `admin_login.html` (Hidden entry point).
- **Purpose:** The global command center for KBD leadership.
- **Functionality:** 
  - View the global pipeline of all leads submitted across the entire network.
  - Track overall network disbursals and partner count.
  - Manage live funnel tracking (New -> Contacted -> Docs Pending -> Sent to Bank).
- **Security:** Admins have a global view. Non-admins attempting to access `admin_login.html` or `admin_dashboard.html` are forcibly logged out and rejected.

### C. Public Lead Capture Engine
- **Access:** Direct URLs (`personal-loan.html`, `business-loan.html`, `emi-calculator.html`, `cibil-repair.html`).
- **Functionality:** 
  - Dynamic interactive forms with rich glassmorphism aesthetics.
  - Captures UTM parameters from Paid Ads.
  - Pushes leads directly to the Database, automatically flags the Lead Source, and seamlessly redirects customers to the KBD WhatsApp API.

---

## 4. Database Schema & Security Guardrails

The database is structured to prioritize absolute data isolation between different Connectors.

### Core Tables
1. **`profiles`**: Tied directly to the `auth.users` table via an automated database trigger upon signup. Contains `id` (UUID), `full_name`, `is_senior` (boolean), and `role` (defaults to 'connector').
2. **`lead_submissions`**: Stores all loan cases. Key fields include `monthly_income`, `estimated_cibil`, `lead_score`, `priority`, `source`, and `assigned_to`.

### Security & Logic: Database Triggers and RLS
The highest layer of security and business logic is enforced at the PostgreSQL database level, making it immune to frontend manipulation:
- **`calculate_lead_score_and_route` Trigger:** Analyzes income and loan amounts natively upon Insert. If a lead is highly valuable (e.g., >₹5L amount), it flags it as `HIGH` priority. It also detects if the lead is a 'CIBIL Consultation' and automatically routes it to the specific administrative pipeline.
- **Connector Policy (RLS):** `SELECT / INSERT / UPDATE` allowed only if `auth.uid() = connector_id`.
- **Admin Policy (RLS):** `SELECT / UPDATE` allowed on all rows *if* the user's ID exists in the `profiles` table with `role = 'admin'`.

### Automated Healing (Event Triggers)
One major technical hurdle resolved in V2.1 was "Schema Cache" lag. A PostgreSQL `EVENT TRIGGER` (`pgrst_watch`) was implemented to automatically broadcast a schema reload notification anytime the DDL changes, ensuring zero API downtime during updates.

---

## 5. Master Administration & Scripts

Because the Supabase dashboard can sometimes block manual table edits, the project includes lightweight Python scripts for secure backend management via the Supabase Admin API:
- **`graduate_real_admin.py`**: A secure script used to force-promote a specific user account (e.g., `kbdcreditsolutions@gmail.com`) to the `admin` role in the profiles table.
- **`verify_connection.py`**: A diagnostic tool to ensure API keys are healthy.
- **`scraper/google_maps_scraper.py`**: A dedicated B2B Outbound Python Engine. Connects to Google Places APIs to organically extract business names and phone numbers, dumping them into a pristine spreadsheet for aggressive outbound hunting.

---

## 6. Known Limitations & Roadmap

### Current "Locked" Modules
In the dashboard UI, several tabs (such as "Payout History," "Partner Network," and "System Settings") currently display a **Module Locked** screen. These are intentionally stubbed to validate UI flow and represent features slated for **Phase 6: Operational Scaling** once the initial beta test group is onboarded.

### Immediate Next Steps (For Review)
1. **Beta Onboarding:** Invite the first 5 high-conviction partners.
2. **Email Verification Handling:** Currently, Supabase may require email confirmation. Ensure this is toggled correctly in the Supabase Auth settings based on desired user friction.
3. **WhatsApp API Integration:** Future phases will require webhooks tied to `INSERT` operations on the `lead_submissions` table to send instant WhatsApp alerts to Case Managers.
