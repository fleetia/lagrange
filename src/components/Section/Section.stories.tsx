import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { tokens } from '../../theme/tokens';
import { Section, type SectionBoundary, type SectionSpacing } from './Section';

const BOUNDARIES: readonly SectionBoundary[] = [
  'none',
  'weak',
  'boundary',
  'structural',
];
const SPACINGS: readonly SectionSpacing[] = ['compact', 'default', 'relaxed'];

const LABEL_STYLE: CSSProperties = {
  margin: 0,
  color: tokens.color.inkMuted,
  fontFamily: tokens.font.data,
  fontSize: tokens.fontSize.caption,
};

const meta = {
  title: 'Components/Section',
  component: Section,
  args: {
    children: '한 섹션 안의 정보는 같은 spacing rhythm을 공유합니다.',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Section은 card surface 없이 spacing과 rule hierarchy만으로 content 영역을 구분합니다.',
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
    boundary: {
      control: 'select',
      options: BOUNDARIES,
    },
    spacing: {
      control: 'select',
      options: SPACINGS,
    },
  },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={{ display: 'grid', gap: tokens.space.lg }}>
      {BOUNDARIES.map((boundary) => (
        <Section boundary={boundary} key={boundary} spacing="compact">
          <p style={LABEL_STYLE}>{boundary}</p>
          <strong>최근 거래</strong>
        </Section>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={{ display: 'grid', gap: tokens.space.lg }}>
      {SPACINGS.map((spacing) => (
        <Section boundary="weak" key={spacing} spacing={spacing}>
          <p style={LABEL_STYLE}>{spacing}</p>
          <span>월간 수입과 지출의 합계</span>
        </Section>
      ))}
    </div>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <Section aria-labelledby="cash-flow-heading" boundary="structural">
      <h2 id="cash-flow-heading" style={{ margin: 0 }}>
        현금 흐름
      </h2>
      <p style={{ margin: 0 }}>7월 수입, 지출, 이체 내역을 요약합니다.</p>
    </Section>
  ),
};
