import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    error?: string;
    hint?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            error,
            hint,
            options,
            placeholder,
            id,
            ...props
        },
        ref
    ) => {
        const generatedId = React.useId();
        const selectId = id || generatedId;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        id={selectId}
                        className={cn(
                            'flex h-11 w-full appearance-none rounded-lg border bg-white px-4 py-2 pr-10 text-sm transition-colors cursor-pointer',
                            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
                            error
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 hover:border-gray-400',
                            className
                        )}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
                {error && (
                    <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p id={`${selectId}-hint`} className="mt-1.5 text-sm text-gray-500">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export { Select };
