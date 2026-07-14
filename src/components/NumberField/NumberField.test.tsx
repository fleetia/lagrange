import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { FormField } from '../FormField/FormField';
import { NumberField } from './NumberField';

afterEach(cleanup);

describe('NumberField', () => {
  it('exposes a canonical numeric string without coercing it to number', () => {
    const handleRawValueChange = vi.fn();

    render(
      <NumberField
        aria-label="수량"
        onRawValueChange={handleRawValueChange}
        prefix="≈"
        suffix="units"
      />,
    );
    const input = screen.getByRole('textbox', { name: '수량' });

    fireEvent.change(input, { target: { value: '9,007,199,254,740,993.50' } });

    expect(handleRawValueChange).toHaveBeenLastCalledWith(
      '9007199254740993.50',
    );
    expect(input.getAttribute('inputmode')).toBe('decimal');
  });

  it('formats on blur and restores the raw string while editing', () => {
    render(
      <NumberField aria-label="금액" defaultValue="12345.00" />,
    );
    const input = screen.getByRole<HTMLInputElement>('textbox', { name: '금액' });

    expect(input.value).toBe('12,345.00');

    fireEvent.focus(input);
    expect(input.value).toBe('12345.00');

    fireEvent.change(input, { target: { value: '9876543.20' } });
    fireEvent.blur(input);
    expect(input.value).toBe('9,876,543.20');
  });

  it('submits the unformatted raw string through native FormData', () => {
    const { container } = render(
      <form>
        <NumberField
          aria-label="측정값"
          defaultValue="12345.00"
          name="measurement"
        />
      </form>,
    );
    const form = container.querySelector('form');

    expect(form).not.toBeNull();
    expect(new FormData(form ?? undefined).get('measurement')).toBe('12345.00');
  });

  it('restores its uncontrolled default through native form reset', async () => {
    const { container } = render(
      <form>
        <NumberField
          aria-label="측정값"
          defaultValue="12345.00"
          name="measurement"
        />
      </form>,
    );
    const input = screen.getByRole<HTMLInputElement>('textbox', {
      name: '측정값',
    });
    const form = container.querySelector('form');

    if (!form) {
      throw new Error('Expected NumberField test form.');
    }

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '9876.50' } });
    fireEvent.blur(input);

    expect(input.value).toBe('9,876.50');
    expect(new FormData(form).get('measurement')).toBe('9876.50');

    await act(async () => {
      form.reset();
      await Promise.resolve();
    });

    expect(input.value).toBe('12,345.00');
    expect(new FormData(form).get('measurement')).toBe('12345.00');
  });

  it('inherits accessible form state and respects a non-negative constraint', () => {
    const handleRawValueChange = vi.fn();

    render(
      <FormField error="0 이상의 값을 입력하세요." label="수량" required>
        <NumberField allowNegative={false} onRawValueChange={handleRawValueChange} />
      </FormField>,
    );
    const input = screen.getByLabelText('수량*');

    fireEvent.change(input, { target: { value: '-120.5' } });

    expect(handleRawValueChange).toHaveBeenLastCalledWith('120.5');
    expect(input.hasAttribute('required')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });
});
