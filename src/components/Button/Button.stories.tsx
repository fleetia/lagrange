import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { Button } from './Button';

const meta = {
  title: 'Components/Command/Button',
  id: 'components-button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Primary, secondary, quiet, critical command hierarchy를 제공하는 native button입니다. Pending과 disabled 상태에서도 control geometry를 유지합니다.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: '저장',
    onClick: fn(),
  },
  argTypes: {
    size: { control: 'select', options: ['compact', 'default'] },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'quiet', 'critical'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): ReactElement => <ThemeRoot><Button {...args} /></ThemeRoot>,
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Button variant="primary">저장</Button>{' '}
      <Button variant="secondary">미리보기</Button>{' '}
      <Button variant="quiet">취소</Button>{' '}
      <Button variant="critical">삭제</Button>
    </ThemeRoot>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Button>기본</Button>{' '}
      <Button disabled>비활성</Button>{' '}
      <Button isPending>저장 중</Button>
    </ThemeRoot>
  ),
};

export const Accessibility: Story = {
  args: {
    children: '키보드로 저장',
    onClick: fn(),
  },
  render: (args): ReactElement => <ThemeRoot><Button {...args} /></ThemeRoot>,
  play: async ({ args, canvas, userEvent }): Promise<void> => {
    await userEvent.tab();
    const button = canvas.getByRole('button', { name: '키보드로 저장' });

    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
