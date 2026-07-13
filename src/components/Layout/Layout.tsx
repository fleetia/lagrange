import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import type { Space } from '../../theme/tokens';
import * as styles from './Layout.css';

export type LayoutAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type LayoutJustify = 'start' | 'center' | 'end' | 'between';

type SharedLayoutProps = ComponentPropsWithoutRef<'div'> & {
  align?: LayoutAlign;
  gap?: Space;
  justify?: LayoutJustify;
};

export type StackProps = SharedLayoutProps;

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      align = 'stretch',
      className,
      gap = 'sm',
      justify = 'start',
      ...props
    },
    ref,
  ): ReactElement => (
    <div
      ref={ref}
      className={clsx(
        styles.stack,
        styles.gap[gap],
        styles.align[align],
        styles.justify[justify],
        className,
      )}
      data-layout="stack"
      {...props}
    />
  ),
);

Stack.displayName = 'Stack';

export type InlineProps = SharedLayoutProps & {
  wrap?: boolean;
};

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      align = 'center',
      className,
      gap = 'sm',
      justify = 'start',
      wrap = true,
      ...props
    },
    ref,
  ): ReactElement => (
    <div
      ref={ref}
      className={clsx(
        styles.inline,
        styles.gap[gap],
        styles.align[align],
        styles.justify[justify],
        wrap ? styles.wrap.true : styles.wrap.false,
        className,
      )}
      data-layout="inline"
      {...props}
    />
  ),
);

Inline.displayName = 'Inline';
