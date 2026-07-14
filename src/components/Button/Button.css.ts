import { style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const button = style({
  display: 'inline-flex',
  boxSizing: 'border-box',
  width: 'fit-content',
  alignItems: 'center',
  justifyContent: 'center',
  gap: semanticVars.space.xs,
  margin: 0,
  border: `${semanticVars.border.width.hairline} solid transparent`,
  borderRadius: semanticVars.shape.radius.none,
  fontFamily: semanticVars.typography.family.ui,
  fontWeight: 700,
  lineHeight: semanticVars.typography.lineHeight.compact,
  letterSpacing: '0.025em',
  cursor: 'pointer',
  transition: 'background-color 100ms ease, color 100ms ease',
  selectors: {
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      boxShadow: `inset 3px 0 ${componentVars.button.focusIndicator}`,
    },
    '&:disabled': {
      color: componentVars.button.disabledText,
      backgroundColor: componentVars.button.disabledBackground,
      borderColor: componentVars.button.disabledBorder,
      cursor: 'not-allowed',
      opacity: 0.68,
    },
  },
});

export const variant = styleVariants({
  primary: {
    color: componentVars.button.primaryText,
    backgroundColor: componentVars.button.primaryBackground,
    borderColor: componentVars.button.primaryBackground,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: componentVars.button.primaryHoverBackground,
        borderColor: componentVars.button.primaryHoverBackground,
      },
    },
  },
  secondary: {
    color: componentVars.button.secondaryText,
    backgroundColor: 'transparent',
    borderColor: semanticVars.color.border.strong,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: componentVars.button.secondaryHoverBackground,
      },
    },
  },
  quiet: {
    color: componentVars.button.quietText,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: semanticVars.color.border.subtle,
    borderBottomStyle: 'dotted',
    selectors: {
      '&:hover:not(:disabled)': {
        color: componentVars.button.quietHoverText,
        backgroundColor: componentVars.button.quietHoverBackground,
      },
    },
  },
  critical: {
    color: componentVars.button.criticalText,
    backgroundColor: 'transparent',
    borderColor: componentVars.button.criticalText,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: componentVars.button.criticalHoverBackground,
      },
    },
  },
});

export const size = styleVariants({
  compact: {
    minHeight: componentVars.control.compactHeight,
    padding: `${semanticVars.space.xxs} ${semanticVars.space.sm}`,
    fontSize: semanticVars.typography.size.caption,
  },
  default: {
    minHeight: componentVars.control.height,
    padding: `${semanticVars.space.xs} ${semanticVars.space.md}`,
    fontSize: semanticVars.typography.size.label,
  },
});
