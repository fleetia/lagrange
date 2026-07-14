import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { root, themeClass } from './theme.css';

export type ThemeRootProps = ComponentPropsWithoutRef<'div'> & {
  themeClassName?: string | null;
};

export const ThemeRoot = forwardRef<HTMLDivElement, ThemeRootProps>(
  ({ className, themeClassName, ...props }, ref): ReactElement => {
    const activeThemeClass =
      themeClassName === undefined ? themeClass : themeClassName;

    return (
      <div
        ref={ref}
        className={clsx(activeThemeClass, root, className)}
        {...props}
      />
    );
  },
);

ThemeRoot.displayName = 'ThemeRoot';
