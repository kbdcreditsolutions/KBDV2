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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={ref as any}
                className={cn(
                    // Vertical Padding
                    {
                        'py-12 md:py-16': size === 'sm',
                        'py-16 md:py-24': size === 'md',
                        'py-20 md:py-32': size === 'lg',
                    },
                    // Background
                    {
                        'bg-white': background === 'white',
                        'bg-surface-200': background === 'surface',
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
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    align = 'center',
    className,
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
            <h2 className="text-3xl font-bold lg:text-4xl">{title}</h2>
            {subtitle && (
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
};
