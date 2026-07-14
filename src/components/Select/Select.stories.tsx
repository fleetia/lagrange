import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { Select } from './Select';

const CATEGORY_OPTIONS = (
  <>
    <option value="cafe">식비 › 카페</option>
    <option value="meal">식비 › 외식</option>
    <option value="transport">교통비 › 대중교통</option>
  </>
);

const meta = {
  title: 'Components/Input/Select',
  id: 'components-select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Native select interaction을 유지하면서 FormField의 label, description, required, error ARIA contract를 소비하는 compact control입니다.',
      },
    },
  },
  decorators: [
    (Story): ReactElement => (
      <ThemeRoot style={{ maxWidth: 420, minHeight: 240, padding: 24 }}>
        <Story />
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  args: {
    'aria-label': '카테고리',
    children: CATEGORY_OPTIONS,
    defaultValue: 'cafe',
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <Stack gap="md">
      <FormField label="카테고리">
        <Select defaultValue="cafe">{CATEGORY_OPTIONS}</Select>
      </FormField>
      <FormField label="결제 수단">
        <Select defaultValue="card">
          <option value="card">신용카드</option>
          <option value="cash">현금</option>
          <option value="account">생활비 통장</option>
        </Select>
      </FormField>
    </Stack>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <Stack gap="md">
      <FormField label="기본">
        <Select defaultValue="cafe">{CATEGORY_OPTIONS}</Select>
      </FormField>
      <FormField error="카테고리를 선택하세요." label="오류" required>
        <Select defaultValue="">
          <option disabled value="">
            선택하세요
          </option>
          {CATEGORY_OPTIONS}
        </Select>
      </FormField>
      <FormField label="비활성">
        <Select defaultValue="cafe" disabled>
          {CATEGORY_OPTIONS}
        </Select>
      </FormField>
    </Stack>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <FormField
      description="한 가지 거래 카테고리를 선택하세요."
      label="거래 카테고리"
      required
    >
      <Select defaultValue="cafe">{CATEGORY_OPTIONS}</Select>
    </FormField>
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const select = canvas.getByRole('combobox', { name: '거래 카테고리' });
    const description = canvas.getByText(
      '한 가지 거래 카테고리를 선택하세요.',
    );

    await userEvent.tab();
    await expect(select).toHaveFocus();
    await userEvent.selectOptions(select, 'transport');
    await expect(select).toHaveValue('transport');
    await expect(select).toBeRequired();
    await expect(select.getAttribute('aria-describedby')).toContain(
      description.id,
    );
  },
};
