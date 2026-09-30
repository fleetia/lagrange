import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  KeyboardEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, useRef } from 'react';
import clsx from 'clsx';

import { Text } from '../Typography';
import * as styles from './IconTile.css';

export type IconTileLayout = 'vertical' | 'horizontal';

export type IconTileProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> & {
  icon: ReactNode;
  iconSize?: number;
  label: string;
  labelProps?: Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'tabIndex'>;
  layout?: IconTileLayout;
};

type IconTileStyle = CSSProperties & {
  '--lagrange-icon-tile-icon-size': string;
};

export const IconTile = forwardRef<HTMLButtonElement, IconTileProps>(
  (
    {
      'aria-label': ariaLabel,
      className,
      disabled = false,
      icon,
      iconSize = 28,
      label,
      labelProps,
      layout = 'vertical',
      onKeyDown,
      style,
      type = 'button',
      ...props
    },
    ref,
  ): ReactElement => {
    const labelRef = useRef<HTMLSpanElement>(null);
    const tileStyle: IconTileStyle = {
      '--lagrange-icon-tile-icon-size': `${iconSize}px`,
      ...style,
    };

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
      onKeyDown?.(event);

      if (
        disabled ||
        event.defaultPrevented ||
        event.target !== event.currentTarget ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        layout !== 'vertical'
      ) {
        return;
      }

      const labelElement = labelRef.current;
      if (
        !labelElement ||
        labelElement.scrollHeight <= labelElement.clientHeight
      ) {
        return;
      }

      const lineHeight = Number.parseFloat(
        getComputedStyle(labelElement).lineHeight,
      );
      const lineStep = Number.isFinite(lineHeight)
        ? lineHeight
        : labelElement.clientHeight;
      let scrollTop = labelElement.scrollTop;

      switch (event.key) {
        case 'ArrowUp':
          scrollTop -= lineStep;
          break;
        case 'ArrowDown':
          scrollTop += lineStep;
          break;
        case 'PageUp':
          scrollTop -= labelElement.clientHeight;
          break;
        case 'PageDown':
          scrollTop += labelElement.clientHeight;
          break;
        case 'Home':
          scrollTop = 0;
          break;
        case 'End':
          scrollTop = labelElement.scrollHeight;
          break;
        default:
          return;
      }

      event.preventDefault();
      labelElement.scrollTo({ top: scrollTop });
    }

    return (
      <button
        ref={ref}
        {...props}
        aria-label={ariaLabel ?? label}
        className={clsx(styles.tile, styles.layout[layout], className)}
        data-lagrange-part="icon-tile"
        data-layout={layout}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        style={tileStyle}
        type={type}
      >
        <span
          aria-hidden="true"
          className={styles.icon}
          data-lagrange-part="icon-tile-icon"
        >
          {icon}
        </span>
        <span
          {...labelProps}
          ref={labelRef}
          className={clsx(
            styles.label,
            styles.labelLayout[layout],
            labelProps?.className,
          )}
          data-lagrange-part="icon-tile-label"
        >
          <Text className={styles.text} variant="caption" weight="medium">
            {label}
          </Text>
        </span>
      </button>
    );
  },
);

IconTile.displayName = 'IconTile';
