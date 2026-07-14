import { expect, test, type ViewportSize } from '@playwright/test';

type ViewportName = 'desktop' | 'mobile';

type StoryVisualCase = {
  id: string;
  name: string;
  snapshot: string;
  viewport: ViewportName;
};

const VIEWPORTS: Record<ViewportName, ViewportSize> = {
  desktop: { height: 900, width: 1440 },
  mobile: { height: 844, width: 390 },
};

const DESKTOP_CASES: readonly Omit<StoryVisualCase, 'viewport'>[] = [
  {
    id: 'components-button--default',
    name: 'Button default',
    snapshot: 'button-default-desktop.png',
  },
  {
    id: 'components-button--variants',
    name: 'Button variants',
    snapshot: 'button-variants-desktop.png',
  },
  {
    id: 'components-button--states',
    name: 'Button states',
    snapshot: 'button-states-desktop.png',
  },
  {
    id: 'components-icon--default',
    name: 'Icon default',
    snapshot: 'icon-default-desktop.png',
  },
  {
    id: 'components-icon--variants',
    name: 'Icon variants',
    snapshot: 'icon-variants-desktop.png',
  },
  {
    id: 'components-icon--states',
    name: 'Icon states',
    snapshot: 'icon-states-desktop.png',
  },
  {
    id: 'components-iconbutton--default',
    name: 'IconButton default',
    snapshot: 'icon-button-default-desktop.png',
  },
  {
    id: 'components-iconbutton--variants',
    name: 'IconButton variants',
    snapshot: 'icon-button-variants-desktop.png',
  },
  {
    id: 'components-iconbutton--states',
    name: 'IconButton states',
    snapshot: 'icon-button-states-desktop.png',
  },
  {
    id: 'components-numberfield--default',
    name: 'NumberField default',
    snapshot: 'number-field-default-desktop.png',
  },
  {
    id: 'components-numberfield--variants',
    name: 'NumberField variants',
    snapshot: 'number-field-variants-desktop.png',
  },
  {
    id: 'components-numberfield--states',
    name: 'NumberField states',
    snapshot: 'number-field-states-desktop.png',
  },
  {
    id: 'components-textarea--default',
    name: 'TextArea default',
    snapshot: 'text-area-default-desktop.png',
  },
  {
    id: 'components-textarea--variants',
    name: 'TextArea variants',
    snapshot: 'text-area-variants-desktop.png',
  },
  {
    id: 'components-textarea--states',
    name: 'TextArea states',
    snapshot: 'text-area-states-desktop.png',
  },
  {
    id: 'components-checkbox--default',
    name: 'Checkbox default',
    snapshot: 'checkbox-default-desktop.png',
  },
  {
    id: 'components-checkbox--variants',
    name: 'Checkbox variants',
    snapshot: 'checkbox-variants-desktop.png',
  },
  {
    id: 'components-checkbox--states',
    name: 'Checkbox states',
    snapshot: 'checkbox-states-desktop.png',
  },
  {
    id: 'components-radiogroup--default',
    name: 'RadioGroup default',
    snapshot: 'radio-group-default-desktop.png',
  },
  {
    id: 'components-radiogroup--variants',
    name: 'RadioGroup variants',
    snapshot: 'radio-group-variants-desktop.png',
  },
  {
    id: 'components-radiogroup--states',
    name: 'RadioGroup states',
    snapshot: 'radio-group-states-desktop.png',
  },
  {
    id: 'components-switch--default',
    name: 'Switch default',
    snapshot: 'switch-default-desktop.png',
  },
  {
    id: 'components-switch--variants',
    name: 'Switch variants',
    snapshot: 'switch-variants-desktop.png',
  },
  {
    id: 'components-switch--states',
    name: 'Switch states',
    snapshot: 'switch-states-desktop.png',
  },
  {
    id: 'components-choicegroup--default',
    name: 'ChoiceGroup default',
    snapshot: 'choice-group-default-desktop.png',
  },
  {
    id: 'components-choicegroup--variants',
    name: 'ChoiceGroup variants',
    snapshot: 'choice-group-variants-desktop.png',
  },
  {
    id: 'components-choicegroup--states',
    name: 'ChoiceGroup states',
    snapshot: 'choice-group-states-desktop.png',
  },
  {
    id: 'components-datefield--default',
    name: 'DateField default',
    snapshot: 'date-field-default-desktop.png',
  },
  {
    id: 'components-datefield--variants',
    name: 'DateField variants',
    snapshot: 'date-field-variants-desktop.png',
  },
  {
    id: 'components-datefield--states',
    name: 'DateField states',
    snapshot: 'date-field-states-desktop.png',
  },
  {
    id: 'components-fieldgroup--default',
    name: 'FieldGroup default',
    snapshot: 'field-group-default-desktop.png',
  },
  {
    id: 'components-fieldgroup--variants',
    name: 'FieldGroup variants',
    snapshot: 'field-group-variants-desktop.png',
  },
  {
    id: 'components-fieldgroup--states',
    name: 'FieldGroup states',
    snapshot: 'field-group-states-desktop.png',
  },
  {
    id: 'components-combobox--default',
    name: 'Combobox default',
    snapshot: 'combobox-default-desktop.png',
  },
  {
    id: 'components-combobox--states',
    name: 'Combobox states',
    snapshot: 'combobox-states-desktop.png',
  },
  {
    id: 'components-inlineedit--default',
    name: 'InlineEdit default',
    snapshot: 'inline-edit-default-desktop.png',
  },
  {
    id: 'components-inlineedit--variants',
    name: 'InlineEdit variants',
    snapshot: 'inline-edit-variants-desktop.png',
  },
  {
    id: 'components-inlineedit--states',
    name: 'InlineEdit states',
    snapshot: 'inline-edit-states-desktop.png',
  },
  {
    id: 'components-savestatus--default',
    name: 'SaveStatus default',
    snapshot: 'save-status-default-desktop.png',
  },
  {
    id: 'components-savestatus--states',
    name: 'SaveStatus states',
    snapshot: 'save-status-states-desktop.png',
  },
  {
    id: 'components-datagrid--default',
    name: 'DataGrid default',
    snapshot: 'data-grid-default-desktop.png',
  },
  {
    id: 'components-section--default',
    name: 'Section default',
    snapshot: 'section-default-desktop.png',
  },
  {
    id: 'components-section--variants',
    name: 'Section variants',
    snapshot: 'section-variants-desktop.png',
  },
  {
    id: 'components-section--states',
    name: 'Section states',
    snapshot: 'section-states-desktop.png',
  },
  {
    id: 'components-sectionheader--default',
    name: 'SectionHeader default',
    snapshot: 'section-header-default-desktop.png',
  },
  {
    id: 'components-sectionheader--variants',
    name: 'SectionHeader variants',
    snapshot: 'section-header-variants-desktop.png',
  },
  {
    id: 'components-sectionheader--states',
    name: 'SectionHeader states',
    snapshot: 'section-header-states-desktop.png',
  },
  {
    id: 'components-toolbar--default',
    name: 'Toolbar default',
    snapshot: 'toolbar-default-desktop.png',
  },
  {
    id: 'components-toolbar--variants',
    name: 'Toolbar variants',
    snapshot: 'toolbar-variants-desktop.png',
  },
  {
    id: 'components-toolbar--states',
    name: 'Toolbar states',
    snapshot: 'toolbar-states-desktop.png',
  },
  {
    id: 'components-metric--default',
    name: 'Metric default',
    snapshot: 'metric-default-desktop.png',
  },
  {
    id: 'components-metric--variants',
    name: 'Metric variants',
    snapshot: 'metric-variants-desktop.png',
  },
  {
    id: 'components-metric--states',
    name: 'Metric states',
    snapshot: 'metric-states-desktop.png',
  },
  {
    id: 'components-statusmarker--default',
    name: 'StatusMarker default',
    snapshot: 'status-marker-default-desktop.png',
  },
  {
    id: 'components-statusmarker--variants',
    name: 'StatusMarker variants',
    snapshot: 'status-marker-variants-desktop.png',
  },
  {
    id: 'components-statusmarker--states',
    name: 'StatusMarker states',
    snapshot: 'status-marker-states-desktop.png',
  },
  {
    id: 'components-radialbreakdownchart--default',
    name: 'RadialBreakdownChart default',
    snapshot: 'radial-breakdown-chart-default-desktop.png',
  },
  {
    id: 'components-radialbreakdownchart--eight-categories',
    name: 'RadialBreakdownChart eight categories',
    snapshot: 'radial-breakdown-chart-eight-categories-desktop.png',
  },
  {
    id: 'components-radialbreakdownchart--variants',
    name: 'RadialBreakdownChart variants',
    snapshot: 'radial-breakdown-chart-variants-desktop.png',
  },
  {
    id: 'components-radialbreakdownchart--states',
    name: 'RadialBreakdownChart states',
    snapshot: 'radial-breakdown-chart-states-desktop.png',
  },
  {
    id: 'components-action--default',
    name: 'Action default',
    snapshot: 'action-default-desktop.png',
  },
  {
    id: 'components-action--variants',
    name: 'Action variants',
    snapshot: 'action-variants-desktop.png',
  },
  {
    id: 'components-action--states',
    name: 'Action states',
    snapshot: 'action-states-desktop.png',
  },
  {
    id: 'components-combobox--variants',
    name: 'Combobox variants',
    snapshot: 'combobox-variants-desktop.png',
  },
  {
    id: 'components-datagrid--variants',
    name: 'DataGrid variants',
    snapshot: 'data-grid-variants-desktop.png',
  },
  {
    id: 'components-datagrid--states',
    name: 'DataGrid states',
    snapshot: 'data-grid-states-desktop.png',
  },
  {
    id: 'components-datatable--default',
    name: 'DataTable default',
    snapshot: 'data-table-default-desktop.png',
  },
  {
    id: 'components-datatable--variants',
    name: 'DataTable variants',
    snapshot: 'data-table-variants-desktop.png',
  },
  {
    id: 'components-datatable--states',
    name: 'DataTable states',
    snapshot: 'data-table-states-desktop.png',
  },
  {
    id: 'components-form-controls--default',
    name: 'Form Controls default',
    snapshot: 'form-controls-default-desktop.png',
  },
  {
    id: 'components-form-controls--variants',
    name: 'Form Controls variants',
    snapshot: 'form-controls-variants-desktop.png',
  },
  {
    id: 'components-form-controls--states',
    name: 'Form Controls states',
    snapshot: 'form-controls-states-desktop.png',
  },
  {
    id: 'components-layout--default',
    name: 'Layout default',
    snapshot: 'layout-default-desktop.png',
  },
  {
    id: 'components-layout--variants',
    name: 'Layout variants',
    snapshot: 'layout-variants-desktop.png',
  },
  {
    id: 'components-layout--states',
    name: 'Layout states',
    snapshot: 'layout-states-desktop.png',
  },
  {
    id: 'components-rule--default',
    name: 'Rule default',
    snapshot: 'rule-default-desktop.png',
  },
  {
    id: 'components-rule--variants',
    name: 'Rule variants',
    snapshot: 'rule-variants-desktop.png',
  },
  {
    id: 'components-rule--states',
    name: 'Rule states',
    snapshot: 'rule-states-desktop.png',
  },
  {
    id: 'components-savestatus--variants',
    name: 'SaveStatus variants',
    snapshot: 'save-status-variants-desktop.png',
  },
  {
    id: 'components-themeroot--default',
    name: 'ThemeRoot default',
    snapshot: 'theme-root-default-desktop.png',
  },
  {
    id: 'components-themeroot--variants',
    name: 'ThemeRoot variants',
    snapshot: 'theme-root-variants-desktop.png',
  },
  {
    id: 'components-themeroot--theming',
    name: 'ThemeRoot theming',
    snapshot: 'theme-root-theming-desktop.png',
  },
  {
    id: 'components-themeroot--states',
    name: 'ThemeRoot states',
    snapshot: 'theme-root-states-desktop.png',
  },
  {
    id: 'components-typography--default',
    name: 'Typography default',
    snapshot: 'typography-default-desktop.png',
  },
  {
    id: 'components-typography--variants',
    name: 'Typography variants',
    snapshot: 'typography-variants-desktop.png',
  },
  {
    id: 'components-typography--states',
    name: 'Typography states',
    snapshot: 'typography-states-desktop.png',
  },
  {
    id: 'compositions-recent-records--household-ledger',
    name: 'Recent Records composition',
    snapshot: 'recent-records.png',
  },
  ...[
    ['breadcrumb', 'Breadcrumb'],
    ['dialog', 'Dialog'],
    ['tabs', 'Tabs'],
    ['contextmenu', 'ContextMenu'],
    ['rangefield', 'RangeField'],
    ['colorfield', 'ColorField'],
    ['placementpicker', 'PlacementPicker'],
  ].flatMap(([id, name]) =>
    ['default', 'variants', 'states'].map((story) => ({
      id: `components-${id}--${story}`,
      name: `${name} ${story}`,
      snapshot: `${id}-${story}-desktop.png`,
    })),
  ),
] as const;

const MOBILE_CASES: readonly Omit<StoryVisualCase, 'viewport'>[] = [
  {
    id: 'components-radialbreakdownchart--default',
    name: 'RadialBreakdownChart responsive frame',
    snapshot: 'radial-breakdown-chart-default-mobile.png',
  },
  {
    id: 'components-fieldgroup--default',
    name: 'FieldGroup responsive form',
    snapshot: 'field-group-default-mobile.png',
  },
  {
    id: 'components-datagrid--default',
    name: 'DataGrid responsive overflow',
    snapshot: 'data-grid-default-mobile.png',
  },
  {
    id: 'components-dialog--default',
    name: 'Dialog narrow viewport',
    snapshot: 'dialog-default-mobile.png',
  },
  {
    id: 'components-tabs--default',
    name: 'Tabs narrow viewport',
    snapshot: 'tabs-default-mobile.png',
  },
  {
    id: 'components-colorfield--default',
    name: 'ColorField narrow viewport',
    snapshot: 'colorfield-default-mobile.png',
  },
  {
    id: 'components-placementpicker--default',
    name: 'PlacementPicker narrow viewport',
    snapshot: 'placementpicker-default-mobile.png',
  },
] as const;

const STORY_CASES: readonly StoryVisualCase[] = [
  ...DESKTOP_CASES.map((storyCase) => ({
    ...storyCase,
    viewport: 'desktop' as const,
  })),
  ...MOBILE_CASES.map((storyCase) => ({
    ...storyCase,
    viewport: 'mobile' as const,
  })),
];

for (const storyCase of STORY_CASES) {
  test(`${storyCase.name} matches the ${storyCase.viewport} baseline`, async ({
    page,
  }) => {
    await page.setViewportSize(VIEWPORTS[storyCase.viewport]);
    await page.goto(`/iframe.html?id=${storyCase.id}&viewMode=story`);
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    const storyRoot = page.locator('#storybook-root');
    await expect(storyRoot).toBeVisible();
    await expect(storyRoot).toHaveScreenshot(storyCase.snapshot, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
      scale: 'css',
    });
  });
}
