import { describe, it, expect } from 'vitest';
import { cn, formatCurrency } from '../src/lib/utils'; // Adjust path if needed

describe('Utils', () => {
    describe('cn', () => {
        it('should merge class names', () => {
            expect(cn('w-full', 'bg-red-500')).toBe('w-full bg-red-500');
        });
        it('should handle conditionals', () => {
            expect(cn('w-full', { 'bg-red-500': true, 'bg-blue-500': false })).toBe('w-full bg-red-500');
        });
    });

    // Mock formatCurrency test if the function exists
    // describe('formatCurrency', () => {
    //     it('should format numbers to INR', () => {
    //         expect(formatCurrency(1000)).toBe('₹1,000');
    //     });
    // });
});
