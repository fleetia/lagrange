import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { FormField } from '../FormField/FormField';
import { RangeField } from './RangeField';

afterEach(cleanup);

describe('RangeField', () => {
  it('renders a numeric native range contract', () => {
    render(
      <RangeField
        aria-label="Scale"
        defaultValue={2.5}
        max={5}
        min={0}
        step={0.5}
      />,
    );

    const input = screen.getByRole<HTMLInputElement>('slider', {
      name: 'Scale',
    });

    expect(input.type).toBe('range');
    expect(input.value).toBe('2.5');
    expect(input.min).toBe('0');
    expect(input.max).toBe('5');
    expect(input.step).toBe('0.5');
    expect(input.style.getPropertyValue('--lagrange-range-progress')).toBe(
      '50%',
    );
  });

  it('paints progress from the native sanitized value', () => {
    function setSanitizedValue(input: HTMLInputElement | null): void {
      if (input) {
        Object.defineProperty(input, 'valueAsNumber', {
          configurable: true,
          value: 4,
        });
      }
    }

    render(
      <RangeField
        ref={setSanitizedValue}
        aria-label="Stepped scale"
        defaultValue={3}
        max={5}
        min={0}
        step={2}
      />,
    );

    expect(
      screen
        .getByRole<HTMLInputElement>('slider', { name: 'Stepped scale' })
        .style.getPropertyValue('--lagrange-range-progress'),
    ).toBe('80%');
  });

  it('reports numeric value changes while preserving native change events', () => {
    const handleChange = vi.fn();
    const handleValueChange = vi.fn();

    render(
      <RangeField
        aria-label="Columns"
        defaultValue={3}
        max={10}
        min={2}
        onChange={handleChange}
        onValueChange={handleValueChange}
      />,
    );
    const input = screen.getByRole<HTMLInputElement>('slider', {
      name: 'Columns',
    });

    fireEvent.change(input, { target: { value: '6' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleValueChange).toHaveBeenCalledWith(6);
    expect(input.style.getPropertyValue('--lagrange-range-progress')).toBe(
      '50%',
    );
  });

  it('connects FormField label, required state and error feedback', () => {
    render(
      <FormField error="범위를 확인하세요" label="Icon size" required>
        <RangeField defaultValue={24} max={32} min={16} />
      </FormField>,
    );

    const input = screen.getByRole('slider', { name: 'Icon size' });

    expect(input.hasAttribute('required')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain('-error');
  });

  it('restores the painted progress after a native form reset', async () => {
    const { container } = render(
      <form>
        <RangeField
          aria-label="Zoom"
          defaultValue={25}
          max={100}
          min={0}
        />
      </form>,
    );
    const input = screen.getByRole<HTMLInputElement>('slider', {
      name: 'Zoom',
    });

    fireEvent.change(input, { target: { value: '75' } });
    expect(input.style.getPropertyValue('--lagrange-range-progress')).toBe(
      '75%',
    );

    container.querySelector('form')?.reset();
    await Promise.resolve();

    expect(input.value).toBe('25');
    expect(input.style.getPropertyValue('--lagrange-range-progress')).toBe(
      '25%',
    );
  });
});
