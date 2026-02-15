import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'accent' | 'success';
    showLabel?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    (
        {
            className,
            value,
            max = 100,
            size = 'md',
            variant = 'default',
            showLabel = false,
            ...props
        },
        ref
    ) => {
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

        return (
            <div className={cn('w-full', className)} ref={ref} {...props}>
                {showLabel && (
                    <div className="mb-1 flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{Math.round(percentage)}%</span>
                    </div>
                )}
                <div
                    className={cn('w-full overflow-hidden rounded-full bg-gray-200', {
                        'h-1.5': size === 'sm',
                        'h-2.5': size === 'md',
                        'h-4': size === 'lg',
                    })}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                >
                    <div
                        className={cn('h-full rounded-full transition-all duration-300 ease-out', {
                            'bg-primary': variant === 'default',
                            'bg-accent': variant === 'accent',
                            'bg-green-500': variant === 'success',
                        })}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        );
    }
);

Progress.displayName = 'Progress';

// Step Progress for multi-step forms
interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
    labels?: string[];
    className?: string;
}

const StepProgress: React.FC<StepProgressProps> = ({
    currentStep,
    totalSteps,
    labels,
    className,
}) => {
    return (
        <div className={cn('w-full', className)}>
            <div className="flex items-center justify-between">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                    <React.Fragment key={step}>
                        {/* Step Circle */}
                        <div className="flex flex-col items-center">
                            <div
                                className={cn(
                                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                                    {
                                        'bg-accent text-primary': step < currentStep,
                                        'bg-primary text-white ring-4 ring-primary/20': step === currentStep,
                                        'bg-gray-200 text-gray-500': step > currentStep,
                                    }
                                )}
                            >
                                {step < currentStep ? (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step
                                )}
                            </div>
                            {labels && labels[step - 1] && (
                                <span
                                    className={cn('mt-2 text-xs font-medium', {
                                        'text-primary': step <= currentStep,
                                        'text-gray-400': step > currentStep,
                                    })}
                                >
                                    {labels[step - 1]}
                                </span>
                            )}
                        </div>
                        {/* Connector Line */}
                        {step < totalSteps && (
                            <div
                                className={cn('h-0.5 flex-1 mx-2', {
                                    'bg-accent': step < currentStep,
                                    'bg-gray-200': step >= currentStep,
                                })}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export { Progress, StepProgress };
