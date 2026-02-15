'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function CookieConsent() {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('kbd-cookie-consent');
        if (!consent) {
            // Show banner after a small delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('kbd-cookie-consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('kbd-cookie-consent', 'false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="mx-auto max-w-4xl rounded-2xl bg-gray-900 p-6 text-white shadow-2xl md:flex md:items-center md:justify-between md:gap-8">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-white">
                                We use cookies
                            </h3>
                            <p className="mt-2 text-sm text-gray-300">
                                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button
                                variant="outline"
                                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                onClick={handleDecline}
                            >
                                Decline
                            </Button>
                            <Button
                                variant="primary"
                                className="bg-white text-gray-900 hover:bg-gray-100"
                                onClick={handleAccept}
                            >
                                Accept
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
