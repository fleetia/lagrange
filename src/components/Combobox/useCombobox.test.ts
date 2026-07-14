import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useCombobox } from './useCombobox';

const OPTIONS = [
  { label: '식비 › 카페', value: 'cafe' },
  { label: '교통비 › 대중교통', value: 'transit' },
] as const;

describe('useCombobox', () => {
  it('tracks controlled selection labels and selection callbacks', () => {
    const handleValueChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) =>
        useCombobox({
          onValueChange: handleValueChange,
          options: OPTIONS,
          value,
        }),
      { initialProps: { value: 'cafe' } },
    );

    expect(result.current.inputValue).toBe('식비 › 카페');

    rerender({ value: 'transit' });
    expect(result.current.inputValue).toBe('교통비 › 대중교통');

    act(() => {
      result.current.selectOption(OPTIONS[0]);
    });
    expect(handleValueChange).toHaveBeenCalledWith('cafe', OPTIONS[0]);
  });

  it('does not open a disabled combobox', () => {
    const { result } = renderHook(() =>
      useCombobox({ disabled: true, options: OPTIONS }),
    );

    act(() => {
      result.current.handleFocus();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('closes and blocks selection when it becomes read-only', () => {
    const handleValueChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ readOnly }: { readOnly: boolean }) =>
        useCombobox({
          onValueChange: handleValueChange,
          options: OPTIONS,
          readOnly,
        }),
      { initialProps: { readOnly: false } },
    );

    act(() => {
      result.current.handleFocus();
    });
    expect(result.current.isOpen).toBe(true);

    rerender({ readOnly: true });
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.selectOption(OPTIONS[0]);
    });
    expect(handleValueChange).not.toHaveBeenCalled();
  });
});
