import { normalizeColor } from '../ColorField/helpers';
import type { HslColor } from './types';

export function getRgbChannels(value: string): [number, number, number] {
  const hex = normalizeColor(value) ?? '#000000';
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

export function getHslColor(value: string, fallbackHue = 0): HslColor {
  const [r, g, b] = getRgbChannels(value);
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  const lightness = (maximum + minimum) / 2;
  if (delta === 0)
    return { hue: fallbackHue, saturation: 0, lightness: lightness * 100 };
  const sector =
    maximum === red
      ? (green - blue) / delta
      : maximum === green
        ? (blue - red) / delta + 2
        : (red - green) / delta + 4;
  return {
    hue: (sector * 60 + 360) % 360,
    saturation: (delta / (1 - Math.abs(2 * lightness - 1))) * 100,
    lightness: lightness * 100,
  };
}

export function getPointerHue(x: number, y: number): number {
  return ((Math.atan2(y, x) * 180) / Math.PI + 450) % 360;
}
