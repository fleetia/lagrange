import type { CSSProperties, ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../../theme/ThemeRoot';
import { tokens } from '../../../theme/tokens';
import { Select } from '../../Select/Select';
import { TextField } from '../../TextField/TextField';
import { FormField } from '../FormField';

const FIELD_GRID_STYLE: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))',
  alignItems: 'start',
  gap: tokens.space.xl,
};

const meta = {
  title: 'Components/Input/FormField',
  id: 'components-form-controls',
  component: FormField,
  subcomponents: { Select, TextField },
  args: {
    children: <TextField defaultValue="카페라떼" />,
    label: '내용',
    marker: 'A1',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'FormField가 label, marker, description, error와 control ARIA를 연결하고 TextField와 Select가 native interaction을 유지합니다.',
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
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (): ReactElement => (
    <div style={FIELD_GRID_STYLE}>
      <FormField
        description="자유롭게 거래 내용을 기록합니다."
        label="내용"
        marker="V1"
      >
        <TextField defaultValue="카페라떼" />
      </FormField>
      <FormField
        description="등록된 분류 중 하나를 선택합니다."
        label="카테고리"
        marker="V2"
      >
        <Select defaultValue="cafe">
          <option value="cafe">식비 › 카페</option>
          <option value="transport">교통비 › 대중교통</option>
        </Select>
      </FormField>
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div style={FIELD_GRID_STYLE}>
      <FormField description="기본 입력 상태" label="기본" marker="S1">
        <TextField defaultValue="카페라떼" />
      </FormField>
      <FormField error="내용을 입력하세요" label="오류" marker="S2" required>
        <TextField defaultValue="" />
      </FormField>
      <FormField
        description="수정할 수 없는 확정 값"
        label="읽기 전용"
        marker="S3"
      >
        <TextField defaultValue="정기 지출" readOnly />
      </FormField>
      <FormField
        description="현재 사용할 수 없음"
        label="비활성"
        marker="S4"
      >
        <TextField defaultValue="잠긴 계정" disabled />
      </FormField>
    </div>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <FormField
      description="거래를 식별할 수 있는 메모를 입력하세요."
      error="메모를 입력하세요."
      label="메모"
      marker="A1"
      required
    >
      <TextField defaultValue="" />
    </FormField>
  ),
  play: async ({ canvas }): Promise<void> => {
    const control = canvas.getByRole('textbox', { name: '메모' });
    const description = canvas.getByText(
      '거래를 식별할 수 있는 메모를 입력하세요.',
    );
    const error = canvas.getByRole('alert');
    const describedBy = control.getAttribute('aria-describedby') ?? '';

    await expect(control).toBeRequired();
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(describedBy).toContain(description.id);
    await expect(describedBy).toContain(error.id);
  },
};

export const KeyboardFlow: Story = {
  render: (): ReactElement => (
    <div style={FIELD_GRID_STYLE}>
      <FormField label="내용" marker="K1">
        <TextField defaultValue="" />
      </FormField>
      <FormField label="카테고리" marker="K2">
        <Select defaultValue="cafe">
          <option value="cafe">식비 › 카페</option>
          <option value="transport">교통비 › 대중교통</option>
        </Select>
      </FormField>
    </div>
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const textField = canvas.getByRole('textbox', { name: '내용' });
    const select = canvas.getByRole('combobox', { name: '카테고리' });

    await userEvent.tab();
    await expect(textField).toHaveFocus();
    await userEvent.type(textField, '버스 정기권');
    await userEvent.tab();
    await expect(select).toHaveFocus();
    await userEvent.selectOptions(select, 'transport');
    await expect(textField).toHaveValue('버스 정기권');
    await expect(select).toHaveValue('transport');
  },
};
