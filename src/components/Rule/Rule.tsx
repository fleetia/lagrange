import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './Rule.css';

export type RuleVariant = 'weak' | 'boundary' | 'structural';
export type RuleOrientation = 'horizontal' | 'vertical';

export type RuleProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  orientation?: RuleOrientation;
  variant?: RuleVariant;
};

export const Rule = forwardRef<HTMLDivElement, RuleProps>(
  (
    {
      className,
      orientation = 'horizontal',
      role = 'separator',
      variant = 'boundary',
      ...props
    },
    ref,
  ): ReactElement => {
    const variantClass =
      orientation === 'horizontal'
        ? styles.horizontalVariant[variant]
        : styles.verticalVariant[variant];

    return (
      <div
        ref={ref}
        aria-orientation={orientation}
        className={clsx(
          styles.base,
          styles.orientation[orientation],
          variantClass,
          className,
        )}
        data-variant={variant}
        role={role}
        {...props}
      />
    );
  },
);

Rule.displayName = 'Rule';
