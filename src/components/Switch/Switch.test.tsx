import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';

afterEach(cleanup);

describe('Switch', () => {
  it('exposes native checkbox state through the switch role', () => {
    render(<Switch defaultChecked>자동 기록</Switch>);

    const control = screen.getByRole<HTMLInputElement>('switch', {
      name: '자동 기록',
    });

    expect(control.type).toBe('checkbox');
    expect(control.checked).toBe(true);
  });

  it('toggles from its visible label and forwards change', () => {
    const handleChange = vi.fn();

    render(<Switch onChange={handleChange}>주말 알림</Switch>);
    const control = screen.getByRole<HTMLInputElement>('switch', {
      name: '주말 알림',
    });

    fireEvent.click(screen.getByText('주말 알림'));

    expect(control.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('associates descriptions and prevents disabled activation', () => {
    render(
      <Switch disabled description="관리자가 설정한 항목">
        자동 분류
      </Switch>,
    );

    const control = screen.getByRole<HTMLInputElement>('switch', {
      name: '자동 분류',
    });
    const descriptionId = control.getAttribute('aria-describedby');

    fireEvent.click(screen.getByText('자동 분류'));

    expect(control.checked).toBe(false);
    expect(document.getElementById(descriptionId ?? '')?.textContent).toBe(
      '관리자가 설정한 항목',
    );
  });
});
