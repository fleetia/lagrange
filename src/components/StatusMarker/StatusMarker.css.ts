import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const marker = style({
  display: 'inline-flex',
  minWidth: 0,
  alignItems: 'center',
  gap: vars.space.xs,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  fontWeight: 650,
  lineHeight: vars.lineHeight.compact,
});

export const tone = styleVariants({
  default: { color: vars.color.ink },
  muted: { color: vars.color.inkMuted },
  accent: { color: vars.color.aubergine },
  positive: { color: vars.color.olive },
  critical: { color: vars.color.vermilion },
});

export const indicator = style({
  display: 'inline-block',
  flex: '0 0 auto',
  backgroundColor: 'currentColor',
});

export const shape = styleVariants({
  line: {
    width: vars.space.sm,
    height: vars.border.hairline,
  },
  square: {
    width: vars.space.xs,
    height: vars.space.xs,
  },
});

export const label = style({
  minWidth: 0,
});
