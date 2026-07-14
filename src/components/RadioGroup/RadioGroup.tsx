import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
} from 'react';
import clsx from 'clsx';

import * as styles from './RadioGroup.css';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

export type RadioGroupProps = Omit<
  ComponentPropsWithoutRef<'fieldset'>,
  'children' | 'onChange'
> & {
  children: ReactNode;
  defaultValue?: string;
  description?: ReactNode;
  error?: ReactNode;
  label: ReactNode;
  name?: string;
  onValueChange?: (value: string) => void;
  orientation?: RadioGroupOrientation;
  required?: boolean;
  value?: string;
};

type RadioGroupContextValue = {
  defaultValue?: string;
  describedBy?: string;
  disabled: boolean;
  isInvalid: boolean;
  name: string;
  onValueChange?: (value: string) => void;
  required: boolean;
  value?: string;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      children,
      className,
      defaultValue,
      description,
      disabled = false,
      error,
      label,
      name: nameProp,
      onValueChange,
      orientation = 'vertical',
      required = false,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const generatedId = useId();
    const name = nameProp ?? `lagrange-radio-${generatedId}`;
    const descriptionId = description
      ? `lagrange-radio-${generatedId}-description`
      : undefined;
    const errorId = error ? `lagrange-radio-${generatedId}-error` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId, errorId]
      .filter((id): id is string => Boolean(id))
      .join(' ') || undefined;
    const contextValue = useMemo<RadioGroupContextValue>(
      () => ({
        defaultValue,
        describedBy,
        disabled,
        isInvalid: Boolean(error),
        name,
        onValueChange,
        required,
        value,
      }),
      [
        defaultValue,
        describedBy,
        disabled,
        error,
        name,
        onValueChange,
        required,
        value,
      ],
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <fieldset
          ref={ref}
          aria-describedby={describedBy}
          className={clsx(styles.group, className)}
          disabled={disabled}
          {...props}
        >
          <legend className={styles.legend}>
            {label}
            {required ? (
              <span aria-hidden="true" className={styles.required}>
                *
              </span>
            ) : null}
          </legend>
          {description ? (
            <p className={styles.feedback} id={descriptionId}>
              {description}
            </p>
          ) : null}
          <div
            className={clsx(styles.options, styles.orientation[orientation])}
            data-orientation={orientation}
          >
            {children}
          </div>
          {error ? (
            <p
              className={clsx(styles.feedback, styles.error)}
              id={errorId}
              role="alert"
            >
              {error}
            </p>
          ) : null}
        </fieldset>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export type RadioProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'aria-describedby'
  | 'aria-invalid'
  | 'aria-labelledby'
  | 'aria-required'
  | 'checked'
  | 'children'
  | 'className'
  | 'defaultChecked'
  | 'name'
  | 'required'
  | 'type'
  | 'value'
> & {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  value: string;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      children,
      className,
      description,
      disabled = false,
      onChange,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const group = useContext(RadioGroupContext);
    const generatedId = useId();

    if (!group) {
      throw new Error('Radio must be rendered inside RadioGroup.');
    }

    const labelId = `lagrange-radio-${generatedId}-label`;
    const descriptionId = description
      ? `lagrange-radio-${generatedId}-description`
      : undefined;
    const describedBy = [group.describedBy, descriptionId]
      .filter((id): id is string => Boolean(id))
      .join(' ') || undefined;
    const isControlled = group.value !== undefined;
    const isDisabled = group.disabled || disabled;
    const onValueChange = group.onValueChange;

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
      onChange?.(event);

      if (event.currentTarget.checked) {
        onValueChange?.(value);
      }
    }

    return (
      <label
        className={clsx(styles.option, className)}
        data-disabled={isDisabled || undefined}
        data-invalid={group.isInvalid || undefined}
      >
        <input
          {...props}
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={group.isInvalid || undefined}
          aria-labelledby={labelId}
          checked={isControlled ? group.value === value : undefined}
          className={styles.input}
          defaultChecked={
            isControlled ? undefined : group.defaultValue === value
          }
          disabled={isDisabled}
          name={group.name}
          onChange={handleChange}
          required={group.required}
          type="radio"
          value={value}
        />
        <span aria-hidden="true" className={styles.indicator} />
        <span className={styles.optionContent}>
          <span className={styles.optionLabel} id={labelId}>
            {children}
          </span>
          {description ? (
            <span className={styles.optionDescription} id={descriptionId}>
              {description}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);

Radio.displayName = 'Radio';
