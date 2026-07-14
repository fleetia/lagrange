import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../../theme/ThemeRoot';
import { tokens } from '../../../theme/tokens';
import {
  Heading,
  Text,
  type HeadingLevel,
  type HeadingVariant,
  type TextTone,
  type TextVariant,
} from '../Typography';

const SPECIMEN_STYLE: CSSProperties = {
  display: 'grid',
  gap: tokens.space.md,
};

const ROW_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '8rem minmax(0, 1fr)',
  alignItems: 'baseline',
  gap: tokens.space.lg,
  paddingBlock: tokens.space.sm,
  borderBottom: `${tokens.border.hairline} dotted ${tokens.color.ruleMuted}`,
};

const TEXT_VARIANTS: readonly TextVariant[] = [
  'body',
  'label',
  'caption',
  'data',
];
const TEXT_TONES: readonly TextTone[] = [
  'default',
  'muted',
  'accent',
  'positive',
  'critical',
];
const HEADING_VARIANTS: readonly {
  level: HeadingLevel;
  variant: HeadingVariant;
}[] = [
  { level: 1, variant: 'display' },
  { level: 2, variant: 'section' },
  { level: 3, variant: 'subsection' },
  { level: 4, variant: 'label' },
];

const meta = {
  title: 'Components/Typography',
  component: Text,
  subcomponents: { Heading },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Text는 본문과 data typography를, Heading은 semantic heading level과 독립적인 visual hierarchy를 제공합니다.',
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
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'small'],
    },
    tone: {
      control: 'select',
      options: TEXT_TONES,
    },
    variant: {
      control: 'select',
      options: TEXT_VARIANTS,
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'strong'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'p',
    children: '기록은 가볍게, 흐름은 정확하게.',
  },
};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={SPECIMEN_STYLE}>
      <Heading level={2} variant="section">
        월간 자산 관찰 기록
      </Heading>
      {TEXT_VARIANTS.map((variant) => (
        <div key={variant} style={ROW_STYLE}>
          <Text tone="muted" variant="caption">
            {variant}
          </Text>
          <Text variant={variant}>2026.07.14 · 생활비 ₩ 128,400</Text>
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={SPECIMEN_STYLE}>
      {TEXT_TONES.map((tone) => (
        <div key={tone} style={ROW_STYLE}>
          <Text tone="muted" variant="caption">
            {tone}
          </Text>
          <Text tone={tone} variant="data" weight="strong">
            {tone === 'critical' ? '−' : '+'} ₩ 1,248,500
          </Text>
        </div>
      ))}
      <div style={ROW_STYLE}>
        <Text tone="muted" variant="caption">
          truncated
        </Text>
        <Text
          title="길이가 긴 거래 메모는 한 줄에서 말줄임 처리됩니다."
          truncate
          style={{ maxWidth: '16rem' }}
        >
          길이가 긴 거래 메모는 한 줄에서 말줄임 처리됩니다.
        </Text>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <article aria-labelledby="typography-accessibility-title">
      <Heading id="typography-accessibility-title" level={2} variant="section">
        7월 결산
      </Heading>
      <Text as="p">수입과 지출을 확인하고 월말 잔액을 검토합니다.</Text>
      <Text as="small" tone="muted" variant="caption">
        2026년 7월 14일 기준
      </Text>
    </article>
  ),
  play: async ({ canvas }): Promise<void> => {
    const heading = canvas.getByRole('heading', { level: 2, name: '7월 결산' });
    const paragraph = canvas.getByText(
      '수입과 지출을 확인하고 월말 잔액을 검토합니다.',
    );
    const supplementary = canvas.getByText('2026년 7월 14일 기준');

    await expect(heading).toBeVisible();
    await expect(paragraph.tagName).toBe('P');
    await expect(supplementary.tagName).toBe('SMALL');
  },
};

export const TextVariants: Story = {
  render: (): ReactElement => (
    <div style={SPECIMEN_STYLE}>
      {TEXT_VARIANTS.map((variant) => (
        <div key={variant} style={ROW_STYLE}>
          <Text tone="muted" variant="caption">
            {variant}
          </Text>
          <Text variant={variant}>2026.07.14 · 생활비 ₩ 128,400</Text>
        </div>
      ))}
    </div>
  ),
};

export const TonesAndWeights: Story = {
  render: (): ReactElement => (
    <div style={SPECIMEN_STYLE}>
      {TEXT_TONES.map((tone) => (
        <div key={tone} style={ROW_STYLE}>
          <Text tone="muted" variant="caption">
            {tone}
          </Text>
          <Text tone={tone} variant="data" weight="strong">
            {tone === 'critical' ? '−' : '+'} ₩ 1,248,500
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const HeadingVariants: Story = {
  render: (): ReactElement => (
    <div style={SPECIMEN_STYLE}>
      {HEADING_VARIANTS.map(({ level, variant }) => (
        <div key={variant} style={ROW_STYLE}>
          <Text tone="muted" variant="caption">
            {variant}
          </Text>
          <Heading level={level} variant={variant}>
            월간 자산 관찰 기록
          </Heading>
        </div>
      ))}
    </div>
  ),
};

export const SemanticElements: Story = {
  render: (): ReactElement => (
    <div style={SPECIMEN_STYLE}>
      <Text as="span">span · inline label</Text>
      <Text as="p">p · paragraph copy</Text>
      <Text as="div">div · neutral text container</Text>
      <Text as="small" tone="muted" variant="caption">
        small · supplementary note
      </Text>
    </div>
  ),
};
