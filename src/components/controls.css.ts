import { style } from '@vanilla-extract/css';

import { vars } from '../theme/theme.css';

export const control = style({
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  height: vars.size.control,
  margin: 0,
  padding: `${vars.space.xs} ${vars.space.xxs}`,
  paddingInlineStart: 0,
  color: vars.color.ink,
  backgroundColor: 'transparent',
  border: 0,
  borderInlineStart: '2px solid transparent',
  borderBottom: `${vars.border.hairline} solid ${vars.color.rule}`,
  borderRadius: vars.radius.none,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.compact,
  transition: 'background-color 100ms ease, border-color 100ms ease',
  selectors: {
    '&::placeholder': {
      color: vars.color.inkMuted,
      opacity: 0.72,
    },
    '&:hover:not(:disabled)': {
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
    '&[data-invalid="true"]': {
      backgroundColor: vars.color.vermilionWash,
      borderInlineStartColor: vars.color.vermilion,
      borderBottomColor: vars.color.vermilion,
    },
    '&:disabled': {
      color: vars.color.inkMuted,
      backgroundColor: vars.color.paperMuted,
      cursor: 'not-allowed',
      opacity: 0.68,
    },
  },
});

export const select = style({
  paddingInlineEnd: vars.space.xl,
  appearance: 'none',
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='m1 1 5 5 5-5' fill='none' stroke='%234d2d57' stroke-width='1.25'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: `right ${vars.space.xs} center`,
});
