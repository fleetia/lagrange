import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { forwardRef, useId } from 'react';
import clsx from 'clsx';

import * as styles from './FieldGroup.css';

export type FieldGroupProps = Omit<
  ComponentPropsWithoutRef<'fieldset'>,
  'children'
> & {
  children: ReactNode;
  description?: ReactNode;
  legend: ReactNode;
};

export const FieldGroup = forwardRef<HTMLFieldSetElement, FieldGroupProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      children,
      className,
      description,
      legend,
      ...props
    },
    ref,
  ): ReactElement => {
    const generatedId = useId();
    const descriptionId = description
      ? `lagrange-field-group-${generatedId}-description`
      : undefined;
    const describedBy = [ariaDescribedBy, descriptionId]
      .filter((id): id is string => Boolean(id))
      .join(' ') || undefined;

    return (
      <fieldset
        ref={ref}
        aria-describedby={describedBy}
        className={clsx(styles.group, className)}
        {...props}
      >
        <legend className={styles.legend}>{legend}</legend>
        {description ? (
          <p className={styles.description} id={descriptionId}>
            {description}
          </p>
        ) : null}
        <div aria-hidden="true" className={styles.structuralRule} />
        {children}
      </fieldset>
    );
  },
);

FieldGroup.displayName = 'FieldGroup';

export type FieldGridColumns = 'single' | 'double' | 'triple' | 'auto';

export type FieldGridProps = ComponentPropsWithoutRef<'div'> & {
  columns?: FieldGridColumns;
};

export const FieldGrid = forwardRef<HTMLDivElement, FieldGridProps>(
  (
    { className, columns = 'double', ...props },
    ref,
  ): ReactElement => (
    <div
      ref={ref}
      className={clsx(styles.grid, styles.columns[columns], className)}
      data-columns={columns}
      {...props}
    />
  ),
);

FieldGrid.displayName = 'FieldGrid';
