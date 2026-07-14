import type { Key, ReactElement } from 'react';
import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Stack } from '../Layout/Layout';
import { Text } from '../Typography/Typography';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { DataGrid } from './DataGrid';
import type { DataGridCellCommit, DataGridColumn, DataGridSort } from './types';

type LedgerRow = {
  amount: string;
  category: string;
  id: string;
  memo: string;
};

const INITIAL_ROWS: readonly LedgerRow[] = [
  { amount: '6,500', category: '식비 › 카페', id: '1', memo: '카페라떼' },
  { amount: '12,000', category: '식비 › 외식', id: '2', memo: '점심 식사' },
  {
    amount: '1,200',
    category: '교통비 › 대중교통',
    id: '3',
    memo: '버스 환승',
  },
] as const;

const COLUMNS: readonly DataGridColumn<LedgerRow>[] = [
  {
    header: '카테고리',
    id: 'category',
    renderCell: (row) => <Text truncate>{row.category}</Text>,
    sortable: true,
    width: 180,
  },
  {
    getEditValue: (row) => row.memo,
    getEditorLabel: (_row, rowIndex) => `내용 ${rowIndex + 1}`,
    header: '내용',
    id: 'memo',
    renderCell: (row) => <Text truncate>{row.memo}</Text>,
  },
  {
    align: 'end',
    getEditValue: (row) => row.amount,
    getEditorLabel: (_row, rowIndex) => `금액 ${rowIndex + 1}`,
    header: '금액',
    id: 'amount',
    renderCell: (row) => <Text variant="data">₩ {row.amount}</Text>,
    sortable: true,
    width: 120,
  },
];

const READ_ONLY_COLUMNS: readonly DataGridColumn<LedgerRow>[] = COLUMNS.map(
  ({ align, header, id, renderCell, sortable, width }) => ({
    align,
    header,
    id,
    renderCell,
    sortable,
    width,
  }),
);

function updateRows(
  rows: readonly LedgerRow[],
  change: DataGridCellCommit<LedgerRow>,
): readonly LedgerRow[] {
  return rows.map((row, rowIndex) =>
    rowIndex === change.rowIndex
      ? { ...row, [change.columnId]: change.value }
      : row,
  );
}

function DataGridExample(): ReactElement {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [selectedKeys, setSelectedKeys] = useState<ReadonlySet<Key>>(new Set());
  const [sort, setSort] = useState<DataGridSort>({
    columnId: 'category',
    direction: 'ascending',
  });
  const totals = useMemo(
    () => [
      <Text key="label" weight="strong">
        합계
      </Text>,
      null,
      <Text key="amount" variant="data" weight="strong">
        ₩ 19,700
      </Text>,
    ],
    [],
  );

  function handleCellCommit(change: DataGridCellCommit<LedgerRow>): void {
    setRows((currentRows) => updateRows(currentRows, change));
  }

  function handleSelectionChange(
    rowKey: Key,
    _row: LedgerRow,
    isSelected: boolean,
  ): void {
    setSelectedKeys((currentKeys) => {
      const nextKeys = new Set(currentKeys);

      if (isSelected) {
        nextKeys.add(rowKey);
      } else {
        nextKeys.delete(rowKey);
      }

      return nextKeys;
    });
  }

  return (
    <ThemeRoot style={{ minHeight: 360, padding: 32 }}>
      <DataGrid
        aria-label="편집 가능한 거래 내역"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        onCellCommit={handleCellCommit}
        onRowSelectionChange={handleSelectionChange}
        onSortChange={setSort}
        rows={rows}
        selectedRowKeys={selectedKeys}
        selectionMode="multiple"
        sort={sort}
        totals={totals}
      />
    </ThemeRoot>
  );
}

const meta = {
  title: 'Components/DataGrid',
  parameters: {
    controls: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: DataGridExample,
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ThemeRoot style={{ minHeight: 640, padding: 32 }}>
      <Stack gap="xl">
        <Stack gap="sm">
          <Text as="p" variant="label" weight="strong">
            조회 전용
          </Text>
          <DataGrid
            aria-label="조회 전용 거래 내역"
            columns={READ_ONLY_COLUMNS}
            getRowKey={(row) => row.id}
            rows={INITIAL_ROWS}
          />
        </Stack>
        <Stack gap="sm">
          <Text as="p" variant="label" weight="strong">
            단일 선택
          </Text>
          <DataGrid
            aria-label="단일 선택 거래 내역"
            columns={READ_ONLY_COLUMNS}
            getRowKey={(row) => row.id}
            rows={INITIAL_ROWS}
            selectedRowKeys={new Set<Key>(['2'])}
            selectionMode="single"
          />
        </Stack>
      </Stack>
    </ThemeRoot>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <ThemeRoot style={{ minHeight: 580, padding: 32 }}>
      <Stack gap="xl">
        <Stack gap="sm">
          <Text as="p" variant="label" weight="strong">
            행 상태
          </Text>
          <DataGrid
            aria-label="상태별 거래 내역"
            columns={READ_ONLY_COLUMNS}
            getRowKey={(row) => row.id}
            getRowTone={(row) => {
              if (row.id === '2') {
                return 'muted';
              }

              return row.id === '3' ? 'critical' : 'default';
            }}
            rows={INITIAL_ROWS}
          />
        </Stack>
        <Stack gap="sm">
          <Text as="p" variant="label" weight="strong">
            빈 상태
          </Text>
          <DataGrid
            aria-label="빈 거래 내역"
            columns={READ_ONLY_COLUMNS}
            emptyState="아직 등록된 거래가 없습니다."
            getRowKey={(row) => row.id}
            rows={[]}
          />
        </Stack>
      </Stack>
    </ThemeRoot>
  ),
};

function AccessibleDataGridExample(): ReactElement {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [selectedKeys, setSelectedKeys] = useState<ReadonlySet<Key>>(new Set());

  function handleCellCommit(change: DataGridCellCommit<LedgerRow>): void {
    setRows((currentRows) => updateRows(currentRows, change));
  }

  function handleSelectionChange(rowKey: Key, isSelected: boolean): void {
    setSelectedKeys((currentKeys) => {
      const nextKeys = new Set(currentKeys);

      if (isSelected) {
        nextKeys.add(rowKey);
      } else {
        nextKeys.delete(rowKey);
      }

      return nextKeys;
    });
  }

  return (
    <ThemeRoot style={{ minHeight: 360, padding: 32 }}>
      <DataGrid
        aria-label="키보드 거래 내역"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        onCellCommit={handleCellCommit}
        onRowSelectionChange={(rowKey, _row, isSelected) =>
          handleSelectionChange(rowKey, isSelected)
        }
        rows={rows}
        selectedRowKeys={selectedKeys}
        selectionMode="multiple"
      />
    </ThemeRoot>
  );
}

export const Accessibility: Story = {
  render: AccessibleDataGridExample,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const grid = canvas.getByRole('grid', { name: '키보드 거래 내역' });
    const categoryCell = canvas.getByRole('gridcell', {
      name: '식비 › 카페',
    });

    await expect(grid).toHaveAttribute('aria-multiselectable', 'true');
    await userEvent.tab();
    await expect(categoryCell).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}{Enter}');

    const editor = canvas.getByRole('textbox', { name: '내용 1' });
    await expect(editor).toHaveFocus();
    await userEvent.clear(editor);
    await userEvent.type(editor, '저녁 식사');
    await userEvent.keyboard('{Enter}');

    const committedCell = canvas.getByRole('gridcell', { name: '저녁 식사' });
    await expect(committedCell).toHaveFocus();
    await userEvent.keyboard('[Space]');
    await expect(committedCell.closest('tr')).toHaveAttribute(
      'aria-selected',
      'true',
    );
  },
};

export const KeyboardEditing: Story = {
  render: DataGridExample,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const cell = canvas.getByRole('gridcell', { name: '카페라떼' });
    await userEvent.click(cell);
    await userEvent.keyboard('{Enter}');
    const editor = canvas.getByRole('textbox', { name: '내용 1' });
    await userEvent.clear(editor);
    await userEvent.type(editor, '아침 커피');
    await userEvent.keyboard('{Enter}');
    await expect(
      canvas.getByRole('gridcell', { name: '아침 커피' }),
    ).toBeVisible();
  },
};
