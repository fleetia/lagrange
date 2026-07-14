import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './VisuallyHidden.css';

export type VisuallyHiddenProps = ComponentPropsWithoutRef<'span'> & {
  isFocusable?: boolean;
};

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, isFocusable = false, ...props }, ref): ReactElement => (
    <span
      ref={ref}
      className={clsx(styles.hidden, isFocusable && styles.focusable, className)}
      data-focusable={isFocusable || undefined}
      {...props}
    />
  ),
);

VisuallyHidden.displayName = 'VisuallyHidden';
