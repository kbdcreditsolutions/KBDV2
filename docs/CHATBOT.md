# KBD Credit Solutions — Chatbot Documentation

> **System:** KBD Virtual Assistant  
> **Type:** Local pattern-matching chatbot (no external AI/API dependency)  
> **Last Updated:** 16 February 2026

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture](#architecture)
3. [API Reference](#api-reference)
4. [Response Engine](#response-engine)
5. [Knowledge Base](#knowledge-base)
6. [Frontend Widget](#frontend-widget)
7. [Adding New Responses](#adding-new-responses)
8. [Error Handling](#error-handling)
9. [Upgrading to AI-Powered](#upgrading-to-ai-powered)
10. [Changelog](#changelog)

---

## Quick Start

The chatbot works **out-of-the-box** with zero configuration. No API keys, no external services, no database.

```bash
npm run dev
# Chatbot widget appears as a floating button on all pages
```

**Test the API directly:**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "What are personal loan rates?"}]}'
```

**Expected response:**

```json
{
  "role": "assistant",
  "content": "**Personal Loans at KBD Credit Solutions:**\n\n• **Interest Rate:** 10.50% – 24.00% p.a.\n• **Tenure:** 1 to 5 years..."
}
```

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser                                │
│  ┌────────────────────────────────────┐                      │
│  │    ChatWidget (chat-widget.tsx)     │                      │
│  │  • Floating FAB button             │                      │
│  │  • Message list with auto-scroll   │                      │
│  │  • Input form with loading state   │                      │
│  │  • Animated open/close (Framer)    │                      │
│  └─────────────┬──────────────────────┘                      │
│                │  POST /api/chat                             │
│                │  { messages: [...] }                         │
└────────────────┼─────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────┐
│                     Next.js Server                            │
│  ┌────────────────────────────────────┐                      │
│  │   API Route (api/chat/route.ts)    │                      │
│  │  • Extracts last user message      │                      │
│  │  • Validates request body          │                      │
│  │  • Returns JSON response           │                      │
│  └─────────────┬──────────────────────┘                      │
│                │  getLocalResponse(msg)                       │
│                ▼                                              │
│  ┌────────────────────────────────────┐                      │
│  │  Response Engine                   │                      │
│  │  (chatbot-responses.ts)            │                      │
│  │  • 13 pattern-matching rules       │                      │
│  │  • Weighted keyword scoring        │                      │
│  │  • Fallback response               │                      │
│  └────────────────────────────────────┘                      │
│                                                               │
│  ┌────────────────────────────────────┐                      │
│  │  Knowledge Base                    │                      │
│  │  (chatbot-knowledge.ts)            │                      │
│  │  • Structured text prompt          │                      │
│  │  • Reserved for future AI use      │                      │
│  └────────────────────────────────────┘                      │
└──────────────────────────────────────────────────────────────┘
```

### File Map

| File | Purpose | Size |
|------|---------|------|
| `src/components/chat/chat-widget.tsx` | Frontend floating widget | 200 lines |
| `src/app/api/chat/route.ts` | API endpoint handler | 36 lines |
| `src/lib/chatbot-responses.ts` | Pattern-matching response engine | 92 lines |
| `src/lib/chatbot-knowledge.ts` | Knowledge base (structured text) | 61 lines |

---

## API Reference

### `POST /api/chat`

Processes a user message and returns a chatbot response.

#### Request

```http
POST /api/chat
Content-Type: application/json
```

```json
{
  "messages": [
    { "role": "assistant", "content": "Welcome message..." },
    { "role": "user", "content": "Tell me about home loans" }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `messages` | `Array<{role, content}>` | Yes | Full conversation history |
| `messages[].role` | `"user"` or `"assistant"` | Yes | Message sender |
| `messages[].content` | `string` | Yes | Message text |

> **Note:** The engine only processes the **last user message**. Full history is sent for future AI upgrade compatibility.

#### Responses

**200 OK — Successful response:**

```json
{
  "role": "assistant",
  "content": "**Home Loans at KBD Credit Solutions:**\n\n• **Interest Rate:** 8.50% – 12.00% p.a...."
}
```

**400 Bad Request — No user message found:**

```json
{
  "error": "No user message found"
}
```

**500 Internal Server Error — Processing failure:**

```json
{
  "error": "Failed to process message"
}
```

#### Rate Limiting

No rate limiting is applied at the API level. The response engine is synchronous and local — processing time is <1ms. If you deploy behind a CDN or reverse proxy, rate limiting can be configured there.

---

## Response Engine

**File:** `src/lib/chatbot-responses.ts`

### How It Works

The engine uses a **weighted keyword scoring** system:

```
User message → lowercase → scan all rules → score each rule → pick highest → return response
```

1. The user input is converted to lowercase
2. Each rule's keywords are checked against the input (substring match)
3. Multi-word keywords score higher than single-word (e.g., "personal loan" = 2 points, "loan" = 1 point)
4. The rule with the highest total score wins
5. If no rules match (score = 0), the fallback response is returned

### Scoring Example

```
User input: "What are personal loan rates?"

Rule: personal-loans  → keywords: ["personal loan", "personal loans"]
  "personal loan" matches → score += 2 (two words)
  Total: 2

Rule: interest-rates   → keywords: ["interest rate", "rates", "roi", "interest"]
  "rates" matches       → score += 1
  Total: 1

Winner: personal-loans (score 2 > 1)
```

### Response Rules (13 total)

| # | Keywords | Topic | Response Contains |
|---|----------|-------|-------------------|
| 1 | `hello`, `hi`, `hey`, `namaste` | Greeting | Welcome + loan types overview |
| 2 | `personal loan` | Personal Loans | Rates, tenure, fees, eligibility |
| 3 | `home loan`, `housing loan`, `property loan` | Home Loans | Rates, tenure, LTV, bank tips |
| 4 | `business loan`, `msme`, `startup loan` | Business Loans | Rates, collateral-free options |
| 5 | `vehicle loan`, `car loan`, `bike loan` | Vehicle Loans | Rates, tenure, financing |
| 6 | `interest rate`, `rates`, `roi` | Interest Rates | All loan types rate table |
| 7 | `eligibility`, `qualify`, `can i get` | Eligibility | Criteria per loan type |
| 8 | `emi`, `installment`, `calculate` | EMI Calculator | Directs to Loan Estimator |
| 9 | `bank`, `hdfc`, `sbi`, `icici`, `axis` | Bank Partners | Partner bank highlights |
| 10 | `document`, `paperwork`, `kyc` | Documents | Required documents checklist |
| 11 | `process`, `apply`, `how to`, `steps` | Application | 5-step application flow |
| 12 | `contact`, `phone`, `email`, `call` | Contact Info | Email, phone, address |
| 13 | `compare`, `best`, `cheapest`, `lowest` | Comparison | Directs to Compare Loans page |
| 14 | `thank`, `bye`, `goodbye` | Farewell | Friendly sign-off |
| — | *(no match)* | Fallback | All loan types overview |

### Exported Function

```typescript
function getLocalResponse(userMessage: string): string
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `userMessage` | `string` | Raw user input text |
| **Returns** | `string` | Formatted response (supports Markdown bold) |

---

## Knowledge Base

**File:** `src/lib/chatbot-knowledge.ts`

This file contains a structured text prompt with all KBD Credit Solutions data. It is **not currently used** by the local response engine but is preserved for future AI integration.

### Contents

| Section | Data |
|---------|------|
| Company Info | Name, website, email, phone, address |
| Loan Products | 4 product types with rates, tenure, fees |
| Bank Partners | 5 partners with key differentiators |
| Application Process | 5-step flow |
| Key Features | Loan Estimator, Compare Tool, Expert Assistance |
| Response Guidelines | Tone, restrictions, behavior rules |

### When This File Will Be Used

If the chatbot is upgraded to an AI-powered engine (see [Upgrading to AI-Powered](#upgrading-to-ai-powered)), this knowledge base will be sent as the system prompt to the LLM.

---

## Frontend Widget

**File:** `src/components/chat/chat-widget.tsx`

### Features

| Feature | Implementation |
|---------|---------------|
| **Floating button** | Fixed bottom-right, z-50 |
| **Open/close animation** | Framer Motion (scale + fade + slide) |
| **Welcome message** | Pre-loaded on first render |
| **Auto-scroll** | `scrollIntoView` on new messages |
| **Loading indicator** | Spinning icon + "Thinking..." text |
| **Error fallback** | Shows contact info on API failure |
| **Responsive** | 350×500px chat window |

### UI Layout

```
┌─────────────────────────┐
│  🤖 KBD Assistant       │ ← Dark header w/ Bot icon
│     Online              │
├─────────────────────────┤
│                         │
│  [Bot] Welcome msg...   │ ← Gray background
│                         │
│        [User] My msg    │ ← Gold bubble, right-aligned
│                         │
│  [Bot] Response...      │ ← White bubble, left-aligned
│                         │
├─────────────────────────┤
│  [  Type a message... ] │ ← Input + Send button
└─────────────────────────┘
```

### Message Interface

```typescript
interface ChatMessage {
    id: string;           // "user-{timestamp}" or "assistant-{timestamp}"
    role: 'user' | 'assistant';
    content: string;
}
```

### State Management

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| `isOpen` | `boolean` | `false` | Widget open/closed |
| `input` | `string` | `''` | Current input text |
| `isLoading` | `boolean` | `false` | API call in progress |
| `messages` | `ChatMessage[]` | [welcome] | Conversation history |

### Styling

| Element | Color | Class |
|---------|-------|-------|
| User bubble | Gold (`accent`) | `bg-accent text-primary rounded-tr-none` |
| Bot bubble | White | `bg-white text-gray-700 shadow-sm rounded-tl-none` |
| User avatar | Gold circle | `bg-accent text-primary` |
| Bot avatar | Dark circle | `bg-primary text-white` |
| FAB button | Primary dark | `bg-primary shadow-lg shadow-primary/20` |

---

## Adding New Responses

### Step 1: Add a Response Rule

Open `src/lib/chatbot-responses.ts` and add to the `RESPONSE_RULES` array:

```typescript
{
    keywords: ['cibil', 'credit score', 'cibil score'],
    response: "**Understanding CIBIL Score:**\n\n• A score of **750+** is ideal for loan approval\n• Check your CIBIL score free at cibil.com\n• Late EMI payments can reduce your score\n\nWould you like tips to improve your credit score?",
},
```

### Step 2: Verify Keyword Priority

Make sure your new keywords don't conflict with existing rules. If multiple rules match, the one with the **highest total keyword score** wins. Multi-word keywords have an advantage.

### Step 3: Update the Knowledge Base

If adding a new topic, also update `src/lib/chatbot-knowledge.ts` so the data stays in sync:

```typescript
### Credit Score Guidelines
- Minimum CIBIL score for personal loan: 700+
- Minimum CIBIL score for home loan: 650+
```

### Step 4: Test

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "How to improve my CIBIL score?"}]}'
```

---

## Error Handling

### API Level (route.ts)

| Error | Status | Response | Cause |
|-------|--------|----------|-------|
| No user message | 400 | `{ error: "No user message found" }` | Empty messages array or no user role |
| Processing failure | 500 | `{ error: "Failed to process message" }` | JSON parse error or unexpected exception |

### Frontend Level (chat-widget.tsx)

| Scenario | Behavior |
|----------|----------|
| API returns error | Shows fallback message with contact info |
| Network failure | Same error message + console.error log |
| Empty input | Submit button disabled, form submission blocked |
| Loading state | Input disabled, spinner shown, send button disabled |
| API returns empty content | Shows generic "couldn't process" message |

### Error Message (shown to user):

> I apologize, I'm having trouble right now. You can reach us directly at **contact@kbdcredit.com** or call **+91 1234567890** for immediate assistance.

---

## Upgrading to AI-Powered

The system was designed for easy migration to a real AI engine. Here's how:

### Step 1: Install AI SDK

```bash
npm install openai
```

### Step 2: Set Environment Variable

```bash
# .env.local
OPENAI_API_KEY=sk-...
```

### Step 3: Modify the API Route

Replace `src/app/api/chat/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { chatbotKnowledge } from '@/lib/chatbot-knowledge';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: chatbotKnowledge },
                ...messages,
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        return NextResponse.json({
            role: 'assistant',
            content: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Failed to process message' },
            { status: 500 }
        );
    }
}
```

### What Doesn't Change

- **Frontend widget** — No changes needed, it uses the same `POST /api/chat` contract
- **Message format** — Same `{ role, content }` interface
- **Error handling** — Same fallback behavior

The `chatbot-knowledge.ts` file becomes the LLM system prompt, providing full context about KBD Credit Solutions.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-15 | Rewrote chatbot from `@ai-sdk/react` to plain React + `fetch()` |
| 2026-02-15 | Created local response engine (13 rules + fallback) |
| 2026-02-15 | Removed OpenAI/LangChain dependency |
| 2026-02-14 | Initial chatbot implementation with AI SDK |
