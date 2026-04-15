"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'surface' | 'primary';
    hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
        const CardComponent = hover ? motion.div : 'div';
        const motionProps = hover ? {
            whileHover: { y: -5 },
            transition: { type: 'spring', stiffness: 300 }
        } : {};

        return (
            // @ts-expect-error - Framer motion generic types are complex
            <CardComponent
                {...motionProps}
                ref={ref}
                className={cn(
                    'rounded-2xl border transition-all duration-300',
                    {
                        // Variants
                        'bg-white border-gray-100 shadow-sm': variant === 'default',
                        'bg-surface-100 border-transparent': variant === 'surface',
                        'bg-primary text-white border-transparent': variant === 'primary',
                        // Hover
                        'hover:shadow-lg hover:border-primary/20': hover,
                    },
                    className
                )}
                {...props}
            >
                {children}
            </CardComponent>
        );
    }
);

Card.displayName = 'Card';

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('mb-4', className)} {...props} />
    )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, as: Component = 'h3', ...props }, ref) => (
        <Component
            ref={ref}
            className={cn('text-lg font-semibold text-gray-900', className)}
            {...props}
        />
    )
);

CardTitle.displayName = 'CardTitle';

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn('text-sm text-gray-500 mt-1', className)} {...props} />
    )
);

CardDescription.displayName = 'CardDescription';

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-6', className)} {...props} />
    )
);

CardContent.displayName = 'CardContent';

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('mt-4 flex items-center gap-4', className)}
            {...props}
        />
    )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
