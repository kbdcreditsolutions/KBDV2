# KBD Credit Solutions — AI Chatbot Documentation

> **System:** KBD AI Assistant  
> **Type:** Intelligent Financial Assistant  
> **Engine:** Google Gemini 2.0 Flash via Vercel AI SDK  
> **Last Updated:** 21 April 2026

---

## 1. Quick Start

The chatbot uses **Google Gemini 2.0 Flash** to provide high-speed, intelligent responses based on the company's curated knowledge base.

### Prerequisites

1.  **Environment Variables:** Ensure `.env` contains your Google AI key:
    ```bash
    GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...
    ```
2.  **Dependencies:**
    ```json
    "ai": "^6.0.86",
    "@ai-sdk/google": "^3.0.29",
    "@ai-sdk/react": "^3.0.88"
    ```

### Running Locally

```bash
npm run dev
# Chatbot widget appears as a floating bubble on the bottom-right
```

---

## 2. Architecture

The system utilizes the **Vercel AI SDK** for high-performance streaming and UI state management.

```
┌──────────────────────────────┐      ┌──────────────────────────────┐
│          Browser             │      │          Server              │
│                              │      │                              │
│   ┌──────────────────────┐   │      │   ┌──────────────────────┐   │
│   │    ChatWidget        │   │ POST │   │    API Route         │   │
│   │  (useChat hook)      │ ──┼──────┼─► │ (api/chat/route.ts)  │   │
│   │  • Animates stream   │   │ Stream│   │  • Injects Context   │   │
│   │  • Persists history  │ ◄─┼──────┼── │  • Calls Gemini 2.0  │   │
│   └──────────────────────┘   │      │   └──────────┬───────────┘   │
└──────────────────────────────┘      └──────────────│───────────────┘
                                                     ▼
                                          ┌──────────────────────┐
                                          │      Google AI       │
                                          │  (Gemini 2.0 Flash)  │
                                          └──────────────────────┘
```

### Key Components

| File | Purpose |
|------|---------|
| `src/components/chat/chat-widget.tsx` | Main UI component. Features include quick replies, streaming indicators, and session persistence. |
| `src/app/api/chat/route.ts` | Edge-runtime route handling model communication and UI stream formatting. |
| `src/lib/chatbot-knowledge.ts` | Centralized repository for all loan products, bank partners, and institutional guidelines. |

---

## 3. Features & User Experience

### 🚀 Real-time Streaming
Powered by the AI SDK, responses appear character-by-character, drastically reducing perceived latency.

### 💾 Session Persistence
Conversations are saved to `sessionStorage` (`kbd-chat-messages`). This allows users to browse different loan products on the site without losing their chat history.

### ⚡ Quick Replies
Pre-configured "chips" (e.g., "Personal Loan rates") appear when the chat is empty, helping users start the conversation with one tap.

### 🎨 Premium Design
- **Glassmorphism**: Translucent dark backgrounds with subtle borders.
- **Animations**: Fluid transitions using `framer-motion`.
- **Typing Indicator**: Animated bounce indicators while the AI is thinking.

---

## 4. Knowledge Management

**File:** `src/lib/chatbot-knowledge.ts`

The chatbot's personality and domain expertise are defined in a single constant string. This includes:
- **Product Ranges**: Accurate interest rates for Personal, Home, and Business loans.
- **Bank Logic**: Specific recommendations (e.g., HDFC for speed, SBI for rates).
- **Steering**: Instructions to always guide users back to the **Loan Estimator** for formal calculations.

---

## 5. Maintenance Guidelines

### Updating Interest Rates
Edit the `chatbotKnowledge` constant in `src/lib/chatbot-knowledge.ts`. The changes are applied instantly without code recompilation.

### Switching AI Models
In `src/app/api/chat/route.ts`, you can update the model identifier:
```typescript
const result = streamText({
    model: google('gemini-2.0-flash'), // Switch to 'gemini-2.0-pro' if needed
    ...
});
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
