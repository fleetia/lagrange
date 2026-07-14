import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    children: <path d="M4 12h16M12 4v16" />,
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    decorative: true,
  },
  render: (args): ReactElement => (
    <ThemeRoot>
      <Icon {...args} />
    </ThemeRoot>
  ),
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Icon size="sm"><path d="M4 12h16" /></Icon>{' '}
      <Icon size="md"><path d="M4 12h16" /></Icon>{' '}
      <Icon size="lg"><path d="M4 12h16" /></Icon>
    </ThemeRoot>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <span style={{ color: 'currentColor' }}>
        <Icon><circle cx="12" cy="12" r="8" /></Icon>
      </span>{' '}
      <span style={{ color: 'var(--lagrange-color-vermilion, #a53d2c)' }}>
        <Icon><path d="M12 4v10m0 4v.01" /></Icon>
      </span>
    </ThemeRoot>
  ),
};

export const Accessibility: Story = {
  render: (): ReactElement => (
    <ThemeRoot>
      <Icon decorative={false} label="업로드 완료">
        <path d="m5 12 4 4L19 6" />
      </Icon>
    </ThemeRoot>
  ),
};
