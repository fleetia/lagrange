import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const root = style({
  position: 'relative',
  minWidth: 0,
});

export const inputWrap = style({
  position: 'relative',
});

export const input = style({
  paddingInlineEnd: vars.space.xl,
});

export const indicator = style({
  position: 'absolute',
  top: '50%',
  right: vars.space.xs,
  color: vars.color.aubergine,
  fontFamily: vars.font.data,
  fontSize: vars.fontSize.caption,
  lineHeight: 1,
  pointerEvents: 'none',
  transform: 'translateY(-50%)',
});

export const listbox = style({
  position: 'absolute',
  zIndex: 20,
  top: `calc(100% + ${vars.space.xxs})`,
  right: 0,
  left: 0,
  maxHeight: '15rem',
  margin: 0,
  padding: 0,
  overflowY: 'auto',
  color: vars.color.ink,
  backgroundColor: vars.color.paperRaised,
  borderTop: `${vars.border.hairline} solid ${vars.color.rule}`,
  borderBottom: `${vars.border.hairline} solid ${vars.color.rule}`,
  listStyle: 'none',
});

export const option = style({
  display: 'grid',
  minHeight: vars.size.control,
  gridTemplateColumns: `minmax(0, 1fr) ${vars.space.sm}`,
  alignItems: 'center',
  gap: vars.space.sm,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  cursor: 'pointer',
  selectors: {
    '&:last-child': {
      borderBottom: 0,
    },
    '&[aria-disabled="true"]': {
      color: vars.color.inkMuted,
      cursor: 'not-allowed',
      opacity: 0.56,
    },
    '&[data-active="true"]': {
      backgroundColor: vars.color.periwinkleWash,
      borderInlineStart: `2px solid ${vars.color.periwinkle}`,
      paddingInlineStart: `calc(${vars.space.sm} - 2px)`,
    },
    '&[aria-selected="true"]': {
      color: vars.color.aubergine,
      fontWeight: 700,
    },
  },
});

export const optionText = style({
  minWidth: 0,
});

export const optionLabel = style({
  display: 'block',
  overflow: 'hidden',
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.compact,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const optionDescription = style({
  display: 'block',
  marginTop: vars.space.xxs,
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.caption,
  lineHeight: vars.lineHeight.compact,
});

export const selectionMarker = style({
  color: vars.color.olive,
  fontFamily: vars.font.data,
  textAlign: 'right',
});

export const empty = style({
  margin: 0,
  padding: `${vars.space.md} ${vars.space.sm}`,
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.label,
});
