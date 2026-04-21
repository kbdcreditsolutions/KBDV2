'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { BadgeCheck, Bug, Lightbulb, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeedbackPage() {
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Here you would typically send the data to your backend
    };

    if (isSubmitted) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6 rounded-full bg-green-500/10 p-6 border border-green-500/20"
                >
                    <BadgeCheck className="h-12 w-12 text-green-500" />
                </motion.div>
                <h1 className="mb-2 text-2xl font-bold text-white">Thank You!</h1>
                <p className="mb-8 max-w-md text-white/60">
                    Your feedback helps us improve KBD Credit Solutions. We appreciate your input.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Submit Another Response
                </Button>
            </div>
        );
    }

    return (
        <div className="container-wide py-20 lg:py-28">
            <div className="mx-auto max-w-2xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                        We Value Your Feedback
                    </h1>
                    <p className="text-white/60 text-lg">
                        Help us make KBD Credit Solutions better for everyone.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <label className="cursor-pointer">
                                <input type="radio" name="type" className="peer sr-only" defaultChecked />
                                <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-white/5 p-4 transition-all hover:border-accent/10 hover:bg-accent/5 peer-checked:border-accent peer-checked:bg-accent/10">
                                    <Bug className="h-6 w-6 text-white/40 peer-checked:text-accent" />
                                    <span className="text-sm font-medium text-white/60 peer-checked:text-accent">Report Bug</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" name="type" className="peer sr-only" />
                                <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-gray-100 p-4 transition-all hover:border-blue-100 hover:bg-blue-50/50 peer-checked:border-primary peer-checked:bg-blue-50">
                                    <Lightbulb className="h-6 w-6 text-gray-400 peer-checked:text-primary" />
                                    <span className="text-sm font-medium text-gray-600 peer-checked:text-primary">Feature Request</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" name="type" className="peer sr-only" />
                                <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-gray-100 p-4 transition-all hover:border-blue-100 hover:bg-blue-50/50 peer-checked:border-primary peer-checked:bg-blue-50">
                                    <MessageSquare className="h-6 w-6 text-gray-400 peer-checked:text-primary" />
                                    <span className="text-sm font-medium text-gray-600 peer-checked:text-primary">General</span>
                                </div>
                            </label>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Tell us what you think..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email (Optional)
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="your@email.com"
                            />
                            <p className="text-xs text-gray-400">
                                We&apos;ll only use this to respond to your feedback.
                            </p>
                        </div>

                        <Button type="submit" size="lg" className="w-full" variant="gold">
                            Send Feedback
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
