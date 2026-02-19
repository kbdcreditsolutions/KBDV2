# KBD Credit Solutions — AI Chatbot Documentation

> **System:** KBD AI Assistant  
> **Type:** RAG (Retrieval-Augmented Generation) Chatbot  
> **Engine:** Google Gemini 1.5 Flash via Vercel AI SDK  
> **Last Updated:** 18 February 2026

---

## 1. Quick Start

The chatbot uses Google Gemini (High Intelligence, Free Tier) to provide intelligent responses based on the company's knowledge base.

### Prerequisites

1.  **Environment Variables:** Ensure `.env` contains your Google API key:
    ```bash
    GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...
    ```
2.  **Dependencies:**
    ```bash
    npm install ai @ai-sdk/google
    ```

### Running Locally

```bash
npm run dev
# Chatbot widget appears as a floating button on all pages
```

---

## 2. Architecture

The system uses [Vercel AI SDK](https://sdk.vercel.ai/docs) to stream responses from Google Gemini.

```
┌──────────────────────────────┐      ┌──────────────────────────────┐
│          Browser             │      │          Server              │
│                              │      │                              │
│   ┌──────────────────────┐   │      │   ┌──────────────────────┐   │
│   │    ChatWidget        │   │ POST │   │    API Route         │   │
│   │ (useChat hook)       │ ──┼──────┼─► │ (api/chat/route.ts)  │   │
│   │  • Manages state     │   │ Stream│   │  • Inject Context    │   │
│   │  • Renders stream    │ ◄─┼──────┼── │  • Call Google       │   │
│   └──────────────────────┘   │      │   └──────────┬───────────┘   │
└──────────────────────────────┘      └──────────────│───────────────┘
                                                     ▼
                                          ┌──────────────────────┐
                                          │      Google API      │
                                          │  (Gemini 1.5 Flash)  │
                                          └──────────────────────┘
```

### Key Files

| File | Purpose |
|------|---------|
| `src/components/chat/chat-widget.tsx` | Frontend widget using `useChat` hook for streaming UI. |
| `src/app/api/chat/route.ts` | Edge-compatible API route that streams LLM responses. |
| `src/lib/chatbot-knowledge.ts` | System prompt containing company data (rates, products, etc). |

---

## 3. Knowledge Base

**File:** `src/lib/chatbot-knowledge.ts`

This file exports a constant string `chatbotKnowledge` which serves as the **System Prompt**.

### Content Structure
- **Company Info:** Contact details, address.
- **Loan Products:** Personal, Home, Business, Vehicle loans (Rates, Tenure).
- **Bank Partners:** HDFC, SBI, ICICI, etc.
- **Workflow:** Application steps, document requirements.

**To update the chatbot's knowledge:**
1. Edit `src/lib/chatbot-knowledge.ts`.
2. Save the file.
3. The next request will immediately use the new prompt context.

---

## 4. Frontend Widget

**File:** `src/components/chat/chat-widget.tsx`

We use the `useChat` hook from `@ai-sdk/react` to handle the streaming of messages, while managing the input state manually for better control.

```typescript
import { useChat } from '@ai-sdk/react';

// Inside component
const { messages, append, isLoading } = useChat({
  api: '/api/chat',
  initialMessages: [ ... ],
});

// Manual Input Management
const [input, setInput] = useState('');
const handleSubmit = async (e) => {
    e.preventDefault();
    await append({ role: 'user', content: input });
    setInput('');
};
```

- **Streaming:** Characters appear in real-time as they are generated.
- **History:** `useChat` automatically maintains conversation history.
- **Manual Input:** We explicitly control the input field and submission handler to ensure stability.

---

## 5. API Reference

### `POST /api/chat`

Handles the chat completion request.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "What are your home loan rates?" }
  ]
}
```

**Response:**
- Returns a raw text stream (Server-Sent Events style) compatible with `useChat`.

---

## 6. Error Handling

| Scenario | Behavior |
|----------|----------|
| **Missing API Key** | API returns 500. Widget shows error message. |
| **Network Error** | Widget retains user message but shows error state. |
| **Rate Limit** | OpenAI API may reject requests. Check Vercel logs. |

---

## 7. Changelog

| Date | Change |
|------|--------|
| **2026-02-18** | **Migration:** Switched to Google Gemini 1.5 Flash (Free Tier) due to OpenAI quota limits. |
| 2026-02-17 | Major Upgrade: Migrated from Rule-Based to AI (OpenAI + Vercel SDK). |
| 2026-02-15 | Initial Rule-Based implementation. |
