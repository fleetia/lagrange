import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Button } from '../../components/Button';
import { DataTable, type DataTableColumn } from '../../components/DataTable';
import { Rule } from '../../components/Rule';
import { Select } from '../../components/Select';
import { TextField } from '../../components/TextField';
import { ThemeRoot } from '../ThemeRoot';
import { tokens } from '../tokens';
import {
  archiveThemeClass,
  legacyAccentOverride,
  nestedOverrideThemeClass,
  nestedThemeSpecimen,
  themeActions,
  themeComparison,
  themeField,
  themeSpecimen,
} from './ThemeRoot.stories.css';

const BOUNDARY_STYLE: CSSProperties = {
  minHeight: '10rem',
  padding: tokens.space.xl,
  borderBottom: `${tokens.border.hairline} solid ${tokens.color.rule}`,
};

const meta = {
  title: 'Components/ThemeRoot',
  component: ThemeRoot,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Lagrange token, 기본 typography, 반복 가능한 paper grain을 적용하는 application theme boundary입니다. 공통 paper material은 ThemeRoot가 담당하며, chart의 pigment grain처럼 의미 있는 재질 표현만 component layer에서 더합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

type SpecimenRow = {
  amount: string;
  id: string;
  memo: string;
};

const SPECIMEN_COLUMNS: readonly DataTableColumn<SpecimenRow>[] = [
  {
    header: 'Memo',
    id: 'memo',
    renderCell: (row) => row.memo,
  },
  {
    align: 'end',
    header: 'Amount',
    id: 'amount',
    renderCell: (row) => row.amount,
    width: '8rem',
  },
];

const SPECIMEN_ROWS: readonly SpecimenRow[] = [
  { amount: '₩ 12,500', id: 'coffee', memo: 'Coffee beans' },
  { amount: '₩ 48,000', id: 'books', memo: 'Reference books' },
];

const ThemeSpecimen = ({ label }: { label: string }): ReactElement => (
  <>
    <div>
      <small>THEME SPECIMEN</small>
      <h2>{label}</h2>
    </div>
    <Rule variant="structural" />
    <div className={themeActions}>
      <div className={themeField}>
        <TextField aria-label={`${label} memo`} defaultValue="Ledger entry" />
      </div>
      <Select aria-label={`${label} account`} defaultValue="checking">
        <option value="checking">Checking</option>
        <option value="savings">Savings</option>
      </Select>
      <Button>Save record</Button>
    </div>
    <DataTable
      aria-label={`${label} records`}
      columns={SPECIMEN_COLUMNS}
      getRowKey={(row) => row.id}
      rows={SPECIMEN_ROWS}
    />
  </>
);

export const Default: Story = {
  args: {
    children: 'ThemeRoot 안의 모든 Lagrange component가 같은 visual language를 공유합니다.',
    style: {
      minHeight: '12rem',
      padding: '1.5rem',
    },
  },
};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={{ display: 'grid', gap: tokens.space.xl }}>
      <ThemeRoot style={BOUNDARY_STYLE}>
        <h2>Application boundary</h2>
        <p>전체 application surface에 Lagrange theme를 적용합니다.</p>
      </ThemeRoot>
      <ThemeRoot className="embedded-theme-boundary" style={BOUNDARY_STYLE}>
        <h2>Embedded boundary</h2>
        <p>기존 화면 안의 독립적인 Lagrange surface에도 적용할 수 있습니다.</p>
      </ThemeRoot>
    </div>
  ),
};

export const Theming: Story = {
  render: (): ReactElement => (
    <div className={themeComparison}>
      <ThemeRoot className={themeSpecimen}>
        <ThemeSpecimen label="Lagrange paper" />
      </ThemeRoot>
      <ThemeRoot
        className={themeSpecimen}
        themeClassName={archiveThemeClass}
      >
        <ThemeSpecimen label="Archive blue" />
      </ThemeRoot>
    </div>
  ),
};

export const NestedCompatibility: Story = {
  render: (): ReactElement => (
    <div className={themeComparison}>
      <ThemeRoot className={nestedThemeSpecimen}>
        <Button>Default reference</Button>
        <div className={legacyAccentOverride}>
          <Button>Legacy accent override</Button>
        </div>
      </ThemeRoot>
      <ThemeRoot
        className={nestedThemeSpecimen}
        themeClassName={nestedOverrideThemeClass}
      >
        <Button>Outer component override</Button>
        <ThemeRoot className={nestedThemeSpecimen}>
          <Button>Nested default reset</Button>
        </ThemeRoot>
      </ThemeRoot>
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={{ display: 'grid', gap: tokens.space.xl }}>
      <ThemeRoot
        aria-busy="false"
        aria-label="준비 완료 theme boundary"
        data-state="ready"
        role="region"
        style={BOUNDARY_STYLE}
      >
        <strong>READY</strong>
        <p>Theme token이 적용된 기본 상태입니다.</p>
      </ThemeRoot>
      <ThemeRoot
        aria-busy="true"
        aria-label="불러오는 중 theme boundary"
        data-state="loading"
        role="region"
        style={BOUNDARY_STYLE}
      >
        <strong>LOADING</strong>
        <p>Native state와 data attribute도 boundary에 전달됩니다.</p>
      </ThemeRoot>
    </div>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <ThemeRoot
      aria-labelledby="theme-accessibility-title"
      role="region"
      style={BOUNDARY_STYLE}
    >
      <h2 id="theme-accessibility-title">가계부 theme boundary</h2>
      <p>ThemeRoot는 consumer가 지정한 landmark와 문서 구조를 보존합니다.</p>
    </ThemeRoot>
  ),
  play: async ({ canvas }): Promise<void> => {
    const region = canvas.getByRole('region', {
      name: '가계부 theme boundary',
    });
    const heading = canvas.getByRole('heading', {
      level: 2,
      name: '가계부 theme boundary',
    });

    await expect(region).toContainElement(heading);
    await expect(
      canvas.getByText(
        'ThemeRoot는 consumer가 지정한 landmark와 문서 구조를 보존합니다.',
      ),
    ).toBeVisible();
  },
};

export const NativeProperties: Story = {
  args: {
    children: 'Native div properties와 consumer className을 그대로 전달합니다.',
    className: 'consumer-theme-boundary',
    id: 'ledger-theme',
    style: {
      minHeight: '12rem',
      padding: '1.5rem',
    },
  },
};
