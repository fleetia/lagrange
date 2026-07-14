import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const root = style({
  display: 'grid',
  minHeight: componentVars.control.height,
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: semanticVars.space.sm,
  padding: `${semanticVars.space.xs} 0`,
  borderTop: `${semanticVars.border.width.hairline} dotted ${componentVars.rule.subtle}`,
  borderBottom: `${semanticVars.border.width.hairline} dotted ${componentVars.rule.subtle}`,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const announcement = style({
  display: 'grid',
  minWidth: 0,
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: semanticVars.space.sm,
});

export const marker = style({
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.caption,
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
  idle: { color: semanticVars.color.content.secondary },
  saving: { color: semanticVars.color.content.accent },
  saved: { color: semanticVars.color.status.positive },
  error: { color: semanticVars.color.status.critical },
});
