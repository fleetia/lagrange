import { style } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const root = style({
  width: '100%',
  minWidth: 0,
  margin: 0,
  color: semanticVars.color.content.primary,
});

export const frame = style({
  position: 'relative',
  width: '100%',
  maxWidth: '44.5rem',
  marginInline: 'auto',
});

export const svg = style({
  display: 'block',
  width: '100%',
  height: 'auto',
  overflow: 'visible',
});

export const orbitGuide = style({
  fill: 'none',
  stroke: componentVars.chart.chrome,
  strokeDasharray: '1.5 3.5',
  strokeLinecap: 'round',
  strokeOpacity: 0.58,
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke',
});

export const tick = style({
  stroke: componentVars.chart.tick,
  strokeOpacity: 0.48,
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke',
});

export const majorTick = style({
  stroke: componentVars.chart.chrome,
  strokeOpacity: 0.62,
  strokeWidth: 1.15,
});

export const segment = style({
  fillOpacity: 0.88,
  stroke: componentVars.chart.chrome,
  strokeOpacity: 0.55,
  strokeWidth: 0.8,
  vectorEffect: 'non-scaling-stroke',
});

export const segmentTexture = style({
  opacity: 0.55,
  pointerEvents: 'none',
  stroke: 'none',
});

export const pigmentGrainDark = style({
  fill: componentVars.chart.pigmentDark,
  opacity: 0.28,
});

export const pigmentGrainLight = style({
  fill: componentVars.chart.pigmentLight,
  opacity: 0.35,
});

export const pigmentGrainFiber = style({
  fill: 'none',
  stroke: componentVars.chart.pigmentFiber,
  strokeLinecap: 'round',
  strokeOpacity: 0.22,
  strokeWidth: 0.35,
});

export const ringBoundary = style({
  fill: 'none',
  stroke: componentVars.chart.chrome,
  strokeOpacity: 0.68,
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke',
});

export const axis = style({
  fill: 'none',
  stroke: componentVars.chart.chrome,
  strokeLinecap: 'square',
  strokeOpacity: 0.58,
  strokeWidth: 0.9,
  vectorEffect: 'non-scaling-stroke',
});

export const centerDisk = style({
  fill: componentVars.chart.surface,
  fillOpacity: 0.5,
});

export const centerGuide = style({
  fill: 'none',
  stroke: componentVars.chart.chrome,
  strokeDasharray: '1.5 3.5',
  strokeLinecap: 'round',
  strokeOpacity: 0.55,
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke',
});

export const anchor = style({
  fill: componentVars.chart.chrome,
  stroke: componentVars.chart.surface,
  strokeWidth: 1.25,
  vectorEffect: 'non-scaling-stroke',
});

export const oliveAnchor = style({
  fill: componentVars.chart.alternate,
});

export const satellite = style({
  fill: componentVars.chart.surface,
  stroke: componentVars.chart.chrome,
  strokeWidth: 1.25,
  vectorEffect: 'non-scaling-stroke',
});

export const leader = style({
  fill: 'none',
  stroke: componentVars.chart.chrome,
  strokeOpacity: 0.68,
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke',
});

export const leaderDot = style({
  fill: componentVars.chart.surface,
  strokeWidth: 1.25,
  vectorEffect: 'non-scaling-stroke',
});

export const label = style({
  fill: componentVars.chart.text,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.015em',
  pointerEvents: 'none',
});

export const labelValue = style({
  fill: componentVars.chart.text,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: '17px',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 700,
  pointerEvents: 'none',
});

export const detail = style({
  fill: componentVars.chart.mutedText,
  fontFamily: semanticVars.typography.family.data,
  fontSize: '10.5px',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 500,
  pointerEvents: 'none',
});

export const center = style({
  position: 'absolute',
  top: '50%',
  left: '55.06%',
  display: 'grid',
  width: '22%',
  maxWidth: '9rem',
  minHeight: '5rem',
  placeItems: 'center',
  scale: 1,
  textAlign: 'center',
  transform: 'translate(-50%, -50%)',
  transformOrigin: 'center',
  '@media': {
    '(max-width: 30rem)': {
      scale: 0.8,
    },
    '(max-width: 22.5rem)': {
      scale: 0.68,
    },
  },
});

export const empty = style({
  position: 'absolute',
  top: '50%',
  left: '55.06%',
  color: componentVars.chart.mutedText,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.label,
  transform: 'translate(-50%, -50%)',
});

export const accessibleData = style({
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
