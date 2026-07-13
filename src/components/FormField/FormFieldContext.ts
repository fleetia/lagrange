import { createContext, useContext } from 'react';

export type FormFieldContextValue = {
  controlId: string;
  describedBy?: string;
  isInvalid: boolean;
  isRequired: boolean;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null,
);

export function useFormFieldContext(): FormFieldContextValue | null {
  return useContext(FormFieldContext);
}

export function joinIds(
  ...ids: readonly (string | undefined)[]
): string | undefined {
  const joinedIds = ids.filter((id): id is string => Boolean(id)).join(' ');

  return joinedIds || undefined;
}
