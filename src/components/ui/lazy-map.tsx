"use client";

import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyMapProps {
    src: string;
    title?: string;
    className?: string;
}

export default function LazyMap({ src, title = "Map", className = "" }: LazyMapProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={`relative w-full h-full bg-gray-100 ${className}`}>
            {isVisible ? (
                <iframe
                    src={src}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={title}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="sr-only">Loading map...</span>
                </div>
            )}
        </div>
    );
}
