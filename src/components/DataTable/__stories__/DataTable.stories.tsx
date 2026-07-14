import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Stack } from '../../Layout/Layout';
import { ThemeRoot } from '../../../theme/ThemeRoot';
import { tokens } from '../../../theme/tokens';
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
  type DataTableRowTone,
} from '../DataTable';

type LedgerRow = {
  amount: string;
  category: string;
  id: string;
  memo: string;
  tone: DataTableRowTone;
};

const COLUMNS: readonly DataTableColumn<LedgerRow>[] = [
  {
    id: 'category',
    header: '카테고리',
    width: 160,
    renderCell: (row) => row.category,
  },
  {
    id: 'memo',
    header: '내용',
    renderCell: (row) => row.memo,
  },
  {
    align: 'end',
    id: 'amount',
    header: '금액',
    width: 120,
    renderCell: (row) => row.amount,
  },
];

const ROWS: readonly LedgerRow[] = [
  {
    amount: '− ₩ 6,500',
    category: '식비 › 카페',
    id: 'default',
    memo: '카페라떼',
    tone: 'default',
  },
  {
    amount: '− ₩ 12,000',
    category: '식비 › 외식',
    id: 'selected',
    memo: '점심 식사',
    tone: 'selected',
  },
  {
    amount: '− ₩ 4,900',
    category: '구독 › 소프트웨어',
    id: 'muted',
    memo: '보관 처리된 구독',
    tone: 'muted',
  },
  {
    amount: '− ₩ 114,000',
    category: '주거비 › 관리비',
    id: 'critical',
    memo: '확인이 필요한 결제',
    tone: 'critical',
  },
];

function LedgerTable(props: DataTableProps<LedgerRow>): ReactElement {
  return <DataTable {...props} />;
}

const meta = {
  title: 'Components/DataTable',
  component: LedgerTable,
  args: {
    'aria-label': '거래 내역',
    columns: COLUMNS,
    getRowKey: (row: LedgerRow) => row.id,
    rows: ROWS.slice(0, 2),
  },
  parameters: {
    layout: 'padded',
    controls: {
      exclude: ['columns', 'getRowKey', 'getRowTone', 'rows', 'totals'],
    },
    docs: {
      description: {
        component:
          'DataTable은 compact row, semantic structural boundary, totals, empty state와 row tone을 제공하는 presentational table입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeRoot style={{ minHeight: '100vh', padding: tokens.space.xl }}>
        <Story />
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof LedgerTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <Stack gap="xl">
      <LedgerTable
        caption="최근 거래"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        rows={ROWS.slice(0, 2)}
      />
      <LedgerTable
        aria-label="합계를 포함한 거래 내역"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        rows={ROWS.slice(0, 2)}
        totals={['합계', '2건', '− ₩ 18,500']}
      />
    </Stack>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <Stack gap="xl">
      <LedgerTable
        aria-label="상태별 거래 내역"
        columns={COLUMNS}
        getRowKey={(row) => row.id}
        getRowTone={(row) => row.tone}
        rows={ROWS}
      />
      <LedgerTable
        aria-label="빈 거래 내역"
        columns={COLUMNS}
        emptyState="아직 기록이 없습니다."
        getRowKey={(row) => row.id}
        rows={[]}
      />
    </Stack>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <LedgerTable
      caption="접근 가능한 거래 내역"
      columns={COLUMNS}
      getRowKey={(row) => row.id}
      getRowTone={(row) => row.tone}
      rows={ROWS.slice(0, 2)}
      totals={['합계', '2건', '− ₩ 18,500']}
    />
  ),
  play: async ({ canvas }): Promise<void> => {
    const table = canvas.getByRole('table', {
      name: '접근 가능한 거래 내역',
    });
    const selectedRow = canvas.getByRole('row', { name: /점심 식사/ });

    await expect(table).toBeVisible();
    await expect(canvas.getAllByRole('columnheader')).toHaveLength(3);
    await expect(
      canvas.getByRole('columnheader', { name: '금액' }),
    ).toBeVisible();
    await expect(selectedRow).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByText('− ₩ 18,500')).toBeVisible();
  },
};

export const RowTones: Story = {
  args: {
    getRowTone: (row) => row.tone,
    rows: ROWS,
  },
};

export const Empty: Story = {
  args: {
    emptyState: '아직 기록이 없습니다.',
    rows: [],
  },
};

export const Totals: Story = {
  args: {
    rows: ROWS.slice(0, 2),
    totals: ['합계', '2건', '− ₩ 18,500'],
  },
};

export const HorizontalOverflow: Story = {
  args: {
    tabIndex: 0,
  },
  render: (args): ReactElement => (
    <div style={{ maxWidth: '24rem' }}>
      <LedgerTable {...args} />
    </div>
  ),
};
