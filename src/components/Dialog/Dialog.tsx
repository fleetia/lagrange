import type {
  ComponentPropsWithoutRef,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
  SyntheticEvent,
} from 'react';
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
} from 'react';
import clsx from 'clsx';

import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Heading } from '../Typography/Typography';
import * as styles from './Dialog.css';

export type DialogSize = 'small' | 'medium' | 'large';

export type DialogProps = Omit<
  ComponentPropsWithoutRef<'dialog'>,
  'children' | 'open' | 'title'
> & {
  children: ReactNode;
  closeLabel?: string;
  footer?: ReactNode;
  initialFocusRef?: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  size?: DialogSize;
  title: ReactNode;
};

function showDialog(dialog: HTMLDialogElement): void {
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
    return;
  }

  dialog.setAttribute('open', '');
}

function closeDialog(
  dialog: HTMLDialogElement,
  pendingCloseEvents: { current: number },
): void {
  if (typeof dialog.close === 'function') {
    pendingCloseEvents.current += 1;
    dialog.close();
    return;
  }

  dialog.removeAttribute('open');
}

function restoreFocus(element: HTMLElement | null): void {
  if (element?.isConnected) {
    element.focus();
  }
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      'aria-labelledby': ariaLabelledBy,
      children,
      className,
      closeLabel = 'Close dialog',
      footer,
      initialFocusRef,
      isOpen,
      onCancel,
      onClick,
      onClose,
      onOpenChange,
      size = 'medium',
      title,
      ...props
    },
    ref,
  ): ReactElement => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const pendingCloseEventsRef = useRef(0);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);
    const wasOpenRef = useRef(false);
    const titleId = `lagrange-dialog-${useId()}-title`;

    function setDialogRef(node: HTMLDialogElement | null): void {
      dialogRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }

    useEffect(() => {
      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      if (isOpen) {
        if (!wasOpenRef.current) {
          previouslyFocusedRef.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
        }

        if (!dialog.open) {
          showDialog(dialog);
        }

        wasOpenRef.current = true;
        initialFocusRef?.current?.focus();
        return;
      }

      if (dialog.open) {
        closeDialog(dialog, pendingCloseEventsRef);
      }

      if (wasOpenRef.current) {
        restoreFocus(previouslyFocusedRef.current);
      }

      wasOpenRef.current = false;
    }, [initialFocusRef, isOpen]);

    useEffect(
      () => (): void => {
        const dialog = dialogRef.current;

        if (dialog?.open) {
          closeDialog(dialog, pendingCloseEventsRef);
        }

        if (wasOpenRef.current) {
          restoreFocus(previouslyFocusedRef.current);
        }

        wasOpenRef.current = false;
      },
      [],
    );

    function handleCancel(event: SyntheticEvent<HTMLDialogElement>): void {
      onCancel?.(event);
      const wasCancelled = event.defaultPrevented;

      event.preventDefault();

      if (!wasCancelled) {
        onOpenChange(false);
      }
    }

    function handleClick(event: MouseEvent<HTMLDialogElement>): void {
      onClick?.(event);

      if (!event.defaultPrevented && event.target === event.currentTarget) {
        onOpenChange(false);
      }
    }

    function handleClose(event: SyntheticEvent<HTMLDialogElement>): void {
      onClose?.(event);

      if (pendingCloseEventsRef.current > 0) {
        pendingCloseEventsRef.current -= 1;
        return;
      }

      if (isOpen) {
        onOpenChange(false);
      }
    }

    return (
      <dialog
        {...props}
        ref={setDialogRef}
        aria-labelledby={ariaLabelledBy ?? titleId}
        aria-modal="true"
        className={clsx(styles.dialog, styles.size[size], className)}
        data-size={size}
        onCancel={handleCancel}
        onClick={handleClick}
        onClose={handleClose}
      >
        <div className={styles.frame}>
          <header className={styles.header}>
            <Heading
              className={styles.title}
              id={titleId}
              level={2}
              variant="subsection"
            >
              {title}
            </Heading>
            <IconButton
              label={closeLabel}
              onClick={() => onOpenChange(false)}
              size="compact"
              variant="quiet"
            >
              <Icon size="sm" viewBox="0 0 16 16">
                <path d="M3 3l10 10M13 3L3 13" />
              </Icon>
            </IconButton>
          </header>
          <div className={styles.body}>{children}</div>
          {footer ? <footer className={styles.footer}>{footer}</footer> : null}
        </div>
      </dialog>
    );
  },
);

Dialog.displayName = 'Dialog';
