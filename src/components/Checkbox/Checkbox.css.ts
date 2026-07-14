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

export const indicator = style({
  position: 'relative',
  boxSizing: 'border-box',
  width: '0.875rem',
  height: '0.875rem',
  marginTop: '0.0625rem',
  backgroundColor: 'transparent',
  border: `${vars.border.hairline} solid ${vars.color.rule}`,
  borderRadius: vars.radius.none,
  selectors: {
    '&::after': {
      position: 'absolute',
      inset: '0.1875rem',
      backgroundColor: vars.color.aubergine,
      content: '',
      opacity: 0,
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

globalStyle(`${input}:checked + ${indicator}`, {
  borderColor: vars.color.aubergine,
});

globalStyle(`${input}:checked + ${indicator}::after`, {
  opacity: 1,
});

globalStyle(`${input}:focus-visible + ${indicator}`, {
  backgroundColor: vars.color.periwinkleWash,
  borderColor: vars.color.periwinkle,
  boxShadow: `-3px 0 0 ${vars.color.periwinkle}`,
});

globalStyle(`${root}[data-invalid="true"] ${indicator}`, {
  backgroundColor: vars.color.vermilionWash,
  borderColor: vars.color.vermilion,
  boxShadow: `-3px 0 0 ${vars.color.vermilion}`,
});
