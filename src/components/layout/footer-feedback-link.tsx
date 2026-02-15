'use client';

import * as React from 'react';
import { FeedbackModal } from '@/components/ui/feedback-modal';

export function FooterFeedbackLink() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-sm text-white/60 hover:text-white transition-colors"
            >
                Feedback
            </button>
            <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
