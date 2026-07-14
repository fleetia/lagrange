import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const hidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  border: 0,
  whiteSpace: 'nowrap',
});

export const focusable = style({
  selectors: {
    '&:focus, &:focus-within': {
      position: 'static',
      width: 'auto',
      height: 'auto',
      padding: vars.space.xs,
      margin: 0,
      overflow: 'visible',
      clip: 'auto',
      clipPath: 'none',
      color: vars.color.aubergine,
      backgroundColor: vars.color.periwinkleWash,
      whiteSpace: 'normal',
    },
  },
});
