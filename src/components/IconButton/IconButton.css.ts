import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const button = style({
  position: 'relative',
  display: 'inline-flex',
  boxSizing: 'border-box',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  color: vars.color.aubergine,
  backgroundColor: 'transparent',
  border: 0,
  borderBottom: `${vars.border.hairline} solid ${vars.color.ruleMuted}`,
  borderRadius: vars.radius.none,
  cursor: 'pointer',
  selectors: {
    '&::before': {
      position: 'absolute',
      insetBlock: 0,
      insetInlineStart: 0,
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
    '&:focus-visible::before': {
      backgroundColor: vars.color.periwinkle,
    },
    '&:disabled': {
      color: vars.color.inkMuted,
      backgroundColor: vars.color.paperMuted,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});

export const variant = styleVariants({
  default: { color: vars.color.aubergine },
  quiet: {
    color: vars.color.inkMuted,
    borderBottomStyle: 'dotted',
  },
  critical: { color: vars.color.vermilion },
});

export const size = styleVariants({
  compact: { width: vars.size.row, height: vars.size.row },
  default: { width: vars.size.control, height: vars.size.control },
});
