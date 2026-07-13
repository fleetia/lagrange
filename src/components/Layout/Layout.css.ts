import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const stack = style({
  display: 'flex',
  minWidth: 0,
  flexDirection: 'column',
});

export const inline = style({
  display: 'flex',
  minWidth: 0,
  flexDirection: 'row',
});

export const gap = styleVariants(vars.space, (value) => ({ gap: value }));

export const align = styleVariants({
  start: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
});

export const justify = styleVariants({
  start: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  end: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
});

export const wrap = styleVariants({
  true: { flexWrap: 'wrap' },
  false: { flexWrap: 'nowrap' },
});
