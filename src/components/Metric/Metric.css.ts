import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const metric = style({
  display: 'grid',
  minWidth: 0,
  gap: semanticVars.space.xxs,
  margin: 0,
  paddingBlockEnd: semanticVars.space.sm,
  borderBottom: `${semanticVars.border.width.hairline} dotted ${componentVars.rule.subtle}`,
});

export const align = styleVariants({
  start: { textAlign: 'left' },
  end: { textAlign: 'right' },
});

export const label = style({
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  fontWeight: 700,
  letterSpacing: '0.06em',
  lineHeight: semanticVars.typography.lineHeight.compact,
  textTransform: 'uppercase',
});

export const definition = style({
  display: 'grid',
  minWidth: 0,
  gap: semanticVars.space.xxs,
  margin: 0,
});

export const value = style({
  minWidth: 0,
  fontFamily: semanticVars.typography.family.display,
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  lineHeight: semanticVars.typography.lineHeight.tight,
});

export const size = styleVariants({
  compact: { fontSize: semanticVars.typography.size.headingSm },
  default: { fontSize: semanticVars.typography.size.headingMd },
  prominent: { fontSize: semanticVars.typography.size.headingLg },
});

export const tone = styleVariants({
  default: { color: semanticVars.color.content.primary },
  muted: { color: semanticVars.color.content.secondary },
  accent: { color: semanticVars.color.content.accent },
  positive: { color: semanticVars.color.status.positive },
  critical: { color: semanticVars.color.status.critical },
});

export const detail = style({
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});
