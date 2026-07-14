import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { Choice, ChoiceGroup } from './ChoiceGroup';

const PERIOD_CHOICES = (
  <>
    <Choice value="day">일</Choice>
    <Choice value="week">주</Choice>
    <Choice value="month">월</Choice>
  </>
);

const meta = {
  title: 'Components/ChoiceGroup',
  component: ChoiceGroup,
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
          'Compact radio choices separated by rules and selection markers. It intentionally avoids pill styling.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChoiceGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: PERIOD_CHOICES,
    defaultValue: 'month',
    description: '조회 범위를 한 가지 선택합니다.',
    label: '조회 단위',
  },
};

export const Variants: Story = {
  args: {
    children: PERIOD_CHOICES,
    label: '조회 단위',
  },
  render: () => (
    <Stack gap="xl">
      <ChoiceGroup defaultValue="week" label="가로 배치">
        {PERIOD_CHOICES}
      </ChoiceGroup>
      <ChoiceGroup
        defaultValue="month"
        label="세로 배치"
        orientation="vertical"
      >
        {PERIOD_CHOICES}
      </ChoiceGroup>
    </Stack>
  ),
};

export const States: Story = {
  args: {
    children: PERIOD_CHOICES,
    label: '조회 단위',
  },
  render: () => (
    <Stack gap="xl">
      <ChoiceGroup defaultValue="day" label="선택 상태">
        {PERIOD_CHOICES}
      </ChoiceGroup>
      <ChoiceGroup defaultValue="week" disabled label="비활성 상태">
        {PERIOD_CHOICES}
      </ChoiceGroup>
      <ChoiceGroup label="일부 선택 비활성">
        <Choice value="day">일</Choice>
        <Choice disabled value="week">
          주
        </Choice>
        <Choice value="month">월</Choice>
      </ChoiceGroup>
    </Stack>
  ),
};

export const Accessibility: Story = {
  args: {
    children: PERIOD_CHOICES,
    defaultValue: 'day',
    description: 'Arrow keys move selection without introducing toolbar semantics.',
    label: '키보드 조회 단위',
  },
  play: async ({ canvas, userEvent }): Promise<void> => {
    const day = canvas.getByRole('radio', { name: '일' });
    const week = canvas.getByRole('radio', { name: '주' });

    await userEvent.tab();
    await expect(day).toHaveFocus();
    await userEvent.keyboard('[ArrowRight]');
    await expect(week).toHaveFocus();
    await expect(week).toBeChecked();
  },
};
