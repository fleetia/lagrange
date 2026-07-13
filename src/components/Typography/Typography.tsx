import type { HTMLAttributes, ReactElement } from 'react';
import { createElement } from 'react';
import clsx from 'clsx';

import * as styles from './Typography.css';

export type TextVariant = 'body' | 'label' | 'caption' | 'data';
export type TextTone = 'default' | 'muted' | 'accent' | 'positive' | 'critical';
export type TextWeight = 'regular' | 'medium' | 'strong';
export type TextElement = 'span' | 'p' | 'div' | 'small';

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextElement;
  tone?: TextTone;
  truncate?: boolean;
  variant?: TextVariant;
  weight?: TextWeight;
};

export function Text({
  as = 'span',
  className,
  tone = 'default',
  truncate = false,
  variant = 'body',
  weight = 'regular',
  ...props
}: TextProps): ReactElement {
  return createElement(as, {
    className: clsx(
      styles.text,
      styles.textVariant[variant],
      styles.tone[tone],
      styles.weight[weight],
      truncate && styles.truncate,
      className,
    ),
    'data-tone': tone,
    'data-variant': variant,
    ...props,
  });
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariant = 'display' | 'section' | 'subsection' | 'label';

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  tone?: TextTone;
  variant?: HeadingVariant;
};

export function Heading({
  className,
  level = 2,
  tone = 'accent',
  variant = 'section',
  ...props
}: HeadingProps): ReactElement {
  return createElement(`h${level}`, {
    className: clsx(
      styles.heading,
      styles.headingVariant[variant],
      styles.tone[tone],
      className,
    ),
    'data-tone': tone,
    'data-variant': variant,
    ...props,
  });
}
