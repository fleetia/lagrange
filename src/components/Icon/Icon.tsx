import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './Icon.css';

export type IconSize = 'sm' | 'md' | 'lg';

type DecorativeIconProps = {
  decorative?: true;
  label?: never;
};

type InformativeIconProps = {
  decorative: false;
  label: string;
};

export type IconProps = Omit<
  ComponentPropsWithoutRef<'svg'>,
  | 'aria-hidden'
  | 'aria-label'
  | 'aria-labelledby'
  | 'children'
  | 'focusable'
  | 'role'
> &
  (DecorativeIconProps | InformativeIconProps) & {
    children: ReactNode;
    size?: IconSize;
  };

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      children,
      className,
      decorative = true,
      fill = 'none',
      label,
      size = 'md',
      stroke = 'currentColor',
      strokeWidth = 1.5,
      viewBox = '0 0 24 24',
      ...props
    },
    ref,
  ): ReactElement => (
    <svg
      ref={ref}
      {...props}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      className={clsx(styles.icon, styles.size[size], className)}
      data-size={size}
      fill={fill}
      focusable="false"
      role={decorative ? undefined : 'img'}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  ),
);

Icon.displayName = 'Icon';
