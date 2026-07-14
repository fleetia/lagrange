import { expect, test, type Page } from '@playwright/test';

type StoryPlayCase = {
  assertComplete: (page: Page) => Promise<void>;
  id: string;
  name: string;
};

const STORY_PLAY_CASES: readonly StoryPlayCase[] = [
  {
    id: 'components-breadcrumb--accessibility',
    name: 'Breadcrumb keyboard navigation',
    assertComplete: async (page) => {
      await expect(page.getByRole('button', { name: 'Lagrange' })).toBeFocused();
    },
  },
  {
    id: 'components-dialog--accessibility',
    name: 'Dialog focus restoration',
    assertComplete: async (page) => {
      await expect(
        page.getByRole('dialog', { name: 'Keyboard settings' }),
      ).toBeVisible();
    },
  },
  {
    id: 'components-tabs--accessibility',
    name: 'Tabs roving focus',
    assertComplete: async (page) => {
      await expect(page.getByRole('tab', { name: 'General' })).toBeFocused();
    },
  },
  {
    id: 'components-contextmenu--accessibility',
    name: 'ContextMenu keyboard selection',
    assertComplete: async (page) => {
      await expect(page.getByRole('button', { name: '북마크 메뉴 열기' })).toBeFocused();
      await expect(page.getByRole('status')).toHaveText('선택: 아이콘 초기화');
    },
  },
  {
    id: 'components-rangefield--accessibility',
    name: 'RangeField keyboard adjustment',
    assertComplete: async (page) => {
      const slider = page.getByRole('slider', { name: 'Keyboard scale' });
      await expect(slider).toBeFocused();
      await expect(slider).toHaveAttribute('aria-describedby');
    },
  },
  {
    id: 'components-colorfield--accessibility',
    name: 'ColorField keyboard commit',
    assertComplete: async (page) => {
      await expect(page.getByRole('textbox', { name: '오버레이 색' })).toHaveValue('#ff634780');
    },
  },
  {
    id: 'components-placementpicker--accessibility',
    name: 'PlacementPicker spatial navigation',
    assertComplete: async (page) => {
      const placement = page.getByRole('radio', { name: 'center-center' });
      await expect(placement).toBeFocused();
      await expect(placement).toBeChecked();
    },
  },
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

test('resolves nested legacy and component theme overrides at the use site', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=components-themeroot--nested-compatibility&viewMode=story',
  );

  const buttonBackground = async (name: string): Promise<string> =>
    page.getByRole('button', { name }).evaluate(
      (button) => getComputedStyle(button).backgroundColor,
    );
  const defaultBackground = await buttonBackground('Default reference');

  expect(defaultBackground).toBe('rgb(77, 45, 87)');
  expect(await buttonBackground('Legacy accent override')).toBe(
    'rgb(194, 65, 45)',
  );
  expect(await buttonBackground('Outer component override')).toBe(
    'rgb(23, 58, 94)',
  );
  expect(await buttonBackground('Nested default reset')).toBe(
    defaultBackground,
  );
});
