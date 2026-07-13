import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const action = style({
  position: 'relative',
  display: 'inline-flex',
  boxSizing: 'border-box',
  width: 'fit-content',
  minHeight: vars.size.row,
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.xs,
  margin: 0,
  padding: `${vars.space.xxs} 0`,
  color: vars.color.aubergine,
  backgroundColor: 'transparent',
  border: 0,
  borderBottom: `${vars.border.hairline} solid currentColor`,
  borderRadius: vars.radius.none,
  fontFamily: vars.font.ui,
  fontWeight: 700,
  lineHeight: vars.lineHeight.compact,
  letterSpacing: '0.025em',
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
  selectors: {
    '&::before': {
      width: vars.space.sm,
      height: vars.border.hairline,
      backgroundColor: 'currentColor',
      content: '',
    },
    '&::after': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: `calc(${vars.space.xs} * -1)`,
      width: '2px',
      backgroundColor: 'transparent',
      content: '',
    },
    '&:hover:not(:disabled)': {
      backgroundColor: vars.color.periwinkleWash,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      backgroundColor: vars.color.periwinkleWash,
    },
    '&:focus-visible::after': {
      backgroundColor: vars.color.periwinkle,
    },
    '&:disabled': {
      color: vars.color.inkMuted,
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
});

export const variant = styleVariants({
  primary: {
    color: vars.color.aubergine,
    borderBottomStyle: 'solid',
  },
  quiet: {
    color: vars.color.inkMuted,
    borderBottomStyle: 'dotted',
    fontWeight: 550,
  },
  critical: {
    color: vars.color.vermilion,
    borderBottomStyle: 'solid',
  },
});

export const size = styleVariants({
  compact: {
    fontSize: vars.fontSize.caption,
  },
  default: {
    fontSize: vars.fontSize.label,
  },
});
