import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './IconButton.css';

export type IconButtonVariant = 'default' | 'quiet' | 'critical';
export type IconButtonSize = 'compact' | 'default';

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'aria-label' | 'children'
> & {
  children: ReactNode;
  label: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      label,
      size = 'default',
      type = 'button',
      variant = 'default',
      ...props
    },
    ref,
  ): ReactElement => (
    <button
      ref={ref}
      aria-label={label}
      className={clsx(
        styles.button,
        styles.variant[variant],
        styles.size[size],
        className,
      )}
      data-size={size}
      data-variant={variant}
      type={type}
      {...props}
    >
      {children}
    </button>
  ),
);

IconButton.displayName = 'IconButton';
