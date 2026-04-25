import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'outline' | 'gold';
    size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', size = 'md', ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center rounded-full font-medium',
                    {
                        // Sizes
                        'px-2 py-0.5 text-xs': size === 'sm',
                        'px-3 py-1 text-sm': size === 'md',
                        // Variants
                        'bg-primary/10 text-primary': variant === 'default',
                        'bg-accent/10 text-accent-600': variant === 'accent',
                        'bg-accent/20 text-accent font-bold border border-accent/30': variant === 'gold',
                        'bg-green-100 text-green-700': variant === 'success',
                        'bg-yellow-100 text-yellow-700': variant === 'warning',
                        'bg-red-100 text-red-700': variant === 'error',
                        'border border-gray-300 text-gray-600 bg-transparent': variant === 'outline',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';

export { Badge };
