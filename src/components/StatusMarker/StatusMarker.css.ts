import { style, styleVariants } from '@vanilla-extract/css';

import { semanticVars } from '../../theme/themeContract.css';

export const marker = style({
  display: 'inline-flex',
  minWidth: 0,
  alignItems: 'center',
  gap: semanticVars.space.xs,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  fontWeight: 650,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const tone = styleVariants({
  default: { color: semanticVars.color.content.primary },
  muted: { color: semanticVars.color.content.secondary },
  accent: { color: semanticVars.color.content.accent },
  positive: { color: semanticVars.color.status.positive },
  critical: { color: semanticVars.color.status.critical },
});

export const indicator = style({
  display: 'inline-block',
  flex: '0 0 auto',
  backgroundColor: 'currentColor',
});

export const shape = styleVariants({
  line: {
    width: semanticVars.space.sm,
    height: semanticVars.border.width.hairline,
  },
  square: {
    width: semanticVars.space.xs,
    height: semanticVars.space.xs,
  },
});

export const label = style({
  minWidth: 0,
});
