import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

type StoryA11yCase = {
  id: string;
  name: string;
};

const STORY_CASES: readonly StoryA11yCase[] = [
  { id: 'components-action--accessibility', name: 'Action accessibility' },
  {
    id: 'components-breadcrumb--accessibility',
    name: 'Breadcrumb accessibility',
  },
  { id: 'components-button--accessibility', name: 'Button accessibility' },
  { id: 'components-checkbox--accessibility', name: 'Checkbox accessibility' },
  {
    id: 'components-choicegroup--accessibility',
    name: 'ChoiceGroup accessibility',
  },
  { id: 'components-combobox--accessibility', name: 'Combobox accessibility' },
  {
    id: 'components-colorfield--accessibility',
    name: 'ColorField accessibility',
  },
  {
    id: 'components-contextmenu--accessibility',
    name: 'ContextMenu accessibility',
  },
  { id: 'components-datagrid--accessibility', name: 'DataGrid accessibility' },
  { id: 'components-datatable--accessibility', name: 'DataTable accessibility' },
  { id: 'components-datefield--accessibility', name: 'DateField accessibility' },
  { id: 'components-dialog--accessibility', name: 'Dialog accessibility' },
  {
    id: 'components-fieldgroup--accessibility',
    name: 'FieldGroup accessibility',
  },
  {
    id: 'components-form-controls--accessibility',
    name: 'Form Controls accessibility',
  },
  { id: 'components-icon--accessibility', name: 'Icon accessibility' },
  {
    id: 'components-iconbutton--accessibility',
    name: 'IconButton accessibility',
  },
  {
    id: 'components-inlineedit--accessibility',
    name: 'InlineEdit accessibility',
  },
  { id: 'components-layout--accessibility', name: 'Layout accessibility' },
  { id: 'components-metric--accessibility', name: 'Metric accessibility' },
  {
    id: 'components-numberfield--accessibility',
    name: 'NumberField accessibility',
  },
  {
    id: 'components-placementpicker--accessibility',
    name: 'PlacementPicker accessibility',
  },
  {
    id: 'components-radialbreakdownchart--accessibility',
    name: 'RadialBreakdownChart accessibility',
  },
  {
    id: 'components-radialbreakdownchart--eight-categories',
    name: 'RadialBreakdownChart eight categories',
  },
  {
    id: 'components-radiogroup--accessibility',
    name: 'RadioGroup accessibility',
  },
  {
    id: 'components-rangefield--accessibility',
    name: 'RangeField accessibility',
  },
  { id: 'components-rule--accessibility', name: 'Rule accessibility' },
  {
    id: 'components-savestatus--accessibility',
    name: 'SaveStatus accessibility',
  },
  { id: 'components-section--accessibility', name: 'Section accessibility' },
  {
    id: 'components-sectionheader--accessibility',
    name: 'SectionHeader accessibility',
  },
  { id: 'components-toolbar--accessibility', name: 'Toolbar accessibility' },
  {
    id: 'components-statusmarker--accessibility',
    name: 'StatusMarker accessibility',
  },
  { id: 'components-switch--accessibility', name: 'Switch accessibility' },
  { id: 'components-tabs--accessibility', name: 'Tabs accessibility' },
  { id: 'components-textarea--accessibility', name: 'TextArea accessibility' },
  {
    id: 'components-themeroot--accessibility',
    name: 'ThemeRoot accessibility',
  },
  {
    id: 'components-themeroot--theming',
    name: 'ThemeRoot theming',
  },
  {
    id: 'components-visuallyhidden--accessibility',
    name: 'VisuallyHidden accessibility',
  },
  {
    id: 'components-typography--accessibility',
    name: 'Typography accessibility',
  },
  {
    id: 'compositions-quick-entry--household-expense',
    name: 'Quick Entry composition',
  },
  {
    id: 'compositions-recent-records--household-ledger',
    name: 'Recent Records composition',
  },
] as const;

async function analyzeStory(page: Page): Promise<Awaited<ReturnType<AxeBuilder['analyze']>>> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await new AxeBuilder({ page }).include('#storybook-root').analyze();
    } catch (error) {
      const canRetry =
        error instanceof Error &&
        error.message.includes('Axe is already running') &&
        attempt < 2;

      if (!canRetry) {
        throw error;
      }

      await page.waitForTimeout(100);
    }
  }

  throw new Error('Axe analysis did not complete.');
}

for (const storyCase of STORY_CASES) {
  test(`${storyCase.name} has no detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(`/iframe.html?id=${storyCase.id}&viewMode=story`);
    await expect(page.locator('#storybook-root')).toBeVisible();

    const results = await analyzeStory(page);

    expect(results.violations).toEqual([]);
  });
}
