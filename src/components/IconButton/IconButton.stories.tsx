import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { Icon } from '../Icon/Icon';
import { IconButton } from './IconButton';

const EDIT_ICON = (
  <Icon>
    <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
  </Icon>
);

const meta = {
  title: 'Components/Command/IconButton',
  id: 'components-iconbutton',
  component: IconButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Icon-only command에 visible tooltip 없이도 accessible name을 제공하는 compact button입니다. Default, quiet, critical hierarchy를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: EDIT_ICON,
    label: '수정',
    onClick: fn(),
  },
  argTypes: {
    size: { control: 'select', options: ['compact', 'default'] },
    variant: {
      control: 'select',
      options: ['default', 'quiet', 'critical'],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): ReactElement => <ThemeRoot><IconButton {...args} /></ThemeRoot>,
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <IconButton label="수정" variant="default">{EDIT_ICON}</IconButton>{' '}
      <IconButton label="복제" variant="quiet">{EDIT_ICON}</IconButton>{' '}
      <IconButton label="삭제" variant="critical">×</IconButton>
    </ThemeRoot>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <IconButton label="기본">{EDIT_ICON}</IconButton>{' '}
      <IconButton disabled label="비활성">{EDIT_ICON}</IconButton>
    </ThemeRoot>
  ),
};

export const Accessibility: Story = {
  args: {
    children: EDIT_ICON,
    label: '선택한 행 수정',
    onClick: fn(),
  },
  render: (args): ReactElement => <ThemeRoot><IconButton {...args} /></ThemeRoot>,
  play: async ({ args, canvas, userEvent }): Promise<void> => {
    await userEvent.tab();
    const button = canvas.getByRole('button', { name: '선택한 행 수정' });

    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
