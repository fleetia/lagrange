import type {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  CSSProperties,
  ForwardedRef,
  ReactElement,
} from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import clsx from 'clsx';

import {
  joinIds,
  useFormFieldContext,
} from '../FormField/FormFieldContext';
import * as styles from './RangeField.css';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const PROGRESS_PROPERTY = '--lagrange-range-progress';

type RangeFieldStyle = CSSProperties & {
  '--lagrange-range-progress': string;
};

export type RangeFieldProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'defaultValue' | 'max' | 'min' | 'onChange' | 'step' | 'type' | 'value'
> & {
  defaultValue?: number;
  isInvalid?: boolean;
  max?: number;
  min?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: number) => void;
  step?: number;
  value?: number;
};

function getProgress(value: number, min: number, max: number): string {
  if (max <= min) {
    return '0%';
  }

  const clampedValue = Math.min(Math.max(value, min), max);
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  return `${percentage}%`;
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

function updateProgress(
  input: HTMLInputElement,
  min: number,
  max: number,
): void {
  input.style.setProperty(
    PROGRESS_PROPERTY,
    getProgress(input.valueAsNumber, min, max),
  );
}

export const RangeField = forwardRef<HTMLInputElement, RangeFieldProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      className,
      defaultValue,
      form,
      id,
      isInvalid: invalidProp,
      max = DEFAULT_MAX,
      min = DEFAULT_MIN,
      onChange,
      onValueChange,
      required,
      step,
      style,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const field = useFormFieldContext();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const hasAriaError =
      ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== 'false';
    const isInvalid = Boolean(invalidProp || field?.isInvalid || hasAriaError);
    const isRequired = field?.isRequired ?? required ?? false;
    const resolvedAriaRequired = field
      ? isRequired || undefined
      : isRequired || ariaRequired || undefined;
    const resolvedAriaInvalid =
      ariaInvalid === 'grammar' || ariaInvalid === 'spelling'
        ? ariaInvalid
        : isInvalid || undefined;
    const initialValue = value ?? defaultValue ?? (min + max) / 2;
    const rangeStyle: RangeFieldStyle = {
      ...style,
      '--lagrange-range-progress': getProgress(initialValue, min, max),
    };
    const setInputRef = useCallback(
      (node: HTMLInputElement | null): void => {
        inputRef.current = node;
        assignRef(ref, node);
      },
      [ref],
    );

    useLayoutEffect(() => {
      const input = inputRef.current;

      if (input) {
        updateProgress(input, min, max);
      }
    }, [defaultValue, max, min, step, value]);

    useEffect(() => {
      const input = inputRef.current;
      const formElement = input?.form;

      if (value !== undefined || !input || !formElement) {
        return undefined;
      }
      const rangeInput = input;

      function handleReset(event: Event): void {
        queueMicrotask(() => {
          if (event.defaultPrevented) {
            return;
          }

          updateProgress(rangeInput, min, max);
        });
      }

      formElement.addEventListener('reset', handleReset);

      return () => formElement.removeEventListener('reset', handleReset);
    }, [form, max, min, value]);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
      const nextValue = event.currentTarget.valueAsNumber;

      updateProgress(event.currentTarget, min, max);
      onChange?.(event);
      onValueChange?.(nextValue);
    }

    return (
      <input
        {...props}
        ref={setInputRef}
        aria-describedby={joinIds(field?.describedBy, ariaDescribedBy)}
        aria-invalid={resolvedAriaInvalid}
        aria-required={resolvedAriaRequired}
        className={clsx(styles.rangeField, className)}
        data-invalid={isInvalid || undefined}
        defaultValue={defaultValue}
        form={form}
        id={field?.controlId ?? id}
        max={max}
        min={min}
        onChange={handleChange}
        required={isRequired}
        step={step}
        style={rangeStyle}
        type="range"
        value={value}
      />
    );
  },
);

RangeField.displayName = 'RangeField';
