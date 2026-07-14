import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const action = style({
  position: 'relative',
  display: 'inline-flex',
  boxSizing: 'border-box',
  width: 'fit-content',
  minHeight: componentVars.control.compactHeight,
  alignItems: 'center',
  justifyContent: 'center',
  gap: semanticVars.space.xs,
  margin: 0,
  padding: `${semanticVars.space.xxs} 0`,
  color: semanticVars.color.content.accent,
  backgroundColor: 'transparent',
  border: 0,
  borderBottom: `${semanticVars.border.width.hairline} solid currentColor`,
  borderRadius: semanticVars.shape.radius.none,
  fontFamily: semanticVars.typography.family.ui,
  fontWeight: 700,
  lineHeight: semanticVars.typography.lineHeight.compact,
  letterSpacing: '0.025em',
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
  selectors: {
    '&::before': {
      width: semanticVars.space.sm,
      height: semanticVars.border.width.hairline,
      backgroundColor: 'currentColor',
      content: '',
    },
    '&::after': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: `calc(${semanticVars.space.xs} * -1)`,
      width: '2px',
      backgroundColor: 'transparent',
      content: '',
    },
    '&:hover:not(:disabled)': {
      backgroundColor: semanticVars.color.interaction.focusSurface,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      backgroundColor: semanticVars.color.interaction.focusSurface,
    },
    '&:focus-visible::after': {
      backgroundColor: semanticVars.color.interaction.focus,
    },
    '&:disabled': {
      color: semanticVars.color.content.secondary,
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
});

export const variant = styleVariants({
  primary: {
    color: semanticVars.color.content.accent,
    borderBottomStyle: 'solid',
  },
  quiet: {
    color: semanticVars.color.content.secondary,
    borderBottomStyle: 'dotted',
    fontWeight: 550,
  },
  critical: {
    color: semanticVars.color.status.critical,
    borderBottomStyle: 'solid',
  },
});

export const size = styleVariants({
  compact: {
    fontSize: semanticVars.typography.size.caption,
  },
  default: {
    fontSize: semanticVars.typography.size.label,
  },
});
