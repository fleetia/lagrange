import { globalStyle, style } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const root = style({
  position: 'relative',
  display: 'inline-grid',
  minWidth: 0,
  minHeight: componentVars.control.compactHeight,
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  gap: semanticVars.space.sm,
  color: componentVars.choice.text,
  cursor: 'pointer',
  selectors: {
    '&:hover:not([data-disabled="true"])': {
      color: semanticVars.color.content.accent,
    },
    '&[data-disabled="true"]': {
      color: componentVars.choice.disabledText,
      cursor: 'not-allowed',
      opacity: 0.62,
    },
  },
});

export const input = style({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  opacity: 0,
  pointerEvents: 'none',
});

export const indicator = style({
  position: 'relative',
  boxSizing: 'border-box',
  width: '0.875rem',
  height: '0.875rem',
  marginTop: '0.0625rem',
  backgroundColor: 'transparent',
  border: `${semanticVars.border.width.hairline} solid ${componentVars.choice.border}`,
  borderRadius: semanticVars.shape.radius.none,
  selectors: {
    '&::after': {
      position: 'absolute',
      inset: '0.1875rem',
      backgroundColor: componentVars.choice.checkIndicator,
      content: '',
      opacity: 0,
    },
  },
});

export const content = style({
  display: 'grid',
  minWidth: 0,
  gap: semanticVars.space.xxs,
});

export const label = style({
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.body,
  fontWeight: 550,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const description = style({
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

globalStyle(`${input}:checked + ${indicator}`, {
  borderColor: componentVars.choice.checkIndicator,
});

globalStyle(`${input}:checked + ${indicator}::after`, {
  opacity: 1,
});

globalStyle(`${input}:focus-visible + ${indicator}`, {
  backgroundColor: componentVars.choice.focusSurface,
  borderColor: semanticVars.color.interaction.focus,
  boxShadow: `-3px 0 0 ${semanticVars.color.interaction.focus}`,
});

globalStyle(`${root}[data-invalid="true"] ${indicator}`, {
  backgroundColor: semanticVars.color.status.criticalSurface,
  borderColor: componentVars.choice.critical,
  boxShadow: `-3px 0 0 ${componentVars.choice.critical}`,
});
