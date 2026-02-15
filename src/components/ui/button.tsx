"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    {
        variants: {
            variant: {
                primary:
                    'bg-accent text-primary hover:bg-accent-400 active:bg-accent-500 shadow-subtle hover:shadow-card',
                secondary:
                    'bg-primary text-white hover:bg-primary-400 active:bg-primary-600 shadow-subtle hover:shadow-card',
                outline:
                    'border-2 border-primary text-primary hover:bg-primary hover:text-white',
                'outline-light':
                    'border-2 border-white text-white hover:bg-white hover:text-primary',
                ghost:
                    'text-primary hover:bg-surface-200 active:bg-surface-300',
                link:
                    'text-accent underline-offset-4 hover:underline',
            },
            size: {
                sm: 'h-9 px-4 text-xs',
                md: 'h-11 px-6 text-sm',
                lg: 'h-13 px-8 text-base',
                xl: 'h-14 px-10 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

import { motion } from 'framer-motion';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            isLoading,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const MotionButton = motion.button as any;

        return (
            <MotionButton
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref as any}
                disabled={disabled || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    leftIcon
                )}
                {children}
                {!isLoading && rightIcon}
            </MotionButton>
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
