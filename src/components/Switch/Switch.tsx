import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { forwardRef, useId } from 'react';
import clsx from 'clsx';

import * as styles from './Switch.css';

export type SwitchProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children' | 'className' | 'role' | 'type'
> & {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  isInvalid?: boolean;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
    const labelId = `lagrange-switch-${generatedId}-label`;
    const descriptionId = description
      ? `lagrange-switch-${generatedId}-description`
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
          role="switch"
          type="checkbox"
          {...props}
        />
        <span aria-hidden="true" className={styles.track} />
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

Switch.displayName = 'Switch';
