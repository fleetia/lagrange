import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { TextField } from './TextField';

const meta = {
  title: 'Components/Input/TextField',
  id: 'components-textfield',
  component: TextField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Native input props를 유지하면서 FormField의 label, description, required, error ARIA contract를 소비하는 underline text control입니다.',
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
    'aria-label': '내용',
    placeholder: '거래 내용을 입력하세요.',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <Stack gap="md">
      <FormField label="Text input">
        <TextField defaultValue="카페라떼" />
      </FormField>
      <FormField label="Email input">
        <TextField defaultValue="hello@example.com" type="email" />
      </FormField>
      <FormField label="Search input">
        <TextField placeholder="기록 검색" type="search" />
      </FormField>
    </Stack>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <Stack gap="md">
      <FormField label="기본">
        <TextField defaultValue="수정할 수 있는 값" />
      </FormField>
      <FormField label="읽기 전용">
        <TextField defaultValue="확정된 값" readOnly />
      </FormField>
      <FormField label="비활성">
        <TextField defaultValue="잠긴 값" disabled />
      </FormField>
      <FormField error="내용을 입력하세요." label="오류" required>
        <TextField />
      </FormField>
    </Stack>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <FormField
      description="거래를 식별할 수 있는 메모를 입력하세요."
      label="거래 메모"
      required
    >
      <TextField />
    </FormField>
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const input = canvas.getByRole('textbox', { name: '거래 메모' });
    const description = canvas.getByText(
      '거래를 식별할 수 있는 메모를 입력하세요.',
    );

    await userEvent.tab();
    await expect(input).toHaveFocus();
    await userEvent.type(input, '버스 정기권');
    await expect(input).toHaveValue('버스 정기권');
    await expect(input).toBeRequired();
    await expect(input.getAttribute('aria-describedby')).toContain(
      description.id,
    );
  },
};
