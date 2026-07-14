import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type InlineEditProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'onChange'
> & {
  ariaLabel: string;
  commitOnBlur?: boolean;
  disabled?: boolean;
  emptyLabel?: ReactNode;
  error?: ReactNode;
  inputProps?: Omit<
    ComponentPropsWithoutRef<'input'>,
    | 'aria-label'
    | 'autoFocus'
    | 'defaultValue'
    | 'disabled'
    | 'onChange'
    | 'readOnly'
    | 'value'
  >;
  isPending?: boolean;
  onCancel?: () => void;
  onCommit: (value: string) => void;
  readOnly?: boolean;
  value: string;
};
