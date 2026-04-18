import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

/**
 * Format currency in INR — human readable (Lakhs, Cr)
 */
export function formatCurrency(amount: number): string {
    if (amount >= 10000000) {
        const cr = amount / 10000000;
        return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)} Cr`;
    }
    if (amount >= 100000) {
        const lakhs = amount / 100000;
        return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} Lakhs`;
    }
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
