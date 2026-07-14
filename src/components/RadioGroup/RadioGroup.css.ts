import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const group = style({
  minWidth: 0,
  margin: 0,
  padding: 0,
  color: componentVars.choice.text,
  border: 0,
});

export const legend = style({
  margin: 0,
  padding: 0,
  color: semanticVars.color.content.accent,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.label,
  fontWeight: 700,
  letterSpacing: '0.045em',
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const required = style({
  marginInlineStart: semanticVars.space.xs,
  color: componentVars.choice.critical,
});

export const feedback = style({
  margin: `${semanticVars.space.xxs} 0 0`,
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const error = style({
  color: componentVars.choice.critical,
  fontWeight: 650,
});

export const options = style({
  display: 'flex',
  minWidth: 0,
  marginTop: semanticVars.space.sm,
});

export const orientation = styleVariants({
  horizontal: {
    flexFlow: 'row wrap',
    gap: `${semanticVars.space.sm} ${semanticVars.space.lg}`,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: semanticVars.space.sm,
  },
});

export const option = style({
  position: 'relative',
  display: 'inline-grid',
  minWidth: 0,
  minHeight: componentVars.control.compactHeight,
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  gap: semanticVars.space.sm,
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
  width: '0.75rem',
  height: '0.75rem',
  marginTop: '0.125rem',
  border: `${semanticVars.border.width.hairline} solid ${componentVars.choice.border}`,
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

export const optionContent = style({
  display: 'grid',
  minWidth: 0,
  gap: semanticVars.space.xxs,
});

export const optionLabel = style({
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.body,
  fontWeight: 550,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const optionDescription = style({
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

globalStyle(`${option}[data-invalid="true"] ${indicator}`, {
  backgroundColor: semanticVars.color.status.criticalSurface,
  borderColor: componentVars.choice.critical,
});
