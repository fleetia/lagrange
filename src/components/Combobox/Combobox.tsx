import type {
  FocusEvent,
  KeyboardEvent,
  ReactElement,
} from 'react';
import { forwardRef, useEffect, useId, useRef } from 'react';
import clsx from 'clsx';

import { control } from '../controls.css';
import {
  joinIds,
  useFormFieldContext,
} from '../FormField/FormFieldContext';
import * as styles from './Combobox.css';
import type { ComboboxProps } from './types';
import { useCombobox } from './useCombobox';

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      autoComplete = 'off',
      className,
      defaultValue,
      disabled = false,
      emptyMessage = '일치하는 항목이 없습니다.',
      id,
      isInvalid: invalidProp,
      name,
      onFocus,
      onInputValueChange,
      onKeyDown,
      onValueChange,
      options,
      readOnly = false,
      required,
      value,
      ...inputProps
    },
    ref,
  ): ReactElement => {
    const field = useFormFieldContext();
    const generatedId = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const controlId = field?.controlId ?? id ?? `lagrange-combobox-${generatedId}`;
    const listboxId = `${controlId}-listbox`;
    const hasAriaError =
      ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== 'false';
    const isInvalid = Boolean(invalidProp || field?.isInvalid || hasAriaError);
    const isRequired = field?.isRequired ?? required ?? false;
    const resolvedAriaInvalid =
      ariaInvalid === 'grammar' || ariaInvalid === 'spelling'
        ? ariaInvalid
        : isInvalid || undefined;
    const {
      activeIndex,
      close,
      filteredOptions,
      handleFocus,
      handleInputChange,
      handleKeyDown,
      inputValue,
      isOpen,
      selectOption,
      selectedValue,
    } = useCombobox({
      defaultValue,
      disabled,
      onInputValueChange,
      onValueChange,
      options,
      readOnly,
      value,
    });
    const activeOption = activeIndex >= 0 ? filteredOptions[activeIndex] : undefined;
    const activeOptionId = activeOption
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

    useEffect(() => {
      inputRef.current?.setCustomValidity(
        isRequired && !selectedValue ? '목록에서 항목을 선택하세요.' : '',
      );
    }, [isRequired, selectedValue]);

    function setInputRef(node: HTMLInputElement | null): void {
      inputRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }

    function handleBlur(event: FocusEvent<HTMLDivElement>): void {
      const nextFocusedElement = event.relatedTarget;

      if (
        nextFocusedElement instanceof Node &&
        event.currentTarget.contains(nextFocusedElement)
      ) {
        return;
      }

      close();
    }

    function handleInputFocus(event: FocusEvent<HTMLInputElement>): void {
      onFocus?.(event);

      if (!event.defaultPrevented) {
        handleFocus();
      }
    }

    function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
      onKeyDown?.(event);

      if (!event.defaultPrevented) {
        handleKeyDown(event);
      }
    }

    return (
      <div className={styles.root} onBlur={handleBlur}>
        <div className={styles.inputWrap}>
          <input
            {...inputProps}
            ref={setInputRef}
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-describedby={joinIds(field?.describedBy, ariaDescribedBy)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-invalid={resolvedAriaInvalid}
            aria-required={field ? isRequired || undefined : isRequired || ariaRequired || undefined}
            autoComplete={autoComplete}
            className={clsx(control, styles.input, className)}
            data-invalid={isInvalid || undefined}
            disabled={disabled}
            id={controlId}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            readOnly={readOnly}
            required={isRequired}
            role="combobox"
            value={inputValue}
          />
          <span aria-hidden="true" className={styles.indicator}>⌄</span>
        </div>
        {name ? (
          <input
            disabled={disabled}
            form={inputProps.form}
            name={name}
            readOnly
            type="hidden"
            value={selectedValue}
          />
        ) : null}
        {isOpen ? (
          <ul className={styles.listbox} id={listboxId} role="listbox">
            {filteredOptions.length === 0 ? (
              <li
                aria-disabled="true"
                className={styles.empty}
                role="option"
              >
                {emptyMessage}
              </li>
            ) : (
              filteredOptions.map((option, optionIndex) => (
                <li
                  aria-disabled={option.disabled || undefined}
                  aria-selected={selectedValue === option.value}
                  className={styles.option}
                  data-active={activeIndex === optionIndex || undefined}
                  id={`${listboxId}-option-${optionIndex}`}
                  key={option.value}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                  role="option"
                >
                  <span className={styles.optionText}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    {option.description ? (
                      <span className={styles.optionDescription}>
                        {option.description}
                      </span>
                    ) : null}
                  </span>
                  <span aria-hidden="true" className={styles.selectionMarker}>
                    {selectedValue === option.value ? '●' : '·'}
                  </span>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>
    );
  },
);

Combobox.displayName = 'Combobox';
