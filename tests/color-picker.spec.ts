import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('ColorPicker opens an accessible anchored panel and restores keyboard focus', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=components-colorpicker--default&viewMode=story',
  );
  const trigger = page.getByRole('button', { name: '승: #663399' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: '승 색상 선택' });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole('textbox', { name: 'CSS color' }),
  ).toBeFocused();
  expect(
    (await new AxeBuilder({ page }).include('dialog[open]').analyze())
      .violations,
  ).toEqual([]);
  await expect(dialog).toHaveScreenshot('color-picker-panel-desktop.png', {
    animations: 'disabled',
    scale: 'css',
  });
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('ColorPicker story completes keyboard hue interaction', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=components-colorpicker--accessibility&viewMode=story',
  );
  await expect(
    page.getByRole('button', { name: '승: #ff040080' }),
  ).toBeFocused();
});

test('ColorPicker preserves alpha on a coarse pointer and stays within a narrow viewport', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 360, height: 640 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(
    'http://127.0.0.1:6006/iframe.html?id=components-colorpicker--variants&viewMode=story',
  );
  await page.getByRole('button', { name: '오버레이: #66339980' }).click();
  const dialog = page.getByRole('dialog', { name: '오버레이 색상 선택' });
  await expect(dialog.getByRole('slider', { name: 'Hue' })).toBeHidden();
  await expect(dialog.getByRole('slider', { name: 'Alpha' })).toBeVisible();
  await dialog.getByLabel('오버레이 기본 색상 선택').fill('#ff0000');
  await expect(dialog.getByRole('textbox', { name: 'CSS color' })).toHaveValue(
    '#ff000080',
  );
  const bounds = await dialog.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(360);
  await expect(dialog).toHaveScreenshot('color-picker-panel-mobile.png', {
    animations: 'disabled',
    scale: 'css',
  });
  await context.close();
});
