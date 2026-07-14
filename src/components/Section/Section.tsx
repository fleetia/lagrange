import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './Section.css';

export type SectionBoundary = 'none' | 'weak' | 'boundary' | 'structural';
export type SectionSpacing = 'compact' | 'default' | 'relaxed';

export type SectionProps = ComponentPropsWithoutRef<'section'> & {
  boundary?: SectionBoundary;
  spacing?: SectionSpacing;
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      boundary = 'none',
      className,
      spacing = 'default',
      ...props
    },
    ref,
  ): ReactElement => (
    <section
      ref={ref}
      {...props}
      className={clsx(
        styles.section,
        styles.boundary[boundary],
        styles.spacing[spacing],
        className,
      )}
      data-boundary={boundary}
      data-spacing={spacing}
    />
  ),
);

Section.displayName = 'Section';
