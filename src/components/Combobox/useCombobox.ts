import type { ChangeEvent, KeyboardEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import {
  getEnabledOptionIndex,
  getFilteredOptions,
  getOptionByValue,
} from './helpers';
import type { ComboboxOption } from './types';

type UseComboboxOptions = {
  defaultValue?: string;
  disabled?: boolean;
  onInputValueChange?: (inputValue: string) => void;
  onValueChange?: (value: string, option?: ComboboxOption) => void;
  options: readonly ComboboxOption[];
  readOnly?: boolean;
  value?: string;
};

type UseComboboxReturn = {
  activeIndex: number;
  close: () => void;
  filteredOptions: readonly ComboboxOption[];
  handleFocus: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  inputValue: string;
  isOpen: boolean;
  selectOption: (option: ComboboxOption) => void;
  selectedValue: string;
};

export function useCombobox({
  defaultValue = '',
  disabled = false,
  onInputValueChange,
  onValueChange,
  options,
  readOnly = false,
  value,
}: UseComboboxOptions): UseComboboxReturn {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => getOptionByValue(options, selectedValue),
    [options, selectedValue],
  );
  const [inputValue, setInputValue] = useState(selectedOption?.label ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const filteredOptions = useMemo(
    () => getFilteredOptions(options, inputValue, selectedOption?.label),
    [inputValue, options, selectedOption?.label],
  );

  const updateValue = useCallback(
    (nextValue: string, option?: ComboboxOption): void => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue, option);
    },
    [onValueChange, value],
  );

  const selectOption = useCallback(
    (option: ComboboxOption): void => {
      if (disabled || option.disabled || readOnly) {
        return;
      }

      updateValue(option.value, option);
      setInputValue(option.label);
      onInputValueChange?.(option.label);
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [disabled, onInputValueChange, readOnly, updateValue],
  );

  const close = useCallback((): void => {
    setIsOpen(false);
    setActiveIndex(-1);
    setInputValue(selectedOption?.label ?? '');
  }, [selectedOption?.label]);

  const handleFocus = useCallback((): void => {
    if (disabled || readOnly) {
      return;
    }

    setInputValue(selectedOption?.label ?? '');
    setIsOpen(true);
  }, [disabled, readOnly, selectedOption?.label]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (disabled || readOnly) {
        return;
      }

      const nextInputValue = event.currentTarget.value;
      setInputValue(nextInputValue);
      onInputValueChange?.(nextInputValue);
      setIsOpen(true);
      setActiveIndex(-1);

      if (selectedValue) {
        updateValue('');
      }
    },
    [disabled, onInputValueChange, readOnly, selectedValue, updateValue],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (disabled || readOnly) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === 'Enter' && isOpen && activeIndex >= 0) {
        event.preventDefault();
        const option = filteredOptions[activeIndex];

        if (option) {
          selectOption(option);
        }
        return;
      }

      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
      }

      event.preventDefault();
      setIsOpen(true);
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      let startIndex = activeIndex;

      if (activeIndex < 0) {
        startIndex = direction === 1 ? -1 : 0;
      }

      setActiveIndex(
        getEnabledOptionIndex(filteredOptions, startIndex, direction),
      );
    },
    [
      activeIndex,
      close,
      disabled,
      filteredOptions,
      isOpen,
      readOnly,
      selectOption,
    ],
  );

  return {
    activeIndex,
    close,
    filteredOptions,
    handleFocus,
    handleInputChange,
    handleKeyDown,
    inputValue: isOpen && !disabled && !readOnly
      ? inputValue
      : selectedOption?.label ?? '',
    isOpen: isOpen && !disabled && !readOnly,
    selectOption,
    selectedValue,
  };
}
