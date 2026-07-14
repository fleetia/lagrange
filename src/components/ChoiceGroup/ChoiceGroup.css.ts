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

export const description = style({
  margin: `${vars.space.xxs} 0 0`,
  color: vars.color.inkMuted,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  lineHeight: vars.lineHeight.compact,
});

export const choices = style({
  display: 'flex',
  minWidth: 0,
  marginTop: vars.space.sm,
});

export const orientation = styleVariants({
  horizontal: {
    flexFlow: 'row wrap',
    alignItems: 'stretch',
    gap: vars.space.sm,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: vars.space.xs,
  },
});

export const choice = style({
  position: 'relative',
  display: 'inline-flex',
  boxSizing: 'border-box',
  minWidth: '4.5rem',
  minHeight: vars.size.control,
  alignItems: 'center',
  padding: `${vars.space.xs} ${vars.space.sm}`,
  paddingInlineStart: vars.space.md,
  color: vars.color.ink,
  backgroundColor: 'transparent',
  borderBottom: `${vars.border.hairline} dotted ${vars.color.rule}`,
  cursor: 'pointer',
  selectors: {
    '&::before': {
      position: 'absolute',
      top: vars.space.xs,
      bottom: vars.space.xs,
      left: 0,
      width: '2px',
      backgroundColor: 'transparent',
      content: '',
    },
    '&:hover:not([data-disabled="true"])': {
      color: vars.color.aubergine,
      backgroundColor: vars.color.periwinkleWash,
      borderBottomStyle: 'solid',
    },
    '&[data-disabled="true"]': {
      color: vars.color.inkMuted,
      backgroundColor: vars.color.paperMuted,
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

export const choiceLabel = style({
  minWidth: 0,
  overflow: 'hidden',
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.label,
  fontWeight: 650,
  lineHeight: vars.lineHeight.compact,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle(`${input}:checked + ${choiceLabel}`, {
  color: vars.color.aubergine,
});

globalStyle(`${choice}:has(${input}:checked)`, {
  backgroundColor: vars.color.oliveWash,
  borderBottomColor: vars.color.olive,
  borderBottomStyle: 'solid',
});

globalStyle(`${choice}:has(${input}:checked)::before`, {
  backgroundColor: vars.color.olive,
});

globalStyle(`${choice}:has(${input}:focus-visible)`, {
  backgroundColor: vars.color.periwinkleWash,
  borderBottomColor: vars.color.periwinkle,
  borderBottomStyle: 'solid',
});

globalStyle(`${choice}:has(${input}:focus-visible)::before`, {
  backgroundColor: vars.color.periwinkle,
});
