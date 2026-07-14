import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const group = style({
  minWidth: 0,
  margin: 0,
  padding: 0,
  color: semanticVars.color.content.primary,
  border: 0,
});

export const legend = style({
  display: 'block',
  width: '100%',
  margin: 0,
  padding: 0,
  color: semanticVars.color.content.accent,
  fontFamily: semanticVars.typography.family.display,
  fontSize: semanticVars.typography.size.headingSm,
  fontWeight: 650,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const description = style({
  margin: `${semanticVars.space.xxs} 0 0`,
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const structuralRule = style({
  boxSizing: 'border-box',
  width: '100%',
  height: `calc(${semanticVars.border.width.hairline} * 2 + ${componentVars.rule.gap})`,
  marginBlock: semanticVars.space.sm,
  borderTop: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.strong}`,
  borderBottom: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.strong}`,
});

export const grid = style({
  display: 'grid',
  minWidth: 0,
  gap: `${semanticVars.space.md} ${semanticVars.space.lg}`,
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
