import type { ComponentPropsWithoutRef } from 'react';

export type ColorPickerProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'onChange' | 'value' | 'defaultValue'
> & {
  label: string;
  value: string;
  onValueChange?: (value: string) => void;
  showAlpha?: boolean;
  readOnly?: boolean;
};

export type HslColor = { hue: number; saturation: number; lightness: number };
export type ColorFormat = 'hex' | 'rgba' | 'hsla';
