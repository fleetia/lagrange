import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { FormField } from '../FormField/FormField';
import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { RangeField } from './RangeField';

const meta = {
  title: 'Components/Input/RangeField',
  id: 'components-rangefield',
  component: RangeField,
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
          'A native range input with numeric value events, compact editorial styling and FormField context support.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RangeField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormField label="Icon size" marker="24 px">
      <RangeField defaultValue={24} max={32} min={16} />
    </FormField>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack gap="xl">
      <FormField label="Columns" marker="6">
        <RangeField defaultValue={6} max={10} min={3} />
      </FormField>
      <FormField label="Card gap" marker="1.5 em">
        <RangeField defaultValue={1.5} max={5} min={0} step={0.1} />
      </FormField>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="xl">
      <FormField label="Default" marker="50%">
        <RangeField defaultValue={50} />
      </FormField>
      <FormField error="Choose a value inside the supported range." label="Invalid">
        <RangeField defaultValue={90} isInvalid />
      </FormField>
      <FormField label="Disabled" marker="40%">
        <RangeField defaultValue={40} disabled />
      </FormField>
    </Stack>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <FormField
      description="Use the arrow keys to adjust one step at a time."
      label="Keyboard scale"
    >
      <RangeField defaultValue={3} max={5} min={0} step={2} />
    </FormField>
  ),
  play: async ({ canvas, userEvent }): Promise<void> => {
    const slider = canvas.getByRole('slider', { name: 'Keyboard scale' });

    await userEvent.tab();
    await expect(slider).toHaveFocus();
    await expect(slider).toHaveValue('4');
    await expect(
      slider.style.getPropertyValue('--lagrange-range-progress'),
    ).toBe('80%');
    await userEvent.keyboard('[ArrowLeft]');
    await expect(slider).toHaveValue('2');
    await expect(
      slider.style.getPropertyValue('--lagrange-range-progress'),
    ).toBe('40%');
    await expect(slider).toHaveAttribute('aria-describedby');
  },
};
