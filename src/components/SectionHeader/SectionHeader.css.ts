import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const header = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space.sm,
});

export const main = style({
  display: 'grid',
  minWidth: 0,
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'end',
  gap: vars.space.lg,
  '@media': {
    'screen and (max-width: 40rem)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
      alignItems: 'start',
    },
  },
});

export const copy = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space.xxs,
});

export const eyebrow = style({
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const description = style({
  maxWidth: '62ch',
});

export const aside = style({
  display: 'flex',
  minWidth: 0,
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: vars.space.sm,
  '@media': {
    'screen and (max-width: 40rem)': {
      justifyContent: 'flex-start',
    },
  },
});
