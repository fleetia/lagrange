import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Choice/Checkbox',
  id: 'components-checkbox',
  component: Checkbox,
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
          'Native checkbox semantics with a compact square marker and optional supporting text.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '반복 거래로 저장',
    description: '다음 달 같은 날짜에 초안을 만듭니다.',
  },
};

export const Variants: Story = {
  args: {
    children: '기본 선택',
  },
  render: () => (
    <Stack gap="md">
      <Checkbox>기본 선택</Checkbox>
      <Checkbox defaultChecked>선택됨</Checkbox>
      <Checkbox description="선택의 영향을 한 줄로 설명합니다.">
        설명 포함
      </Checkbox>
    </Stack>
  ),
};

export const States: Story = {
  args: {
    children: '기본 상태',
  },
  render: () => (
    <Stack gap="md">
      <Checkbox>기본 상태</Checkbox>
      <Checkbox defaultChecked>선택 상태</Checkbox>
      <Checkbox isInvalid>확인이 필요한 상태</Checkbox>
      <Checkbox disabled>비활성 상태</Checkbox>
    </Stack>
  ),
};

export const Accessibility: Story = {
  args: {
    children: '키보드로 선택',
    description: 'Tab으로 이동한 뒤 Space로 상태를 바꿉니다.',
  },
  play: async ({ canvas, userEvent }): Promise<void> => {
    const checkbox = canvas.getByRole('checkbox', { name: '키보드로 선택' });

    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await userEvent.keyboard('[Space]');
    await expect(checkbox).toBeChecked();
  },
};
