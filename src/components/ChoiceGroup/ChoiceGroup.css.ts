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

export const description = style({
  margin: `${semanticVars.space.xxs} 0 0`,
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const choices = style({
  display: 'flex',
  minWidth: 0,
  marginTop: semanticVars.space.sm,
});

export const orientation = styleVariants({
  horizontal: {
    flexFlow: 'row wrap',
    alignItems: 'stretch',
    gap: semanticVars.space.sm,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: semanticVars.space.xs,
  },
});

export const choice = style({
  position: 'relative',
  display: 'inline-flex',
  boxSizing: 'border-box',
  minWidth: '4.5rem',
  minHeight: componentVars.control.height,
  alignItems: 'center',
  padding: `${semanticVars.space.xs} ${semanticVars.space.sm}`,
  paddingInlineStart: semanticVars.space.md,
  color: componentVars.choice.text,
  backgroundColor: 'transparent',
  borderBottom: `${semanticVars.border.width.hairline} dotted ${componentVars.choice.border}`,
  cursor: 'pointer',
  selectors: {
    '&::before': {
      position: 'absolute',
      top: semanticVars.space.xs,
      bottom: semanticVars.space.xs,
      left: 0,
      width: '2px',
      backgroundColor: 'transparent',
      content: '',
    },
    '&:hover:not([data-disabled="true"])': {
      color: semanticVars.color.content.accent,
      backgroundColor: componentVars.choice.activeSurface,
      borderBottomStyle: 'solid',
    },
    '&[data-disabled="true"]': {
      color: componentVars.choice.disabledText,
      backgroundColor: componentVars.choice.disabledSurface,
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

export const choiceLabel = style({
  minWidth: 0,
  overflow: 'hidden',
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.label,
  fontWeight: 650,
  lineHeight: semanticVars.typography.lineHeight.compact,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle(`${input}:checked + ${choiceLabel}`, {
  color: semanticVars.color.content.accent,
});

globalStyle(`${choice}:has(${input}:checked)`, {
  backgroundColor: componentVars.choice.selectedSurface,
  borderBottomColor: componentVars.choice.selectedIndicator,
  borderBottomStyle: 'solid',
});

globalStyle(`${choice}:has(${input}:checked)::before`, {
  backgroundColor: componentVars.choice.selectedIndicator,
});

globalStyle(`${choice}:has(${input}:focus-visible)`, {
  backgroundColor: componentVars.choice.focusSurface,
  borderBottomColor: semanticVars.color.interaction.focus,
  borderBottomStyle: 'solid',
});

globalStyle(`${choice}:has(${input}:focus-visible)::before`, {
  backgroundColor: semanticVars.color.interaction.focus,
});
