import { style } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const root = style({
  display: 'grid',
  minWidth: 0,
  gap: semanticVars.space.xxs,
});

export const trigger = style({
  position: 'relative',
  display: 'grid',
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  minHeight: componentVars.control.height,
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: semanticVars.space.sm,
  margin: 0,
  padding: `${semanticVars.space.xs} ${semanticVars.space.xxs}`,
  color: componentVars.control.text,
  backgroundColor: 'transparent',
  border: 0,
  borderInlineStart: '2px solid transparent',
  borderBottom: `${semanticVars.border.width.hairline} dotted ${semanticVars.color.border.subtle}`,
  borderRadius: semanticVars.shape.radius.none,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.body,
  lineHeight: semanticVars.typography.lineHeight.compact,
  textAlign: 'left',
  cursor: 'text',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: componentVars.control.focusSurface,
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
    '&:disabled': {
      color: componentVars.control.disabledText,
      cursor: 'not-allowed',
      opacity: 0.64,
    },
  },
});

export const value = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const empty = style({
  color: componentVars.control.placeholder,
});

export const marker = style({
  color: semanticVars.color.content.secondary,
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.caption,
});

export const input = style({
  fontVariantNumeric: 'tabular-nums',
});

export const feedback = style({
  margin: 0,
  color: componentVars.control.invalidIndicator,
  fontSize: semanticVars.typography.size.caption,
  fontWeight: 650,
  lineHeight: semanticVars.typography.lineHeight.compact,
});
