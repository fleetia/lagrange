import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

import * as styles from './SaveStatus.css';

export type SaveStatusState = 'idle' | 'saving' | 'saved' | 'error';

export type SaveStatusProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'aria-live' | 'children' | 'role'
> & {
  action?: ReactNode;
  message?: ReactNode;
  state?: SaveStatusState;
};

const DEFAULT_MESSAGES: Record<SaveStatusState, string> = {
  idle: '변경 사항 없음',
  saving: '저장 중',
  saved: '저장됨',
  error: '저장하지 못했습니다.',
};

const MARKERS: Record<SaveStatusState, string> = {
  idle: '○',
  saving: '◌',
  saved: '●',
  error: '×',
};

export function SaveStatus({
  action,
  className,
  message,
  state = 'idle',
  ...props
}: SaveStatusProps): ReactElement {
  const isError = state === 'error';

  return (
    <div
      className={clsx(styles.root, styles.tone[state], className)}
      {...props}
    >
      <div
        aria-atomic="true"
        aria-live={isError ? 'assertive' : 'polite'}
        className={styles.announcement}
        role={isError ? 'alert' : 'status'}
      >
        <span aria-hidden="true" className={styles.marker}>
          {MARKERS[state]}
        </span>
        <span className={styles.message}>{message ?? DEFAULT_MESSAGES[state]}</span>
      </div>
      {action !== undefined && action !== null ? (
        <div className={styles.action}>{action}</div>
      ) : null}
    </div>
  );
}
