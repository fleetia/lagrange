import type { ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { Combobox } from './Combobox';

const OPTIONS = [
  { description: '식비', label: '식비 › 카페', value: 'cafe' },
  { description: '식비', label: '식비 › 외식', value: 'meal' },
  { description: '버스, 지하철', label: '교통비 › 대중교통', value: 'transit' },
  { disabled: true, label: '사용 중지 카테고리', value: 'disabled' },
] as const;

const PAYMENT_OPTIONS = [
  { label: '체크카드', value: 'check-card' },
  { label: '신용카드', value: 'credit-card' },
  { label: '현금', value: 'cash' },
] as const;

const meta = {
  title: 'Components/Input/Combobox',
  id: 'components-combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component:
          '입력값으로 option을 좁히고 keyboard navigation으로 선택하는 FormField-compatible combobox입니다. Controlled와 uncontrolled value를 모두 지원합니다.',
      },
    },
  },
  decorators: [
    (Story): ReactElement => (
      <ThemeRoot style={{ minHeight: 280, padding: 32 }}>
        <div style={{ maxWidth: 360 }}>
          <Story />
        </div>
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  args: {
    'aria-label': '카테고리',
    options: OPTIONS,
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap="lg">
      <FormField label="설명 포함 옵션" marker="V1">
        <Combobox defaultValue="cafe" options={OPTIONS} />
      </FormField>
      <FormField label="단순 옵션" marker="V2">
        <Combobox defaultValue="check-card" options={PAYMENT_OPTIONS} />
      </FormField>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="lg">
      <FormField label="기본" marker="C1">
        <Combobox defaultValue="cafe" options={OPTIONS} />
      </FormField>
      <FormField error="카테고리를 선택하세요" label="오류" marker="C2">
        <Combobox options={OPTIONS} />
      </FormField>
      <FormField label="비활성" marker="C3">
        <Combobox disabled options={OPTIONS} />
      </FormField>
      <FormField label="읽기 전용" marker="C4">
        <Combobox defaultValue="meal" options={OPTIONS} readOnly />
      </FormField>
    </Stack>
  ),
};

function AccessibleCombobox(): ReactElement {
  const [value, setValue] = useState('');

  return (
    <Stack gap="sm">
      <FormField
        description="카테고리 이름을 입력하거나 방향키로 선택하세요."
        label="거래 카테고리"
        required
      >
        <Combobox onValueChange={setValue} options={OPTIONS} value={value} />
      </FormField>
      <output aria-live="polite" role="status">
        선택된 값: {value || '없음'}
      </output>
    </Stack>
  );
}

export const Accessibility: Story = {
  render: AccessibleCombobox,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const input = canvas.getByRole('combobox', { name: '거래 카테고리' });

    await userEvent.tab();
    await expect(input).toHaveFocus();
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.type(input, '교통');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(input).toHaveValue('교통비 › 대중교통');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await expect(canvas.getByRole('status')).toHaveTextContent(
      '선택된 값: transit',
    );
  },
};

function ControlledCombobox(): ReactElement {
  const [value, setValue] = useState('');

  return (
    <Stack gap="sm">
      <FormField label="카테고리" marker="K1">
        <Combobox
          data-testid="keyboard-combobox"
          onValueChange={setValue}
          options={OPTIONS}
          value={value}
        />
      </FormField>
      <output data-testid="selected-value">{value || '선택 대기'}</output>
    </Stack>
  );
}

export const KeyboardSelection: Story = {
  render: ControlledCombobox,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const input = canvas.getByRole('combobox', { name: '카테고리' });

    await userEvent.click(input);
    await userEvent.type(input, '교통');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(canvas.getByTestId('selected-value')).toHaveTextContent(
      'transit',
    );
  },
};
