import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

/**
 * Format currency in INR
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 2): string {
    return `${value.toFixed(decimals)}%`;
}

/**
 * Format number with Indian numbering system (lakhs, crores)
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Slugify a string
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
