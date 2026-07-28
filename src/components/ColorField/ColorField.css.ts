import { globalStyle, style } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

const alphaColor = 'var(--lagrange-color-alpha, transparent)';
const alphaTrackBackground = `linear-gradient(to right, transparent, ${alphaColor}), repeating-conic-gradient(${semanticVars.color.surface.raised} 0 25%, ${semanticVars.color.surface.canvas} 0 50%) 0 / ${semanticVars.space.sm} ${semanticVars.space.sm}`;

export const field = style({
  display: 'grid',
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  height: componentVars.control.compactHeight,
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: semanticVars.space.xs,
  paddingInline: semanticVars.space.xxs,
  color: componentVars.control.text,
  backgroundColor: 'transparent',
  borderInlineStart: '2px solid transparent',
  borderBottom: `${semanticVars.border.width.hairline} solid ${componentVars.control.border}`,
  transition: 'background-color 100ms ease, border-color 100ms ease',
  selectors: {
    '&:hover:not([data-disabled="true"])': {
      borderBottomColor: componentVars.control.hoverBorder,
    },
    '&:focus-within': {
      backgroundColor: componentVars.control.focusSurface,
      borderInlineStartColor: componentVars.control.focusIndicator,
      borderBottomColor: componentVars.control.focusIndicator,
    },
    '&[data-invalid="true"]': {
      backgroundColor: componentVars.control.invalidSurface,
      borderInlineStartColor: componentVars.control.invalidIndicator,
      borderBottomColor: componentVars.control.invalidIndicator,
    },
    '&[data-alpha="true"]': {
      height: 'auto',
    },
    '&[data-disabled="true"]': {
      color: componentVars.control.disabledText,
      backgroundColor: componentVars.control.disabledSurface,
      cursor: 'not-allowed',
      opacity: 0.68,
    },
  },
});

export const swatch = style({
  boxSizing: 'border-box',
  width: '1.35rem',
  height: '1.35rem',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  backgroundColor: 'transparent',
  border: `${semanticVars.border.width.hairline} solid ${componentVars.control.border}`,
  borderRadius: semanticVars.shape.radius.none,
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${componentVars.control.focusIndicator}`,
      outlineOffset: '1px',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

globalStyle(`${swatch}::-webkit-color-swatch-wrapper`, {
  padding: 0,
});

globalStyle(`${swatch}::-webkit-color-swatch`, {
  border: 0,
  borderRadius: 0,
});

globalStyle(`${swatch}::-moz-color-swatch`, {
  border: 0,
  borderRadius: 0,
});

export const input = style({
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  height: '100%',
  margin: 0,
  padding: 0,
  color: 'inherit',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: semanticVars.shape.radius.none,
  outline: 0,
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.label,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: semanticVars.typography.lineHeight.compact,
  selectors: {
    '&::placeholder': {
      color: componentVars.control.placeholder,
      opacity: 0.72,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

globalStyle(`${field}[data-alpha="true"] ${input}`, {
  height: componentVars.control.compactHeight,
});

export const alphaControl = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  gridColumn: '1 / -1',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: semanticVars.space.xs,
  paddingBlockEnd: semanticVars.space.xxs,
});

export const alphaRange = style({
  width: '100%',
  height: componentVars.control.compactHeight,
  margin: 0,
  padding: 0,
  appearance: 'none',
  color: componentVars.range.thumb,
  background: 'transparent',
  border: 0,
  borderRadius: semanticVars.shape.radius.none,
  cursor: 'pointer',
  outline: 0,
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.62,
    },
  },
});

export const alphaValue = style({
  color: componentVars.control.text,
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.label,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: semanticVars.typography.lineHeight.compact,
  textAlign: 'end',
  whiteSpace: 'nowrap',
});

globalStyle(`${alphaRange}::-webkit-slider-runnable-track`, {
  height: semanticVars.space.xs,
  background: alphaTrackBackground,
  border: `${semanticVars.border.width.hairline} solid ${componentVars.control.border}`,
});

globalStyle(`${alphaRange}::-webkit-slider-thumb`, {
  width: '0.75rem',
  height: '0.75rem',
  marginTop: '-0.3125rem',
  appearance: 'none',
  backgroundColor: componentVars.range.thumb,
  border: `2px solid ${semanticVars.color.surface.raised}`,
  borderRadius: semanticVars.shape.radius.none,
});

globalStyle(`${alphaRange}:focus-visible::-webkit-slider-thumb`, {
  boxShadow: `0 0 0 2px ${componentVars.range.focusIndicator}`,
});

globalStyle(`${alphaRange}:disabled::-webkit-slider-thumb`, {
  backgroundColor: componentVars.range.disabledThumb,
});

globalStyle(`${alphaRange}::-moz-range-track`, {
  height: semanticVars.space.xs,
  background: alphaTrackBackground,
  border: `${semanticVars.border.width.hairline} solid ${componentVars.control.border}`,
});

globalStyle(`${alphaRange}::-moz-range-thumb`, {
  width: '0.75rem',
  height: '0.75rem',
  backgroundColor: componentVars.range.thumb,
  border: `2px solid ${semanticVars.color.surface.raised}`,
  borderRadius: semanticVars.shape.radius.none,
});

globalStyle(`${alphaRange}:focus-visible::-moz-range-thumb`, {
  boxShadow: `0 0 0 2px ${componentVars.range.focusIndicator}`,
});

globalStyle(`${alphaRange}:disabled::-moz-range-thumb`, {
  backgroundColor: componentVars.range.disabledThumb,
});
