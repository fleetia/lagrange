import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const field = style({
  display: 'grid',
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  height: vars.size.control,
  gridTemplateColumns: 'auto minmax(0, 1fr) auto',
  alignItems: 'center',
  color: vars.color.ink,
  backgroundColor: 'transparent',
  borderInlineStart: '2px solid transparent',
  borderBottom: `${vars.border.hairline} solid ${vars.color.rule}`,
  transition: 'background-color 100ms ease, border-color 100ms ease',
  selectors: {
    '&:hover:not([data-disabled="true"])': {
      borderBottomColor: vars.color.aubergine,
    },
    '&:focus-within': {
      backgroundColor: vars.color.periwinkleWash,
      borderInlineStartColor: vars.color.periwinkle,
      borderBottomColor: vars.color.periwinkle,
    },
    '&[data-invalid="true"]': {
      backgroundColor: vars.color.vermilionWash,
      borderInlineStartColor: vars.color.vermilion,
      borderBottomColor: vars.color.vermilion,
    },
    '&[data-disabled="true"]': {
      color: vars.color.inkMuted,
      backgroundColor: vars.color.paperMuted,
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
  padding: `${vars.space.xs} ${vars.space.xxs}`,
  color: 'inherit',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: vars.radius.none,
  outline: 0,
  fontFamily: vars.font.data,
  fontSize: vars.fontSize.body,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: vars.lineHeight.compact,
  selectors: {
    '&::placeholder': {
      color: vars.color.inkMuted,
      opacity: 0.72,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const affix = style({
  paddingInline: vars.space.xs,
  color: vars.color.inkMuted,
  fontFamily: vars.font.data,
  fontSize: vars.fontSize.caption,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: vars.lineHeight.compact,
  whiteSpace: 'nowrap',
});
