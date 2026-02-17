'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';

export function ChatWidget() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { messages, append, isLoading } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: 'welcome',
                role: 'assistant',
                content: "Hi there! 👋 I'm KBD's AI Assistant. I can help you with loan information, interest rates, eligibility, and more. What would you like to know?",
            },
        ],
        onResponse: (response: any) => {
            console.log('API Response:', response);
        },
        onFinish: (message: any) => {
            console.log('Stream Finished:', message);
        },
        onError: (error: any) => {
            console.error('Chat Error:', error);
        }
    } as any) as any;

    console.log('Current Messages:', messages);
    console.log('Is Loading:', isLoading);
    const [input, setInput] = React.useState(''); // Manual input state
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting:', input);
        if (!input.trim() || isLoading) {
            console.log('Submit blocked: empty or loading');
            return;
        }

        try {
            console.log('Calling append...');
            await append({ role: 'user', content: input });
            console.log('Append called successfully');
            setInput('');
        } catch (err) {
            console.error('Append failed:', err);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 h-[500px] w-[350px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold">KBD AI Assistant</h3>
                                    <p className="text-xs text-white/70">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 hover:bg-white/10 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
                            {messages.map((msg: any) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-2 max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                        msg.role === 'user' ? "bg-accent text-primary" : "bg-primary text-white"
                                    )}>
                                        {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                                    </div>
                                    <div
                                        className={cn(
                                            "rounded-2xl px-4 py-2 text-sm whitespace-pre-line",
                                            msg.role === 'user'
                                                ? "bg-accent text-primary rounded-tr-none"
                                                : "bg-white text-gray-700 shadow-sm rounded-tl-none border border-gray-100"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                <div className="flex gap-2 max-w-[85%]">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                    <div className="rounded-2xl rounded-tl-none bg-white px-4 py-2 text-sm text-gray-500 shadow-sm border border-gray-100 flex items-center gap-1">
                                        <Loader2 className="h-3 w-3 animate-spin" /> Thinking...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-gray-100 bg-white p-3">
                            <form
                                onSubmit={handleSubmit}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type a message..."
                                    className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    variant="primary"
                                    disabled={!input?.trim() || isLoading}
                                    className="h-9 w-9 rounded-full shrink-0"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="primary"
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageSquare className="h-6 w-6" />
                )}
            </Button>
        </div>
    );
}
