import {
  Button,
  Combobox,
  DataGrid,
  DataTable,
  FormField,
  NumberField,
  RadialBreakdownChart,
  Text,
  TextField,
  ThemeRoot,
  type DataGridColumn,
  type DataTableColumn,
  type RadialBreakdownSegment,
} from '@fleetia/lagrange';
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

export const fixture = (
  <ThemeRoot>
    <Text>Lagrange React 18 consumer</Text>
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
