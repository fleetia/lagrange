import type { ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { Text } from '../Typography/Typography';
import { NumberField } from './NumberField';

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    'aria-label': '수량',
    defaultValue: '12500.50',
  },
} satisfies Meta<typeof NumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledNumberField(): ReactElement {
  const [rawValue, setRawValue] = useState('12500.50');

  return (
    <ThemeRoot>
      <FormField description={`raw: ${rawValue}`} label="측정값">
        <NumberField
          onRawValueChange={setRawValue}
          prefix="≈"
          suffix="units"
          value={rawValue}
        />
      </FormField>
    </ThemeRoot>
  );
}

export const Default: Story = {
  render: (args): ReactElement => (
    <ThemeRoot><NumberField {...args} /></ThemeRoot>
  ),
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Stack gap="md">
        <FormField label="접두·접미"><NumberField defaultValue="12500" prefix="≈" suffix="units" /></FormField>
        <FormField label="음수"><NumberField defaultValue="-42.75" /></FormField>
        <FormField label="포맷 없음"><NumberField defaultValue="12500.50" formatOnBlur={false} /></FormField>
      </Stack>
    </ThemeRoot>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Stack gap="md">
        <FormField label="기본"><NumberField defaultValue="12500" /></FormField>
        <FormField label="읽기 전용"><NumberField defaultValue="12500" readOnly /></FormField>
        <FormField label="비활성"><NumberField defaultValue="12500" disabled /></FormField>
        <FormField error="숫자를 확인하세요." label="오류"><NumberField defaultValue="-12" /></FormField>
      </Stack>
    </ThemeRoot>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <Stack gap="sm">
      <ControlledNumberField />
      <Text variant="caption">포커스 중에는 raw string, blur 후에는 formatted string을 표시합니다.</Text>
    </Stack>
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const input = canvas.getByRole('textbox', { name: '측정값' });

    await userEvent.click(input);
    await expect(input).toHaveValue('12500.50');
    await userEvent.clear(input);
    await userEvent.type(input, '9876.50');
    await userEvent.tab();
    await expect(input).toHaveValue('9,876.50');
    await expect(canvas.getByText('raw: 9876.50')).toBeVisible();
  },
};
