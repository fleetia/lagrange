import type { ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { ColorField } from './ColorField';

const meta = {
  title: 'Components/Input/ColorField',
  id: 'components-colorfield',
  component: ColorField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CSS color 입력, native color picker, optional alpha control을 하나의 FormField-compatible value contract로 묶습니다. Commit된 값은 normalized hex string으로 전달합니다.',
      },
    },
  },
  decorators: [
    (Story): ReactElement => (
      <ThemeRoot style={{ maxWidth: 420, padding: 24 }}>
        <Story />
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  args: {
    'aria-label': '강조색',
    defaultValue: '#663399',
  },
} satisfies Meta<typeof ColorField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <Stack gap="md">
      <FormField label="불투명 색">
        <ColorField defaultValue="hsl(270, 50%, 40%)" />
      </FormField>
      <FormField label="Alpha 색">
        <ColorField defaultValue="rgba(102, 51, 153, 0.5)" showAlpha />
      </FormField>
    </Stack>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <Stack gap="md">
      <FormField label="기본"><ColorField defaultValue="#663399" /></FormField>
      <FormField label="읽기 전용"><ColorField defaultValue="#667744" readOnly /></FormField>
      <FormField label="비활성"><ColorField defaultValue="#9b4635" disabled /></FormField>
      <FormField error="지원하는 CSS color 형식을 입력하세요." label="오류">
        <ColorField defaultValue="#663399" />
      </FormField>
    </Stack>
  ),
};

function AccessibleColorField(): ReactElement {
  const [value, setValue] = useState('#66339980');

  return (
    <Stack gap="sm">
      <FormField label="오버레이 색">
        <ColorField onValueChange={setValue} showAlpha value={value} />
      </FormField>
      <output aria-live="polite">normalized: {value}</output>
    </Stack>
  );
}

export const Accessibility: Story = {
  render: AccessibleColorField,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const input = canvas.getByRole('textbox', { name: '오버레이 색' });

    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, 'rgba(255, 99, 71, 0.5){Enter}');
    await expect(input).toHaveValue('#ff634780');
    await expect(canvas.getByRole('status')).toHaveTextContent(
      'normalized: #ff634780',
    );

    await userEvent.clear(input);
    await userEvent.type(input, '#12{Escape}');
    await expect(input).toHaveValue('#ff634780');
  },
};
