# Live Loan Estimator — Implementation Documentation

> Interactive EMI calculator embedded directly into the Hero section of the KBD Credit Solutions home page.

---

## Quick Start

The Loan Estimator is rendered as part of the `<Hero />` component in `src/components/home/hero.tsx`. It is a **client-side component** (`'use client'`) that requires no backend API — all calculations happen in the browser in real-time.

```
Location: src/components/home/hero.tsx
Route:     / (Home Page)
Type:      Client Component (React)
```

---

## Architecture Overview

```
hero.tsx (Client Component)
├── Left Column (lg:col-span-5)
│   ├── Status Badge ("Verification Protocol Active")
│   ├── Headline ("REDEFINING CAPITAL")
│   ├── CTA Buttons (Launch Estimator / View Portfolio)
│   └── Trust Indicators (Avatars + 4.9/5 Rating)
│
├── Right Column (lg:col-span-7) — LOAN ESTIMATOR WIDGET
│   ├── Header (RBI Regulated Terminal / Live Estimator)
│   ├── Eligibility Limit Slider (₹1L – ₹50L)
│   ├── Interest Rate Slider (8% – 24%)
│   ├── Tenure Slider (12 – 84 months)
│   ├── EMI Projection (calculated in real-time)
│   ├── "View Amortization Schedule" Button → opens Modal
│   ├── Floating Badge: TRENDING rate
│   └── Floating Badge: LIVE_OFFERS count
│
└── Modal: Amortization Schedule Table
    ├── Sticky Header (Loan Amount + Total Interest)
    └── Month-by-month breakdown (Principal / Interest / Balance)
```

---

## State Management

All state is managed locally via React `useState`. No global state, context, or external stores are used.

| State Variable   | Type      | Default     | Purpose                                    |
|------------------|-----------|-------------|--------------------------------------------|
| `amount`         | `number`  | `1,500,000` | Loan principal amount (₹)                  |
| `rate`           | `number`  | `10.5`      | Annual interest rate (%)                   |
| `tenure`         | `number`  | `60`        | Loan tenure in months                      |
| `isScheduleOpen` | `boolean` | `false`     | Controls amortization schedule modal       |

---

## Core Calculation Logic

### EMI Formula (Reducing Balance Method)

The EMI is calculated using the standard **Reducing Balance** formula used by Indian banks:

```
EMI = [P × R × (1 + R)^N] / [(1 + R)^N – 1]

Where:
  P = Principal loan amount
  R = Monthly interest rate (annual rate / 12 / 100)
  N = Total number of monthly installments (tenure)
```

**Implementation:**

```typescript
const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const emi =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
};
```

### Amortization Schedule Generation

The `generateSchedule()` function iterates month-by-month across the full tenure, computing:

| Field            | Calculation                                        |
|------------------|----------------------------------------------------|
| `interest`       | `openingBalance × monthlyRate`                     |
| `principal`      | `EMI – interest`                                   |
| `closingBalance` | `openingBalance – principal` (clamped to ≥ 0)     |

Each row produces an object:

```typescript
{
    month: number;      // 1-indexed month number
    opening: number;    // Opening balance for this month
    emi: number;        // Fixed monthly EMI
    interest: number;   // Interest portion of this month's EMI
    principal: number;  // Principal portion of this month's EMI
    closing: number;    // Closing balance after this month's payment
}
```

---

## Slider Configuration

| Slider         | Min       | Max         | Step     | Unit    |
|----------------|-----------|-------------|----------|---------|
| Loan Amount    | ₹1,00,000 | ₹50,00,000  | ₹10,000  | INR     |
| Interest Rate  | 8%        | 24%         | 0.1%     | Percent |
| Tenure         | 12        | 84          | 6        | Months  |

All sliders use the custom `<Slider />` component from `src/components/ui/slider.tsx`, which provides a styled range input with an orange/gold gradient fill track.

---

## Currency Formatting

All monetary values use `Intl.NumberFormat` with the **Indian Numbering System** (lakhs/crores):

```typescript
const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(val);
```

**Example outputs:** `₹15,00,000` · `₹32,200` · `₹3,20,000`

---

## UI Components Used

| Component        | Source                          | Purpose                               |
|------------------|---------------------------------|---------------------------------------|
| `<Slider />`     | `@/components/ui/slider`        | Custom styled range input             |
| `<Modal />`      | `@/components/ui/modal`         | Amortization schedule popup           |
| `<motion.div />`| `framer-motion`                 | Entry animations (fade, slide, scale) |
| Lucide Icons     | `lucide-react`                  | Shield, LineChart, CalendarClock, etc. |

---

## Visual Design

### Color Palette (Sunshine Glow Theme)

| Element              | Color                                           |
|----------------------|-------------------------------------------------|
| Background           | `#050A18` (Deep Navy)                            |
| Accent / Gold        | `#FFC857` (Sunshine Gold)                        |
| Card Background      | `rgba(11,17,33,0.7)` + `backdrop-blur-[20px]`  |
| Text Primary         | `white`                                          |
| Text Secondary       | `slate-400` / `slate-500`                        |
| EMI Highlight        | `#FFC857` (Gold, extrabold)                      |
| Success indicators   | `emerald-400`                                    |

### 3D Depth Effects

The estimator card uses CSS perspective transforms to create a tilted 3D appearance:

```css
transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
```

A secondary "stacked card" behind it adds depth:

```css
transform: perspective(1000px) translateZ(-40px) translateX(20px) translateY(10px) rotateY(-5deg);
```

### Animations

| Element             | Animation                                         |
|---------------------|---------------------------------------------------|
| Left content        | `opacity: 0→1, y: 20→0` (0.6s)                   |
| Estimator card      | `opacity: 0→1, scale: 0.95→1` (0.6s, 0.2s delay)|
| Floating badge      | `x: 20→0, opacity: 0→1` (spring, 1s delay)       |
| Hover underlines    | `width: 0→100%` on group hover (0.5s)             |

---

## Amortization Schedule Modal

Triggered by clicking **"View Amortization Schedule"** button. Opens a `<Modal />` containing:

1. **Sticky Summary Header** — Loan Amount + Total Interest (calculated as `EMI × tenure – principal`)
2. **Scrollable Table** with columns: Month | Principal | Interest | Balance
3. Color coding: Principal in `emerald-600`, Interest in `orange-500`, Balance in `slate-500`

---

## Accessibility

- Slider inputs use native `<input type="range">` for keyboard accessibility
- Schedule button has `focus:ring-2 focus:ring-[#FFC857]/50` for visible focus state
- Modal handles focus trapping and close-on-escape
- `aria-describedby` and `aria-invalid` are used by underlying Input/Select components

---

## File Dependencies

```
src/components/home/hero.tsx
├── src/components/ui/slider.tsx     (custom range input)
├── src/components/ui/modal.tsx      (dialog overlay)
├── lucide-react                     (icons)
├── framer-motion                    (animations)
└── @/lib/utils                      (cn utility, via slider/modal)
```

---

## Error Handling

- **Division by zero**: Not possible — minimum rate is 8% and minimum tenure is 12
- **Negative balance**: Clamped to 0 with `closingBalance > 0 ? closingBalance : 0`
- **NaN protection**: All slider inputs enforce `Number()` conversion on change

---

## Performance Notes

- EMI recalculates on every state change (lightweight — single arithmetic operation)
- Amortization schedule is computed **on demand** only when the modal opens (lazy)
- No `useEffect` or side effects — pure render-time computation
- Animations use GPU-accelerated properties (`transform`, `opacity`)

---

## Changelog

| Date       | Change                                                          |
|------------|-----------------------------------------------------------------|
| 2026-02-23 | Initial implementation as standalone `<LoanEstimator />` section|
| 2026-02-23 | Embedded into `<Hero />`, replacing static dashboard card       |
| 2026-02-23 | Added interactive sliders, EMI calc, amortization modal         |
