import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const base = style({
  boxSizing: 'border-box',
  flexShrink: 0,
  margin: 0,
  padding: 0,
  color: vars.color.rule,
  border: 0,
});

export const orientation = styleVariants({
  horizontal: {
    width: '100%',
  },
  vertical: {
    alignSelf: 'stretch',
    minHeight: vars.size.control,
  },
});

export const horizontalVariant = styleVariants({
  weak: {
    height: vars.border.hairline,
    borderTop: `${vars.border.hairline} dotted currentColor`,
  },
  boundary: {
    height: vars.border.hairline,
    borderTop: `${vars.border.hairline} solid currentColor`,
  },
  structural: {
    height: `calc(${vars.border.hairline} * 2 + ${vars.size.ruleGap})`,
    borderTop: `${vars.border.hairline} solid currentColor`,
    borderBottom: `${vars.border.hairline} solid currentColor`,
  },
});

export const verticalVariant = styleVariants({
  weak: {
    width: vars.border.hairline,
    borderLeft: `${vars.border.hairline} dotted currentColor`,
  },
  boundary: {
    width: vars.border.hairline,
    borderLeft: `${vars.border.hairline} solid currentColor`,
  },
  structural: {
    width: `calc(${vars.border.hairline} * 2 + ${vars.size.ruleGap})`,
    borderLeft: `${vars.border.hairline} solid currentColor`,
    borderRight: `${vars.border.hairline} solid currentColor`,
  },
});
