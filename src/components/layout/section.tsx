'use client';

"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    as?: 'section' | 'div' | 'article';
    size?: 'sm' | 'md' | 'lg';
    container?: 'narrow' | 'default' | 'wide' | 'none';
    background?: 'white' | 'surface' | 'primary' | 'gradient';
}

import { motion } from 'framer-motion';

export const Section = React.forwardRef<HTMLElement, SectionProps>(
    (
        {
            as: Component = 'section',
            className,
            size = 'md',
            container = 'default',
            background = 'white',
            children,
            ...props
        },
        ref
    ) => {
        return (
            <Component
                ref={ref as any}
                className={cn(
                    // Vertical Padding
                    {
                        'py-12 md:py-16': size === 'sm',
                        'py-16 md:py-24': size === 'md',
                        'py-20 md:py-32': size === 'lg',
                    },
                    // Background & Text Color Contrast
                    {
                        'bg-white text-slate-900 [[.theme-premium]_&]:bg-white/5 [[.theme-premium]_&]:text-white': background === 'white',
                        'bg-surface text-slate-900 [[.theme-premium]_&]:bg-[#0A1628]/40 [[.theme-premium]_&]:text-white': background === 'surface',
                        'bg-primary text-white': background === 'primary',
                        'bg-gradient-hero text-white': background === 'gradient',
                    },
                    className
                )}
                {...props}
            >
                <div
                    className={cn({
                        'container-narrow': container === 'narrow',
                        'container-default': container === 'default',
                        'container-wide': container === 'wide',
                    })}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </Component>
        );
    }
);

Section.displayName = 'Section';

// Section Header Component
interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    className?: string;
    variant?: 'light' | 'dark' | 'auto';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    align = 'center',
    className,
    variant = 'auto',
}) => {
    return (
        <div
            className={cn(
                'mb-12 lg:mb-16',
                {
                    'text-center': align === 'center',
                    'text-left': align === 'left',
                },
                className
            )}
        >
            <h2 className="text-3xl font-bold lg:text-4xl text-inherit">{title}</h2>
            {subtitle && (
                <p className={cn(
                    "mt-4 text-lg max-w-2xl mx-auto",
                    {
                        'text-slate-600': variant === 'light',
                        'text-white/60': variant === 'dark',
                        'text-current opacity-70': variant === 'auto',
                    }
                )}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};
