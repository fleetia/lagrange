import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { forwardRef, useId } from 'react';
import clsx from 'clsx';

import * as styles from './Checkbox.css';

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children' | 'className' | 'type'
> & {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  isInvalid?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      children,
      className,
      description,
      disabled,
      isInvalid = false,
      ...props
    },
    ref,
  ): ReactElement => {
    const generatedId = useId();
    const labelId = `lagrange-checkbox-${generatedId}-label`;
    const descriptionId = description
      ? `lagrange-checkbox-${generatedId}-description`
      : undefined;
    const describedBy = [ariaDescribedBy, descriptionId]
      .filter((id): id is string => Boolean(id))
      .join(' ') || undefined;
    const hasAriaError =
      ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== 'false';
    const invalid = Boolean(isInvalid || hasAriaError);
    const resolvedAriaInvalid =
      ariaInvalid === 'grammar' || ariaInvalid === 'spelling'
        ? ariaInvalid
        : invalid || undefined;

    return (
      <label
        className={clsx(styles.root, className)}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
      >
        <input
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={resolvedAriaInvalid}
          aria-labelledby={labelId}
          className={styles.input}
          disabled={disabled}
          type="checkbox"
          {...props}
        />
        <span aria-hidden="true" className={styles.indicator} />
        <span className={styles.content}>
          <span className={styles.label} id={labelId}>
            {children}
          </span>
          {description ? (
            <span className={styles.description} id={descriptionId}>
              {description}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
