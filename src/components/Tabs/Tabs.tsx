import type {
  ComponentPropsWithoutRef,
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
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import * as styles from './Tabs.css';

export type TabsOrientation = 'horizontal' | 'vertical';

type TabsContextValue = {
  baseId: string;
  onValueChange: (value: string) => void;
  orientation: TabsOrientation;
  value?: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string): TabsContextValue {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`${componentName} must be rendered inside Tabs.`);
  }

  return context;
}

function getValueId(value: string): string {
  const codePoints = Array.from(value, (character) =>
    (character.codePointAt(0) ?? 0).toString(16),
  );

  return codePoints.length > 0 ? codePoints.join('-') : 'empty';
}

function getTabId(baseId: string, value: string): string {
  return `${baseId}-tab-${getValueId(value)}`;
}

function getPanelId(baseId: string, value: string): string {
  return `${baseId}-panel-${getValueId(value)}`;
}

export type TabsProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> & {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  value?: string;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      className,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : internalValue;
    const baseId = `lagrange-tabs-${useId()}`;

    const updateValue = useCallback(
      (nextValue: string): void => {
        if (!isControlled) {
          setInternalValue(nextValue);
        }

        if (nextValue !== selectedValue) {
          onValueChange?.(nextValue);
        }
      },
      [isControlled, onValueChange, selectedValue],
    );

    const contextValue = useMemo<TabsContextValue>(
      () => ({
        baseId,
        onValueChange: updateValue,
        orientation,
        value: selectedValue,
      }),
      [
        baseId,
        orientation,
        selectedValue,
        updateValue,
      ],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          {...props}
          className={clsx(
            styles.root,
            styles.rootOrientation[orientation],
            className,
          )}
          data-orientation={orientation}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

export type TabListProps = Omit<ComponentPropsWithoutRef<'div'>, 'role'>;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className, ...props }, ref): ReactElement => {
    const context = useTabsContext('TabList');
    const listRef = useRef<HTMLDivElement | null>(null);
    const fallbackRequestRef = useRef<{
      from: string | undefined;
      to: string;
    } | null>(null);

    function setListRef(node: HTMLDivElement | null): void {
      listRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }

    useEffect(() => {
      const enabledTabs = listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      );
      const hasValidSelection = [...(enabledTabs ?? [])].some(
        (tab) => tab.dataset.tabValue === context.value,
      );
      const firstEnabledTab = enabledTabs?.[0];
      const firstValue = firstEnabledTab?.dataset.tabValue;

      if (hasValidSelection || firstValue === undefined) {
        fallbackRequestRef.current = null;
        return;
      }

      const previousRequest = fallbackRequestRef.current;
      if (
        previousRequest !== null &&
        previousRequest.from === context.value &&
        previousRequest.to === firstValue
      ) {
        return;
      }

      fallbackRequestRef.current = { from: context.value, to: firstValue };
      context.onValueChange(firstValue);
    }, [children, context]);

    return (
      <div
        {...props}
        ref={setListRef}
        aria-orientation={context.orientation}
        className={clsx(
          styles.list,
          styles.listOrientation[context.orientation],
          className,
        )}
        data-orientation={context.orientation}
        role="tablist"
      >
        {children}
      </div>
    );
  },
);

TabList.displayName = 'TabList';

export type TabProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  | 'aria-controls'
  | 'aria-selected'
  | 'children'
  | 'role'
  | 'tabIndex'
  | 'type'
  | 'value'
> & {
  children: ReactNode;
  value: string;
};

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      children,
      className,
      disabled = false,
      onClick,
      onKeyDown,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const context = useTabsContext('Tab');
    const isSelected = context.value === value;

    function handleClick(event: MouseEvent<HTMLButtonElement>): void {
      onClick?.(event);

      if (!event.defaultPrevented) {
        context.onValueChange(value);
      }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const isPrevious =
        (context.orientation === 'horizontal' && event.key === 'ArrowLeft') ||
        (context.orientation === 'vertical' && event.key === 'ArrowUp');
      const isNext =
        (context.orientation === 'horizontal' && event.key === 'ArrowRight') ||
        (context.orientation === 'vertical' && event.key === 'ArrowDown');

      if (
        !isPrevious &&
        !isNext &&
        event.key !== 'Home' &&
        event.key !== 'End'
      ) {
        return;
      }

      const tabList = event.currentTarget.closest('[role="tablist"]');

      if (!(tabList instanceof HTMLElement)) {
        return;
      }

      const enabledTabs = Array.from(
        tabList.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not(:disabled)',
        ),
      );
      const currentIndex = enabledTabs.indexOf(event.currentTarget);

      if (currentIndex < 0 || enabledTabs.length === 0) {
        return;
      }

      let nextIndex = currentIndex;

      if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = enabledTabs.length - 1;
      } else if (isNext) {
        nextIndex = (currentIndex + 1) % enabledTabs.length;
      } else if (isPrevious) {
        nextIndex =
          (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
      }

      const nextTab = enabledTabs[nextIndex];
      const nextValue = nextTab?.dataset.tabValue;

      if (!nextTab || nextValue === undefined) {
        return;
      }

      event.preventDefault();
      nextTab.focus();
      context.onValueChange(nextValue);
    }

    return (
      <button
        {...props}
        ref={ref}
        aria-controls={getPanelId(context.baseId, value)}
        aria-selected={isSelected}
        className={clsx(styles.tab, className)}
        data-tab-value={value}
        disabled={disabled}
        id={getTabId(context.baseId, value)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        type="button"
      >
        {children}
      </button>
    );
  },
);

Tab.displayName = 'Tab';

export type TabPanelProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'aria-labelledby' | 'hidden' | 'role'
> & {
  value: string;
};

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  (
    {
      children,
      className,
      tabIndex = 0,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const context = useTabsContext('TabPanel');
    const isSelected = context.value === value;

    return (
      <div
        {...props}
        ref={ref}
        aria-labelledby={getTabId(context.baseId, value)}
        className={clsx(styles.panel, className)}
        hidden={!isSelected}
        id={getPanelId(context.baseId, value)}
        role="tabpanel"
        tabIndex={tabIndex}
      >
        {children}
      </div>
    );
  },
);

TabPanel.displayName = 'TabPanel';
