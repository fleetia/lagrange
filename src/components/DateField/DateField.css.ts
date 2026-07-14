import { globalStyle, style } from '@vanilla-extract/css';

import { semanticVars } from '../../theme/themeContract.css';

export const dateField = style({
  fontFamily: semanticVars.typography.family.data,
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: '-0.015em',
});

globalStyle(`${dateField}::-webkit-calendar-picker-indicator`, {
  width: '0.875rem',
  height: '0.875rem',
  margin: 0,
  padding: semanticVars.space.xs,
  cursor: 'pointer',
  opacity: 0.7,
});

globalStyle(`${dateField}:disabled::-webkit-calendar-picker-indicator`, {
  cursor: 'not-allowed',
});
