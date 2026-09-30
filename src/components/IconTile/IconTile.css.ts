import { style, styleVariants } from '@vanilla-extract/css';

import { semanticVars } from '../../theme/themeContract.css';

const ICON_SIZE = 'var(--lagrange-icon-tile-icon-size, 28px)';

export const tile = style({
  display: 'flex',
  boxSizing: 'border-box',
  width: '80px',
  height: '80px',
  minWidth: 0,
  alignItems: 'center',
  justifyContent: 'center',
  gap: semanticVars.space.sm,
  margin: 0,
  padding: '3px 8px',
  border: `${semanticVars.border.width.hairline} solid ${semanticVars.color.border.subtle}`,
  borderRadius: semanticVars.shape.radius.none,
  color: semanticVars.color.content.primary,
  backgroundColor: semanticVars.color.surface.raised,
  fontFamily: semanticVars.typography.family.ui,
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
  cursor: 'pointer',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: semanticVars.color.interaction.focusSurface,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: `${semanticVars.border.width.hairline} solid ${semanticVars.color.interaction.focus}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      color: semanticVars.color.content.secondary,
      backgroundColor: semanticVars.color.surface.muted,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});

export const layout = styleVariants({
  vertical: {
    minHeight: 'min-content',
    flexDirection: 'column',
  },
  horizontal: {
    width: '100%',
    height: 'auto',
    minHeight: `calc(${ICON_SIZE} + 8px)`,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export const icon = style({
  display: 'grid',
  flex: '0 0 auto',
  width: ICON_SIZE,
  height: ICON_SIZE,
  maxWidth: '100%',
  placeItems: 'center',
});

export const label = style({
  minWidth: 0,
  maxWidth: '100%',
  color: 'inherit',
  fontSize: semanticVars.typography.size.caption,
  lineHeight: semanticVars.typography.lineHeight.compact,
});

export const text = style({
  color: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
});

export const labelLayout = styleVariants({
  vertical: {
    flex: '0 0 auto',
    maxHeight: `max(1lh, round(down, calc(100% - ${ICON_SIZE} - ${semanticVars.space.sm}), 1lh))`,
    overflowX: 'hidden',
    overflowY: 'auto',
    overflowWrap: 'anywhere',
    overscrollBehaviorY: 'contain',
    textAlign: 'center',
    whiteSpace: 'normal',
  },
  horizontal: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
