import { createTheme, style } from '@vanilla-extract/css';

import { tokens } from './tokens';

export const [themeClass, vars] = createTheme({
  color: tokens.color,
  font: tokens.font,
  fontSize: tokens.fontSize,
  lineHeight: tokens.lineHeight,
  space: tokens.space,
  size: tokens.size,
  radius: tokens.radius,
  border: tokens.border,
});

export const root = style({
  minWidth: 0,
  color: vars.color.ink,
  backgroundColor: vars.color.paper,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.body,
  WebkitFontSmoothing: 'antialiased',
  textRendering: 'optimizeLegibility',
});
