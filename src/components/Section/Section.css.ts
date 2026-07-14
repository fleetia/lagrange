import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const section = style({
  position: 'relative',
  display: 'grid',
  minWidth: 0,
});

export const boundary = styleVariants({
  none: {},
  weak: {
    borderTop: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  },
  boundary: {
    borderTop: `${vars.border.hairline} solid ${vars.color.rule}`,
  },
  structural: {
    borderTop: `${vars.border.hairline} solid ${vars.color.rule}`,
    selectors: {
      '&::before': {
        position: 'absolute',
        top: `calc(${vars.border.hairline} + ${vars.size.ruleGap})`,
        right: 0,
        left: 0,
        borderTop: `${vars.border.hairline} solid ${vars.color.rule}`,
        content: '',
        pointerEvents: 'none',
      },
    },
  },
});

export const spacing = styleVariants({
  compact: {
    gap: vars.space.sm,
    paddingBlock: vars.space.sm,
  },
  default: {
    gap: vars.space.md,
    paddingBlock: vars.space.lg,
  },
  relaxed: {
    gap: vars.space.lg,
    paddingBlock: vars.space.xl,
  },
});
