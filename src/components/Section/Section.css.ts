import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const section = style({
  position: 'relative',
  display: 'grid',
  minWidth: 0,
});

export const boundary = styleVariants({
  none: {},
  weak: {
    borderTop: `${semanticVars.border.width.hairline} dotted ${semanticVars.color.border.subtle}`,
  },
  boundary: {
    borderTop: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.strong}`,
  },
  structural: {
    borderTop: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.strong}`,
    selectors: {
      '&::before': {
        position: 'absolute',
        top: `calc(${semanticVars.border.width.hairline} + ${componentVars.rule.gap})`,
        right: 0,
        left: 0,
        borderTop: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.strong}`,
        content: '',
        pointerEvents: 'none',
      },
    },
  },
});

export const spacing = styleVariants({
  compact: {
    gap: semanticVars.space.sm,
    paddingBlock: semanticVars.space.sm,
  },
  default: {
    gap: semanticVars.space.md,
    paddingBlock: semanticVars.space.lg,
  },
  relaxed: {
    gap: semanticVars.space.lg,
    paddingBlock: semanticVars.space.xl,
  },
});
