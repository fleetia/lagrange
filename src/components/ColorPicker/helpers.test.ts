import { describe, expect, it } from 'vitest';
import { normalizeColor } from '../ColorField/helpers';
import { getHslColor, getPointerHue, getRgbChannels } from './helpers';

describe('ColorPicker color geometry', () => {
  it.each(['#663399', '#e53b34', '#ffffff', '#000000', '#f6ebcf'])(
    'round-trips %s without losing RGB channels',
    (value) => {
      const { hue, saturation, lightness } = getHslColor(value);
      expect(normalizeColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`)).toBe(
        value,
      );
    },
  );
  it('retains the selected hue for an achromatic color', () => {
    expect(getHslColor('#808080', 270).hue).toBe(270);
    expect(getRgbChannels('#33669980')).toEqual([51, 102, 153]);
  });
  it.each([
    [0, -1, 0],
    [1, 0, 90],
    [0, 1, 180],
    [-1, 0, 270],
  ])('maps wheel position (%s, %s) to %s degrees', (x, y, hue) => {
    expect(getPointerHue(x, y)).toBe(hue);
  });
});
