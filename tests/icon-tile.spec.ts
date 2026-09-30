import { expect, test, type Locator, type Page } from '@playwright/test';

const LABEL_SELECTOR = '[data-lagrange-part="icon-tile-label"]';
const ICON_SELECTOR = '[data-lagrange-part="icon-tile-icon"]';

async function openStory(page: Page, name: string): Promise<void> {
  await page.goto(
    `/iframe.html?id=components-icontile--${name}&viewMode=story`,
  );
  await expect(page.locator('#storybook-root')).toBeVisible();
  await page.evaluate(async (): Promise<void> => {
    await document.fonts.ready;
  });
}

async function getScrollTop(label: Locator): Promise<number> {
  return label.evaluate((element) => element.scrollTop);
}

test('compact cards retain two caption lines and an 8px icon gap at both icon sizes', async ({
  page,
}) => {
  await openStory(page, 'variants');
  for (const size of [28, 32]) {
    const tile = page.getByTestId(`compact-${size}`);
    const label = tile.locator(LABEL_SELECTOR);
    const geometry = await tile.evaluate((element) => {
      const label = element.querySelector(
        '[data-lagrange-part="icon-tile-label"]',
      );
      const icon = element.querySelector(
        '[data-lagrange-part="icon-tile-icon"]',
      );
      if (!label || !icon) {
        throw new Error('IconTile slots are missing.');
      }
      const labelBounds = label.getBoundingClientRect();
      const iconBounds = icon.getBoundingClientRect();
      return {
        gap: labelBounds.top - iconBounds.bottom,
        iconHeight: iconBounds.height,
        labelHeight: labelBounds.height,
        lineHeight: Number.parseFloat(getComputedStyle(label).lineHeight),
        tileHeight: element.getBoundingClientRect().height,
      };
    });
    expect(geometry.tileHeight).toBe(80);
    expect(geometry.iconHeight).toBe(size);
    expect(geometry.gap).toBeCloseTo(8, 1);
    expect(geometry.labelHeight + 1).toBeGreaterThanOrEqual(
      2 * geometry.lineHeight,
    );
    await expect(label).toHaveCSS('white-space', 'normal');
    await expect(label).toHaveCSS('text-overflow', 'clip');
  }
  const tall = page.getByTestId('tall-normal');
  expect(
    await tall.evaluate((element) => element.getBoundingClientRect().height),
  ).toBe(300);
  const tallLabel = tall.locator(LABEL_SELECTOR);
  expect(
    await tallLabel.evaluate(
      (element) => element.scrollHeight - element.clientHeight,
    ),
  ).toBeLessThanOrEqual(1);
  await expect(
    page.getByTestId('horizontal').locator(LABEL_SELECTOR),
  ).toHaveCSS('white-space', 'nowrap');
});

test('a huge title scrolls inside a fixed card with the mouse without opening it or scrolling the page', async ({
  page,
}) => {
  await openStory(page, 'scrollable');
  const tile = page.getByTestId('scrollable-tile');
  const label = tile.locator(LABEL_SELECTOR);
  expect(
    await label.evaluate(
      (element) => element.scrollHeight - element.clientHeight,
    ),
  ).toBeGreaterThan(0);
  const initialWindowScroll = await page.evaluate(() => window.scrollY);
  await label.hover();
  await page.mouse.wheel(0, 400);
  await expect.poll(() => getScrollTop(label)).toBeGreaterThan(0);
  await expect(page.getByTestId('activations')).toHaveText('Opened 0 times');
  expect(await page.evaluate(() => window.scrollY)).toBe(initialWindowScroll);
  expect(
    await tile.evaluate((element) => element.getBoundingClientRect().height),
  ).toBe(300);
  await tile.focus();
  await page.keyboard.press('End');
  await label.hover();
  await page.mouse.wheel(0, 400);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(initialWindowScroll);
});

test('outer button focus controls label scrolling while Enter and Space retain native activation', async ({
  page,
}) => {
  await openStory(page, 'scrollable');
  const tile = page.getByTestId('scrollable-tile');
  const label = tile.locator(LABEL_SELECTOR);
  await tile.focus();
  await page.keyboard.press('ArrowDown');
  await expect.poll(() => getScrollTop(label)).toBeGreaterThan(0);
  await page.keyboard.press('ArrowUp');
  await expect.poll(() => getScrollTop(label)).toBe(0);
  await page.keyboard.press('PageDown');
  const pageDownPosition = await getScrollTop(label);
  expect(pageDownPosition).toBeGreaterThan(0);
  await page.keyboard.press('PageUp');
  await expect.poll(() => getScrollTop(label)).toBeLessThan(pageDownPosition);
  await page.keyboard.press('End');
  await expect
    .poll(() =>
      label.evaluate(
        (element) =>
          element.scrollHeight - element.clientHeight - element.scrollTop,
      ),
    )
    .toBeLessThanOrEqual(1);
  await page.keyboard.press('Home');
  await expect.poll(() => getScrollTop(label)).toBe(0);
  await expect(tile).toBeFocused();
  await expect(page.getByTestId('activations')).toHaveText('Opened 0 times');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(page.getByTestId('activations')).toHaveText('Opened 2 times');
  await expect(tile).toBeFocused();
  await expect(label).not.toHaveAttribute('tabindex');
});

test('consumer key prevention wins and disabled cards stay outside keyboard navigation', async ({
  page,
}) => {
  await openStory(page, 'consumer-keys');
  const tile = page.getByTestId('scrollable-tile');
  const label = tile.locator(LABEL_SELECTOR);
  await tile.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByTestId('handled-keys')).toHaveText('Handled 1 keys');
  expect(await getScrollTop(label)).toBe(0);
  await page.keyboard.press('End');
  await expect.poll(() => getScrollTop(label)).toBeGreaterThan(0);
  await openStory(page, 'states');
  const disabled = page.getByRole('button', { name: '사용할 수 없는 자료' });
  await expect(disabled).toBeDisabled();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: '자료 모아보기' }),
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('tall-overflow')).toBeFocused();
  await expect(disabled.locator(ICON_SELECTOR)).toBeVisible();
});
