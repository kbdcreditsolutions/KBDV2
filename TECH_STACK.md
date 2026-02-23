# KBD Credit Solutions - Tech Stack

This document details the complete technology stack used in the development of KBD Credit Solutions. It includes the core framework, libraries, and tools that power the platform.

## Core Architecture

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | [Next.js 14](https://nextjs.org/) | React framework using the App Router for fast, server-side rendered pages and static generation. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strongly typed JavaScript for safer, more robust code. |
| **UI Library** | [React 18](https://react.dev/) | Core UI rendering library. |

## Styling & User Interface

| Category | Technology | Purpose |
|----------|------------|---------|
| **CSS Framework** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS framework for rapid UI development. |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Production-ready animation library for React, used for micro-interactions and page transitions. |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent, and customizable icon set. |
| **Class Management** | `clsx` & `tailwind-merge` | Utility for conditionally joining class names and merging tailwind classes without style conflicts. |
| **Variant Styling** | `class-variance-authority` (CVA) | For defining component variants (e.g., button sizes/colors) elegantly. |

## State Management & Forms

| Category | Technology | Purpose |
|----------|------------|---------|
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) | Performant, flexible, and extensible forms with easy-to-use validation. |
| **Schema Validation** | [Zod](https://zod.dev/) | TypeScript-first schema declaration and validation library, tightly integrated with forms. |

## AI & Integrations

| Category | Technology | Purpose |
|----------|------------|---------|
| **AI SDK** | [Vercel AI SDK](https://sdk.vercel.ai/docs) | Unified interface for interacting with LLMs (`ai`, `@ai-sdk/react`). |
| **Google AI Integration** | `@ai-sdk/google`, `@google/generative-ai` | Provider-specific packages for Google's Generative AI models (e.g., Gemini). |
| **OpenAI Integration** | `@ai-sdk/openai` | Provider-specific package for OpenAI's models. |
| **Third-Party Integrations**| `@next/third-parties` | Optimized loading of third-party scripts like Google Analytics. |

## Testing & Quality Assurance

| Category | Technology | Purpose |
|----------|------------|---------|
| **Unit Testing** | [Vitest](https://vitest.dev/) | Blazing fast unit testing framework powered by Vite. |
| **Component Testing**| [React Testing Library](https://testing-library.com/) | Simple and complete testing utilities that encourage good testing practices. |
| **DOM Environment** | `jsdom` | JavaScript implementation of various web standards for testing. |
| **E2E Testing** | [Playwright](https://playwright.dev/) | Reliable end-to-end testing for modern web apps. |

## Tooling & Environment

| Category | Technology | Purpose |
|----------|------------|---------|
| **Package Manager** | `npm` | Node package manager for managing dependencies. |
| **Environment** | `dotenv` | Loads environment variables from a `.env` file into `process.env`. |
| **Linting** | [ESLint](https://eslint.org/) | Pluggable linting utility to enforce code quality and styling rules. |
| **TypeScript Exec** | `tsx` | Execute TypeScript files seamlessly (useful for scripts). |

---

> **Note:** This stack was selected to prioritize developer experience, application performance, type safety, and modern UI capabilities.
