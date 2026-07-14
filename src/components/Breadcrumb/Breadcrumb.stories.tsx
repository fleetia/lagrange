import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { Stack } from '../Layout/Layout';
import { ThemeRoot } from '../../theme/ThemeRoot';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
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
          'A compact path landmark with native link or button items and an explicit current page.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Bookmark path',
    items: [
      { label: 'Bookmarks', onClick: fn() },
      { label: 'Design systems', onClick: fn() },
      { label: 'Lagrange', onClick: fn() },
    ],
  },
};

export const Variants: Story = {
  args: {
    items: [],
  },
  render: () => (
    <Stack gap="xl">
      <Breadcrumb
        aria-label="Linked path"
        items={[
          { href: '#root', label: 'Root' },
          { href: '#archive', label: 'Archive' },
        ]}
      />
      <Breadcrumb
        aria-label="Deep path"
        items={[
          { label: 'Bookmarks' },
          { label: 'Reference' },
          { label: 'Design systems' },
          { label: 'Lagrange' },
        ]}
      />
    </Stack>
  ),
};

export const States: Story = {
  args: {
    'aria-label': 'Current folder',
    items: [{ label: 'Current folder' }],
  },
};

export const Accessibility: Story = {
  args: {
    'aria-label': 'Keyboard path',
    items: [
      { href: '#bookmarks', label: 'Bookmarks' },
      { label: 'Lagrange', onClick: fn() },
    ],
  },
  play: async ({ args, canvas, userEvent }): Promise<void> => {
    const link = canvas.getByRole('link', { name: 'Bookmarks' });
    const current = canvas.getByRole('button', { name: 'Lagrange' });

    await userEvent.tab();
    await expect(link).toHaveFocus();
    await userEvent.tab();
    await expect(current).toHaveFocus();
    await userEvent.click(current);
    await expect(args.items[1]?.onClick).toHaveBeenCalledOnce();
    await expect(current).toHaveAttribute('aria-current', 'page');
  },
};
