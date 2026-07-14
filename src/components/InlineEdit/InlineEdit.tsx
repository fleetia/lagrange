import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  ReactElement,
} from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';

import { control } from '../controls.css';
import { joinIds } from '../FormField/FormFieldContext';
import * as styles from './InlineEdit.css';
import type { InlineEditProps } from './types';

export function InlineEdit({
  ariaLabel,
  className,
  commitOnBlur = true,
  disabled = false,
  emptyLabel = '값 없음',
  error,
  inputProps,
  isPending = false,
  onCancel,
  onCommit,
  readOnly = false,
  value,
  ...rootProps
}: InlineEditProps): ReactElement {
  const canEdit = !disabled && !readOnly && !isPending;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const shouldRestoreFocusRef = useRef(false);
  const generatedId = useId();
  const errorId = error ? `lagrange-inline-edit-${generatedId}-error` : undefined;
  const {
    'aria-describedby': inputAriaDescribedBy,
    'aria-invalid': inputAriaInvalid,
    className: inputClassName,
    onBlur: inputOnBlur,
    onKeyDown: inputOnKeyDown,
    ...nativeInputProps
  } = inputProps ?? {};
  const hasInputAriaError =
    inputAriaInvalid !== undefined &&
    inputAriaInvalid !== false &&
    inputAriaInvalid !== 'false';
  const isInvalid = Boolean(error) || hasInputAriaError;

  if (isEditing && !canEdit) {
    setDraft(value);
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing || !shouldRestoreFocusRef.current) {
      return;
    }

    shouldRestoreFocusRef.current = false;
    triggerRef.current?.focus();
  }, [isEditing]);

  function startEditing(): void {
    if (!canEdit) {
      return;
    }

    setDraft(value);
    setIsEditing(true);
  }

  function cancelEditing(shouldRestoreFocus = false): void {
    shouldRestoreFocusRef.current = shouldRestoreFocus;
    setDraft(value);
    setIsEditing(false);
    onCancel?.();
  }

  function commitEditing(shouldRestoreFocus = false): void {
    if (disabled || readOnly || isPending) {
      return;
    }

    shouldRestoreFocusRef.current = shouldRestoreFocus;
    setIsEditing(false);

    if (draft !== value) {
      onCommit(draft);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setDraft(event.currentTarget.value);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    inputOnBlur?.(event);

    if (commitOnBlur && !event.defaultPrevented) {
      commitEditing();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    inputOnKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEditing(true);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      commitEditing(true);
    }
  }

  return (
    <div className={clsx(styles.root, className)} {...rootProps}>
      {isEditing ? (
        <input
          {...nativeInputProps}
          aria-describedby={joinIds(errorId, inputAriaDescribedBy)}
          aria-invalid={
            inputAriaInvalid === 'grammar' || inputAriaInvalid === 'spelling'
              ? inputAriaInvalid
              : isInvalid || undefined
          }
          aria-label={ariaLabel}
          autoFocus
          className={clsx(control, styles.input, inputClassName)}
          data-invalid={isInvalid || undefined}
          disabled={disabled || isPending}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          value={draft}
        />
      ) : (
        <button
          ref={triggerRef}
          aria-label={`${ariaLabel} 수정`}
          className={styles.trigger}
          disabled={disabled || readOnly || isPending}
          onClick={startEditing}
          type="button"
        >
          <span className={clsx(styles.value, !value && styles.empty)}>
            {value || emptyLabel}
          </span>
          <span aria-hidden="true" className={styles.marker}>
            {isPending ? '···' : '↵'}
          </span>
        </button>
      )}
      {error ? (
        <p className={styles.feedback} id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
