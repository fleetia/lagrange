import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import {
  joinIds,
  useFormFieldContext,
} from '../FormField/FormFieldContext';
import * as styles from './TextArea.css';

export type TextAreaResize = 'none' | 'vertical' | 'both';

export type TextAreaProps = ComponentPropsWithoutRef<'textarea'> & {
  isInvalid?: boolean;
  resize?: TextAreaResize;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      className,
      id,
      isInvalid: invalidProp,
      required,
      resize = 'vertical',
      rows = 3,
      ...props
    },
    ref,
  ): ReactElement => {
    const field = useFormFieldContext();
    const hasAriaError =
      ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== 'false';
    const isInvalid = Boolean(invalidProp || field?.isInvalid || hasAriaError);
    const isRequired = field?.isRequired ?? required ?? false;
    const resolvedAriaRequired = field
      ? isRequired || undefined
      : isRequired || ariaRequired || undefined;
    const resolvedAriaInvalid =
      ariaInvalid === 'grammar' || ariaInvalid === 'spelling'
        ? ariaInvalid
        : isInvalid || undefined;

    return (
      <textarea
        ref={ref}
        aria-describedby={joinIds(field?.describedBy, ariaDescribedBy)}
        aria-invalid={resolvedAriaInvalid}
        aria-required={resolvedAriaRequired}
        className={clsx(styles.textArea, styles.resize[resize], className)}
        data-invalid={isInvalid || undefined}
        data-resize={resize}
        id={field?.controlId ?? id}
        required={isRequired}
        rows={rows}
        {...props}
      />
    );
  },
);

TextArea.displayName = 'TextArea';
