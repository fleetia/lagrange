import type { ReactElement } from 'react';
import { StrictMode, useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ContextMenu, ContextMenuItem } from './ContextMenu';

afterEach(cleanup);

type MenuHarnessProps = {
  onSelect?: () => void;
};

function MenuHarness({ onSelect }: MenuHarnessProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        메뉴 열기
      </button>
      <button type="button">다음 작업</button>
      <ContextMenu
        anchorPoint={{ x: 20, y: 30 }}
        isOpen={isOpen}
        label="북마크 작업"
        onOpenChange={setIsOpen}
      >
        <ContextMenuItem onSelect={onSelect}>아이콘 변경</ContextMenuItem>
        <ContextMenuItem disabled>사용할 수 없음</ContextMenuItem>
        <ContextMenuItem tone="critical">북마크 삭제</ContextMenuItem>
      </ContextMenu>
    </>
  );
}

describe('ContextMenu', () => {
  it('focuses the first enabled item and closes after selection', async () => {
    const handleSelect = vi.fn();
    render(
      <StrictMode>
        <MenuHarness onSelect={handleSelect} />
      </StrictMode>,
    );
    const trigger = screen.getByRole('button', { name: '메뉴 열기' });

    trigger.focus();
    fireEvent.click(trigger);

    const firstItem = screen.getByRole('menuitem', { name: '아이콘 변경' });
    expect(firstItem).toBe(document.activeElement);
    expect(screen.getByRole('menu', { name: '북마크 작업' })).toBeDefined();

    fireEvent.click(firstItem);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
    await Promise.resolve();
    expect(trigger).toBe(document.activeElement);
  });

  it('wraps arrow navigation and skips disabled items', () => {
    render(<MenuHarness />);
    fireEvent.click(screen.getByRole('button', { name: '메뉴 열기' }));
    const firstItem = screen.getByRole('menuitem', { name: '아이콘 변경' });
    const lastItem = screen.getByRole('menuitem', { name: '북마크 삭제' });

    fireEvent.keyDown(firstItem, { key: 'ArrowDown' });
    expect(lastItem).toBe(document.activeElement);

    fireEvent.keyDown(lastItem, { key: 'ArrowDown' });
    expect(firstItem).toBe(document.activeElement);

    fireEvent.keyDown(firstItem, { key: 'End' });
    expect(lastItem).toBe(document.activeElement);

    fireEvent.keyDown(lastItem, { key: 'Home' });
    expect(firstItem).toBe(document.activeElement);
  });

  it('closes on Escape and restores focus to the trigger', async () => {
    render(<MenuHarness />);
    const trigger = screen.getByRole('button', { name: '메뉴 열기' });
    trigger.focus();
    fireEvent.click(trigger);

    fireEvent.keyDown(
      screen.getByRole('menuitem', { name: '아이콘 변경' }),
      { key: 'Escape' },
    );

    expect(screen.queryByRole('menu')).toBeNull();
    await Promise.resolve();
    expect(trigger).toBe(document.activeElement);
  });

  it('closes on Tab or an outside pointer without stealing destination focus', () => {
    render(<MenuHarness />);
    const trigger = screen.getByRole('button', { name: '메뉴 열기' });
    const nextAction = screen.getByRole('button', { name: '다음 작업' });

    fireEvent.click(trigger);
    fireEvent.keyDown(
      screen.getByRole('menuitem', { name: '아이콘 변경' }),
      { key: 'Tab' },
    );
    expect(screen.queryByRole('menu')).toBeNull();

    fireEvent.click(trigger);
    nextAction.focus();
    fireEvent.pointerDown(nextAction);

    expect(screen.queryByRole('menu')).toBeNull();
    expect(nextAction).toBe(document.activeElement);
  });

  it('keeps the menu open when an item click is prevented', () => {
    render(
      <ContextMenu
        anchorPoint={{ x: 20, y: 30 }}
        isOpen
        label="작업"
        onOpenChange={vi.fn()}
      >
        <ContextMenuItem onClick={(event) => event.preventDefault()}>
          확인 필요
        </ContextMenuItem>
      </ContextMenu>,
    );

    fireEvent.click(screen.getByRole('menuitem', { name: '확인 필요' }));

    expect(screen.getByRole('menu', { name: '작업' })).toBeDefined();
  });

  it('focuses an empty menu so Escape can still close it', () => {
    const handleOpenChange = vi.fn();
    render(
      <ContextMenu
        anchorPoint={{ x: 20, y: 30 }}
        isOpen
        label="사용할 수 없는 작업"
        onOpenChange={handleOpenChange}
      >
        <ContextMenuItem disabled>사용할 수 없음</ContextMenuItem>
      </ContextMenu>,
    );
    const menu = screen.getByRole('menu', { name: '사용할 수 없는 작업' });

    expect(document.activeElement).toBe(menu);
    fireEvent.keyDown(menu, { key: 'Escape' });
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
