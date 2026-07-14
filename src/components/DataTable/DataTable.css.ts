import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const container = style({
  width: '100%',
  minWidth: 0,
  overflowX: 'auto',
});

export const table = style({
  width: '100%',
  minWidth: '36rem',
  color: componentVars.table.text,
  backgroundColor: 'transparent',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.data,
  lineHeight: semanticVars.typography.lineHeight.compact,
  tableLayout: 'fixed',
});

export const caption = style({
  paddingBlockEnd: semanticVars.space.sm,
  color: componentVars.table.captionText,
  fontFamily: semanticVars.typography.family.display,
  fontSize: semanticVars.typography.size.headingSm,
  fontWeight: 650,
  textAlign: 'left',
});

export const headerCell = style({
  boxSizing: 'border-box',
  height: componentVars.table.rowHeight,
  padding: `${semanticVars.space.xs} ${semanticVars.space.sm}`,
  color: componentVars.table.headerText,
  backgroundColor: componentVars.table.headerSurface,
  borderTop: `${semanticVars.border.width.hairline} solid ${componentVars.table.structuralBorder}`,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
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
      backgroundColor: componentVars.table.rowHoverSurface,
    },
    '&:focus-within': {
      backgroundColor: componentVars.table.rowHoverSurface,
    },
  },
});

export const rowTone = styleVariants({
  default: {},
  selected: {
    backgroundColor: componentVars.table.rowSelectedSurface,
  },
  muted: {
    color: componentVars.table.rowMutedText,
  },
  critical: {
    color: componentVars.table.rowCriticalText,
    backgroundColor: componentVars.table.rowCriticalSurface,
  },
});

export const bodyCell = style({
  boxSizing: 'border-box',
  height: componentVars.table.rowHeight,
  maxWidth: 0,
  padding: `${semanticVars.space.xs} ${semanticVars.space.sm}`,
  overflow: 'hidden',
  borderBottom: `${semanticVars.border.width.hairline} dotted ${componentVars.table.rowDivider}`,
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
  height: `calc(${semanticVars.border.width.hairline} * 2 + ${componentVars.rule.gap})`,
  padding: 0,
  borderTop: `${semanticVars.border.width.hairline} solid ${componentVars.table.structuralBorder}`,
  borderBottom: `${semanticVars.border.width.hairline} solid ${componentVars.table.structuralBorder}`,
});

export const totalCell = style({
  boxSizing: 'border-box',
  height: `calc(${componentVars.table.rowHeight} + ${semanticVars.space.xs})`,
  padding: `${semanticVars.space.xs} ${semanticVars.space.sm}`,
  color: componentVars.table.totalText,
  backgroundColor: componentVars.table.totalSurface,
  fontFamily: semanticVars.typography.family.data,
  fontWeight: 700,
  verticalAlign: 'middle',
});

export const emptyCell = style({
  padding: `${semanticVars.space.xl} ${semanticVars.space.sm}`,
  color: componentVars.table.emptyText,
  borderBottom: `${semanticVars.border.width.hairline} dotted ${componentVars.table.rowDivider}`,
  fontSize: semanticVars.typography.size.label,
  textAlign: 'center',
});

globalStyle(`${rowTone.selected} > ${bodyCell}:first-child`, {
  paddingInlineStart: `calc(${semanticVars.space.sm} - 2px)`,
  borderInlineStart: `2px solid ${componentVars.table.rowSelectedIndicator}`,
});
