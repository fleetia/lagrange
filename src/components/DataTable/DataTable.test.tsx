import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
  DataTable,
  type DataTableColumn,
} from './DataTable';

type Transaction = {
  amount: string;
  category: string;
  id: string;
  memo: string;
};

const COLUMNS: readonly DataTableColumn<Transaction>[] = [
  {
    header: '카테고리',
    id: 'category',
    renderCell: (transaction) => transaction.category,
    width: '30%',
  },
  {
    header: '내용',
    id: 'memo',
    renderCell: (transaction) => transaction.memo,
  },
  {
    align: 'end',
    header: '금액',
    id: 'amount',
    renderCell: (transaction) => transaction.amount,
    width: '25%',
  },
];

const TRANSACTIONS: readonly Transaction[] = [
  {
    amount: '₩ 6,500',
    category: '식비 › 카페',
    id: 'tx-1',
    memo: '카페라떼',
  },
  {
    amount: '₩ 12,000',
    category: '식비 › 점심',
    id: 'tx-2',
    memo: '점심 식사',
  },
];

afterEach(cleanup);

describe('DataTable', () => {
  it('renders dense transaction data with semantic headers and totals', () => {
    const { container } = render(
      <DataTable
        caption="최근 거래"
        columns={COLUMNS}
        getRowKey={(transaction) => transaction.id}
        getRowTone={(transaction) =>
          transaction.id === 'tx-1' ? 'selected' : 'default'
        }
        rows={TRANSACTIONS}
        totals={['합계', '', '₩ 18,500']}
      />,
    );

    expect(screen.getByRole('table', { name: '최근 거래' })).toBeDefined();
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(screen.getByText('카페라떼')).toBeDefined();
    expect(screen.getByText('₩ 18,500')).toBeDefined();
    expect(
      container.querySelectorAll('[data-boundary="structural"]'),
    ).toHaveLength(2);
    expect(
      container.querySelector('[data-row-tone="selected"]'),
    ).not.toBeNull();
    expect(
      container
        .querySelector('[data-row-tone="selected"]')
        ?.getAttribute('aria-selected'),
    ).toBe('true');
  });

  it('announces an empty table state across all columns', () => {
    render(
      <DataTable
        aria-label="거래 내역"
        columns={COLUMNS}
        emptyState="아직 기록이 없습니다."
        getRowKey={(transaction) => transaction.id}
        rows={[]}
      />,
    );

    const emptyCell = screen.getByText('아직 기록이 없습니다.');

    expect(emptyCell.getAttribute('colspan')).toBe('3');
  });
});
