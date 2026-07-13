import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { root, themeClass } from './theme.css';

export type ThemeRootProps = ComponentPropsWithoutRef<'div'>;

export const ThemeRoot = forwardRef<HTMLDivElement, ThemeRootProps>(
  ({ className, ...props }, ref): ReactElement => (
    <div ref={ref} className={clsx(themeClass, root, className)} {...props} />
  ),
);

ThemeRoot.displayName = 'ThemeRoot';
