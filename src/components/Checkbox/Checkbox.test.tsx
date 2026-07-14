import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

afterEach(cleanup);

describe('Checkbox', () => {
  it('connects its visible label and description to the native checkbox', () => {
    render(
      <Checkbox description="월말에 다시 알림">반복 거래</Checkbox>,
    );

    const checkbox = screen.getByRole('checkbox', { name: '반복 거래' });
    const descriptionId = checkbox.getAttribute('aria-describedby');

    expect(descriptionId).toBeTruthy();
    expect(document.getElementById(descriptionId ?? '')?.textContent).toBe(
      '월말에 다시 알림',
    );
  });

  it('toggles through native label activation', () => {
    const handleChange = vi.fn();

    render(<Checkbox onChange={handleChange}>공유 항목</Checkbox>);
    const checkbox = screen.getByRole<HTMLInputElement>('checkbox', {
      name: '공유 항목',
    });

    fireEvent.click(screen.getByText('공유 항목'));

    expect(checkbox.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('preserves disabled and invalid native states', () => {
    render(
      <Checkbox disabled isInvalid>
        잠긴 항목
      </Checkbox>,
    );

    const checkbox = screen.getByRole('checkbox', { name: '잠긴 항목' });

    expect(checkbox.hasAttribute('disabled')).toBe(true);
    expect(checkbox.getAttribute('aria-invalid')).toBe('true');
  });

  it('does not style an explicit aria-invalid false value as an error', () => {
    render(<Checkbox aria-invalid="false">검증 완료</Checkbox>);

    const checkbox = screen.getByRole('checkbox', { name: '검증 완료' });

    expect(checkbox.hasAttribute('aria-invalid')).toBe(false);
    expect(checkbox.closest('label')?.hasAttribute('data-invalid')).toBe(false);
  });
});
