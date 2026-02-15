'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center pointer-events-none">
                    {/* Backdrop (optional, invisible here but prevents clicking behind if we wanted) */}

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="pointer-events-auto w-full max-w-sm rounded-xl bg-white p-4 shadow-2xl ring-1 ring-gray-200 sm:w-96"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">Feedback</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <form className="space-y-3">
                            <div>
                                <label
                                    htmlFor="feedback-type"
                                    className="mb-1 block text-xs font-medium text-gray-500"
                                >
                                    Type
                                </label>
                                <select
                                    id="feedback-type"
                                    className="w-full rounded-md border border-gray-200 p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option>Report a Bug</option>
                                    <option>Feature Request</option>
                                    <option>General Feedback</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="feedback-message"
                                    className="mb-1 block text-xs font-medium text-gray-500"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="feedback-message"
                                    rows={3}
                                    className="w-full rounded-md border border-gray-200 p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Tell us what you think..."
                                />
                            </div>
                            <Button type="submit" size="sm" className="w-full" variant="primary">
                                Send Feedback
                            </Button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
