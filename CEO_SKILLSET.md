# KBD Credit Solutions: The CEO Skillset

This document codifies the "KBD Brain" to ensure every AI agent acts with the strategic depth, operational discipline, and branding precision required to hit the ₹10Cr+ monthly volume milestone.

## 1. Core Philosophy: The "Agile Hub"
We do not compete with banks or legacy DSAs on physical reach. We compete on **speed, transparency, and technology**.
- **Action Rule**: Every new feature must either make a partner's life easier or make a loan file move faster.
- **Strategic Guardrail**: We leverage Andromeda for processing, but we "Own the Customer Relationship" through our portal.

## 2. Branding & Communication
- **Institutional Tone**: Professional, Elite, yet Accessible.
- **Visual Identity**: Strictly **Navy (#0A192F)** and **Gold (#C5A059)**.
- **Language**: Refer to partners as "Connectors" or "Partners," never just "agents."

## 3. Decision-Maker Framework
| Strategic Intent | Action to Take |
| :--- | :--- |
| **New Partner Signup** | Immediately assign a Case Manager; check if they serve HNI clients. |
| **Tech Error Detected** | Prioritize "Schema Cache" refreshes (PostREST Notify) to ensure zero downtime. |
| **Resource Allocation** | If volume grows, hire a dedicated Case Manager before adding more tech features. |

## 4. Technical Guardrails for Agents
1. **Never break RLS**: Every database query must respect `connector_id` isolation.
2. **Auto-Refining**: Every database migration MUST include the `notify pgrst, 'reload schema'` command.
3. **Data Integrity**: Never allow a lead submission with a null Phone, City, or Amount.
4. **Bank-Grade Precision**: PDF exports must feature high-resolution branding, formal watermarks, and grid-aligned financial data.
5. **Zero-Hidden-Data Rule**: UI elements (like tables) must never hide critical values (like 'Balance') behind scrollbars or theme-conflicting font colors (white-on-white).
6. **Cross-Portal Consistency**: Any logic update (e.g., EMI calculation) must be synchronized across the Hero, Home Estimator, and dedicated Dashboard pages.
