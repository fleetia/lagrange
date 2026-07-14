import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { tokens } from '../../theme/tokens';
import { Stack } from '../Layout/Layout';
import { Heading, Text } from '../Typography/Typography';
import { RadialBreakdownChart } from './RadialBreakdownChart';
import type {
  RadialBreakdownRing,
  RadialBreakdownSegment,
} from './types';

const ASSET_COLORS = {
  cash: '#aaa7cc',
  debt: '#d8d4e7',
  investments: '#8d9065',
  savings: '#b4b58f',
} as const;

const ASSET_SEGMENTS: readonly RadialBreakdownSegment[] = [
  {
    color: ASSET_COLORS.cash,
    detail: '₩7,940,000',
    id: 'cash',
    label: '현금성',
    labelAngle: -140,
    value: 28,
  },
  {
    color: ASSET_COLORS.savings,
    detail: '₩6,830,000',
    id: 'savings',
    label: '예금/적금',
    labelAngle: -40,
    value: 24,
  },
  {
    color: ASSET_COLORS.debt,
    detail: '₩4,010,000',
    id: 'debt',
    label: '부채',
    labelAngle: 40,
    value: 14,
  },
  {
    color: ASSET_COLORS.investments,
    detail: '₩9,670,000',
    id: 'investments',
    label: '투자',
    labelAngle: 140,
    value: 34,
  },
];

const EIGHT_CATEGORY_SEGMENTS: readonly RadialBreakdownSegment[] = [
  {
    color: '#9f9bc5',
    detail: '₩3,414,000',
    id: 'cash-equivalents',
    label: '현금성',
    value: 12,
  },
  {
    color: '#c8c5de',
    detail: '₩2,276,000',
    id: 'checking',
    label: '입출금',
    value: 8,
  },
  {
    color: '#b4b58f',
    detail: '₩5,121,000',
    id: 'deposits',
    label: '예금',
    value: 18,
  },
  {
    color: '#d1d2b3',
    detail: '₩3,414,000',
    id: 'installment-savings',
    label: '적금',
    value: 12,
  },
  {
    color: '#918eb4',
    detail: '₩2,845,000',
    id: 'pension',
    label: '연금',
    value: 10,
  },
  {
    color: '#7f8457',
    detail: '₩3,983,000',
    id: 'domestic-stocks',
    label: '국내주식',
    value: 14,
  },
  {
    color: '#666c43',
    detail: '₩4,552,000',
    id: 'global-stocks',
    label: '해외주식',
    value: 16,
  },
  {
    color: '#d8d4e7',
    detail: '₩2,845,000',
    id: 'other-assets',
    label: '기타자산',
    value: 10,
  },
];

const SAMPLE_SEGMENTS: readonly RadialBreakdownSegment[] = [
  {
    color: tokens.color.periwinkle,
    detail: '42 units',
    id: 'alpha',
    label: 'Alpha',
    value: 42,
  },
  {
    color: tokens.color.olive,
    detail: '34 units',
    id: 'beta',
    label: 'Beta',
    value: 34,
  },
  {
    color: tokens.color.vermilion,
    detail: '24 units',
    id: 'gamma',
    label: 'Gamma',
    value: 24,
  },
];

const MULTI_RING_DATA: readonly RadialBreakdownRing[] = [
  {
    id: 'outer',
    label: 'Outer series',
    segments: SAMPLE_SEGMENTS,
  },
  {
    id: 'inner',
    label: 'Inner series',
    segments: [
      {
        color: tokens.color.aubergine,
        id: 'delta',
        label: 'Delta',
        value: 58,
      },
      {
        color: tokens.color.oliveWash,
        id: 'epsilon',
        label: 'Epsilon',
        value: 42,
      },
    ],
  },
];

const meta = {
  title: 'Components/Data/RadialBreakdownChart',
  id: 'components-radialbreakdownchart',
  component: RadialBreakdownChart,
  parameters: {
    docs: {
      description: {
        component: [
          'RadialBreakdownChart는 하나 또는 여러 proportional dataset을 정밀한 radial infographic으로 표현합니다.',
          '`segments`는 단일 dataset, `rings`는 여러 concentric series에 사용합니다. 각 segment의 `detail`은 세 번째 label line으로 표시됩니다.',
          'Segment는 ThemeRoot의 paper grain이 비치는 반투명 pigment와 결정적인 pigment grain layer로 렌더링하며, label과 guide는 선명도를 유지합니다.',
          'Chart는 non-interactive SVG와 screen-reader data table을 함께 제공합니다. 좁은 PWA 화면에서는 `showLabels={false}`와 화면에 보이는 별도 legend를 조합하세요.',
        ].join(' '),
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    description: '네 가지 자산 항목의 구성 비율과 금액을 나타냅니다.',
    segments: ASSET_SEGMENTS,
    startAngle: -180,
    title: '자산 구성',
  },
  argTypes: {
    centerContent: {
      control: false,
      description: 'Chart center에 배치할 summary content입니다.',
    },
    dataTableLabels: {
      control: false,
      description: 'Screen-reader data table의 caption과 column label을 지역화합니다.',
    },
    description: {
      description: 'SVG chart를 설명하는 accessible description입니다.',
    },
    emptyState: {
      control: false,
      description: '표시 가능한 data가 없을 때 center에 렌더링할 content입니다.',
    },
    formatValue: {
      control: false,
      description: 'Segment value를 label용 문자열로 변환합니다.',
    },
    outerTickCount: {
      description: 'Outer guide에 표시할 tick 수입니다. 0–120 범위로 제한됩니다.',
    },
    rings: {
      control: false,
      description: '여러 concentric series를 표시할 때 사용하는 ring dataset입니다.',
    },
    segments: {
      control: false,
      description: '단일 ring을 구성하는 proportional segment 목록입니다.',
    },
    showLabels: {
      description: 'Outer ring의 leader와 3-line label 표시 여부입니다.',
    },
    startAngle: {
      description: '첫 segment가 시작되는 각도입니다.',
    },
    title: {
      description: 'Visible context와 accessible SVG title에 사용하는 chart 이름입니다.',
    },
  },
} satisfies Meta<typeof RadialBreakdownChart>;

export default meta;

type Story = StoryObj<typeof meta>;

function AssetCenterSummary(): ReactElement {
  return (
    <div className="lagrange-radial-center">
      <span className="lagrange-radial-center__title">자산 구성</span>
      <span className="lagrange-radial-center__kicker">TOTAL ASSETS</span>
      <span className="lagrange-radial-center__amount">₩ 28,450,000</span>
    </div>
  );
}

function SampleCenterSummary(): ReactElement {
  return (
    <Stack align="center" gap="xxs">
      <Text tone="muted" variant="caption">TOTAL</Text>
      <Heading level={3} variant="subsection">100</Heading>
      <Text variant="caption">units</Text>
    </Stack>
  );
}

export const Default: Story = {
  render: (args): ReactElement => (
    <ThemeRoot>
      <RadialBreakdownChart {...args} centerContent={<AssetCenterSummary />} />
    </ThemeRoot>
  ),
};

export const EightCategories: Story = {
  args: {
    dataTableLabels: {
      caption: '8개 자산 항목 데이터',
      detail: '비율 및 금액',
      label: '자산 항목',
      series: '자산군',
      value: '값',
    },
    description: '8개 자산 항목을 좌우 네 개씩 배치한 desktop 상세 구성입니다.',
    segments: EIGHT_CATEGORY_SEGMENTS,
    startAngle: -180,
    title: '8개 자산 항목 구성',
  },
  parameters: {
    docs: {
      description: {
        story: 'Desktop에서는 5–8개 항목까지 좌우 label을 유지할 수 있습니다. PWA의 compact viewport에서는 작은 label을 그대로 축소하지 말고 `showLabels={false}`와 화면에 보이는 2-column legend를 함께 사용하세요.',
      },
    },
  },
  render: (args): ReactElement => (
    <ThemeRoot>
      <RadialBreakdownChart {...args} centerContent={<AssetCenterSummary />} />
    </ThemeRoot>
  ),
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Stack gap="xl">
        <RadialBreakdownChart
          centerContent={<SampleCenterSummary />}
          description="Two concentric series share one proportional frame."
          rings={MULTI_RING_DATA}
          title="Multi-ring distribution"
        />
        <RadialBreakdownChart
          outerTickCount={24}
          segments={SAMPLE_SEGMENTS}
          showLabels={false}
          title="Compact distribution without external labels"
        />
      </Stack>
    </ThemeRoot>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Stack gap="xl">
        <RadialBreakdownChart
          emptyState="No comparison data yet"
          segments={[]}
          title="Empty distribution"
        />
        <RadialBreakdownChart
          segments={SAMPLE_SEGMENTS.slice(0, 1)}
          title="Single segment distribution"
        />
      </Stack>
    </ThemeRoot>
  ),
};

export const Accessibility: Story = {
  args: {
    description: 'A non-interactive asset summary with a detailed data table for screen readers.',
    segments: ASSET_SEGMENTS,
    startAngle: -180,
    title: 'Accessible asset distribution',
  },
  render: (args): ReactElement => (
    <ThemeRoot>
      <RadialBreakdownChart {...args} centerContent={<AssetCenterSummary />} />
    </ThemeRoot>
  ),
  play: async ({ canvas }): Promise<void> => {
    await expect(canvas.getByRole('img', {
      name: 'Accessible asset distribution',
    })).toBeInTheDocument();
    await expect(canvas.getByRole('table', {
      name: 'Accessible asset distribution data',
    })).toBeInTheDocument();
    await expect(canvas.getByRole('rowheader', { name: '현금성' })).toBeInTheDocument();
  },
};
