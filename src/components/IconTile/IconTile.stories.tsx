import type { ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { tokens } from '../../theme/tokens';
import { Icon } from '../Icon/Icon';
import { Text } from '../Typography/Typography';
import { IconTile } from './IconTile';

const BOOKMARK_ICON = (
  <Icon>
    <path d="M6 4h12v16l-6-4-6 4V4Z" />
  </Icon>
);
const LONG_LABEL =
  '회사의 전체 프로젝트와 디자인 자료를 모아 보는 북마크 폴더 '.repeat(16);

function ActivationExample(): ReactElement {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{ display: 'grid', gap: tokens.space.md, justifyItems: 'start' }}
    >
      <IconTile
        icon={BOOKMARK_ICON}
        label="키보드로 자료 열기"
        onClick={() => setCount((current) => current + 1)}
      />
      <output aria-live="polite" role="status">
        Opened {count} times
      </output>
    </div>
  );
}

function ScrollingExample({
  preventArrow = false,
}: {
  preventArrow?: boolean;
}): ReactElement {
  const [activations, setActivations] = useState(0);
  const [handledKeys, setHandledKeys] = useState(0);

  return (
    <div
      style={{
        display: 'grid',
        gap: tokens.space.md,
        justifyItems: 'start',
        minHeight: '150vh',
      }}
    >
      <div>
        <IconTile
          data-testid="scrollable-tile"
          icon={BOOKMARK_ICON}
          label={LONG_LABEL}
          onClick={() => setActivations((current) => current + 1)}
          onKeyDown={(event) => {
            if (preventArrow && event.key === 'ArrowDown') {
              event.preventDefault();
              setHandledKeys((current) => current + 1);
            }
          }}
          style={{ height: 300, width: 120 }}
        />
        <output aria-live="polite" data-testid="activations" role="status">
          Opened {activations} times
        </output>
        {preventArrow ? (
          <output data-testid="handled-keys">Handled {handledKeys} keys</output>
        ) : null}
      </div>
    </div>
  );
}

const meta = {
  title: 'Components/Command/IconTile',
  id: 'components-icontile',
  component: IconTile,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'IconTile은 아이콘과 이름을 담는 native button입니다. 세로형 이름은 남은 높이 안에서 줄바꿈되며 긴 이름은 안쪽에서 스크롤합니다. 버튼에 포커스한 상태로 방향키, PageUp·PageDown, Home·End를 사용하고 Enter·Space로 실행합니다.',
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
  args: { icon: BOOKMARK_ICON, label: '자료 모아보기' },
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    iconSize: { control: { type: 'range', min: 16, max: 32, step: 1 } },
  },
} satisfies Meta<typeof IconTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (): ReactElement => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: tokens.space.xl,
      }}
    >
      {[28, 32].map((size) => (
        <div key={size} style={{ display: 'grid', gap: tokens.space.sm }}>
          <Text variant="caption">80px / {size}px icon</Text>
          <IconTile
            data-testid={`compact-${size}`}
            icon={BOOKMARK_ICON}
            iconSize={size}
            label="자료 모아보기"
            style={{ height: 80, width: 80 }}
          />
        </div>
      ))}
      <div style={{ display: 'grid', gap: tokens.space.sm }}>
        <Text variant="caption">300px</Text>
        <IconTile
          data-testid="tall-normal"
          icon={BOOKMARK_ICON}
          label="팀의 프로젝트 자료를 모아 보는 북마크 폴더"
          style={{ height: 300, width: 120 }}
        />
      </div>
      <div style={{ display: 'grid', gap: tokens.space.sm }}>
        <Text variant="caption">Horizontal</Text>
        <IconTile
          data-testid="horizontal"
          icon={BOOKMARK_ICON}
          label="팀의 프로젝트 자료를 모아 보는 북마크 폴더"
          layout="horizontal"
          style={{ height: 64, width: 240 }}
        />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: (): ReactElement => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: tokens.space.xl,
      }}
    >
      <IconTile icon={BOOKMARK_ICON} label="자료 모아보기" />
      <IconTile disabled icon={BOOKMARK_ICON} label="사용할 수 없는 자료" />
      <IconTile
        data-testid="tall-overflow"
        icon={BOOKMARK_ICON}
        label={LONG_LABEL}
        style={{ height: 300, width: 120 }}
      />
    </div>
  ),
};

export const Accessibility: Story = {
  render: ActivationExample,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const tile = canvas.getByRole('button', { name: '키보드로 자료 열기' });
    await userEvent.tab();
    await expect(tile).toHaveFocus();
    await userEvent.keyboard('{Enter}[Space]');
    await expect(canvas.getByRole('status')).toHaveTextContent(
      'Opened 2 times',
    );
  },
};

export const Scrollable: Story = {
  render: (): ReactElement => <ScrollingExample />,
};

export const ConsumerKeys: Story = {
  render: (): ReactElement => <ScrollingExample preventArrow />,
};
