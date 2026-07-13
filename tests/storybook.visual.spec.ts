import { expect, test } from '@playwright/test';

const STORY_SELECTOR = '[data-testid="recent-records-story"]';

test('renders the dense household ledger records without layout drift', async ({ page }) => {
  await page.goto('/iframe.html?id=compositions-recent-records--household-ledger&viewMode=story');
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const story = page.locator(STORY_SELECTOR);
  await expect(story).toBeVisible();
  await expect(story).toHaveScreenshot('recent-records.png', {
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixelRatio: 0.02,
    scale: 'css',
  });
});
