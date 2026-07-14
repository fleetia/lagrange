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

export const track = style({
  position: 'relative',
  boxSizing: 'border-box',
  width: '1.75rem',
  height: '0.875rem',
  marginTop: '0.0625rem',
  borderBottom: `${semanticVars.border.width.hairline} solid ${componentVars.choice.border}`,
  selectors: {
    '&::before': {
      position: 'absolute',
      right: 0,
      bottom: -1,
      left: 0,
      borderBottom: `${semanticVars.border.width.hairline} dotted ${semanticVars.color.border.subtle}`,
      content: '',
      transform: 'translateY(3px)',
    },
    '&::after': {
      position: 'absolute',
      bottom: 0,
      left: '0.125rem',
      width: '0.1875rem',
      height: '0.75rem',
      backgroundColor: semanticVars.color.content.secondary,
      content: '',
      transition: 'transform 100ms ease, background-color 100ms ease',
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

globalStyle(`${input}:checked + ${track}`, {
  borderBottomColor: componentVars.choice.selectedIndicator,
});

globalStyle(`${input}:checked + ${track}::after`, {
  backgroundColor: componentVars.choice.selectedIndicator,
  transform: 'translateX(1.25rem)',
});

globalStyle(`${input}:focus-visible + ${track}`, {
  backgroundColor: componentVars.choice.focusSurface,
  borderBottomColor: semanticVars.color.interaction.focus,
  boxShadow: `-3px 0 0 ${semanticVars.color.interaction.focus}`,
});

globalStyle(`${root}[data-invalid="true"] ${track}`, {
  backgroundColor: semanticVars.color.status.criticalSurface,
  borderBottomColor: componentVars.choice.critical,
  boxShadow: `-3px 0 0 ${componentVars.choice.critical}`,
});
