import {
  DataTable,
  FormField,
  Text,
  TextField,
  ThemeRoot,
  type DataTableColumn,
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

export const fixture = (
  <ThemeRoot>
    <Text>Lagrange React 18 consumer</Text>
    <FormField label="Memo">
      <TextField />
    </FormField>
    <DataTable
      columns={columns}
      getRowKey={(row) => row.id}
      rows={[{ id: 'row-1', memo: 'Verified' }]}
    />
  </ThemeRoot>
);
