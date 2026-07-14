import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const root = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space.xxs,
});

export const trigger = style({
  position: 'relative',
  display: 'grid',
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  minHeight: vars.size.control,
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: vars.space.sm,
  margin: 0,
  padding: `${vars.space.xs} ${vars.space.xxs}`,
  color: vars.color.ink,
  backgroundColor: 'transparent',
  border: 0,
  borderInlineStart: '2px solid transparent',
  borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  borderRadius: vars.radius.none,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.compact,
  textAlign: 'left',
  cursor: 'text',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: vars.color.periwinkleWash,
      borderBottomColor: vars.color.aubergine,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      backgroundColor: vars.color.periwinkleWash,
      borderInlineStartColor: vars.color.periwinkle,
      borderBottomColor: vars.color.periwinkle,
    },
    '&:disabled': {
      color: vars.color.inkMuted,
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
  color: vars.color.inkMuted,
});

export const marker = style({
  color: vars.color.inkMuted,
  fontFamily: vars.font.data,
  fontSize: vars.fontSize.caption,
});

export const input = style({
  fontVariantNumeric: 'tabular-nums',
});

export const feedback = style({
  margin: 0,
  color: vars.color.vermilion,
  fontSize: vars.fontSize.caption,
  fontWeight: 650,
  lineHeight: vars.lineHeight.compact,
});
