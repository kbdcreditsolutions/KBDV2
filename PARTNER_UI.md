# KBD Credit Solutions: Partner Dashboard (UI Design Specs)

The **Connector Portal** is the heart of the tech-enabled distribution blueprint. It must be professional, fast, and mobile-first.

## 1. Aesthetic Direction
- **Theme:** Sleek Dark Mode (inspired by premium fintech apps like Cred or Razorpay).
- **Secondary Colors:** Electric Blue (#0066FF) and Gold Accent (#FFD700) for "Diamond" status.
- **Typography:** Inter or Outfit (Modern, high-readability fonts).

## 2. Key Screen: Dashboard (The Home)
### Widgets:
- **Disbursal Snapshot:** Progress bar showing monthly goal vs. current disbursement (in Cr).
- **Commission Wallet:** "Next Payout" amount and date conspicuously displayed.
- **Quick Action:** Large "+" button to "Login New Lead".

## 3. Key Screen: Lead Submission
### Design Requirements:
- **Progressive Disclosure:** Don't show all 20 fields at once. Break it into:
    1. *Customer Basics* (Name, Phone, Loan Type).
    2. *Financials* (Income, CIBIL).
    3. *Document Upload* (Drag & drop for ID proof and bank statements).
- **Instant Validation:** Red/Green indicators for valid phone numbers and email formats.

## 4. Key Screen: Lead Status Timeline
### The "Transparency" View:
Replicating the exact "Tracking" feel that users have with Amazon orders or Swiggy.
- [ ] **Step 1:** Lead Submitted (Green)
- [ ] **Step 2:** Document Verification (In Progress - Pulsing)
- [ ] **Step 3:** Bank Login (Pending)
- [ ] **Step 4:** Sanction Issued
- [ ] **Step 5:** Disbursed (Celebration animation)

## 5. Mobile Layout (Priority)
Since partners are often "on the field," the UI must be optimized for thumb-navigation.
- Bottom navigation bar (Dashboard, Leads, Wallet, Profile).
- Haptic feedback for successful lead submission.
- One-tap calling to the assigned KBD Case Manager.

## 6. Functional Mockup (V0.1)
*Structure:*
```text
[ Sidebar ]
Dashboard
My Leads
My Payouts
Knowledge Hub
Settings

[ Header ]
Welcome Back, [Partner Name]! | [Gold Status] | [Help?]

[ Body ]
Cards:
+----------------+  +----------------+  +----------------+
| Pending Leads  |  | Total Disbursed|  | Est. Payout    |
|       14       |  |     2.4 Cr     |  |   1.8 L        |
+----------------+  +----------------+  +----------------+

[ Recent Activity Table ]
Lead: Ramesh K. | Product: HL | Status: Sanctioned | Action: View Docs
Lead: Priya S.  | Product: BL | Status: Documents Verified | Action: Wait
```
