import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { themeVars } from '../../theme/themeContract.css';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Command/Icon',
  id: 'components-icon',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '현재 text color를 상속하는 SVG icon primitive입니다. Decorative icon은 accessibility tree에서 숨기고, 의미가 있으면 label을 함께 제공합니다.',
      },
    },
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
      <span style={{ color: themeVars.semantic.color.status.critical }}>
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
