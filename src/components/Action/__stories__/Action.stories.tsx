import type { ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { ThemeRoot } from '../../../theme/ThemeRoot';
import { tokens } from '../../../theme/tokens';
import { Action, type ActionSize, type ActionVariant } from '../Action';

const VARIANTS: readonly ActionVariant[] = ['primary', 'quiet', 'critical'];
const SIZES: readonly ActionSize[] = ['compact', 'default'];

function KeyboardActivationStory(): ReactElement {
  const [activationCount, setActivationCount] = useState(0);

  return (
    <div
      style={{ display: 'grid', justifyItems: 'start', gap: tokens.space.md }}
    >
      <Action onClick={() => setActivationCount((count) => count + 1)}>
        거래 저장
      </Action>
      <output aria-live="polite" role="status">
        활성화 {activationCount}회
      </output>
    </div>
  );
}

const meta = {
  title: 'Components/Action',
  component: Action,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Action은 box 대신 underline과 marker를 사용하는 compact native button입니다.',
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
    size: {
      control: 'select',
      options: SIZES,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
} satisfies Meta<typeof Action>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '거래 저장',
  },
};

export const Variants: Story = {
  render: (): ReactElement => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: tokens.space.xl }}
    >
      {VARIANTS.map((variant) => (
        <Action key={variant} variant={variant}>
          {variant}
        </Action>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: tokens.space.xl }}
    >
      <Action>사용 가능</Action>
      <Action disabled>비활성</Action>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    children: '키보드로 거래 저장',
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }): Promise<void> => {
    const action = canvas.getByRole('button', {
      name: '키보드로 거래 저장',
    });

    await userEvent.tab();
    await expect(action).toHaveFocus();
    await userEvent.keyboard('[Space]');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Sizes: Story = {
  render: (): ReactElement => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: tokens.space.xl }}
    >
      {SIZES.map((size) => (
        <Action key={size} size={size}>
          {size}
        </Action>
      ))}
    </div>
  ),
};

export const DisabledStates: Story = {
  render: (): ReactElement => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: tokens.space.xl }}
    >
      {VARIANTS.map((variant) => (
        <Action disabled key={variant} variant={variant}>
          {variant}
        </Action>
      ))}
    </div>
  ),
};

export const KeyboardActivation: Story = {
  render: KeyboardActivationStory,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const action = canvas.getByRole('button', { name: '거래 저장' });

    await userEvent.tab();
    await expect(action).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByRole('status')).toHaveTextContent('활성화 1회');
  },
};
