import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const field = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space.xxs,
});

export const labelRow = style({
  display: 'flex',
  minWidth: 0,
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: vars.space.sm,
});

export const label = style({
  color: vars.color.aubergine,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.label,
  fontWeight: 700,
  lineHeight: vars.lineHeight.compact,
  letterSpacing: '0.045em',
});

export const marker = style({
  color: vars.color.inkMuted,
  fontFamily: vars.font.data,
  fontSize: vars.fontSize.caption,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: vars.lineHeight.compact,
});

export const required = style({
  color: vars.color.vermilion,
  marginInlineStart: vars.space.xs,
});

export const feedback = style({
  margin: 0,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  lineHeight: vars.lineHeight.compact,
});

export const description = style({
  color: vars.color.inkMuted,
});

export const error = style({
  color: vars.color.vermilion,
  fontWeight: 650,
});
