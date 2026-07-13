import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { Children, forwardRef, Fragment, useId, useMemo } from 'react';
import clsx from 'clsx';

import * as styles from './FormField.css';
import {
  FormFieldContext,
  joinIds,
  type FormFieldContextValue,
} from './FormFieldContext';

export type FormFieldProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  children: ReactElement;
  description?: ReactNode;
  error?: ReactNode;
  id?: string;
  label: ReactNode;
  marker?: ReactNode;
  required?: boolean;
};

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      children,
      className,
      description,
      error,
      id,
      label,
      marker,
      required = false,
      ...props
    },
    ref,
  ): ReactElement => {
    const generatedId = useId();
    const controlId = id ?? `lagrange-field-${generatedId}`;
    const descriptionId = description
      ? `${controlId}-description`
      : undefined;
    const errorId = error ? `${controlId}-error` : undefined;
    const isInvalid = Boolean(error);
    const contextValue = useMemo<FormFieldContextValue>(
      () => ({
        controlId,
        describedBy: joinIds(descriptionId, errorId),
        isInvalid,
        isRequired: required,
      }),
      [controlId, descriptionId, errorId, isInvalid, required],
    );
    const control = Children.only(children);

    if (control.type === Fragment) {
      throw new Error('FormField requires one direct form control.');
    }

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div ref={ref} className={clsx(styles.field, className)} {...props}>
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor={controlId}>
              {label}
              {required ? (
                <span aria-hidden="true" className={styles.required}>
                  *
                </span>
              ) : null}
            </label>
            {marker ? <span className={styles.marker}>{marker}</span> : null}
          </div>
          {control}
          {description ? (
            <p
              className={clsx(styles.feedback, styles.description)}
              id={descriptionId}
            >
              {description}
            </p>
          ) : null}
          {error ? (
            <p
              className={clsx(styles.feedback, styles.error)}
              id={errorId}
              role="alert"
            >
              {error}
            </p>
          ) : null}
        </div>
      </FormFieldContext.Provider>
    );
  },
);

FormField.displayName = 'FormField';
