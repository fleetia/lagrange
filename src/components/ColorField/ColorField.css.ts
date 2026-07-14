import { globalStyle, style } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

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
