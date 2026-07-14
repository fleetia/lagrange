import type {
  ComponentPropsWithoutRef,
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import * as styles from './ContextMenu.css';
import {
  getClampedMenuPosition,
  type ContextMenuPoint,
  type ContextMenuPosition,
} from './helpers';

type CloseMenu = (shouldRestoreFocus?: boolean) => void;

const ContextMenuCloseContext = createContext<CloseMenu | null>(null);

export type ContextMenuProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'aria-label' | 'children'
> & {
  anchorPoint: ContextMenuPoint;
  children: ReactNode;
  isOpen: boolean;
  label: string;
  onOpenChange: (isOpen: boolean) => void;
};

export type ContextMenuItemTone = 'critical' | 'default';

export type ContextMenuItemProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'onSelect'
> & {
  onSelect?: () => void;
  tone?: ContextMenuItemTone;
};

function assignRef<T>(ref: ForwardedRef<T>, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function getEnabledMenuItems(menu: HTMLElement): readonly HTMLButtonElement[] {
  return [...menu.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')]
    .filter((item) => !item.disabled);
}

function isPopoverOpen(element: HTMLElement): boolean {
  try {
    return element.matches(':popover-open');
  } catch {
    return false;
  }
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  (
    {
      anchorPoint,
      children,
      className,
      isOpen,
      label,
      onKeyDown,
      onOpenChange,
      style,
      ...props
    },
    ref,
  ): ReactElement | null => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const shouldRestoreFocusRef = useRef(true);
    const [hasPopoverFallback, setHasPopoverFallback] = useState(false);
    const [position, setPosition] = useState<ContextMenuPosition>({
      left: anchorPoint.x,
      top: anchorPoint.y,
    });
    const setMenuRef = useCallback(
      (node: HTMLDivElement | null): void => {
        menuRef.current = node;
        assignRef(ref, node);
      },
      [ref],
    );
    const closeMenu = useCallback<CloseMenu>(
      (shouldRestoreFocus = true): void => {
        shouldRestoreFocusRef.current = shouldRestoreFocus;
        onOpenChange(false);
      },
      [onOpenChange],
    );

    useLayoutEffect(() => {
      if (!isOpen) {
        return undefined;
      }

      if (!previousFocusRef.current?.isConnected) {
        previousFocusRef.current = document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      }
      shouldRestoreFocusRef.current = true;

      return () => {
        const previousFocus = previousFocusRef.current;

        if (!shouldRestoreFocusRef.current) {
          previousFocusRef.current = null;
          return;
        }

        queueMicrotask(() => {
          if (menuRef.current?.isConnected) {
            return;
          }

          previousFocusRef.current = null;

          if (previousFocus?.isConnected) {
            previousFocus.focus();
          }
        });
      };
    }, [isOpen]);

    useLayoutEffect(() => {
      const menu = menuRef.current;

      if (!isOpen || !menu) {
        return undefined;
      }

      if (!hasPopoverFallback && typeof menu.showPopover === 'function') {
        try {
          if (!isPopoverOpen(menu)) {
            menu.showPopover();
          }
        } catch {
          menu.removeAttribute('popover');
          setHasPopoverFallback(true);
        }
      }

      const firstEnabledItem = getEnabledMenuItems(menu)[0];
      (firstEnabledItem ?? menu).focus();

      return () => {
        if (
          typeof menu.hidePopover === 'function' &&
          isPopoverOpen(menu)
        ) {
          menu.hidePopover();
        }
      };
    }, [hasPopoverFallback, isOpen]);

    useLayoutEffect(() => {
      const menu = menuRef.current;

      if (!isOpen || !menu) {
        return undefined;
      }

      const openMenu = menu;

      function updatePosition(): void {
        const bounds = openMenu.getBoundingClientRect();
        const nextPosition = getClampedMenuPosition(
          anchorPoint,
          { height: bounds.height, width: bounds.width },
          { height: window.innerHeight, width: window.innerWidth },
        );

        setPosition((currentPosition): ContextMenuPosition =>
          currentPosition.left === nextPosition.left &&
          currentPosition.top === nextPosition.top
            ? currentPosition
            : nextPosition,
        );
      }

      updatePosition();
      window.addEventListener('resize', updatePosition);
      const resizeObserver = typeof ResizeObserver === 'function'
        ? new ResizeObserver(updatePosition)
        : null;
      resizeObserver?.observe(openMenu);

      return () => {
        window.removeEventListener('resize', updatePosition);
        resizeObserver?.disconnect();
      };
    }, [anchorPoint, isOpen]);

    useEffect(() => {
      const menu = menuRef.current;

      if (!isOpen || !menu) {
        return undefined;
      }

      const openMenu = menu;

      function handleOutsidePointerDown(event: PointerEvent): void {
        const target = event.target;

        if (target instanceof Node && !openMenu.contains(target)) {
          closeMenu(false);
        }
      }

      document.addEventListener('pointerdown', handleOutsidePointerDown, true);

      return () => {
        document.removeEventListener(
          'pointerdown',
          handleOutsidePointerDown,
          true,
        );
      };
    }, [closeMenu, isOpen]);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key === 'Tab') {
        closeMenu(false);
        return;
      }

      const items = menuRef.current
        ? getEnabledMenuItems(menuRef.current)
        : [];

      if (items.length === 0) {
        return;
      }

      const currentIndex = items.findIndex(
        (item) => item === document.activeElement,
      );
      let nextIndex: number | null = null;

      switch (event.key) {
        case 'ArrowDown':
          nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
          break;
        case 'ArrowUp':
          nextIndex = currentIndex < 0
            ? items.length - 1
            : (currentIndex - 1 + items.length) % items.length;
          break;
        case 'End':
          nextIndex = items.length - 1;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        default:
          break;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
      items[nextIndex]?.focus();
    }

    if (!isOpen) {
      return null;
    }

    return (
      <ContextMenuCloseContext.Provider value={closeMenu}>
        <div
          {...props}
          ref={setMenuRef}
          aria-label={label}
          className={clsx(styles.menu, className)}
          onKeyDown={handleKeyDown}
          popover={hasPopoverFallback ? undefined : 'manual'}
          role="menu"
          style={{ ...style, left: position.left, top: position.top }}
          tabIndex={-1}
        >
          {children}
        </div>
      </ContextMenuCloseContext.Provider>
    );
  },
);

ContextMenu.displayName = 'ContextMenu';

export const ContextMenuItem = forwardRef<
  HTMLButtonElement,
  ContextMenuItemProps
>(
  (
    {
      className,
      disabled = false,
      onClick,
      onSelect,
      tone = 'default',
      type = 'button',
      ...props
    },
    ref,
  ): ReactElement => {
    const closeMenu = useContext(ContextMenuCloseContext);

    function handleClick(event: MouseEvent<HTMLButtonElement>): void {
      onClick?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      onSelect?.();
      closeMenu?.(true);
    }

    return (
      <button
        {...props}
        ref={ref}
        className={clsx(styles.item, styles.itemTone[tone], className)}
        data-tone={tone}
        disabled={disabled}
        onClick={handleClick}
        role="menuitem"
        tabIndex={-1}
        type={type}
      />
    );
  },
);

ContextMenuItem.displayName = 'ContextMenuItem';
