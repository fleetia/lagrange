import type { ReactElement } from 'react';
import clsx from 'clsx';

import { Button } from '../Button';
import { ColorField } from '../ColorField';
import { applyColorAlpha, normalizeColor } from '../ColorField/helpers';
import { Dialog } from '../Dialog';
import { FormField } from '../FormField';
import {
  FormFieldContext,
  joinIds,
  useFormFieldContext,
} from '../FormField/FormFieldContext';
import { RangeField } from '../RangeField';
import { Select } from '../Select';
import { ChannelInput } from './ChannelInput';
import { getRgbChannels } from './helpers';
import { useColorPicker } from './hooks/useColorPicker';
import type { ColorPickerProps } from './types';
import * as styles from './ColorPicker.css';

export function ColorPicker({
  label,
  value,
  onValueChange,
  showAlpha = false,
  disabled,
  readOnly,
  className,
  name,
  form,
  id,
  onClick,
  'aria-describedby': describedBy,
  ...props
}: ColorPickerProps): ReactElement {
  const field = useFormFieldContext();
  const {
    value: normalizedValue,
    isInvalid,
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
  } = useColorPicker({
    label,
    value,
    onValueChange,
    showAlpha,
    disabled,
    readOnly,
  });
  const rgb = getRgbChannels(normalizedValue);
  const alpha = Number.parseInt(normalizedValue.slice(7, 9) || 'ff', 16) / 255;

  function changeRgb(index: number, channel: number): void {
    const next = [...rgb];
    next[index] = channel;
    const opaque = normalizeColor(`rgb(${next.join(',')})`);

    if (opaque) {
      commit(
        showAlpha
          ? (applyColorAlpha(opaque, normalizedValue) ?? opaque)
          : opaque,
      );
    }
  }

  return (
    <>
      <Button
        {...props}
        ref={triggerRef}
        id={field?.controlId ?? id}
        className={clsx(styles.trigger, className)}
        disabled={disabled || readOnly}
        aria-label={`${label}: ${normalizedValue}`}
        aria-describedby={joinIds(field?.describedBy, describedBy)}
        aria-invalid={
          isInvalid || field?.isInvalid || props['aria-invalid'] || undefined
        }
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        variant="quiet"
        size="compact"
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(true);
        }}
      >
        <span
          aria-hidden="true"
          className={styles.swatch}
          style={{ backgroundColor: normalizedValue }}
        />
        <span>{normalizedValue}</span>
      </Button>
      {name ? (
        <input
          type="hidden"
          name={name}
          form={form}
          value={normalizedValue}
          disabled={disabled}
        />
      ) : null}
      <FormFieldContext.Provider value={null}>
        <Dialog
          ref={dialogRef}
          id={dialogId}
          title={`${label} 색상 선택`}
          closeLabel="색상 선택 닫기"
          isOpen={open}
          onOpenChange={setOpen}
          initialFocusRef={inputRef}
          size="small"
          onKeyDown={(event) => {
            if (event.key === 'Escape' && !event.defaultPrevented) {
              event.preventDefault();
              setOpen(false);
            }
          }}
          style={{
            position: 'fixed',
            margin: 0,
            width: 'min(320px, calc(100vw - 16px))',
            maxHeight: 'calc(100dvh - 16px)',
          }}
        >
          <div className={styles.controls}>
            <div className={styles.desktop}>
              <div
                role="slider"
                aria-label="Hue"
                aria-valuemin={0}
                aria-valuemax={359}
                aria-valuenow={Math.round(hsl.hue) % 360}
                aria-valuetext={`${Math.round(hsl.hue) % 360}°`}
                tabIndex={0}
                className={styles.wheel}
                onPointerDown={handleWheelPointer}
                onPointerMove={handleWheelPointer}
                onKeyDown={handleWheelKey}
              >
                <span
                  aria-hidden="true"
                  className={styles.center}
                  style={{ backgroundColor: normalizedValue }}
                />
                <span
                  aria-hidden="true"
                  className={styles.indicator}
                  style={{
                    transform: `rotate(${hsl.hue}deg) translateY(-4.5rem)`,
                  }}
                />
              </div>
              <FormField label="Saturation">
                <RangeField
                  min={0}
                  max={100}
                  step={1}
                  value={hsl.saturation}
                  onValueChange={(next) => changeHsl('saturation', next)}
                />
              </FormField>
              <FormField label="Lightness">
                <RangeField
                  min={0}
                  max={100}
                  step={1}
                  value={hsl.lightness}
                  onValueChange={(next) => changeHsl('lightness', next)}
                />
              </FormField>
            </div>
            <FormField label="CSS color">
              <ColorField
                ref={inputRef}
                value={normalizedValue}
                showAlpha={showAlpha}
                onValueChange={commit}
                swatchLabel={`${label} 기본 색상 선택`}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Escape' &&
                    event.currentTarget.value === normalizedValue
                  ) {
                    event.preventDefault();
                    setOpen(false);
                  }
                }}
              />
            </FormField>
            <FormField label="Color format">
              <Select
                value={format}
                onChange={(event) => {
                  const next = event.currentTarget.value;
                  if (next === 'hex' || next === 'rgba' || next === 'hsla')
                    setFormat(next);
                }}
              >
                <option value="hex">HEX</option>
                <option value="rgba">RGBA</option>
                <option value="hsla">HSLA</option>
              </Select>
            </FormField>
            {format !== 'hex' ? (
              <div className={styles.channels}>
                {format === 'rgba'
                  ? (['R', 'G', 'B'] as const).map((channel, index) => (
                      <ChannelInput
                        key={channel}
                        label={channel}
                        value={rgb[index] ?? 0}
                        max={255}
                        onCommit={(next) => changeRgb(index, next)}
                      />
                    ))
                  : (
                      [
                        { channel: 'hue', label: 'H', max: 360 },
                        { channel: 'saturation', label: 'S', max: 100 },
                        { channel: 'lightness', label: 'L', max: 100 },
                      ] as const
                    ).map(({ channel, label: channelLabel, max }) => (
                      <ChannelInput
                        key={channel}
                        label={channelLabel}
                        value={hsl[channel]}
                        max={max}
                        onCommit={(next) => changeHsl(channel, next)}
                      />
                    ))}
                {showAlpha ? (
                  <ChannelInput
                    label="A"
                    value={alpha}
                    max={1}
                    onCommit={(next) =>
                      commit(`rgba(${rgb.join(',')},${next})`)
                    }
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </Dialog>
      </FormFieldContext.Provider>
    </>
  );
}
