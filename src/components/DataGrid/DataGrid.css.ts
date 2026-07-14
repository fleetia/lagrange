import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const container = style({
  width: '100%',
  minWidth: 0,
  overflow: 'auto',
});

export const table = style({
  width: '100%',
  minWidth: '40rem',
  color: vars.color.ink,
  backgroundColor: 'transparent',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.data,
  lineHeight: vars.lineHeight.compact,
  tableLayout: 'fixed',
});

export const headerCell = style({
  boxSizing: 'border-box',
  height: vars.size.row,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  color: vars.color.aubergine,
  backgroundColor: vars.color.paperMuted,
  borderTop: `${vars.border.hairline} solid ${vars.color.rule}`,
  fontSize: vars.fontSize.caption,
  fontWeight: 750,
  letterSpacing: '0.045em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
});

export const stickyHeader = style({
  position: 'sticky',
  zIndex: 4,
  top: 0,
});

export const sortButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.xs,
  margin: 0,
  padding: 0,
  color: 'inherit',
  background: 'transparent',
  border: 0,
  font: 'inherit',
  letterSpacing: 'inherit',
  textTransform: 'inherit',
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': {
      outline: `${vars.border.hairline} dotted ${vars.color.aubergine}`,
      outlineOffset: '2px',
    },
  },
});

export const sortMarker = style({
  minWidth: vars.space.sm,
  fontFamily: vars.font.data,
});

export const row = style({
  backgroundColor: 'transparent',
});

export const rowTone = styleVariants({
  default: {},
  muted: { color: vars.color.inkMuted },
  critical: {
    color: vars.color.vermilion,
    backgroundColor: vars.color.vermilionWash,
  },
});

export const selectedRow = style({
  backgroundColor: vars.color.periwinkleWash,
});

export const cell = style({
  boxSizing: 'border-box',
  height: vars.size.row,
  maxWidth: 0,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  overflow: 'hidden',
  borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  textOverflow: 'ellipsis',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  selectors: {
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      backgroundColor: vars.color.periwinkleWash,
      boxShadow: `inset 2px 0 0 ${vars.color.periwinkle}`,
    },
    '&[data-editable="true"]': {
      cursor: 'text',
    },
    '&[data-editing="true"]': {
      padding: 0,
      overflow: 'visible',
      backgroundColor: vars.color.paperRaised,
      boxShadow: `inset 2px 0 0 ${vars.color.olive}`,
    },
  },
});

export const editor = style({
  boxSizing: 'border-box',
  width: '100%',
  height: vars.size.row,
  margin: 0,
  padding: `${vars.space.xxs} ${vars.space.sm}`,
  color: vars.color.ink,
  backgroundColor: 'transparent',
  border: 0,
  borderBottom: `${vars.border.hairline} solid ${vars.color.olive}`,
  borderRadius: 0,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.data,
  outline: 'none',
});

export const align = styleVariants({
  start: { textAlign: 'left' },
  center: { textAlign: 'center' },
  end: {
    textAlign: 'right',
    fontVariantNumeric: 'tabular-nums',
  },
});

export const structuralCell = style({
  boxSizing: 'border-box',
  height: `calc(${vars.border.hairline} * 2 + ${vars.size.ruleGap})`,
  padding: 0,
  borderTop: `${vars.border.hairline} solid ${vars.color.rule}`,
  borderBottom: `${vars.border.hairline} solid ${vars.color.rule}`,
});

export const totalCell = style({
  boxSizing: 'border-box',
  height: `calc(${vars.size.row} + ${vars.space.xs})`,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  color: vars.color.aubergine,
  backgroundColor: vars.color.oliveWash,
  fontFamily: vars.font.data,
  fontWeight: 700,
  verticalAlign: 'middle',
});

export const emptyCell = style({
  padding: `${vars.space.xl} ${vars.space.sm}`,
  color: vars.color.inkMuted,
  borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  textAlign: 'center',
});

globalStyle(`${selectedRow} > ${cell}:first-child`, {
  paddingInlineStart: `calc(${vars.space.sm} - 2px)`,
  borderInlineStart: `2px solid ${vars.color.olive}`,
});
