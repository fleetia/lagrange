import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const base = style({
  boxSizing: 'border-box',
  flexShrink: 0,
  margin: 0,
  padding: 0,
  color: componentVars.rule.strong,
  border: 0,
});

export const orientation = styleVariants({
  horizontal: {
    width: '100%',
  },
  vertical: {
    alignSelf: 'stretch',
    minHeight: componentVars.control.height,
  },
});

export const horizontalVariant = styleVariants({
  weak: {
    height: semanticVars.border.width.hairline,
    borderTop: `${semanticVars.border.width.hairline} dotted currentColor`,
  },
  boundary: {
    height: semanticVars.border.width.hairline,
    borderTop: `${semanticVars.border.width.hairline} solid currentColor`,
  },
  structural: {
    height: `calc(${semanticVars.border.width.hairline} * 2 + ${componentVars.rule.gap})`,
    borderTop: `${semanticVars.border.width.hairline} solid currentColor`,
    borderBottom: `${semanticVars.border.width.hairline} solid currentColor`,
  },
});

export const verticalVariant = styleVariants({
  weak: {
    width: semanticVars.border.width.hairline,
    borderLeft: `${semanticVars.border.width.hairline} dotted currentColor`,
  },
  boundary: {
    width: semanticVars.border.width.hairline,
    borderLeft: `${semanticVars.border.width.hairline} solid currentColor`,
  },
  structural: {
    width: `calc(${semanticVars.border.width.hairline} * 2 + ${componentVars.rule.gap})`,
    borderLeft: `${semanticVars.border.width.hairline} solid currentColor`,
    borderRight: `${semanticVars.border.width.hairline} solid currentColor`,
  },
});
