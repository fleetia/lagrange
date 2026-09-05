import { style } from '@vanilla-extract/css';
import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const swatch = style({
  width: '1rem',
  height: '1rem',
  flexShrink: 0,
  border: `1px solid ${componentVars.control.border}`,
});
export const trigger = style({
  fontFamily: semanticVars.typography.family.data,
});
export const controls = style({ display: 'grid', gap: semanticVars.space.sm });
export const desktop = style({
  display: 'grid',
  gap: semanticVars.space.sm,
  '@media': { '(pointer: coarse)': { display: 'none' } },
});
export const wheel = style({
  position: 'relative',
  width: '10rem',
  height: '10rem',
  justifySelf: 'center',
  borderRadius: '50%',
  touchAction: 'none',
  cursor: 'crosshair',
  background: 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${componentVars.control.focusIndicator}`,
      outlineOffset: '3px',
    },
  },
});
export const center = style({
  position: 'absolute',
  inset: '1rem',
  borderRadius: '50%',
  border: `3px solid ${componentVars.overlay.surface}`,
});
export const indicator = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '0.6rem',
  height: '0.6rem',
  margin: '-0.3rem',
  border: `2px solid ${componentVars.overlay.surface}`,
  boxSizing: 'border-box',
  borderRadius: '50%',
  background: componentVars.control.text,
  pointerEvents: 'none',
});
export const channels = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: semanticVars.space.xs,
});
