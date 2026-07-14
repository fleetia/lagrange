import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const container = style({
  width: '100%',
  minWidth: 0,
  overflow: 'auto',
});

export const table = style({
  width: '100%',
  minWidth: '40rem',
  color: componentVars.table.text,
  backgroundColor: 'transparent',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.data,
  lineHeight: semanticVars.typography.lineHeight.compact,
  tableLayout: 'fixed',
});

export const headerCell = style({
  boxSizing: 'border-box',
  height: componentVars.table.rowHeight,
  padding: `${semanticVars.space.xs} ${semanticVars.space.sm}`,
  color: componentVars.table.headerText,
  backgroundColor: componentVars.table.headerSurface,
  borderTop: `${semanticVars.border.width.hairline} solid ${componentVars.table.structuralBorder}`,
  fontSize: semanticVars.typography.size.caption,
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
  gap: semanticVars.space.xs,
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
      outline: `${semanticVars.border.width.hairline} dotted ${componentVars.table.headerText}`,
      outlineOffset: '2px',
    },
  },
});

export const sortMarker = style({
  minWidth: semanticVars.space.sm,
  fontFamily: semanticVars.typography.family.data,
});

export const row = style({
  backgroundColor: 'transparent',
});

export const rowTone = styleVariants({
  default: {},
  muted: { color: componentVars.table.rowMutedText },
  critical: {
    color: componentVars.table.rowCriticalText,
    backgroundColor: componentVars.table.rowCriticalSurface,
  },
});

export const selectedRow = style({
  backgroundColor: componentVars.table.rowSelectedSurface,
});

export const cell = style({
  boxSizing: 'border-box',
  height: componentVars.table.rowHeight,
  maxWidth: 0,
  padding: `${semanticVars.space.xs} ${semanticVars.space.sm}`,
  overflow: 'hidden',
  borderBottom: `${semanticVars.border.width.hairline} dotted ${componentVars.table.rowDivider}`,
  textOverflow: 'ellipsis',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  selectors: {
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      backgroundColor: componentVars.table.rowSelectedSurface,
      boxShadow: `inset 2px 0 0 ${semanticVars.color.interaction.focus}`,
    },
    '&[data-editable="true"]': {
      cursor: 'text',
    },
    '&[data-editing="true"]': {
      padding: 0,
      overflow: 'visible',
      backgroundColor: semanticVars.color.surface.raised,
      boxShadow: `inset 2px 0 0 ${componentVars.table.rowSelectedIndicator}`,
    },
  },
});

export const editor = style({
  boxSizing: 'border-box',
  width: '100%',
  height: componentVars.table.rowHeight,
  margin: 0,
  padding: `${semanticVars.space.xxs} ${semanticVars.space.sm}`,
  color: componentVars.table.text,
  backgroundColor: 'transparent',
  border: 0,
  borderBottom: `${semanticVars.border.width.hairline} solid ${componentVars.table.rowSelectedIndicator}`,
  borderRadius: 0,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.data,
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
  textAlign: 'center',
});

globalStyle(`${selectedRow} > ${cell}:first-child`, {
  paddingInlineStart: `calc(${semanticVars.space.sm} - 2px)`,
  borderInlineStart: `2px solid ${componentVars.table.rowSelectedIndicator}`,
});
