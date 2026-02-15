# KBD Credit Solutions

**Empowering Your Finances**

KBD Credit Solutions is a modern fintech platform designed to help users compare bank loans, find their best match, and process applications with expert guidance. Built with Next.js, Tailwind CSS, and TypeScript.

## 🚀 Features

-   **Loan Comparison:** Browse personal, home, vehicle, and business loans from top banks.
-   **Smart Match:** Filter loans based on your specific requirements.
-   **Loan Estimator:** Interactive multi-step form to check eligibility.
-   **Bank Partners:** Detailed information about partner banks and their offers.
-   **Responsive Design:** optimized for mobile, tablet, and desktop.
-   **Performance:** Optimized images, fonts, and code splitting.
-   **Security:** CSP headers, rate limiting, and secure forms.

## 🛠️ Tech Stack

-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Animations:** Framer Motion
-   **Icons:** Lucide React
-   **Forms:** React Hook Form + Zod
-   **Testing:** Vitest (Unit), Playwright (E2E)
-   **Analytics:** Google Analytics 4

## 📦 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/kbd-credit-solutions.git
    cd kbd-credit-solutions
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    npm install --legacy-peer-deps (if suggested)
    ```

3.  Set up environment variables:
    ```bash
    cp .env.example .env.local
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🧪 Testing

### Unit Tests
Run unit tests for components and utilities:
```bash
npm run test
```

### E2E Tests
Run end-to-end tests with Playwright:
```bash
npm run test:e2e
```

## 🚢 Deployment

The project is optimized for deployment on Vercel.

1.  Connect your GitHub repository to Vercel.
2.  Vercel will automatically detect Next.js.
3.  Add your environment variables in the Vercel dashboard.
4.  Deploy!

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for more details.

## 📂 Project Structure

-   `src/app`: Next.js App Router pages and layouts.
-   `src/components`: Reusable UI components.
-   `src/lib`: Utility functions and constants.
-   `src/styles`: Global styles and Tailwind configuration.
-   `public`: Static assets (images, fonts).
-   `__tests__`: Unit tests.
-   `e2e`: End-to-end tests.

## 📄 License

This project is licensed under the MIT License.
