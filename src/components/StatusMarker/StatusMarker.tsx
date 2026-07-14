import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './StatusMarker.css';

export type StatusMarkerShape = 'line' | 'square';
export type StatusMarkerTone =
  | 'default'
  | 'muted'
  | 'accent'
  | 'positive'
  | 'critical';

export type StatusMarkerProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'children'
> & {
  children: ReactNode;
  shape?: StatusMarkerShape;
  tone?: StatusMarkerTone;
};

export const StatusMarker = forwardRef<HTMLSpanElement, StatusMarkerProps>(
  (
    {
      children,
      className,
      shape = 'line',
      tone = 'default',
      ...props
    },
    ref,
  ): ReactElement => (
    <span
      ref={ref}
      {...props}
      className={clsx(styles.marker, styles.tone[tone], className)}
      data-shape={shape}
      data-tone={tone}
    >
      <span aria-hidden="true" className={clsx(styles.indicator, styles.shape[shape])} />
      <span className={styles.label}>{children}</span>
    </span>
  ),
);

StatusMarker.displayName = 'StatusMarker';
