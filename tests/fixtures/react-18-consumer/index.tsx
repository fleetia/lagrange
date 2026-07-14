import {
  Breadcrumb,
  Button,
  ColorField,
  Combobox,
  ContextMenu,
  ContextMenuItem,
  DataGrid,
  DataTable,
  Dialog,
  FormField,
  NumberField,
  PlacementPicker,
  RadialBreakdownChart,
  RangeField,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  TextField,
  ThemeRoot,
  type DataGridColumn,
  type DataTableColumn,
  type RadialBreakdownSegment,
} from '@fleetia/lagrange';
import {
  componentVars,
  componentTokens,
  createSelectIndicatorTexture,
  createThemeTokens,
  lagrangeThemeClass,
  primitiveTokens,
  semanticVars,
  semanticTokens,
  themeVars,
  tokens,
} from '@fleetia/lagrange/theme';
import '@fleetia/lagrange/styles.css';

type Row = {
  id: string;
  memo: string;
};

const columns: readonly DataTableColumn<Row>[] = [
  {
    header: 'Memo',
    id: 'memo',
    renderCell: (row) => row.memo,
  },
];

const gridColumns: readonly DataGridColumn<Row>[] = [
  {
    getEditValue: (row) => row.memo,
    header: 'Memo',
    id: 'memo',
    renderCell: (row) => row.memo,
  },
];

const segments: readonly RadialBreakdownSegment[] = [
  { color: '#7f83ba', id: 'cash', label: 'Cash', value: 60 },
  { color: '#62663b', id: 'investments', label: 'Investments', value: 40 },
];

const fixtureTheme = createThemeTokens({
  semantic: {
    color: {
      content: { accent: primitiveTokens.palette.aubergine },
    },
  },
});

const themeContractProbe = [
  tokens.color.paper,
  semanticTokens.color.surface.canvas,
  componentTokens.button.primaryBackground,
  componentVars.button.primaryBackground,
  semanticVars.color.interaction.primary,
  themeVars.semantic.color.content.accent,
  createSelectIndicatorTexture('#4d2d57'),
].join('|');

export const fixture = (
  <ThemeRoot
    data-theme-accent={fixtureTheme.semantic.color.content.accent}
    data-theme-contract={themeContractProbe}
    themeClassName={lagrangeThemeClass}
  >
    <Text>Lagrange React 18 consumer</Text>
    <Breadcrumb
      items={[
        { href: '/', label: 'Home' },
        { label: 'Current' },
      ]}
    />
    <FormField label="Memo">
      <TextField />
    </FormField>
    <FormField label="Amount">
      <NumberField defaultValue="6500" />
    </FormField>
    <Combobox
      aria-label="Category"
      options={[{ label: 'Food', value: 'food' }]}
    />
    <FormField label="Opacity">
      <RangeField defaultValue={50} />
    </FormField>
    <FormField label="Accent">
      <ColorField defaultValue="#4d2d57" />
    </FormField>
    <PlacementPicker label="Placement" />
    <Tabs defaultValue="general">
      <TabList aria-label="Settings">
        <Tab value="general">General</Tab>
        <Tab value="appearance">Appearance</Tab>
      </TabList>
      <TabPanel value="general">General settings</TabPanel>
      <TabPanel value="appearance">Appearance settings</TabPanel>
    </Tabs>
    <Dialog
      isOpen={false}
      onOpenChange={() => undefined}
      title="Settings"
    >
      Dialog content
    </Dialog>
    <ContextMenu
      anchorPoint={{ x: 0, y: 0 }}
      isOpen={false}
      label="Actions"
      onOpenChange={() => undefined}
    >
      <ContextMenuItem>Open</ContextMenuItem>
    </ContextMenu>
    <Button>Save</Button>
    <DataTable
      columns={columns}
      getRowKey={(row) => row.id}
      rows={[{ id: 'row-1', memo: 'Verified' }]}
    />
    <DataGrid
      aria-label="Editable records"
      columns={gridColumns}
      getRowKey={(row) => row.id}
      rows={[{ id: 'row-1', memo: 'Verified' }]}
    />
    <RadialBreakdownChart segments={segments} title="Assets" />
  </ThemeRoot>
);
