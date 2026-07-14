import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../../theme/ThemeRoot';
import { tokens } from '../../../theme/tokens';
import { Rule, type RuleVariant } from '../Rule';

const VARIANTS: readonly RuleVariant[] = ['weak', 'boundary', 'structural'];

const LABEL_STYLE: CSSProperties = {
  color: tokens.color.inkMuted,
  fontFamily: tokens.font.data,
  fontSize: tokens.fontSize.caption,
};

const meta = {
  title: 'Foundations/Rule',
  id: 'components-rule',
  component: Rule,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Rule은 약한 group 구분, 일반 boundary, 정보 구조 전환을 서로 다른 line semantic으로 표현합니다.',
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
} satisfies Meta<typeof Rule>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={{ display: 'grid', gap: tokens.space.xl }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: tokens.space.sm }}>
          <span style={LABEL_STYLE}>{variant}</span>
          <Rule variant={variant} />
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={{ display: 'grid', gap: tokens.space.xl }}>
      <section>
        <span style={LABEL_STYLE}>horizontal flow</span>
        <p>이번 달 수입</p>
        <Rule variant="boundary" />
        <p>이번 달 지출</p>
      </section>
      <section>
        <span style={LABEL_STYLE}>vertical split</span>
        <div
          style={{
            display: 'flex',
            minHeight: '5rem',
            alignItems: 'stretch',
            gap: tokens.space.lg,
            marginTop: tokens.space.sm,
          }}
        >
          <p>자산</p>
          <Rule orientation="vertical" variant="structural" />
          <p>부채</p>
        </div>
      </section>
    </div>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <div
      style={{
        display: 'flex',
        minHeight: '6rem',
        flexDirection: 'column',
        gap: tokens.space.md,
      }}
    >
      <Rule aria-label="요약과 상세 구분" />
      <div style={{ display: 'flex', minHeight: '3rem', gap: tokens.space.md }}>
        <span>자산</span>
        <Rule
          aria-label="자산과 부채 구분"
          orientation="vertical"
          variant="structural"
        />
        <span>부채</span>
      </div>
    </div>
  ),
  play: async ({ canvas }): Promise<void> => {
    const horizontal = canvas.getByRole('separator', {
      name: '요약과 상세 구분',
    });
    const vertical = canvas.getByRole('separator', {
      name: '자산과 부채 구분',
    });

    await expect(horizontal).toHaveAttribute('aria-orientation', 'horizontal');
    await expect(vertical).toHaveAttribute('aria-orientation', 'vertical');
  },
};

export const HorizontalVariants: Story = {
  render: (): ReactElement => (
    <div style={{ display: 'grid', gap: tokens.space.xl }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: tokens.space.sm }}>
          <span style={LABEL_STYLE}>{variant}</span>
          <Rule variant={variant} />
        </div>
      ))}
    </div>
  ),
};

export const VerticalVariants: Story = {
  render: (): ReactElement => (
    <div
      style={{
        display: 'flex',
        minHeight: '8rem',
        alignItems: 'stretch',
        gap: tokens.space.xl,
      }}
    >
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', alignItems: 'stretch', gap: tokens.space.sm }}
        >
          <span style={LABEL_STYLE}>{variant}</span>
          <Rule orientation="vertical" variant={variant} />
        </div>
      ))}
    </div>
  ),
};
