import { expect, test } from '@playwright/test';

test('completes the Quick Entry story play interaction', async ({ page }) => {
  await page.goto('/iframe.html?id=compositions-quick-entry--household-expense&viewMode=story');

  await expect(page.getByTestId('save-status')).toHaveText(
    '버스 정기권 · ₩ 12,500 저장됨',
  );
});
