import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const STORY_CASES = [
  {
    id: 'compositions-quick-entry--household-expense',
    name: 'Quick Entry',
  },
  {
    id: 'compositions-recent-records--household-ledger',
    name: 'Recent Records',
  },
] as const;

for (const storyCase of STORY_CASES) {
  test(`${storyCase.name} has no detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=${storyCase.id}&viewMode=story`,
    );
    await expect(page.locator('#storybook-root')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
