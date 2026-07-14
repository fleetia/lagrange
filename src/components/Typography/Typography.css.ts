import { style, styleVariants } from '@vanilla-extract/css';

import { semanticVars } from '../../theme/themeContract.css';

export const text = style({
  margin: 0,
  color: semanticVars.color.content.primary,
});

export const textVariant = styleVariants({
  body: {
    fontFamily: semanticVars.typography.family.ui,
    fontSize: semanticVars.typography.size.body,
    lineHeight: semanticVars.typography.lineHeight.body,
  },
  label: {
    fontFamily: semanticVars.typography.family.ui,
    fontSize: semanticVars.typography.size.label,
    fontWeight: 650,
    lineHeight: semanticVars.typography.lineHeight.compact,
    letterSpacing: '0.045em',
  },
  caption: {
    fontFamily: semanticVars.typography.family.ui,
    fontSize: semanticVars.typography.size.caption,
    lineHeight: semanticVars.typography.lineHeight.compact,
  },
  data: {
    fontFamily: semanticVars.typography.family.data,
    fontSize: semanticVars.typography.size.data,
    fontVariantNumeric: 'tabular-nums slashed-zero',
    lineHeight: semanticVars.typography.lineHeight.compact,
    letterSpacing: '-0.015em',
  },
});

export const tone = styleVariants({
  default: { color: semanticVars.color.content.primary },
  muted: { color: semanticVars.color.content.secondary },
  accent: { color: semanticVars.color.content.accent },
  positive: { color: semanticVars.color.status.positive },
  critical: { color: semanticVars.color.status.critical },
});

export const weight = styleVariants({
  regular: { fontWeight: 400 },
  medium: { fontWeight: 550 },
  strong: { fontWeight: 700 },
});

export const truncate = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const heading = style({
  margin: 0,
  color: semanticVars.color.content.accent,
  textWrap: 'balance',
});

export const headingVariant = styleVariants({
  display: {
    fontFamily: semanticVars.typography.family.display,
    fontSize: semanticVars.typography.size.headingLg,
    fontWeight: 600,
    lineHeight: semanticVars.typography.lineHeight.tight,
    letterSpacing: '-0.025em',
  },
  section: {
    fontFamily: semanticVars.typography.family.display,
    fontSize: semanticVars.typography.size.headingMd,
    fontWeight: 600,
    lineHeight: semanticVars.typography.lineHeight.tight,
    letterSpacing: '-0.015em',
  },
  subsection: {
    fontFamily: semanticVars.typography.family.display,
    fontSize: semanticVars.typography.size.headingSm,
    fontWeight: 650,
    lineHeight: semanticVars.typography.lineHeight.compact,
  },
  label: {
    fontFamily: semanticVars.typography.family.ui,
    fontSize: semanticVars.typography.size.label,
    fontWeight: 700,
    lineHeight: semanticVars.typography.lineHeight.compact,
    letterSpacing: '0.075em',
    textTransform: 'uppercase',
  },
});
