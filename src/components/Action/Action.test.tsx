import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Action } from './Action';

afterEach(cleanup);

describe('Action', () => {
  it('uses a non-submitting button by default and forwards activation', () => {
    const handleClick = vi.fn();

    render(<Action onClick={handleClick}>저장 ↵</Action>);
    const action = screen.getByRole('button', { name: '저장 ↵' });

    fireEvent.click(action);

    expect(action.getAttribute('type')).toBe('button');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('preserves native disabled behavior for a quiet action', () => {
    const handleClick = vi.fn();

    render(
      <Action disabled onClick={handleClick} variant="quiet">
        삭제
      </Action>,
    );
    const action = screen.getByRole('button', { name: '삭제' });

    fireEvent.click(action);

    expect(action.hasAttribute('disabled')).toBe(true);
    expect(action.getAttribute('data-variant')).toBe('quiet');
    expect(handleClick).not.toHaveBeenCalled();
  });
});
