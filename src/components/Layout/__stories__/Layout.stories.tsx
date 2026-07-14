import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../../theme/ThemeRoot';
import { tokens, type Space } from '../../../theme/tokens';
import { Inline, Stack, type LayoutJustify } from '../Layout';

const MARKER_STYLE: CSSProperties = {
  minWidth: '3rem',
  padding: tokens.space.xs,
  color: tokens.color.aubergine,
  background: tokens.color.periwinkleWash,
  borderBottom: `${tokens.border.hairline} solid ${tokens.color.periwinkle}`,
  fontFamily: tokens.font.data,
  fontSize: tokens.fontSize.caption,
  textAlign: 'center',
};

const SPACES: readonly Space[] = [
  'none',
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
];
const JUSTIFY_VALUES: readonly LayoutJustify[] = [
  'start',
  'center',
  'end',
  'between',
];

function Marker({ children }: { children: string }): ReactElement {
  return <span style={MARKER_STYLE}>{children}</span>;
}

const meta = {
  title: 'Foundations/Layout',
  id: 'components-layout',
  component: Stack,
  subcomponents: { Inline },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Stack과 Inline은 token 기반 간격과 정렬을 제공하는 low-level flex layout primitive입니다.',
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
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <Marker key="first">01</Marker>,
      <Marker key="second">02</Marker>,
      <Marker key="third">03</Marker>,
    ],
    gap: 'sm',
  },
};

export const Variants: Story = {
  render: (): ReactElement => (
    <Stack gap="xl">
      <section aria-labelledby="stack-variant-title">
        <h2 id="stack-variant-title">Stack</h2>
        <Stack gap="xs" style={{ marginTop: tokens.space.sm }}>
          <Marker>01</Marker>
          <Marker>02</Marker>
          <Marker>03</Marker>
        </Stack>
      </section>
      <section aria-labelledby="inline-variant-title">
        <h2 id="inline-variant-title">Inline</h2>
        <Inline gap="xs" style={{ marginTop: tokens.space.sm }}>
          <Marker>01</Marker>
          <Marker>02</Marker>
          <Marker>03</Marker>
        </Inline>
      </section>
    </Stack>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <Stack gap="xl">
      <div>
        <code>wrap=true</code>
        <Inline gap="sm" style={{ marginTop: tokens.space.xs, width: '13rem' }} wrap>
          <Marker>ONE</Marker>
          <Marker>TWO</Marker>
          <Marker>THREE</Marker>
          <Marker>FOUR</Marker>
        </Inline>
      </div>
      <div>
        <code>justify=between</code>
        <Inline
          gap="sm"
          justify="between"
          style={{ marginTop: tokens.space.xs, width: '20rem' }}
        >
          <Marker>START</Marker>
          <Marker>END</Marker>
        </Inline>
      </div>
    </Stack>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <Stack aria-label="예산 처리 순서" gap="xs" role="list">
      <div role="listitem">01 · 수입 확인</div>
      <div role="listitem">02 · 지출 분류</div>
      <div role="listitem">03 · 잔액 검토</div>
    </Stack>
  ),
  play: async ({ canvas }): Promise<void> => {
    const list = canvas.getByRole('list', { name: '예산 처리 순서' });
    const items = canvas.getAllByRole('listitem');
    const firstItem = canvas.getByText('01 · 수입 확인');

    await expect(list).toHaveAttribute('data-layout', 'stack');
    await expect(items).toHaveLength(3);
    await expect(firstItem).toHaveAttribute('role', 'listitem');
  },
};

export const StackGaps: Story = {
  render: (): ReactElement => (
    <Stack gap="lg">
      {SPACES.map((gap) => (
        <div key={gap}>
          <code>{gap}</code>
          <Stack gap={gap} style={{ marginTop: tokens.space.xs }}>
            <Marker>01</Marker>
            <Marker>02</Marker>
          </Stack>
        </div>
      ))}
    </Stack>
  ),
};

export const InlineJustification: Story = {
  render: (): ReactElement => (
    <Stack gap="lg">
      {JUSTIFY_VALUES.map((justify) => (
        <div key={justify}>
          <code>{justify}</code>
          <Inline
            gap="sm"
            justify={justify}
            style={{
              marginTop: tokens.space.xs,
              paddingBlock: tokens.space.sm,
              borderBlock: `${tokens.border.hairline} dotted ${tokens.color.ruleMuted}`,
            }}
          >
            <Marker>01</Marker>
            <Marker>02</Marker>
            <Marker>03</Marker>
          </Inline>
        </div>
      ))}
    </Stack>
  ),
};

export const Wrapping: Story = {
  render: (): ReactElement => (
    <Stack gap="lg">
      <Inline gap="sm" style={{ width: '13rem' }} wrap>
        <Marker>ONE</Marker>
        <Marker>TWO</Marker>
        <Marker>THREE</Marker>
        <Marker>FOUR</Marker>
      </Inline>
      <Inline gap="sm" style={{ width: '13rem', overflowX: 'auto' }} wrap={false}>
        <Marker>ONE</Marker>
        <Marker>TWO</Marker>
        <Marker>THREE</Marker>
        <Marker>FOUR</Marker>
      </Inline>
    </Stack>
  ),
};
