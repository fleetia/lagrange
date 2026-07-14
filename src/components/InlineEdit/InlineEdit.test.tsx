import type { KeyboardEvent } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { InlineEdit } from './InlineEdit';

afterEach(cleanup);

describe('InlineEdit', () => {
  it('commits a changed value with Enter', () => {
    const handleCommit = vi.fn();
    render(
      <InlineEdit
        ariaLabel="내용"
        onCommit={handleCommit}
        value="카페라떼"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '내용 수정' }));
    const input = screen.getByRole('textbox', { name: '내용' });
    fireEvent.change(input, { target: { value: '점심 식사' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleCommit).toHaveBeenCalledWith('점심 식사');
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: '내용 수정' }),
    );
  });

  it('restores the current value with Escape without committing', () => {
    const handleCancel = vi.fn();
    const handleCommit = vi.fn();
    render(
      <InlineEdit
        ariaLabel="내용"
        onCancel={handleCancel}
        onCommit={handleCommit}
        value="카페라떼"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '내용 수정' }));
    const input = screen.getByRole('textbox', { name: '내용' });
    fireEvent.change(input, { target: { value: '취소할 값' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(handleCommit).not.toHaveBeenCalled();
    expect(screen.getByText('카페라떼')).toBeDefined();
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: '내용 수정' }),
    );
  });

  it('keeps read-only values out of the editing state', () => {
    render(
      <InlineEdit ariaLabel="내용" onCommit={vi.fn()} readOnly value="고정값" />,
    );

    const trigger = screen.getByRole('button', { name: '내용 수정' });
    fireEvent.click(trigger);

    expect(trigger.hasAttribute('disabled')).toBe(true);
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it.each(['disabled', 'readOnly'] as const)(
    'ends editing without committing when %s becomes true',
    (state) => {
      const handleCommit = vi.fn();
      const { rerender } = render(
        <InlineEdit ariaLabel="내용" onCommit={handleCommit} value="초기 값" />,
      );

      fireEvent.click(screen.getByRole('button', { name: '내용 수정' }));
      fireEvent.change(screen.getByRole('textbox', { name: '내용' }), {
        target: { value: '권한 변경 뒤 값' },
      });
      rerender(
        <InlineEdit
          ariaLabel="내용"
          onCommit={handleCommit}
          value="초기 값"
          {...{ [state]: true }}
        />,
      );

      expect(screen.queryByRole('textbox', { name: '내용' })).toBeNull();
      expect(handleCommit).not.toHaveBeenCalled();
      expect(
        screen.getByRole('button', { name: '내용 수정' }).hasAttribute(
          'disabled',
        ),
      ).toBe(true);
    },
  );

  it('composes input handlers and accessible descriptions', () => {
    const handleBlur = vi.fn();
    const handleKeyDown = vi.fn((event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
    });
    render(
      <>
        <p id="format-help">날짜 형식</p>
        <InlineEdit
          ariaLabel="내용"
          inputProps={{
            'aria-describedby': 'format-help',
            'aria-invalid': 'grammar',
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
          }}
          onCommit={vi.fn()}
          value="초기 값"
        />
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: '내용 수정' }));
    const input = screen.getByRole('textbox', { name: '내용' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    expect(input.getAttribute('aria-describedby')).toBe('format-help');
    expect(input.getAttribute('aria-invalid')).toBe('grammar');
    expect(screen.queryByRole('button', { name: '내용 수정' })).toBeNull();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
