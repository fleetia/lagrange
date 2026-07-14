import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const toolbar = style({
  position: 'relative',
  display: 'flex',
  minWidth: 0,
  alignItems: 'center',
  gap: vars.space.md,
  paddingBlock: vars.space.sm,
});

export const align = styleVariants({
  start: { justifyContent: 'flex-start' },
  end: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
});

export const wrap = styleVariants({
  true: { flexWrap: 'wrap' },
  false: { flexWrap: 'nowrap' },
});

export const boundary = styleVariants({
  none: {},
  weak: {
    borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  },
  boundary: {
    borderBottom: `${vars.border.hairline} solid ${vars.color.rule}`,
  },
  structural: {
    paddingBlockEnd: `calc(${vars.space.sm} + ${vars.size.ruleGap} + ${vars.border.hairline})`,
    backgroundImage: `linear-gradient(${vars.color.rule}, ${vars.color.rule}), linear-gradient(${vars.color.rule}, ${vars.color.rule})`,
    backgroundPosition: 'left bottom, left bottom 3px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: `100% ${vars.border.hairline}, 100% ${vars.border.hairline}`,
  },
});
