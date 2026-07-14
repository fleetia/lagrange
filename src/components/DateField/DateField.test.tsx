import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { FormField } from '../FormField/FormField';
import { DateField } from './DateField';

afterEach(cleanup);

describe('DateField', () => {
  it('renders an immutable native date input contract', () => {
    render(
      <DateField
        aria-label="조회일"
        defaultValue="2026-07-14"
        max="2026-12-31"
        min="2026-01-01"
      />,
    );

    const input = screen.getByLabelText<HTMLInputElement>('조회일');

    expect(input.type).toBe('date');
    expect(input.value).toBe('2026-07-14');
    expect(input.min).toBe('2026-01-01');
    expect(input.max).toBe('2026-12-31');
  });

  it('connects FormField label, required state and error feedback', () => {
    render(
      <FormField error="날짜를 확인하세요" label="거래일" required>
        <DateField />
      </FormField>,
    );

    const input = screen.getByLabelText('거래일*');

    expect(input.hasAttribute('required')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain('-error');
  });

  it('forwards native date changes', () => {
    const handleChange = vi.fn();

    render(<DateField aria-label="거래일" onChange={handleChange} />);
    const input = screen.getByLabelText<HTMLInputElement>('거래일');

    fireEvent.change(input, { target: { value: '2026-07-20' } });

    expect(input.value).toBe('2026-07-20');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
