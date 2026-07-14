import { style } from '@vanilla-extract/css';

import { componentVars, semanticVars } from '../../theme/themeContract.css';

export const root = style({
  position: 'relative',
  minWidth: 0,
});

export const inputWrap = style({
  position: 'relative',
});

export const input = style({
  paddingInlineEnd: semanticVars.space.xl,
});

export const indicator = style({
  position: 'absolute',
  top: '50%',
  right: semanticVars.space.xs,
  color: semanticVars.color.content.accent,
  fontFamily: semanticVars.typography.family.data,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: 1,
  pointerEvents: 'none',
  transform: 'translateY(-50%)',
});

export const listbox = style({
  position: 'absolute',
  zIndex: 20,
  top: `calc(100% + ${semanticVars.space.xxs})`,
  right: 0,
  left: 0,
  maxHeight: '15rem',
  margin: 0,
  padding: 0,
  overflowY: 'auto',
  color: semanticVars.color.content.primary,
  backgroundColor: semanticVars.color.surface.raised,
  borderTop: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.strong}`,
  borderBottom: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.strong}`,
  listStyle: 'none',
});

export const option = style({
  display: 'grid',
  minHeight: componentVars.control.height,
  gridTemplateColumns: `minmax(0, 1fr) ${semanticVars.space.sm}`,
  alignItems: 'center',
  gap: semanticVars.space.sm,
  padding: `${semanticVars.space.xs} ${semanticVars.space.sm}`,
  borderBottom: `${semanticVars.border.width.hairline} dotted ${semanticVars.color.border.subtle}`,
  cursor: 'pointer',
  selectors: {
    '&:last-child': {
      borderBottom: 0,
    },
    '&[aria-disabled="true"]': {
      color: semanticVars.color.content.secondary,
      cursor: 'not-allowed',
      opacity: 0.56,
    },
    '&[data-active="true"]': {
      backgroundColor: semanticVars.color.interaction.focusSurface,
      borderInlineStart: `2px solid ${semanticVars.color.interaction.focus}`,
      paddingInlineStart: `calc(${semanticVars.space.sm} - 2px)`,
    },
    '&[aria-selected="true"]': {
      color: semanticVars.color.content.accent,
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
  fontSize: semanticVars.typography.size.body,
  lineHeight: semanticVars.typography.lineHeight.compact,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const optionDescription = style({
  display: 'block',
  marginTop: semanticVars.space.xxs,
  color: semanticVars.color.content.secondary,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const selectionMarker = style({
  color: semanticVars.color.selection.indicator,
  fontFamily: semanticVars.typography.family.data,
  textAlign: 'right',
});

export const empty = style({
  margin: 0,
  padding: `${semanticVars.space.md} ${semanticVars.space.sm}`,
  color: semanticVars.color.content.secondary,
  fontSize: semanticVars.typography.size.label,
});
