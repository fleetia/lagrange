import type {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FocusEvent,
  ForwardedRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
  joinIds,
  useFormFieldContext,
} from '../FormField/FormFieldContext';
import * as styles from './NumberField.css';

export type NumberFieldProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'defaultValue' | 'onChange' | 'prefix' | 'type' | 'value'
> & {
  allowNegative?: boolean;
  defaultValue?: string;
  formatOnBlur?: boolean;
  formatValue?: (rawValue: string) => string;
  isInvalid?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onRawValueChange?: (rawValue: string) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
  value?: string;
};

function getRawNumericValue(inputValue: string, allowNegative: boolean): string {
  const compactValue = inputValue.replace(/[\s,]/g, '');
  const isNegative = allowNegative && compactValue.startsWith('-');
  const unsignedValue = compactValue.replaceAll('-', '');
  const hasDecimal = unsignedValue.includes('.');
  const [integerPart = '', ...fractionParts] = unsignedValue.split('.');
  const integerDigits = integerPart.replace(/\D/g, '');
  const fractionDigits = fractionParts.join('').replace(/\D/g, '');
  const sign = isNegative ? '-' : '';

  if (!integerDigits && !hasDecimal) {
    return sign;
  }

  return `${sign}${integerDigits}${hasDecimal ? `.${fractionDigits}` : ''}`;
}

function formatNumericValue(rawValue: string): string {
  if (!rawValue || rawValue === '-' || rawValue === '.' || rawValue === '-.') {
    return rawValue;
  }

  const isNegative = rawValue.startsWith('-');
  const unsignedValue = isNegative ? rawValue.slice(1) : rawValue;
  const [integerPart = '', fractionPart] = unsignedValue.split('.');
  const normalizedInteger = integerPart || '0';
  const groupedInteger = normalizedInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = isNegative ? '-' : '';
  const decimal = fractionPart === undefined ? '' : `.${fractionPart}`;

  return `${sign}${groupedInteger}${decimal}`;
}

function assignRef<T>(ref: ForwardedRef<T>, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      allowNegative = true,
      className,
      defaultValue = '',
      disabled = false,
      form,
      formatOnBlur = true,
      formatValue = formatNumericValue,
      id,
      inputMode = 'decimal',
      isInvalid: invalidProp,
      name,
      onBlur,
      onChange,
      onFocus,
      onRawValueChange,
      prefix,
      required,
      suffix,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const fieldContext = useFormFieldContext();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uncontrolledRawValue, setUncontrolledRawValue] = useState(() =>
      getRawNumericValue(defaultValue, allowNegative),
    );
    const [isFocused, setIsFocused] = useState(false);
    const isControlled = value !== undefined;
    const rawValue = getRawNumericValue(
      isControlled ? value : uncontrolledRawValue,
      allowNegative,
    );
    const displayValue = isFocused || !formatOnBlur
      ? rawValue
      : formatValue(rawValue);
    const hasAriaError =
      ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== 'false';
    const isInvalid = Boolean(
      invalidProp || fieldContext?.isInvalid || hasAriaError,
    );
    const isRequired = fieldContext?.isRequired ?? required ?? false;
    const resolvedAriaRequired = fieldContext
      ? isRequired || undefined
      : isRequired || ariaRequired || undefined;
    const resolvedAriaInvalid =
      ariaInvalid === 'grammar' || ariaInvalid === 'spelling'
        ? ariaInvalid
        : isInvalid || undefined;
    const usesHiddenRawInput = Boolean(name && formatOnBlur);
    const setInputRef = useCallback(
      (node: HTMLInputElement | null): void => {
        inputRef.current = node;
        assignRef(ref, node);
      },
      [ref],
    );

    useEffect(() => {
      const formElement = inputRef.current?.form;

      if (isControlled || !formElement) {
        return undefined;
      }

      function handleReset(event: Event): void {
        queueMicrotask(() => {
          if (event.defaultPrevented) {
            return;
          }

          setUncontrolledRawValue(
            getRawNumericValue(defaultValue, allowNegative),
          );
        });
      }

      formElement.addEventListener('reset', handleReset);

      return () => formElement.removeEventListener('reset', handleReset);
    }, [allowNegative, defaultValue, form, isControlled]);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
      const nextRawValue = getRawNumericValue(
        event.currentTarget.value,
        allowNegative,
      );

      if (!isControlled) {
        setUncontrolledRawValue(nextRawValue);
      }

      onRawValueChange?.(nextRawValue);
      onChange?.(event);
    }

    function handleFocus(event: FocusEvent<HTMLInputElement>): void {
      setIsFocused(true);
      onFocus?.(event);
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>): void {
      setIsFocused(false);
      onBlur?.(event);
    }

    return (
      <span
        className={clsx(styles.field, className)}
        data-disabled={disabled || undefined}
        data-invalid={isInvalid || undefined}
      >
        {prefix ? <span aria-hidden="true" className={styles.affix}>{prefix}</span> : null}
        <input
          ref={setInputRef}
          aria-describedby={joinIds(
            fieldContext?.describedBy,
            ariaDescribedBy,
          )}
          aria-invalid={resolvedAriaInvalid}
          aria-required={resolvedAriaRequired}
          className={styles.input}
          data-invalid={isInvalid || undefined}
          disabled={disabled}
          form={form}
          id={fieldContext?.controlId ?? id}
          inputMode={inputMode}
          name={usesHiddenRawInput ? undefined : name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          required={isRequired}
          type="text"
          value={displayValue}
          {...props}
        />
        {suffix ? <span aria-hidden="true" className={styles.affix}>{suffix}</span> : null}
        {usesHiddenRawInput ? (
          <input
            disabled={disabled}
            form={form}
            name={name}
            type="hidden"
            value={rawValue}
          />
        ) : null}
      </span>
    );
  },
);

NumberField.displayName = 'NumberField';
