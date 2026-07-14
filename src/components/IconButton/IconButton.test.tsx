import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Icon } from '../Icon/Icon';
import { IconButton } from './IconButton';

afterEach(cleanup);

describe('IconButton', () => {
  it('requires an accessible name while keeping its icon decorative', () => {
    render(
      <IconButton label="거래 수정">
        <Icon><path d="M4 20h4L19 9l-4-4L4 16v4Z" /></Icon>
      </IconButton>,
    );

    const button = screen.getByRole('button', { name: '거래 수정' });

    expect(button.getAttribute('type')).toBe('button');
    expect(button.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('forwards activation and visual options', () => {
    const handleClick = vi.fn();

    render(
      <IconButton
        className="consumer-class"
        label="삭제"
        onClick={handleClick}
        size="compact"
        variant="critical"
      >
        ×
      </IconButton>,
    );
    const button = screen.getByRole('button', { name: '삭제' });

    fireEvent.click(button);

    expect(button.className).toContain('consumer-class');
    expect(button.getAttribute('data-size')).toBe('compact');
    expect(button.getAttribute('data-variant')).toBe('critical');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses native disabled behavior', () => {
    const handleClick = vi.fn();

    render(
      <IconButton disabled label="수정" onClick={handleClick}>
        ↗
      </IconButton>,
    );
    const button = screen.getByRole('button', { name: '수정' });

    fireEvent.click(button);

    expect(button.hasAttribute('disabled')).toBe(true);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
