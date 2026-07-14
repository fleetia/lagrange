import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const metric = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space.xxs,
  margin: 0,
  paddingBlockEnd: vars.space.sm,
  borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
});

export const align = styleVariants({
  start: { textAlign: 'left' },
  end: { textAlign: 'right' },
});

export const label = style({
  color: vars.color.inkMuted,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  fontWeight: 700,
  letterSpacing: '0.06em',
  lineHeight: vars.lineHeight.compact,
  textTransform: 'uppercase',
});

export const definition = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space.xxs,
  margin: 0,
});

export const value = style({
  minWidth: 0,
  fontFamily: vars.font.display,
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  lineHeight: vars.lineHeight.tight,
});

export const size = styleVariants({
  compact: { fontSize: vars.fontSize.headingSm },
  default: { fontSize: vars.fontSize.headingMd },
  prominent: { fontSize: vars.fontSize.headingLg },
});

export const tone = styleVariants({
  default: { color: vars.color.ink },
  muted: { color: vars.color.inkMuted },
  accent: { color: vars.color.aubergine },
  positive: { color: vars.color.olive },
  critical: { color: vars.color.vermilion },
});

export const detail = style({
  color: vars.color.inkMuted,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  lineHeight: vars.lineHeight.compact,
});
