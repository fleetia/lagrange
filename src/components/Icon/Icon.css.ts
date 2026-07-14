import { style, styleVariants } from '@vanilla-extract/css';

export const icon = style({
  display: 'inline-block',
  flexShrink: 0,
  verticalAlign: 'middle',
});

export const size = styleVariants({
  sm: { width: '0.75rem', height: '0.75rem' },
  md: { width: '1rem', height: '1rem' },
  lg: { width: '1.25rem', height: '1.25rem' },
});
