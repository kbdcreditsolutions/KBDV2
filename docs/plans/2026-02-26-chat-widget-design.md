# Chat Widget Redesign — Design Document

> **Date:** 2026-02-26
> **Status:** Approved
> **Goal:** Replace Botpress third-party chatbot with a custom branded React chat widget connected to the existing Gemini AI backend.

---

## Context

The current chatbot is a Botpress embedded script (`cdn.botpress.cloud`). This introduces a third-party dependency, external branding, and requires a Botpress account. The project already has a working `/api/chat` streaming endpoint (Vercel AI SDK + Google Gemini) that goes unused.

---

## Decision

Replace Botpress with a fully custom React chat widget that:
- Matches the KBD brand (dark navy `#050A18`, gold `#FFC857`)
- Calls the existing `/api/chat` streaming endpoint
- Uses `useChat` from `@ai-sdk/react` (already installed)
- Persists messages in `sessionStorage` (survives page navigation, clears on tab close)
- Shows quick-reply starter chips on first open

Also upgrade the Gemini model from `gemini-1.5-flash` to `gemini-2.0-flash` (newer, better quality, same free tier).

---

## UI Layout

```
┌─────────────────────────────────┐
│ 🤖 KBD Finance Assistant    [X] │  ← dark navy header, gold icon
├─────────────────────────────────┤
│                                 │
│  Hi! I can help you find the   │  ← welcome message (AI bubble)
│  right loan. What are you      │
│  looking for?                  │
│                                 │
│  [Personal Loan] [Home Loan]   │  ← quick reply chips (gold outline)
│  [Business Loan] [How to Apply]│
│                                 │
│                  What are the  │  ← user bubble (gold bg, navy text)
│                  home loan rates│
│                                 │
│  Home loans start at 8.50%...  │  ← AI bubble (navy, white text)
│                                 │
├─────────────────────────────────┤
│ [Ask about loans...      ] [➤] │  ← input + send (gold button)
└─────────────────────────────────┘
             [💬]                   ← floating gold button, bottom-right
```

---

## Behaviour

| Interaction | Behaviour |
|-------------|-----------|
| Page load | Floating gold button, bottom-right, Framer Motion pop-in |
| Open | Panel slides up with spring animation |
| Fresh chat | Welcome message + 4 quick-reply chips |
| Quick reply click | Sends that message, chips disappear |
| AI typing | Animated 3-dot indicator while streaming |
| Session storage | Messages survive page navigation, clear on tab close |
| Close | Panel slides back down, button reappears |

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/chat/chat-widget.tsx` | Full rewrite — custom widget, Botpress removed |
| `src/app/api/chat/route.ts` | Model upgraded: `gemini-1.5-flash` → `gemini-2.0-flash` |

No new files. No new dependencies.

---

## Quick Reply Chips

1. Personal Loan rates
2. Home Loan eligibility
3. Business Loan options
4. How to apply?

---

## Persistence Strategy

- **Storage:** `sessionStorage` under key `kbd-chat-messages`
- **Scope:** Survives page navigation and widget minimize/open within the same browser tab
- **Clears:** When the browser tab is closed
- **Rationale:** A loan inquiry naturally spans multiple pages (compare → estimator → contact). localStorage persistence for financial info feels unnecessary and creates stale-data edge cases.
