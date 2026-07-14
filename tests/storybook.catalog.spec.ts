import { expect, test } from '@playwright/test';

type StorybookEntry = {
  name: string;
  title: string;
  type: string;
};

type StorybookIndex = {
  entries: Record<string, StorybookEntry>;
};

const REQUIRED_COMPONENT_STORIES = [
  'Accessibility',
  'Default',
  'States',
  'Variants',
] as const;

test('each component family exposes the standard story catalog', async ({
  request,
}) => {
  const response = await request.get('/index.json');
  expect(response.ok()).toBe(true);

  const index = (await response.json()) as StorybookIndex;
  const componentStories = Object.values(index.entries).filter(
    ({ title, type }) => type === 'story' && title.startsWith('Components/'),
  );
  const storiesByTitle = new Map<string, Set<string>>();

  for (const { name, title } of componentStories) {
    const names = storiesByTitle.get(title) ?? new Set<string>();
    names.add(name);
    storiesByTitle.set(title, names);
  }

  for (const [title, names] of storiesByTitle) {
    expect(
      [...names],
      `${title} must expose Default, Variants, States and Accessibility`,
    ).toEqual(expect.arrayContaining([...REQUIRED_COMPONENT_STORIES]));
  }
});

test('each story family exposes one generated Docs entry', async ({
  request,
}) => {
  const response = await request.get('/index.json');
  expect(response.ok()).toBe(true);

  const index = (await response.json()) as StorybookIndex;
  const entries = Object.values(index.entries);
  const storyTitles = [...new Set(
    entries
      .filter(({ type }) => type === 'story')
      .map(({ title }) => title),
  )];
  const docsByTitle = new Map<string, StorybookEntry[]>();

  for (const entry of entries.filter(({ type }) => type === 'docs')) {
    const docsEntries = docsByTitle.get(entry.title) ?? [];
    docsEntries.push(entry);
    docsByTitle.set(entry.title, docsEntries);
  }

  for (const title of storyTitles) {
    const docsEntries = docsByTitle.get(title) ?? [];

    expect(docsEntries, `${title} must expose one generated Docs entry`).toHaveLength(1);
    expect(docsEntries[0]?.name).toBe('Docs');
  }
});

test('RadialBreakdownChart Docs explains usage and API', async ({
  page,
  request,
}) => {
  const response = await request.get('/index.json');
  expect(response.ok()).toBe(true);

  const index = (await response.json()) as StorybookIndex;
  const docsEntry = Object.entries(index.entries).find(
    ([, { title, type }]) =>
      type === 'docs' && title === 'Components/RadialBreakdownChart',
  );

  expect(docsEntry).toBeDefined();

  const docsId = docsEntry?.[0];

  if (!docsId) {
    throw new Error('RadialBreakdownChart Docs entry is missing.');
  }

  await page.goto(`/iframe.html?id=${docsId}&viewMode=docs`);

  const docs = page.locator('#storybook-docs');

  await expect(docs).toBeVisible();
  await expect(docs.locator('.sbdocs-title')).toHaveText('RadialBreakdownChart');
  await expect(
    docs.getByText(/RadialBreakdownChart는 하나 또는 여러 proportional dataset/),
  ).toBeVisible();
  await expect(docs.getByText('centerContent', { exact: true })).toBeVisible();
  await expect(docs.getByText(/Desktop에서는 5–8개 항목/)).toBeVisible();
});
