import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { tokens } from '../../theme/tokens';
import {
  Metric,
  type MetricSize,
  type MetricTone,
} from './Metric';

const SIZES: readonly MetricSize[] = ['compact', 'default', 'prominent'];
const TONES: readonly MetricTone[] = [
  'default',
  'muted',
  'accent',
  'positive',
  'critical',
];

const GRID_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
  gap: tokens.space.xl,
};

const meta = {
  title: 'Components/Metric',
  component: Metric,
  args: {
    detail: '전월 대비 +4.2%',
    label: '총 자산',
    value: '₩ 28,450,000',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Metric은 한 개의 term과 value를 semantic description list로 표현하는 editorial summary primitive입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeRoot style={{ padding: tokens.space.xl }}>
        <Story />
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'end'],
    },
    size: {
      control: 'select',
      options: SIZES,
    },
    tone: {
      control: 'select',
      options: TONES,
    },
  },
} satisfies Meta<typeof Metric>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={GRID_STYLE}>
      {SIZES.map((size) => (
        <Metric
          detail={`${size} hierarchy`}
          key={size}
          label={size}
          size={size}
          tone="accent"
          value="₩ 28,450,000"
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={GRID_STYLE}>
      {TONES.map((tone) => (
        <Metric
          detail={tone === 'critical' ? '예산 초과' : `tone · ${tone}`}
          key={tone}
          label={tone}
          tone={tone}
          value={tone === 'muted' ? '—' : '₩ 1,248,500'}
        />
      ))}
    </div>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <section aria-labelledby="july-summary-heading">
      <h2 id="july-summary-heading">7월 요약</h2>
      <div style={GRID_STYLE}>
        <Metric detail="급여 포함" label="수입" tone="positive" value="₩ 3,200,000" />
        <Metric detail="예산 대비 82%" label="지출" tone="critical" value="₩ 1,248,500" />
        <Metric detail="수입에서 지출을 제외" label="차액" value="₩ 1,951,500" />
      </div>
    </section>
  ),
};
