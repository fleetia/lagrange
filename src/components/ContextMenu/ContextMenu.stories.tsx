import type { ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ThemeRoot } from '../../theme/ThemeRoot';
import { ContextMenu, ContextMenuItem } from './ContextMenu';

const meta = {
  title: 'Components/Overlay/ContextMenu',
  id: 'components-contextmenu',
  component: ContextMenu,
  subcomponents: { ContextMenuItem },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Viewport 안에 위치를 보정하는 controlled context menu입니다. ContextMenuItem은 disabled와 critical tone, keyboard selection 뒤 trigger focus 복귀를 제공합니다.',
      },
    },
  },
  decorators: [
    (Story): ReactElement => (
      <ThemeRoot style={{ minHeight: '100vh', padding: 24 }}>
        <Story />
      </ThemeRoot>
    ),
  ],
  tags: ['autodocs'],
  args: {
    anchorPoint: { x: 56, y: 72 },
    children: <ContextMenuItem>아이콘 변경</ContextMenuItem>,
    isOpen: true,
    label: '북마크 작업',
    onOpenChange: () => undefined,
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

function PreviewMenu({ disabled = false }: { disabled?: boolean }): ReactElement {
  return (
    <ContextMenu
      anchorPoint={{ x: 56, y: 72 }}
      isOpen
      label="북마크 작업"
      onOpenChange={() => undefined}
    >
      <ContextMenuItem>아이콘 변경</ContextMenuItem>
      <ContextMenuItem disabled={disabled}>아이콘 초기화</ContextMenuItem>
      <ContextMenuItem tone="critical">북마크 삭제</ContextMenuItem>
    </ContextMenu>
  );
}

export const Default: Story = {
  render: (): ReactElement => <PreviewMenu />,
};

export const Variants: Story = {
  render: (): ReactElement => (
    <ContextMenu
      anchorPoint={{ x: 10_000, y: 10_000 }}
      isOpen
      label="Viewport clamped actions"
      onOpenChange={() => undefined}
    >
      <ContextMenuItem>Open details</ContextMenuItem>
      <ContextMenuItem tone="critical">Delete permanently</ContextMenuItem>
    </ContextMenu>
  ),
};

export const States: Story = {
  render: (): ReactElement => <PreviewMenu disabled />,
};

function InteractiveContextMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState('없음');

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        북마크 메뉴 열기
      </button>
      <ContextMenu
        anchorPoint={{ x: 56, y: 96 }}
        isOpen={isOpen}
        label="북마크 작업"
        onOpenChange={setIsOpen}
      >
        <ContextMenuItem onSelect={() => setSelection('아이콘 변경')}>
          아이콘 변경
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => setSelection('아이콘 초기화')}>
          아이콘 초기화
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={() => setSelection('북마크 삭제')}
          tone="critical"
        >
          북마크 삭제
        </ContextMenuItem>
      </ContextMenu>
      <output aria-live="polite" style={{ display: 'block', marginTop: 16 }}>
        선택: {selection}
      </output>
    </>
  );
}

export const Accessibility: Story = {
  render: InteractiveContextMenu,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const trigger = canvas.getByRole('button', { name: '북마크 메뉴 열기' });

    await userEvent.click(trigger);
    const firstItem = canvas.getByRole('menuitem', { name: '아이콘 변경' });
    const secondItem = canvas.getByRole('menuitem', { name: '아이콘 초기화' });
    await expect(firstItem).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    await expect(secondItem).toHaveFocus();
    await userEvent.keyboard('{Enter}');

    await expect(canvas.getByRole('status')).toHaveTextContent(
      '선택: 아이콘 초기화',
    );
    await expect(trigger).toHaveFocus();
  },
};
