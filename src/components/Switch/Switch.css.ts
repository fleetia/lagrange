import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const root = style({
  position: 'relative',
  display: 'inline-grid',
  minWidth: 0,
  minHeight: vars.size.row,
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  gap: vars.space.sm,
  color: vars.color.ink,
  cursor: 'pointer',
  selectors: {
    '&:hover:not([data-disabled="true"])': {
      color: vars.color.aubergine,
    },
    '&[data-disabled="true"]': {
      color: vars.color.inkMuted,
      cursor: 'not-allowed',
      opacity: 0.62,
    },
  },
});

export const input = style({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  opacity: 0,
  pointerEvents: 'none',
});

export const track = style({
  position: 'relative',
  boxSizing: 'border-box',
  width: '1.75rem',
  height: '0.875rem',
  marginTop: '0.0625rem',
  borderBottom: `${vars.border.hairline} solid ${vars.color.rule}`,
  selectors: {
    '&::before': {
      position: 'absolute',
      right: 0,
      bottom: -1,
      left: 0,
      borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
      content: '',
      transform: 'translateY(3px)',
    },
    '&::after': {
      position: 'absolute',
      bottom: 0,
      left: '0.125rem',
      width: '0.1875rem',
      height: '0.75rem',
      backgroundColor: vars.color.inkMuted,
      content: '',
      transition: 'transform 100ms ease, background-color 100ms ease',
    },
  },
});

export const content = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space.xxs,
});

export const label = style({
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.body,
  fontWeight: 550,
  lineHeight: vars.lineHeight.compact,
});

export const description = style({
  color: vars.color.inkMuted,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  lineHeight: vars.lineHeight.compact,
});

globalStyle(`${input}:checked + ${track}`, {
  borderBottomColor: vars.color.olive,
});

globalStyle(`${input}:checked + ${track}::after`, {
  backgroundColor: vars.color.olive,
  transform: 'translateX(1.25rem)',
});

globalStyle(`${input}:focus-visible + ${track}`, {
  backgroundColor: vars.color.periwinkleWash,
  borderBottomColor: vars.color.periwinkle,
  boxShadow: `-3px 0 0 ${vars.color.periwinkle}`,
});

globalStyle(`${root}[data-invalid="true"] ${track}`, {
  backgroundColor: vars.color.vermilionWash,
  borderBottomColor: vars.color.vermilion,
  boxShadow: `-3px 0 0 ${vars.color.vermilion}`,
});
