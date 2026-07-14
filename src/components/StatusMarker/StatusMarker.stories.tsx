import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { tokens } from '../../theme/tokens';
import {
  StatusMarker,
  type StatusMarkerShape,
  type StatusMarkerTone,
} from './StatusMarker';

const SHAPES: readonly StatusMarkerShape[] = ['line', 'square'];
const TONES: readonly StatusMarkerTone[] = [
  'default',
  'muted',
  'accent',
  'positive',
  'critical',
];

const GRID_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))',
  gap: tokens.space.lg,
};

const meta = {
  title: 'Components/StatusMarker',
  component: StatusMarker,
  args: {
    children: '동기화 완료',
    tone: 'positive',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'StatusMarker는 pill이나 icon-only state 대신 짧은 rule marker와 항상 보이는 text label을 사용합니다.',
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
    shape: {
      control: 'select',
      options: SHAPES,
    },
    tone: {
      control: 'select',
      options: TONES,
    },
  },
} satisfies Meta<typeof StatusMarker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={GRID_STYLE}>
      {SHAPES.flatMap((shape) =>
        TONES.map((tone) => (
          <StatusMarker key={`${shape}-${tone}`} shape={shape} tone={tone}>
            {shape} · {tone}
          </StatusMarker>
        )),
      )}
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={GRID_STYLE}>
      <StatusMarker tone="muted">연결 안 됨</StatusMarker>
      <StatusMarker tone="accent">동기화 중</StatusMarker>
      <StatusMarker shape="square" tone="positive">
        최신 상태
      </StatusMarker>
      <StatusMarker shape="square" tone="critical">
        확인 필요
      </StatusMarker>
    </div>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <div aria-label="계좌 연결 상태" role="group" style={GRID_STYLE}>
      <StatusMarker tone="positive">생활비 통장 · 연결됨</StatusMarker>
      <StatusMarker tone="critical">투자 계좌 · 인증 만료</StatusMarker>
      <StatusMarker aria-live="polite" role="status" tone="accent">
        카드 내역 · 동기화 중
      </StatusMarker>
    </div>
  ),
};
