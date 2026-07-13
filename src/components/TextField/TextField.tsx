import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { control } from '../controls.css';
import {
  joinIds,
  useFormFieldContext,
} from '../FormField/FormFieldContext';

export type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  isInvalid?: boolean;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      className,
      id,
      isInvalid: invalidProp,
      required,
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
      <input
        ref={ref}
        aria-describedby={joinIds(field?.describedBy, ariaDescribedBy)}
        aria-invalid={resolvedAriaInvalid}
        aria-required={resolvedAriaRequired}
        className={clsx(control, className)}
        data-invalid={isInvalid || undefined}
        id={field?.controlId ?? id}
        required={isRequired}
        {...props}
      />
    );
  },
);

TextField.displayName = 'TextField';
