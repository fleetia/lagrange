import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const group = style({
  minWidth: 0,
  margin: 0,
  padding: 0,
  color: vars.color.ink,
  border: 0,
});

export const legend = style({
  margin: 0,
  padding: 0,
  color: vars.color.aubergine,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.label,
  fontWeight: 700,
  letterSpacing: '0.045em',
  lineHeight: vars.lineHeight.compact,
});

export const required = style({
  marginInlineStart: vars.space.xs,
  color: vars.color.vermilion,
});

export const feedback = style({
  margin: `${vars.space.xxs} 0 0`,
  color: vars.color.inkMuted,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  lineHeight: vars.lineHeight.compact,
});

export const error = style({
  color: vars.color.vermilion,
  fontWeight: 650,
});

export const options = style({
  display: 'flex',
  minWidth: 0,
  marginTop: vars.space.sm,
});

export const orientation = styleVariants({
  horizontal: {
    flexFlow: 'row wrap',
    gap: `${vars.space.sm} ${vars.space.lg}`,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: vars.space.sm,
  },
});

export const option = style({
  position: 'relative',
  display: 'inline-grid',
  minWidth: 0,
  minHeight: vars.size.row,
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  gap: vars.space.sm,
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
  width: '0.75rem',
  height: '0.75rem',
  marginTop: '0.125rem',
  border: `${vars.border.hairline} solid ${vars.color.rule}`,
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

export const optionContent = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space.xxs,
});

export const optionLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.body,
  fontWeight: 550,
  lineHeight: vars.lineHeight.compact,
});

export const optionDescription = style({
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

globalStyle(`${option}[data-invalid="true"] ${indicator}`, {
  backgroundColor: vars.color.vermilionWash,
  borderColor: vars.color.vermilion,
});
