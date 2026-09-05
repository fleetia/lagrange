import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent, RefObject } from 'react';
import { applyColorAlpha, normalizeColor } from '../../ColorField/helpers';
import { getHslColor, getPointerHue } from '../helpers';
import type { ColorFormat, ColorPickerProps, HslColor } from '../types';

type PickerState = {
  value: string;
  isInvalid: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  format: ColorFormat;
  setFormat: (format: ColorFormat) => void;
  hsl: HslColor;
  dialogId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  dialogRef: RefObject<HTMLDialogElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  commit: (value: string) => void;
  changeHsl: (channel: keyof HslColor, value: number) => void;
  handleWheelPointer: (event: PointerEvent<HTMLDivElement>) => void;
  handleWheelKey: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export function useColorPicker({
  value: rawValue,
  onValueChange,
  showAlpha = false,
  disabled,
  readOnly,
}: ColorPickerProps): PickerState {
  const value = normalizeColor(rawValue, showAlpha);
  const normalizedValue = value ?? (showAlpha ? '#000000ff' : '#000000');
  const [requestedOpen, setOpen] = useState(false);
  if (requestedOpen && (disabled || readOnly)) setOpen(false);
  const open = requestedOpen && !disabled && !readOnly;
  const [format, setFormat] = useState<ColorFormat>('hex');
  const opaqueColor = normalizedValue.slice(0, 7);
  const [colorState, setColorState] = useState(() => ({
    sourceColor: opaqueColor,
    emittedColor: opaqueColor,
    hsl: getHslColor(opaqueColor),
  }));
  const hsl =
    colorState.emittedColor === opaqueColor
      ? colorState.hsl
      : getHslColor(opaqueColor, colorState.hsl.hue);

  if (colorState.sourceColor !== opaqueColor) {
    setColorState({ sourceColor: opaqueColor, emittedColor: opaqueColor, hsl });
  }
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogId = `lagrange-color-picker-${useId()}`;

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;
    if (!trigger || !dialog) return;
    function position(): void {
      if (!trigger || !dialog) return;
      const anchor = trigger.getBoundingClientRect();
      const panel = dialog.getBoundingClientRect();
      const left = Math.max(
        8,
        Math.min(
          anchor.right - panel.width,
          window.innerWidth - panel.width - 8,
        ),
      );
      const below = anchor.bottom + 4;
      const top =
        below + panel.height <= window.innerHeight - 8
          ? below
          : Math.max(8, anchor.top - panel.height - 4);
      dialog.style.left = `${left}px`;
      dialog.style.top = `${top}px`;
    }
    position();
    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(position);
    observer?.observe(dialog);
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return (): void => {
      observer?.disconnect();
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [open]);

  function commit(nextValue: string): void {
    if (disabled || readOnly) return;
    const next = normalizeColor(nextValue, showAlpha);
    if (next && next !== normalizedValue) onValueChange?.(next);
  }

  function changeHsl(channel: keyof HslColor, channelValue: number): void {
    const next = { ...hsl, [channel]: channelValue };
    const color = normalizeColor(
      `hsl(${next.hue}, ${next.saturation}%, ${next.lightness}%)`,
    );
    if (color) {
      setColorState({
        sourceColor: opaqueColor,
        emittedColor: color,
        hsl: next,
      });
      commit(
        showAlpha ? (applyColorAlpha(color, normalizedValue) ?? color) : color,
      );
    }
  }

  function handleWheelPointer(event: PointerEvent<HTMLDivElement>): void {
    if (
      event.type === 'pointermove' &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    )
      return;
    if (event.type === 'pointerdown') {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.focus();
    }
    const rect = event.currentTarget.getBoundingClientRect();
    changeHsl(
      'hue',
      getPointerHue(
        event.clientX - rect.left - rect.width / 2,
        event.clientY - rect.top - rect.height / 2,
      ),
    );
  }

  function handleWheelKey(event: KeyboardEvent<HTMLDivElement>): void {
    const step = event.shiftKey ? 10 : 1;
    const changes: Record<string, number> = {
      ArrowRight: step,
      ArrowUp: step,
      ArrowLeft: -step,
      ArrowDown: -step,
      PageUp: 10,
      PageDown: -10,
    };
    if (event.key === 'Home' || event.key === 'End' || event.key in changes) {
      event.preventDefault();
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? 359
            : (Math.round(hsl.hue) + (changes[event.key] ?? 0) + 360) % 360;
      changeHsl('hue', next);
    }
  }

  return {
    value: normalizedValue,
    isInvalid: value === null,
    open,
    setOpen,
    format,
    setFormat,
    hsl,
    dialogId,
    triggerRef,
    dialogRef,
    inputRef,
    commit,
    changeHsl,
    handleWheelPointer,
    handleWheelKey,
  };
}
