import type { ComponentPropsWithoutRef } from 'react';

export type ComboboxOption = {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
};

export type ComboboxProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children' | 'defaultValue' | 'onChange' | 'value'
> & {
  defaultValue?: string;
  emptyMessage?: string;
  isInvalid?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onValueChange?: (value: string, option?: ComboboxOption) => void;
  options: readonly ComboboxOption[];
  value?: string;
};
