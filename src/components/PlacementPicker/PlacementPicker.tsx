import type {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactElement,
} from 'react';
import { forwardRef, useState } from 'react';
import clsx from 'clsx';

import * as styles from './PlacementPicker.css';
import { PLACEMENTS, type Placement } from './placements';

type ArrowKey = 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp';

export type PlacementPickerProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'defaultValue' | 'onChange'
> & {
  defaultValue?: Placement;
  disabled?: boolean;
  getItemLabel?: (placement: Placement) => string;
  label: string;
  onValueChange?: (placement: Placement) => void;
  value?: Placement;
};

function isArrowKey(key: string): key is ArrowKey {
  return (
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight' ||
    key === 'ArrowUp'
  );
}

function getNextPlacement(current: Placement, key: ArrowKey): Placement {
  const currentIndex = PLACEMENTS.indexOf(current);
  const row = Math.floor(currentIndex / 3);
  const column = currentIndex % 3;

  switch (key) {
    case 'ArrowDown':
      return PLACEMENTS[((row + 1) % 3) * 3 + column] ?? current;
    case 'ArrowLeft':
      return PLACEMENTS[row * 3 + ((column + 2) % 3)] ?? current;
    case 'ArrowRight':
      return PLACEMENTS[row * 3 + ((column + 1) % 3)] ?? current;
    case 'ArrowUp':
      return PLACEMENTS[((row + 2) % 3) * 3 + column] ?? current;
  }
}

export const PlacementPicker = forwardRef<
  HTMLDivElement,
  PlacementPickerProps
>(
  (
    {
      className,
      defaultValue = 'center-center',
      disabled = false,
      getItemLabel,
      label,
      onValueChange,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activePlacement = value ?? internalValue;
    const isControlled = value !== undefined;

    function selectPlacement(nextPlacement: Placement): void {
      if (nextPlacement === activePlacement) {
        return;
      }

      if (!isControlled) {
        setInternalValue(nextPlacement);
      }

      onValueChange?.(nextPlacement);
    }

    function handleKeyDown(
      event: KeyboardEvent<HTMLButtonElement>,
      placement: Placement,
    ): void {
      if (!isArrowKey(event.key)) {
        return;
      }

      event.preventDefault();

      const nextPlacement = getNextPlacement(placement, event.key);
      const nextOption = event.currentTarget.parentElement?.querySelector<
        HTMLButtonElement
      >(`[data-placement="${nextPlacement}"]`);

      selectPlacement(nextPlacement);
      nextOption?.focus();
    }

    return (
      <div
        {...props}
        ref={ref}
        aria-disabled={disabled || undefined}
        aria-label={label}
        className={clsx(styles.picker, className)}
        role="radiogroup"
      >
        {PLACEMENTS.map((placement) => {
          const isSelected = placement === activePlacement;

          return (
            <button
              key={placement}
              aria-checked={isSelected}
              aria-label={getItemLabel?.(placement) ?? placement}
              className={styles.option}
              data-checked={isSelected || undefined}
              data-placement={placement}
              disabled={disabled}
              onClick={() => selectPlacement(placement)}
              onKeyDown={(event) => handleKeyDown(event, placement)}
              role="radio"
              tabIndex={isSelected ? 0 : -1}
              type="button"
            />
          );
        })}
      </div>
    );
  },
);

PlacementPicker.displayName = 'PlacementPicker';
