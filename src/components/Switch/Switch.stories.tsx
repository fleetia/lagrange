import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Choice/Switch',
  id: 'components-switch',
  component: Switch,
  decorators: [
    (Story) => (
      <ThemeRoot className="lagrange-story lagrange-story--compact">
        <Story />
      </ThemeRoot>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Immediate boolean setting rendered as a rule and moving marker instead of a rounded track.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '자동 분류',
    description: '일치하는 규칙이 있으면 카테고리를 제안합니다.',
  },
};

export const Variants: Story = {
  args: {
    children: '기본 설정',
  },
  render: () => (
    <Stack gap="md">
      <Switch>기본 설정</Switch>
      <Switch defaultChecked>활성 설정</Switch>
      <Switch description="설정 결과를 짧게 설명합니다.">설명 포함</Switch>
    </Stack>
  ),
};

export const States: Story = {
  args: {
    children: '기본 상태',
  },
  render: () => (
    <Stack gap="md">
      <Switch>꺼짐</Switch>
      <Switch defaultChecked>켜짐</Switch>
      <Switch isInvalid>확인이 필요한 상태</Switch>
      <Switch disabled>비활성 상태</Switch>
    </Stack>
  ),
};

export const Accessibility: Story = {
  args: {
    children: '주말에도 알림',
    description: 'Tab으로 이동한 뒤 Space로 상태를 바꿉니다.',
  },
  play: async ({ canvas, userEvent }): Promise<void> => {
    const control = canvas.getByRole('switch', { name: '주말에도 알림' });

    await userEvent.tab();
    await expect(control).toHaveFocus();
    await userEvent.keyboard('[Space]');
    await expect(control).toBeChecked();
  },
};
