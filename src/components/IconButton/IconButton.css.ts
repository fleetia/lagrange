import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const button = style({
  position: 'relative',
  display: 'inline-flex',
  boxSizing: 'border-box',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  color: semanticVars.color.content.accent,
  backgroundColor: 'transparent',
  border: 0,
  borderBottom: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.subtle}`,
  borderRadius: semanticVars.shape.radius.none,
  cursor: 'pointer',
  selectors: {
    '&::before': {
      position: 'absolute',
      insetBlock: 0,
      insetInlineStart: 0,
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
    '&:focus-visible::before': {
      backgroundColor: semanticVars.color.interaction.focus,
    },
    '&:disabled': {
      color: semanticVars.color.content.secondary,
      backgroundColor: semanticVars.color.surface.muted,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});

export const variant = styleVariants({
  default: { color: semanticVars.color.content.accent },
  quiet: {
    color: semanticVars.color.content.secondary,
    borderBottomStyle: 'dotted',
  },
  critical: { color: semanticVars.color.status.critical },
});

export const size = styleVariants({
  compact: {
    width: componentVars.control.compactHeight,
    height: componentVars.control.compactHeight,
  },
  default: {
    width: componentVars.control.height,
    height: componentVars.control.height,
  },
});
