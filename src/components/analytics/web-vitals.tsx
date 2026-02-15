'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
    useReportWebVitals((metric) => {
        console.log(metric);
        // You can send this to your analytics service here
        // e.g. window.gtag('event', metric.name, { ... })
    });

    return null;
}
