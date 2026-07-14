import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FocusEvent,
  ForwardedRef,
  KeyboardEvent,
  ReactElement,
} from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import {
  joinIds,
  useFormFieldContext,
} from '../FormField/FormFieldContext';
import * as styles from './ColorField.css';
import { applyColorAlpha, normalizeColor } from './helpers';

export type ColorFieldProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'defaultValue' | 'onChange' | 'type' | 'value'
> & {
  defaultValue?: string;
  isInvalid?: boolean;
  onValueChange?: (value: string) => void;
  showAlpha?: boolean;
  swatchLabel?: string;
  value?: string;
};

function assignRef<T>(ref: ForwardedRef<T>, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function getFallbackColor(showAlpha: boolean): string {
  return showAlpha ? '#000000ff' : '#000000';
}

export const ColorField = forwardRef<HTMLInputElement, ColorFieldProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      className,
      defaultValue = '#000000',
      disabled = false,
      form,
      id,
      isInvalid: invalidProp,
      name,
      onBlur,
      onFocus,
      onKeyDown,
      onValueChange,
      readOnly = false,
      required,
      showAlpha = false,
      spellCheck = false,
      swatchLabel = '색상 선택',
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const fieldContext = useFormFieldContext();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const normalizedDefaultValue =
      normalizeColor(defaultValue, showAlpha) ?? getFallbackColor(showAlpha);
    const [internalValue, setInternalValue] = useState(normalizedDefaultValue);
    const normalizedInternalValue =
      normalizeColor(internalValue, showAlpha) ?? getFallbackColor(showAlpha);
    const normalizedControlledValue = value === undefined
      ? null
      : normalizeColor(value, showAlpha);
    const isControlled = value !== undefined;
    const hasInvalidControlledValue =
      isControlled && normalizedControlledValue === null;
    const committedValue = isControlled
      ? normalizedControlledValue ?? normalizedInternalValue
      : normalizedInternalValue;
    const [draft, setDraft] = useState(committedValue);
    const [isFocused, setIsFocused] = useState(false);
    const previousCommittedValueRef = useRef(committedValue);
    const normalizedDraft = normalizeColor(draft, showAlpha);
    const hasInvalidDraft = normalizedDraft === null;
    const hasAriaError =
      ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== 'false';
    const isInvalid = Boolean(
      invalidProp ||
      fieldContext?.isInvalid ||
      hasAriaError ||
      hasInvalidControlledValue ||
      hasInvalidDraft,
    );
    const isRequired = fieldContext?.isRequired ?? required ?? false;
    const resolvedAriaRequired = fieldContext
      ? isRequired || undefined
      : isRequired || ariaRequired || undefined;
    const resolvedAriaInvalid =
      ariaInvalid === 'grammar' || ariaInvalid === 'spelling'
        ? ariaInvalid
        : isInvalid || undefined;
    const displayedColor = normalizedDraft ?? committedValue;
    const nativeColor = normalizeColor(displayedColor) ?? '#000000';
    const setInputRef = useCallback(
      (node: HTMLInputElement | null): void => {
        inputRef.current = node;
        assignRef(ref, node);
      },
      [ref],
    );

    useEffect(() => {
      const hasControlledValueChanged =
        isControlled && previousCommittedValueRef.current !== committedValue;

      if (!isFocused || hasControlledValueChanged) {
        setDraft(committedValue);
      }

      previousCommittedValueRef.current = committedValue;
    }, [committedValue, isControlled, isFocused]);

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

          setInternalValue(normalizedDefaultValue);
          setDraft(normalizedDefaultValue);
        });
      }

      formElement.addEventListener('reset', handleReset);

      return () => formElement.removeEventListener('reset', handleReset);
    }, [form, isControlled, normalizedDefaultValue]);

    function commitValue(nextValue: string): void {
      const normalizedValue = normalizeColor(nextValue, showAlpha);

      if (!normalizedValue) {
        setDraft(committedValue);
        return;
      }

      if (!isControlled) {
        setInternalValue(normalizedValue);
        setDraft(normalizedValue);
      } else {
        setDraft(committedValue);
      }

      if (normalizedValue !== committedValue) {
        onValueChange?.(normalizedValue);
      }
    }

    function handleTextChange(event: ChangeEvent<HTMLInputElement>): void {
      setDraft(event.currentTarget.value);
    }

    function handleTextFocus(event: FocusEvent<HTMLInputElement>): void {
      setIsFocused(true);
      onFocus?.(event);
    }

    function handleTextBlur(event: FocusEvent<HTMLInputElement>): void {
      setIsFocused(false);
      commitValue(draft);
      onBlur?.(event);
    }

    function handleTextKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        setDraft(committedValue);
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        commitValue(draft);
      }
    }

    function handleSwatchChange(event: ChangeEvent<HTMLInputElement>): void {
      const nextColor = showAlpha
        ? applyColorAlpha(event.currentTarget.value, displayedColor)
        : normalizeColor(event.currentTarget.value);

      if (nextColor) {
        commitValue(nextColor);
      }
    }

    return (
      <span
        className={clsx(styles.field, className)}
        data-disabled={disabled || undefined}
        data-invalid={isInvalid || undefined}
      >
        <input
          aria-label={swatchLabel}
          className={styles.swatch}
          disabled={disabled || readOnly}
          onChange={handleSwatchChange}
          tabIndex={readOnly ? -1 : undefined}
          type="color"
          value={nativeColor}
        />
        <input
          {...props}
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
          onBlur={handleTextBlur}
          onChange={handleTextChange}
          onFocus={handleTextFocus}
          onKeyDown={handleTextKeyDown}
          readOnly={readOnly}
          required={isRequired}
          spellCheck={spellCheck}
          type="text"
          value={draft}
        />
        {name ? (
          <input
            disabled={disabled}
            form={form}
            name={name}
            type="hidden"
            value={committedValue}
          />
        ) : null}
      </span>
    );
  },
);

ColorField.displayName = 'ColorField';
