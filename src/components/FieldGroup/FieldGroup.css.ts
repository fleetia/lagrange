import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const group = style({
  minWidth: 0,
  margin: 0,
  padding: 0,
  color: vars.color.ink,
  border: 0,
});

export const legend = style({
  display: 'block',
  width: '100%',
  margin: 0,
  padding: 0,
  color: vars.color.aubergine,
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.headingSm,
  fontWeight: 650,
  lineHeight: vars.lineHeight.compact,
});

export const description = style({
  margin: `${vars.space.xxs} 0 0`,
  color: vars.color.inkMuted,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  lineHeight: vars.lineHeight.compact,
});

export const structuralRule = style({
  boxSizing: 'border-box',
  width: '100%',
  height: `calc(${vars.border.hairline} * 2 + ${vars.size.ruleGap})`,
  marginBlock: vars.space.sm,
  borderTop: `${vars.border.hairline} solid ${vars.color.rule}`,
  borderBottom: `${vars.border.hairline} solid ${vars.color.rule}`,
});

export const grid = style({
  display: 'grid',
  minWidth: 0,
  gap: `${vars.space.md} ${vars.space.lg}`,
});

const responsiveSingleColumn = {
  '@media': {
    '(max-width: 720px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
} as const;

export const columns = styleVariants({
  single: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
  double: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    ...responsiveSingleColumn,
  },
  triple: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    ...responsiveSingleColumn,
  },
  auto: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(14rem, 100%), 1fr))',
  },
});
