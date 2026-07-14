import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { DateField } from './DateField';

const meta = {
  title: 'Components/DateField',
  component: DateField,
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
          'A native date input with tabular typography and FormField context support.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormField label="거래일" marker="D1" required>
      <DateField defaultValue="2026-07-14" />
    </FormField>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack gap="xl">
      <FormField label="기본 날짜" marker="D1">
        <DateField defaultValue="2026-07-14" />
      </FormField>
      <FormField description="회계 기간 안에서만 선택할 수 있습니다." label="범위 제한" marker="D2">
        <DateField
          defaultValue="2026-07-14"
          max="2026-07-31"
          min="2026-07-01"
        />
      </FormField>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="xl">
      <FormField label="기본 상태" marker="S1">
        <DateField defaultValue="2026-07-14" />
      </FormField>
      <FormField label="읽기 전용" marker="S2">
        <DateField defaultValue="2026-07-14" readOnly />
      </FormField>
      <FormField error="회계 기간에 포함된 날짜를 선택하세요" label="오류 상태" marker="S3">
        <DateField defaultValue="2025-12-31" />
      </FormField>
      <FormField label="비활성 상태" marker="S4">
        <DateField defaultValue="2026-07-14" disabled />
      </FormField>
    </Stack>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <FormField
      description="키보드와 운영체제의 native date picker를 그대로 사용합니다."
      label="키보드 거래일"
      required
    >
      <DateField defaultValue="2026-07-14" />
    </FormField>
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const input = canvas.getByLabelText('키보드 거래일*');

    await userEvent.tab();
    await expect(input).toHaveFocus();
    await expect(input).toHaveAttribute('type', 'date');
    await expect(input).toHaveAttribute('aria-required', 'true');
  },
};
