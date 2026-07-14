import { style } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const field = style({
  display: 'grid',
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  height: componentVars.control.height,
  gridTemplateColumns: 'auto minmax(0, 1fr) auto',
  alignItems: 'center',
  color: componentVars.control.text,
  backgroundColor: 'transparent',
  borderInlineStart: '2px solid transparent',
  borderBottom: `${semanticVars.border.width.hairline} solid ${componentVars.control.border}`,
  transition: 'background-color 100ms ease, border-color 100ms ease',
  selectors: {
    '&:hover:not([data-disabled="true"])': {
      borderBottomColor: componentVars.control.hoverBorder,
    },
    '&:focus-within': {
      backgroundColor: componentVars.control.focusSurface,
      borderInlineStartColor: componentVars.control.focusIndicator,
      borderBottomColor: componentVars.control.focusIndicator,
    },
    '&[data-invalid="true"]': {
      backgroundColor: componentVars.control.invalidSurface,
      borderInlineStartColor: componentVars.control.invalidIndicator,
      borderBottomColor: componentVars.control.invalidIndicator,
    },
    '&[data-disabled="true"]': {
      color: componentVars.control.disabledText,
      backgroundColor: componentVars.control.disabledSurface,
      cursor: 'not-allowed',
      opacity: 0.68,
    },
  },
});

export const input = style({
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  height: '100%',
  margin: 0,
  padding: `${semanticVars.space.xs} ${semanticVars.space.xxs}`,
  color: 'inherit',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: semanticVars.shape.radius.none,
  outline: 0,
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.body,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: semanticVars.typography.lineHeight.compact,
  selectors: {
    '&::placeholder': {
      color: componentVars.control.placeholder,
      opacity: 0.72,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const affix = style({
  paddingInline: semanticVars.space.xs,
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.caption,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: semanticVars.typography.lineHeight.compact,
  whiteSpace: 'nowrap',
});
