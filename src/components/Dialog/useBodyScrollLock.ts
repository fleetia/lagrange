import { useEffect, type RefObject } from 'react';

const OVERFLOW_PROPERTIES = ['overflow', 'overflow-x', 'overflow-y'] as const;

type BodyScrollLock = {
  count: number;
  declarations: { property: string; value: string; priority: string }[];
};

const bodyScrollLocks = new WeakMap<HTMLElement, BodyScrollLock>();

export function useBodyScrollLock(
  dialogRef: RefObject<HTMLDialogElement | null>,
  isOpen: boolean,
): void {
  useEffect(() => {
    const body = dialogRef.current?.ownerDocument.body;

    if (!isOpen || !body) {
      return;
    }

    let lock = bodyScrollLocks.get(body);

    if (!lock) {
      lock = {
        count: 0,
        declarations: OVERFLOW_PROPERTIES.map((property) => ({
          property,
          value: body.style.getPropertyValue(property),
          priority: body.style.getPropertyPriority(property),
        })),
      };
      bodyScrollLocks.set(body, lock);
      body.style.setProperty('overflow', 'hidden', 'important');
    }

    lock.count += 1;
    const activeLock = lock;

    return (): void => {
      activeLock.count -= 1;

      if (activeLock.count > 0) {
        return;
      }

      for (const property of OVERFLOW_PROPERTIES) {
        body.style.removeProperty(property);
      }

      for (const { property, value, priority } of activeLock.declarations) {
        if (value) {
          body.style.setProperty(property, value, priority);
        }
      }

      bodyScrollLocks.delete(body);
    };
  }, [dialogRef, isOpen]);
}
