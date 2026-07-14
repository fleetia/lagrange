import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { tokens } from '../../theme/tokens';
import { Action } from '../Action/Action';
import { SectionHeader, type SectionHeaderRule } from './SectionHeader';

const RULES: readonly SectionHeaderRule[] = [
  'none',
  'weak',
  'boundary',
  'structural',
];

const STORY_GRID_STYLE: CSSProperties = {
  display: 'grid',
  gap: tokens.space.xl,
};

const meta = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  args: {
    description: '계좌와 투자 자산을 합산한 현재 구성입니다.',
    eyebrow: 'Assets · 01',
    title: '자산 구성',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'SectionHeader는 eyebrow, semantic heading, supporting copy, aside와 rule을 하나의 읽기 순서로 구성합니다.',
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
    headingLevel: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    headingVariant: {
      control: 'select',
      options: ['display', 'section', 'subsection', 'label'],
    },
    rule: {
      control: 'select',
      options: RULES,
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={STORY_GRID_STYLE}>
      {RULES.map((rule) => (
        <section key={rule}>
          <SectionHeader
            description={`${rule} rule로 다음 content와의 관계를 표시합니다.`}
            eyebrow="Ledger section"
            headingVariant={rule === 'structural' ? 'section' : 'subsection'}
            rule={rule}
            title={rule}
          />
        </section>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={STORY_GRID_STYLE}>
      <section>
        <SectionHeader rule="weak" title="최소 header" />
      </section>
      <section>
        <SectionHeader
          aside={<Action size="compact">기간 변경</Action>}
          description="입력한 거래를 계좌 기준으로 정리합니다."
          eyebrow="Records · July"
          rule="structural"
          title="최근 거래"
        />
      </section>
    </div>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <section aria-labelledby="accessible-assets-heading">
      <SectionHeader
        description="heading id로 상위 section의 accessible name을 제공합니다."
        headingId="accessible-assets-heading"
        headingLevel={2}
        rule="boundary"
        title="자산 구성"
      />
      <p>총 자산 ₩ 28,450,000</p>
    </section>
  ),
};
