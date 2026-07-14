import { style } from '@vanilla-extract/css';

import { semanticVars } from '../../theme/themeContract.css';

export const field = style({
  display: 'grid',
  minWidth: 0,
  gap: semanticVars.space.xxs,
});

export const labelRow = style({
  display: 'flex',
  minWidth: 0,
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: semanticVars.space.sm,
});

export const label = style({
  color: semanticVars.color.content.accent,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.label,
  fontWeight: 700,
  lineHeight: semanticVars.typography.lineHeight.compact,
  letterSpacing: '0.045em',
});

export const marker = style({
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.caption,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const required = style({
  color: semanticVars.color.status.critical,
  marginInlineStart: semanticVars.space.xs,
});

export const feedback = style({
  margin: 0,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const description = style({
  color: semanticVars.color.content.secondary,
});

export const error = style({
  color: semanticVars.color.status.critical,
  fontWeight: 650,
});
