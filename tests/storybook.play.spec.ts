import { expect, test, type Page } from '@playwright/test';

type StoryPlayCase = {
  assertComplete: (page: Page) => Promise<void>;
  id: string;
  name: string;
};

const STORY_PLAY_CASES: readonly StoryPlayCase[] = [
  {
    id: 'components-button--accessibility',
    name: 'Button keyboard activation',
    assertComplete: async (page) => {
      await expect(
        page.getByRole('button', { name: '키보드로 저장' }),
      ).toBeFocused();
    },
  },
  {
    id: 'components-iconbutton--accessibility',
    name: 'IconButton keyboard activation',
    assertComplete: async (page) => {
      await expect(
        page.getByRole('button', { name: '선택한 행 수정' }),
      ).toBeFocused();
    },
  },
  {
    id: 'components-numberfield--accessibility',
    name: 'NumberField formatted commit',
    assertComplete: async (page) => {
      await expect(page.getByRole('textbox', { name: '측정값' })).toHaveValue(
        '9,876.50',
      );
      await expect(page.getByText('raw: 9876.50')).toBeVisible();
    },
  },
  {
    id: 'components-checkbox--accessibility',
    name: 'Checkbox keyboard toggle',
    assertComplete: async (page) => {
      await expect(
        page.getByRole('checkbox', { name: '키보드로 선택' }),
      ).toBeChecked();
    },
  },
  {
    id: 'components-radiogroup--accessibility',
    name: 'RadioGroup arrow navigation',
    assertComplete: async (page) => {
      const selectedRadio = page.getByRole('radio', { name: '수입' });

      await expect(selectedRadio).toBeChecked();
      await expect(selectedRadio).toBeFocused();
    },
  },
  {
    id: 'components-switch--accessibility',
    name: 'Switch keyboard toggle',
    assertComplete: async (page) => {
      await expect(
        page.getByRole('switch', { name: '주말에도 알림' }),
      ).toBeChecked();
    },
  },
  {
    id: 'components-choicegroup--accessibility',
    name: 'ChoiceGroup arrow navigation',
    assertComplete: async (page) => {
      const selectedChoice = page.getByRole('radio', { name: '주' });

      await expect(selectedChoice).toBeChecked();
      await expect(selectedChoice).toBeFocused();
    },
  },
  {
    id: 'components-datefield--accessibility',
    name: 'DateField keyboard focus',
    assertComplete: async (page) => {
      const dateField = page.getByLabel('키보드 거래일*');

      await expect(dateField).toBeFocused();
      await expect(dateField).toHaveAttribute('type', 'date');
    },
  },
  {
    id: 'components-combobox--keyboard-selection',
    name: 'Combobox keyboard selection',
    assertComplete: async (page) => {
      await expect(page.getByTestId('selected-value')).toHaveText('transit');
    },
  },
  {
    id: 'components-inlineedit--keyboard-editing',
    name: 'InlineEdit keyboard commit',
    assertComplete: async (page) => {
      await expect(page.getByText('저녁 식사')).toBeVisible();
      await expect(
        page.getByRole('button', { name: '내용 수정' }),
      ).toBeVisible();
    },
  },
  {
    id: 'components-datagrid--keyboard-editing',
    name: 'DataGrid keyboard editing',
    assertComplete: async (page) => {
      await expect(
        page.getByRole('gridcell', { name: '아침 커피' }),
      ).toBeVisible();
    },
  },
  {
    id: 'compositions-quick-entry--household-expense',
    name: 'Quick Entry keyboard submission',
    assertComplete: async (page) => {
      await expect(page.getByTestId('save-status')).toHaveText(
        '버스 정기권 · ₩ 12,500 저장됨',
      );
    },
  },
] as const;

for (const storyCase of STORY_PLAY_CASES) {
  test(`completes the ${storyCase.name} story play interaction`, async ({
    page,
  }) => {
    await page.goto(`/iframe.html?id=${storyCase.id}&viewMode=story`);
    await storyCase.assertComplete(page);
  });
}

test('renders all eight radial breakdown categories with accessible data', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=components-radialbreakdownchart--eight-categories&viewMode=story',
  );

  const chart = page.getByRole('img', { name: '8개 자산 항목 구성' });
  const table = page.getByRole('table', { name: '8개 자산 항목 데이터' });

  await expect(chart).toBeVisible();
  await expect(page.locator('[data-segment-id]')).toHaveCount(8);
  await expect(page.locator('[data-label-side="left"]')).toHaveCount(4);
  await expect(page.locator('[data-label-side="right"]')).toHaveCount(4);
  await expect(table.getByRole('rowheader')).toHaveCount(8);
  await expect(table.getByRole('row')).toHaveCount(9);
});
