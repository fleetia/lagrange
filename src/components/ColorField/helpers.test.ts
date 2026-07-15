import { describe, expect, it } from 'vitest';

import {
  applyColorAlpha,
  applyColorAlphaPercentage,
  getColorAlphaPercentage,
  normalizeColor,
} from './helpers';

describe('normalizeColor', () => {
  it.each([
    ['#09c', '#0099cc'],
    ['#0099CC', '#0099cc'],
    ['rgb(255, 0, 128)', '#ff0080'],
    ['rgb(100% 0% 50%)', '#ff0080'],
    ['hsl(120, 100%, 25%)', '#008000'],
    ['hsl(-120deg 100% 50%)', '#0000ff'],
  ])('normalizes %s to opaque hex', (input, expected) => {
    expect(normalizeColor(input)).toBe(expected);
  });

  it.each([
    ['#09c8', '#0099cc88'],
    ['#0099cc80', '#0099cc80'],
    ['rgba(255, 0, 128, 0.5)', '#ff008080'],
    ['rgb(100% 0% 50% / 25%)', '#ff008040'],
    ['hsla(240, 100%, 50%, .25)', '#0000ff40'],
    ['hsl(0.5turn 100% 50% / 100%)', '#00ffffff'],
  ])('normalizes alpha color %s to eight-digit hex', (input, expected) => {
    expect(normalizeColor(input, true)).toBe(expected);
  });

  it.each([
    '',
    '#12',
    '#xyz',
    'rgb(1, 2)',
    'rgb(1 2 3 4)',
    'rgb(1 2 3 /)',
    'hsl(20, 50, 50)',
    'color(display-p3 1 0 0)',
  ])('rejects unsupported or incomplete draft %s', (input) => {
    expect(normalizeColor(input, true)).toBeNull();
  });
});

describe('applyColorAlpha', () => {
  it('preserves alpha when a native swatch changes the opaque channels', () => {
    expect(applyColorAlpha('#ff6347', 'rgba(0, 0, 0, 0.5)')).toBe(
      '#ff634780',
    );
  });
});

describe('alpha percentage', () => {
  it('reads the normalized alpha byte as a percentage', () => {
    expect(getColorAlphaPercentage('rgba(102, 51, 153, 0.5)')).toBe(50);
    expect(getColorAlphaPercentage('#66339940')).toBe(25);
    expect(getColorAlphaPercentage('not-a-color')).toBeNull();
  });

  it('applies and clamps a percentage while preserving RGB channels', () => {
    expect(applyColorAlphaPercentage('#663399', 25)).toBe('#66339940');
    expect(applyColorAlphaPercentage('#66339980', -10)).toBe('#66339900');
    expect(applyColorAlphaPercentage('#66339980', 110)).toBe('#663399ff');
    expect(applyColorAlphaPercentage('#66339980', Number.NaN)).toBeNull();
  });
});
