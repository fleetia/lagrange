import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const button = style({
  display: 'inline-flex',
  boxSizing: 'border-box',
  width: 'fit-content',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.xs,
  margin: 0,
  border: `${vars.border.hairline} solid transparent`,
  borderRadius: vars.radius.none,
  fontFamily: vars.font.ui,
  fontWeight: 700,
  lineHeight: vars.lineHeight.compact,
  letterSpacing: '0.025em',
  cursor: 'pointer',
  transition: 'background-color 100ms ease, color 100ms ease',
  selectors: {
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      boxShadow: `inset 3px 0 ${vars.color.periwinkle}`,
    },
    '&:disabled': {
      color: vars.color.inkMuted,
      backgroundColor: vars.color.paperMuted,
      borderColor: vars.color.ruleMuted,
      cursor: 'not-allowed',
      opacity: 0.68,
    },
  },
});

export const variant = styleVariants({
  primary: {
    color: vars.color.paperRaised,
    backgroundColor: vars.color.aubergine,
    borderColor: vars.color.aubergine,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.olive,
        borderColor: vars.color.olive,
      },
    },
  },
  secondary: {
    color: vars.color.aubergine,
    backgroundColor: 'transparent',
    borderColor: vars.color.rule,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.periwinkleWash,
      },
    },
  },
  quiet: {
    color: vars.color.inkMuted,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: vars.color.ruleMuted,
    borderBottomStyle: 'dotted',
    selectors: {
      '&:hover:not(:disabled)': {
        color: vars.color.aubergine,
        backgroundColor: vars.color.periwinkleWash,
      },
    },
  },
  critical: {
    color: vars.color.vermilion,
    backgroundColor: 'transparent',
    borderColor: vars.color.vermilion,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.vermilionWash,
      },
    },
  },
});

export const size = styleVariants({
  compact: {
    minHeight: vars.size.row,
    padding: `${vars.space.xxs} ${vars.space.sm}`,
    fontSize: vars.fontSize.caption,
  },
  default: {
    minHeight: vars.size.control,
    padding: `${vars.space.xs} ${vars.space.md}`,
    fontSize: vars.fontSize.label,
  },
});
