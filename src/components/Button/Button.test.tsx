import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

afterEach(cleanup);

describe('Button', () => {
  it('uses safe native button defaults and forwards activation', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>저장</Button>);
    const button = screen.getByRole('button', { name: '저장' });

    fireEvent.click(button);

    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('data-variant')).toBe('primary');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('preserves custom classes and exposes visual variants', () => {
    render(
      <Button className="consumer-class" size="compact" variant="critical">
        삭제
      </Button>,
    );
    const button = screen.getByRole('button', { name: '삭제' });

    expect(button.className).toContain('consumer-class');
    expect(button.getAttribute('data-size')).toBe('compact');
    expect(button.getAttribute('data-variant')).toBe('critical');
  });

  it('disables activation and announces pending work', () => {
    const handleClick = vi.fn();

    render(
      <Button isPending onClick={handleClick}>
        저장 중
      </Button>,
    );
    const button = screen.getByRole('button', { name: '저장 중' });

    fireEvent.click(button);

    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(handleClick).not.toHaveBeenCalled();
  });
});
