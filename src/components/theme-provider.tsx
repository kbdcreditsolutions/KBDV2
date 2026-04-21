'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

/**
 * ThemeProvider
 * Dynamically applies the '.theme-premium' class to the body tag
 * for all routes except the Homepage and the Partner Login.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Configuration: Define exactly which pages stay "Standard" (Original)
        const excludedRoutes = ['/', '/partners/login'];
        const isExcluded = excludedRoutes.includes(pathname);

        // Apply theme-premium to the body tag if not excluded
        if (!isExcluded) {
            document.body.classList.add('theme-premium');
        } else {
            document.body.classList.remove('theme-premium');
        }

        // Cleanup function (optional but good practice)
        return () => {
            document.body.classList.remove('theme-premium');
        };
    }, [pathname, mounted]);

    // Simple wrapper that doesn't affect layout
    return <>{children}</>;
}
