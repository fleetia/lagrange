import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { Radio, RadioGroup } from './RadioGroup';

const DEFAULT_OPTIONS = (
  <>
    <Radio value="expense">지출</Radio>
    <Radio value="income">수입</Radio>
    <Radio value="transfer">이체</Radio>
  </>
);

const meta = {
  title: 'Components/Choice/RadioGroup',
  id: 'components-radiogroup',
  component: RadioGroup,
  subcomponents: { Radio },
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
          'A native fieldset and radio group for one-of-many choices, with shared description and error feedback.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: DEFAULT_OPTIONS,
    defaultValue: 'expense',
    description: '한 가지 거래 구분을 선택합니다.',
    label: '거래 구분',
  },
};

export const Variants: Story = {
  args: {
    children: DEFAULT_OPTIONS,
    label: '거래 구분',
  },
  render: () => (
    <Stack gap="xl">
      <RadioGroup defaultValue="expense" label="세로 배치">
        {DEFAULT_OPTIONS}
      </RadioGroup>
      <RadioGroup
        defaultValue="income"
        label="가로 배치"
        orientation="horizontal"
      >
        {DEFAULT_OPTIONS}
      </RadioGroup>
    </Stack>
  ),
};

export const States: Story = {
  args: {
    children: DEFAULT_OPTIONS,
    label: '거래 구분',
  },
  render: () => (
    <Stack gap="xl">
      <RadioGroup defaultValue="expense" label="기본 상태">
        {DEFAULT_OPTIONS}
      </RadioGroup>
      <RadioGroup error="거래 구분을 선택하세요" label="오류 상태" required>
        {DEFAULT_OPTIONS}
      </RadioGroup>
      <RadioGroup defaultValue="expense" disabled label="비활성 상태">
        {DEFAULT_OPTIONS}
      </RadioGroup>
    </Stack>
  ),
};

export const Accessibility: Story = {
  args: {
    children: DEFAULT_OPTIONS,
    defaultValue: 'expense',
    description: 'Arrow keys move selection within the native radio group.',
    label: '키보드 거래 구분',
  },
  play: async ({ canvas, userEvent }): Promise<void> => {
    const expense = canvas.getByRole('radio', { name: '지출' });
    const income = canvas.getByRole('radio', { name: '수입' });

    await userEvent.tab();
    await expect(expense).toHaveFocus();
    await userEvent.keyboard('[ArrowDown]');
    await expect(income).toHaveFocus();
    await expect(income).toBeChecked();
  },
};
