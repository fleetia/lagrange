import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './Action.css';

export type ActionVariant = 'primary' | 'quiet' | 'critical';
export type ActionSize = 'compact' | 'default';

export type ActionProps = ComponentPropsWithoutRef<'button'> & {
  size?: ActionSize;
  variant?: ActionVariant;
};

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  (
    {
      className,
      size = 'default',
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ): ReactElement => (
    <button
      ref={ref}
      className={clsx(
        styles.action,
        styles.variant[variant],
        styles.size[size],
        className,
      )}
      data-variant={variant}
      type={type}
      {...props}
    />
  ),
);

Action.displayName = 'Action';
