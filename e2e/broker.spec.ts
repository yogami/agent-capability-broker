import { test, expect } from '@playwright/test';

test.describe('Capability Broker', () => {
    test('renders dashboard', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('h1')).toContainText('Agent Capability Broker');
        await expect(page.getByRole('button', { name: /Find Agents/i })).toBeVisible();
    });

    test('can switch to register tab', async ({ page }) => {
        await page.goto('/');
        await page.click('text=Register Service');
        await expect(page.locator('h2')).toContainText('Register New Capability');
        await expect(page.getByPlaceholder('Service Name')).toBeVisible();
    });
});
