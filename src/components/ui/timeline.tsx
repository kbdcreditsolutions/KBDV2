"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

interface TimelineItemProps {
    title: string;
    description?: string;
    date?: string;
    isCompleted?: boolean;
    isLast?: boolean;
}

export function TimelineItem({ title, description, date, isCompleted, isLast }: TimelineItemProps) {
    return (
        <div className="relative pl-8 pb-8 last:pb-0">
            {/* Line */}
            {!isLast && (
                <div
                    className={cn(
                        "absolute left-3 top-3 h-full w-0.5",
                        isCompleted ? "bg-primary" : "bg-gray-200"
                    )}
                />
            )}

            {/* Dot */}
            <div className="absolute left-0 top-0.5 bg-white">
                {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-primary fill-white" />
                ) : (
                    <Circle className="w-6 h-6 text-gray-300 fill-white" />
                )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <h3 className={cn("text-base font-semibold leading-none", isCompleted ? "text-gray-900" : "text-gray-500")}>
                    {title}
                </h3>
                {date && <span className="text-sm text-gray-400 font-medium">{date}</span>}
            </div>
            {description && (
                <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-lg">
                    {description}
                </p>
            )}
        </div>
    );
}

export function Timeline({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("flex flex-col", className)}>
            {children}
        </div>
    );
}
