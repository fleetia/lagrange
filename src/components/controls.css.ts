import { style } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../theme/themeContract.css';

export const control = style({
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  height: componentVars.control.height,
  margin: 0,
  padding: `${semanticVars.space.xs} ${semanticVars.space.xxs}`,
  paddingInlineStart: 0,
  color: componentVars.control.text,
  backgroundColor: 'transparent',
  border: 0,
  borderInlineStart: '2px solid transparent',
  borderBottom: `${semanticVars.border.width.hairline} solid ${componentVars.control.border}`,
  borderRadius: semanticVars.shape.radius.none,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.body,
  lineHeight: semanticVars.typography.lineHeight.compact,
  transition: 'background-color 100ms ease, border-color 100ms ease',
  selectors: {
    '&::placeholder': {
      color: componentVars.control.placeholder,
      opacity: 0.72,
    },
    '&:hover:not(:disabled)': {
      borderBottomColor: componentVars.control.hoverBorder,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      backgroundColor: componentVars.control.focusSurface,
      borderInlineStartColor: componentVars.control.focusIndicator,
      borderBottomColor: componentVars.control.focusIndicator,
    },
    '&[data-invalid="true"]': {
      backgroundColor: componentVars.control.invalidSurface,
      borderInlineStartColor: componentVars.control.invalidIndicator,
      borderBottomColor: componentVars.control.invalidIndicator,
    },
    '&:disabled': {
      color: componentVars.control.disabledText,
      backgroundColor: componentVars.control.disabledSurface,
      cursor: 'not-allowed',
      opacity: 0.68,
    },
  },
});

export const select = style({
  paddingInlineEnd: semanticVars.space.xl,
  appearance: 'none',
  backgroundImage: componentVars.control.selectIndicator,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: `right ${semanticVars.space.xs} center`,
});
