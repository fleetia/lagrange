import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { FormField } from '../FormField/FormField';
import { Combobox } from './Combobox';

const OPTIONS = [
  { label: '식비 › 카페', value: 'cafe' },
  { description: '버스, 지하철', label: '교통비 › 대중교통', value: 'transit' },
  { disabled: true, label: '사용 중지 계정', value: 'disabled' },
] as const;

afterEach(cleanup);

describe('Combobox', () => {
  it('connects FormField state and submits the selected option value', () => {
    render(
      <FormField error="카테고리를 선택하세요" label="카테고리" required>
        <Combobox defaultValue="cafe" name="category" options={OPTIONS} />
      </FormField>,
    );

    const input = screen.getByRole('combobox', { name: '카테고리' });
    const hiddenInput = document.querySelector<HTMLInputElement>(
      'input[name="category"]',
    );

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
    expect(hiddenInput?.value).toBe('cafe');
  });

  it('filters options and selects with the keyboard', () => {
    const handleValueChange = vi.fn();
    render(
      <Combobox
        aria-label="카테고리"
        onValueChange={handleValueChange}
        options={OPTIONS}
      />,
    );

    const input = screen.getByRole('combobox', { name: '카테고리' });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '교통' } });

    expect(screen.getAllByRole('option')).toHaveLength(1);

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(input.getAttribute('value')).toBe('교통비 › 대중교통');
    expect(handleValueChange).toHaveBeenLastCalledWith(
      'transit',
      OPTIONS[1],
    );
  });

  it('skips disabled options during arrow navigation', () => {
    render(<Combobox aria-label="계좌" options={OPTIONS} />);
    const input = screen.getByRole('combobox', { name: '계좌' });

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input.getAttribute('aria-activedescendant')).toContain('option-1');
  });

  it('requires an option value instead of accepting arbitrary text', () => {
    render(
      <Combobox
        aria-label="카테고리"
        name="category"
        options={OPTIONS}
        required
      />,
    );
    const input = screen.getByRole<HTMLInputElement>('combobox', {
      name: '카테고리',
    });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '직접 입력한 값' } });

    expect(input.checkValidity()).toBe(false);
    expect(
      document.querySelector<HTMLInputElement>('input[name="category"]')
        ?.value,
    ).toBe('');

    fireEvent.change(input, { target: { value: '카페' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.checkValidity()).toBe(true);
  });

  it('keeps submitted values disabled and associated with an external form', () => {
    const { rerender } = render(
      <>
        <form id="ledger-form" />
        <Combobox
          aria-label="카테고리"
          defaultValue="cafe"
          form="ledger-form"
          name="category"
          options={OPTIONS}
        />
      </>,
    );
    const form = document.querySelector<HTMLFormElement>('#ledger-form');

    expect(new FormData(form ?? undefined).get('category')).toBe('cafe');

    rerender(
      <>
        <form id="ledger-form" />
        <Combobox
          aria-label="카테고리"
          defaultValue="cafe"
          disabled
          form="ledger-form"
          name="category"
          options={OPTIONS}
        />
      </>,
    );

    expect(new FormData(form ?? undefined).has('category')).toBe(false);
  });

  it('composes native focus and keyboard handlers', () => {
    const handleFocus = vi.fn();
    const handleKeyDown = vi.fn();
    render(
      <Combobox
        aria-label="카테고리"
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        options={OPTIONS}
      />,
    );
    const input = screen.getByRole('combobox', { name: '카테고리' });

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    expect(input.getAttribute('aria-expanded')).toBe('true');
  });
});
