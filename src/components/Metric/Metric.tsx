import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './Metric.css';

export type MetricAlign = 'start' | 'end';
export type MetricSize = 'compact' | 'default' | 'prominent';
export type MetricTone =
  | 'default'
  | 'muted'
  | 'accent'
  | 'positive'
  | 'critical';

export type MetricProps = Omit<ComponentPropsWithoutRef<'dl'>, 'children'> & {
  align?: MetricAlign;
  detail?: ReactNode;
  label: ReactNode;
  size?: MetricSize;
  tone?: MetricTone;
  value: ReactNode;
};

export const Metric = forwardRef<HTMLDListElement, MetricProps>(
  (
    {
      align = 'start',
      className,
      detail,
      label,
      size = 'default',
      tone = 'default',
      value,
      ...props
    },
    ref,
  ): ReactElement => (
    <dl
      ref={ref}
      {...props}
      className={clsx(styles.metric, styles.align[align], className)}
      data-size={size}
      data-tone={tone}
    >
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.definition}>
        <span className={clsx(styles.value, styles.size[size], styles.tone[tone])}>
          {value}
        </span>
        {detail !== undefined && detail !== null ? (
          <span className={styles.detail}>{detail}</span>
        ) : null}
      </dd>
    </dl>
  ),
);

Metric.displayName = 'Metric';
