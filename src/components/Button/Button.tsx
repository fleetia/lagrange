import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'critical';
export type ButtonSize = 'compact' | 'default';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  isPending?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      'aria-busy': ariaBusy,
      'aria-disabled': ariaDisabled,
      className,
      disabled = false,
      isPending = false,
      size = 'default',
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ): ReactElement => {
    const isDisabled = disabled || isPending;

    return (
      <button
        ref={ref}
        aria-busy={isPending || ariaBusy || undefined}
        aria-disabled={isDisabled || ariaDisabled || undefined}
        className={clsx(
          styles.button,
          styles.variant[variant],
          styles.size[size],
          className,
        )}
        data-pending={isPending || undefined}
        data-size={size}
        data-variant={variant}
        disabled={isDisabled}
        type={type}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
