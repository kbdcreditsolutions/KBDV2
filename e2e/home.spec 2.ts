import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/KBD Credit Solutions/);
});

test('navigation links work', async ({ page }) => {
    await page.goto('/');

    // Click the Loans link.
    await page.click('text=Compare Loans');

    // Expects page to have a heading with the name of Installation.
    await expect(page).toHaveURL(/.*loans/);
});

test('loan estimator CTA works', async ({ page }) => {
    await page.goto('/');

    // Find a CTA button
    const cta = page.getByRole('link', { name: /Check Eligibility/i }).first();
    if (await cta.isVisible()) {
        await cta.click();
        await expect(page).toHaveURL(/.*estimator/);
    }
});
