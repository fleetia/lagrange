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

import * as styles from './ChoiceGroup.css';

export type ChoiceGroupOrientation = 'horizontal' | 'vertical';

export type ChoiceGroupProps = Omit<
  ComponentPropsWithoutRef<'fieldset'>,
  'children' | 'onChange'
> & {
  children: ReactNode;
  defaultValue?: string;
  description?: ReactNode;
  label: ReactNode;
  name?: string;
  onValueChange?: (value: string) => void;
  orientation?: ChoiceGroupOrientation;
  required?: boolean;
  value?: string;
};

type ChoiceGroupContextValue = {
  defaultValue?: string;
  describedBy?: string;
  disabled: boolean;
  name: string;
  onValueChange?: (value: string) => void;
  required: boolean;
  value?: string;
};

const ChoiceGroupContext = createContext<ChoiceGroupContextValue | null>(null);

export const ChoiceGroup = forwardRef<HTMLFieldSetElement, ChoiceGroupProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      children,
      className,
      defaultValue,
      description,
      disabled = false,
      label,
      name: nameProp,
      onValueChange,
      orientation = 'horizontal',
      required = false,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const generatedId = useId();
    const name = nameProp ?? `lagrange-choice-${generatedId}`;
    const descriptionId = description
      ? `lagrange-choice-${generatedId}-description`
      : undefined;
    const describedBy = [ariaDescribedBy, descriptionId]
      .filter((id): id is string => Boolean(id))
      .join(' ') || undefined;
    const contextValue = useMemo<ChoiceGroupContextValue>(
      () => ({
        defaultValue,
        describedBy,
        disabled,
        name,
        onValueChange,
        required,
        value,
      }),
      [
        defaultValue,
        describedBy,
        disabled,
        name,
        onValueChange,
        required,
        value,
      ],
    );

    return (
      <ChoiceGroupContext.Provider value={contextValue}>
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
            <p className={styles.description} id={descriptionId}>
              {description}
            </p>
          ) : null}
          <div
            className={clsx(styles.choices, styles.orientation[orientation])}
            data-orientation={orientation}
          >
            {children}
          </div>
        </fieldset>
      </ChoiceGroupContext.Provider>
    );
  },
);

ChoiceGroup.displayName = 'ChoiceGroup';

export type ChoiceProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'aria-describedby'
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
  value: string;
};

export const Choice = forwardRef<HTMLInputElement, ChoiceProps>(
  (
    {
      children,
      className,
      disabled = false,
      onChange,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const group = useContext(ChoiceGroupContext);

    if (!group) {
      throw new Error('Choice must be rendered inside ChoiceGroup.');
    }

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
        className={clsx(styles.choice, className)}
        data-disabled={isDisabled || undefined}
      >
        <input
          {...props}
          ref={ref}
          aria-describedby={group.describedBy}
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
        <span className={styles.choiceLabel}>{children}</span>
      </label>
    );
  },
);

Choice.displayName = 'Choice';
