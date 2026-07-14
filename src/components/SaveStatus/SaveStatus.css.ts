import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const root = style({
  display: 'grid',
  minHeight: vars.size.control,
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: vars.space.sm,
  padding: `${vars.space.xs} 0`,
  borderTop: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  fontSize: vars.fontSize.caption,
  lineHeight: vars.lineHeight.compact,
});

export const announcement = style({
  display: 'grid',
  minWidth: 0,
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: vars.space.sm,
});

export const marker = style({
  fontFamily: vars.font.data,
  fontSize: vars.fontSize.caption,
});

export const message = style({
  minWidth: 0,
});

export const action = style({
  display: 'flex',
  minWidth: 0,
  alignItems: 'center',
});

export const tone = styleVariants({
  idle: { color: vars.color.inkMuted },
  saving: { color: vars.color.aubergine },
  saved: { color: vars.color.olive },
  error: { color: vars.color.vermilion },
});
