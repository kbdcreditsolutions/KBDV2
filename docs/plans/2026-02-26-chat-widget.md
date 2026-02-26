# Chat Widget Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Botpress embedded script with a custom branded React chat widget connected to the existing Gemini AI backend.

**Architecture:** The widget is a single `'use client'` React component using `useChat` from `@ai-sdk/react` for streaming. Messages are persisted to `sessionStorage` so they survive page navigation within the same tab. The backend route is upgraded from `gemini-1.5-flash` to `gemini-2.0-flash`.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS 3, Framer Motion, `@ai-sdk/react` (`useChat`), Vercel AI SDK, Google Gemini 2.0 Flash, Vitest + @testing-library/react

---

## Task 1: Upgrade Gemini model in API route

**Files:**
- Modify: `src/app/api/chat/route.ts:15`

**Step 1: Make the change**

In `src/app/api/chat/route.ts`, change line 15 from:
```ts
model: google('models/gemini-1.5-flash'),
```
to:
```ts
model: google('gemini-2.0-flash'),
```

**Step 2: Verify the file looks correct**

Full file should be:
```ts
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { chatbotKnowledge } from '@/lib/chatbot-knowledge';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.0-flash'),
            system: chatbotKnowledge,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API error:', error);
        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }
        return new Response(JSON.stringify({ error: 'Failed to process message', details: String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
```

**Step 3: Commit**

```bash
git add src/app/api/chat/route.ts
git commit -m "feat(chat): upgrade to gemini-2.0-flash"
```

---

## Task 2: Rewrite chat-widget.tsx

**Files:**
- Modify: `src/components/chat/chat-widget.tsx` (full rewrite)

**Step 1: Write the new component**

Replace the entire contents of `src/components/chat/chat-widget.tsx` with:

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const QUICK_REPLIES = [
    'Personal Loan rates',
    'Home Loan eligibility',
    'Business Loan options',
    'How to apply?',
];

const SESSION_KEY = 'kbd-chat-messages';

type StoredMessage = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

function loadStoredMessages(): StoredMessage[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [initialMessages] = useState<StoredMessage[]>(loadStoredMessages);

    const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
        api: '/api/chat',
        initialMessages,
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Persist messages to sessionStorage on change
    useEffect(() => {
        if (messages.length > 0) {
            const toStore: StoredMessage[] = messages.map((m) => ({
                id: m.id,
                role: m.role as 'user' | 'assistant',
                content: m.content,
            }));
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(toStore));
        }
    }, [messages]);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleQuickReply = (text: string) => {
        append({ role: 'user', content: text });
    };

    const showQuickReplies = messages.length === 0 && !isLoading;

    return (
        <>
            {/* Floating trigger button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        key="trigger"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#FFC857] shadow-lg flex items-center justify-center hover:bg-[#f0b800] transition-colors"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open chat"
                    >
                        <MessageCircle className="w-6 h-6 text-[#050A18]" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        style={{ background: '#050A18' }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-[#FFC857] flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-[#050A18]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm leading-tight">KBD Finance Assistant</p>
                                <p className="text-white/40 text-xs">Powered by Gemini</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/40 hover:text-white transition-colors flex-shrink-0"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                            {/* Static welcome message */}
                            <div className="flex gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#FFC857] flex-shrink-0 flex items-center justify-center mt-0.5">
                                    <Bot className="w-3 h-3 text-[#050A18]" />
                                </div>
                                <div className="bg-white/10 rounded-2xl rounded-tl-sm px-3 py-2 text-white text-sm max-w-[80%] leading-relaxed">
                                    Hi! I can help you find the right loan. What are you looking for?
                                </div>
                            </div>

                            {/* Quick reply chips — shown only when no messages yet */}
                            {showQuickReplies && (
                                <div className="flex flex-wrap gap-2 pl-8">
                                    {QUICK_REPLIES.map((text) => (
                                        <button
                                            key={text}
                                            onClick={() => handleQuickReply(text)}
                                            className="text-xs px-3 py-1.5 rounded-full border border-[#FFC857]/50 text-[#FFC857] hover:bg-[#FFC857]/10 transition-colors"
                                        >
                                            {text}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Conversation messages */}
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}
                                >
                                    {m.role === 'assistant' && (
                                        <div className="w-6 h-6 rounded-full bg-[#FFC857] flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <Bot className="w-3 h-3 text-[#050A18]" />
                                        </div>
                                    )}
                                    <div
                                        className={`rounded-2xl px-3 py-2 text-sm max-w-[80%] leading-relaxed whitespace-pre-wrap ${
                                            m.role === 'user'
                                                ? 'bg-[#FFC857] text-[#050A18] rounded-tr-sm font-medium'
                                                : 'bg-white/10 text-white rounded-tl-sm'
                                        }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}

                            {/* Typing / streaming indicator */}
                            {isLoading && (
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#FFC857] flex-shrink-0 flex items-center justify-center">
                                        <Bot className="w-3 h-3 text-[#050A18]" />
                                    </div>
                                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-3 py-3 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:300ms]" />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex gap-2 p-3 border-t border-white/10 flex-shrink-0"
                        >
                            <input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask about loans..."
                                disabled={isLoading}
                                className="flex-1 bg-white/10 text-white placeholder-white/30 rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#FFC857]/50 disabled:opacity-50 min-w-0"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="w-9 h-9 rounded-xl bg-[#FFC857] flex items-center justify-center text-[#050A18] disabled:opacity-40 transition-opacity flex-shrink-0 hover:bg-[#f0b800]"
                                aria-label="Send message"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
```

**Step 2: Commit**

```bash
git add src/components/chat/chat-widget.tsx
git commit -m "feat(chat): replace Botpress with custom Gemini-powered widget"
```

---

## Task 3: Verify the build passes

**Step 1: Run lint**

```bash
npm run lint
```

Expected: No errors.

**Step 2: Run build**

```bash
npm run build
```

Expected: Build completes successfully with no TypeScript errors.

**Step 3: Manual smoke test**

```bash
npm run dev
```

- Open http://localhost:3000
- Floating gold button appears bottom-right ✓
- Click opens the chat panel ✓
- Quick reply chips appear ✓
- Click a chip → message sends, AI responds ✓
- Type a message manually → AI responds with streaming ✓
- Navigate to /loans → chat panel message history persists ✓
- Close button collapses the panel ✓

**Step 4: Commit if any lint fixes were needed**

```bash
git add -A
git commit -m "fix(chat): lint fixes after widget rewrite"
```

---

## Task 4: Update HANDOFF.md

**Files:**
- Modify: `docs/HANDOFF.md`

**Step 1: Update the chatbot section**

In `docs/HANDOFF.md`, find the API Reference section and update the ChatWidget description to reflect the new implementation:

- Remove references to Botpress
- Note that `chatbot-responses.ts` was removed
- Update model version to `gemini-2.0-flash`

**Step 2: Commit**

```bash
git add docs/HANDOFF.md
git commit -m "docs: update HANDOFF to reflect custom chat widget"
```
