import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const toolbar = style({
  position: 'relative',
  display: 'flex',
  minWidth: 0,
  alignItems: 'center',
  gap: semanticVars.space.md,
  paddingBlock: semanticVars.space.sm,
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
    borderBottom: `${semanticVars.border.width.hairline} dotted ${semanticVars.color.border.subtle}`,
  },
  boundary: {
    borderBottom: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.strong}`,
  },
  structural: {
    paddingBlockEnd: `calc(${semanticVars.space.sm} + ${componentVars.rule.gap} + ${semanticVars.border.width.hairline})`,
    backgroundImage: `linear-gradient(${semanticVars.color.border.strong}, ${semanticVars.color.border.strong}), linear-gradient(${semanticVars.color.border.strong}, ${semanticVars.color.border.strong})`,
    backgroundPosition: 'left bottom, left bottom 3px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: `100% ${semanticVars.border.width.hairline}, 100% ${semanticVars.border.width.hairline}`,
  },
});
