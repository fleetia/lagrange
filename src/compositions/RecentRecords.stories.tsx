import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  DataTable,
  Heading,
  Rule,
  Text,
  ThemeRoot,
  type DataTableColumn,
  type DataTableRowTone,
  type TextTone,
} from '../index';

type LedgerRecord = {
  account: string;
  amount: number;
  category: string;
  date: string;
  id: string;
  kind: '수입' | '지출' | '이체';
  memo: string;
  tag: string;
};

const meta = {
  title: 'Compositions/Recent Records',
  component: ThemeRoot,
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta<typeof ThemeRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

const RECORDS: readonly LedgerRecord[] = [
  {
    id: 'record-001',
    date: '07.13 월',
    kind: '지출',
    category: '식비 › 카페',
    memo: '카페라떼',
    amount: -6500,
    account: '현대카드',
    tag: '개인',
  },
  {
    id: 'record-002',
    date: '07.13 월',
    kind: '지출',
    category: '식비 › 외식',
    memo: '점심 식사',
    amount: -12000,
    account: '현대카드',
    tag: '공용',
  },
  {
    id: 'record-003',
    date: '07.13 월',
    kind: '지출',
    category: '교통비 › 대중교통',
    memo: '버스 환승',
    amount: -1200,
    account: '교통카드',
    tag: '개인',
  },
  {
    id: 'record-004',
    date: '07.12 일',
    kind: '이체',
    category: '자산이동 › 저축',
    memo: '비상금 적립',
    amount: 300000,
    account: '생활비 → 저축',
    tag: '저축',
  },
  {
    id: 'record-005',
    date: '07.12 일',
    kind: '지출',
    category: '생활비 › 장보기',
    memo: '주간 식재료',
    amount: -48700,
    account: '생활비 통장',
    tag: '공용',
  },
  {
    id: 'record-006',
    date: '07.11 토',
    kind: '수입',
    category: '근로소득 › 급여',
    memo: '7월 급여',
    amount: 3200000,
    account: '급여 통장',
    tag: '정기',
  },
  {
    id: 'record-007',
    date: '07.10 금',
    kind: '지출',
    category: '주거비 › 관리비',
    memo: '7월 관리비',
    amount: -114000,
    account: '생활비 통장',
    tag: '정기',
  },
  {
    id: 'record-008',
    date: '07.10 금',
    kind: '지출',
    category: '구독 › 소프트웨어',
    memo: 'Cloud storage',
    amount: -4900,
    account: '현대카드',
    tag: '업무',
  },
] as const;

function getKindTone(kind: LedgerRecord['kind']): TextTone {
  if (kind === '수입') {
    return 'positive';
  }

  if (kind === '지출') {
    return 'critical';
  }

  return 'accent';
}

function formatAmount(amount: number): string {
  const sign = amount > 0 ? '+' : amount < 0 ? '−' : '';
  const formatted = new Intl.NumberFormat('ko-KR').format(Math.abs(amount));

  return `${sign} ₩ ${formatted}`;
}

const COLUMNS: readonly DataTableColumn<LedgerRecord>[] = [
  {
    id: 'date',
    header: '날짜',
    width: 82,
    renderCell: (record) => <Text variant="data">{record.date}</Text>,
  },
  {
    id: 'kind',
    header: '구분',
    width: 58,
    renderCell: (record) => (
      <Text tone={getKindTone(record.kind)} variant="label" weight="strong">
        {record.kind}
      </Text>
    ),
  },
  {
    id: 'category',
    header: '카테고리',
    width: 150,
    renderCell: (record) => <Text truncate>{record.category}</Text>,
  },
  {
    id: 'memo',
    header: '내용',
    renderCell: (record) => <Text truncate>{record.memo}</Text>,
  },
  {
    align: 'end',
    id: 'amount',
    header: '금액',
    width: 118,
    renderCell: (record) => (
      <Text
        tone={record.amount > 0 ? 'positive' : 'default'}
        variant="data"
        weight="medium"
      >
        {formatAmount(record.amount)}
      </Text>
    ),
  },
  {
    id: 'account',
    header: '계좌',
    width: 118,
    renderCell: (record) => <Text truncate variant="caption">{record.account}</Text>,
  },
  {
    id: 'tag',
    header: '태그',
    width: 62,
    renderCell: (record) => <Text tone="muted" variant="caption">{record.tag}</Text>,
  },
];

const TOTALS = [
  <Text key="label" variant="label" weight="strong">최근 합계</Text>,
  null,
  null,
  null,
  <Text key="amount" variant="data" weight="strong">+ ₩ 3,312,700</Text>,
  null,
  <Text key="count" tone="muted" variant="caption">8건</Text>,
] as const;

function getRowTone(record: LedgerRecord): DataTableRowTone {
  if (record.id === 'record-002') {
    return 'selected';
  }

  return 'default';
}

function RecentRecordsStory(): ReactElement {
  return (
    <ThemeRoot
      className="lagrange-story lagrange-story--compact"
      data-testid="recent-records-story"
    >
      <header className="lagrange-story__header">
        <div>
          <p className="lagrange-story__kicker">Household ledger · records 04</p>
          <Heading level={1} variant="display">
            최근 거래
          </Heading>
        </div>
        <Text variant="caption" tone="muted">
          2026 · JULY · LOCAL
        </Text>
      </header>

      <Rule variant="structural" />

      <div className="lagrange-story__section lagrange-story__summary" aria-label="7월 요약">
        <div className="lagrange-story__summary-item">
          <Text variant="label" tone="positive" weight="strong">수입</Text>
          <span className="lagrange-story__summary-value">₩ 3,200,000</span>
        </div>
        <div className="lagrange-story__summary-item">
          <Text variant="label" tone="critical" weight="strong">지출</Text>
          <span className="lagrange-story__summary-value">₩ 187,300</span>
        </div>
        <div className="lagrange-story__summary-item">
          <Text variant="label" tone="accent" weight="strong">차액</Text>
          <span className="lagrange-story__summary-value">₩ 3,012,700</span>
        </div>
      </div>

      <Rule variant="weak" />

      <div className="lagrange-story__table">
        <DataTable
          aria-label="최근 거래 내역"
          caption="최근 입력한 수입, 지출 및 이체 내역"
          columns={COLUMNS}
          getRowKey={(record) => record.id}
          getRowTone={getRowTone}
          rows={RECORDS}
          totals={TOTALS}
        />
      </div>

      <p className="lagrange-story__note">
        선택 행은 geometry를 바꾸지 않고 periwinkle wash와 marker로만 구분합니다.
      </p>
    </ThemeRoot>
  );
}

export const HouseholdLedger: Story = {
  render: RecentRecordsStory,
};
