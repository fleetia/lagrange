import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const menu = style({
  position: 'fixed',
  zIndex: 1000,
  inset: 'unset',
  boxSizing: 'border-box',
  minWidth: '10rem',
  maxWidth: 'calc(100vw - 8px)',
  maxHeight: 'calc(100vh - 8px)',
  margin: 0,
  padding: `${semanticVars.space.xxs} 0`,
  overflowY: 'auto',
  color: componentVars.overlay.text,
  backgroundColor: componentVars.overlay.surface,
  border: `${semanticVars.border.width.hairline} solid ${componentVars.overlay.border}`,
  borderRadius: semanticVars.shape.radius.none,
  fontFamily: semanticVars.typography.family.ui,
});

export const item = style({
  display: 'flex',
  boxSizing: 'border-box',
  width: '100%',
  minHeight: componentVars.control.compactHeight,
  alignItems: 'center',
  margin: 0,
  padding: `${semanticVars.space.xs} ${semanticVars.space.sm}`,
  color: componentVars.navigation.text,
  backgroundColor: 'transparent',
  border: 0,
  borderBottom: `${semanticVars.border.width.hairline} dotted ${componentVars.navigation.separator}`,
  borderRadius: semanticVars.shape.radius.none,
  outline: 0,
  font: 'inherit',
  fontSize: semanticVars.typography.size.label,
  fontWeight: 600,
  lineHeight: semanticVars.typography.lineHeight.compact,
  textAlign: 'start',
  cursor: 'pointer',
  selectors: {
    '&:last-child': {
      borderBottom: 0,
    },
    '&:hover:not(:disabled)': {
      color: componentVars.navigation.hoverText,
      backgroundColor: componentVars.navigation.hoverSurface,
    },
    '&:focus-visible': {
      color: componentVars.navigation.hoverText,
      backgroundColor: componentVars.navigation.hoverSurface,
      boxShadow: `inset 2px 0 ${semanticVars.color.interaction.focus}`,
    },
    '&:disabled': {
      color: componentVars.control.disabledText,
      cursor: 'not-allowed',
      opacity: 0.58,
    },
  },
});

export const itemTone = styleVariants({
  critical: {
    color: semanticVars.color.status.critical,
    selectors: {
      '&:hover:not(:disabled)': {
        color: semanticVars.color.status.critical,
      },
      '&:focus-visible': {
        color: semanticVars.color.status.critical,
      },
    },
  },
  default: {},
});
