import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'bordered' | 'surface';
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', hover = false, padding = 'md', children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-lg',
                    {
                        // Variants
                        'bg-white shadow-card': variant === 'default',
                        'bg-white shadow-elevated': variant === 'elevated',
                        'bg-white border border-gray-200': variant === 'bordered',
                        'bg-surface-200': variant === 'surface',
                        // Hover effect
                        'transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 cursor-pointer':
                            hover,
                        // Padding
                        'p-0': padding === 'none',
                        'p-4': padding === 'sm',
                        'p-6': padding === 'md',
                        'p-8': padding === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

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

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn('text-sm text-gray-500 mt-1', className)} {...props} />
    )
);

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('', className)} {...props} />
    )
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

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
