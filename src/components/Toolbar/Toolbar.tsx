import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './Toolbar.css';

export type ToolbarAlign = 'start' | 'end' | 'between';
export type ToolbarBoundary = 'none' | 'weak' | 'boundary' | 'structural';

export type ToolbarProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'aria-label' | 'aria-labelledby' | 'children' | 'role'
> & {
  align?: ToolbarAlign;
  boundary?: ToolbarBoundary;
  children: ReactNode;
  label: string;
  wrap?: boolean;
};

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      align = 'start',
      boundary = 'boundary',
      children,
      className,
      label,
      wrap = true,
      ...props
    },
    ref,
  ): ReactElement => (
    <div
      ref={ref}
      {...props}
      aria-label={label}
      className={clsx(
        styles.toolbar,
        styles.align[align],
        styles.boundary[boundary],
        wrap ? styles.wrap.true : styles.wrap.false,
        className,
      )}
      data-align={align}
      data-boundary={boundary}
      role="group"
    >
      {children}
    </div>
  ),
);

Toolbar.displayName = 'Toolbar';
