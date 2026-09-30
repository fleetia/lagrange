import { createRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi, type Mock } from 'vitest';

import { IconTile } from './IconTile';

afterEach(cleanup);

function mockLabelScroll(
  button: HTMLElement,
  scrollHeight = 400,
): {
  label: HTMLSpanElement;
  scrollTo: Mock<(options: ScrollToOptions) => void>;
} {
  const label = button.querySelector('[data-lagrange-part="icon-tile-label"]');
  if (!(label instanceof HTMLSpanElement)) {
    throw new Error('IconTile label is missing');
  }

  const scrollTo = vi.fn<(options: ScrollToOptions) => void>();
  Object.defineProperties(label, {
    clientHeight: { configurable: true, value: 60 },
    scrollHeight: { configurable: true, value: scrollHeight },
    scrollTo: { configurable: true, value: scrollTo },
  });
  label.style.lineHeight = '20px';
  label.scrollTop = 80;

  return { label, scrollTo };
}

function dispatchKey(
  button: HTMLElement,
  key: string,
  options: KeyboardEventInit = {},
): KeyboardEvent {
  const event = new KeyboardEvent('keydown', {
    ...options,
    bubbles: true,
    cancelable: true,
    key,
  });
  fireEvent(button, event);
  return event;
}

describe('IconTile', () => {
  it('keeps the full accessible name and forwards native button options', () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();

    render(
      <IconTile
        ref={ref}
        className="consumer-class"
        icon={<span>★</span>}
        iconSize={32}
        label="A long bookmark name that stays available"
        onClick={onClick}
        style={{ height: 300 }}
      />,
    );

    const button = screen.getByRole('button', {
      name: 'A long bookmark name that stays available',
    });
    fireEvent.click(button);

    expect(ref.current).toBe(button);
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('data-layout')).toBe('vertical');
    expect(button.className).toContain('consumer-class');
    expect(button.style.height).toBe('300px');
    expect(
      button.style.getPropertyValue('--lagrange-icon-tile-icon-size'),
    ).toBe('32px');
    expect(
      button
        .querySelector('[data-lagrange-part="icon-tile-icon"]')
        ?.getAttribute('aria-hidden'),
    ).toBe('true');
    expect(button.querySelector('[tabindex], button, a, input')).toBeNull();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('allows an explicit accessible name', () => {
    render(<IconTile aria-label="Open bookmark" icon="★" label="Bookmark" />);

    expect(screen.getByRole('button', { name: 'Open bookmark' })).toBeDefined();
  });

  it('supports consumer label hooks while retaining the button name', () => {
    const labelProps = {
      className: 'resource-label',
      'data-consumer-part': 'resource-label',
      title: 'Bookmark title',
    };
    render(<IconTile icon="★" label="Bookmark" labelProps={labelProps} />);
    const button = screen.getByRole('button', { name: 'Bookmark' });
    const label = button.querySelector('[data-consumer-part="resource-label"]');

    expect(label?.textContent).toBe('Bookmark');
    expect(label?.className).toContain('resource-label');
    expect(label?.getAttribute('title')).toBe('Bookmark title');
    expect(label?.hasAttribute('tabindex')).toBe(false);
  });

  it.each([
    ['ArrowUp', 60],
    ['ArrowDown', 100],
    ['PageUp', 20],
    ['PageDown', 140],
    ['Home', 0],
    ['End', 400],
  ])('scrolls overflowing labels with %s', (key, top) => {
    render(<IconTile icon="★" label="Bookmark" />);
    const button = screen.getByRole('button', { name: 'Bookmark' });
    const { scrollTo } = mockLabelScroll(button);

    const event = dispatchKey(button, key);

    expect(event.defaultPrevented).toBe(true);
    expect(scrollTo).toHaveBeenCalledExactlyOnceWith({ top });
  });

  it.each(['Enter', ' ', 'ArrowLeft', 'Escape'])(
    'preserves native handling of %s',
    (key) => {
      render(<IconTile icon="★" label="Bookmark" />);
      const button = screen.getByRole('button', { name: 'Bookmark' });
      const { scrollTo } = mockLabelScroll(button);

      const event = dispatchKey(button, key);

      expect(event.defaultPrevented).toBe(false);
      expect(scrollTo).not.toHaveBeenCalled();
    },
  );

  it('gives consumer keyboard handling priority', () => {
    const onKeyDown = vi.fn(
      (event: ReactKeyboardEvent<HTMLButtonElement>): void => {
        event.preventDefault();
      },
    );
    render(<IconTile icon="★" label="Bookmark" onKeyDown={onKeyDown} />);
    const button = screen.getByRole('button', { name: 'Bookmark' });
    const { scrollTo } = mockLabelScroll(button);

    dispatchKey(button, 'ArrowDown');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it.each([{ altKey: true }, { ctrlKey: true }, { metaKey: true }])(
    'preserves modified browser shortcuts: %o',
    (options) => {
      render(<IconTile icon="★" label="Bookmark" />);
      const button = screen.getByRole('button', { name: 'Bookmark' });
      const { scrollTo } = mockLabelScroll(button);

      const event = dispatchKey(button, 'Home', options);

      expect(event.defaultPrevented).toBe(false);
      expect(scrollTo).not.toHaveBeenCalled();
    },
  );

  it('keeps page navigation available when the label fits', () => {
    render(<IconTile icon="★" label="Bookmark" />);
    const button = screen.getByRole('button', { name: 'Bookmark' });
    const { scrollTo } = mockLabelScroll(button, 60);

    const event = dispatchKey(button, 'PageDown');

    expect(event.defaultPrevented).toBe(false);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('preserves native scrolling when the browser focuses the label', () => {
    render(<IconTile icon="★" label="Bookmark" />);
    const button = screen.getByRole('button', { name: 'Bookmark' });
    const { label, scrollTo } = mockLabelScroll(button);

    const event = dispatchKey(label, 'PageDown');

    expect(event.defaultPrevented).toBe(false);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('keeps horizontal labels from consuming scroll keys', () => {
    render(<IconTile icon="★" label="Bookmark" layout="horizontal" />);
    const button = screen.getByRole('button', { name: 'Bookmark' });
    const { scrollTo } = mockLabelScroll(button);

    const event = dispatchKey(button, 'ArrowDown');

    expect(event.defaultPrevented).toBe(false);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('uses native disabled behavior', () => {
    const onClick = vi.fn();
    render(<IconTile disabled icon="★" label="Bookmark" onClick={onClick} />);
    const button = screen.getByRole('button', { name: 'Bookmark' });

    fireEvent.click(button);

    expect(button.hasAttribute('disabled')).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
  });
});
