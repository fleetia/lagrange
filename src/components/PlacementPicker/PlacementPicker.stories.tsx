import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { PlacementPicker } from './PlacementPicker';

const meta = {
  title: 'Components/Input/PlacementPicker',
  id: 'components-placementpicker',
  component: PlacementPicker,
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
          'A nine-point placement radio group with spatial arrow-key navigation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlacementPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'center-center',
    label: 'Content placement',
    onValueChange: fn(),
  },
};

export const Variants: Story = {
  args: {
    label: 'Content placement',
  },
  render: () => (
    <Stack gap="xl">
      <PlacementPicker
        defaultValue="top-left"
        label="Top aligned placement"
      />
      <PlacementPicker
        defaultValue="bottom-right"
        getItemLabel={(placement) => `Layout ${placement}`}
        label="Bottom aligned placement"
      />
    </Stack>
  ),
};

export const States: Story = {
  args: {
    defaultValue: 'center-center',
    disabled: true,
    label: 'Disabled placement',
  },
};

export const Accessibility: Story = {
  args: {
    defaultValue: 'top-left',
    label: 'Keyboard placement',
    onValueChange: fn(),
  },
  play: async ({ args, canvas, userEvent }): Promise<void> => {
    const topLeft = canvas.getByRole('radio', { name: 'top-left' });
    const centerLeft = canvas.getByRole('radio', { name: 'center-left' });
    const centerCenter = canvas.getByRole('radio', {
      name: 'center-center',
    });

    await userEvent.tab();
    await expect(topLeft).toHaveFocus();
    await userEvent.keyboard('[ArrowDown]');
    await expect(centerLeft).toHaveFocus();
    await expect(centerLeft).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard('[ArrowRight]');
    await expect(centerCenter).toHaveFocus();
    await expect(centerCenter).toHaveAttribute('aria-checked', 'true');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('center-center');
  },
};
