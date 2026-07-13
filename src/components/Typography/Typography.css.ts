import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const text = style({
  margin: 0,
  color: vars.color.ink,
});

export const textVariant = styleVariants({
  body: {
    fontFamily: vars.font.ui,
    fontSize: vars.fontSize.body,
    lineHeight: vars.lineHeight.body,
  },
  label: {
    fontFamily: vars.font.ui,
    fontSize: vars.fontSize.label,
    fontWeight: 650,
    lineHeight: vars.lineHeight.compact,
    letterSpacing: '0.045em',
  },
  caption: {
    fontFamily: vars.font.ui,
    fontSize: vars.fontSize.caption,
    lineHeight: vars.lineHeight.compact,
  },
  data: {
    fontFamily: vars.font.data,
    fontSize: vars.fontSize.data,
    fontVariantNumeric: 'tabular-nums slashed-zero',
    lineHeight: vars.lineHeight.compact,
    letterSpacing: '-0.015em',
  },
});

export const tone = styleVariants({
  default: { color: vars.color.ink },
  muted: { color: vars.color.inkMuted },
  accent: { color: vars.color.aubergine },
  positive: { color: vars.color.olive },
  critical: { color: vars.color.vermilion },
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
  color: vars.color.aubergine,
  textWrap: 'balance',
});

export const headingVariant = styleVariants({
  display: {
    fontFamily: vars.font.display,
    fontSize: vars.fontSize.headingLg,
    fontWeight: 600,
    lineHeight: vars.lineHeight.tight,
    letterSpacing: '-0.025em',
  },
  section: {
    fontFamily: vars.font.display,
    fontSize: vars.fontSize.headingMd,
    fontWeight: 600,
    lineHeight: vars.lineHeight.tight,
    letterSpacing: '-0.015em',
  },
  subsection: {
    fontFamily: vars.font.display,
    fontSize: vars.fontSize.headingSm,
    fontWeight: 650,
    lineHeight: vars.lineHeight.compact,
  },
  label: {
    fontFamily: vars.font.ui,
    fontSize: vars.fontSize.label,
    fontWeight: 700,
    lineHeight: vars.lineHeight.compact,
    letterSpacing: '0.075em',
    textTransform: 'uppercase',
  },
});
