import { expect, test } from '@playwright/test';

test('locks the background while keeping long dialog content scrollable', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=components-dialog--scrollable&viewMode=story',
  );
  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await expect(trigger).toBeVisible();
  await page.evaluate(() => {
    document.body.style.setProperty('overflow-y', 'auto', 'important');
  });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Long settings' });
  await expect(dialog).toBeVisible();
  const initialScroll = await page.evaluate(() => window.scrollY);

  await page.mouse.move(10, 10);
  await page.mouse.wheel(0, 500);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(initialScroll);

  const firstSetting = dialog.getByText('Setting 1: review this preference.');
  await firstSetting.hover();
  await page.mouse.wheel(0, 500);
  await expect
    .poll(() =>
      firstSetting.evaluate((element) => {
        let parent = element.parentElement;
        while (parent && parent.tagName !== 'DIALOG') {
          if (parent.scrollTop > 0) {
            return parent.scrollTop;
          }
          parent = parent.parentElement;
        }
        return 0;
      }),
    )
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(
    await page.evaluate(() => ({
      value: document.body.style.getPropertyValue('overflow-y'),
      priority: document.body.style.getPropertyPriority('overflow-y'),
    })),
  ).toEqual({ value: 'auto', priority: 'important' });

  await page.mouse.move(10, 10);
  await page.mouse.wheel(0, 500);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(initialScroll);
});
