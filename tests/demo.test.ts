import { expect } from '@playwright/test';
import { describe, it } from './fixture/playwright.fixture';

describe('Demo Test', () => {
  it('should have a title', async ({ page }) => {
    await page.goto('/');
    const title = page.getByText('React Toast Lab');
    await expect(title).toBeVisible();
  });
});
