import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const container = style({
  width: '100%',
  minWidth: 0,
  overflowX: 'auto',
});

export const table = style({
  width: '100%',
  minWidth: '36rem',
  color: vars.color.ink,
  backgroundColor: 'transparent',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.data,
  lineHeight: vars.lineHeight.compact,
  tableLayout: 'fixed',
});

export const caption = style({
  paddingBlockEnd: vars.space.sm,
  color: vars.color.aubergine,
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.headingSm,
  fontWeight: 650,
  textAlign: 'left',
});

export const headerCell = style({
  boxSizing: 'border-box',
  height: vars.size.row,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  color: vars.color.aubergine,
  backgroundColor: vars.color.paperMuted,
  borderTop: `${vars.border.hairline} solid ${vars.color.rule}`,
  fontFamily: vars.font.ui,
  fontSize: vars.fontSize.caption,
  fontWeight: 750,
  letterSpacing: '0.045em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
});

export const bodyRow = style({
  backgroundColor: 'transparent',
  transition: 'background-color 80ms ease',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.periwinkleWash,
    },
    '&:focus-within': {
      backgroundColor: vars.color.periwinkleWash,
    },
  },
});

export const rowTone = styleVariants({
  default: {},
  selected: {
    backgroundColor: vars.color.periwinkleWash,
  },
  muted: {
    color: vars.color.inkMuted,
  },
  critical: {
    color: vars.color.vermilion,
    backgroundColor: vars.color.vermilionWash,
  },
});

export const bodyCell = style({
  boxSizing: 'border-box',
  height: vars.size.row,
  maxWidth: 0,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  overflow: 'hidden',
  borderBottom: `${vars.border.hairline} dotted ${vars.color.ruleMuted}`,
  textOverflow: 'ellipsis',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
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
  fontSize: vars.fontSize.label,
  textAlign: 'center',
});

globalStyle(`${rowTone.selected} > ${bodyCell}:first-child`, {
  paddingInlineStart: `calc(${vars.space.sm} - 2px)`,
  borderInlineStart: `2px solid ${vars.color.olive}`,
});
